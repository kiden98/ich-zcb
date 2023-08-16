(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/vk-data-input-editor/vk-data-input-editor"],{

/***/ 624:
/*!****************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-admin/components/vk-data-input-editor/vk-data-input-editor.vue ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vk_data_input_editor_vue_vue_type_template_id_66a21f64_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vk-data-input-editor.vue?vue&type=template&id=66a21f64&scoped=true& */ 625);
/* harmony import */ var _vk_data_input_editor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vk-data-input-editor.vue?vue&type=script&lang=js& */ 627);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _vk_data_input_editor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _vk_data_input_editor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _vk_data_input_editor_vue_vue_type_style_index_0_id_66a21f64_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vk-data-input-editor.vue?vue&type=style&index=0&id=66a21f64&lang=scss&scoped=true& */ 629);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 45);

var renderjs





/* normalize component */

var component = Object(_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _vk_data_input_editor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _vk_data_input_editor_vue_vue_type_template_id_66a21f64_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _vk_data_input_editor_vue_vue_type_template_id_66a21f64_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "66a21f64",
  null,
  false,
  _vk_data_input_editor_vue_vue_type_template_id_66a21f64_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "components/vk-data-input-editor/vk-data-input-editor.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 625:
/*!***********************************************************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-admin/components/vk-data-input-editor/vk-data-input-editor.vue?vue&type=template&id=66a21f64&scoped=true& ***!
  \***********************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_vk_data_input_editor_vue_vue_type_template_id_66a21f64_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./vk-data-input-editor.vue?vue&type=template&id=66a21f64&scoped=true& */ 626);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_vk_data_input_editor_vue_vue_type_template_id_66a21f64_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_vk_data_input_editor_vue_vue_type_template_id_66a21f64_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_vk_data_input_editor_vue_vue_type_template_id_66a21f64_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_vk_data_input_editor_vue_vue_type_template_id_66a21f64_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 626:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/appProject/ich-zcb/ich-zcb-admin/components/vk-data-input-editor/vk-data-input-editor.vue?vue&type=template&id=66a21f64&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var render = function () {}
var staticRenderFns = []
var recyclableRender
var components



/***/ }),

