import React from 'react';
import { View, Text } from "@tarojs/components";
import classNames from 'classnames';
import './index.css';

var InternalButton = function InternalButton(props) {
  var _classNames;

  var className = props.className,
      type = props.type,
      shape = props.shape,
      ghost = props.ghost,
      prefixCls = props.prefixCls,
      block = props.block,
      hairline = props.hairline,
      size = props.size,
      style = props.style;
  var sizeCls;

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

  var innerLoading = false;

  var handleClick = function handleClick(e) {
    var onClick = props.onClick;

    if (innerLoading) {
      return;
    }

    onClick && onClick(e);
  };

  var classes = classNames(prefixCls, className, (_classNames = {}, _classNames[prefixCls + "-" + type] = type, _classNames[prefixCls + "-" + shape] = shape, _classNames[prefixCls + "-" + sizeCls] = sizeCls, _classNames[prefixCls + "-background-ghost"] = ghost, _classNames[prefixCls + "-hairline"] = hairline, _classNames[prefixCls + "-loading"] = innerLoading, _classNames[prefixCls + "-block"] = block, _classNames));
  return /*#__PURE__*/React.createElement(View, {
    className: classNames(classes),
    onClick: handleClick,
    style: style
  }, /*#__PURE__*/React.createElement(Text, {
    className: prefixCls + "__inner"
  }, props.children));
};

InternalButton.defaultProps = {
  prefixCls: 'ace-button',
  loading: false,
  block: false
};
export default InternalButton;