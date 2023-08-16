(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages_template/components/form/form-pro"],{

/***/ 275:
/*!************************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-admin/main.js?{"page":"pages_template%2Fcomponents%2Fform%2Fform-pro"} ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 5);
__webpack_require__(/*! uni-pages */ 27);
__webpack_require__(/*! @dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 28);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 26));
var _formPro = _interopRequireDefault(__webpack_require__(/*! ./pages_template/components/form/form-pro.vue */ 276));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_formPro.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 3)["createPage"]))

/***/ }),

/***/ 276:
/*!***************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-admin/pages_template/components/form/form-pro.vue ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_pro_vue_vue_type_template_id_7dc746f2_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form-pro.vue?vue&type=template&id=7dc746f2&scoped=true& */ 277);
/* harmony import */ var _form_pro_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form-pro.vue?vue&type=script&lang=js& */ 279);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _form_pro_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _form_pro_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _form_pro_vue_vue_type_style_index_0_id_7dc746f2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./form-pro.vue?vue&type=style&index=0&id=7dc746f2&lang=scss&scoped=true& */ 281);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 45);

var renderjs





/* normalize component */

var component = Object(_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _form_pro_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _form_pro_vue_vue_type_template_id_7dc746f2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _form_pro_vue_vue_type_template_id_7dc746f2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "7dc746f2",
  null,
  false,
  _form_pro_vue_vue_type_template_id_7dc746f2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages_template/components/form/form-pro.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 277:
/*!**********************************************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-admin/pages_template/components/form/form-pro.vue?vue&type=template&id=7dc746f2&scoped=true& ***!
  \**********************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_pro_vue_vue_type_template_id_7dc746f2_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./form-pro.vue?vue&type=template&id=7dc746f2&scoped=true& */ 278);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_pro_vue_vue_type_template_id_7dc746f2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_pro_vue_vue_type_template_id_7dc746f2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_pro_vue_vue_type_template_id_7dc746f2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_pro_vue_vue_type_template_id_7dc746f2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 278:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/appProject/ich-zcb/ich-zcb-admin/pages_template/components/form/form-pro.vue?vue&type=template&id=7dc746f2&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ 279:
