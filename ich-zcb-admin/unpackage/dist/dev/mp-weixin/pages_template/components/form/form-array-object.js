(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages_template/components/form/form-array-object"],{

/***/ 239:
/*!*********************************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-admin/main.js?{"page":"pages_template%2Fcomponents%2Fform%2Fform-array-object"} ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 5);
__webpack_require__(/*! uni-pages */ 27);
__webpack_require__(/*! @dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 28);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 26));
var _formArrayObject = _interopRequireDefault(__webpack_require__(/*! ./pages_template/components/form/form-array-object.vue */ 240));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_formArrayObject.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 3)["createPage"]))

/***/ }),

/***/ 240:
/*!************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-admin/pages_template/components/form/form-array-object.vue ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_array_object_vue_vue_type_template_id_1beab8be_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form-array-object.vue?vue&type=template&id=1beab8be&scoped=true& */ 241);
/* harmony import */ var _form_array_object_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form-array-object.vue?vue&type=script&lang=js& */ 243);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _form_array_object_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _form_array_object_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 45);

var renderjs




/* normalize component */

var component = Object(_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _form_array_object_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _form_array_object_vue_vue_type_template_id_1beab8be_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _form_array_object_vue_vue_type_template_id_1beab8be_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "1beab8be",
  null,
  false,
  _form_array_object_vue_vue_type_template_id_1beab8be_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages_template/components/form/form-array-object.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 241:
/*!*******************************************************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-admin/pages_template/components/form/form-array-object.vue?vue&type=template&id=1beab8be&scoped=true& ***!
  \*******************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_array_object_vue_vue_type_template_id_1beab8be_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./form-array-object.vue?vue&type=template&id=1beab8be&scoped=true& */ 242);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_array_object_vue_vue_type_template_id_1beab8be_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_array_object_vue_vue_type_template_id_1beab8be_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_array_object_vue_vue_type_template_id_1beab8be_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_array_object_vue_vue_type_template_id_1beab8be_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 242:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/appProject/ich-zcb/ich-zcb-admin/pages_template/components/form/form-array-object.vue?vue&type=template&id=1beab8be&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 243:
/*!*************************************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-admin/pages_template/components/form/form-array-object.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_array_object_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./form-array-object.vue?vue&type=script&lang=js& */ 244);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_array_object_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_array_object_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_array_object_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_array_object_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_array_object_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 244:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/appProject/ich-zcb/ich-zcb-admin/pages_template/components/form/form-array-object.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
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

