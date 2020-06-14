"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _components = require("@tarojs/components");

var _classnames = _interopRequireDefault(require("classnames"));

var Modal = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2.default)(Modal, _React$Component);

  function Modal() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "close", function (e) {
      var onClose = _this.props.onClose;
      onClose && onClose(e);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onMaskClick", function (e) {
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
      header = /*#__PURE__*/_react.default.createElement(_components.View, {
        className: prefixCls + "__header"
      }, /*#__PURE__*/_react.default.createElement(_components.View, {
        className: prefixCls + "--title"
      }, props.title));
    }

    var footer;

    if (props.footer) {
      footer = /*#__PURE__*/_react.default.createElement(_components.View, {
        className: prefixCls + "__footer"
      }, props.footer);
    }

    var wrapClasses = (0, _classnames.default)(wrapClassName, "" + prefixCls, prefixCls + "__container", (_classNames = {}, _classNames[prefixCls + "--visible"] = visible, _classNames));
    return /*#__PURE__*/_react.default.createElement(_components.View, {
      className: wrapClasses
    }, mask && /*#__PURE__*/_react.default.createElement(_components.View, {
      className: prefixCls + "__mask",
      onClick: this.onMaskClick
    }), /*#__PURE__*/_react.default.createElement(_components.View, {
      className: prefixCls + "__content"
    }, header, /*#__PURE__*/_react.default.createElement(_components.View, {
      className: prefixCls + "__body"
    }, props.children), footer));
  };

  return Modal;
}(_react.default.Component);

exports.default = Modal;
(0, _defineProperty2.default)(Modal, "defaultProps", {
  prefixCls: 'ace-dialog',
  mask: true,
  visible: false,
  maskClosable: true
});