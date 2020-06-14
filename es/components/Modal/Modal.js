import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React, { Fragment } from 'react';
import classNames from 'classnames';
import Dialog from '../Dialog';
import Button from '../Button';
import './index.css';

var Modal = function Modal(props) {
  var _classNames;

  var prefixCls = props.prefixCls,
      footer = props.footer,
      visible = props.visible,
      wrapClassName = props.wrapClassName,
      model = props.model,
      restProps = _objectWithoutPropertiesLoose(props, ["prefixCls", "footer", "visible", "wrapClassName", "model"]);

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

    return /*#__PURE__*/React.createElement(Fragment, null, showCancelButton && /*#__PURE__*/React.createElement(Button, _extends({
      onClick: handleCancel
    }, cancelButtonProps), cancelText || locale.cancelText), showOkButton && /*#__PURE__*/React.createElement(Button, _extends({
      onClick: handleOk,
      type: okType
    }, okButtonProps), okText || locale.okText));
  };

  var wrapClasses = classNames(wrapClassName, (_classNames = {}, _classNames[prefixCls + "--tip__wrap"] = model === 'tip', _classNames));
  return /*#__PURE__*/React.createElement(Dialog, _extends({}, restProps, {
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
export default Modal;