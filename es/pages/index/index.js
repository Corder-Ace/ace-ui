import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import React, { Component } from 'react';
import { View, Text } from '@tarojs/components';
import './index.css';

var Index = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Index, _Component);

  function Index() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Index.prototype;

  _proto.componentWillMount = function componentWillMount() {};

  _proto.componentDidMount = function componentDidMount() {};

  _proto.componentWillUnmount = function componentWillUnmount() {};

  _proto.componentDidShow = function componentDidShow() {};

  _proto.componentDidHide = function componentDidHide() {};

  _proto.render = function render() {
    return /*#__PURE__*/React.createElement(View, {
      className: "index"
    }, /*#__PURE__*/React.createElement(Text, null, "Hello world!"));
  };

  return Index;
}(Component);

export { Index as default };