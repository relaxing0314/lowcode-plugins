import _Message from "@alifd/next/es/message";
import _Button from "@alifd/next/es/button";
import _Loading from "@alifd/next/es/loading";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React, { Component, Suspense } from 'react';
import styles from './ErrorBoundary.less';
export var ErrorBoundary = /*#__PURE__*/function (_Component) {
  _inheritsLoose(ErrorBoundary, _Component);
  function ErrorBoundary() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      hasError: false,
      info: null
    };
    _this._handleReset = function () {
      _this.setState({
        hasError: false
      });
    };
    return _this;
  }
  ErrorBoundary.getDerivedStateFromError = function getDerivedStateFromError() {
    return {
      hasError: true
    };
  };
  var _proto = ErrorBoundary.prototype;
  _proto.componentDidCatch = function componentDidCatch(error, info) {
    var onCatch = this.props.onCatch;
    if (onCatch) {
      onCatch(error, info);
      this.setState({
        info: info
      });
    }
  };
  _proto.render = function render() {
    var children = this.props.children;
    var _this$state = this.state,
      hasError = _this$state.hasError,
      info = _this$state.info;
    // const error = new Error('component render error');
    var errorInfo = {
      stack: (info === null || info === void 0 ? void 0 : info.componentStack) || ''
    };
    if (!hasError) {
      return /*#__PURE__*/React.createElement(Suspense, {
        fallback: /*#__PURE__*/React.createElement(_Loading, {
          visible: true
        })
      }, children);
    }
    return /*#__PURE__*/React.createElement(_Message, {
      title: "\u51FA\u9519\u4E86~",
      type: "error"
    }, /*#__PURE__*/React.createElement("p", null, "\u8BE6\u7EC6\u9519\u8BEF: ", errorInfo || '未知原因'), /*#__PURE__*/React.createElement("div", {
      className: styles.actions
    }, /*#__PURE__*/React.createElement(_Button, {
      onClick: this._handleReset,
      size: "small"
    }, "\u91CD\u8BD5")));
  };
  return ErrorBoundary;
}(Component);