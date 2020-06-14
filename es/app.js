import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import { Component } from 'react';

var App = /*#__PURE__*/function (_Component) {
  _inheritsLoose(App, _Component);

  function App() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = App.prototype;

  _proto.componentDidMount = function componentDidMount() {};

  _proto.componentDidShow = function componentDidShow() {};

  _proto.componentDidHide = function componentDidHide() {};

  _proto.componentDidCatchError = function componentDidCatchError() {} // this.props.children 是将要会渲染的页面
  ;

  _proto.render = function render() {
    return this.props.children;
  };

  return App;
}(Component);

export default App;