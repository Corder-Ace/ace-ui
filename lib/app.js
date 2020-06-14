"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = require("react");

var App = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2.default)(App, _Component);

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
}(_react.Component);

var _default = App;
exports.default = _default;