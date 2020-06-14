import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React from "react";
import { View } from '@tarojs/components';
import { Modal, Button } from '../../components';
import classNames from 'classnames';

var Site = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Site, _React$Component);

  function Site(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "handleModal", function (visible) {
      _this.setState({
        visible: visible
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleTipModal", function (visible) {
      _this.setState({
        tip: visible
      });
    });

    _this.state = {
      visible: false,
      tip: false
    };
    return _this;
  }

  var _proto = Site.prototype;

  _proto.componentDidMount = function componentDidMount() {};

  _proto.render = function render() {
    var _this2 = this;

    var prefixCls = Site.prefixCls;
    var _this$state = this.state,
        visible = _this$state.visible,
        tip = _this$state.tip;
    return /*#__PURE__*/React.createElement(View, {
      style: {
        padding: 30
      },
      className: classNames("" + prefixCls, prefixCls + "__container")
    }, /*#__PURE__*/React.createElement(Button, {
      block: true,
      type: "primary",
      style: {
        marginBottom: '15px'
      },
      onClick: function onClick() {
        return _this2.handleModal(true);
      }
    }, "\u5F00\u5F39\u7A97(primary)"), /*#__PURE__*/React.createElement(Button, {
      block: true,
      type: "cancel",
      style: {
        marginBottom: '15px'
      },
      onClick: function onClick() {
        return _this2.handleModal(false);
      }
    }, "cancel"), /*#__PURE__*/React.createElement(Button, {
      block: true,
      type: "primary",
      style: {
        marginBottom: '15px'
      },
      ghost: true,
      hairline: true
    }, "\u900F\u660E\u80CC\u666F + \u7EC6\u8FB9\u6846"), /*#__PURE__*/React.createElement(Button, {
      block: true,
      style: {
        marginBottom: '15px'
      }
    }, "default"), /*#__PURE__*/React.createElement(Button, {
      block: true,
      type: "disabled",
      style: {
        marginBottom: '15px'
      }
    }, "disabled"), /*#__PURE__*/React.createElement(Button, {
      block: true,
      type: "success",
      style: {
        marginBottom: '15px'
      }
    }, "success"), /*#__PURE__*/React.createElement(Button, {
      block: true,
      type: "primary",
      shape: "circle",
      style: {
        marginBottom: '15px'
      }
    }, "\u5DF2\u4E0B\u67B6"), /*#__PURE__*/React.createElement(Button, {
      block: true,
      type: "primary",
      style: {
        marginBottom: '15px'
      },
      size: "large"
    }, "large"), /*#__PURE__*/React.createElement(Button, {
      size: "small",
      block: true,
      type: "primary",
      style: {
        marginBottom: '15px'
      }
    }, "small"), /*#__PURE__*/React.createElement(Modal, {
      visible: visible,
      title: "\u6D3B\u52A8\u89C4\u5219",
      onOk: function onOk() {
        return _this2.handleModal(false);
      },
      onCancel: function onCancel() {
        return _this2.handleModal(false);
      },
      showCancelButton: false
    }, "\u5185\u5185\u5BB9\u5185\u5185\u5BB9\u91CD\u8981\u5185\u5BB9\u5185\u5BB9\u5185\u5BB9\u5185\u5BB9\u5185\u5BB9\u5185\u5BB9\u5185\u5BB9\u5185\u5BB9\u5185\u5BB9\u5185\u5BB9\u5185\u5185\u5BB9\u5185\u5BB9\u5185\u5BB9\u5185\u5BB9\u5185\u5BB9\u5185\u5BB9\u5185\u5BB9\u5185\u5BB9\u5185\u5BB9\u5185\u5BB9\u5185\u5BB9"), /*#__PURE__*/React.createElement(Modal, {
      visible: tip,
      title: "\u6D3B\u52A8\u89C4\u5219",
      onOk: function onOk() {
        return _this2.handleModal(false);
      },
      onCancel: function onCancel() {
        return _this2.handleModal(false);
      },
      showCancelButton: false,
      model: "tip"
    }, "\u5185\u5185\u5BB9\u5185\u5185\u5BB9\u91CD\u8981\u5185\u5BB9\u5185\u5BB9\u5185\u5BB9\u5185\u5BB9\u5185\u5BB9\u5185\u5BB9\u5185\u5BB9\u5185\u5BB9\u5185\u5BB9\u5185\u5BB9\u5185\u5185\u5BB9\u5185\u5BB9\u5185\u5BB9\u5185\u5BB9\u5185\u5BB9\u5185\u5BB9\u5185\u5BB9\u5185\u5BB9\u5185\u5BB9\u5185\u5BB9\u5185\u5BB9"));
  };

  return Site;
}(React.Component);

_defineProperty(Site, "prefixCls", 'plum-site');

export { Site as default };