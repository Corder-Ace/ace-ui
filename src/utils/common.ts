import Taro from 'React';

const ENV = Taro.getEnv();

export function requestPayment(info): Promise<any> {
  switch (ENV) {
    case Taro.ENV_TYPE.SWAN:
      return swanPay(info);
    default:
      return Taro.requestPayment(info);
  }
}

export function f() {

}
const swanPay = res => {
  return new Promise((resolve, reject) => {
    const params: any = {};
    params.orderInfo = res;
    params.success = function (info) {
      resolve(info);
    };
    params.fail = function (err) {
      reject(err);
    };
    // @ts-ignore
    swan.requestPolymerPayment(params);
  });
};
