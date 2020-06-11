import React from 'React';
import {CommonEvent} from '@tarojs/components/types/common';
import {View} from '@tarojs/components';
import {CSSProperties} from "react";
import classNames from 'classnames';
import './index.scss';


interface CurtainProps {
  closeBtnPosition: 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right';
  isOpened: boolean;
  onClose: (e) => void;
  customStyle?: CSSProperties;
  className?: string;
  maskable?: boolean;
}

class Curtain extends React.Component<CurtainProps, any> {
  static defaultProps: CurtainProps;
  onMask(e: CommonEvent): void {
    if (!this.props.maskable) return;
    this.onClose(e);
  }

  onClose(e: CommonEvent): void {
    e.stopPropagation();
    this.props.onClose(e)
  }

  _stopPropagation(e: CommonEvent): void {
    e.stopPropagation()
  }

  render() {
    const {
      className,
      customStyle,
      isOpened,
      closeBtnPosition
    } = this.props;
    const curtainClass = classNames({
      'ace-curtain': true,
      'ace-curtain--closed': !isOpened
    }, className);
    const btnCloseClass = classNames({
      'ace-curtain__btn-close': true,
      [`ace-curtain__btn-close--${closeBtnPosition}`]: closeBtnPosition
    });
    return (
      <View
        className={curtainClass}
        style={customStyle}
        onClick={this._stopPropagation}
      >
        <View className='ace-curtain__container' onClick={(e) => this.onMask(e)}>
          <View className='ace-curtain__body' onClick={this._stopPropagation}>
            {this.props.children}
            <View className={btnCloseClass} onClick={this.onClose.bind(this)} />
          </View>
        </View>
      </View>
    )
  }
}

Curtain.defaultProps = {
  closeBtnPosition: 'top-right',
  isOpened: false,
  maskable: false,
  onClose: () => {}
};

export default Curtain;
