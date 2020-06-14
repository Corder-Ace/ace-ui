"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _components = require("@tarojs/components");

var _classnames = _interopRequireDefault(require("classnames"));

require("./index.css");

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

  var classes = (0, _classnames.default)(prefixCls, className, (_classNames = {}, _classNames[prefixCls + "-" + type] = type, _classNames[prefixCls + "-" + shape] = shape, _classNames[prefixCls + "-" + sizeCls] = sizeCls, _classNames[prefixCls + "-background-ghost"] = ghost, _classNames[prefixCls + "-hairline"] = hairline, _classNames[prefixCls + "-loading"] = innerLoading, _classNames[prefixCls + "-block"] = block, _classNames));
  return /*#__PURE__*/_react.default.createElement(_components.View, {
    className: (0, _classnames.default)(classes),
    onClick: handleClick,
    style: style
  }, /*#__PURE__*/_react.default.createElement(_components.Text, {
    className: prefixCls + "__inner"
  }, props.children));
};

InternalButton.defaultProps = {
  prefixCls: 'ace-button',
  loading: false,
  block: false
};
var _default = InternalButton;
exports.default = _default;