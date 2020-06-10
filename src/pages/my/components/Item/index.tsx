import Taro from 'React';
import classNames from 'classnames';
import {Image, Text, View} from "@tarojs/components";
import './index.scss';
import {CSSProperties} from "react";
import {globalData} from "@/api";
import {go2Url} from "@/utils";

interface ItemProps {
  name: string;
  img: string;
  link: string;
  num?: string;
  icon?: string;
  customStyle?: CSSProperties;
}
function goToUrl(url) {
  if (!globalData.userIdentity){
    go2Url('/pages/user/authorize');
    return;
  }
  Taro.navigateTo({url})
}
const prefixCls = 'plum-my-item';
export default function Item({name, num, img, link,customStyle,icon}:ItemProps) {
  return (
    <View key={name} className={classNames(`${prefixCls}`)} onClick={() => goToUrl(link)} style={customStyle}>
      <View className={`${prefixCls}-wrap`}>
        <Image className={`${prefixCls}-img`} src={img} mode='widthFix' lazyLoad />
        {num != '0' && <View className={`${prefixCls}-tag`}>{num}</View>}
        {icon && <View className={`${prefixCls}-icon-img`} style={{backgroundImage: `url(${icon})`}} />}
      </View>
      <Text className={`${prefixCls}-name`}>{name}</Text>
    </View>
  )
}
Item.defaultProps = {
  name: '',
  num: '',
  img: '',
  link: '',
  icon: '',
  customStyle: {}
};
