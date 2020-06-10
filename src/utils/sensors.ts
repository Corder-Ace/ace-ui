// import sa from 'sa-sdk-miniprogram'
// import Taro from "@tarojs/taro";

// sa.setPara({
//   name: 'sensors',
//   server_url: 'https://sa.aplum.com/sa',
//   // 全埋点控制开关，设置为 false 就是不采集相应的预置事件
//   autoTrack: false,
//   appid: 'wxbee40821d71e3a88'
// });

// // sa.init();


export function track(event: string, params: object) {
  if (process.env.TARO_ENV === 'h5') return;
  Taro.getApp().sensors.track(event, params)
}
