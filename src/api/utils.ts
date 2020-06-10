import {isArray, hasOwn} from "@/utils";

function isAbsoluteURL(url: string): boolean {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
}

function combineURLs(baseURL: string, relativeURL: string): string {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
}

export function forEach(obj, fn: Function): void {
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  if (typeof obj !== 'object') {
    obj = [obj];
  }

  if (isArray(obj)) {
    for (let i = 0, l = obj.length; i < l; i++) {
      fn && fn.call(null, obj[i], i, obj);
    }
  } else {
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn && fn.call(null, obj[key], key, obj);
      }
    }
  }
}

export function deepMerge(...params/* obj1, obj2, obj3, ... */) {
  const result = {};

  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (let i = 0, l = params.length; i < l; i++) {
    forEach(params[i], assignValue);
  }

  return result;
}

export function deepClone(obj: Object): any {
  const target = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      target[key] = deepClone(obj[key]);
    } else {
      target[key] = obj[key];
    }
  }
  return target;
}

export function mergeConfig(config1, config2) {
  const target = deepClone(config1);
  const source = deepClone(config2);

  Object.keys(source).forEach(key => {
    if (!hasOwn(target, key)) {
      target[key] = source[key]
    } else {
      if (key === 'header') {
        const targetHeader = target[key];
        const sourceHeader = source[key];
        target[key] = {...targetHeader, ...sourceHeader};
      } else {
        target[key] = source[key];
      }
    }
  });

  return target
}

export function buildFullPath(baseURL: string, requestedURL: string): string {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}
