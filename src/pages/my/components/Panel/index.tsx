import Taro from 'React';
import classNames from 'classnames';
import {CSSProperties} from "react";
import {Text, View} from "@tarojs/components";
import './index.scss';

interface PanelProps {
  title?: string;
  subtitle?: string;
  customStyle?: CSSProperties;
  icon?: boolean;
  iconInfo?: {
    prefixClass?: string;
    value?: string;
    size?: number;
    color?: string;
  };
  onSubTitleClick?: () => void;
  children?: any
}
const prefixCls = 'plum-my-panel';
function Panel(props: PanelProps) {
  const { iconInfo } = props;
  return (
    <View className={classNames(`${prefixCls}`)} style={props.customStyle}>
      <View className={classNames(`${prefixCls}-header`)} >
        <Text className={`${prefixCls}-title`}>{props.title}</Text>
        {props.subtitle && <View onClick={props.onSubTitleClick} className={`${prefixCls}-action`}>{props.subtitle}{props.icon && <AtIcon prefixClass={iconInfo && iconInfo.prefixClass} value={iconInfo && iconInfo.value || 'jinru'} size={iconInfo && iconInfo.size} color={iconInfo && iconInfo.color} customStyle={{marginLeft: '10rpx'}} />}</View>}
      </View>
      <View className={`${prefixCls}-content`}>
        {props.children}
      </View>
    </View>
  )
}

Panel.defaultProps = {
  title: '',
  subtitle: '',
  customStyle: {},
  icon: true,
  iconInfo: {
    prefixClass: 'icon',
    value: 'jinru',
    size: 9,
    color: '#0D0E15'
  },
  onSubTitleClick: () => {}
};
export default Panel;
