import Taro from '@tarojs/taro';
import Axios from './axios';
import md5 from 'md5';
import {uuid} from "@/utils";

type ChangeCart = {
  message: string;
  success: boolean;
  data: any;
};
const ENV = Taro.getEnv();
Axios.defaults.transformRequest = transformRequest;
// Axios.defaults.baseURL = 'https://m.aplum.com';
// Axios.defaults.baseURL = 'https://app-test.aplum.com';
// Axios.defaults.baseURL = 'http://android.aplum.com:8090';
// Axios.defaults.baseURL = 'http://app.dev02.aplum-inc.com:8909';
Axios.interceptors.request.use(config => {
  const {method, url, data} = config;
  console.log(`http ${method || 'GET'} --> ${url} data: `, data);
  return config;
});
Axios.interceptors.response.use(response => {
  if (response.data.success || response.data.ret_code === '200') {
    return response.data;
  }
  if (response.statusCode == 401 || response.statusCode == 403 || response.statusCode == 205) {
    Taro.navigateTo({url: '/pages/user/authorize'});
  }

  return Promise.reject({...response, $route: getCurrentPage()});
}, err => {
  if (err instanceof Error){
    err = err.message;
  } else if (err instanceof Object){
    err = JSON.stringify(err);
  }
  Taro.request({
    url: 'https://m.aplum.com/site/minapp-err',
    method: 'POST',
    data: {msg: err},
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  return err;
});

// let webViewHost: string = 'https://app.aplum-inc.com';
let webViewHost: string = 'https://app-test.aplum.com';
// let webViewHost: string = 'https://android.aplum.com:8090';
// let webViewHost: string = 'http://app.dev02.aplum-inc.com:8909';

if (process.env.NODE_ENV === 'production') {
  Axios.defaults.baseURL = 'https://m.aplum.com';
  webViewHost = 'https://app.aplum-inc.com';
}

export const globalData = {
  version: '5.3.24',
  platform: '',
  user_id: '',
  session_id: '',
  userIdentity: '',
  code: '',
  swan_id: '',
  open_id: '',
  token: '',
  user_info: null,
  scene: 1001
};

function stackLevel() {
  return Taro.getCurrentPages().length;
}

function getToken(): any {
  let token = Taro.getStorageSync('token');
  globalData.token = token || "";
  if (globalData.token) {
    return true;
  }
  get<any>('/login/bdmapp-token?swan_id=' + globalData.swan_id).then(res => {
    globalData.token = res.data.data;
    Taro.setStorageSync('token', res.data.data);
  }).catch(err => {
    console.log(err)
  });
}

function mergeHeader(headers) {
  headers = {
    ...headers,
    "Cookie": `PHPSESSID=${globalData.session_id}`,
    "X-Aplum-User-Identity": globalData.userIdentity,
    "X-Aplum-Token": globalData.token || '',
    "X-Requested-With": "XMLHttpRequest",
    "X-UserAgent": ENV === 'SWAN' ? 'bdmapp' : 'wechat_app'
  };

  if (ENV === 'SWAN') {
    headers['X-Aplum-Swanid'] = globalData.swan_id;
  }

  return headers;
}

function transformRequest(config) {
  config.header = mergeHeader(config.header);
  config.data = {...config.data, miniapp_version: globalData.version, wechat_scene: globalData.scene};

  return config;
}

export function reportRecommend() {
  get<any>('/seller/recommend-from-wechat-app', {parent: Taro.getStorageSync('@recommend')})
    .then(() => {
      Taro.setStorageSync('@recommend', '');
    })
    .catch(err => {
      console.log(err);
    })
}

export function checkVersion(options) {
  get<any>(`/config/miniapp?version=${globalData.version}&extra=${JSON.stringify(options)}`)
    .then(res => {
      const data = res.data;
      for (let key in data) {
        globalData[key] = data[key];
      }

      if (data.webViewConfig && data.webViewConfig.host) {
        if (webViewHost == 'https://app.aplum-inc.com') {
          webViewHost = data.webViewConfig.host;
        }
      }

      if (data.beta) {
        Taro.setTabBarItem({
          index: 2,
          text: '上新',
        })
      }
    })
    .catch(() => {
      console.log('Request config/miniapp Failed...')
    });
}

export function wish(pid, vfm, sid): Promise<any> {
  if (!globalData.userIdentity) {
    Taro.navigateTo({url: '/pages/user/authorize'});
    return Promise.reject({message: '未登录,无法收藏'});
  }
  return get<any>('/wishlist/add', {pid, vfm, sid})
}

export function cancelWish(pid, vfm, sid): Promise<any> {
  if (!globalData.userIdentity) {
    Taro.navigateTo({url: '/pages/user/authorize'});
    return Promise.reject({message: '未登录,无法收藏'});
  }
  return get<any>('/wishlist/delete', {pid, vfm, sid})
}

export function addCart(pid): Promise<ChangeCart> {
  if (pid) {
    return get<ChangeCart>('/cart/add', {product_id: pid})
  } else {
    return Promise.reject('pid不存在');
  }
}

export function deleteCart(pid): Promise<ChangeCart> {
  return get<ChangeCart>('/cart/delete', {pid: pid})
}

export function getUserInfo(): Promise<any> {
  if (globalData.user_info) return Promise.resolve({data: globalData.user_info});
  return get<any>('/user/info').then(res => {
    globalData.user_info = res.data;
    return res;
  })
}

export function getCurrentPage() {
  const currentPages = Taro.getCurrentPages();
  return currentPages[currentPages.length - 1].route;
}

export function getCartCount(): void {
  get<{ data: any, success: boolean, message: string }>('/cart/count')
    .then(res => {
      const count = res.data && res.data.count || '0';
      const cartNum = count <= 99 ? count : '99+';
      if (count == 0) {
        Taro.removeTabBarBadge({
          index: 3
        });
        return
      }
      Taro.setTabBarBadge({
        index: 3,
        text: cartNum
      })
    })
}

export function getShareParams(params?): Promise<any> {
  return get<any>('/share/param', params || {})
}

export function get<T>(url, data?, options?): Promise<T> {
  options = options || {};
  options.method = 'GET';
  return Axios.get<T>(url, data, options);
}

export function post<T>(url, data?, options?): Promise<T> {
  options = options || {};
  options.method = 'POST';
  return Axios.post<T>(url, data, options);
}

export function log<T>({viewPortData, vfm, sid}): Promise<T> {
  const time = Math.floor(+new Date() / 1000);
  const v1 = uuid();
  const currentUrl = Taro.getCurrentPages()[0].route;
  let signature = md5(
    `appid=T6sqBgxRMxxBqplmf1Yj&nonce_str=${v1}&time_stamp=${time}`
  );
  return post<any>('/v1/recordlog', {
    currentUrl,
    userAgent: 'wechat_app',
    platform: 'weixin',
    source: "plum",
    item_action: viewPortData,
    vfm: vfm ? vfm : '',
    sid: sid ? sid : ''
  }, {
    baseURL: 'https://rp.aplum.com',
    header: {
      "Cookie": "PHPSESSID=" + globalData.session_id,
      "X-Aplum-User-Identity": globalData.userIdentity,
      "X-UserAgent": "wechat_app",
      "X-Requested-With": "XMLHttpRequest",
      "X-Ca-Signature": signature,
      "X-Ca-Timestamp": time,
      "X-Ca-Nonce": v1,
      "X-Pd-Carrier": "",
      "X-Pd-Idfa": "",
      "X-Pd-Identify": globalData.userIdentity,
      "X-Pd-Imei": ""
    }
  })
}

export function buildWebviewUrl(url, options) {
  url = webViewHost + url;
  const queries: string[] = [];
  if (options) {
    for (let o in options) {
      queries.push(`${o}=${options[o]}`);
    }
  }
  queries.push("user_identity=" + globalData.userIdentity);
  queries.push("x_user_agent=wechat_app");
  queries.push("stackLevel=" + stackLevel());
  queries.push("miniapp_version=" + globalData.version);
  let joint = url.indexOf("?") >= 0 ? "&" : "?";
  url += joint + queries.join("&");
  if (globalData.platform == '') {
    globalData.platform = Taro.getSystemInfoSync().platform;
  }
  if (globalData.platform == 'ios') {
    url += "#wechat_redirect";
  }
  return url;
}

//获取token
export async function getSwanId(): Promise<any> {
  if (ENV === Taro.ENV_TYPE.SWAN) {
    // 获取token
    let swan_id = Taro.getStorageSync('swanid');
    globalData.swan_id = swan_id;
    if (swan_id) {
      getToken();
      return true;
    }
    // @ts-ignore
    Taro.getSwanId({
      success: function (res) {
        globalData.swan_id = res.data.swanid;
        Taro.setStorageSync('swanid', res.data.swanid);
        getToken();
      },
      fail: function (err) {
        console.log('swanid get false:' + err);
      }
    });
    return true;
  }
}

export {default as login} from './login'

export async function authorized(userInfo) {
  if (userInfo.errMsg.indexOf("getUserInfo:fail") >= 0) {
    console.log('用户拒绝了授权');
    return;
  }

  const info = {
    ...userInfo,
    session_id: globalData.session_id,
    singleId: globalData.code
  };

  const url = ENV === Taro.ENV_TYPE.SWAN ? '/login/userinfo-from-bdmapp' : '/login/userinfo-from-wechatapp';
  try {
    const user_info = await get<any>(url, info);
    if (!globalData.userIdentity && Taro.getStorageSync('@recommend')) {
      reportRecommend();
    }
    globalData.session_id = user_info.session_id;
    globalData.userIdentity = user_info.data;
    globalData.user_id = user_info.user_id;
  } catch (e) {
    Taro.showModal({
      title: '登录超时',
      content: '登录状态超时，请清一下手机内存，重新打开微信试试吧~',
    })
  }

  const pages = Taro.getCurrentPages();
  if (pages.length > 1) {
    let currentPage = pages[pages.length - 2];
    let prevUrl: string = '/' + currentPage.route;
    let query: any[] = [];

    for (let key in currentPage.options) {
      if (Object.prototype.hasOwnProperty.call(currentPage.options, key)) {
        query.push(`${key}=${currentPage.options[key]}`);
      }
    }
    if (query.length) {
      prevUrl = prevUrl + '?' + query.join('&');
    }

    Taro.reLaunch({url: prevUrl})
  } else {
    Taro.reLaunch({
      url: '../site/index',
    });
  }
}
