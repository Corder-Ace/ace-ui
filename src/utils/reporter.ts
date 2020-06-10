import Taro from '@tarojs/taro';
import {log} from '@/api';

interface Report {
  currentState: any;
  currentListeners: any[] | null;
  nextListeners: any[];
  isDispatching: boolean;
  pending: boolean;
  callbacks: any[];
  timer: any;
}

class Report {
  constructor() {
    this.callbacks = [];
    this.currentState = {};
    this.isDispatching = false;
    this.currentListeners = [];
    this.nextListeners = this.currentListeners;
    this.pending = false;
    this.timer = null;
    this.init();
  }

  init() {
    const initState = {
      reportedData: [], // 已经发送的数据id
      scrollViewHeight: 0, // 当前的视口高度
      prevScrollTop: 0, // 上一次的滚动高度)
      current: 0 // 记录当前处于哪一页
    };
    this.setState(initState);
    Taro.getSystemInfo()
      .then(res => {
        this.setState({
          scrollViewHeight: res.windowHeight,
          scrollViewWidth: res.windowWidth
        })
      })
  }

  subscribe(listener) {
    if (typeof listener !== 'function' && process.env.NODE_ENV === 'development') {
      throw new Error('Expected the listener to be a function.')
    }

    if (this.isDispatching && process.env.NODE_ENV === 'development') {
      throw new Error(
        'Unsubscribable on dispatching'
      )
    }

    let isSubscribe = true;
    this.ensureCanMutateNextListeners();
    this.nextListeners.push(listener);

    const unsubscribe = () => {
      if (!isSubscribe) {
        return
      }

      if (this.isDispatching) {
        return
      }

      isSubscribe = false;

      this.ensureCanMutateNextListeners();
      const index = this.nextListeners.indexOf(listener);
      this.nextListeners.splice(index, 1);
      this.currentListeners = null;
    };

    return {
      unsubscribe
    }
  }

  dispatch() {
    if (this.isDispatching) {
      console.log('Unscheduled in dispatching');
      return
    }

    // 执行所有订阅
    this.isDispatching = true;
    const listeners = this.currentListeners = this.nextListeners.slice();
    let promise = Promise.resolve(true);
    for (let i = 0; i < listeners.length; i++) {
      promise = promise.then(listeners[i]());
    }
    promise.then(() => {
      this.isDispatching = false;
    });
  }

  setState(action = {}) {
    for (let key in action) {
      this.currentState[key] = action[key]
    }
  }

  getState() {
    return this.currentState;
  }

  ensureCanMutateNextListeners() {
    if (this.nextListeners === this.currentListeners) {
      this.nextListeners = this.currentListeners.slice()
    }
  }

  report({viewPortData, vfm, sid}) {
    if (!viewPortData.length) return;
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({reportedData: []});
      log<any>({viewPortData, vfm, sid})
    }, 1000)
  }

  nextTick(cb?: Function, ctx?: Object) {
    this.callbacks.push(() => {
      if (cb) {
        try {
          cb.call(ctx)
        } catch (e) {
          console.log(e);
        }
      }
    });
    if (!this.pending){
      this.pending = true;
      setTimeout(this.flushCallbacks.bind(this), 0)
    }
  }

  flushCallbacks () {
    this.pending = false;
    const copies = this.callbacks.slice(0);
    this.callbacks.length = 0;
    for (let i = 0; i < copies.length; i++) {
      copies[i]()
    }
  }
}

export default new Report
