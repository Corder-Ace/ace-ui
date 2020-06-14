"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _components = require("@tarojs/components");

require("./index.css");

var Index = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2.default)(Index, _Component);

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
    return /*#__PURE__*/_react.default.createElement(_components.View, {
      className: "index"
    }, /*#__PURE__*/_react.default.createElement(_components.Text, null, "Hello world!"));
  };

  return Index;
}(_react.Component);

exports.default = Index;