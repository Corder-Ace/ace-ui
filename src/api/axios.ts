import Taro from "@tarojs/taro";
import InterceptorsManger from './interceptors';
import {buildFullPath, mergeConfig} from './utils';
import {getEnvType} from "@/utils";
import transformData from "./transformData";

export interface RequestConfig {
  url?: string;
  baseURL?: string;
  method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';
  mode?: 'no-cors' | 'cors' | 'same-origin';
  data?: any;
  header?: any;
  dataType?: string;
  responseType?: string;
  success?: (response: any) => any;
  fail?: (error: any) => any;
  complete?: () => any;
  transformRequest?: (data: any) => '{"foo":"bar"}';
}

export interface ResponseConfig<T = any> {
  cookies: Array<any>;
  data: T;
  errMsg: string;
  header: any;
  statusCode: number
}

interface AxiosInstance {
  defaults: RequestConfig;
  interceptors: {
    request: InterceptorsManger<RequestConfig>;
    response: InterceptorsManger<ResponseConfig>;
  };

  request<T = any>(url: string, data?: any, options?: RequestConfig): Promise<T>;

  get<T = any>(url: string, data?: any, options?: RequestConfig): Promise<T>;

  post<T = any>(url: string, data?: any, options?: RequestConfig): Promise<T>;
}

class AxiosInstance {
  constructor() {
    this.defaults = {
      baseURL: '',
      method: 'GET',
      header: {
        // 表明是小程序的请求
        "X-UserAgent": getEnvType(),
        // 让服务端认为是Ajax
        "X-Requested-With": "XMLHttpRequest",
      },
      mode: 'no-cors',
      transformRequest: config => config
    };
    this.interceptors = {
      request: new InterceptorsManger(),
      response: new InterceptorsManger()
    };
  }

  request(url, data, options) {
    options = options || {};
    options.data = options.data || data;

    if (!options.method) options.method = 'GET';

    const mergeOptions: RequestConfig = mergeConfig(this.defaults, options);

    mergeOptions.url = buildFullPath(options.baseURL || this.defaults.baseURL, url);

    const chain = [dispatchRequest, undefined];
    let promise = Promise.resolve(mergeOptions);

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor.fulfilled, interceptor.rejected);
    });

    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }

  get(url, data, options) {
    options.method = 'GET';
    return this.request(url, data, options)
  }

  post(url, data, options) {
    options.method = 'POST';
    return this.request(url, data, options)
  }
}

function dispatchRequest(config): Promise<any> {
  config = transformData(
    config,
    config.transformRequest
  );

  return Taro.request(config)
}

export default new AxiosInstance();
