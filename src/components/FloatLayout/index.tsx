import React from 'react';
import {View, ScrollView, Text} from '@tarojs/components';
import classNames from 'classnames'
import './index.scss';

interface FloatLayoutProps {
  children?: any;
  prefixCls?: string;
  className?: string;
  title?: string;
  subtitle?: string;
  titleAlign?: 'left' | 'center';
  btnText?: string;
  mask?: boolean;
  btn?: boolean;
  maskClosable?: boolean;
  isOpened: boolean;
  scrollY?: boolean;
  scrollX?: boolean;
  scrollTop?: number;
  scrollLeft?: number;
  upperThreshold?: number;
  lowerThreshold?: number;
  scrollWithAnimation?: boolean;
  onClose?: () => void;
  onScroll?: () => void;
  onScrollToLower?: () => void;
  onScrollToUpper?: () => void;
}

function FloatLayout(props: FloatLayoutProps) {
  const {
    prefixCls,
    titleAlign,
    title,
    subtitle,
    btn,
    btnText,
    mask,
    scrollY,
    scrollX,
    scrollTop,
    scrollLeft,
    upperThreshold,
    lowerThreshold,
    scrollWithAnimation,
    onScroll,
    onScrollToLower,
    onScrollToUpper
  } = props;
  const rootClass = classNames(
    `${prefixCls}-wrapper`,
    {
      [`${prefixCls}-active`]: props.isOpened
    },
    props.className
  );

  function close() {
    if ('onClose' in props) {
      props.onClose && props.onClose();
      return;
    }
  }

  function onMaskClick() {
    if (!props.maskClosable) return;
    close();
  }

  return (
    <View className={rootClass}>
      {mask && <View onClick={onMaskClick} className={`${prefixCls}-overlay`} />}
      <View className={`${prefixCls}-container`}>
        {title && (<View className={classNames(`${prefixCls}-header`, {
          [`${prefixCls}-header-left`]: titleAlign === 'left'
        })}
        >
          <Text>{title}</Text>
          {subtitle && <Text className={`${prefixCls}-header-subtitle`}>{subtitle}</Text>}
          <View className={`${prefixCls}-close`} onClick={close}>x</View>
        </View>)}
        <View className={`${prefixCls}-body`}>
          <ScrollView
            scrollY={scrollY}
            scrollX={scrollX}
            scrollTop={scrollTop}
            scrollLeft={scrollLeft}
            upperThreshold={upperThreshold}
            lowerThreshold={lowerThreshold}
            scrollWithAnimation={scrollWithAnimation}
            onScroll={onScroll}
            onScrollToLower={onScrollToLower}
            onScrollToUpper={onScrollToUpper}
            className={classNames(`${prefixCls}-body-content`, {[`${prefixCls}-body-content-btn`]: btn})}
          >
            {props.children}
          </ScrollView>
        </View>
        {btn && <View className={`${prefixCls}-bottom`} onClick={close}>
          <View className={`${prefixCls}-btn`}>
            {btnText}
          </View>
        </View>}
      </View>
    </View>
  )
}

FloatLayout.defaultProps = {
  prefixCls: 'plum-float-layout',
  title: '',
  titleAlign: 'center',
  mask: true,
  maskClosable: true,
  btn: false,
  btnText: '知道了',
  isOpened: false,
  scrollY: true,
  scrollX: false,
  scrollWithAnimation: false,
  onClose: () => {
  },
  onScroll: () => {
  },
  onScrollToLower: () => {
  },
  onScrollToUpper: () => {
  }
};
export default FloatLayout;