/***/ 627:
/*!*****************************************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-admin/components/vk-data-input-editor/vk-data-input-editor.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_vk_data_input_editor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./vk-data-input-editor.vue?vue&type=script&lang=js& */ 628);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_vk_data_input_editor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_vk_data_input_editor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_vk_data_input_editor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_vk_data_input_editor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_vk_data_input_editor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 628:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/appProject/ich-zcb/ich-zcb-admin/components/vk-data-input-editor/vk-data-input-editor.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 5);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 29));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 32));
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// 颜色表
var choice_color_list = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"];
var header_list = ["h1", "h2", "h3", "h4", "h5", "h6"];
var fontSize_list = [{
  type: "小",
  size: "12px"
}, {
  type: "正常",
  size: "16px"
}, {
  type: "大",
  size: "18px"
}, {
  type: "超大",
  size: "22px"
}];
var _default = {
  name: 'vk-data-input-editor',
  props: {
    value: {},
    // 是否只读
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "开始输入..."
    },
    width: {
      type: [String, Number],
      default: "100%"
    }
  },
  data: function data() {
    // 组件创建时,进行数据初始化
    return {
      choice_color_list: choice_color_list,
      header_list: header_list,
      fontSize_list: fontSize_list,
      formatDate: '',
      pickerOptions: {
        disabledDate: function disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick: function onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick: function onClick(picker) {
            var date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick: function onClick(picker) {
            var date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      style_obj: {
        "--bg_color": "#000000",
        "--bg_opacity": 0,
        "--text_color": "#000000",
        "--text_opacity": 0,
        "--font_size_display": 0,
        "--header_display": 0
      },
      formats: {},
      editorId: "vk-editor"
    };
  },
  mounted: function mounted() {
    this.init();
  },
  methods: {
    // 初始化
    init: function init() {
      var that = this;
      var vk = that.vk;
      that.editorId = vk.pubfn.random(32, "abcdefghijklmnopqrstuvwxyz");
    },
    onInput: function onInput(e) {
      var detail = e.detail;
      var html = detail.html,
        text = detail.text,
        delta = detail.delta;
      this.$emit('input', html);
      this.inputTime = Date.now();
    },
    onEditorReady: function onEditorReady() {
      var that = this;
      var value = that.value,
        editorId = that.editorId;
      var query = uni.createSelectorQuery().in(that);
      query.select('#' + editorId).context(function (res) {
        if (res) {
          that.editorCtx = res.context;
          if (value) {
            that.editorCtx.setContents({
              html: value
            });
          }
        }
      }).exec();
    },
    undo: function undo() {
      this.editorCtx.undo();
    },
    redo: function redo() {
      this.editorCtx.redo();
    },
    format: function format(e) {
      var _e$target$dataset = e.target.dataset,
        name = _e$target$dataset.name,
        value = _e$target$dataset.value;
      if (!name || name == "color" || name === "backgroundColor" || name === "header") return;
      this.editorCtx.format(name, value);
    },
    onStatusChange: function onStatusChange(e) {
      var formats = e.detail;
      this.formats = formats;
    },
    insertDivider: function insertDivider() {
      this.editorCtx.insertDivider({
        success: function success() {
          // console.log('insert divider success')
        }
      });
    },
    clear: function clear() {
      var that = this;
      var disabled = that.disabledFn();
      if (disabled) return false;
      that.editorCtx.clear({
        success: function success(res) {
          // console.log("clear success")
        }
      });
    },
    removeFormat: function removeFormat() {
      var that = this;
      var disabled = that.disabledFn();
      if (disabled) return false;
      that.editorCtx.removeFormat();
      // 将文本颜色和背景颜色变化原来的颜色
      that.style_obj["--bg_color"] = "#000000";
      that.style_obj["--text_color"] = "#000000";
    },
    insertDate: function insertDate() {
      /*
       this.editorCtx.insertText({
       	text: formatDate
       })
       */
    },
    insertImage: function insertImage() {
      var that = this;
      var vk = that.vk;
      var disabled = that.disabledFn();
      if (disabled) return false;
      uni.chooseImage({
        count: 1,
        success: function success(res) {
          // 上传图片到云储存
          vk.callFunctionUtil.uploadFile({
            title: "上传中...",
            filePath: res.tempFilePaths[0],
            fileType: "image",
            success: function success(res) {
              var imageUrl = res.fileID;
              that.editorCtx.insertImage({
                src: imageUrl,
                alt: "image",
                extClass: "vk-data-editor-image",
                success: function success() {}
              });
            }
          });
        }
      });
    },
    insertImageFromFileSelect: function insertImageFromFileSelect() {
      var that = this;
      var vk = that.vk;
      var disabled = that.disabledFn();
      if (disabled) return false;
      this.$refs.fileSelectDialog.open();
    },
    onFileSelect: function onFileSelect(list) {
      var _this = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var that, vk, i, imageUrl;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                that = _this;
                vk = that.vk;
                i = 0;
              case 3:
                if (!(i < list.length)) {
                  _context.next = 10;
                  break;
                }
                imageUrl = list[i]; // 为了顺序执行，这里使用await
                _context.next = 7;
                return that.editorCtx.insertImage({
                  src: imageUrl,
                  alt: "image",
                  extClass: "vk-data-editor-image"
                });
              case 7:
                i++;
                _context.next = 3;
                break;
              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    insertVideo: function insertVideo() {
      var that = this;
      var vk = that.vk;
      var disabled = that.disabledFn();
      if (disabled) return false;
      uni.chooseVideo({
        count: 1,
        success: function success(res) {
          // 上传视频到云储存
          vk.callFunctionUtil.uploadFile({
            title: "上传中...",
            filePath: res.tempFilePath,
            fileType: "video",
            success: function success(res) {
              var imageUrl = res.fileID;
              // 目前 uniapp 的原生富文本 没有 insertVideo api
              that.editorCtx.insertVideo({
                src: imageUrl,
                alt: "video",
                extClass: "vk-data-editor-video",
                success: function success() {}
              });
            }
          });
        }
      });
    },
    text_color: function text_color() {
      var that = this;
      // 关闭字号大小和字体粗细
      that.style_obj["--header_display"] = 0;
      that.style_obj["--font_size_display"] = 0;
      that.style_obj["--bg_opacity"] = 0;
      if (that.style_obj["--text_opacity"]) {
        that.style_obj["--text_opacity"] = 0;
      } else {
        that.style_obj["--text_opacity"] = 1;
      }
      ;
    },
    change_text_color: function change_text_color(index) {
      var that = this;
      var color = that.choice_color_list[index];
      that.editorCtx.format("color", color);
      that.style_obj["--text_opacity"] = 0;
      if (color === "#ffffff") {
        that.style_obj["--text_color"] = "#efebeb";
      } else {
        that.style_obj["--text_color"] = color;
      }
      ;
    },
    bg_color: function bg_color() {
      var that = this;
      // 关闭字号大小和字体粗细
      that.style_obj["--header_display"] = 0;
      that.style_obj["--font_size_display"] = 0;
      that.style_obj["--text_opacity"] = 0;
      if (that.style_obj["--bg_opacity"]) {
        that.style_obj["--bg_opacity"] = 0;
      } else {
        that.style_obj["--bg_opacity"] = 1;
      }
      ;
    },
    change_bg_color: function change_bg_color(index) {
      var that = this;
      var color = that.choice_color_list[index];
      that.editorCtx.format("backgroundColor", color);
      that.style_obj["--bg_opacity"] = 0;
      if (color === "#ffffff") {
        that.style_obj["--bg_color"] = "#efebeb";
      } else {
        that.style_obj["--bg_color"] = color;
      }
      ;
    },
    // 是否显示字粗细
    trade_name: function trade_name() {
      var that = this;
      // 关闭字号大小和颜色面板
      that.style_obj["--font_size_display"] = 0;
      that.style_obj["--text_opacity"] = 0;
      that.style_obj["--bg_opacity"] = 0;
      if (that.style_obj["--header_display"]) {
        that.style_obj["--header_display"] = 0;
      } else {
        that.style_obj["--header_display"] = 1;
      }
      ;
    },
    // 是否显示字号
    change_font: function change_font() {
      var that = this;
      // 关闭字体粗细和颜色面板
      that.style_obj["--header_display"] = 0;
      that.style_obj["--text_opacity"] = 0;
      that.style_obj["--bg_opacity"] = 0;
      if (that.style_obj["--font_size_display"]) {
        that.style_obj["--font_size_display"] = 0;
      } else {
        that.style_obj["--font_size_display"] = 1;
      }
      ;
    },
    // 选着字号大小
    change_font_size: function change_font_size(index) {
      this.editorCtx.format("fontSize", this.fontSize_list[index].size);
    },
    // 选着字粗细
    trade_name_size: function trade_name_size(index) {
      this.editorCtx.format("header", (index + 1).toString());
    },
    // 确认时间
    determine_time: function determine_time() {
      var that = this;
      var date = that.formatDate;
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hour = date.getHours();
      // 分钟不够两位数就补0
      var minute = date.getMinutes().toString().padStart(2, "0");
      var second = date.getSeconds();
      var str = "";
      if (hour < 11) {
        str = "上午";
      } else if (hour > 13) {
        str = "下午";
      } else {
        str = "中午";
      }
      ;
      var week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][date.getDay()];
      that.editorCtx.insertText({
        text: "".concat(year, "\u5E74").concat(month, "\u6708").concat(day, "\u65E5").concat(week).concat(str).concat(hour, "\u65F6").concat(minute, "\u5206").concat(second, "\u79D2")
      });
    },
    // 关闭弹出层了
    close_popup: function close_popup() {
      var that = this;
      // 隐藏背景颜色面板
      if (that.style_obj["--bg_opacity"]) {
        that.style_obj["--bg_opacity"] = 0;
      }
      ;
      // 隐藏文本颜色面板
      if (that.style_obj["--text_opacity"]) {
        that.style_obj["--text_opacity"] = 0;
      }
      ;
      // 隐藏字体大小
      if (that.style_obj["--font_size_display"]) {
        that.style_obj["--font_size_display"] = 0;
      }
      ;
      // 隐藏字体粗细
      if (that.style_obj["--header_display"]) {
        that.style_obj["--header_display"] = 0;
      }
      ;
    },
    // 获取指定的父组件
    getParent: function getParent(tagName) {
      var that = this;
      var parent = that.$parent;
      while (parent && parent.tagName !== tagName) {
        parent = parent.$parent;
      }
      return parent;
    },
    disabledFn: function disabledFn() {
      var that = this;
      var _that$disabled = that.disabled,
        disabled = _that$disabled === void 0 ? false : _that$disabled;
      var parent = that.getParent('vk-data-form');
      if (parent && parent.disabled) {
        disabled = parent.disabled;
      }
      return disabled;
    }
  },
  watch: {
    value: function value(newVal, oldValue) {
      var that = this;
      var time = Date.now();
      var _that$inputTime = that.inputTime,
        inputTime = _that$inputTime === void 0 ? 0 : _that$inputTime;
      // 判断若属于外部直接赋值,则需要覆盖编辑器内容
      if (time - inputTime > 60 && that.editorCtx) {
        that.editorCtx.setContents({
          html: newVal
        });
      }
    }
  },
  // 过滤器
  filters: {},
  // 计算属性
  computed: {
    styleCom: function styleCom() {
      var width = this.width;
      var obj = {};
      if (width) {
        if (typeof width === "number") {
          obj.width = "".concat(width, "px");
        } else {
          obj.width = width;
        }
      }
      return obj;
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 3)["default"]))

/***/ }),

