import Taro from '@tarojs/taro';

const _toString = Object.prototype.toString;

export function getEnvType(): string {
  return Taro.getEnv() === 'WEAPP' ? 'wechat_app' : 'bdmapp';
}

export function cloneDeep(obj: Object): any {
  const target = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      target[key] = cloneDeep(obj[key]);
    } else {
      target[key] = obj[key];
    }
  }
  return target;
}

export function transformSwiperProducts(models: Array<any>, step: number): Array<any> {
  if (!isArray(models)) return [];
  const result: Array<any> = [];
  while (models.length) {
    if (Array.isArray(result[result.length - 1]) && result[result.length - 1].length < step) {
      result[result.length - 1].push(models.shift());
    } else {
      result.push([models.shift()])
    }
  }
  return result;
}

export function debounce(handler: Function, wait: number = 300) {
  let timer: any = null;
  return function () {
    const context = this;
    const args = [...arguments];
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      handler.apply(context, args);
    }, wait)
  }
}

export function uuid() {
  const s: any[] = [];
  const hexDigits = "0123456789abcdef";
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  return s.join("");
}

export function showToast(title: string, duration?: number, icon?: 'none' | 'success' | 'loading'): Promise<any> {
  return Taro.showToast({
    title,
    duration: duration ? duration : 2000,
    icon: icon ? icon : 'none'
  })
}

export function randString() {
  return Math.random().toString(36).substring(2);
}

export function isPlainObject(obj: any): boolean {
  return _toString.call(obj) === '[object Object]'
}

export function isObject(obj: any): boolean {
  return obj !== null && typeof obj === 'object'
}

export function isArray(obj: any): boolean {
  return Array.isArray(obj)
}

export function hasOwn(obj: Object, key: any): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

export function transformPackage2Url(originalUrl: string, packageName: string = '/pages'): string {
  return /^\.\.+/.test(originalUrl) ? originalUrl.replace(/^\.\.+/, packageName) : packageName.replace(/\/$/, '') + originalUrl;
}

export function getUrlParams(str, name) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, "i");
  const r = str.match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

export function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getScene(ctx): number {
  if (Taro.canIUse('getLaunchOptionsSync')) {
    return Taro.getLaunchOptionsSync().scene
  }

  return ctx.$router.params.scene
}

export function compareVersion(v1, v2): number {
  v1 = v1.split('.')
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i])
    const num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }

  return 0
}
export function normalizeTime(time: number): string {
  return `${Math.floor(time / 10)}${time % 10}`
}

export function go2Url(url: string, type: 'switchTab' | 'navigateTo' | 'redirectTo' | 'navigateBack' | 'reLaunch' = 'navigateTo'): void {
  if (!url) return;
  const tabs = [
    "/site/index",
    "/category/index",
    "/seller/intro",
    "/cart/index",
    "/my/index"
  ];
  const tabBar = tabs.find(tab => url.indexOf(tab) > -1);
  if (tabBar){
    Taro.switchTab({url});
    return
  }
  Taro[type]({url})
}
