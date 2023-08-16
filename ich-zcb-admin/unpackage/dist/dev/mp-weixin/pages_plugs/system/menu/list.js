(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages_plugs/system/menu/list"],{

/***/ 115:
/*!*************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-admin/main.js?{"page":"pages_plugs%2Fsystem%2Fmenu%2Flist"} ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 5);
__webpack_require__(/*! uni-pages */ 27);
__webpack_require__(/*! @dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 28);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 26));
var _list = _interopRequireDefault(__webpack_require__(/*! ./pages_plugs/system/menu/list.vue */ 116));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_list.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 3)["createPage"]))

/***/ }),

/***/ 116:
/*!****************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-admin/pages_plugs/system/menu/list.vue ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _list_vue_vue_type_template_id_2871bb81_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./list.vue?vue&type=template&id=2871bb81&scoped=true& */ 117);
/* harmony import */ var _list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./list.vue?vue&type=script&lang=js& */ 119);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 45);

var renderjs




/* normalize component */

var component = Object(_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _list_vue_vue_type_template_id_2871bb81_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _list_vue_vue_type_template_id_2871bb81_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "2871bb81",
  null,
  false,
  _list_vue_vue_type_template_id_2871bb81_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages_plugs/system/menu/list.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 117:
/*!***********************************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-admin/pages_plugs/system/menu/list.vue?vue&type=template&id=2871bb81&scoped=true& ***!
  \***********************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_template_id_2871bb81_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./list.vue?vue&type=template&id=2871bb81&scoped=true& */ 118);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_template_id_2871bb81_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_template_id_2871bb81_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_template_id_2871bb81_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_template_id_2871bb81_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 118:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/appProject/ich-zcb/ich-zcb-admin/pages_plugs/system/menu/list.vue?vue&type=template&id=2871bb81&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ 119:
