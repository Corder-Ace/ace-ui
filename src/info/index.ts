import Taro from '@tarojs/taro';
import {hasOwn} from "@/utils";

const appInfo = {
  SDKVersion: '',
  model: '',
  windowHeight: 0,
  windowWidth: 0,
  safeArea: {},
  isIPhoneX: false,
};

export function checkAppInfo(): void {
  if (process.env.TARO_ENV === 'h5') return;
  const system = Taro.getSystemInfoSync();
  for (let key in appInfo) {
    if (hasOwn(system, key)) {
      appInfo[key] = system[key]
    }
  }
  appInfo.isIPhoneX = system.model.search('iPhone X') != -1;
}

export function checkUpdate() {
  if (!Taro.canIUse('getUpdateManager')) return;
  const UpdateManager = Taro.getUpdateManager();
  UpdateManager.onCheckForUpdate(function (res) {
    if (res.hasUpdate) {
      console.log(res.hasUpdate, '有新版本')
    } else {
      console.log(res.hasUpdate, '没有新版本')
    }
  });
  UpdateManager.onUpdateReady(function () {
    Taro.showModal({
      title: '提示',
      content: '红布林小程序更新啦！点击确认更新',
      success(res) {
        if (res.confirm) {
          UpdateManager.applyUpdate()
        }
      }
    })
  })
}

export function getAppInfo(): typeof appInfo {
  return appInfo
}
