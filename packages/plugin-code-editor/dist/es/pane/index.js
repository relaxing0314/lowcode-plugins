import _Dialog from "@alifd/next/es/dialog";
import _Message from "@alifd/next/es/message";
import React, { useEffect, useState, useMemo, memo, useRef } from 'react';
import { JsEditor, CssEditor } from '../components';
import { schema2JsCode, schema2CssCode } from '../utils';
import { WORDS, TAB_KEY } from '../config';
import { common } from '@alilc/lowcode-engine';
import '@alilc/lowcode-plugin-base-monaco-editor/lib/style';
import './index.less';
import { SaveIcon } from '../components/SaveIcon';
export var CodeEditorPane = /*#__PURE__*/memo(function (_ref) {
  var project = _ref.project,
    event = _ref.event,
    skeleton = _ref.skeleton;
  var _useState = useState(TAB_KEY.JS),
    activeKey = _useState[0],
    setActiveKey = _useState[1];
  var lowcodeProjectRef = useRef(project);
  var skeletonRef = useRef(skeleton);
  var eventRef = useRef(event);
  var jsEditorRef = useRef(null);
  var cssEditorRef = useRef(null);
  var saveSchemaRef = useRef(); // save code to schema

  var _useState2 = useState(function () {
      return project.exportSchema(common.designerCabin.TransformStage.Save);
    }),
    schema = _useState2[0],
    setSchema = _useState2[1];
  var jsCode = useMemo(function () {
    return schema2JsCode(schema);
  }, [schema]);
  var cssCode = useMemo(function () {
    return schema2CssCode(schema);
  }, [schema]);
  useEffect(function () {
    saveSchemaRef.current = function () {
      try {
        var _lowcodeProjectRef$cu, _jsEditorRef$current$, _jsEditorRef$current, _cssEditorRef$current, _cssEditorRef$current2, _lowcodeProjectRef$cu2;
        var currentSchema = (_lowcodeProjectRef$cu = lowcodeProjectRef.current) === null || _lowcodeProjectRef$cu === void 0 ? void 0 : _lowcodeProjectRef$cu.exportSchema(common.designerCabin.TransformStage.Save);
        var pageNode = currentSchema.componentsTree[0];
        var _ref2 = (_jsEditorRef$current$ = (_jsEditorRef$current = jsEditorRef.current) === null || _jsEditorRef$current === void 0 ? void 0 : _jsEditorRef$current.getSchemaFromCode()) !== null && _jsEditorRef$current$ !== void 0 ? _jsEditorRef$current$ : {},
          state = _ref2.state,
          methods = _ref2.methods,
          lifeCycles = _ref2.lifeCycles,
          _ref2$originCode = _ref2.originCode,
          originCode = _ref2$originCode === void 0 ? '' : _ref2$originCode;
        var css = (_cssEditorRef$current = (_cssEditorRef$current2 = cssEditorRef.current) === null || _cssEditorRef$current2 === void 0 ? void 0 : _cssEditorRef$current2.getBeautifiedCSS()) !== null && _cssEditorRef$current !== void 0 ? _cssEditorRef$current : cssCode;
        pageNode.state = state;
        pageNode.methods = methods;
        pageNode.lifeCycles = lifeCycles;
        pageNode.originCode = originCode;
        pageNode.css = css;
        (_lowcodeProjectRef$cu2 = lowcodeProjectRef.current) === null || _lowcodeProjectRef$cu2 === void 0 ? void 0 : _lowcodeProjectRef$cu2.importSchema(currentSchema);
        setSchema(currentSchema);
        _Message.success({
          content: WORDS.saveSuccess,
          duration: 1000
        });
      } catch (err) {
        if (err instanceof Error) {
          _Dialog.alert({
            title: WORDS.title,
            content: /*#__PURE__*/React.createElement(React.Fragment, null, WORDS.generalParseError, /*#__PURE__*/React.createElement("pre", null, err.message)),
            onOk: function onOk() {
              var _skeletonRef$current;
              (_skeletonRef$current = skeletonRef.current) === null || _skeletonRef$current === void 0 ? void 0 : _skeletonRef$current.showPanel('codeEditor');
            }
          });
        }
        // eslint-disable-next-line no-console
        console.error(err);
      }
    };
  }, [cssCode]);
  useEffect(function () {
    lowcodeProjectRef.current = project;
  }, [project]);
  useEffect(function () {
    skeletonRef.current = skeleton;
  }, [skeleton]);
  useEffect(function () {
    eventRef.current = event;
  }, [event]);
  useEffect(function () {
    var _eventRef$current, _eventRef$current2, _eventRef$current3, _eventRef$current4, _eventRef$current5;
    // load schema on open
    (_eventRef$current = eventRef.current) === null || _eventRef$current === void 0 ? void 0 : _eventRef$current.on('skeleton.panel-dock.active', function (pluginName) {
      if (pluginName === 'codeEditor') {
        var _lowcodeProjectRef$cu3, _jsEditorRef$current2, _cssEditorRef$current3;
        var _schema = (_lowcodeProjectRef$cu3 = lowcodeProjectRef.current) === null || _lowcodeProjectRef$cu3 === void 0 ? void 0 : _lowcodeProjectRef$cu3.exportSchema(common.designerCabin.TransformStage.Save);
        if (!_schema) {
          return;
        }
        var _jsCode = schema2JsCode(_schema);
        var _cssCode = schema2CssCode(_schema);
        setSchema(_schema);
        (_jsEditorRef$current2 = jsEditorRef.current) === null || _jsEditorRef$current2 === void 0 ? void 0 : _jsEditorRef$current2._updateCode(_jsCode);
        (_cssEditorRef$current3 = cssEditorRef.current) === null || _cssEditorRef$current3 === void 0 ? void 0 : _cssEditorRef$current3._updateCode(_cssCode);
      }
    });

    // save schema when panel closed
    (_eventRef$current2 = eventRef.current) === null || _eventRef$current2 === void 0 ? void 0 : _eventRef$current2.on('skeleton.panel-dock.unactive', function (pluginName) {
      if (pluginName === 'codeEditor') {
        var _saveSchemaRef$curren;
        (_saveSchemaRef$curren = saveSchemaRef.current) === null || _saveSchemaRef$curren === void 0 ? void 0 : _saveSchemaRef$curren.call(saveSchemaRef);
      }
    });

    // 手动更新源码面板
    (_eventRef$current3 = eventRef.current) === null || _eventRef$current3 === void 0 ? void 0 : _eventRef$current3.on('common:codeEditor.updateCode', function (schema) {
      var _jsEditorRef$current3, _cssEditorRef$current4;
      if (!schema) {
        return;
      }
      var jsCode = schema2JsCode(schema);
      var cssCode = schema2CssCode(schema);
      setSchema(schema);
      (_jsEditorRef$current3 = jsEditorRef.current) === null || _jsEditorRef$current3 === void 0 ? void 0 : _jsEditorRef$current3._updateCode(jsCode);
      (_cssEditorRef$current4 = cssEditorRef.current) === null || _cssEditorRef$current4 === void 0 ? void 0 : _cssEditorRef$current4._updateCode(cssCode);
    });

    // focus function by functionName
    (_eventRef$current4 = eventRef.current) === null || _eventRef$current4 === void 0 ? void 0 : _eventRef$current4.on('common:codeEditor.focusByFunction', function (params) {
      setActiveKey(TAB_KEY.JS);
      setTimeout(function () {
        var _jsEditorRef$current4;
        (_jsEditorRef$current4 = jsEditorRef.current) === null || _jsEditorRef$current4 === void 0 ? void 0 : _jsEditorRef$current4.focusByFunctionName(params);
      }, 100);
    });
    (_eventRef$current5 = eventRef.current) === null || _eventRef$current5 === void 0 ? void 0 : _eventRef$current5.on('common:codeEditor.addFunction', function (params) {
      setActiveKey(TAB_KEY.JS);
      setTimeout(function () {
        var _jsEditorRef$current5;
        (_jsEditorRef$current5 = jsEditorRef.current) === null || _jsEditorRef$current5 === void 0 ? void 0 : _jsEditorRef$current5.addFunction(params);
      }, 100);
    });
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "plugin-code-editor-pane"
  }, /*#__PURE__*/React.createElement(JsEditor, {
    jsCode: jsCode,
    ref: jsEditorRef,
    currentTab: activeKey,
    onTabChange: function onTabChange(key) {
      return setActiveKey(key);
    }
  }), /*#__PURE__*/React.createElement(CssEditor, {
    cssCode: cssCode,
    ref: cssEditorRef,
    currentTab: activeKey,
    onTabChange: function onTabChange(key) {
      return setActiveKey(key);
    }
  }), /*#__PURE__*/React.createElement(SaveIcon, {
    onClick: function onClick() {
      var _saveSchemaRef$curren2;
      (_saveSchemaRef$curren2 = saveSchemaRef.current) === null || _saveSchemaRef$curren2 === void 0 ? void 0 : _saveSchemaRef$curren2.call(saveSchemaRef);
    }
    // isDisabled={code === jsCode || hasError}
  }));
});

CodeEditorPane.displayName = 'LowcodeCodeEditor';