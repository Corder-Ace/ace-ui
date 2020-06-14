import React from 'react';
import { View, ScrollView, Text } from '@tarojs/components';
import classNames from 'classnames';
import './index.css';

function FloatLayout(props) {
  var _classNames, _classNames2, _classNames3;

  var prefixCls = props.prefixCls,
      titleAlign = props.titleAlign,
      title = props.title,
      subtitle = props.subtitle,
      btn = props.btn,
      btnText = props.btnText,
      mask = props.mask,
      scrollY = props.scrollY,
      scrollX = props.scrollX,
      scrollTop = props.scrollTop,
      scrollLeft = props.scrollLeft,
      upperThreshold = props.upperThreshold,
      lowerThreshold = props.lowerThreshold,
      scrollWithAnimation = props.scrollWithAnimation,
      onScroll = props.onScroll,
      onScrollToLower = props.onScrollToLower,
      onScrollToUpper = props.onScrollToUpper;
  var rootClass = classNames(prefixCls + "-wrapper", (_classNames = {}, _classNames[prefixCls + "-active"] = props.isOpened, _classNames), props.className);

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

  return /*#__PURE__*/React.createElement(View, {
    className: rootClass
  }, mask && /*#__PURE__*/React.createElement(View, {
    onClick: onMaskClick,
    className: prefixCls + "-overlay"
  }), /*#__PURE__*/React.createElement(View, {
    className: prefixCls + "-container"
  }, title && /*#__PURE__*/React.createElement(View, {
    className: classNames(prefixCls + "-header", (_classNames2 = {}, _classNames2[prefixCls + "-header-left"] = titleAlign === 'left', _classNames2))
  }, /*#__PURE__*/React.createElement(Text, null, title), subtitle && /*#__PURE__*/React.createElement(Text, {
    className: prefixCls + "-header-subtitle"
  }, subtitle), /*#__PURE__*/React.createElement(View, {
    className: prefixCls + "-close",
    onClick: close
  }, "x")), /*#__PURE__*/React.createElement(View, {
    className: prefixCls + "-body"
  }, /*#__PURE__*/React.createElement(ScrollView, {
    scrollY: scrollY,
    scrollX: scrollX,
    scrollTop: scrollTop,
    scrollLeft: scrollLeft,
    upperThreshold: upperThreshold,
    lowerThreshold: lowerThreshold,
    scrollWithAnimation: scrollWithAnimation,
    onScroll: onScroll,
    onScrollToLower: onScrollToLower,
    onScrollToUpper: onScrollToUpper,
    className: classNames(prefixCls + "-body-content", (_classNames3 = {}, _classNames3[prefixCls + "-body-content-btn"] = btn, _classNames3))
  }, props.children)), btn && /*#__PURE__*/React.createElement(View, {
    className: prefixCls + "-bottom",
    onClick: close
  }, /*#__PURE__*/React.createElement(View, {
    className: prefixCls + "-btn"
  }, btnText))));
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
  onClose: function onClose() {},
  onScroll: function onScroll() {},
  onScrollToLower: function onScrollToLower() {},
  onScrollToUpper: function onScrollToUpper() {}
};
export default FloatLayout;