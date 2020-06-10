import {useRef} from "@tarojs/taro";

export default function useThrottle(fn: Function, wait: number = 300) {
  const timer: any = useRef(0);

  return function (...args) {
    const self = this;
    if (!timer.current){
      timer.current = setTimeout(() => {
        fn.apply(self, args);
        timer.current = null;
      }, wait);
    }
  }
}
