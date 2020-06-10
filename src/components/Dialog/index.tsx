import React, {CSSProperties, ReactNode} from 'react';
import {ITouchEvent, View} from '@tarojs/components';
import classNames from 'classnames';

export interface DialogProps {
  className?: string;
  prefixCls?: string;
  mask?: boolean;
  maskClosable?: boolean;
  maskStyle?: CSSProperties;
  style?: CSSProperties;
  visible?: boolean;
  title?: string | ReactNode;
  wrapClassName?: string;
  footer?: string | ReactNode;
  onClose?: (...args) => void;
  onCancel?: (...args) => void;
  onOk?: (...args) => void;
  okText?: string | ReactNode;
  cancelText?: string | ReactNode;
  width?: string | number;
  children?: string | ReactNode;
}

export default class Modal extends React.Component<DialogProps, any> {
  static defaultProps = {
    prefixCls: 'ace-dialog',
    mask: true,
    visible: false,
    maskClosable: true,
  }
  close = (e: ITouchEvent) => {
    const { onClose } = this.props;
    onClose && onClose(e);
  }

  onMaskClick = (e: ITouchEvent) => {
    const { maskClosable } = this.props;
    if (!maskClosable) return;
    this.close(e);
  }

  render() {
    const props = this.props;
    const {visible, mask, prefixCls, wrapClassName} = props;
    let header;
    if (props.title) {
      header = (
        <View className={`${prefixCls}__header`}>
          <View className={`${prefixCls}--title`}>
            {props.title}
          </View>
        </View>
      );
    }
    let footer;
    if (props.footer) {
      footer = (
        <View className={`${prefixCls}__footer`}>
          {props.footer}
        </View>
      )
    }
    const wrapClasses = classNames(
      wrapClassName,
      `${prefixCls}`,
      `${prefixCls}__container`,
      {[`${prefixCls}--visible`]: visible}
    )
    return (
      <View className={wrapClasses}>
        {mask && <View className={`${prefixCls}__mask`} onClick={this.onMaskClick} />}
        <View className={`${prefixCls}__content`}>
          {header}
          <View className={`${prefixCls}__body`}>
            {props.children}
          </View>
          {footer}
        </View>
      </View>
    )
  }
}
