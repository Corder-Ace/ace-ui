import React from 'react';
import {View, Text, ITouchEvent} from "@tarojs/components";
import classNames from 'classnames';
import './index.scss';

export type ButtonType = 'default' | 'primary' | 'ghost' | 'disabled';

export interface BaseButtonProps {
  type?: ButtonType;
  shape?: 'circle' | 'circle-outline' | 'round';
  size?: 'large' | 'small';
  icon?: React.ReactNode;
  loading?: boolean;
  prefixCls?: string;
  className?: string;
  ghost?: boolean;
  danger?: boolean;
  block?: boolean;
  hairline?: boolean;
  children?: React.ReactNode;
  onClick?: (e: ITouchEvent) => void;
}

const InternalButton: React.FC<BaseButtonProps> = props => {
  const {
    className,
    type,
    shape,
    ghost,
    prefixCls,
    block,
    hairline,
    size
  } = props;

  let sizeCls;
  switch (size) {
    case 'large':
      sizeCls = 'lg';
      break;
    case 'small':
      sizeCls = 'sm';
      break;
    default:
      break;
  }
  const innerLoading = false;
  const handleClick = (e: ITouchEvent) => {
    const { onClick } = props;
    if (innerLoading) {
      return;
    }
    onClick && onClick(e)
  };
  const classes = classNames(prefixCls, className, {
    [`${prefixCls}-${type}`]: type,
    [`${prefixCls}-${shape}`]: shape,
    [`${prefixCls}-${sizeCls}`]: sizeCls,
    [`${prefixCls}-background-ghost`]: ghost,
    [`${prefixCls}-hairline`]: hairline,
    [`${prefixCls}-loading`]: innerLoading,
    [`${prefixCls}-block`]: block,
  });

  return (
    <View className={classNames(classes)} onClick={handleClick}>
      <Text className={`${prefixCls}__inner`}>{props.children}</Text>
    </View>
  )
}

InternalButton.defaultProps = {
  prefixCls: 'ace-button',
  loading: false,
  block: false
}

export default InternalButton;