/*!****************************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-admin/pages_template/components/form/form-pro.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_pro_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./form-pro.vue?vue&type=script&lang=js& */ 280);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_pro_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_pro_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_pro_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_pro_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_pro_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 280:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/appProject/ich-zcb/ich-zcb-admin/pages_template/components/form/form-pro.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
        data: {
          radio: 1
        },
        // 表单属性
        props: {
          // 表单请求地址
          action: "template/test/sys/test",
          // 表单字段显示规则
          columns: [
          // 基础字段类型
          {
            key: "",
            title: "基础字段",
            type: "bar-title"
          }, {
            key: "text",
            title: "单行文本",
            type: "text"
          }, {
            key: "textarea",
            title: "多行文本",
            type: "textarea",
            autosize: {
              minRows: 4,
              maxRows: 10
            },
            maxlength: 200,
            showWordLimit: true
          }, {
            key: "money",
            title: "money类型",
            type: "money",
            tips: "100 = 1元。页面显示的是1，实际的值是100，请看右上角表单数据的值。"
          }, {
            key: "number",
            title: "number类型",
            type: "number",
            precision: 2,
            tips: "number类型值会转为数字，可以指定小数位数"
          }, {
            key: "number2",
            title: "计数器类型",
            type: "number",
            controls: true,
            precision: 0,
            min: 5,
            max: 100,
            placeholder: "请输入数字"
          }, {
            key: "percentage",
            title: "百分比类型",
            type: "percentage",
            precision: 0,
            tips: "页面显示的是1，实际的值是0.01，请看右上角表单数据的值。"
          }, {
            key: "discount",
            title: "折扣类型",
            type: "discount",
            tips: "页面显示的是1，实际的值是0.1，请看右上角表单数据的值。"
          }, {
            key: "text2",
            title: "文本2",
            type: "text",
            prepend: "前置文字",
            append: "后置文字",
            prefixIcon: "el-icon-user"
          },
          // 选择型字段
          {
            key: "",
            title: "选择型字段",
            type: "bar-title"
          }, {
            key: "radio1",
            title: "radio类型1",
            type: "radio",
            itemWidth: 80,
            data: [{
              value: 1,
              label: "选项1"
            }, {
              value: 2,
              label: "选项2"
            }]
          }, {
            key: "checkbox1",
            title: "checkbox类型1",
            type: "checkbox",
            itemWidth: 80,
            data: [{
              value: 1,
              label: "选项1"
            }, {
              value: 2,
              label: "选项2"
            }]
          }, {
            key: "radio2",
            title: "radio类型2",
            type: "radio",
            border: true,
            itemWidth: 80,
            data: [{
              value: 1,
              label: "选项1"
            }, {
              value: 2,
              label: "选项2"
            }]
          }, {
            key: "checkbox2",
            title: "checkbox类型2",
            type: "checkbox",
            border: true,
            itemWidth: 80,
            data: [{
              value: 1,
              label: "选项1"
            }, {
              value: 2,
              label: "选项2"
            }]
          }, {
            key: "radio3",
            title: "radio类型3",
            type: "radio",
            optionType: 'button',
            data: [{
              value: 1,
              label: "选项1"
            }, {
              value: 2,
              label: "选项2"
            }]
          }, {
            key: "checkbox3",
            title: "checkbox类型3",
            type: "checkbox",
            optionType: 'button',
            data: [{
              value: 1,
              label: "选项1"
            }, {
              value: 2,
              label: "选项2"
            }]
          }, {
            key: "select1",
            title: "select类型1",
            type: "select",
            data: [{
              value: 1,
              label: "选项1"
            }, {
              value: 2,
              label: "选项2"
            }]
          }, {
            key: "select2",
            title: "select类型2",
            type: "select",
            multiple: true,
            multipleLimit: 2,
            data: [{
              value: 1,
              label: "选项1"
            }, {
              value: 2,
              label: "选项2"
            }, {
              value: 3,
              label: "选项3"
            }, {
              value: 4,
              label: "选项4"
            }]
          }, {
            key: "select3",
            title: "select类型3",
            type: "select",
            group: true,
            data: [{
              label: "分组1",
              children: [{
                value: 1,
                label: "选项1"
              }, {
                value: 2,
                label: "选项2"
              }]
            }, {
              label: "分组2",
              children: [{
                value: 3,
                label: "选项3"
              }, {
                value: 4,
                label: "选项4"
              }]
            }]
          }, {
            key: "province",
            title: "province类型",
            type: "province"
          }, {
            key: "address",
            title: "address类型",
            type: "address"
          }, {
            key: "cascader1",
            title: "本地数据级联",
            type: "cascader",
            data: [{
              value: 1,
              label: "数学",
              children: [{
                value: 11,
                label: "奥数"
              }, {
                value: 12,
                label: "微积分"
              }]
            }, {
              value: 2,
              label: "语文",
              children: [{
                value: 21,
                label: "文言文"
              }, {
                value: 22,
                label: "古诗"
              }]
            }]
          }, {
            key: "cascader2",
            title: "云端数据级联",
            type: "cascader",
            action: "admin/system/permission/sys/getAll",
            props: {
              list: "rows",
              value: "permission_id",
              label: "label",
              children: "children",
              multiple: true
            }
          }, {
            key: "cascader3",
            title: "云端数据级联懒加载",
            type: "cascader",
            action: "admin/system/menu/sys/getCascader",
            props: {
              list: "rows",
              value: "menu_id",
              label: "label",
              children: "children",
              lazy: true
            }
          }, {
            key: "tree1",
            title: "树形选择(单选)",
            type: "tree-select",
            placeholder: "请选择学科",
            data: [{
              value: 1,
              label: "数学",
              children: [{
                value: 11,
                label: "奥数"
              }, {
                value: 12,
                label: "微积分"
              }]
            }, {
              value: 2,
              label: "语文",
              children: [{
                value: 21,
                label: "文言文"
              }, {
                value: 22,
                label: "古诗"
              }]
            }]
          }, {
            key: "tree2",
            title: "树形选择(多选)",
            type: "tree-select",
            placeholder: "请选择学科",
            multiple: true,
            data: [{
              value: 1,
              label: "数学",
              children: [{
                value: 11,
                label: "奥数"
              }, {
                value: 12,
                label: "微积分"
              }]
            }, {
              value: 2,
              label: "语文",
              children: [{
                value: 21,
                label: "文言文"
              }, {
                value: 22,
                label: "古诗"
              }]
            }]
          }, {
            key: "switch",
            title: "switch类型",
            type: "switch"
          }, {
            key: "rate",
            title: "评分类型",
            type: "rate",
            allowHalf: false
          }, {
            key: "slider",
            title: "滑块类型",
            type: "slider"
          }, {
            key: "color1",
            title: "颜色类型1",
            type: "color"
          }, {
            key: "color2",
            title: "颜色类型2",
            type: "color",
            showAlpha: true
          }, {
            key: "icon1",
            title: "图标1",
            type: "icon"
          }, {
            key: "icon2",
            title: "图标2",
            type: "icon",
            filter: "vk-"
          }, {
            key: "icon3",
            title: "图标3",
            type: "icon",
            filter: function filter(name) {
              // 不显示vk图标
              return name.indexOf("vk-icon") === 0 ? false : true;
            }
          },
          // 文件上传
          {
            key: "",
            title: "文件上传",
            type: "bar-title"
          }, {
            key: "image1",
            title: "image类型",
            type: "image",
            limit: 6
          }, {
            key: "image2",
            title: "拖拽上传",
            type: "image",
            limit: 6,
            drag: true,
            fileSize: 2,
            sizeUnit: "mb",
            tips: "图片大小限制：小于2M"
          }, {
            key: "file",
            title: "文件类型",
            type: "file",
            limit: 6,
            accept: ".txt,.xls,.xlsx,.doc,.docx,.ppt,.pptx,.pdf"
          }, {
            key: "image3",
            title: "从素材库多选图片",
            type: "file-select",
            placeholder: "请选择图片",
            fileType: "image",
            multiple: true,
            multipleLimit: 5
          }, {
            key: "image4",
            title: "从素材库单选图片",
            type: "file-select",
            placeholder: "请选择图片",
            fileType: "image"
          }, {
            key: "video1",
            title: "从素材库单选视频",
            type: "file-select",
            placeholder: "请选择视频",
            fileType: "video"
          },
          // 日期型字段
          {
            key: "",
            title: "日期型字段",
            type: "bar-title"
          }, {
            key: "date",
            title: "date类型",
            type: "date",
            dateType: "date",
            tips: "可选择年月日"
          }, {
            key: "dateTime",
            title: "dataTime类型",
            type: "date",
            dateType: "datetime",
            tips: "可选择年月日时分秒"
          }, {
            key: "dateArr",
            title: "date类型范围",
            type: "date",
            dateType: "daterange"
          }, {
            key: "dataTimeArr",
            title: "dataTime类型范围",
            type: "date",
            dateType: "datetimerange"
          },
          // 时间型字段
          {
            key: "",
            title: "时间型字段",
            type: "bar-title"
          }, {
            key: "time1",
            title: "time类型1",
            type: "time"
          }, {
            key: "time2",
            title: "time类型2",
            type: "time",
            valueFormat: "HH:mm",
            pickerOptions: {
              format: "HH:mm"
            }
          }, {
            key: "time3",
            title: "time类型3",
            type: "time",
            custom: true,
            pickerOptions: {
              start: '08:00',
              step: '01:00',
              end: '24:00'
            }
          }, {
            key: "timeArr1",
            title: "time类型范围1",
            type: "time",
            isRange: true
          }, {
            key: "timeArr2",
            title: "time类型范围2",
            type: "time",
            isRange: true,
            valueFormat: "HH:mm",
            pickerOptions: {
              selectableRange: '18:30:00 - 20:30:00',
              format: "HH:mm"
            }
          },
          // 数据库联动字段
          {
            key: "",
            title: "数据库联动字段",
            type: "bar-title"
          }, {
            key: "user_id",
            title: "用户选择器",
            type: "remote-select",
            placeholder: "请输入用户账号/昵称",
            action: "admin/select/kh/user"
          }, {
            key: "user_id",
            title: "选择用户",
            type: "table-select",
            placeholder: "选择",
            action: "admin/system/user/sys/getList",
            columns: [{
              key: "nickname",
              title: "用户昵称",
              type: "text",
              nameKey: true
            }, {
              key: "_id",
              title: "用户标识",
              type: "text",
              idKey: true
            }, {
              key: "mobile",
              title: "手机号",
              type: "text"
            }]
          }, {
            key: "role1",
            title: "通过表格选择(单选)",
            type: "table-select",
            placeholder: "请选择角色",
            action: "admin/system/role/sys/getList",
            columns: [{
              key: "role_name",
              title: "角色昵称",
              type: "text",
              nameKey: true
            }, {
              key: "role_id",
              title: "角色标识",
              type: "text",
              idKey: true
            }]
          }, {
            key: "role2",
            title: "通过表格选择(多选)",
            type: "table-select",
            placeholder: "请选择角色",
            action: "admin/system/role/sys/getList",
            columns: [{
              key: "role_name",
              title: "角色昵称",
              type: "text",
              nameKey: true
            }, {
              key: "role_id",
              title: "角色标识",
              type: "text",
              idKey: true
            }],
            multiple: true
          },
          // 布局
          {
            key: "",
            title: "横向布局",
            type: "bar-title"
          }, {
            key: "",
            title: "",
            type: "group",
            justify: "start",
            columns: [{
              key: "text1",
              title: "单行文本1",
              type: "text"
            }, {
              key: "text2",
              title: "单行文本2",
              type: "text"
            }, {
              key: "text3",
              title: "单行文本3",
              type: "text"
            }, {
              key: "text4",
              title: "单行文本4",
              type: "text"
            }]
          }, {
            key: "",
            title: "",
            type: "group",
            justify: "start",
            columns: [{
              key: "text5",
              title: "单行文本5",
              type: "text"
            }, {
              key: "text6",
              title: "单行文本6",
              type: "text"
            }, {
              key: "text7",
              title: "单行文本7",
              type: "text"
            }, {
              key: "text8",
              title: "单行文本8",
              type: "text"
            }]
          },
          // 对象类型
          {
            key: "",
            title: "对象类型",
            type: "bar-title"
          }, {
            key: "object1",
            title: "对象类型1",
            type: "object",
            columns: [{
              key: "a",
              title: "对象内属性a",
              type: "text"
            }, {
              key: "b",
              title: "对象内属性b",
              type: "text"
            }]
          },
          // 可以通过设置showLabel:false, 隐藏左侧的label
          {
            key: "object2",
            title: "对象类型2",
            type: "object",
            showLabel: false,
            columns: [{
              key: "a",
              title: "对象内属性a",
              type: "text"
            }, {
              key: "b",
              title: "对象内属性b",
              type: "text"
            }]
          },
          // 多层嵌套object
          {
            key: "object3",
            title: "对象类型3",
            type: "object",
            showLabel: true,
            columns: [{
              key: "a",
              title: "对象内属性a",
              type: "text"
            }, {
              key: "b",
              title: "嵌套对象b",
              type: "object",
              showLabel: true,
              columns: [{
                key: "b1",
                title: "嵌套对象b内属性b1",
                type: "text"
              }, {
                key: "b2",
                title: "嵌套对象b内属性b2",
                type: "text"
              }]
            }]
          },
          // 特殊类型
          {
            key: "",
            title: "特殊类型",
            type: "bar-title"
          }, {
            key: "editor",
            title: "富文本类型",
            type: "editor",
            width: "1000px"
          }, {
            key: "json",
            title: "json类型",
            type: "json"
          }, {
            key: "position",
            title: "地图位置",
            type: "map",
            width: 600,
            height: 300,
            defaultLocation: {
              latitude: 30.224781,
              longitude: 120.12438
            }
          }, {
            key: "array1",
            title: "数组字符串类型",
            type: "array<string>"
          }, {
            key: "array2",
            title: "数组数字类型",
            type: "array<number>"
          }, {
            key: "array",
            title: "数组对象类型",
            type: "array<object>",
            itemWidth: 260,
            showAdd: true,
            showClear: true,
            showSort: true,
            // 新增一行时,该行的默认值
            defaultValue: {
              select1: 1
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
              }]
            }, {
              key: "switch",
              title: "switch类型",
              type: "switch",
              width: 160
            }]
          }, {
            key: "goods_tags",
            title: "商品标签",
            type: "tag"
          }],
          // 表单验证规则
          rules: {
            text: [{
              required: true,
              message: 'text不能为空',
              trigger: 'change'
            }],
            money: [{
              required: true,
              message: '金额不能为空',
              trigger: 'change'
            }, {
              type: "number",
              message: '金额必须是数字',
              trigger: 'change'
            }]
          },
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
    // 关闭按钮
    onCancel: function onCancel() {
      console.log("关闭");
      vk.menuTabs.closeCurrent();
    },
    // 表单提交
    submitForm: function submitForm() {
      that.$refs.form1.submitForm();
    },
    // 表单提交成功
    onFormSuccess: function onFormSuccess() {}
  },
  // 过滤器
  filters: {},
  // 计算属性
  computed: {}
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 3)["default"]))

/***/ }),

/***/ 281:
/*!*************************************************************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-admin/pages_template/components/form/form-pro.vue?vue&type=style&index=0&id=7dc746f2&lang=scss&scoped=true& ***!
  \*************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_pro_vue_vue_type_style_index_0_id_7dc746f2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./form-pro.vue?vue&type=style&index=0&id=7dc746f2&lang=scss&scoped=true& */ 282);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_pro_vue_vue_type_style_index_0_id_7dc746f2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_pro_vue_vue_type_style_index_0_id_7dc746f2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_pro_vue_vue_type_style_index_0_id_7dc746f2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_pro_vue_vue_type_style_index_0_id_7dc746f2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_pro_vue_vue_type_style_index_0_id_7dc746f2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 282:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/appProject/ich-zcb/ich-zcb-admin/pages_template/components/form/form-pro.vue?vue&type=style&index=0&id=7dc746f2&lang=scss&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[275,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages_template/components/form/form-pro.js.map