var that; // 当前页面对象
var vk = uni.vk; // vk实例
var _default = {
  data: function data() {
    // 页面数据变量
    return {
      // 表单相关开始-----------------------------------------------------------
      form1: {
        // 表单请求数据，此处可以设置默认值
        data: {},
        // 表单属性
        props: {
          // 表单请求地址
          action: "template/test/sys/test",
          // 表单字段显示规则
          columns: [{
            key: "",
            title: "数组对象",
            type: "bar-title"
          }, {
            key: "array1",
            title: "数组<对象>类型",
            type: "array<object>",
            itemWidth: 260,
            showAdd: true,
            showClear: true,
            showSort: true,
            // 新增一行时,该行的默认值
            defaultValue: {
              switch: true,
              text1: ""
            },
            rightBtns: ['copy', 'delete'],
            // 每行每个字段对应的渲染规则
            columns: [{
              key: "text1",
              title: "昵称",
              type: "text",
              isUnique: true,
              rules: [{
                required: true,
                message: "该项不能为空",
                trigger: ["change", "blur"]
              }, {
                min: 3,
                max: 5,
                message: '长度在 3 到 5 个字符',
                trigger: ["change", "blur"]
              }]
            }, {
              key: "number1",
              title: "数字",
              type: "number",
              rules: [{
                required: true,
                message: "该项不能为空",
                trigger: ["change", "blur"]
              }]
            }, {
              key: "select1",
              title: "select类型",
              type: "select",
              data: [{
                value: 1,
                label: "选项1"
              }, {
                value: 2,
                label: "选项2"
              }],
              rules: [{
                required: true,
                message: "该项不能为空",
                trigger: ["change", "blur"]
              }],
              onChange: function onChange(val, row, column, index) {
                // 此处演示根据选择的值动态改变text1的值,注意,此处text1必须要有默认值,即使是空字符串也行.
                row.text1 = "昵称" + val;
              }
            }, {
              key: "switch",
              title: "switch类型",
              type: "switch",
              width: 160
            }]
          }, {
            key: "",
            title: "递增递减",
            type: "bar-title"
          }, {
            key: "array2",
            title: "数组<对象>类型",
            type: "array<object>",
            itemWidth: 260,
            showAdd: true,
            showClear: true,
            showSort: true,
            // 新增一行时,该行的默认值
            defaultValue: {
              switch: true,
              text1: ""
            },
            rightBtns: ['copy', 'delete'],
            // 每行每个字段对应的渲染规则
            columns: [{
              key: "number1",
              title: "递增[>]",
              type: "number",
              placeholder: "输入数字",
              incMode: 1,
              // 1必须递增[>] 2 必须递增[>=] -1 必须递减[<]  -2 必须递减[<=]
              rules: [{
                required: true,
                message: "该项不能为空",
                trigger: ["change", "blur"]
              }]
            }, {
              key: "number2",
              title: "递增[>=]",
              type: "number",
              placeholder: "输入数字",
              incMode: 2,
              // 1必须递增[>] 2 必须递增[>=] -1 必须递减[<]  -2 必须递减[<=]
              rules: [{
                required: true,
                message: "该项不能为空",
                trigger: ["change", "blur"]
              }]
            }, {
              key: "number3",
              title: "递减[<]",
              type: "number",
              placeholder: "输入数字",
              incMode: -1,
              // 1必须递增[>] 2 必须递增[>=] -1 必须递减[<]  -2 必须递减[<=]
              rules: [{
                required: true,
                message: "该项不能为空",
                trigger: ["change", "blur"]
              }]
            }, {
              key: "number4",
              title: "递减[<=]",
              type: "number",
              placeholder: "输入数字",
              incMode: -2,
              // 1必须递增[>] 2 必须递增[>=] -1 必须递减[<]  -2 必须递减[<=]
              rules: [{
                required: true,
                message: "该项不能为空",
                trigger: ["change", "blur"]
              }]
            }]
          }, {
            key: "",
            title: "数组嵌套数组",
            type: "bar-title"
          }, {
            key: "array3",
            title: "数组<对象>类型",
            type: "array<object>",
            itemWidth: 260,
            showAdd: true,
            showClear: true,
            showSort: true,
            // 新增一行时,该行的默认值
            defaultValue: {
              switch: true,
              array: []
            },
            rightBtns: ['copy', 'delete'],
            // 每行每个字段对应的渲染规则
            columns: [{
              key: "text1",
              title: "昵称",
              type: "text",
              isUnique: true,
              rules: [{
                required: true,
                message: "该项不能为空",
                trigger: ["change", "blur"]
              }]
            }, {
              key: "number1",
              title: "数字",
              type: "number",
              rules: [{
                required: true,
                message: "该项不能为空",
                trigger: ["change", "blur"]
              }]
            }, {
              key: "switch",
              title: "switch类型",
              type: "switch",
              width: 160
            }, {
              key: "array",
              title: "数组<对象>类型",
              type: "array<object>",
              buttonText: "设置",
              dialog: true,
              width: 140,
              dialogWidth: 1000,
              showAdd: true,
              showClear: true,
              showSort: true,
              // 新增一行时,该行的默认值
              defaultValue: {},
              rightBtns: ['delete'],
              // 每行每个字段对应的渲染规则
              columns: [{
                key: "text1",
                title: "昵称",
                type: "text",
                minWidth: 160,
                isUnique: true,
                rules: [{
                  required: true,
                  message: "该项不能为空",
                  trigger: ["change", "blur"]
                }]
              }, {
                key: "number1",
                title: "数字",
                type: "number",
                minWidth: 160,
                rules: [{
                  required: true,
                  message: "该项不能为空",
                  trigger: ["change", "blur"]
                }]
              }]
            }]
          }, {
            key: "",
            title: "下方为纯字符串或纯数字类型数组",
            type: "bar-title"
          }, {
            key: "stringArray",
            title: "数组<字符串>类型",
            type: "array<string>",
            placeholder: "请输入字符串",
            width: 400,
            isUnique: true,
            rules: [{
              required: true,
              message: "该项不能为空",
              trigger: ["change", "blur"]
            }]
          }, {
            key: "numberArray",
            title: "数组<数字>类型",
            type: "array<number>",
            placeholder: "请输入数字",
            width: 400,
            rules: [{
              required: true,
              message: "该项不能为空",
              trigger: ["change", "blur"]
            }]
          }],
          // 表单验证规则
          rules: {},
          // add 代表添加 update 代表修改
          formType: '',
          // 是否显示表单1 的弹窗
          show: false,
          // 表单是否在请求中
          loading: false
        }
      }
      // 表单相关结束-----------------------------------------------------------
    };
  },
  // 监听 - 页面每次【加载时】执行(如：前进)
  onLoad: function onLoad() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    that = this;
    vk = that.vk;
    that.options = options;
    that.init(options);
  },
  // 监听 - 页面【首次渲染完成时】执行。注意如果渲染速度快，会在页面进入动画完成前触发
  onReady: function onReady() {},
  // 监听 - 页面每次【显示时】执行(如：前进和返回) (页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面)
  onShow: function onShow() {},
  // 监听 - 页面每次【隐藏时】执行(如：返回)
  onHide: function onHide() {},
  // 函数
  methods: {
    // 页面数据初始化函数
    init: function init(options) {},
    onCancel: function onCancel() {
      console.log("关闭");
      vk.menuTabs.closeCurrent();
    },
    onFormSuccess: function onFormSuccess() {
      console.log("表单提交成功");
    }
  },
  // 计算属性
  computed: {}
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 3)["default"]))

/***/ })

},[[239,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages_template/components/form/form-array-object.js.map