/***/ 629:
/*!**************************************************************************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-admin/components/vk-data-input-editor/vk-data-input-editor.vue?vue&type=style&index=0&id=66a21f64&lang=scss&scoped=true& ***!
  \**************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_vk_data_input_editor_vue_vue_type_style_index_0_id_66a21f64_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./vk-data-input-editor.vue?vue&type=style&index=0&id=66a21f64&lang=scss&scoped=true& */ 630);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_vk_data_input_editor_vue_vue_type_style_index_0_id_66a21f64_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_vk_data_input_editor_vue_vue_type_style_index_0_id_66a21f64_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_vk_data_input_editor_vue_vue_type_style_index_0_id_66a21f64_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_vk_data_input_editor_vue_vue_type_style_index_0_id_66a21f64_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_vk_data_input_editor_vue_vue_type_style_index_0_id_66a21f64_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 630:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/appProject/ich-zcb/ich-zcb-admin/components/vk-data-input-editor/vk-data-input-editor.vue?vue&type=style&index=0&id=66a21f64&lang=scss&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/vk-data-input-editor/vk-data-input-editor.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/vk-data-input-editor/vk-data-input-editor-create-component',
    {
        'components/vk-data-input-editor/vk-data-input-editor-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('3')['createComponent'](__webpack_require__(624))
        })
    },
    [['components/vk-data-input-editor/vk-data-input-editor-create-component']]
]);
