import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React from 'React';
import { View } from '@tarojs/components';
import classNames from 'classnames';
import './index.css';

var Curtain = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Curtain, _React$Component);

  function Curtain() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Curtain.prototype;

  _proto.onMask = function onMask(e) {
    if (!this.props.maskable) return;
    this.onClose(e);
  };

  _proto.onClose = function onClose(e) {
    e.stopPropagation();
    this.props.onClose(e);
  };

  _proto._stopPropagation = function _stopPropagation(e) {
    e.stopPropagation();
  };

  _proto.render = function render() {
    var _classNames,
        _this = this;

    var _this$props = this.props,
        className = _this$props.className,
        customStyle = _this$props.customStyle,
        isOpened = _this$props.isOpened,
        closeBtnPosition = _this$props.closeBtnPosition;
    var curtainClass = classNames({
      'ace-curtain': true,
      'ace-curtain--closed': !isOpened
    }, className);
    var btnCloseClass = classNames((_classNames = {
      'ace-curtain__btn-close': true
    }, _classNames["ace-curtain__btn-close--" + closeBtnPosition] = closeBtnPosition, _classNames));
    return /*#__PURE__*/React.createElement(View, {
      className: curtainClass,
      style: customStyle,
      onClick: this._stopPropagation
    }, /*#__PURE__*/React.createElement(View, {
      className: "ace-curtain__container",
      onClick: function onClick(e) {
        return _this.onMask(e);
      }
    }, /*#__PURE__*/React.createElement(View, {
      className: "ace-curtain__body",
      onClick: this._stopPropagation
    }, this.props.children, /*#__PURE__*/React.createElement(View, {
      className: btnCloseClass,
      onClick: this.onClose.bind(this)
    }))));
  };

  return Curtain;
}(React.Component);

_defineProperty(Curtain, "defaultProps", void 0);

Curtain.defaultProps = {
  closeBtnPosition: 'top-right',
  isOpened: false,
  maskable: false,
  onClose: function onClose() {}
};
export default Curtain;