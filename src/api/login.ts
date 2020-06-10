import Taro from "@tarojs/taro";
import sa from "sa-sdk-miniprogram"; // 神策sdk
import { get, getCartCount, reportRecommend, globalData } from "@/api";

let pending: boolean = false;
let callbacks: any[] = [];
const ENV = Taro.getEnv();
const MAX_RETRY_COUNT: number = 2; // 最大重试次数

const loginFn = {
  [Taro.ENV_TYPE.WEAPP]: {
    url: "/login/login-from-wechat-app",
    enhancer: enhancerLoginWeChat
  },
  [Taro.ENV_TYPE.SWAN]: { url: "/login/login-bdmapp", enhancer: enhancerSwan }
};

type Enhancer = (loginFn: Function) => (forceLogin: boolean) => Promise<any>;

function enhancerLoginWeChat(create: Function): Function {
  return async function(forceLogin?: boolean): Promise<any> {
    const code = await create(forceLogin).catch(err => console.log(err));
    if (globalData.userIdentity || (globalData.token && !forceLogin)) {
      pending = false;
      return Promise.resolve(globalData);
    }

    globalData.code = code;

    try {
      const user_info = await get<any>(loginFn[Taro.ENV_TYPE.WEAPP].url, {
        code
      });
      globalData.token = user_info.open_id || "";
      globalData.open_id = user_info.open_id || "";
      globalData.userIdentity = user_info.data;
      globalData.user_id = user_info.user_id;
      globalData.session_id = user_info.session_id;
      if (globalData.userIdentity && Taro.getStorageSync("@recommend")) {
        reportRecommend();
      }
      sa.setOpenid(`dev:token-${user_info.open_id}`);
      return Promise.resolve(globalData);
    } catch (err) {
      globalData.token = err.data.open_id || "";
      globalData.open_id = err.data.open_id || "";
      sa.setOpenid(`dev:token-${err.data.open_id}`);
      return Promise.reject(err);
    } finally {
      if (globalData.userIdentity) {
        const uid = globalData.userIdentity.slice(64).match(/-?(\d*)/);
        uid ? sa.login(uid[1]) : sa.login(`dev:token-${globalData.open_id}`);
      }

      sa.init();

      while (callbacks.length) {
        callbacks.shift()();
      }
      pending = false;
    }
  };
}

function enhancerSwan(cb: Function): Function {
  return async function(next?): Promise<any> {
    let loginInfo = { isLogin: false };
    try {
      // @ts-ignore
      loginInfo = swan.isLoginSync();
    } catch (err) {
      console.log(err);
    }
    if (!loginInfo.isLogin) {
      return Promise.reject({ ret_message: "百度宿主账号未登录" });
    }

    const code = await cb(next).catch(err => console.log(err));

    try {
      const user_info = await get<any>(loginFn[Taro.ENV_TYPE.SWAN].url, {
        code
      });

      globalData.userIdentity = user_info.data;
      globalData.user_id = user_info.user_id;
      globalData.session_id = user_info.session_id;
      getCartCount();

      return Promise.resolve(globalData);
    } catch (err) {
      getCartCount();
      return Promise.reject(err);
    }
  };
}

async function createLogin(
  enhancer?: Enhancer | boolean,
  forceLogin: boolean = false
) {
  if (enhancer !== undefined) {
    if (typeof enhancer === "function") {
      return enhancer(createLogin)(forceLogin);
    }
  }

  if (typeof enhancer === "boolean") {
    forceLogin = enhancer;
  }

  return login(forceLogin);
}

async function login(forceLogin: boolean) {
  if (globalData.code && !forceLogin) {
    return Promise.resolve(globalData.code);
  }

  let { code } = await Taro.login();

  if (!code || code === "undefined") {
    return retryWrapper(login, MAX_RETRY_COUNT);
  }

  return Promise.resolve(code);
}

function retryWrapper(
  func: (...rest: any[]) => Promise<any>,
  retryCount: number,
  ...rest: any[]
) {
  return new Promise((resolve, reject) => {
    func(...rest).then(
      res => {
        resolve(res);
      },
      err => {
        if (retryCount === 0) {
          reject(err);
        } else {
          return retryWrapper(func, retryCount - 1, ...rest);
        }
      }
    );
  });
}

export default function(forceLogin: boolean = false): Promise<any> {
  return new Promise(resolve => {
    if (!pending) {
      pending = true;
      return resolve(createLogin(loginFn[ENV].enhancer, forceLogin));
    } else {
      callbacks.push(() =>
        resolve(createLogin(loginFn[ENV].enhancer, forceLogin))
      );
    }
  });
}
