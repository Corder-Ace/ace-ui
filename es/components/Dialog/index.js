import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React from 'react';
import { View } from '@tarojs/components';
import classNames from 'classnames';

var Modal = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Modal, _React$Component);

  function Modal() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "close", function (e) {
      var onClose = _this.props.onClose;
      onClose && onClose(e);
    });

    _defineProperty(_assertThisInitialized(_this), "onMaskClick", function (e) {
      var maskClosable = _this.props.maskClosable;
      if (!maskClosable) return;

      _this.close(e);
    });

    return _this;
  }

  var _proto = Modal.prototype;

  _proto.render = function render() {
    var _classNames;

    var props = this.props;
    var visible = props.visible,
        mask = props.mask,
        prefixCls = props.prefixCls,
        wrapClassName = props.wrapClassName;
    var header;

    if (props.title) {
      header = /*#__PURE__*/React.createElement(View, {
        className: prefixCls + "__header"
      }, /*#__PURE__*/React.createElement(View, {
        className: prefixCls + "--title"
      }, props.title));
    }

    var footer;

    if (props.footer) {
      footer = /*#__PURE__*/React.createElement(View, {
        className: prefixCls + "__footer"
      }, props.footer);
    }

    var wrapClasses = classNames(wrapClassName, "" + prefixCls, prefixCls + "__container", (_classNames = {}, _classNames[prefixCls + "--visible"] = visible, _classNames));
    return /*#__PURE__*/React.createElement(View, {
      className: wrapClasses
    }, mask && /*#__PURE__*/React.createElement(View, {
      className: prefixCls + "__mask",
      onClick: this.onMaskClick
    }), /*#__PURE__*/React.createElement(View, {
      className: prefixCls + "__content"
    }, header, /*#__PURE__*/React.createElement(View, {
      className: prefixCls + "__body"
    }, props.children), footer));
  };

  return Modal;
}(React.Component);

_defineProperty(Modal, "defaultProps", {
  prefixCls: 'ace-dialog',
  mask: true,
  visible: false,
  maskClosable: true
});

export { Modal as default };