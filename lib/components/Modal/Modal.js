"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Dialog = _interopRequireDefault(require("../Dialog"));

var _Button = _interopRequireDefault(require("../Button"));

require("./index.css");

var Modal = function Modal(props) {
  var _classNames;

  var prefixCls = props.prefixCls,
      footer = props.footer,
      visible = props.visible,
      wrapClassName = props.wrapClassName,
      model = props.model,
      restProps = (0, _objectWithoutPropertiesLoose2.default)(props, ["prefixCls", "footer", "visible", "wrapClassName", "model"]);

  var handleCancel = function handleCancel(e) {
    var onCancel = props.onCancel;
    onCancel && onCancel(e);
  };

  var handleOk = function handleOk(e) {
    var onOk = props.onOk;
    onOk && onOk(e);
  };

  var renderFooter = function renderFooter(locale) {
    if (locale === void 0) {
      locale = {
        cancelText: '取消',
        okText: '知道了'
      };
    }

    var okText = props.okText,
        okType = props.okType,
        cancelText = props.cancelText,
        showOkButton = props.showOkButton,
        showCancelButton = props.showCancelButton;
    var cancelButtonProps = props.cancelButtonProps || {};
    var okButtonProps = props.okButtonProps || {};

    if (props.model === 'tip') {
      cancelButtonProps.size = 'large';
      okButtonProps.size = 'large';
    }

    return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, showCancelButton && /*#__PURE__*/_react.default.createElement(_Button.default, (0, _extends2.default)({
      onClick: handleCancel
    }, cancelButtonProps), cancelText || locale.cancelText), showOkButton && /*#__PURE__*/_react.default.createElement(_Button.default, (0, _extends2.default)({
      onClick: handleOk,
      type: okType
    }, okButtonProps), okText || locale.okText));
  };

  var wrapClasses = (0, _classnames.default)(wrapClassName, (_classNames = {}, _classNames[prefixCls + "--tip__wrap"] = model === 'tip', _classNames));
  return /*#__PURE__*/_react.default.createElement(_Dialog.default, (0, _extends2.default)({}, restProps, {
    prefixCls: prefixCls,
    wrapClassName: wrapClasses,
    footer: footer === undefined ? renderFooter() : footer,
    visible: visible,
    onClose: handleCancel
  }));
};

Modal.defaultProps = {
  prefixCls: 'ace-modal',
  showOkButton: true,
  showCancelButton: true,
  model: "default",
  okButtonProps: {
    type: "primary"
  },
  cancelButtonProps: {
    type: "disabled"
  }
};
var _default = Modal;
exports.default = _default;