/*!*****************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-admin/pages_plugs/system/menu/list.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./list.vue?vue&type=script&lang=js& */ 120);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 120:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/appProject/ich-zcb/ich-zcb-admin/pages_plugs/system/menu/list.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var bindPermission = function bindPermission() {
  __webpack_require__.e(/*! require.ensure | pages_plugs/system/menu/form/bindPermission */ "pages_plugs/system/menu/form/bindPermission").then((function () {
    return resolve(__webpack_require__(/*! ./form/bindPermission.vue */ 560));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var addMenuByJson = function addMenuByJson() {
  __webpack_require__.e(/*! require.ensure | pages_plugs/system/menu/form/addMenuByJson */ "pages_plugs/system/menu/form/addMenuByJson").then((function () {
    return resolve(__webpack_require__(/*! ./form/addMenuByJson.vue */ 565));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var that; // 当前页面对象
var vk = uni.vk; // vk实例
var originalForms = {}; // 表单初始化数据

var matchModeData = [{
  value: 0,
  label: "完整路径"
}, {
  value: 1,
  label: "通配符"
}, {
  value: 2,
  label: "正则表达式"
}];
var curdCategoryData = [{
  value: 1,
  label: "增",
  tagType: "success"
}, {
  value: 2,
  label: "删",
  tagType: "danger"
}, {
  value: 3,
  label: "改",
  tagType: ""
}, {
  value: 4,
  label: "查",
  tagType: "info"
}, {
  value: 5,
  label: "特殊",
  icon: "info"
}, {
  value: 0,
  label: "其他",
  icon: "info"
}];
var levelDate = [{
  value: 1,
  label: "子弹级",
  tagType: "success"
}, {
  value: 2,
  label: "炸弹级",
  tagType: ""
}, {
  value: 3,
  label: "榴弹级",
  tagType: "warning"
}, {
  value: 4,
  label: "核弹级",
  tagType: "danger"
}, {
  value: 0,
  label: "其他",
  tagType: "info"
}];
var _default = {
  components: {
    bindPermission: bindPermission,
    addMenuByJson: addMenuByJson
  },
  data: function data() {
    // 页面数据变量
    return {
      // 页面是否请求中或加载中
      loading: false,
      // init请求返回的数据
      data: {},
      // 表格相关开始 -----------------------------------------------------------
      table1: {
        // 表格数据请求地址
        action: "admin/system/menu/sys/getAll",
        // 表格字段显示规则
        columns: [/* { key:"icon", title:"图标", type:"icon", width:100, defaultValue: "el-icon-tickets"}, */
        {
          key: "name",
          title: "菜单名称",
          type: "html",
          width: 340,
          align: "left",
          formatter: function formatter(val, row, column, index) {
            var icon = row.icon || "el-icon-tickets";
            if (icon.indexOf("vk-icon") > -1) icon = "vk-icon " + icon;
            return "<i class=\"".concat(icon, "\" style=\"margin-right: 10px;\"></i><text>").concat(row.name, "</text>");
          }
        }, {
          key: "menu_id",
          title: "菜单唯一标识",
          type: "text",
          width: 350,
          align: "left"
        }, {
          key: "url",
          title: "菜单URL",
          type: "text",
          width: 250,
          align: "left"
        }, {
          key: "comment",
          title: "备注",
          type: "text",
          width: 200,
          align: "left"
        }, {
          key: "permission",
          title: "菜单内置权限表",
          type: "text",
          width: 120,
          defaultValue: "无"
        }, {
          key: "sort",
          title: "排序值",
          type: "number",
          width: 100
        }, {
          key: "enable",
          title: "是否启用",
          type: "switch",
          activeValue: true,
          inactiveValue: false,
          width: 80,
          watch: function watch(res) {
            var value = res.value,
              row = res.row,
              change = res.change;
            vk.callFunction({
              url: "admin/system/menu/sys/updateBase",
              title: value ? "启用中..." : "关闭中...",
              data: {
                _id: row._id,
                enable: value
              },
              success: function success(data) {
                change(value); // 这一步是让表格行内的开关改变显示状态
              }
            });
          }
        }, {
          key: "hidden_menu",
          title: "是否显示",
          type: "switch",
          activeValue: false,
          inactiveValue: true,
          width: 80,
          watch: function watch(res) {
            var value = res.value,
              row = res.row,
              change = res.change;
            vk.callFunction({
              url: "admin/system/menu/sys/updateBase",
              title: "请求中...",
              data: {
                _id: row._id,
                hidden_menu: value
              },
              success: function success(data) {
                change(value); // 这一步是让表格行内的开关改变显示状态
              }
            });
          }
        }, {
          key: "parent_id",
          title: "父级菜单Id",
          type: "text",
          width: 250,
          align: "left"
        }],
        // 多选框选中的值
        multipleSelection: [],
        // 当前高亮的记录
        selectItem: ""
      },
      formDatas: {},
      // 表格相关结束 -----------------------------------------------------------
      // 表单相关开始-----------------------------------------------------------
      // 查询表单请求数据
      queryForm1: {
        // 查询表单数据源，可在此设置默认值
        formData: {},
        // 查询表单的字段规则 fieldName:指定数据库字段名,不填默认等于key
        columns: []
      },
      form1: {
        // 表单请求数据，此处可以设置默认值
        data: {
          sort: 0,
          enable: true,
          url: ""
        },
        // 表单属性
        props: {
          // 表单请求地址
          action: "",
          // 表单字段显示规则
          columns: [{
            key: "",
            title: "基础属性",
            type: "bar-title"
          }, {
            key: "menu_id",
            title: "菜单标识",
            type: "text",
            tips: "设置一个能表达唯一含义的标识",
            show: ["add"]
          }, {
            key: "name",
            title: "菜单名称",
            type: "text",
            tips: "设置菜单的名称"
          }, {
            key: "icon",
            title: "图标",
            type: "icon",
            tips: "设置一个能表达权限含义的图标"
          }, {
            key: "url",
            title: "URL",
            type: "text",
            tips: "页面路径，本地路径需以 / 开头 网络路径需带http:// 或 https://"
          }, {
            key: "sort",
            title: "排序值",
            type: "number",
            tips: "越小越显示在前面"
          }, {
            key: "parent_id",
            title: "父级菜单",
            type: "tree-select",
            tips: "父级的menu_id",
            action: "admin/system/menu/sys/getAll",
            props: {
              list: "rows",
              value: "menu_id",
              label: "label",
              children: "children"
            }
          }, {
            key: "comment",
            title: "备注",
            type: "textarea",
            maxlength: "99",
            showWordLimit: true,
            autosize: {
              minRows: 2,
              maxRows: 10
            },
            tips: "设置一个备注来更详细的描述此权限的含义"
          }, {
            key: "enable",
            title: "是否启用",
            type: "switch",
            tips: "当关闭时，菜单将失效，再次启用时，菜单会恢复。"
          }, {
            key: "hidden_menu",
            title: "是否隐藏",
            type: "switch",
            tips: "当设为true时，菜单不显示在左侧菜单列表中。"
          }],
          // 表单对应的验证规则
          rules: {
            menu_id: [{
              required: true,
              message: '菜单标识不能为空',
              trigger: 'blur'
            }, {
              min: 2,
              max: 40,
              message: '长度在 2 到 40 个字符',
              trigger: 'blur'
            }],
            name: [{
              required: true,
              message: '菜单名称不能为空',
              trigger: 'blur'
            }],
            sort: [{
              type: 'number',
              message: '排序值必须为数字'
            }]
          },
          // add 代表添加 update 代表修改
          formType: '',
          // 是否显示表单1 的弹窗
          show: false
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
    init: function init(options) {
      originalForms["form1"] = vk.pubfn.copyObject(that.form1);
    },
    // 页面跳转
    pageTo: function pageTo(path) {
      vk.navigateTo(path);
    },
    // 表单重置
    resetForm: function resetForm() {
      vk.pubfn.resetForm(originalForms, that);
    },
    // 搜索
    search: function search() {
      that.$refs.table1.query();
    },
    // 刷新
    refresh: function refresh() {
      that.$refs.table1.refresh();
    },
    // 获取当前选中的行的数据
    getCurrentRow: function getCurrentRow(key) {
      return that.$refs.table1.getCurrentRow(key);
    },
    // 监听 - 行的选中高亮事件
    currentChange: function currentChange(val) {
      that.table1.selectItem = val;
    },
    // 当选择项发生变化时会触发该事件
    selectionChange: function selectionChange(list) {
      that.table1.multipleSelection = list;
    },
    // 显示添加页面
    addBtn: function addBtn() {
      that.resetForm();
      that.form1.props.action = 'admin/system/menu/sys/add';
      that.form1.props.formType = 'add';
      that.form1.props.title = '添加';
      that.form1.props.show = true;
      var currentRow = that.getCurrentRow();
      if (currentRow && currentRow.menu_id) {
        that.$set(that.form1.data, "parent_id", currentRow.menu_id);
        that.$set(that.form1.data, "menu_id", currentRow.menu_id + "-");
      }
    },
    // 显示修改页面
    updateBtn: function updateBtn(_ref) {
      var item = _ref.item;
      that.form1.props.action = 'admin/system/menu/sys/update';
      that.form1.props.formType = 'update';
      that.form1.props.title = '编辑';
      that.form1.props.show = true;
      that.form1.data = item;
    },
    formSuccess: function formSuccess() {
      that.form1.props.show = false;
      // 下面的写法是为了部分修改完成后，减少一次再次请求数据库的查询
      if (that.form1.props.formType === "update") {
        var item = that.getCurrentRow(true);
        if (item.parent_id !== that.form1.data.parent_id) {
          that.refresh();
        } else {
          vk.pubfn.objectAssignForVue(item, that.form1.data, that);
        }
      } else {
        that.refresh();
      }
    },
    // 删除按钮
    deleteBtn: function deleteBtn(_ref2) {
      var item = _ref2.item,
        deleteFn = _ref2.deleteFn;
      deleteFn({
        action: "admin/system/menu/sys/delete",
        data: {
          menu_id: item.menu_id
        }
      });
    },
    // 设置内置权限
    bindPermissionBtn: function bindPermissionBtn() {
      var item = that.getCurrentRow(true);
      vk.pubfn.openForm('bindPermission', {
        item: item
      });
    },
    addMenuByJsonBtn: function addMenuByJsonBtn() {
      var item = that.getCurrentRow();
      vk.pubfn.openForm('addMenuByJson', {
        item: item
      });
    },
    // 修改排序值
    sortChange: function sortChange(sort, item) {
      vk.callFunction({
        url: 'admin/system/menu/sys/updateBase',
        data: {
          _id: item._id,
          sort: Number(sort)
        },
        success: function success(data) {}
      });
    }
  },
  // 监听属性
  watch: {},
  // 计算属性
  computed: {}
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 3)["default"]))

/***/ })

},[[115,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages_plugs/system/menu/list.js.map