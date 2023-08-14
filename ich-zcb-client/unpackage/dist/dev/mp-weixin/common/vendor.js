(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!*********************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var objectKeys = ['qy', 'env', 'error', 'version', 'lanDebug', 'cloud', 'serviceMarket', 'router', 'worklet', '__webpack_require_UNI_MP_PLUGIN__'];
var singlePageDisableKey = ['lanDebug', 'router', 'worklet'];
var target = typeof globalThis !== 'undefined' ? globalThis : function () {
  return this;
}();
var key = ['w', 'x'].join('');
var oldWx = target[key];
var launchOption = oldWx.getLaunchOptionsSync ? oldWx.getLaunchOptionsSync() : null;
function isWxKey(key) {
  if (launchOption && launchOption.scene === 1154 && singlePageDisableKey.includes(key)) {
    return false;
  }
  return objectKeys.indexOf(key) > -1 || typeof oldWx[key] === 'function';
}
function initWx() {
  var newWx = {};
  for (var _key in oldWx) {
    if (isWxKey(_key)) {
      // TODO wrapper function
      newWx[_key] = oldWx[_key];
    }
  }
  return newWx;
}
target[key] = initWx();
var _default = target[key];
exports.default = _default;

/***/ }),
/* 2 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApp = createApp;
exports.createComponent = createComponent;
exports.createPage = createPage;
exports.createPlugin = createPlugin;
exports.createSubpackageApp = createSubpackageApp;
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _construct2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/construct */ 15));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 22);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var realAtob;
var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;
    var result = '';
    var r1;
    var r2;
    var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}
function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {
    var _getCurrentUserInfo = getCurrentUserInfo(),
      role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {
    var _getCurrentUserInfo2 = getCurrentUserInfo(),
      permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {
    var _getCurrentUserInfo3 = getCurrentUserInfo(),
      tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}
var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function isFn(fn) {
  return typeof fn === 'function';
}
function isStr(str) {
  return typeof str === 'string';
}
function isObject(obj) {
  return obj !== null && (0, _typeof2.default)(obj) === 'object';
}
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
function noop() {}

/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
function sortObject(obj) {
  var sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach(function (key) {
      sortObj[key] = obj[key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}
var HOOKS = ['invoke', 'success', 'fail', 'complete', 'returnValue'];
var globalInterceptors = {};
var scopedInterceptors = {};
function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}
function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}
function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}
function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}
function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}
function wrapperHook(hook, params) {
  return function (data) {
    return hook(data, params) || data;
  };
}
function isPromise(obj) {
  return !!obj && ((0, _typeof2.default)(obj) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
function queue(hooks, data, params) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook, params));
    } else {
      var res = hook(data, params);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {}
        };
      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    }
  };
}
function wrapperOptions(interceptor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res, options).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options) {
  for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    params[_key - 3] = arguments[_key];
  }
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        // 重新访问 getApiInterceptorHooks, 允许 invoke 中再次调用 addInterceptor,removeInterceptor
        return api.apply(void 0, [wrapperOptions(getApiInterceptorHooks(method), options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}
var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  }
};
var SYNC_API_RE = /^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting|initUTS|requireUTS|registerUTS/;
var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection', 'createPushMessage'];
var CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}
function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).catch(function (err) {
    return [err];
  });
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(function (value) {
      return promise.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return promise.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };
}
function promisify(name, api) {
  if (!shouldPromise(name) || !isFn(api)) {
    return api;
  }
  return function promiseApi() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      params[_key2 - 1] = arguments[_key2];
    }
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject
      })].concat(params));
    })));
  };
}
var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;
function checkDeviceWidth() {
  var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
    platform = _wx$getSystemInfoSync.platform,
    pixelRatio = _wx$getSystemInfoSync.pixelRatio,
    windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}
function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}
var LOCALE_ZH_HANS = 'zh-Hans';
var LOCALE_ZH_HANT = 'zh-Hant';
var LOCALE_EN = 'en';
var LOCALE_FR = 'fr';
var LOCALE_ES = 'es';
var messages = {};
var locale;
{
  locale = normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}
function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}
initI18nMessages();
var i18n = (0, _uniI18n.initVueI18n)(locale, {});
var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {
    var _this = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    }
  }
};
var setLocale = i18n.setLocale;
var getLocale = i18n.getLocale;
function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale()
  });
  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {
        return watch(v);
      });
    }
  });
}
function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

function getLocale$1() {
  // 优先使用 $locale
  if (isFn(getApp)) {
    var app = getApp({
      allowDefault: true
    });
    if (app && app.$vm) {
      return app.$vm.$locale;
    }
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}
function setLocale$1(locale) {
  var app = isFn(getApp) ? getApp() : false;
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {
      return fn({
        locale: locale
      });
    });
    return true;
  }
  return false;
}
var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}
if (typeof global !== 'undefined') {
  global.getLocale = getLocale$1;
}
var interceptors = {
  promiseInterceptor: promiseInterceptor
};
var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale$1,
  setLocale: setLocale$1,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors
});
function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}
var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  }
};
var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(function (item, index) {
        return index < currentIndex ? item !== urls[currentIndex] : true;
      });
    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function useDeviceId(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId
    });
  }
  result.deviceId = deviceId;
}
function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.screenHeight - safeArea.bottom
    };
  }
}
function populateParameters(result) {
  var _result$brand = result.brand,
    brand = _result$brand === void 0 ? '' : _result$brand,
    _result$model = result.model,
    model = _result$model === void 0 ? '' : _result$model,
    _result$system = result.system,
    system = _result$system === void 0 ? '' : _result$system,
    _result$language = result.language,
    language = _result$language === void 0 ? '' : _result$language,
    theme = result.theme,
    version = result.version,
    platform = result.platform,
    fontSizeSetting = result.fontSizeSetting,
    SDKVersion = result.SDKVersion,
    pixelRatio = result.pixelRatio,
    deviceOrientation = result.deviceOrientation;
  // const isQuickApp = "mp-weixin".indexOf('quickapp-webview') !== -1

  var extraParam = {};

  // osName osVersion
  var osName = '';
  var osVersion = '';
  {
    osName = system.split(' ')[0] || '';
    osVersion = system.split(' ')[1] || '';
  }
  var hostVersion = version;

  // deviceType
  var deviceType = getGetDeviceType(result, model);

  // deviceModel
  var deviceBrand = getDeviceBrand(brand);

  // hostName
  var _hostName = getHostName(result);

  // deviceOrientation
  var _deviceOrientation = deviceOrientation; // 仅 微信 百度 支持

  // devicePixelRatio
  var _devicePixelRatio = pixelRatio;

  // SDKVersion
  var _SDKVersion = SDKVersion;

  // hostLanguage
  var hostLanguage = language.replace(/_/g, '-');

  // wx.getAccountInfoSync

  var parameters = {
    appId: "__UNI__EF2903A",
    appName: "ich-zcb-client",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.8.7",
    uniRuntimeVersion: "3.8.7",
    uniPlatform: undefined || "mp-weixin",
    deviceBrand: deviceBrand,
    deviceModel: model,
    deviceType: deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion: osVersion,
    hostTheme: theme,
    hostVersion: hostVersion,
    hostLanguage: hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined
  };
  Object.assign(result, parameters, extraParam);
}
function getGetDeviceType(result, model) {
  var deviceType = result.deviceType || 'phone';
  {
    var deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc'
    };
    var deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    var _model = model.toLocaleLowerCase();
    for (var index = 0; index < deviceTypeMapsKeys.length; index++) {
      var _m = deviceTypeMapsKeys[index];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  var deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = brand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale$1 ? getLocale$1() : defaultLanguage;
}
function getHostName(result) {
  var _platform = 'WeChat';
  var _hostName = result.hostName || _platform; // mp-jd
  {
    if (result.environment) {
      _hostName = result.environment;
    } else if (result.host && result.host.env) {
      _hostName = result.host.env;
    }
  }
  return _hostName;
}
var getSystemInfo = {
  returnValue: function returnValue(result) {
    useDeviceId(result);
    addSafeAreaInsets(result);
    populateParameters(result);
  }
};
var showActionSheet = {
  args: function args(fromArgs) {
    if ((0, _typeof2.default)(fromArgs) === 'object') {
      fromArgs.alertText = fromArgs.title;
    }
  }
};
var getAppBaseInfo = {
  returnValue: function returnValue(result) {
    var _result = result,
      version = _result.version,
      language = _result.language,
      SDKVersion = _result.SDKVersion,
      theme = _result.theme;
    var _hostName = getHostName(result);
    var hostLanguage = language.replace('_', '-');
    result = sortObject(Object.assign(result, {
      appId: "__UNI__EF2903A",
      appName: "ich-zcb-client",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage),
      hostVersion: version,
      hostLanguage: hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme
    }));
  }
};
var getDeviceInfo = {
  returnValue: function returnValue(result) {
    var _result2 = result,
      brand = _result2.brand,
      model = _result2.model;
    var deviceType = getGetDeviceType(result, model);
    var deviceBrand = getDeviceBrand(brand);
    useDeviceId(result);
    result = sortObject(Object.assign(result, {
      deviceType: deviceType,
      deviceBrand: deviceBrand,
      deviceModel: model
    }));
  }
};
var getWindowInfo = {
  returnValue: function returnValue(result) {
    addSafeAreaInsets(result);
    result = sortObject(Object.assign(result, {
      windowTop: 0,
      windowBottom: 0
    }));
  }
};
var getAppAuthorizeSetting = {
  returnValue: function returnValue(result) {
    var locationReducedAccuracy = result.locationReducedAccuracy;
    result.locationAccuracy = 'unsupported';
    if (locationReducedAccuracy === true) {
      result.locationAccuracy = 'reduced';
    } else if (locationReducedAccuracy === false) {
      result.locationAccuracy = 'full';
    }
  }
};

// import navigateTo from 'uni-helpers/navigate-to'

var compressImage = {
  args: function args(fromArgs) {
    // https://developers.weixin.qq.com/community/develop/doc/000c08940c865011298e0a43256800?highLine=compressHeight
    if (fromArgs.compressedHeight && !fromArgs.compressHeight) {
      fromArgs.compressHeight = fromArgs.compressedHeight;
    }
    if (fromArgs.compressedWidth && !fromArgs.compressWidth) {
      fromArgs.compressWidth = fromArgs.compressedWidth;
    }
  }
};
var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  showActionSheet: showActionSheet,
  getAppBaseInfo: getAppBaseInfo,
  getDeviceInfo: getDeviceInfo,
  getWindowInfo: getWindowInfo,
  getAppAuthorizeSetting: getAppAuthorizeSetting,
  compressImage: compressImage
};
var todos = ['vibrate', 'preloadPage', 'unPreloadPage', 'loadSubPackage'];
var canIUses = [];
var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];
function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}
function processArgs(methodName, fromArgs) {
  var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {
    // 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {
          // 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {
          // 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {
          // {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}
function processReturnValue(methodName, res, returnValue) {
  var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {
    // 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}
function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {
      // 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {
      // 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {
        // 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}
var todoApis = Object.create(null);
var TODOS = ['onTabBarMidButtonTap', 'subscribePush', 'unsubscribePush', 'onPush', 'offPush', 'share'];
function createTodoApi(name) {
  return function todoApi(_ref) {
    var fail = _ref.fail,
      complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported")
    };
    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}
TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});
var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin']
};
function getProvider(_ref2) {
  var service = _ref2.service,
    success = _ref2.success,
    fail = _ref2.fail,
    complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service]
    };
    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found'
    };
    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}
var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider
});
var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();
function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}
function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}
var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit
});

/**
 * 框架内 try-catch
 */
/**
 * 开发者 try-catch
 */
function tryCatch(fn) {
  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      // TODO
      console.error(e);
    }
  };
}
function getApiCallbacks(params) {
  var apiCallbacks = {};
  for (var name in params) {
    var param = params[name];
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param);
      delete params[name];
    }
  }
  return apiCallbacks;
}
var cid;
var cidErrMsg;
var enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e) {}
  return message;
}
function invokePushCallback(args) {
  if (args.type === 'enabled') {
    enabled = true;
  } else if (args.type === 'clientId') {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === 'pushMsg') {
    var message = {
      type: 'receive',
      data: normalizePushMessage(args.message)
    };
    for (var i = 0; i < onPushMessageCallbacks.length; i++) {
      var callback = onPushMessageCallbacks[i];
      callback(message);
      // 该消息已被阻止
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach(function (callback) {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message)
      });
    });
  }
}
var getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid, errMsg) {
  getPushCidCallbacks.forEach(function (callback) {
    callback(cid, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
function getPushClientId(args) {
  if (!isPlainObject(args)) {
    args = {};
  }
  var _getApiCallbacks = getApiCallbacks(args),
    success = _getApiCallbacks.success,
    fail = _getApiCallbacks.fail,
    complete = _getApiCallbacks.complete;
  var hasSuccess = isFn(success);
  var hasFail = isFn(fail);
  var hasComplete = isFn(complete);
  Promise.resolve().then(function () {
    if (typeof enabled === 'undefined') {
      enabled = false;
      cid = '';
      cidErrMsg = 'uniPush is not enabled';
    }
    getPushCidCallbacks.push(function (cid, errMsg) {
      var res;
      if (cid) {
        res = {
          errMsg: 'getPushClientId:ok',
          cid: cid
        };
        hasSuccess && success(res);
      } else {
        res = {
          errMsg: 'getPushClientId:fail' + (errMsg ? ' ' + errMsg : '')
        };
        hasFail && fail(res);
      }
      hasComplete && complete(res);
    });
    if (typeof cid !== 'undefined') {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
}
var onPushMessageCallbacks = [];
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
var onPushMessage = function onPushMessage(fn) {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
var offPushMessage = function offPushMessage(fn) {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    var index = onPushMessageCallbacks.indexOf(fn);
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1);
    }
  }
};
var baseInfo = wx.getAppBaseInfo && wx.getAppBaseInfo();
if (!baseInfo) {
  baseInfo = wx.getSystemInfoSync();
}
var host = baseInfo ? baseInfo.host : null;
var shareVideoMessage = host && host.env === 'SAAASDK' ? wx.miniapp.shareVideoMessage : wx.shareVideoMessage;
var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  shareVideoMessage: shareVideoMessage,
  getPushClientId: getPushClientId,
  onPushMessage: onPushMessage,
  offPushMessage: offPushMessage,
  invokePushCallback: invokePushCallback
});
var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];
function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
function initBehavior(options) {
  return Behavior(options);
}
function isPage() {
  return !!this.route;
}
function initRelation(detail) {
  this.triggerEvent('__l', detail);
}
function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector) || [];
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || toSkip(component);
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}
function syncRefs(refs, newRefs) {
  var oldKeys = (0, _construct2.default)(Set, (0, _toConsumableArray2.default)(Object.keys(refs)));
  var newKeys = Object.keys(newRefs);
  newKeys.forEach(function (key) {
    var oldValue = refs[key];
    var newValue = newRefs[key];
    if (Array.isArray(oldValue) && Array.isArray(newValue) && oldValue.length === newValue.length && newValue.every(function (value) {
      return oldValue.includes(value);
    })) {
      return;
    }
    refs[key] = newValue;
    oldKeys.delete(key);
  });
  oldKeys.forEach(function (key) {
    delete refs[key];
  });
  return refs;
}
function initRefs(vm) {
  var mpInstance = vm.$scope;
  var refs = {};
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for') || [];
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || toSkip(component));
      });
      return syncRefs(refs, $refs);
    }
  });
}
function handleLink(event) {
  var _ref3 = event.detail || event.value,
    vuePid = _ref3.vuePid,
    vueOptions = _ref3.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  vueOptions.parent = parentVm;
}
function markMPComponent(component) {
  // 在 Vue 中标记为小程序组件
  var IS_MP = '__v_isMPComponent';
  Object.defineProperty(component, IS_MP, {
    configurable: true,
    enumerable: false,
    value: true
  });
  return component;
}
function toSkip(obj) {
  var OB = '__ob__';
  var SKIP = '__v_skip';
  if (isObject(obj) && Object.isExtensible(obj)) {
    // 避免被 @vue/composition-api 观测
    Object.defineProperty(obj, OB, {
      configurable: true,
      enumerable: false,
      value: (0, _defineProperty2.default)({}, SKIP, true)
    });
  }
  return obj;
}
var WORKLET_RE = /_(.*)_worklet_factory_/;
function initWorkletMethods(mpMethods, vueMethods) {
  if (vueMethods) {
    Object.keys(vueMethods).forEach(function (name) {
      var matches = name.match(WORKLET_RE);
      if (matches) {
        var workletName = matches[1];
        mpMethods[name] = vueMethods[name];
        mpMethods[workletName] = vueMethods[workletName];
      }
    });
  }
}
var MPPage = Page;
var MPComponent = Component;
var customizeRE = /:/g;
var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});
function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    // 事件名统一转驼峰格式，仅处理：当前组件为 vue 组件、当前组件为 vue 组件子组件
    if (this.$vm || this.dataset && this.dataset.comType) {
      event = customize(event);
    } else {
      // 针对微信/QQ小程序单独补充驼峰格式事件，以兼容历史项目
      var newEvent = customize(event);
      if (newEvent !== event) {
        oldTriggerEvent.apply(this, [newEvent].concat(args));
      }
    }
    return oldTriggerEvent.apply(this, [event].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initHook(name, options, isComponent) {
  var oldHook = options[name];
  options[name] = function () {
    markMPComponent(this);
    initTriggerEvent(this);
    if (oldHook) {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return oldHook.apply(this, args);
    }
  };
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;
  Component = function Component() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}
var PAGE_EVENT_HOOKS = ['onPullDownRefresh', 'onReachBottom', 'onAddToFavorites', 'onShareTimeline', 'onShareAppMessage', 'onPageScroll', 'onResize', 'onTabItemTap'];
function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}
function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }
  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }
  vueOptions = vueOptions.default || vueOptions;
  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super && vueOptions.super.options && Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }
  if (isFn(vueOptions[hook]) || Array.isArray(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {
      return hasHook(hook, mixin);
    });
  }
}
function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}
function initUnknownHooks(mpOptions, vueOptions) {
  var excludes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  findHooks(vueOptions).forEach(function (hook) {
    return initHook$1(mpOptions, hook, excludes);
  });
}
function findHooks(vueOptions) {
  var hooks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (vueOptions) {
    Object.keys(vueOptions).forEach(function (name) {
      if (name.indexOf('on') === 0 && isFn(vueOptions[name])) {
        hooks.push(name);
      }
    });
  }
  return hooks;
}
function initHook$1(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function (args) {
      return this.$vm && this.$vm.__call_hook(hook, args);
    };
  }
}
function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}
function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}
function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;
  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}
function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};
  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"ich-zcb-client","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }
  if (!isPlainObject(data)) {
    data = {};
  }
  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });
  return data;
}
var PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;
  var vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: ''
          };
          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ''
          };
        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(initBehavior({
      properties: initProperties(vueExtends.props, true)
    }));
  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(initBehavior({
          properties: initProperties(vueMixin.props, true)
        }));
      }
    });
  }
  return behaviors;
}
function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function initProperties(props) {
  var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var options = arguments.length > 3 ? arguments[3] : undefined;
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: ''
    };
    {
      if (options.virtualHost) {
        properties.virtualHostStyle = {
          type: null,
          value: ''
        };
        properties.virtualHostClass = {
          type: null,
          value: ''
        };
      }
    }
    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: ''
    };
    properties.vueSlots = {
      // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots
        });
      }
    };
  }
  if (Array.isArray(props)) {
    // ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key)
      };
    });
  } else if (isPlainObject(props)) {
    // {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {
        // title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }
        opts.type = parsePropType(key, opts.type);
        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key)
        };
      } else {
        // content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key)
        };
      }
    });
  }
  return properties;
}
function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}
  event.stopPropagation = noop;
  event.preventDefault = noop;
  event.target = event.target || {};
  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }
  if (hasOwn(event, 'markerId')) {
    event.detail = (0, _typeof2.default)(event.detail) === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }
  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }
  return event;
}
function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {
      // ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];
      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }
      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }
      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}
function processEventExtra(vm, extra, event, __args__) {
  var extraObj = {};
  if (Array.isArray(extra) && extra.length) {
    /**
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *'test'
     */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {
          // model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {
            // $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            extraObj['$' + index] = event.detail ? event.detail.__args__ || __args__ : __args__;
          } else if (dataPath.indexOf('$event.') === 0) {
            // $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }
  return extraObj;
}
function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}
function processEventArgs(vm, event) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var isCustom = arguments.length > 4 ? arguments[4] : undefined;
  var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象

  // fixed 用户直接触发 mpInstance.triggerEvent
  var __args__ = isPlainObject(event.detail) ? event.detail.__args__ || [event.detail] : [event.detail];
  if (isCustom) {
    // 自定义事件
    isCustomMPEvent = event.currentTarget && event.currentTarget.dataset && event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {
      // 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return __args__;
    }
  }
  var extraObj = processEventExtra(vm, extra, event, __args__);
  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {
        // input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(__args__[0]);
        } else {
          // wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });
  return ret;
}
var ONCE = '~';
var CUSTOM = '^';
function isMatchEventType(eventType, optType) {
  return eventType === optType || optType === 'regionchange' && (eventType === 'begin' || eventType === 'end');
}
function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}
function handleEvent(event) {
  var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;
  var ret = [];
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];
    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;
    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {
            // mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx, processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName));
            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            var _type = _this2.$vm.mpType === 'page' ? 'Page' : 'Component';
            var path = _this2.route || _this2.is;
            throw new Error("".concat(_type, " \"").concat(path, "\" does not have a method \"").concat(methodName, "\""));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName);
          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });
  if (eventType === 'input' && ret.length === 1 && typeof ret[0] !== 'undefined') {
    return ret[0];
  }
}
var eventChannels = {};
function getEventChannel(id) {
  var eventChannel = eventChannels[id];
  delete eventChannels[id];
  return eventChannel;
}
var hooks = ['onShow', 'onHide', 'onError', 'onPageNotFound', 'onThemeChange', 'onUnhandledRejection'];
function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}
function initScopedSlotsParams() {
  var center = {};
  var parents = {};
  function currentId(fn) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      fn(vueId);
    }
  }
  _vue.default.prototype.$hasSSP = function (vueId) {
    var slot = center[vueId];
    if (!slot) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return slot;
  };
  _vue.default.prototype.$getSSP = function (vueId, name, needAll) {
    var slot = center[vueId];
    if (slot) {
      var params = slot[name] || [];
      if (needAll) {
        return params;
      }
      return params[0];
    }
  };
  _vue.default.prototype.$setSSP = function (name, value) {
    var index = 0;
    currentId.call(this, function (vueId) {
      var slot = center[vueId];
      var params = slot[name] = slot[name] || [];
      params.push(value);
      index = params.length - 1;
    });
    return index;
  };
  _vue.default.prototype.$initSSP = function () {
    currentId.call(this, function (vueId) {
      center[vueId] = {};
    });
  };
  _vue.default.prototype.$callSSP = function () {
    currentId.call(this, function (vueId) {
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    });
  };
  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    }
  });
}
function parseBaseApp(vm, _ref4) {
  var mocks = _ref4.mocks,
    initRefs = _ref4.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);
  _vue.default.prototype.mpHost = "mp-weixin";
  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }
      this.mpType = this.$options.mpType;
      this.$mp = (0, _defineProperty2.default)({
        data: {}
      }, this.mpType, this.$options.mpInstance);
      this.$scope = this.$options.mpInstance;
      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {
        // hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    }
  });
  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {
        // 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {
          // 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }
      this.$vm = vm;
      this.$vm.$mp = {
        app: this
      };
      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;
      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);
      this.$vm.__call_hook('onLaunch', args);
    }
  };

  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }
  initAppLocale(_vue.default, vm, normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);
  initHooks(appOptions, hooks);
  initUnknownHooks(appOptions, vm.$options);
  return appOptions;
}
function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs
  });
}
function createApp(vm) {
  App(parseApp(vm));
  return vm;
}
var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {
  return '%' + c.charCodeAt(0).toString(16);
};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
};
function stringifyQuery(obj) {
  var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];
    if (val === undefined) {
      return '';
    }
    if (val === null) {
      return encodeStr(key);
    }
    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }
    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : null;
  return res ? "?".concat(res) : '';
}
function parseBaseComponent(vueComponentOptions) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    isPage = _ref5.isPage,
    initRelation = _ref5.initRelation;
  var needVueOptions = arguments.length > 2 ? arguments[2] : undefined;
  var _initVueComponent = initVueComponent(_vue.default, vueComponentOptions),
    _initVueComponent2 = (0, _slicedToArray2.default)(_initVueComponent, 2),
    VueComponent = _initVueComponent2[0],
    vueOptions = _initVueComponent2[1];
  var options = _objectSpread({
    multipleSlots: true,
    // styleIsolation: 'apply-shared',
    addGlobalClass: true
  }, vueOptions.options || {});
  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }
  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file, options),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;
        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties
        };
        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options
        });

        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      }
    },
    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      }
    },
    methods: {
      __l: handleLink,
      __e: handleEvent
    }
  };
  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }
  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }
  if (needVueOptions) {
    return [componentOptions, vueOptions, VueComponent];
  }
  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}
function parseComponent(vueComponentOptions, needVueOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation
  }, needVueOptions);
}
var hooks$1 = ['onShow', 'onHide', 'onUnload'];
hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);
function parseBasePage(vuePageOptions) {
  var _parseComponent = parseComponent(vuePageOptions, true),
    _parseComponent2 = (0, _slicedToArray2.default)(_parseComponent, 2),
    pageOptions = _parseComponent2[0],
    vueOptions = _parseComponent2[1];
  initHooks(pageOptions.methods, hooks$1, vueOptions);
  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery)
    };
    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };
  {
    initUnknownHooks(pageOptions.methods, vuePageOptions, ['onReady']);
  }
  {
    initWorkletMethods(pageOptions.methods, vueOptions.methods);
  }
  return pageOptions;
}
function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions);
}
function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}
function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}
function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true
  });
  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});
canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name : canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});
var uni = {};
if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    }
  });
} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });
  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, extraApi[name]);
    });
  }
  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });
  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });
  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}
wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;
var uni$1 = uni;
var _default = uni$1;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 5 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ 6);
var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit.js */ 7);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 8);
var nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ 10);
function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}
module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 6 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 7 */
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) {
        ;
      }
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 8 */
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 9);
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 9 */
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 10 */
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 11 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 12);
function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 12 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPropertyKey.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
var toPrimitive = __webpack_require__(/*! ./toPrimitive.js */ 14);
function _toPropertyKey(arg) {
  var key = toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
module.exports = _toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 13 */
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 14 */
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPrimitive.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
module.exports = _toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 15 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/construct.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ 16);
var isNativeReflectConstruct = __webpack_require__(/*! ./isNativeReflectConstruct.js */ 17);
function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct.bind(), module.exports.__esModule = true, module.exports["default"] = module.exports;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
  return _construct.apply(null, arguments);
}
module.exports = _construct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 16 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 17 */
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
module.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 18 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles.js */ 19);
var iterableToArray = __webpack_require__(/*! ./iterableToArray.js */ 20);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 8);
var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread.js */ 21);
function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}
module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 19 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 9);
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}
module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 20 */
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 21 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 22 */
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;
exports.compileI18nJsonStr = compileI18nJsonStr;
exports.hasI18nJson = hasI18nJson;
exports.initVueI18n = initVueI18n;
exports.isI18nStr = isI18nStr;
exports.isString = void 0;
exports.normalizeLocale = normalizeLocale;
exports.parseI18nJson = parseI18nJson;
exports.resolveLocale = resolveLocale;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var isObject = function isObject(val) {
  return val !== null && (0, _typeof2.default)(val) === 'object';
};
var defaultDelimiters = ['{', '}'];
var BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {
    (0, _classCallCheck2.default)(this, BaseFormatter);
    this._caches = Object.create(null);
  }
  (0, _createClass2.default)(BaseFormatter, [{
    key: "interpolate",
    value: function interpolate(message, values) {
      var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }]);
  return BaseFormatter;
}();
exports.Formatter = BaseFormatter;
var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {
  var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
    startDelimiter = _ref2[0],
    endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({
          type: 'text',
          value: text
        });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ? 'list' : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? 'named' : 'unknown';
      tokens.push({
        value: sub,
        type: type
      });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
      text += char;
    }
  }
  text && tokens.push({
    type: 'text',
    value: text
  });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = Array.isArray(values) ? 'list' : isObject(values) ? 'named' : 'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;
    }
    index++;
  }
  return compiled;
}
var LOCALE_ZH_HANS = 'zh-Hans';
exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';
exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';
exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';
exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';
exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {
  return hasOwnProperty.call(val, key);
};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
  if (messages && Object.keys(messages).length > 0) {
    locales = Object.keys(messages);
  }
  var lang = startsWith(locale, locales);
  if (lang) {
    return lang;
  }
}
var I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {
    var locale = _ref3.locale,
      fallbackLocale = _ref3.fallbackLocale,
      messages = _ref3.messages,
      watcher = _ref3.watcher,
      formater = _ref3.formater;
    (0, _classCallCheck2.default)(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }
  (0, _createClass2.default)(I18n, [{
    key: "setLocale",
    value: function setLocale(locale) {
      var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    }
  }, {
    key: "getLocale",
    value: function getLocale() {
      return this.locale;
    }
  }, {
    key: "watchLocale",
    value: function watchLocale(fn) {
      var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    }
  }, {
    key: "add",
    value: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
  }, {
    key: "f",
    value: function f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    }
  }, {
    key: "t",
    value: function t(key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    }
  }]);
  return I18n;
}();
exports.I18n = I18n;
function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else {
    appVm.$watch(function () {
      return appVm.$locale;
    }, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {
  var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;
  var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {
    var _ref4 = [messages, locale];
    locale = _ref4[0];
    messages = _ref4[1];
  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale = typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale || LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher
  });
  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    }
  };
}
var isString = function isString(val) {
  return typeof val === 'string';
};
exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {
  var locale = _ref5.locale,
    locales = _ref5.locales,
    delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name]
      });
    }
  });
  localeValues.unshift({
    locale: locale,
    values: locales[locale]
  });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  } catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (Array.isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}
function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {
      return locales.indexOf(locale) > -1;
    });
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 23 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 24 */
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 12);
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 25 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2023 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue &&
    !value.__v_isMPComponent
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//百度、快手、小红书 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
var NULLTYPE = '[object Null]';
var UNDEFINEDTYPE = '[object Undefined]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function nullOrUndefined(currentType, preType) {
    if(
        (currentType === NULLTYPE || currentType === UNDEFINEDTYPE) && 
        (preType === NULLTYPE || preType === UNDEFINEDTYPE)
    ) {
        return false
    }
    return true
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key] && nullOrUndefined(currentType, preType)) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"ich-zcb-client","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"ich-zcb-client","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"ich-zcb-client","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function clearInstance(key, value) {
  // 简易去除 Vue 和小程序组件实例
  if (value) {
    if (value._isVue || value.__v_isMPComponent) {
      return {}
    }
  }
  return value
}

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret, clearInstance))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"ich-zcb-client","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      var triggerEvent = this.$scope['_triggerEvent'] || this.$scope['triggerEvent'];
      if (triggerEvent) {
        try {
          triggerEvent.call(this.$scope, event, {
            __args__: toArray(arguments, 1)
          });
        } catch (error) {

        }
      }
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    'onUploadDouyinVideo',
    'onNFCReadMessage',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 26 */
/*!*******************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-client/pages.json ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 27 */
/*!************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, uni, wx) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 28));
var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ 30));
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 31));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ 32));
var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ 33));
var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ 34));
var _wrapNativeSuper2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/wrapNativeSuper */ 35));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 22);
var _pages = _interopRequireDefault(__webpack_require__(/*! @/pages.json */ 37));
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e35) { throw _e35; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e36) { didErr = true; err = _e36; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
"undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;
function n(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function s(e, t, n) {
  return e(n = {
    path: t,
    exports: {},
    require: function require(e, t) {
      return function () {
        throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
      }(null == t && n.path);
    }
  }, n.exports), n.exports;
}
var r = s(function (e, t) {
    var n;
    e.exports = (n = n || function (e, t) {
      var n = Object.create || function () {
          function e() {}
          return function (t) {
            var n;
            return e.prototype = t, n = new e(), e.prototype = null, n;
          };
        }(),
        s = {},
        r = s.lib = {},
        i = r.Base = {
          extend: function extend(e) {
            var t = n(this);
            return e && t.mixIn(e), t.hasOwnProperty("init") && this.init !== t.init || (t.init = function () {
              t.$super.init.apply(this, arguments);
            }), t.init.prototype = t, t.$super = this, t;
          },
          create: function create() {
            var e = this.extend();
            return e.init.apply(e, arguments), e;
          },
          init: function init() {},
          mixIn: function mixIn(e) {
            for (var t in e) {
              e.hasOwnProperty(t) && (this[t] = e[t]);
            }
            e.hasOwnProperty("toString") && (this.toString = e.toString);
          },
          clone: function clone() {
            return this.init.prototype.extend(this);
          }
        },
        o = r.WordArray = i.extend({
          init: function init(e, n) {
            e = this.words = e || [], this.sigBytes = n != t ? n : 4 * e.length;
          },
          toString: function toString(e) {
            return (e || c).stringify(this);
          },
          concat: function concat(e) {
            var t = this.words,
              n = e.words,
              s = this.sigBytes,
              r = e.sigBytes;
            if (this.clamp(), s % 4) for (var i = 0; i < r; i++) {
              var o = n[i >>> 2] >>> 24 - i % 4 * 8 & 255;
              t[s + i >>> 2] |= o << 24 - (s + i) % 4 * 8;
            } else for (i = 0; i < r; i += 4) {
              t[s + i >>> 2] = n[i >>> 2];
            }
            return this.sigBytes += r, this;
          },
          clamp: function clamp() {
            var t = this.words,
              n = this.sigBytes;
            t[n >>> 2] &= 4294967295 << 32 - n % 4 * 8, t.length = e.ceil(n / 4);
          },
          clone: function clone() {
            var e = i.clone.call(this);
            return e.words = this.words.slice(0), e;
          },
          random: function random(t) {
            for (var n, s = [], r = function r(t) {
                t = t;
                var n = 987654321,
                  s = 4294967295;
                return function () {
                  var r = ((n = 36969 * (65535 & n) + (n >> 16) & s) << 16) + (t = 18e3 * (65535 & t) + (t >> 16) & s) & s;
                  return r /= 4294967296, (r += .5) * (e.random() > .5 ? 1 : -1);
                };
              }, i = 0; i < t; i += 4) {
              var a = r(4294967296 * (n || e.random()));
              n = 987654071 * a(), s.push(4294967296 * a() | 0);
            }
            return new o.init(s, t);
          }
        }),
        a = s.enc = {},
        c = a.Hex = {
          stringify: function stringify(e) {
            for (var t = e.words, n = e.sigBytes, s = [], r = 0; r < n; r++) {
              var i = t[r >>> 2] >>> 24 - r % 4 * 8 & 255;
              s.push((i >>> 4).toString(16)), s.push((15 & i).toString(16));
            }
            return s.join("");
          },
          parse: function parse(e) {
            for (var t = e.length, n = [], s = 0; s < t; s += 2) {
              n[s >>> 3] |= parseInt(e.substr(s, 2), 16) << 24 - s % 8 * 4;
            }
            return new o.init(n, t / 2);
          }
        },
        u = a.Latin1 = {
          stringify: function stringify(e) {
            for (var t = e.words, n = e.sigBytes, s = [], r = 0; r < n; r++) {
              var i = t[r >>> 2] >>> 24 - r % 4 * 8 & 255;
              s.push(String.fromCharCode(i));
            }
            return s.join("");
          },
          parse: function parse(e) {
            for (var t = e.length, n = [], s = 0; s < t; s++) {
              n[s >>> 2] |= (255 & e.charCodeAt(s)) << 24 - s % 4 * 8;
            }
            return new o.init(n, t);
          }
        },
        h = a.Utf8 = {
          stringify: function stringify(e) {
            try {
              return decodeURIComponent(escape(u.stringify(e)));
            } catch (e) {
              throw new Error("Malformed UTF-8 data");
            }
          },
          parse: function parse(e) {
            return u.parse(unescape(encodeURIComponent(e)));
          }
        },
        l = r.BufferedBlockAlgorithm = i.extend({
          reset: function reset() {
            this._data = new o.init(), this._nDataBytes = 0;
          },
          _append: function _append(e) {
            "string" == typeof e && (e = h.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes;
          },
          _process: function _process(t) {
            var n = this._data,
              s = n.words,
              r = n.sigBytes,
              i = this.blockSize,
              a = r / (4 * i),
              c = (a = t ? e.ceil(a) : e.max((0 | a) - this._minBufferSize, 0)) * i,
              u = e.min(4 * c, r);
            if (c) {
              for (var h = 0; h < c; h += i) {
                this._doProcessBlock(s, h);
              }
              var l = s.splice(0, c);
              n.sigBytes -= u;
            }
            return new o.init(l, u);
          },
          clone: function clone() {
            var e = i.clone.call(this);
            return e._data = this._data.clone(), e;
          },
          _minBufferSize: 0
        });
      r.Hasher = l.extend({
        cfg: i.extend(),
        init: function init(e) {
          this.cfg = this.cfg.extend(e), this.reset();
        },
        reset: function reset() {
          l.reset.call(this), this._doReset();
        },
        update: function update(e) {
          return this._append(e), this._process(), this;
        },
        finalize: function finalize(e) {
          return e && this._append(e), this._doFinalize();
        },
        blockSize: 16,
        _createHelper: function _createHelper(e) {
          return function (t, n) {
            return new e.init(n).finalize(t);
          };
        },
        _createHmacHelper: function _createHmacHelper(e) {
          return function (t, n) {
            return new d.HMAC.init(e, n).finalize(t);
          };
        }
      });
      var d = s.algo = {};
      return s;
    }(Math), n);
  }),
  i = r,
  o = (s(function (e, t) {
    var n;
    e.exports = (n = i, function (e) {
      var t = n,
        s = t.lib,
        r = s.WordArray,
        i = s.Hasher,
        o = t.algo,
        a = [];
      !function () {
        for (var t = 0; t < 64; t++) {
          a[t] = 4294967296 * e.abs(e.sin(t + 1)) | 0;
        }
      }();
      var c = o.MD5 = i.extend({
        _doReset: function _doReset() {
          this._hash = new r.init([1732584193, 4023233417, 2562383102, 271733878]);
        },
        _doProcessBlock: function _doProcessBlock(e, t) {
          for (var n = 0; n < 16; n++) {
            var s = t + n,
              r = e[s];
            e[s] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8);
          }
          var i = this._hash.words,
            o = e[t + 0],
            c = e[t + 1],
            p = e[t + 2],
            f = e[t + 3],
            g = e[t + 4],
            m = e[t + 5],
            y = e[t + 6],
            _ = e[t + 7],
            w = e[t + 8],
            v = e[t + 9],
            I = e[t + 10],
            S = e[t + 11],
            b = e[t + 12],
            k = e[t + 13],
            C = e[t + 14],
            T = e[t + 15],
            P = i[0],
            A = i[1],
            E = i[2],
            O = i[3];
          P = u(P, A, E, O, o, 7, a[0]), O = u(O, P, A, E, c, 12, a[1]), E = u(E, O, P, A, p, 17, a[2]), A = u(A, E, O, P, f, 22, a[3]), P = u(P, A, E, O, g, 7, a[4]), O = u(O, P, A, E, m, 12, a[5]), E = u(E, O, P, A, y, 17, a[6]), A = u(A, E, O, P, _, 22, a[7]), P = u(P, A, E, O, w, 7, a[8]), O = u(O, P, A, E, v, 12, a[9]), E = u(E, O, P, A, I, 17, a[10]), A = u(A, E, O, P, S, 22, a[11]), P = u(P, A, E, O, b, 7, a[12]), O = u(O, P, A, E, k, 12, a[13]), E = u(E, O, P, A, C, 17, a[14]), P = h(P, A = u(A, E, O, P, T, 22, a[15]), E, O, c, 5, a[16]), O = h(O, P, A, E, y, 9, a[17]), E = h(E, O, P, A, S, 14, a[18]), A = h(A, E, O, P, o, 20, a[19]), P = h(P, A, E, O, m, 5, a[20]), O = h(O, P, A, E, I, 9, a[21]), E = h(E, O, P, A, T, 14, a[22]), A = h(A, E, O, P, g, 20, a[23]), P = h(P, A, E, O, v, 5, a[24]), O = h(O, P, A, E, C, 9, a[25]), E = h(E, O, P, A, f, 14, a[26]), A = h(A, E, O, P, w, 20, a[27]), P = h(P, A, E, O, k, 5, a[28]), O = h(O, P, A, E, p, 9, a[29]), E = h(E, O, P, A, _, 14, a[30]), P = l(P, A = h(A, E, O, P, b, 20, a[31]), E, O, m, 4, a[32]), O = l(O, P, A, E, w, 11, a[33]), E = l(E, O, P, A, S, 16, a[34]), A = l(A, E, O, P, C, 23, a[35]), P = l(P, A, E, O, c, 4, a[36]), O = l(O, P, A, E, g, 11, a[37]), E = l(E, O, P, A, _, 16, a[38]), A = l(A, E, O, P, I, 23, a[39]), P = l(P, A, E, O, k, 4, a[40]), O = l(O, P, A, E, o, 11, a[41]), E = l(E, O, P, A, f, 16, a[42]), A = l(A, E, O, P, y, 23, a[43]), P = l(P, A, E, O, v, 4, a[44]), O = l(O, P, A, E, b, 11, a[45]), E = l(E, O, P, A, T, 16, a[46]), P = d(P, A = l(A, E, O, P, p, 23, a[47]), E, O, o, 6, a[48]), O = d(O, P, A, E, _, 10, a[49]), E = d(E, O, P, A, C, 15, a[50]), A = d(A, E, O, P, m, 21, a[51]), P = d(P, A, E, O, b, 6, a[52]), O = d(O, P, A, E, f, 10, a[53]), E = d(E, O, P, A, I, 15, a[54]), A = d(A, E, O, P, c, 21, a[55]), P = d(P, A, E, O, w, 6, a[56]), O = d(O, P, A, E, T, 10, a[57]), E = d(E, O, P, A, y, 15, a[58]), A = d(A, E, O, P, k, 21, a[59]), P = d(P, A, E, O, g, 6, a[60]), O = d(O, P, A, E, S, 10, a[61]), E = d(E, O, P, A, p, 15, a[62]), A = d(A, E, O, P, v, 21, a[63]), i[0] = i[0] + P | 0, i[1] = i[1] + A | 0, i[2] = i[2] + E | 0, i[3] = i[3] + O | 0;
        },
        _doFinalize: function _doFinalize() {
          var t = this._data,
            n = t.words,
            s = 8 * this._nDataBytes,
            r = 8 * t.sigBytes;
          n[r >>> 5] |= 128 << 24 - r % 32;
          var i = e.floor(s / 4294967296),
            o = s;
          n[15 + (r + 64 >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), n[14 + (r + 64 >>> 9 << 4)] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), t.sigBytes = 4 * (n.length + 1), this._process();
          for (var a = this._hash, c = a.words, u = 0; u < 4; u++) {
            var h = c[u];
            c[u] = 16711935 & (h << 8 | h >>> 24) | 4278255360 & (h << 24 | h >>> 8);
          }
          return a;
        },
        clone: function clone() {
          var e = i.clone.call(this);
          return e._hash = this._hash.clone(), e;
        }
      });
      function u(e, t, n, s, r, i, o) {
        var a = e + (t & n | ~t & s) + r + o;
        return (a << i | a >>> 32 - i) + t;
      }
      function h(e, t, n, s, r, i, o) {
        var a = e + (t & s | n & ~s) + r + o;
        return (a << i | a >>> 32 - i) + t;
      }
      function l(e, t, n, s, r, i, o) {
        var a = e + (t ^ n ^ s) + r + o;
        return (a << i | a >>> 32 - i) + t;
      }
      function d(e, t, n, s, r, i, o) {
        var a = e + (n ^ (t | ~s)) + r + o;
        return (a << i | a >>> 32 - i) + t;
      }
      t.MD5 = i._createHelper(c), t.HmacMD5 = i._createHmacHelper(c);
    }(Math), n.MD5);
  }), s(function (e, t) {
    var n;
    e.exports = (n = i, void function () {
      var e = n,
        t = e.lib.Base,
        s = e.enc.Utf8;
      e.algo.HMAC = t.extend({
        init: function init(e, t) {
          e = this._hasher = new e.init(), "string" == typeof t && (t = s.parse(t));
          var n = e.blockSize,
            r = 4 * n;
          t.sigBytes > r && (t = e.finalize(t)), t.clamp();
          for (var i = this._oKey = t.clone(), o = this._iKey = t.clone(), a = i.words, c = o.words, u = 0; u < n; u++) {
            a[u] ^= 1549556828, c[u] ^= 909522486;
          }
          i.sigBytes = o.sigBytes = r, this.reset();
        },
        reset: function reset() {
          var e = this._hasher;
          e.reset(), e.update(this._iKey);
        },
        update: function update(e) {
          return this._hasher.update(e), this;
        },
        finalize: function finalize(e) {
          var t = this._hasher,
            n = t.finalize(e);
          return t.reset(), t.finalize(this._oKey.clone().concat(n));
        }
      });
    }());
  }), s(function (e, t) {
    e.exports = i.HmacMD5;
  })),
  a = s(function (e, t) {
    e.exports = i.enc.Utf8;
  }),
  c = s(function (e, t) {
    var n;
    e.exports = (n = i, function () {
      var e = n,
        t = e.lib.WordArray;
      function s(e, n, s) {
        for (var r = [], i = 0, o = 0; o < n; o++) {
          if (o % 4) {
            var a = s[e.charCodeAt(o - 1)] << o % 4 * 2,
              c = s[e.charCodeAt(o)] >>> 6 - o % 4 * 2;
            r[i >>> 2] |= (a | c) << 24 - i % 4 * 8, i++;
          }
        }
        return t.create(r, i);
      }
      e.enc.Base64 = {
        stringify: function stringify(e) {
          var t = e.words,
            n = e.sigBytes,
            s = this._map;
          e.clamp();
          for (var r = [], i = 0; i < n; i += 3) {
            for (var o = (t[i >>> 2] >>> 24 - i % 4 * 8 & 255) << 16 | (t[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255) << 8 | t[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255, a = 0; a < 4 && i + .75 * a < n; a++) {
              r.push(s.charAt(o >>> 6 * (3 - a) & 63));
            }
          }
          var c = s.charAt(64);
          if (c) for (; r.length % 4;) {
            r.push(c);
          }
          return r.join("");
        },
        parse: function parse(e) {
          var t = e.length,
            n = this._map,
            r = this._reverseMap;
          if (!r) {
            r = this._reverseMap = [];
            for (var i = 0; i < n.length; i++) {
              r[n.charCodeAt(i)] = i;
            }
          }
          var o = n.charAt(64);
          if (o) {
            var a = e.indexOf(o);
            -1 !== a && (t = a);
          }
          return s(e, t, r);
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
      };
    }(), n.enc.Base64);
  });
var u = "FUNCTION",
  h = "OBJECT",
  l = "CLIENT_DB",
  d = "pending",
  p = "fullfilled",
  f = "rejected";
function g(e) {
  return Object.prototype.toString.call(e).slice(8, -1).toLowerCase();
}
function m(e) {
  return "object" === g(e);
}
function y(e) {
  return "function" == typeof e;
}
function _(e) {
  return function () {
    try {
      return e.apply(e, arguments);
    } catch (e) {
      console.error(e);
    }
  };
}
var w = "REJECTED",
  v = "NOT_PENDING";
var I = /*#__PURE__*/function () {
  function I() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      e = _ref.createPromise,
      _ref$retryRule = _ref.retryRule,
      t = _ref$retryRule === void 0 ? w : _ref$retryRule;
    (0, _classCallCheck2.default)(this, I);
    this.createPromise = e, this.status = null, this.promise = null, this.retryRule = t;
  }
  (0, _createClass2.default)(I, [{
    key: "needRetry",
    get: function get() {
      if (!this.status) return !0;
      switch (this.retryRule) {
        case w:
          return this.status === f;
        case v:
          return this.status !== d;
      }
    }
  }, {
    key: "exec",
    value: function exec() {
      var _this = this;
      return this.needRetry ? (this.status = d, this.promise = this.createPromise().then(function (e) {
        return _this.status = p, Promise.resolve(e);
      }, function (e) {
        return _this.status = f, Promise.reject(e);
      }), this.promise) : this.promise;
    }
  }]);
  return I;
}();
function S(e) {
  return e && "string" == typeof e ? JSON.parse(e) : e;
}
var b = "development" === "development",
  k = "mp-weixin",
  C = "true" === undefined || !0 === undefined,
  T = S([]),
  P = "h5" === k ? "web" : "app-plus" === k ? "app" : k,
  A = S({
    "address": [
        "127.0.0.1",
        "192.168.1.77",
        "192.168.56.1"
    ],
    "debugPort": 9000,
    "initialLaunchType": "local",
    "servePort": 7000,
    "skipFiles": [
        "<node_internals>/**",
        "E:/HBuilderX/plugins/unicloud/**/*.js"
    ]
}
),
  E = S([{"provider":"aliyun","spaceName":"ich-zcb","spaceId":"mp-eb3c4f74-e166-46c8-86fa-16b689377db5","clientSecret":"jqe6KE+jyKdWeqDCkqY3+Q==","endpoint":"https://api.next.bspapp.com"}]) || [],
  O = true;
var x = "";
try {
  x = (__webpack_require__(/*! uni-stat-config */ 38).default || __webpack_require__(/*! uni-stat-config */ 38)).appid;
} catch (e) {}
var R = {};
function U(e) {
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var n, s;
  return n = R, s = e, Object.prototype.hasOwnProperty.call(n, s) || (R[e] = t), R[e];
}
"app" === P && (R = uni._globalUniCloudObj ? uni._globalUniCloudObj : uni._globalUniCloudObj = {});
var L = ["invoke", "success", "fail", "complete"],
  N = U("_globalUniCloudInterceptor");
function D(e, t) {
  N[e] || (N[e] = {}), m(t) && Object.keys(t).forEach(function (n) {
    L.indexOf(n) > -1 && function (e, t, n) {
      var s = N[e][t];
      s || (s = N[e][t] = []), -1 === s.indexOf(n) && y(n) && s.push(n);
    }(e, n, t[n]);
  });
}
function F(e, t) {
  N[e] || (N[e] = {}), m(t) ? Object.keys(t).forEach(function (n) {
    L.indexOf(n) > -1 && function (e, t, n) {
      var s = N[e][t];
      if (!s) return;
      var r = s.indexOf(n);
      r > -1 && s.splice(r, 1);
    }(e, n, t[n]);
  }) : delete N[e];
}
function q(e, t) {
  return e && 0 !== e.length ? e.reduce(function (e, n) {
    return e.then(function () {
      return n(t);
    });
  }, Promise.resolve()) : Promise.resolve();
}
function M(e, t) {
  return N[e] && N[e][t] || [];
}
function K(e) {
  D("callObject", e);
}
var j = U("_globalUniCloudListener"),
  B = "response",
  $ = "needLogin",
  W = "refreshToken",
  z = "clientdb",
  J = "cloudfunction",
  H = "cloudobject";
function G(e) {
  return j[e] || (j[e] = []), j[e];
}
function V(e, t) {
  var n = G(e);
  n.includes(t) || n.push(t);
}
function Y(e, t) {
  var n = G(e),
    s = n.indexOf(t);
  -1 !== s && n.splice(s, 1);
}
function Q(e, t) {
  var n = G(e);
  for (var _e2 = 0; _e2 < n.length; _e2++) {
    (0, n[_e2])(t);
  }
}
var X,
  Z = !1;
function ee() {
  return X || (X = new Promise(function (e) {
    Z && e(), function t() {
      if ("function" == typeof getCurrentPages) {
        var _t2 = getCurrentPages();
        _t2 && _t2[0] && (Z = !0, e());
      }
      Z || setTimeout(function () {
        t();
      }, 30);
    }();
  }), X);
}
function te(e) {
  var t = {};
  for (var _n2 in e) {
    var _s2 = e[_n2];
    y(_s2) && (t[_n2] = _(_s2));
  }
  return t;
}
var ne = /*#__PURE__*/function (_Error) {
  (0, _inherits2.default)(ne, _Error);
  var _super = _createSuper(ne);
  function ne(e) {
    var _this2;
    (0, _classCallCheck2.default)(this, ne);
    _this2 = _super.call(this, e.message), _this2.errMsg = e.message || e.errMsg || "unknown system error", _this2.code = _this2.errCode = e.code || e.errCode || "SYSTEM_ERROR", _this2.errSubject = _this2.subject = e.subject || e.errSubject, _this2.cause = e.cause, _this2.requestId = e.requestId;
    return _this2;
  }
  (0, _createClass2.default)(ne, [{
    key: "toJson",
    value: function toJson() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      if (!(e >= 10)) return e++, {
        errCode: this.errCode,
        errMsg: this.errMsg,
        errSubject: this.errSubject,
        cause: this.cause && this.cause.toJson ? this.cause.toJson(e) : this.cause
      };
    }
  }]);
  return ne;
}( /*#__PURE__*/(0, _wrapNativeSuper2.default)(Error));
var se = {
  request: function request(e) {
    return uni.request(e);
  },
  uploadFile: function uploadFile(e) {
    return uni.uploadFile(e);
  },
  setStorageSync: function setStorageSync(e, t) {
    return uni.setStorageSync(e, t);
  },
  getStorageSync: function getStorageSync(e) {
    return uni.getStorageSync(e);
  },
  removeStorageSync: function removeStorageSync(e) {
    return uni.removeStorageSync(e);
  },
  clearStorageSync: function clearStorageSync() {
    return uni.clearStorageSync();
  }
};
function re() {
  return {
    token: se.getStorageSync("uni_id_token") || se.getStorageSync("uniIdToken"),
    tokenExpired: se.getStorageSync("uni_id_token_expired")
  };
}
function ie() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    e = _ref2.token,
    t = _ref2.tokenExpired;
  e && se.setStorageSync("uni_id_token", e), t && se.setStorageSync("uni_id_token_expired", t);
}
var oe, ae;
function ce() {
  return oe || (oe = uni.getSystemInfoSync()), oe;
}
function ue() {
  var e, t;
  try {
    if (uni.getLaunchOptionsSync) {
      if (uni.getLaunchOptionsSync.toString().indexOf("not yet implemented") > -1) return;
      var _uni$getLaunchOptions = uni.getLaunchOptionsSync(),
        _n3 = _uni$getLaunchOptions.scene,
        _s3 = _uni$getLaunchOptions.channel;
      e = _s3, t = _n3;
    }
  } catch (e) {}
  return {
    channel: e,
    scene: t
  };
}
function he() {
  var e = uni.getLocale && uni.getLocale() || "en";
  if (ae) return _objectSpread(_objectSpread({}, ae), {}, {
    locale: e,
    LOCALE: e
  });
  var t = ce(),
    n = t.deviceId,
    s = t.osName,
    r = t.uniPlatform,
    i = t.appId,
    o = ["pixelRatio", "brand", "model", "system", "language", "version", "platform", "host", "SDKVersion", "swanNativeVersion", "app", "AppPlatform", "fontSizeSetting"];
  for (var _e3 = 0; _e3 < o.length; _e3++) {
    delete t[o[_e3]];
  }
  return ae = _objectSpread(_objectSpread({
    PLATFORM: r,
    OS: s,
    APPID: i,
    DEVICEID: n
  }, ue()), t), _objectSpread(_objectSpread({}, ae), {}, {
    locale: e,
    LOCALE: e
  });
}
var le = {
    sign: function sign(e, t) {
      var n = "";
      return Object.keys(e).sort().forEach(function (t) {
        e[t] && (n = n + "&" + t + "=" + e[t]);
      }), n = n.slice(1), o(n, t).toString();
    },
    wrappedRequest: function wrappedRequest(e, t) {
      return new Promise(function (n, s) {
        t(Object.assign(e, {
          complete: function complete(e) {
            e || (e = {}), b && "web" === P && e.errMsg && 0 === e.errMsg.indexOf("request:fail") && console.warn("发布H5，需要在uniCloud后台操作，绑定安全域名，否则会因为跨域问题而无法访问。教程参考：https://uniapp.dcloud.io/uniCloud/quickstart?id=useinh5");
            var t = e.data && e.data.header && e.data.header["x-serverless-request-id"] || e.header && e.header["request-id"];
            if (!e.statusCode || e.statusCode >= 400) return s(new ne({
              code: "SYS_ERR",
              message: e.errMsg || "request:fail",
              requestId: t
            }));
            var r = e.data;
            if (r.error) return s(new ne({
              code: r.error.code,
              message: r.error.message,
              requestId: t
            }));
            r.result = r.data, r.requestId = t, delete r.data, n(r);
          }
        }));
      });
    },
    toBase64: function toBase64(e) {
      return c.stringify(a.parse(e));
    }
  },
  de = {
    "uniCloud.init.paramRequired": "{param} required",
    "uniCloud.uploadFile.fileError": "filePath should be instance of File"
  };
var _e4 = (0, _uniI18n.initVueI18n)({
    "zh-Hans": {
      "uniCloud.init.paramRequired": "缺少参数：{param}",
      "uniCloud.uploadFile.fileError": "filePath应为File对象"
    },
    "zh-Hant": {
      "uniCloud.init.paramRequired": "缺少参数：{param}",
      "uniCloud.uploadFile.fileError": "filePath应为File对象"
    },
    en: de,
    fr: {
      "uniCloud.init.paramRequired": "{param} required",
      "uniCloud.uploadFile.fileError": "filePath should be instance of File"
    },
    es: {
      "uniCloud.init.paramRequired": "{param} required",
      "uniCloud.uploadFile.fileError": "filePath should be instance of File"
    },
    ja: de
  }, "zh-Hans"),
  pe = _e4.t;
var fe = /*#__PURE__*/function () {
  function fe(e) {
    var _this3 = this;
    (0, _classCallCheck2.default)(this, fe);
    ["spaceId", "clientSecret"].forEach(function (t) {
      if (!Object.prototype.hasOwnProperty.call(e, t)) throw new Error(pe("uniCloud.init.paramRequired", {
        param: t
      }));
    }), this.config = Object.assign({}, {
      endpoint: 0 === e.spaceId.indexOf("mp-") ? "https://api.next.bspapp.com" : "https://api.bspapp.com"
    }, e), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = se, this._getAccessTokenPromiseHub = new I({
      createPromise: function createPromise() {
        return _this3.requestAuth(_this3.setupRequest({
          method: "serverless.auth.user.anonymousAuthorize",
          params: "{}"
        }, "auth")).then(function (e) {
          if (!e.result || !e.result.accessToken) throw new ne({
            code: "AUTH_FAILED",
            message: "获取accessToken失败"
          });
          _this3.setAccessToken(e.result.accessToken);
        });
      },
      retryRule: v
    });
  }
  (0, _createClass2.default)(fe, [{
    key: "hasAccessToken",
    get: function get() {
      return !!this.accessToken;
    }
  }, {
    key: "setAccessToken",
    value: function setAccessToken(e) {
      this.accessToken = e;
    }
  }, {
    key: "requestWrapped",
    value: function requestWrapped(e) {
      return le.wrappedRequest(e, this.adapter.request);
    }
  }, {
    key: "requestAuth",
    value: function requestAuth(e) {
      return this.requestWrapped(e);
    }
  }, {
    key: "request",
    value: function request(e, t) {
      var _this4 = this;
      return Promise.resolve().then(function () {
        return _this4.hasAccessToken ? t ? _this4.requestWrapped(e) : _this4.requestWrapped(e).catch(function (t) {
          return new Promise(function (e, n) {
            !t || "GATEWAY_INVALID_TOKEN" !== t.code && "InvalidParameter.InvalidToken" !== t.code ? n(t) : e();
          }).then(function () {
            return _this4.getAccessToken();
          }).then(function () {
            var t = _this4.rebuildRequest(e);
            return _this4.request(t, !0);
          });
        }) : _this4.getAccessToken().then(function () {
          var t = _this4.rebuildRequest(e);
          return _this4.request(t, !0);
        });
      });
    }
  }, {
    key: "rebuildRequest",
    value: function rebuildRequest(e) {
      var t = Object.assign({}, e);
      return t.data.token = this.accessToken, t.header["x-basement-token"] = this.accessToken, t.header["x-serverless-sign"] = le.sign(t.data, this.config.clientSecret), t;
    }
  }, {
    key: "setupRequest",
    value: function setupRequest(e, t) {
      var n = Object.assign({}, e, {
          spaceId: this.config.spaceId,
          timestamp: Date.now()
        }),
        s = {
          "Content-Type": "application/json"
        };
      return "auth" !== t && (n.token = this.accessToken, s["x-basement-token"] = this.accessToken), s["x-serverless-sign"] = le.sign(n, this.config.clientSecret), {
        url: this.config.requestUrl,
        method: "POST",
        data: n,
        dataType: "json",
        header: s
      };
    }
  }, {
    key: "getAccessToken",
    value: function getAccessToken() {
      return this._getAccessTokenPromiseHub.exec();
    }
  }, {
    key: "authorize",
    value: function () {
      var _authorize = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.getAccessToken();
              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function authorize() {
        return _authorize.apply(this, arguments);
      }
      return authorize;
    }()
  }, {
    key: "callFunction",
    value: function callFunction(e) {
      var t = {
        method: "serverless.function.runtime.invoke",
        params: JSON.stringify({
          functionTarget: e.name,
          functionArgs: e.data || {}
        })
      };
      return this.request(this.setupRequest(t));
    }
  }, {
    key: "getOSSUploadOptionsFromPath",
    value: function getOSSUploadOptionsFromPath(e) {
      var t = {
        method: "serverless.file.resource.generateProximalSign",
        params: JSON.stringify(e)
      };
      return this.request(this.setupRequest(t));
    }
  }, {
    key: "uploadFileToOSS",
    value: function uploadFileToOSS(_ref3) {
      var _this5 = this;
      var e = _ref3.url,
        t = _ref3.formData,
        n = _ref3.name,
        s = _ref3.filePath,
        r = _ref3.fileType,
        i = _ref3.onUploadProgress;
      return new Promise(function (o, a) {
        var c = _this5.adapter.uploadFile({
          url: e,
          formData: t,
          name: n,
          filePath: s,
          fileType: r,
          header: {
            "X-OSS-server-side-encrpytion": "AES256"
          },
          success: function success(e) {
            e && e.statusCode < 400 ? o(e) : a(new ne({
              code: "UPLOAD_FAILED",
              message: "文件上传失败"
            }));
          },
          fail: function fail(e) {
            a(new ne({
              code: e.code || "UPLOAD_FAILED",
              message: e.message || e.errMsg || "文件上传失败"
            }));
          }
        });
        "function" == typeof i && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (e) {
          i({
            loaded: e.totalBytesSent,
            total: e.totalBytesExpectedToSend
          });
        });
      });
    }
  }, {
    key: "reportOSSUpload",
    value: function reportOSSUpload(e) {
      var t = {
        method: "serverless.file.resource.report",
        params: JSON.stringify(e)
      };
      return this.request(this.setupRequest(t));
    }
  }, {
    key: "uploadFile",
    value: function () {
      var _uploadFile = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(_ref4) {
        var e, t, _ref4$fileType, n, _ref4$cloudPathAsReal, s, r, i, o, a, c, u, h, l, d, p, f, m, y, _, _e5, w;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                e = _ref4.filePath, t = _ref4.cloudPath, _ref4$fileType = _ref4.fileType, n = _ref4$fileType === void 0 ? "image" : _ref4$fileType, _ref4$cloudPathAsReal = _ref4.cloudPathAsRealPath, s = _ref4$cloudPathAsReal === void 0 ? !1 : _ref4$cloudPathAsReal, r = _ref4.onUploadProgress, i = _ref4.config;
                if (!("string" !== g(t))) {
                  _context2.next = 3;
                  break;
                }
                throw new ne({
                  code: "INVALID_PARAM",
                  message: "cloudPath必须为字符串类型"
                });
              case 3:
                if (t = t.trim()) {
                  _context2.next = 5;
                  break;
                }
                throw new ne({
                  code: "INVALID_PARAM",
                  message: "cloudPath不可为空"
                });
              case 5:
                if (!/:\/\//.test(t)) {
                  _context2.next = 7;
                  break;
                }
                throw new ne({
                  code: "INVALID_PARAM",
                  message: "cloudPath不合法"
                });
              case 7:
                o = i && i.envType || this.config.envType;
                if (!(s && ("/" !== t[0] && (t = "/" + t), t.indexOf("\\") > -1))) {
                  _context2.next = 10;
                  break;
                }
                throw new ne({
                  code: "INVALID_PARAM",
                  message: "使用cloudPath作为路径时，cloudPath不可包含“\\”"
                });
              case 10:
                _context2.next = 12;
                return this.getOSSUploadOptionsFromPath({
                  env: o,
                  filename: s ? t.split("/").pop() : t,
                  fileId: s ? t : void 0
                });
              case 12:
                a = _context2.sent.result;
                c = "https://" + a.cdnDomain + "/" + a.ossPath;
                u = a.securityToken;
                h = a.accessKeyId;
                l = a.signature;
                d = a.host;
                p = a.ossPath;
                f = a.id;
                m = a.policy;
                y = a.ossCallbackUrl;
                _ = {
                  "Cache-Control": "max-age=2592000",
                  "Content-Disposition": "attachment",
                  OSSAccessKeyId: h,
                  Signature: l,
                  host: d,
                  id: f,
                  key: p,
                  policy: m,
                  success_action_status: 200
                };
                if (u && (_["x-oss-security-token"] = u), y) {
                  _e5 = JSON.stringify({
                    callbackUrl: y,
                    callbackBody: JSON.stringify({
                      fileId: f,
                      spaceId: this.config.spaceId
                    }),
                    callbackBodyType: "application/json"
                  });
                  _.callback = le.toBase64(_e5);
                }
                w = {
                  url: "https://" + a.host,
                  formData: _,
                  fileName: "file",
                  name: "file",
                  filePath: e,
                  fileType: n
                };
                _context2.next = 27;
                return this.uploadFileToOSS(Object.assign({}, w, {
                  onUploadProgress: r
                }));
              case 27:
                if (!y) {
                  _context2.next = 29;
                  break;
                }
                return _context2.abrupt("return", {
                  success: !0,
                  filePath: e,
                  fileID: c
                });
              case 29:
                _context2.next = 31;
                return this.reportOSSUpload({
                  id: f
                });
              case 31:
                if (!_context2.sent.success) {
                  _context2.next = 33;
                  break;
                }
                return _context2.abrupt("return", {
                  success: !0,
                  filePath: e,
                  fileID: c
                });
              case 33:
                throw new ne({
                  code: "UPLOAD_FAILED",
                  message: "文件上传失败"
                });
              case 34:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function uploadFile(_x) {
        return _uploadFile.apply(this, arguments);
      }
      return uploadFile;
    }()
  }, {
    key: "getTempFileURL",
    value: function getTempFileURL() {
      var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        e = _ref5.fileList;
      return new Promise(function (t, n) {
        Array.isArray(e) && 0 !== e.length || n(new ne({
          code: "INVALID_PARAM",
          message: "fileList的元素必须是非空的字符串"
        })), t({
          fileList: e.map(function (e) {
            return {
              fileID: e,
              tempFileURL: e
            };
          })
        });
      });
    }
  }, {
    key: "getFileInfo",
    value: function () {
      var _getFileInfo = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var _ref6,
          e,
          t,
          _args3 = arguments;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _ref6 = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {}, e = _ref6.fileList;
                if (!(!Array.isArray(e) || 0 === e.length)) {
                  _context3.next = 3;
                  break;
                }
                throw new ne({
                  code: "INVALID_PARAM",
                  message: "fileList的元素必须是非空的字符串"
                });
              case 3:
                t = {
                  method: "serverless.file.resource.info",
                  params: JSON.stringify({
                    id: e.map(function (e) {
                      return e.split("?")[0];
                    }).join(",")
                  })
                };
                _context3.next = 6;
                return this.request(this.setupRequest(t));
              case 6:
                _context3.t0 = _context3.sent.result;
                return _context3.abrupt("return", {
                  fileList: _context3.t0
                });
              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function getFileInfo() {
        return _getFileInfo.apply(this, arguments);
      }
      return getFileInfo;
    }()
  }]);
  return fe;
}();
var ge = {
  init: function init(e) {
    var t = new fe(e),
      n = {
        signInAnonymously: function signInAnonymously() {
          return t.authorize();
        },
        getLoginState: function getLoginState() {
          return Promise.resolve(!1);
        }
      };
    return t.auth = function () {
      return n;
    }, t.customAuth = t.auth, t;
  }
};
var me = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:";
var ye;
!function (e) {
  e.local = "local", e.none = "none", e.session = "session";
}(ye || (ye = {}));
var _e = function _e() {};
var we = function we() {
  var e;
  if (!Promise) {
    e = function e() {}, e.promise = {};
    var _t3 = function _t3() {
      throw new ne({
        message: 'Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.'
      });
    };
    return Object.defineProperty(e.promise, "then", {
      get: _t3
    }), Object.defineProperty(e.promise, "catch", {
      get: _t3
    }), e;
  }
  var t = new Promise(function (t, n) {
    e = function e(_e6, s) {
      return _e6 ? n(_e6) : t(s);
    };
  });
  return e.promise = t, e;
};
function ve(e) {
  return void 0 === e;
}
function Ie(e) {
  return "[object Null]" === Object.prototype.toString.call(e);
}
var Se;
function be(e) {
  var t = (n = e, "[object Array]" === Object.prototype.toString.call(n) ? e : [e]);
  var n;
  var _iterator = _createForOfIteratorHelper(t),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _e7 = _step.value;
      var _t4 = _e7.isMatch,
        _n4 = _e7.genAdapter,
        _s4 = _e7.runtime;
      if (_t4()) return {
        adapter: _n4(),
        runtime: _s4
      };
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}
!function (e) {
  e.WEB = "web", e.WX_MP = "wx_mp";
}(Se || (Se = {}));
var ke = {
    adapter: null,
    runtime: void 0
  },
  Ce = ["anonymousUuidKey"];
var Te = /*#__PURE__*/function (_e8) {
  (0, _inherits2.default)(Te, _e8);
  var _super2 = _createSuper(Te);
  function Te() {
    var _this6;
    (0, _classCallCheck2.default)(this, Te);
    _this6 = _super2.call(this), ke.adapter.root.tcbObject || (ke.adapter.root.tcbObject = {});
    return _this6;
  }
  (0, _createClass2.default)(Te, [{
    key: "setItem",
    value: function setItem(e, t) {
      ke.adapter.root.tcbObject[e] = t;
    }
  }, {
    key: "getItem",
    value: function getItem(e) {
      return ke.adapter.root.tcbObject[e];
    }
  }, {
    key: "removeItem",
    value: function removeItem(e) {
      delete ke.adapter.root.tcbObject[e];
    }
  }, {
    key: "clear",
    value: function clear() {
      delete ke.adapter.root.tcbObject;
    }
  }]);
  return Te;
}(_e);
function Pe(e, t) {
  switch (e) {
    case "local":
      return t.localStorage || new Te();
    case "none":
      return new Te();
    default:
      return t.sessionStorage || new Te();
  }
}
var Ae = /*#__PURE__*/function () {
  function Ae(e) {
    (0, _classCallCheck2.default)(this, Ae);
    if (!this._storage) {
      this._persistence = ke.adapter.primaryStorage || e.persistence, this._storage = Pe(this._persistence, ke.adapter);
      var _t5 = "access_token_".concat(e.env),
        _n5 = "access_token_expire_".concat(e.env),
        _s5 = "refresh_token_".concat(e.env),
        _r = "anonymous_uuid_".concat(e.env),
        _i = "login_type_".concat(e.env),
        _o = "user_info_".concat(e.env);
      this.keys = {
        accessTokenKey: _t5,
        accessTokenExpireKey: _n5,
        refreshTokenKey: _s5,
        anonymousUuidKey: _r,
        loginTypeKey: _i,
        userInfoKey: _o
      };
    }
  }
  (0, _createClass2.default)(Ae, [{
    key: "updatePersistence",
    value: function updatePersistence(e) {
      if (e === this._persistence) return;
      var t = "local" === this._persistence;
      this._persistence = e;
      var n = Pe(e, ke.adapter);
      for (var _e9 in this.keys) {
        var _s6 = this.keys[_e9];
        if (t && Ce.includes(_e9)) continue;
        var _r2 = this._storage.getItem(_s6);
        ve(_r2) || Ie(_r2) || (n.setItem(_s6, _r2), this._storage.removeItem(_s6));
      }
      this._storage = n;
    }
  }, {
    key: "setStore",
    value: function setStore(e, t, n) {
      if (!this._storage) return;
      var s = {
          version: n || "localCachev1",
          content: t
        },
        r = JSON.stringify(s);
      try {
        this._storage.setItem(e, r);
      } catch (e) {
        throw e;
      }
    }
  }, {
    key: "getStore",
    value: function getStore(e, t) {
      try {
        if (!this._storage) return;
      } catch (e) {
        return "";
      }
      t = t || "localCachev1";
      var n = this._storage.getItem(e);
      if (!n) return "";
      if (n.indexOf(t) >= 0) {
        return JSON.parse(n).content;
      }
      return "";
    }
  }, {
    key: "removeStore",
    value: function removeStore(e) {
      this._storage.removeItem(e);
    }
  }]);
  return Ae;
}();
var Ee = {},
  Oe = {};
function xe(e) {
  return Ee[e];
}
var Re = /*#__PURE__*/(0, _createClass2.default)(function Re(e, t) {
  (0, _classCallCheck2.default)(this, Re);
  this.data = t || null, this.name = e;
});
var Ue = /*#__PURE__*/function (_Re) {
  (0, _inherits2.default)(Ue, _Re);
  var _super3 = _createSuper(Ue);
  function Ue(e, t) {
    var _this7;
    (0, _classCallCheck2.default)(this, Ue);
    _this7 = _super3.call(this, "error", {
      error: e,
      data: t
    }), _this7.error = e;
    return _this7;
  }
  return (0, _createClass2.default)(Ue);
}(Re);
var Le = new ( /*#__PURE__*/function () {
  function _class() {
    (0, _classCallCheck2.default)(this, _class);
    this._listeners = {};
  }
  (0, _createClass2.default)(_class, [{
    key: "on",
    value: function on(e, t) {
      return function (e, t, n) {
        n[e] = n[e] || [], n[e].push(t);
      }(e, t, this._listeners), this;
    }
  }, {
    key: "off",
    value: function off(e, t) {
      return function (e, t, n) {
        if (n && n[e]) {
          var _s7 = n[e].indexOf(t);
          -1 !== _s7 && n[e].splice(_s7, 1);
        }
      }(e, t, this._listeners), this;
    }
  }, {
    key: "fire",
    value: function fire(e, t) {
      if (e instanceof Ue) return console.error(e.error), this;
      var n = "string" == typeof e ? new Re(e, t || {}) : e;
      var s = n.name;
      if (this._listens(s)) {
        n.target = this;
        var _e10 = this._listeners[s] ? (0, _toConsumableArray2.default)(this._listeners[s]) : [];
        var _iterator2 = _createForOfIteratorHelper(_e10),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _t6 = _step2.value;
            _t6.call(this, n);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
      return this;
    }
  }, {
    key: "_listens",
    value: function _listens(e) {
      return this._listeners[e] && this._listeners[e].length > 0;
    }
  }]);
  return _class;
}())();
function Ne(e, t) {
  Le.on(e, t);
}
function De(e) {
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  Le.fire(e, t);
}
function Fe(e, t) {
  Le.off(e, t);
}
var qe = "loginStateChanged",
  Me = "loginStateExpire",
  Ke = "loginTypeChanged",
  je = "anonymousConverted",
  Be = "refreshAccessToken";
var $e;
!function (e) {
  e.ANONYMOUS = "ANONYMOUS", e.WECHAT = "WECHAT", e.WECHAT_PUBLIC = "WECHAT-PUBLIC", e.WECHAT_OPEN = "WECHAT-OPEN", e.CUSTOM = "CUSTOM", e.EMAIL = "EMAIL", e.USERNAME = "USERNAME", e.NULL = "NULL";
}($e || ($e = {}));
var We = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"],
  ze = {
    "X-SDK-Version": "1.3.5"
  };
function Je(e, t, n) {
  var s = e[t];
  e[t] = function (t) {
    var r = {},
      i = {};
    n.forEach(function (n) {
      var _n$call = n.call(e, t),
        s = _n$call.data,
        o = _n$call.headers;
      Object.assign(r, s), Object.assign(i, o);
    });
    var o = t.data;
    return o && function () {
      var e;
      if (e = o, "[object FormData]" !== Object.prototype.toString.call(e)) t.data = _objectSpread(_objectSpread({}, o), r);else for (var _e11 in r) {
        o.append(_e11, r[_e11]);
      }
    }(), t.headers = _objectSpread(_objectSpread({}, t.headers || {}), i), s.call(e, t);
  };
}
function He() {
  var e = Math.random().toString(16).slice(2);
  return {
    data: {
      seqId: e
    },
    headers: _objectSpread(_objectSpread({}, ze), {}, {
      "x-seqid": e
    })
  };
}
var Ge = /*#__PURE__*/function () {
  function Ge() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2.default)(this, Ge);
    var t;
    this.config = e, this._reqClass = new ke.adapter.reqClass({
      timeout: this.config.timeout,
      timeoutMsg: "\u8BF7\u6C42\u5728".concat(this.config.timeout / 1e3, "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD"),
      restrictedMethods: ["post"]
    }), this._cache = xe(this.config.env), this._localCache = (t = this.config.env, Oe[t]), Je(this._reqClass, "post", [He]), Je(this._reqClass, "upload", [He]), Je(this._reqClass, "download", [He]);
  }
  (0, _createClass2.default)(Ge, [{
    key: "post",
    value: function () {
      var _post = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(e) {
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._reqClass.post(e);
              case 2:
                return _context4.abrupt("return", _context4.sent);
              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function post(_x2) {
        return _post.apply(this, arguments);
      }
      return post;
    }()
  }, {
    key: "upload",
    value: function () {
      var _upload = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(e) {
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this._reqClass.upload(e);
              case 2:
                return _context5.abrupt("return", _context5.sent);
              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function upload(_x3) {
        return _upload.apply(this, arguments);
      }
      return upload;
    }()
  }, {
    key: "download",
    value: function () {
      var _download = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(e) {
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this._reqClass.download(e);
              case 2:
                return _context6.abrupt("return", _context6.sent);
              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function download(_x4) {
        return _download.apply(this, arguments);
      }
      return download;
    }()
  }, {
    key: "refreshAccessToken",
    value: function () {
      var _refreshAccessToken2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
        var e, t;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());
                _context7.prev = 1;
                _context7.next = 4;
                return this._refreshAccessTokenPromise;
              case 4:
                e = _context7.sent;
                _context7.next = 10;
                break;
              case 7:
                _context7.prev = 7;
                _context7.t0 = _context7["catch"](1);
                t = _context7.t0;
              case 10:
                if (!(this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t)) {
                  _context7.next = 12;
                  break;
                }
                throw t;
              case 12:
                return _context7.abrupt("return", e);
              case 13:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[1, 7]]);
      }));
      function refreshAccessToken() {
        return _refreshAccessToken2.apply(this, arguments);
      }
      return refreshAccessToken;
    }()
  }, {
    key: "_refreshAccessToken",
    value: function () {
      var _refreshAccessToken3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8() {
        var _this$_cache$keys, e, t, n, s, r, i, o, a, _e12, _e13, _t7, _s8;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _this$_cache$keys = this._cache.keys, e = _this$_cache$keys.accessTokenKey, t = _this$_cache$keys.accessTokenExpireKey, n = _this$_cache$keys.refreshTokenKey, s = _this$_cache$keys.loginTypeKey, r = _this$_cache$keys.anonymousUuidKey;
                this._cache.removeStore(e), this._cache.removeStore(t);
                i = this._cache.getStore(n);
                if (i) {
                  _context8.next = 5;
                  break;
                }
                throw new ne({
                  message: "未登录CloudBase"
                });
              case 5:
                o = {
                  refresh_token: i
                };
                _context8.next = 8;
                return this.request("auth.fetchAccessTokenWithRefreshToken", o);
              case 8:
                a = _context8.sent;
                if (!a.data.code) {
                  _context8.next = 21;
                  break;
                }
                _e12 = a.data.code;
                if (!("SIGN_PARAM_INVALID" === _e12 || "REFRESH_TOKEN_EXPIRED" === _e12 || "INVALID_REFRESH_TOKEN" === _e12)) {
                  _context8.next = 20;
                  break;
                }
                if (!(this._cache.getStore(s) === $e.ANONYMOUS && "INVALID_REFRESH_TOKEN" === _e12)) {
                  _context8.next = 19;
                  break;
                }
                _e13 = this._cache.getStore(r);
                _t7 = this._cache.getStore(n);
                _context8.next = 17;
                return this.send("auth.signInAnonymously", {
                  anonymous_uuid: _e13,
                  refresh_token: _t7
                });
              case 17:
                _s8 = _context8.sent;
                return _context8.abrupt("return", (this.setRefreshToken(_s8.refresh_token), this._refreshAccessToken()));
              case 19:
                De(Me), this._cache.removeStore(n);
              case 20:
                throw new ne({
                  code: a.data.code,
                  message: "\u5237\u65B0access token\u5931\u8D25\uFF1A".concat(a.data.code)
                });
              case 21:
                if (!a.data.access_token) {
                  _context8.next = 23;
                  break;
                }
                return _context8.abrupt("return", (De(Be), this._cache.setStore(e, a.data.access_token), this._cache.setStore(t, a.data.access_token_expire + Date.now()), {
                  accessToken: a.data.access_token,
                  accessTokenExpire: a.data.access_token_expire
                }));
              case 23:
                a.data.refresh_token && (this._cache.removeStore(n), this._cache.setStore(n, a.data.refresh_token), this._refreshAccessToken());
              case 24:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));
      function _refreshAccessToken() {
        return _refreshAccessToken3.apply(this, arguments);
      }
      return _refreshAccessToken;
    }()
  }, {
    key: "getAccessToken",
    value: function () {
      var _getAccessToken = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9() {
        var _this$_cache$keys2, e, t, n, s, r, i;
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _this$_cache$keys2 = this._cache.keys, e = _this$_cache$keys2.accessTokenKey, t = _this$_cache$keys2.accessTokenExpireKey, n = _this$_cache$keys2.refreshTokenKey;
                if (this._cache.getStore(n)) {
                  _context9.next = 3;
                  break;
                }
                throw new ne({
                  message: "refresh token不存在，登录状态异常"
                });
              case 3:
                s = this._cache.getStore(e), r = this._cache.getStore(t), i = !0;
                _context9.t0 = this._shouldRefreshAccessTokenHook;
                if (!_context9.t0) {
                  _context9.next = 9;
                  break;
                }
                _context9.next = 8;
                return this._shouldRefreshAccessTokenHook(s, r);
              case 8:
                _context9.t0 = !_context9.sent;
              case 9:
                _context9.t1 = _context9.t0;
                if (!_context9.t1) {
                  _context9.next = 12;
                  break;
                }
                i = !1;
              case 12:
                return _context9.abrupt("return", (!s || !r || r < Date.now()) && i ? this.refreshAccessToken() : {
                  accessToken: s,
                  accessTokenExpire: r
                });
              case 13:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));
      function getAccessToken() {
        return _getAccessToken.apply(this, arguments);
      }
      return getAccessToken;
    }()
  }, {
    key: "request",
    value: function () {
      var _request = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10(e, t, n) {
        var s, r, i, _e14, o, _e15, _e16, a, c, u, h, l, d, p, f, g;
        return _regenerator.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                s = "x-tcb-trace_".concat(this.config.env);
                r = "application/x-www-form-urlencoded";
                i = _objectSpread({
                  action: e,
                  env: this.config.env,
                  dataVersion: "2019-08-16"
                }, t);
                if (!(-1 === We.indexOf(e))) {
                  _context10.next = 10;
                  break;
                }
                _e14 = this._cache.keys.refreshTokenKey;
                _context10.t0 = this._cache.getStore(_e14);
                if (!_context10.t0) {
                  _context10.next = 10;
                  break;
                }
                _context10.next = 9;
                return this.getAccessToken();
              case 9:
                i.access_token = _context10.sent.accessToken;
              case 10:
                if ("storage.uploadFile" === e) {
                  o = new FormData();
                  for (_e15 in o) {
                    o.hasOwnProperty(_e15) && void 0 !== o[_e15] && o.append(_e15, i[_e15]);
                  }
                  r = "multipart/form-data";
                } else {
                  r = "application/json", o = {};
                  for (_e16 in i) {
                    void 0 !== i[_e16] && (o[_e16] = i[_e16]);
                  }
                }
                a = {
                  headers: {
                    "content-type": r
                  }
                };
                n && n.onUploadProgress && (a.onUploadProgress = n.onUploadProgress);
                c = this._localCache.getStore(s);
                c && (a.headers["X-TCB-Trace"] = c);
                u = t.parse, h = t.inQuery, l = t.search;
                d = {
                  env: this.config.env
                };
                u && (d.parse = !0), h && (d = _objectSpread(_objectSpread({}, h), d));
                p = function (e, t) {
                  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
                  var s = /\?/.test(t);
                  var r = "";
                  for (var _e17 in n) {
                    "" === r ? !s && (t += "?") : r += "&", r += "".concat(_e17, "=").concat(encodeURIComponent(n[_e17]));
                  }
                  return /^http(s)?\:\/\//.test(t += r) ? t : "".concat(e).concat(t);
                }(me, "//tcb-api.tencentcloudapi.com/web", d);
                l && (p += l);
                _context10.next = 22;
                return this.post(_objectSpread({
                  url: p,
                  data: o
                }, a));
              case 22:
                f = _context10.sent;
                g = f.header && f.header["x-tcb-trace"];
                if (!(g && this._localCache.setStore(s, g), 200 !== Number(f.status) && 200 !== Number(f.statusCode) || !f.data)) {
                  _context10.next = 26;
                  break;
                }
                throw new ne({
                  code: "NETWORK_ERROR",
                  message: "network request error"
                });
              case 26:
                return _context10.abrupt("return", f);
              case 27:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));
      function request(_x5, _x6, _x7) {
        return _request.apply(this, arguments);
      }
      return request;
    }()
  }, {
    key: "send",
    value: function () {
      var _send = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11(e) {
        var t,
          n,
          _n6,
          _args11 = arguments;
        return _regenerator.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                t = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : {};
                _context11.next = 3;
                return this.request(e, t, {
                  onUploadProgress: t.onUploadProgress
                });
              case 3:
                n = _context11.sent;
                if (!("ACCESS_TOKEN_EXPIRED" === n.data.code && -1 === We.indexOf(e))) {
                  _context11.next = 13;
                  break;
                }
                _context11.next = 7;
                return this.refreshAccessToken();
              case 7:
                _context11.next = 9;
                return this.request(e, t, {
                  onUploadProgress: t.onUploadProgress
                });
              case 9:
                _n6 = _context11.sent;
                if (!_n6.data.code) {
                  _context11.next = 12;
                  break;
                }
                throw new ne({
                  code: _n6.data.code,
                  message: _n6.data.message
                });
              case 12:
                return _context11.abrupt("return", _n6.data);
              case 13:
                if (!n.data.code) {
                  _context11.next = 15;
                  break;
                }
                throw new ne({
                  code: n.data.code,
                  message: n.data.message
                });
              case 15:
                return _context11.abrupt("return", n.data);
              case 16:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));
      function send(_x8) {
        return _send.apply(this, arguments);
      }
      return send;
    }()
  }, {
    key: "setRefreshToken",
    value: function setRefreshToken(e) {
      var _this$_cache$keys3 = this._cache.keys,
        t = _this$_cache$keys3.accessTokenKey,
        n = _this$_cache$keys3.accessTokenExpireKey,
        s = _this$_cache$keys3.refreshTokenKey;
      this._cache.removeStore(t), this._cache.removeStore(n), this._cache.setStore(s, e);
    }
  }]);
  return Ge;
}();
var Ve = {};
function Ye(e) {
  return Ve[e];
}
var Qe = /*#__PURE__*/function () {
  function Qe(e) {
    (0, _classCallCheck2.default)(this, Qe);
    this.config = e, this._cache = xe(e.env), this._request = Ye(e.env);
  }
  (0, _createClass2.default)(Qe, [{
    key: "setRefreshToken",
    value: function setRefreshToken(e) {
      var _this$_cache$keys4 = this._cache.keys,
        t = _this$_cache$keys4.accessTokenKey,
        n = _this$_cache$keys4.accessTokenExpireKey,
        s = _this$_cache$keys4.refreshTokenKey;
      this._cache.removeStore(t), this._cache.removeStore(n), this._cache.setStore(s, e);
    }
  }, {
    key: "setAccessToken",
    value: function setAccessToken(e, t) {
      var _this$_cache$keys5 = this._cache.keys,
        n = _this$_cache$keys5.accessTokenKey,
        s = _this$_cache$keys5.accessTokenExpireKey;
      this._cache.setStore(n, e), this._cache.setStore(s, t);
    }
  }, {
    key: "refreshUserInfo",
    value: function () {
      var _refreshUserInfo = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee12() {
        var _yield$this$_request$, e;
        return _regenerator.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return this._request.send("auth.getUserInfo", {});
              case 2:
                _yield$this$_request$ = _context12.sent;
                e = _yield$this$_request$.data;
                return _context12.abrupt("return", (this.setLocalUserInfo(e), e));
              case 5:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));
      function refreshUserInfo() {
        return _refreshUserInfo.apply(this, arguments);
      }
      return refreshUserInfo;
    }()
  }, {
    key: "setLocalUserInfo",
    value: function setLocalUserInfo(e) {
      var t = this._cache.keys.userInfoKey;
      this._cache.setStore(t, e);
    }
  }]);
  return Qe;
}();
var Xe = /*#__PURE__*/function () {
  function Xe(e) {
    (0, _classCallCheck2.default)(this, Xe);
    if (!e) throw new ne({
      code: "PARAM_ERROR",
      message: "envId is not defined"
    });
    this._envId = e, this._cache = xe(this._envId), this._request = Ye(this._envId), this.setUserInfo();
  }
  (0, _createClass2.default)(Xe, [{
    key: "linkWithTicket",
    value: function linkWithTicket(e) {
      if ("string" != typeof e) throw new ne({
        code: "PARAM_ERROR",
        message: "ticket must be string"
      });
      return this._request.send("auth.linkWithTicket", {
        ticket: e
      });
    }
  }, {
    key: "linkWithRedirect",
    value: function linkWithRedirect(e) {
      e.signInWithRedirect();
    }
  }, {
    key: "updatePassword",
    value: function updatePassword(e, t) {
      return this._request.send("auth.updatePassword", {
        oldPassword: t,
        newPassword: e
      });
    }
  }, {
    key: "updateEmail",
    value: function updateEmail(e) {
      return this._request.send("auth.updateEmail", {
        newEmail: e
      });
    }
  }, {
    key: "updateUsername",
    value: function updateUsername(e) {
      if ("string" != typeof e) throw new ne({
        code: "PARAM_ERROR",
        message: "username must be a string"
      });
      return this._request.send("auth.updateUsername", {
        username: e
      });
    }
  }, {
    key: "getLinkedUidList",
    value: function () {
      var _getLinkedUidList = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee13() {
        var _yield$this$_request$2, e, t, n;
        return _regenerator.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return this._request.send("auth.getLinkedUidList", {});
              case 2:
                _yield$this$_request$2 = _context13.sent;
                e = _yield$this$_request$2.data;
                t = !1;
                n = e.users;
                return _context13.abrupt("return", (n.forEach(function (e) {
                  e.wxOpenId && e.wxPublicId && (t = !0);
                }), {
                  users: n,
                  hasPrimaryUid: t
                }));
              case 7:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));
      function getLinkedUidList() {
        return _getLinkedUidList.apply(this, arguments);
      }
      return getLinkedUidList;
    }()
  }, {
    key: "setPrimaryUid",
    value: function setPrimaryUid(e) {
      return this._request.send("auth.setPrimaryUid", {
        uid: e
      });
    }
  }, {
    key: "unlink",
    value: function unlink(e) {
      return this._request.send("auth.unlink", {
        platform: e
      });
    }
  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee14(e) {
        var t, n, s, r, i, o, _yield$this$_request$3, a;
        return _regenerator.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                t = e.nickName;
                n = e.gender;
                s = e.avatarUrl;
                r = e.province;
                i = e.country;
                o = e.city;
                _context14.next = 8;
                return this._request.send("auth.updateUserInfo", {
                  nickName: t,
                  gender: n,
                  avatarUrl: s,
                  province: r,
                  country: i,
                  city: o
                });
              case 8:
                _yield$this$_request$3 = _context14.sent;
                a = _yield$this$_request$3.data;
                this.setLocalUserInfo(a);
              case 11:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));
      function update(_x9) {
        return _update.apply(this, arguments);
      }
      return update;
    }()
  }, {
    key: "refresh",
    value: function () {
      var _refresh = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee15() {
        var _yield$this$_request$4, e;
        return _regenerator.default.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.next = 2;
                return this._request.send("auth.getUserInfo", {});
              case 2:
                _yield$this$_request$4 = _context15.sent;
                e = _yield$this$_request$4.data;
                return _context15.abrupt("return", (this.setLocalUserInfo(e), e));
              case 5:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));
      function refresh() {
        return _refresh.apply(this, arguments);
      }
      return refresh;
    }()
  }, {
    key: "setUserInfo",
    value: function setUserInfo() {
      var _this8 = this;
      var e = this._cache.keys.userInfoKey,
        t = this._cache.getStore(e);
      ["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach(function (e) {
        _this8[e] = t[e];
      }), this.location = {
        country: t.country,
        province: t.province,
        city: t.city
      };
    }
  }, {
    key: "setLocalUserInfo",
    value: function setLocalUserInfo(e) {
      var t = this._cache.keys.userInfoKey;
      this._cache.setStore(t, e), this.setUserInfo();
    }
  }]);
  return Xe;
}();
var Ze = /*#__PURE__*/function () {
  function Ze(e) {
    (0, _classCallCheck2.default)(this, Ze);
    if (!e) throw new ne({
      code: "PARAM_ERROR",
      message: "envId is not defined"
    });
    this._cache = xe(e);
    var _this$_cache$keys6 = this._cache.keys,
      t = _this$_cache$keys6.refreshTokenKey,
      n = _this$_cache$keys6.accessTokenKey,
      s = _this$_cache$keys6.accessTokenExpireKey,
      r = this._cache.getStore(t),
      i = this._cache.getStore(n),
      o = this._cache.getStore(s);
    this.credential = {
      refreshToken: r,
      accessToken: i,
      accessTokenExpire: o
    }, this.user = new Xe(e);
  }
  (0, _createClass2.default)(Ze, [{
    key: "isAnonymousAuth",
    get: function get() {
      return this.loginType === $e.ANONYMOUS;
    }
  }, {
    key: "isCustomAuth",
    get: function get() {
      return this.loginType === $e.CUSTOM;
    }
  }, {
    key: "isWeixinAuth",
    get: function get() {
      return this.loginType === $e.WECHAT || this.loginType === $e.WECHAT_OPEN || this.loginType === $e.WECHAT_PUBLIC;
    }
  }, {
    key: "loginType",
    get: function get() {
      return this._cache.getStore(this._cache.keys.loginTypeKey);
    }
  }]);
  return Ze;
}();
var et = /*#__PURE__*/function (_Qe) {
  (0, _inherits2.default)(et, _Qe);
  var _super4 = _createSuper(et);
  function et() {
    (0, _classCallCheck2.default)(this, et);
    return _super4.apply(this, arguments);
  }
  (0, _createClass2.default)(et, [{
    key: "signIn",
    value: function () {
      var _signIn = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee16() {
        var _this$_cache$keys7, e, t, n, s, r, _e18;
        return _regenerator.default.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                this._cache.updatePersistence("local");
                _this$_cache$keys7 = this._cache.keys;
                e = _this$_cache$keys7.anonymousUuidKey;
                t = _this$_cache$keys7.refreshTokenKey;
                n = this._cache.getStore(e) || void 0;
                s = this._cache.getStore(t) || void 0;
                _context16.next = 8;
                return this._request.send("auth.signInAnonymously", {
                  anonymous_uuid: n,
                  refresh_token: s
                });
              case 8:
                r = _context16.sent;
                if (!(r.uuid && r.refresh_token)) {
                  _context16.next = 20;
                  break;
                }
                this._setAnonymousUUID(r.uuid);
                this.setRefreshToken(r.refresh_token);
                _context16.next = 14;
                return this._request.refreshAccessToken();
              case 14:
                De(qe);
                De(Ke, {
                  env: this.config.env,
                  loginType: $e.ANONYMOUS,
                  persistence: "local"
                });
                _e18 = new Ze(this.config.env);
                _context16.next = 19;
                return _e18.user.refresh();
              case 19:
                return _context16.abrupt("return", _e18);
              case 20:
                throw new ne({
                  message: "匿名登录失败"
                });
              case 21:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));
      function signIn() {
        return _signIn.apply(this, arguments);
      }
      return signIn;
    }()
  }, {
    key: "linkAndRetrieveDataWithTicket",
    value: function () {
      var _linkAndRetrieveDataWithTicket = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee17(e) {
        var _this$_cache$keys8, t, n, s, r, i;
        return _regenerator.default.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _this$_cache$keys8 = this._cache.keys;
                t = _this$_cache$keys8.anonymousUuidKey;
                n = _this$_cache$keys8.refreshTokenKey;
                s = this._cache.getStore(t);
                r = this._cache.getStore(n);
                _context17.next = 7;
                return this._request.send("auth.linkAndRetrieveDataWithTicket", {
                  anonymous_uuid: s,
                  refresh_token: r,
                  ticket: e
                });
              case 7:
                i = _context17.sent;
                if (!i.refresh_token) {
                  _context17.next = 16;
                  break;
                }
                this._clearAnonymousUUID();
                this.setRefreshToken(i.refresh_token);
                _context17.next = 13;
                return this._request.refreshAccessToken();
              case 13:
                De(je, {
                  env: this.config.env
                });
                De(Ke, {
                  loginType: $e.CUSTOM,
                  persistence: "local"
                });
                return _context17.abrupt("return", {
                  credential: {
                    refreshToken: i.refresh_token
                  }
                });
              case 16:
                throw new ne({
                  message: "匿名转化失败"
                });
              case 17:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));
      function linkAndRetrieveDataWithTicket(_x10) {
        return _linkAndRetrieveDataWithTicket.apply(this, arguments);
      }
      return linkAndRetrieveDataWithTicket;
    }()
  }, {
    key: "_setAnonymousUUID",
    value: function _setAnonymousUUID(e) {
      var _this$_cache$keys9 = this._cache.keys,
        t = _this$_cache$keys9.anonymousUuidKey,
        n = _this$_cache$keys9.loginTypeKey;
      this._cache.removeStore(t), this._cache.setStore(t, e), this._cache.setStore(n, $e.ANONYMOUS);
    }
  }, {
    key: "_clearAnonymousUUID",
    value: function _clearAnonymousUUID() {
      this._cache.removeStore(this._cache.keys.anonymousUuidKey);
    }
  }]);
  return et;
}(Qe);
var tt = /*#__PURE__*/function (_Qe2) {
  (0, _inherits2.default)(tt, _Qe2);
  var _super5 = _createSuper(tt);
  function tt() {
    (0, _classCallCheck2.default)(this, tt);
    return _super5.apply(this, arguments);
  }
  (0, _createClass2.default)(tt, [{
    key: "signIn",
    value: function () {
      var _signIn2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee18(e) {
        var t, n;
        return _regenerator.default.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                if (!("string" != typeof e)) {
                  _context18.next = 2;
                  break;
                }
                throw new ne({
                  code: "PARAM_ERROR",
                  message: "ticket must be a string"
                });
              case 2:
                t = this._cache.keys.refreshTokenKey;
                _context18.next = 5;
                return this._request.send("auth.signInWithTicket", {
                  ticket: e,
                  refresh_token: this._cache.getStore(t) || ""
                });
              case 5:
                n = _context18.sent;
                if (!n.refresh_token) {
                  _context18.next = 15;
                  break;
                }
                this.setRefreshToken(n.refresh_token);
                _context18.next = 10;
                return this._request.refreshAccessToken();
              case 10:
                De(qe);
                De(Ke, {
                  env: this.config.env,
                  loginType: $e.CUSTOM,
                  persistence: this.config.persistence
                });
                _context18.next = 14;
                return this.refreshUserInfo();
              case 14:
                return _context18.abrupt("return", new Ze(this.config.env));
              case 15:
                throw new ne({
                  message: "自定义登录失败"
                });
              case 16:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));
      function signIn(_x11) {
        return _signIn2.apply(this, arguments);
      }
      return signIn;
    }()
  }]);
  return tt;
}(Qe);
var nt = /*#__PURE__*/function (_Qe3) {
  (0, _inherits2.default)(nt, _Qe3);
  var _super6 = _createSuper(nt);
  function nt() {
    (0, _classCallCheck2.default)(this, nt);
    return _super6.apply(this, arguments);
  }
  (0, _createClass2.default)(nt, [{
    key: "signIn",
    value: function () {
      var _signIn3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee19(e, t) {
        var n, s, r, i, o;
        return _regenerator.default.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                if (!("string" != typeof e)) {
                  _context19.next = 2;
                  break;
                }
                throw new ne({
                  code: "PARAM_ERROR",
                  message: "email must be a string"
                });
              case 2:
                n = this._cache.keys.refreshTokenKey;
                _context19.next = 5;
                return this._request.send("auth.signIn", {
                  loginType: "EMAIL",
                  email: e,
                  password: t,
                  refresh_token: this._cache.getStore(n) || ""
                });
              case 5:
                s = _context19.sent;
                r = s.refresh_token;
                i = s.access_token;
                o = s.access_token_expire;
                if (!r) {
                  _context19.next = 22;
                  break;
                }
                this.setRefreshToken(r);
                if (!(i && o)) {
                  _context19.next = 15;
                  break;
                }
                this.setAccessToken(i, o);
                _context19.next = 17;
                break;
              case 15:
                _context19.next = 17;
                return this._request.refreshAccessToken();
              case 17:
                _context19.next = 19;
                return this.refreshUserInfo();
              case 19:
                De(qe);
                De(Ke, {
                  env: this.config.env,
                  loginType: $e.EMAIL,
                  persistence: this.config.persistence
                });
                return _context19.abrupt("return", new Ze(this.config.env));
              case 22:
                throw s.code ? new ne({
                  code: s.code,
                  message: "\u90AE\u7BB1\u767B\u5F55\u5931\u8D25: ".concat(s.message)
                }) : new ne({
                  message: "邮箱登录失败"
                });
              case 23:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));
      function signIn(_x12, _x13) {
        return _signIn3.apply(this, arguments);
      }
      return signIn;
    }()
  }, {
    key: "activate",
    value: function () {
      var _activate = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee20(e) {
        return _regenerator.default.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                return _context20.abrupt("return", this._request.send("auth.activateEndUserMail", {
                  token: e
                }));
              case 1:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this);
      }));
      function activate(_x14) {
        return _activate.apply(this, arguments);
      }
      return activate;
    }()
  }, {
    key: "resetPasswordWithToken",
    value: function () {
      var _resetPasswordWithToken = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee21(e, t) {
        return _regenerator.default.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                return _context21.abrupt("return", this._request.send("auth.resetPasswordWithToken", {
                  token: e,
                  newPassword: t
                }));
              case 1:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, this);
      }));
      function resetPasswordWithToken(_x15, _x16) {
        return _resetPasswordWithToken.apply(this, arguments);
      }
      return resetPasswordWithToken;
    }()
  }]);
  return nt;
}(Qe);
var st = /*#__PURE__*/function (_Qe4) {
  (0, _inherits2.default)(st, _Qe4);
  var _super7 = _createSuper(st);
  function st() {
    (0, _classCallCheck2.default)(this, st);
    return _super7.apply(this, arguments);
  }
  (0, _createClass2.default)(st, [{
    key: "signIn",
    value: function () {
      var _signIn4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee22(e, t) {
        var n, s, r, i, o;
        return _regenerator.default.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                if (!("string" != typeof e)) {
                  _context22.next = 2;
                  break;
                }
                throw new ne({
                  code: "PARAM_ERROR",
                  message: "username must be a string"
                });
              case 2:
                "string" != typeof t && (t = "", console.warn("password is empty"));
                n = this._cache.keys.refreshTokenKey;
                _context22.next = 6;
                return this._request.send("auth.signIn", {
                  loginType: $e.USERNAME,
                  username: e,
                  password: t,
                  refresh_token: this._cache.getStore(n) || ""
                });
              case 6:
                s = _context22.sent;
                r = s.refresh_token;
                i = s.access_token_expire;
                o = s.access_token;
                if (!r) {
                  _context22.next = 23;
                  break;
                }
                this.setRefreshToken(r);
                if (!(o && i)) {
                  _context22.next = 16;
                  break;
                }
                this.setAccessToken(o, i);
                _context22.next = 18;
                break;
              case 16:
                _context22.next = 18;
                return this._request.refreshAccessToken();
              case 18:
                _context22.next = 20;
                return this.refreshUserInfo();
              case 20:
                De(qe);
                De(Ke, {
                  env: this.config.env,
                  loginType: $e.USERNAME,
                  persistence: this.config.persistence
                });
                return _context22.abrupt("return", new Ze(this.config.env));
              case 23:
                throw s.code ? new ne({
                  code: s.code,
                  message: "\u7528\u6237\u540D\u5BC6\u7801\u767B\u5F55\u5931\u8D25: ".concat(s.message)
                }) : new ne({
                  message: "用户名密码登录失败"
                });
              case 24:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, this);
      }));
      function signIn(_x17, _x18) {
        return _signIn4.apply(this, arguments);
      }
      return signIn;
    }()
  }]);
  return st;
}(Qe);
var rt = /*#__PURE__*/function () {
  function rt(e) {
    (0, _classCallCheck2.default)(this, rt);
    this.config = e, this._cache = xe(e.env), this._request = Ye(e.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), Ne(Ke, this._onLoginTypeChanged);
  }
  (0, _createClass2.default)(rt, [{
    key: "currentUser",
    get: function get() {
      var e = this.hasLoginState();
      return e && e.user || null;
    }
  }, {
    key: "loginType",
    get: function get() {
      return this._cache.getStore(this._cache.keys.loginTypeKey);
    }
  }, {
    key: "anonymousAuthProvider",
    value: function anonymousAuthProvider() {
      return new et(this.config);
    }
  }, {
    key: "customAuthProvider",
    value: function customAuthProvider() {
      return new tt(this.config);
    }
  }, {
    key: "emailAuthProvider",
    value: function emailAuthProvider() {
      return new nt(this.config);
    }
  }, {
    key: "usernameAuthProvider",
    value: function usernameAuthProvider() {
      return new st(this.config);
    }
  }, {
    key: "signInAnonymously",
    value: function () {
      var _signInAnonymously = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee23() {
        return _regenerator.default.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                return _context23.abrupt("return", new et(this.config).signIn());
              case 1:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, this);
      }));
      function signInAnonymously() {
        return _signInAnonymously.apply(this, arguments);
      }
      return signInAnonymously;
    }()
  }, {
    key: "signInWithEmailAndPassword",
    value: function () {
      var _signInWithEmailAndPassword = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee24(e, t) {
        return _regenerator.default.wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                return _context24.abrupt("return", new nt(this.config).signIn(e, t));
              case 1:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24, this);
      }));
      function signInWithEmailAndPassword(_x19, _x20) {
        return _signInWithEmailAndPassword.apply(this, arguments);
      }
      return signInWithEmailAndPassword;
    }()
  }, {
    key: "signInWithUsernameAndPassword",
    value: function signInWithUsernameAndPassword(e, t) {
      return new st(this.config).signIn(e, t);
    }
  }, {
    key: "linkAndRetrieveDataWithTicket",
    value: function () {
      var _linkAndRetrieveDataWithTicket2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee25(e) {
        return _regenerator.default.wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                this._anonymousAuthProvider || (this._anonymousAuthProvider = new et(this.config)), Ne(je, this._onAnonymousConverted);
                _context25.next = 3;
                return this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e);
              case 3:
                return _context25.abrupt("return", _context25.sent);
              case 4:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25, this);
      }));
      function linkAndRetrieveDataWithTicket(_x21) {
        return _linkAndRetrieveDataWithTicket2.apply(this, arguments);
      }
      return linkAndRetrieveDataWithTicket;
    }()
  }, {
    key: "signOut",
    value: function () {
      var _signOut = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee26() {
        var _this$_cache$keys10, e, t, n, s, r;
        return _regenerator.default.wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                if (!(this.loginType === $e.ANONYMOUS)) {
                  _context26.next = 2;
                  break;
                }
                throw new ne({
                  message: "匿名用户不支持登出操作"
                });
              case 2:
                _this$_cache$keys10 = this._cache.keys, e = _this$_cache$keys10.refreshTokenKey, t = _this$_cache$keys10.accessTokenKey, n = _this$_cache$keys10.accessTokenExpireKey, s = this._cache.getStore(e);
                if (s) {
                  _context26.next = 5;
                  break;
                }
                return _context26.abrupt("return");
              case 5:
                _context26.next = 7;
                return this._request.send("auth.logout", {
                  refresh_token: s
                });
              case 7:
                r = _context26.sent;
                return _context26.abrupt("return", (this._cache.removeStore(e), this._cache.removeStore(t), this._cache.removeStore(n), De(qe), De(Ke, {
                  env: this.config.env,
                  loginType: $e.NULL,
                  persistence: this.config.persistence
                }), r));
              case 9:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26, this);
      }));
      function signOut() {
        return _signOut.apply(this, arguments);
      }
      return signOut;
    }()
  }, {
    key: "signUpWithEmailAndPassword",
    value: function () {
      var _signUpWithEmailAndPassword = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee27(e, t) {
        return _regenerator.default.wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                return _context27.abrupt("return", this._request.send("auth.signUpWithEmailAndPassword", {
                  email: e,
                  password: t
                }));
              case 1:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee27, this);
      }));
      function signUpWithEmailAndPassword(_x22, _x23) {
        return _signUpWithEmailAndPassword.apply(this, arguments);
      }
      return signUpWithEmailAndPassword;
    }()
  }, {
    key: "sendPasswordResetEmail",
    value: function () {
      var _sendPasswordResetEmail = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee28(e) {
        return _regenerator.default.wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                return _context28.abrupt("return", this._request.send("auth.sendPasswordResetEmail", {
                  email: e
                }));
              case 1:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee28, this);
      }));
      function sendPasswordResetEmail(_x24) {
        return _sendPasswordResetEmail.apply(this, arguments);
      }
      return sendPasswordResetEmail;
    }()
  }, {
    key: "onLoginStateChanged",
    value: function onLoginStateChanged(e) {
      var _this9 = this;
      Ne(qe, function () {
        var t = _this9.hasLoginState();
        e.call(_this9, t);
      });
      var t = this.hasLoginState();
      e.call(this, t);
    }
  }, {
    key: "onLoginStateExpired",
    value: function onLoginStateExpired(e) {
      Ne(Me, e.bind(this));
    }
  }, {
    key: "onAccessTokenRefreshed",
    value: function onAccessTokenRefreshed(e) {
      Ne(Be, e.bind(this));
    }
  }, {
    key: "onAnonymousConverted",
    value: function onAnonymousConverted(e) {
      Ne(je, e.bind(this));
    }
  }, {
    key: "onLoginTypeChanged",
    value: function onLoginTypeChanged(e) {
      var _this10 = this;
      Ne(Ke, function () {
        var t = _this10.hasLoginState();
        e.call(_this10, t);
      });
    }
  }, {
    key: "getAccessToken",
    value: function () {
      var _getAccessToken2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee29() {
        return _regenerator.default.wrap(function _callee29$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                _context29.next = 2;
                return this._request.getAccessToken();
              case 2:
                _context29.t0 = _context29.sent.accessToken;
                _context29.t1 = this.config.env;
                return _context29.abrupt("return", {
                  accessToken: _context29.t0,
                  env: _context29.t1
                });
              case 5:
              case "end":
                return _context29.stop();
            }
          }
        }, _callee29, this);
      }));
      function getAccessToken() {
        return _getAccessToken2.apply(this, arguments);
      }
      return getAccessToken;
    }()
  }, {
    key: "hasLoginState",
    value: function hasLoginState() {
      var e = this._cache.keys.refreshTokenKey;
      return this._cache.getStore(e) ? new Ze(this.config.env) : null;
    }
  }, {
    key: "isUsernameRegistered",
    value: function () {
      var _isUsernameRegistered = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee30(e) {
        var _yield$this$_request$5, t;
        return _regenerator.default.wrap(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                if (!("string" != typeof e)) {
                  _context30.next = 2;
                  break;
                }
                throw new ne({
                  code: "PARAM_ERROR",
                  message: "username must be a string"
                });
              case 2:
                _context30.next = 4;
                return this._request.send("auth.isUsernameRegistered", {
                  username: e
                });
              case 4:
                _yield$this$_request$5 = _context30.sent;
                t = _yield$this$_request$5.data;
                return _context30.abrupt("return", t && t.isRegistered);
              case 7:
              case "end":
                return _context30.stop();
            }
          }
        }, _callee30, this);
      }));
      function isUsernameRegistered(_x25) {
        return _isUsernameRegistered.apply(this, arguments);
      }
      return isUsernameRegistered;
    }()
  }, {
    key: "getLoginState",
    value: function getLoginState() {
      return Promise.resolve(this.hasLoginState());
    }
  }, {
    key: "signInWithTicket",
    value: function () {
      var _signInWithTicket = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee31(e) {
        return _regenerator.default.wrap(function _callee31$(_context31) {
          while (1) {
            switch (_context31.prev = _context31.next) {
              case 0:
                return _context31.abrupt("return", new tt(this.config).signIn(e));
              case 1:
              case "end":
                return _context31.stop();
            }
          }
        }, _callee31, this);
      }));
      function signInWithTicket(_x26) {
        return _signInWithTicket.apply(this, arguments);
      }
      return signInWithTicket;
    }()
  }, {
    key: "shouldRefreshAccessToken",
    value: function shouldRefreshAccessToken(e) {
      this._request._shouldRefreshAccessTokenHook = e.bind(this);
    }
  }, {
    key: "getUserInfo",
    value: function getUserInfo() {
      return this._request.send("auth.getUserInfo", {}).then(function (e) {
        return e.code ? e : _objectSpread(_objectSpread({}, e.data), {}, {
          requestId: e.seqId
        });
      });
    }
  }, {
    key: "getAuthHeader",
    value: function getAuthHeader() {
      var _this$_cache$keys11 = this._cache.keys,
        e = _this$_cache$keys11.refreshTokenKey,
        t = _this$_cache$keys11.accessTokenKey,
        n = this._cache.getStore(e);
      return {
        "x-cloudbase-credentials": this._cache.getStore(t) + "/@@/" + n
      };
    }
  }, {
    key: "_onAnonymousConverted",
    value: function _onAnonymousConverted(e) {
      var t = e.data.env;
      t === this.config.env && this._cache.updatePersistence(this.config.persistence);
    }
  }, {
    key: "_onLoginTypeChanged",
    value: function _onLoginTypeChanged(e) {
      var _e$data = e.data,
        t = _e$data.loginType,
        n = _e$data.persistence,
        s = _e$data.env;
      s === this.config.env && (this._cache.updatePersistence(n), this._cache.setStore(this._cache.keys.loginTypeKey, t));
    }
  }]);
  return rt;
}();
var it = function it(e, t) {
    t = t || we();
    var n = Ye(this.config.env),
      s = e.cloudPath,
      r = e.filePath,
      i = e.onUploadProgress,
      _e$fileType = e.fileType,
      o = _e$fileType === void 0 ? "image" : _e$fileType;
    return n.send("storage.getUploadMetadata", {
      path: s
    }).then(function (e) {
      var _e$data2 = e.data,
        a = _e$data2.url,
        c = _e$data2.authorization,
        u = _e$data2.token,
        h = _e$data2.fileId,
        l = _e$data2.cosFileId,
        d = e.requestId,
        p = {
          key: s,
          signature: c,
          "x-cos-meta-fileid": l,
          success_action_status: "201",
          "x-cos-security-token": u
        };
      n.upload({
        url: a,
        data: p,
        file: r,
        name: s,
        fileType: o,
        onUploadProgress: i
      }).then(function (e) {
        201 === e.statusCode ? t(null, {
          fileID: h,
          requestId: d
        }) : t(new ne({
          code: "STORAGE_REQUEST_FAIL",
          message: "STORAGE_REQUEST_FAIL: ".concat(e.data)
        }));
      }).catch(function (e) {
        t(e);
      });
    }).catch(function (e) {
      t(e);
    }), t.promise;
  },
  ot = function ot(e, t) {
    t = t || we();
    var n = Ye(this.config.env),
      s = e.cloudPath;
    return n.send("storage.getUploadMetadata", {
      path: s
    }).then(function (e) {
      t(null, e);
    }).catch(function (e) {
      t(e);
    }), t.promise;
  },
  at = function at(_ref7, t) {
    var e = _ref7.fileList;
    if (t = t || we(), !e || !Array.isArray(e)) return {
      code: "INVALID_PARAM",
      message: "fileList必须是非空的数组"
    };
    var _iterator3 = _createForOfIteratorHelper(e),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var _t8 = _step3.value;
        if (!_t8 || "string" != typeof _t8) return {
          code: "INVALID_PARAM",
          message: "fileList的元素必须是非空的字符串"
        };
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    var n = {
      fileid_list: e
    };
    return Ye(this.config.env).send("storage.batchDeleteFile", n).then(function (e) {
      e.code ? t(null, e) : t(null, {
        fileList: e.data.delete_list,
        requestId: e.requestId
      });
    }).catch(function (e) {
      t(e);
    }), t.promise;
  },
  ct = function ct(_ref8, t) {
    var e = _ref8.fileList;
    t = t || we(), e && Array.isArray(e) || t(null, {
      code: "INVALID_PARAM",
      message: "fileList必须是非空的数组"
    });
    var n = [];
    var _iterator4 = _createForOfIteratorHelper(e),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var _s9 = _step4.value;
        "object" == (0, _typeof2.default)(_s9) ? (_s9.hasOwnProperty("fileID") && _s9.hasOwnProperty("maxAge") || t(null, {
          code: "INVALID_PARAM",
          message: "fileList的元素必须是包含fileID和maxAge的对象"
        }), n.push({
          fileid: _s9.fileID,
          max_age: _s9.maxAge
        })) : "string" == typeof _s9 ? n.push({
          fileid: _s9
        }) : t(null, {
          code: "INVALID_PARAM",
          message: "fileList的元素必须是字符串"
        });
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    var s = {
      file_list: n
    };
    return Ye(this.config.env).send("storage.batchGetDownloadUrl", s).then(function (e) {
      e.code ? t(null, e) : t(null, {
        fileList: e.data.download_list,
        requestId: e.requestId
      });
    }).catch(function (e) {
      t(e);
    }), t.promise;
  },
  ut = /*#__PURE__*/function () {
    var _ref10 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee32(_ref9, t) {
      var e, n, s, r;
      return _regenerator.default.wrap(function _callee32$(_context32) {
        while (1) {
          switch (_context32.prev = _context32.next) {
            case 0:
              e = _ref9.fileID;
              _context32.next = 3;
              return ct.call(this, {
                fileList: [{
                  fileID: e,
                  maxAge: 600
                }]
              });
            case 3:
              n = _context32.sent.fileList[0];
              if (!("SUCCESS" !== n.code)) {
                _context32.next = 6;
                break;
              }
              return _context32.abrupt("return", t ? t(n) : new Promise(function (e) {
                e(n);
              }));
            case 6:
              s = Ye(this.config.env);
              r = n.download_url;
              if (!(r = encodeURI(r), !t)) {
                _context32.next = 10;
                break;
              }
              return _context32.abrupt("return", s.download({
                url: r
              }));
            case 10:
              _context32.t0 = t;
              _context32.next = 13;
              return s.download({
                url: r
              });
            case 13:
              _context32.t1 = _context32.sent;
              (0, _context32.t0)(_context32.t1);
            case 15:
            case "end":
              return _context32.stop();
          }
        }
      }, _callee32, this);
    }));
    return function ut(_x27, _x28) {
      return _ref10.apply(this, arguments);
    };
  }(),
  ht = function ht(_ref11, i) {
    var e = _ref11.name,
      t = _ref11.data,
      n = _ref11.query,
      s = _ref11.parse,
      r = _ref11.search;
    var o = i || we();
    var a;
    try {
      a = t ? JSON.stringify(t) : "";
    } catch (e) {
      return Promise.reject(e);
    }
    if (!e) return Promise.reject(new ne({
      code: "PARAM_ERROR",
      message: "函数名不能为空"
    }));
    var c = {
      inQuery: n,
      parse: s,
      search: r,
      function_name: e,
      request_data: a
    };
    return Ye(this.config.env).send("functions.invokeFunction", c).then(function (e) {
      if (e.code) o(null, e);else {
        var _t9 = e.data.response_data;
        if (s) o(null, {
          result: _t9,
          requestId: e.requestId
        });else try {
          _t9 = JSON.parse(e.data.response_data), o(null, {
            result: _t9,
            requestId: e.requestId
          });
        } catch (e) {
          o(new ne({
            message: "response data must be json"
          }));
        }
      }
      return o.promise;
    }).catch(function (e) {
      o(e);
    }), o.promise;
  },
  lt = {
    timeout: 15e3,
    persistence: "session"
  },
  dt = {};
var pt = /*#__PURE__*/function () {
  function pt(e) {
    (0, _classCallCheck2.default)(this, pt);
    this.config = e || this.config, this.authObj = void 0;
  }
  (0, _createClass2.default)(pt, [{
    key: "init",
    value: function init(e) {
      switch (ke.adapter || (this.requestClient = new ke.adapter.reqClass({
        timeout: e.timeout || 5e3,
        timeoutMsg: "\u8BF7\u6C42\u5728".concat((e.timeout || 5e3) / 1e3, "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD")
      })), this.config = _objectSpread(_objectSpread({}, lt), e), !0) {
        case this.config.timeout > 6e5:
          console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"), this.config.timeout = 6e5;
          break;
        case this.config.timeout < 100:
          console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"), this.config.timeout = 100;
      }
      return new pt(this.config);
    }
  }, {
    key: "auth",
    value: function auth() {
      var _ref12 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        e = _ref12.persistence;
      if (this.authObj) return this.authObj;
      var t = e || ke.adapter.primaryStorage || lt.persistence;
      var n;
      return t !== this.config.persistence && (this.config.persistence = t), function (e) {
        var t = e.env;
        Ee[t] = new Ae(e), Oe[t] = new Ae(_objectSpread(_objectSpread({}, e), {}, {
          persistence: "local"
        }));
      }(this.config), n = this.config, Ve[n.env] = new Ge(n), this.authObj = new rt(this.config), this.authObj;
    }
  }, {
    key: "on",
    value: function on(e, t) {
      return Ne.apply(this, [e, t]);
    }
  }, {
    key: "off",
    value: function off(e, t) {
      return Fe.apply(this, [e, t]);
    }
  }, {
    key: "callFunction",
    value: function callFunction(e, t) {
      return ht.apply(this, [e, t]);
    }
  }, {
    key: "deleteFile",
    value: function deleteFile(e, t) {
      return at.apply(this, [e, t]);
    }
  }, {
    key: "getTempFileURL",
    value: function getTempFileURL(e, t) {
      return ct.apply(this, [e, t]);
    }
  }, {
    key: "downloadFile",
    value: function downloadFile(e, t) {
      return ut.apply(this, [e, t]);
    }
  }, {
    key: "uploadFile",
    value: function uploadFile(e, t) {
      return it.apply(this, [e, t]);
    }
  }, {
    key: "getUploadMetadata",
    value: function getUploadMetadata(e, t) {
      return ot.apply(this, [e, t]);
    }
  }, {
    key: "registerExtension",
    value: function registerExtension(e) {
      dt[e.name] = e;
    }
  }, {
    key: "invokeExtension",
    value: function () {
      var _invokeExtension = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee33(e, t) {
        var n;
        return _regenerator.default.wrap(function _callee33$(_context33) {
          while (1) {
            switch (_context33.prev = _context33.next) {
              case 0:
                n = dt[e];
                if (n) {
                  _context33.next = 3;
                  break;
                }
                throw new ne({
                  message: "\u6269\u5C55".concat(e, " \u5FC5\u987B\u5148\u6CE8\u518C")
                });
              case 3:
                _context33.next = 5;
                return n.invoke(t, this);
              case 5:
                return _context33.abrupt("return", _context33.sent);
              case 6:
              case "end":
                return _context33.stop();
            }
          }
        }, _callee33, this);
      }));
      function invokeExtension(_x29, _x30) {
        return _invokeExtension.apply(this, arguments);
      }
      return invokeExtension;
    }()
  }, {
    key: "useAdapters",
    value: function useAdapters(e) {
      var _ref13 = be(e) || {},
        t = _ref13.adapter,
        n = _ref13.runtime;
      t && (ke.adapter = t), n && (ke.runtime = n);
    }
  }]);
  return pt;
}();
var ft = new pt();
function gt(e, t, n) {
  void 0 === n && (n = {});
  var s = /\?/.test(t),
    r = "";
  for (var i in n) {
    "" === r ? !s && (t += "?") : r += "&", r += i + "=" + encodeURIComponent(n[i]);
  }
  return /^http(s)?:\/\//.test(t += r) ? t : "" + e + t;
}
var mt = /*#__PURE__*/function () {
  function mt() {
    (0, _classCallCheck2.default)(this, mt);
  }
  (0, _createClass2.default)(mt, [{
    key: "post",
    value: function post(e) {
      var t = e.url,
        n = e.data,
        s = e.headers;
      return new Promise(function (e, r) {
        se.request({
          url: gt("https:", t),
          data: n,
          method: "POST",
          header: s,
          success: function success(t) {
            e(t);
          },
          fail: function fail(e) {
            r(e);
          }
        });
      });
    }
  }, {
    key: "upload",
    value: function upload(e) {
      return new Promise(function (t, n) {
        var s = e.url,
          r = e.file,
          i = e.data,
          o = e.headers,
          a = e.fileType,
          c = se.uploadFile({
            url: gt("https:", s),
            name: "file",
            formData: Object.assign({}, i),
            filePath: r,
            fileType: a,
            header: o,
            success: function success(e) {
              var n = {
                statusCode: e.statusCode,
                data: e.data || {}
              };
              200 === e.statusCode && i.success_action_status && (n.statusCode = parseInt(i.success_action_status, 10)), t(n);
            },
            fail: function fail(e) {
              n(new Error(e.errMsg || "uploadFile:fail"));
            }
          });
        "function" == typeof e.onUploadProgress && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (t) {
          e.onUploadProgress({
            loaded: t.totalBytesSent,
            total: t.totalBytesExpectedToSend
          });
        });
      });
    }
  }]);
  return mt;
}();
var yt = {
  setItem: function setItem(e, t) {
    se.setStorageSync(e, t);
  },
  getItem: function getItem(e) {
    return se.getStorageSync(e);
  },
  removeItem: function removeItem(e) {
    se.removeStorageSync(e);
  },
  clear: function clear() {
    se.clearStorageSync();
  }
};
var _t = {
  genAdapter: function genAdapter() {
    return {
      root: {},
      reqClass: mt,
      localStorage: yt,
      primaryStorage: "local"
    };
  },
  isMatch: function isMatch() {
    return !0;
  },
  runtime: "uni_app"
};
ft.useAdapters(_t);
var wt = ft,
  vt = wt.init;
wt.init = function (e) {
  e.env = e.spaceId;
  var t = vt.call(this, e);
  t.config.provider = "tencent", t.config.spaceId = e.spaceId;
  var n = t.auth;
  return t.auth = function (e) {
    var t = n.call(this, e);
    return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach(function (e) {
      var n;
      t[e] = (n = t[e], function (e) {
        e = e || {};
        var _te = te(e),
          t = _te.success,
          s = _te.fail,
          r = _te.complete;
        if (!(t || s || r)) return n.call(this, e);
        n.call(this, e).then(function (e) {
          t && t(e), r && r(e);
        }, function (e) {
          s && s(e), r && r(e);
        });
      }).bind(t);
    }), t;
  }, t.customAuth = t.auth, t;
};
var It = wt;
var St = /*#__PURE__*/function (_fe) {
  (0, _inherits2.default)(St, _fe);
  var _super8 = _createSuper(St);
  function St() {
    (0, _classCallCheck2.default)(this, St);
    return _super8.apply(this, arguments);
  }
  (0, _createClass2.default)(St, [{
    key: "getAccessToken",
    value: function getAccessToken() {
      var _this11 = this;
      return new Promise(function (e, t) {
        var n = "Anonymous_Access_token";
        _this11.setAccessToken(n), e(n);
      });
    }
  }, {
    key: "setupRequest",
    value: function setupRequest(e, t) {
      var n = Object.assign({}, e, {
          spaceId: this.config.spaceId,
          timestamp: Date.now()
        }),
        s = {
          "Content-Type": "application/json"
        };
      "auth" !== t && (n.token = this.accessToken, s["x-basement-token"] = this.accessToken), s["x-serverless-sign"] = le.sign(n, this.config.clientSecret);
      var r = he();
      s["x-client-info"] = encodeURIComponent(JSON.stringify(r));
      var _re = re(),
        i = _re.token;
      return s["x-client-token"] = i, {
        url: this.config.requestUrl,
        method: "POST",
        data: n,
        dataType: "json",
        header: JSON.parse(JSON.stringify(s))
      };
    }
  }, {
    key: "uploadFileToOSS",
    value: function uploadFileToOSS(_ref14) {
      var _this12 = this;
      var e = _ref14.url,
        t = _ref14.formData,
        n = _ref14.name,
        s = _ref14.filePath,
        r = _ref14.fileType,
        i = _ref14.onUploadProgress;
      return new Promise(function (o, a) {
        var c = _this12.adapter.uploadFile({
          url: e,
          formData: t,
          name: n,
          filePath: s,
          fileType: r,
          success: function success(e) {
            e && e.statusCode < 400 ? o(e) : a(new ne({
              code: "UPLOAD_FAILED",
              message: "文件上传失败"
            }));
          },
          fail: function fail(e) {
            a(new ne({
              code: e.code || "UPLOAD_FAILED",
              message: e.message || e.errMsg || "文件上传失败"
            }));
          }
        });
        "function" == typeof i && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (e) {
          i({
            loaded: e.totalBytesSent,
            total: e.totalBytesExpectedToSend
          });
        });
      });
    }
  }, {
    key: "uploadFile",
    value: function uploadFile(_ref15) {
      var _this13 = this;
      var e = _ref15.filePath,
        t = _ref15.cloudPath,
        _ref15$fileType = _ref15.fileType,
        n = _ref15$fileType === void 0 ? "image" : _ref15$fileType,
        s = _ref15.onUploadProgress;
      if (!t) throw new ne({
        code: "CLOUDPATH_REQUIRED",
        message: "cloudPath不可为空"
      });
      var r;
      return this.getOSSUploadOptionsFromPath({
        cloudPath: t
      }).then(function (t) {
        var _t$result = t.result,
          i = _t$result.url,
          o = _t$result.formData,
          a = _t$result.name;
        r = t.result.fileUrl;
        var c = {
          url: i,
          formData: o,
          name: a,
          filePath: e,
          fileType: n
        };
        return _this13.uploadFileToOSS(Object.assign({}, c, {
          onUploadProgress: s
        }));
      }).then(function () {
        return _this13.reportOSSUpload({
          cloudPath: t
        });
      }).then(function (t) {
        return new Promise(function (n, s) {
          t.success ? n({
            success: !0,
            filePath: e,
            fileID: r
          }) : s(new ne({
            code: "UPLOAD_FAILED",
            message: "文件上传失败"
          }));
        });
      });
    }
  }, {
    key: "deleteFile",
    value: function deleteFile(_ref16) {
      var e = _ref16.fileList;
      var t = {
        method: "serverless.file.resource.delete",
        params: JSON.stringify({
          fileList: e
        })
      };
      return this.request(this.setupRequest(t)).then(function (e) {
        if (e.success) return e.result;
        throw new ne({
          code: "DELETE_FILE_FAILED",
          message: "删除文件失败"
        });
      });
    }
  }, {
    key: "getTempFileURL",
    value: function getTempFileURL() {
      var _ref17 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        e = _ref17.fileList;
      if (!Array.isArray(e) || 0 === e.length) throw new ne({
        code: "INVALID_PARAM",
        message: "fileList的元素必须是非空的字符串"
      });
      var t = {
        method: "serverless.file.resource.getTempFileURL",
        params: JSON.stringify({
          fileList: e
        })
      };
      return this.request(this.setupRequest(t)).then(function (e) {
        if (e.success) return {
          fileList: e.result.fileList.map(function (e) {
            return {
              fileID: e.fileID,
              tempFileURL: e.tempFileURL
            };
          })
        };
        throw new ne({
          code: "GET_TEMP_FILE_URL_FAILED",
          message: "获取临时文件链接失败"
        });
      });
    }
  }]);
  return St;
}(fe);
var bt = {
  init: function init(e) {
    var t = new St(e),
      n = {
        signInAnonymously: function signInAnonymously() {
          return t.authorize();
        },
        getLoginState: function getLoginState() {
          return Promise.resolve(!1);
        }
      };
    return t.auth = function () {
      return n;
    }, t.customAuth = t.auth, t;
  }
};
function kt(_ref18) {
  var e = _ref18.data;
  var t;
  t = he();
  var n = JSON.parse(JSON.stringify(e || {}));
  if (Object.assign(n, {
    clientInfo: t
  }), !n.uniIdToken) {
    var _re2 = re(),
      _e19 = _re2.token;
    _e19 && (n.uniIdToken = _e19);
  }
  return n;
}
function Ct() {
  return _Ct.apply(this, arguments);
}
function _Ct() {
  _Ct = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee54() {
    var _this26 = this;
    var _ref60,
      e,
      t,
      _this$__dev__,
      n,
      s,
      r,
      i,
      o,
      a,
      _args6 = arguments;
    return _regenerator.default.wrap(function _callee54$(_context54) {
      while (1) {
        switch (_context54.prev = _context54.next) {
          case 0:
            _ref60 = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {}, e = _ref60.name, t = _ref60.data;
            _context54.next = 3;
            return this.__dev__.initLocalNetwork();
          case 3:
            _this$__dev__ = this.__dev__, n = _this$__dev__.localAddress, s = _this$__dev__.localPort, r = {
              aliyun: "aliyun",
              tencent: "tcb"
            }[this.config.provider], i = this.config.spaceId, o = "http://".concat(n, ":").concat(s, "/system/check-function"), a = "http://".concat(n, ":").concat(s, "/cloudfunctions/").concat(e);
            return _context54.abrupt("return", new Promise(function (t, n) {
              se.request({
                method: "POST",
                url: o,
                data: {
                  name: e,
                  platform: P,
                  provider: r,
                  spaceId: i
                },
                timeout: 3e3,
                success: function success(e) {
                  t(e);
                },
                fail: function fail() {
                  t({
                    data: {
                      code: "NETWORK_ERROR",
                      message: "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下，自动切换为已部署的云函数。"
                    }
                  });
                }
              });
            }).then(function () {
              var _ref61 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                e = _ref61.data;
              var _ref62 = e || {},
                t = _ref62.code,
                n = _ref62.message;
              return {
                code: 0 === t ? 0 : t || "SYS_ERR",
                message: n || "SYS_ERR"
              };
            }).then(function (_ref63) {
              var n = _ref63.code,
                s = _ref63.message;
              if (0 !== n) {
                switch (n) {
                  case "MODULE_ENCRYPTED":
                    console.error("\u6B64\u4E91\u51FD\u6570\uFF08".concat(e, "\uFF09\u4F9D\u8D56\u52A0\u5BC6\u516C\u5171\u6A21\u5757\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570"));
                    break;
                  case "FUNCTION_ENCRYPTED":
                    console.error("\u6B64\u4E91\u51FD\u6570\uFF08".concat(e, "\uFF09\u5DF2\u52A0\u5BC6\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570"));
                    break;
                  case "ACTION_ENCRYPTED":
                    console.error(s || "需要访问加密的uni-clientDB-action，自动切换为云端环境");
                    break;
                  case "NETWORK_ERROR":
                    {
                      var _e31 = "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下";
                      throw console.error(_e31), new Error(_e31);
                    }
                  case "SWITCH_TO_CLOUD":
                    break;
                  default:
                    {
                      var _e32 = "\u68C0\u6D4B\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u51FA\u73B0\u9519\u8BEF\uFF1A".concat(s, "\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u73AF\u5883\u6216\u91CD\u542F\u5BA2\u6237\u7AEF\u518D\u8BD5");
                      throw console.error(_e32), new Error(_e32);
                    }
                }
                return _this26._callCloudFunction({
                  name: e,
                  data: t
                });
              }
              return new Promise(function (e, n) {
                var s = kt.call(_this26, {
                  data: t
                });
                se.request({
                  method: "POST",
                  url: a,
                  data: {
                    provider: r,
                    platform: P,
                    param: s
                  },
                  success: function success() {
                    var _ref64 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                      t = _ref64.statusCode,
                      s = _ref64.data;
                    return !t || t >= 400 ? n(new ne({
                      code: s.code || "SYS_ERR",
                      message: s.message || "request:fail"
                    })) : e({
                      result: s
                    });
                  },
                  fail: function fail(e) {
                    n(new ne({
                      code: e.code || e.errCode || "SYS_ERR",
                      message: e.message || e.errMsg || "request:fail"
                    }));
                  }
                });
              });
            }));
          case 5:
          case "end":
            return _context54.stop();
        }
      }
    }, _callee54, this);
  }));
  return _Ct.apply(this, arguments);
}
var Tt = [{
  rule: /fc_function_not_found|FUNCTION_NOT_FOUND/,
  content: "，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确以及该云函数是否已上传到服务空间",
  mode: "append"
}];
var Pt = /[\\^$.*+?()[\]{}|]/g,
  At = RegExp(Pt.source);
function Et(e, t, n) {
  return e.replace(new RegExp((s = t) && At.test(s) ? s.replace(Pt, "\\$&") : s, "g"), n);
  var s;
}
var Ot = "none",
  xt = "request",
  Rt = "response",
  Ut = "both";
var Lt = /*#__PURE__*/function () {
  function Lt() {
    var _ref19 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      e = _ref19.secretType,
      t = _ref19.uniCloudIns;
    (0, _classCallCheck2.default)(this, Lt);
    this.clientType = "", this.secretType = e || Ot, this.uniCloudIns = t;
    var _this$uniCloudIns$con = this.uniCloudIns.config,
      n = _this$uniCloudIns$con.provider,
      s = _this$uniCloudIns$con.spaceId;
    var r;
    this.provider = n, this.spaceId = s, this.scopedGlobalCache = (r = this.uniCloudIns, U("_globalUniCloudSecureNetworkCache__{spaceId}".replace("{spaceId}", r.config.spaceId)));
  }
  (0, _createClass2.default)(Lt, [{
    key: "getSystemInfo",
    value: function getSystemInfo() {
      return this._systemInfo || (this._systemInfo = ce()), this._systemInfo;
    }
  }, {
    key: "appId",
    get: function get() {
      return this.getSystemInfo().appId;
    }
  }, {
    key: "deviceId",
    get: function get() {
      return this.getSystemInfo().deviceId;
    }
  }, {
    key: "encryptData",
    value: function () {
      var _encryptData = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee34(e) {
        return _regenerator.default.wrap(function _callee34$(_context34) {
          while (1) {
            switch (_context34.prev = _context34.next) {
              case 0:
                return _context34.abrupt("return", this.secretType === Ot ? e : this.platformEncryptData(e));
              case 1:
              case "end":
                return _context34.stop();
            }
          }
        }, _callee34, this);
      }));
      function encryptData(_x31) {
        return _encryptData.apply(this, arguments);
      }
      return encryptData;
    }()
  }, {
    key: "decryptResult",
    value: function () {
      var _decryptResult = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee35(e) {
        var _ref20, t, n;
        return _regenerator.default.wrap(function _callee35$(_context35) {
          while (1) {
            switch (_context35.prev = _context35.next) {
              case 0:
                if (!(this.secretType === Ot)) {
                  _context35.next = 2;
                  break;
                }
                return _context35.abrupt("return", e);
              case 2:
                _ref20 = e || {}, t = _ref20.errCode, n = _ref20.content;
                return _context35.abrupt("return", t || !n ? e : this.secretType === xt ? n : this.platformDecryptResult(e));
              case 4:
              case "end":
                return _context35.stop();
            }
          }
        }, _callee35, this);
      }));
      function decryptResult(_x32) {
        return _decryptResult.apply(this, arguments);
      }
      return decryptResult;
    }()
  }, {
    key: "wrapVerifyClientCallFunction",
    value: function wrapVerifyClientCallFunction(e) {
      var t = this;
      return /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee36() {
        var _ref22,
          n,
          _ref22$data,
          s,
          r,
          _args36 = arguments;
        return _regenerator.default.wrap(function _callee36$(_context36) {
          while (1) {
            switch (_context36.prev = _context36.next) {
              case 0:
                _ref22 = _args36.length > 0 && _args36[0] !== undefined ? _args36[0] : {}, n = _ref22.name, _ref22$data = _ref22.data, s = _ref22$data === void 0 ? {} : _ref22$data;
                _context36.next = 3;
                return t.prepare();
              case 3:
                _context36.next = 5;
                return t.platformGetSignOption();
              case 5:
                (s = JSON.parse(JSON.stringify(s)))._uniCloudOptions = _context36.sent;
                _context36.next = 8;
                return e({
                  name: n,
                  data: s
                });
              case 8:
                r = _context36.sent;
                _context36.t0 = t.isClientKeyNotFound(r);
                if (!_context36.t0) {
                  _context36.next = 19;
                  break;
                }
                _context36.next = 13;
                return t.prepare({
                  forceUpdate: !0
                });
              case 13:
                _context36.next = 15;
                return t.platformGetSignOption();
              case 15:
                s._uniCloudOptions = _context36.sent;
                _context36.next = 18;
                return e({
                  name: n,
                  data: s
                });
              case 18:
                r = _context36.sent;
              case 19:
                return _context36.abrupt("return", r);
              case 20:
              case "end":
                return _context36.stop();
            }
          }
        }, _callee36);
      }));
    }
  }, {
    key: "wrapEncryptDataCallFunction",
    value: function wrapEncryptDataCallFunction(e) {
      var t = this;
      return /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee37() {
        var _ref24,
          n,
          _ref24$data,
          s,
          r,
          i,
          _r3,
          _args37 = arguments;
        return _regenerator.default.wrap(function _callee37$(_context37) {
          while (1) {
            switch (_context37.prev = _context37.next) {
              case 0:
                _ref24 = _args37.length > 0 && _args37[0] !== undefined ? _args37[0] : {}, n = _ref24.name, _ref24$data = _ref24.data, s = _ref24$data === void 0 ? {} : _ref24$data;
                _context37.next = 3;
                return t.prepare();
              case 3:
                _context37.next = 5;
                return t.encryptData(s);
              case 5:
                r = _context37.sent;
                _context37.next = 8;
                return e({
                  name: n,
                  data: r
                });
              case 8:
                i = _context37.sent;
                if (!t.isClientKeyNotFound(i)) {
                  _context37.next = 21;
                  break;
                }
                _context37.next = 12;
                return t.prepare({
                  forceUpdate: !0
                });
              case 12:
                _context37.next = 14;
                return t.encryptData(s);
              case 14:
                _r3 = _context37.sent;
                _context37.next = 17;
                return t.platformGetSignOption();
              case 17:
                s._uniCloudOptions = _context37.sent;
                _context37.next = 20;
                return e({
                  name: n,
                  data: _r3
                });
              case 20:
                i = _context37.sent;
              case 21:
                _context37.next = 23;
                return t.decryptResult(i.result);
              case 23:
                i.result = _context37.sent;
                return _context37.abrupt("return", i);
              case 25:
              case "end":
                return _context37.stop();
            }
          }
        }, _callee37);
      }));
    }
  }]);
  return Lt;
}();
/*! MIT License. Copyright 2015-2018 Richard Moore <me@ricmoo.com>. See LICENSE.txt. */
function Nt(e) {
  return parseInt(e) === e;
}
function Dt(e) {
  if (!Nt(e.length)) return !1;
  for (var t = 0; t < e.length; t++) {
    if (!Nt(e[t]) || e[t] < 0 || e[t] > 255) return !1;
  }
  return !0;
}
function Ft(e, t) {
  if (e.buffer && "Uint8Array" === e.name) return t && (e = e.slice ? e.slice() : Array.prototype.slice.call(e)), e;
  if (Array.isArray(e)) {
    if (!Dt(e)) throw new Error("Array contains invalid value: " + e);
    return new Uint8Array(e);
  }
  if (Nt(e.length) && Dt(e)) return new Uint8Array(e);
  throw new Error("unsupported array-like object");
}
function qt(e) {
  return new Uint8Array(e);
}
function Mt(e, t, n, s, r) {
  null == s && null == r || (e = e.slice ? e.slice(s, r) : Array.prototype.slice.call(e, s, r)), t.set(e, n);
}
var Kt,
  jt = {
    toBytes: function toBytes(e) {
      var t = [],
        n = 0;
      for (e = encodeURI(e); n < e.length;) {
        var s = e.charCodeAt(n++);
        37 === s ? (t.push(parseInt(e.substr(n, 2), 16)), n += 2) : t.push(s);
      }
      return Ft(t);
    },
    fromBytes: function fromBytes(e) {
      for (var t = [], n = 0; n < e.length;) {
        var s = e[n];
        s < 128 ? (t.push(String.fromCharCode(s)), n++) : s > 191 && s < 224 ? (t.push(String.fromCharCode((31 & s) << 6 | 63 & e[n + 1])), n += 2) : (t.push(String.fromCharCode((15 & s) << 12 | (63 & e[n + 1]) << 6 | 63 & e[n + 2])), n += 3);
      }
      return t.join("");
    }
  },
  Bt = (Kt = "0123456789abcdef", {
    toBytes: function toBytes(e) {
      for (var t = [], n = 0; n < e.length; n += 2) {
        t.push(parseInt(e.substr(n, 2), 16));
      }
      return t;
    },
    fromBytes: function fromBytes(e) {
      for (var t = [], n = 0; n < e.length; n++) {
        var s = e[n];
        t.push(Kt[(240 & s) >> 4] + Kt[15 & s]);
      }
      return t.join("");
    }
  }),
  $t = {
    16: 10,
    24: 12,
    32: 14
  },
  Wt = [1, 2, 4, 8, 16, 32, 64, 128, 27, 54, 108, 216, 171, 77, 154, 47, 94, 188, 99, 198, 151, 53, 106, 212, 179, 125, 250, 239, 197, 145],
  zt = [99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22],
  Jt = [82, 9, 106, 213, 48, 54, 165, 56, 191, 64, 163, 158, 129, 243, 215, 251, 124, 227, 57, 130, 155, 47, 255, 135, 52, 142, 67, 68, 196, 222, 233, 203, 84, 123, 148, 50, 166, 194, 35, 61, 238, 76, 149, 11, 66, 250, 195, 78, 8, 46, 161, 102, 40, 217, 36, 178, 118, 91, 162, 73, 109, 139, 209, 37, 114, 248, 246, 100, 134, 104, 152, 22, 212, 164, 92, 204, 93, 101, 182, 146, 108, 112, 72, 80, 253, 237, 185, 218, 94, 21, 70, 87, 167, 141, 157, 132, 144, 216, 171, 0, 140, 188, 211, 10, 247, 228, 88, 5, 184, 179, 69, 6, 208, 44, 30, 143, 202, 63, 15, 2, 193, 175, 189, 3, 1, 19, 138, 107, 58, 145, 17, 65, 79, 103, 220, 234, 151, 242, 207, 206, 240, 180, 230, 115, 150, 172, 116, 34, 231, 173, 53, 133, 226, 249, 55, 232, 28, 117, 223, 110, 71, 241, 26, 113, 29, 41, 197, 137, 111, 183, 98, 14, 170, 24, 190, 27, 252, 86, 62, 75, 198, 210, 121, 32, 154, 219, 192, 254, 120, 205, 90, 244, 31, 221, 168, 51, 136, 7, 199, 49, 177, 18, 16, 89, 39, 128, 236, 95, 96, 81, 127, 169, 25, 181, 74, 13, 45, 229, 122, 159, 147, 201, 156, 239, 160, 224, 59, 77, 174, 42, 245, 176, 200, 235, 187, 60, 131, 83, 153, 97, 23, 43, 4, 126, 186, 119, 214, 38, 225, 105, 20, 99, 85, 33, 12, 125],
  Ht = [3328402341, 4168907908, 4000806809, 4135287693, 4294111757, 3597364157, 3731845041, 2445657428, 1613770832, 33620227, 3462883241, 1445669757, 3892248089, 3050821474, 1303096294, 3967186586, 2412431941, 528646813, 2311702848, 4202528135, 4026202645, 2992200171, 2387036105, 4226871307, 1101901292, 3017069671, 1604494077, 1169141738, 597466303, 1403299063, 3832705686, 2613100635, 1974974402, 3791519004, 1033081774, 1277568618, 1815492186, 2118074177, 4126668546, 2211236943, 1748251740, 1369810420, 3521504564, 4193382664, 3799085459, 2883115123, 1647391059, 706024767, 134480908, 2512897874, 1176707941, 2646852446, 806885416, 932615841, 168101135, 798661301, 235341577, 605164086, 461406363, 3756188221, 3454790438, 1311188841, 2142417613, 3933566367, 302582043, 495158174, 1479289972, 874125870, 907746093, 3698224818, 3025820398, 1537253627, 2756858614, 1983593293, 3084310113, 2108928974, 1378429307, 3722699582, 1580150641, 327451799, 2790478837, 3117535592, 0, 3253595436, 1075847264, 3825007647, 2041688520, 3059440621, 3563743934, 2378943302, 1740553945, 1916352843, 2487896798, 2555137236, 2958579944, 2244988746, 3151024235, 3320835882, 1336584933, 3992714006, 2252555205, 2588757463, 1714631509, 293963156, 2319795663, 3925473552, 67240454, 4269768577, 2689618160, 2017213508, 631218106, 1269344483, 2723238387, 1571005438, 2151694528, 93294474, 1066570413, 563977660, 1882732616, 4059428100, 1673313503, 2008463041, 2950355573, 1109467491, 537923632, 3858759450, 4260623118, 3218264685, 2177748300, 403442708, 638784309, 3287084079, 3193921505, 899127202, 2286175436, 773265209, 2479146071, 1437050866, 4236148354, 2050833735, 3362022572, 3126681063, 840505643, 3866325909, 3227541664, 427917720, 2655997905, 2749160575, 1143087718, 1412049534, 999329963, 193497219, 2353415882, 3354324521, 1807268051, 672404540, 2816401017, 3160301282, 369822493, 2916866934, 3688947771, 1681011286, 1949973070, 336202270, 2454276571, 201721354, 1210328172, 3093060836, 2680341085, 3184776046, 1135389935, 3294782118, 965841320, 831886756, 3554993207, 4068047243, 3588745010, 2345191491, 1849112409, 3664604599, 26054028, 2983581028, 2622377682, 1235855840, 3630984372, 2891339514, 4092916743, 3488279077, 3395642799, 4101667470, 1202630377, 268961816, 1874508501, 4034427016, 1243948399, 1546530418, 941366308, 1470539505, 1941222599, 2546386513, 3421038627, 2715671932, 3899946140, 1042226977, 2521517021, 1639824860, 227249030, 260737669, 3765465232, 2084453954, 1907733956, 3429263018, 2420656344, 100860677, 4160157185, 470683154, 3261161891, 1781871967, 2924959737, 1773779408, 394692241, 2579611992, 974986535, 664706745, 3655459128, 3958962195, 731420851, 571543859, 3530123707, 2849626480, 126783113, 865375399, 765172662, 1008606754, 361203602, 3387549984, 2278477385, 2857719295, 1344809080, 2782912378, 59542671, 1503764984, 160008576, 437062935, 1707065306, 3622233649, 2218934982, 3496503480, 2185314755, 697932208, 1512910199, 504303377, 2075177163, 2824099068, 1841019862, 739644986],
  Gt = [2781242211, 2230877308, 2582542199, 2381740923, 234877682, 3184946027, 2984144751, 1418839493, 1348481072, 50462977, 2848876391, 2102799147, 434634494, 1656084439, 3863849899, 2599188086, 1167051466, 2636087938, 1082771913, 2281340285, 368048890, 3954334041, 3381544775, 201060592, 3963727277, 1739838676, 4250903202, 3930435503, 3206782108, 4149453988, 2531553906, 1536934080, 3262494647, 484572669, 2923271059, 1783375398, 1517041206, 1098792767, 49674231, 1334037708, 1550332980, 4098991525, 886171109, 150598129, 2481090929, 1940642008, 1398944049, 1059722517, 201851908, 1385547719, 1699095331, 1587397571, 674240536, 2704774806, 252314885, 3039795866, 151914247, 908333586, 2602270848, 1038082786, 651029483, 1766729511, 3447698098, 2682942837, 454166793, 2652734339, 1951935532, 775166490, 758520603, 3000790638, 4004797018, 4217086112, 4137964114, 1299594043, 1639438038, 3464344499, 2068982057, 1054729187, 1901997871, 2534638724, 4121318227, 1757008337, 0, 750906861, 1614815264, 535035132, 3363418545, 3988151131, 3201591914, 1183697867, 3647454910, 1265776953, 3734260298, 3566750796, 3903871064, 1250283471, 1807470800, 717615087, 3847203498, 384695291, 3313910595, 3617213773, 1432761139, 2484176261, 3481945413, 283769337, 100925954, 2180939647, 4037038160, 1148730428, 3123027871, 3813386408, 4087501137, 4267549603, 3229630528, 2315620239, 2906624658, 3156319645, 1215313976, 82966005, 3747855548, 3245848246, 1974459098, 1665278241, 807407632, 451280895, 251524083, 1841287890, 1283575245, 337120268, 891687699, 801369324, 3787349855, 2721421207, 3431482436, 959321879, 1469301956, 4065699751, 2197585534, 1199193405, 2898814052, 3887750493, 724703513, 2514908019, 2696962144, 2551808385, 3516813135, 2141445340, 1715741218, 2119445034, 2872807568, 2198571144, 3398190662, 700968686, 3547052216, 1009259540, 2041044702, 3803995742, 487983883, 1991105499, 1004265696, 1449407026, 1316239930, 504629770, 3683797321, 168560134, 1816667172, 3837287516, 1570751170, 1857934291, 4014189740, 2797888098, 2822345105, 2754712981, 936633572, 2347923833, 852879335, 1133234376, 1500395319, 3084545389, 2348912013, 1689376213, 3533459022, 3762923945, 3034082412, 4205598294, 133428468, 634383082, 2949277029, 2398386810, 3913789102, 403703816, 3580869306, 2297460856, 1867130149, 1918643758, 607656988, 4049053350, 3346248884, 1368901318, 600565992, 2090982877, 2632479860, 557719327, 3717614411, 3697393085, 2249034635, 2232388234, 2430627952, 1115438654, 3295786421, 2865522278, 3633334344, 84280067, 33027830, 303828494, 2747425121, 1600795957, 4188952407, 3496589753, 2434238086, 1486471617, 658119965, 3106381470, 953803233, 334231800, 3005978776, 857870609, 3151128937, 1890179545, 2298973838, 2805175444, 3056442267, 574365214, 2450884487, 550103529, 1233637070, 4289353045, 2018519080, 2057691103, 2399374476, 4166623649, 2148108681, 387583245, 3664101311, 836232934, 3330556482, 3100665960, 3280093505, 2955516313, 2002398509, 287182607, 3413881008, 4238890068, 3597515707, 975967766],
  Vt = [1671808611, 2089089148, 2006576759, 2072901243, 4061003762, 1807603307, 1873927791, 3310653893, 810573872, 16974337, 1739181671, 729634347, 4263110654, 3613570519, 2883997099, 1989864566, 3393556426, 2191335298, 3376449993, 2106063485, 4195741690, 1508618841, 1204391495, 4027317232, 2917941677, 3563566036, 2734514082, 2951366063, 2629772188, 2767672228, 1922491506, 3227229120, 3082974647, 4246528509, 2477669779, 644500518, 911895606, 1061256767, 4144166391, 3427763148, 878471220, 2784252325, 3845444069, 4043897329, 1905517169, 3631459288, 827548209, 356461077, 67897348, 3344078279, 593839651, 3277757891, 405286936, 2527147926, 84871685, 2595565466, 118033927, 305538066, 2157648768, 3795705826, 3945188843, 661212711, 2999812018, 1973414517, 152769033, 2208177539, 745822252, 439235610, 455947803, 1857215598, 1525593178, 2700827552, 1391895634, 994932283, 3596728278, 3016654259, 695947817, 3812548067, 795958831, 2224493444, 1408607827, 3513301457, 0, 3979133421, 543178784, 4229948412, 2982705585, 1542305371, 1790891114, 3410398667, 3201918910, 961245753, 1256100938, 1289001036, 1491644504, 3477767631, 3496721360, 4012557807, 2867154858, 4212583931, 1137018435, 1305975373, 861234739, 2241073541, 1171229253, 4178635257, 33948674, 2139225727, 1357946960, 1011120188, 2679776671, 2833468328, 1374921297, 2751356323, 1086357568, 2408187279, 2460827538, 2646352285, 944271416, 4110742005, 3168756668, 3066132406, 3665145818, 560153121, 271589392, 4279952895, 4077846003, 3530407890, 3444343245, 202643468, 322250259, 3962553324, 1608629855, 2543990167, 1154254916, 389623319, 3294073796, 2817676711, 2122513534, 1028094525, 1689045092, 1575467613, 422261273, 1939203699, 1621147744, 2174228865, 1339137615, 3699352540, 577127458, 712922154, 2427141008, 2290289544, 1187679302, 3995715566, 3100863416, 339486740, 3732514782, 1591917662, 186455563, 3681988059, 3762019296, 844522546, 978220090, 169743370, 1239126601, 101321734, 611076132, 1558493276, 3260915650, 3547250131, 2901361580, 1655096418, 2443721105, 2510565781, 3828863972, 2039214713, 3878868455, 3359869896, 928607799, 1840765549, 2374762893, 3580146133, 1322425422, 2850048425, 1823791212, 1459268694, 4094161908, 3928346602, 1706019429, 2056189050, 2934523822, 135794696, 3134549946, 2022240376, 628050469, 779246638, 472135708, 2800834470, 3032970164, 3327236038, 3894660072, 3715932637, 1956440180, 522272287, 1272813131, 3185336765, 2340818315, 2323976074, 1888542832, 1044544574, 3049550261, 1722469478, 1222152264, 50660867, 4127324150, 236067854, 1638122081, 895445557, 1475980887, 3117443513, 2257655686, 3243809217, 489110045, 2662934430, 3778599393, 4162055160, 2561878936, 288563729, 1773916777, 3648039385, 2391345038, 2493985684, 2612407707, 505560094, 2274497927, 3911240169, 3460925390, 1442818645, 678973480, 3749357023, 2358182796, 2717407649, 2306869641, 219617805, 3218761151, 3862026214, 1120306242, 1756942440, 1103331905, 2578459033, 762796589, 252780047, 2966125488, 1425844308, 3151392187, 372911126],
  Yt = [1667474886, 2088535288, 2004326894, 2071694838, 4075949567, 1802223062, 1869591006, 3318043793, 808472672, 16843522, 1734846926, 724270422, 4278065639, 3621216949, 2880169549, 1987484396, 3402253711, 2189597983, 3385409673, 2105378810, 4210693615, 1499065266, 1195886990, 4042263547, 2913856577, 3570689971, 2728590687, 2947541573, 2627518243, 2762274643, 1920112356, 3233831835, 3082273397, 4261223649, 2475929149, 640051788, 909531756, 1061110142, 4160160501, 3435941763, 875846760, 2779116625, 3857003729, 4059105529, 1903268834, 3638064043, 825316194, 353713962, 67374088, 3351728789, 589522246, 3284360861, 404236336, 2526454071, 84217610, 2593830191, 117901582, 303183396, 2155911963, 3806477791, 3958056653, 656894286, 2998062463, 1970642922, 151591698, 2206440989, 741110872, 437923380, 454765878, 1852748508, 1515908788, 2694904667, 1381168804, 993742198, 3604373943, 3014905469, 690584402, 3823320797, 791638366, 2223281939, 1398011302, 3520161977, 0, 3991743681, 538992704, 4244381667, 2981218425, 1532751286, 1785380564, 3419096717, 3200178535, 960056178, 1246420628, 1280103576, 1482221744, 3486468741, 3503319995, 4025428677, 2863326543, 4227536621, 1128514950, 1296947098, 859002214, 2240123921, 1162203018, 4193849577, 33687044, 2139062782, 1347481760, 1010582648, 2678045221, 2829640523, 1364325282, 2745433693, 1077985408, 2408548869, 2459086143, 2644360225, 943212656, 4126475505, 3166494563, 3065430391, 3671750063, 555836226, 269496352, 4294908645, 4092792573, 3537006015, 3452783745, 202118168, 320025894, 3974901699, 1600119230, 2543297077, 1145359496, 387397934, 3301201811, 2812801621, 2122220284, 1027426170, 1684319432, 1566435258, 421079858, 1936954854, 1616945344, 2172753945, 1330631070, 3705438115, 572679748, 707427924, 2425400123, 2290647819, 1179044492, 4008585671, 3099120491, 336870440, 3739122087, 1583276732, 185277718, 3688593069, 3772791771, 842159716, 976899700, 168435220, 1229577106, 101059084, 606366792, 1549591736, 3267517855, 3553849021, 2897014595, 1650632388, 2442242105, 2509612081, 3840161747, 2038008818, 3890688725, 3368567691, 926374254, 1835907034, 2374863873, 3587531953, 1313788572, 2846482505, 1819063512, 1448540844, 4109633523, 3941213647, 1701162954, 2054852340, 2930698567, 134748176, 3132806511, 2021165296, 623210314, 774795868, 471606328, 2795958615, 3031746419, 3334885783, 3907527627, 3722280097, 1953799400, 522133822, 1263263126, 3183336545, 2341176845, 2324333839, 1886425312, 1044267644, 3048588401, 1718004428, 1212733584, 50529542, 4143317495, 235803164, 1633788866, 892690282, 1465383342, 3115962473, 2256965911, 3250673817, 488449850, 2661202215, 3789633753, 4177007595, 2560144171, 286339874, 1768537042, 3654906025, 2391705863, 2492770099, 2610673197, 505291324, 2273808917, 3924369609, 3469625735, 1431699370, 673740880, 3755965093, 2358021891, 2711746649, 2307489801, 218961690, 3217021541, 3873845719, 1111672452, 1751693520, 1094828930, 2576986153, 757954394, 252645662, 2964376443, 1414855848, 3149649517, 370555436],
  Qt = [1374988112, 2118214995, 437757123, 975658646, 1001089995, 530400753, 2902087851, 1273168787, 540080725, 2910219766, 2295101073, 4110568485, 1340463100, 3307916247, 641025152, 3043140495, 3736164937, 632953703, 1172967064, 1576976609, 3274667266, 2169303058, 2370213795, 1809054150, 59727847, 361929877, 3211623147, 2505202138, 3569255213, 1484005843, 1239443753, 2395588676, 1975683434, 4102977912, 2572697195, 666464733, 3202437046, 4035489047, 3374361702, 2110667444, 1675577880, 3843699074, 2538681184, 1649639237, 2976151520, 3144396420, 4269907996, 4178062228, 1883793496, 2403728665, 2497604743, 1383856311, 2876494627, 1917518562, 3810496343, 1716890410, 3001755655, 800440835, 2261089178, 3543599269, 807962610, 599762354, 33778362, 3977675356, 2328828971, 2809771154, 4077384432, 1315562145, 1708848333, 101039829, 3509871135, 3299278474, 875451293, 2733856160, 92987698, 2767645557, 193195065, 1080094634, 1584504582, 3178106961, 1042385657, 2531067453, 3711829422, 1306967366, 2438237621, 1908694277, 67556463, 1615861247, 429456164, 3602770327, 2302690252, 1742315127, 2968011453, 126454664, 3877198648, 2043211483, 2709260871, 2084704233, 4169408201, 0, 159417987, 841739592, 504459436, 1817866830, 4245618683, 260388950, 1034867998, 908933415, 168810852, 1750902305, 2606453969, 607530554, 202008497, 2472011535, 3035535058, 463180190, 2160117071, 1641816226, 1517767529, 470948374, 3801332234, 3231722213, 1008918595, 303765277, 235474187, 4069246893, 766945465, 337553864, 1475418501, 2943682380, 4003061179, 2743034109, 4144047775, 1551037884, 1147550661, 1543208500, 2336434550, 3408119516, 3069049960, 3102011747, 3610369226, 1113818384, 328671808, 2227573024, 2236228733, 3535486456, 2935566865, 3341394285, 496906059, 3702665459, 226906860, 2009195472, 733156972, 2842737049, 294930682, 1206477858, 2835123396, 2700099354, 1451044056, 573804783, 2269728455, 3644379585, 2362090238, 2564033334, 2801107407, 2776292904, 3669462566, 1068351396, 742039012, 1350078989, 1784663195, 1417561698, 4136440770, 2430122216, 775550814, 2193862645, 2673705150, 1775276924, 1876241833, 3475313331, 3366754619, 270040487, 3902563182, 3678124923, 3441850377, 1851332852, 3969562369, 2203032232, 3868552805, 2868897406, 566021896, 4011190502, 3135740889, 1248802510, 3936291284, 699432150, 832877231, 708780849, 3332740144, 899835584, 1951317047, 4236429990, 3767586992, 866637845, 4043610186, 1106041591, 2144161806, 395441711, 1984812685, 1139781709, 3433712980, 3835036895, 2664543715, 1282050075, 3240894392, 1181045119, 2640243204, 25965917, 4203181171, 4211818798, 3009879386, 2463879762, 3910161971, 1842759443, 2597806476, 933301370, 1509430414, 3943906441, 3467192302, 3076639029, 3776767469, 2051518780, 2631065433, 1441952575, 404016761, 1942435775, 1408749034, 1610459739, 3745345300, 2017778566, 3400528769, 3110650942, 941896748, 3265478751, 371049330, 3168937228, 675039627, 4279080257, 967311729, 135050206, 3635733660, 1683407248, 2076935265, 3576870512, 1215061108, 3501741890],
  Xt = [1347548327, 1400783205, 3273267108, 2520393566, 3409685355, 4045380933, 2880240216, 2471224067, 1428173050, 4138563181, 2441661558, 636813900, 4233094615, 3620022987, 2149987652, 2411029155, 1239331162, 1730525723, 2554718734, 3781033664, 46346101, 310463728, 2743944855, 3328955385, 3875770207, 2501218972, 3955191162, 3667219033, 768917123, 3545789473, 692707433, 1150208456, 1786102409, 2029293177, 1805211710, 3710368113, 3065962831, 401639597, 1724457132, 3028143674, 409198410, 2196052529, 1620529459, 1164071807, 3769721975, 2226875310, 486441376, 2499348523, 1483753576, 428819965, 2274680428, 3075636216, 598438867, 3799141122, 1474502543, 711349675, 129166120, 53458370, 2592523643, 2782082824, 4063242375, 2988687269, 3120694122, 1559041666, 730517276, 2460449204, 4042459122, 2706270690, 3446004468, 3573941694, 533804130, 2328143614, 2637442643, 2695033685, 839224033, 1973745387, 957055980, 2856345839, 106852767, 1371368976, 4181598602, 1033297158, 2933734917, 1179510461, 3046200461, 91341917, 1862534868, 4284502037, 605657339, 2547432937, 3431546947, 2003294622, 3182487618, 2282195339, 954669403, 3682191598, 1201765386, 3917234703, 3388507166, 0, 2198438022, 1211247597, 2887651696, 1315723890, 4227665663, 1443857720, 507358933, 657861945, 1678381017, 560487590, 3516619604, 975451694, 2970356327, 261314535, 3535072918, 2652609425, 1333838021, 2724322336, 1767536459, 370938394, 182621114, 3854606378, 1128014560, 487725847, 185469197, 2918353863, 3106780840, 3356761769, 2237133081, 1286567175, 3152976349, 4255350624, 2683765030, 3160175349, 3309594171, 878443390, 1988838185, 3704300486, 1756818940, 1673061617, 3403100636, 272786309, 1075025698, 545572369, 2105887268, 4174560061, 296679730, 1841768865, 1260232239, 4091327024, 3960309330, 3497509347, 1814803222, 2578018489, 4195456072, 575138148, 3299409036, 446754879, 3629546796, 4011996048, 3347532110, 3252238545, 4270639778, 915985419, 3483825537, 681933534, 651868046, 2755636671, 3828103837, 223377554, 2607439820, 1649704518, 3270937875, 3901806776, 1580087799, 4118987695, 3198115200, 2087309459, 2842678573, 3016697106, 1003007129, 2802849917, 1860738147, 2077965243, 164439672, 4100872472, 32283319, 2827177882, 1709610350, 2125135846, 136428751, 3874428392, 3652904859, 3460984630, 3572145929, 3593056380, 2939266226, 824852259, 818324884, 3224740454, 930369212, 2801566410, 2967507152, 355706840, 1257309336, 4148292826, 243256656, 790073846, 2373340630, 1296297904, 1422699085, 3756299780, 3818836405, 457992840, 3099667487, 2135319889, 77422314, 1560382517, 1945798516, 788204353, 1521706781, 1385356242, 870912086, 325965383, 2358957921, 2050466060, 2388260884, 2313884476, 4006521127, 901210569, 3990953189, 1014646705, 1503449823, 1062597235, 2031621326, 3212035895, 3931371469, 1533017514, 350174575, 2256028891, 2177544179, 1052338372, 741876788, 1606591296, 1914052035, 213705253, 2334669897, 1107234197, 1899603969, 3725069491, 2631447780, 2422494913, 1635502980, 1893020342, 1950903388, 1120974935],
  Zt = [2807058932, 1699970625, 2764249623, 1586903591, 1808481195, 1173430173, 1487645946, 59984867, 4199882800, 1844882806, 1989249228, 1277555970, 3623636965, 3419915562, 1149249077, 2744104290, 1514790577, 459744698, 244860394, 3235995134, 1963115311, 4027744588, 2544078150, 4190530515, 1608975247, 2627016082, 2062270317, 1507497298, 2200818878, 567498868, 1764313568, 3359936201, 2305455554, 2037970062, 1047239e3, 1910319033, 1337376481, 2904027272, 2892417312, 984907214, 1243112415, 830661914, 861968209, 2135253587, 2011214180, 2927934315, 2686254721, 731183368, 1750626376, 4246310725, 1820824798, 4172763771, 3542330227, 48394827, 2404901663, 2871682645, 671593195, 3254988725, 2073724613, 145085239, 2280796200, 2779915199, 1790575107, 2187128086, 472615631, 3029510009, 4075877127, 3802222185, 4107101658, 3201631749, 1646252340, 4270507174, 1402811438, 1436590835, 3778151818, 3950355702, 3963161475, 4020912224, 2667994737, 273792366, 2331590177, 104699613, 95345982, 3175501286, 2377486676, 1560637892, 3564045318, 369057872, 4213447064, 3919042237, 1137477952, 2658625497, 1119727848, 2340947849, 1530455833, 4007360968, 172466556, 266959938, 516552836, 0, 2256734592, 3980931627, 1890328081, 1917742170, 4294704398, 945164165, 3575528878, 958871085, 3647212047, 2787207260, 1423022939, 775562294, 1739656202, 3876557655, 2530391278, 2443058075, 3310321856, 547512796, 1265195639, 437656594, 3121275539, 719700128, 3762502690, 387781147, 218828297, 3350065803, 2830708150, 2848461854, 428169201, 122466165, 3720081049, 1627235199, 648017665, 4122762354, 1002783846, 2117360635, 695634755, 3336358691, 4234721005, 4049844452, 3704280881, 2232435299, 574624663, 287343814, 612205898, 1039717051, 840019705, 2708326185, 793451934, 821288114, 1391201670, 3822090177, 376187827, 3113855344, 1224348052, 1679968233, 2361698556, 1058709744, 752375421, 2431590963, 1321699145, 3519142200, 2734591178, 188127444, 2177869557, 3727205754, 2384911031, 3215212461, 2648976442, 2450346104, 3432737375, 1180849278, 331544205, 3102249176, 4150144569, 2952102595, 2159976285, 2474404304, 766078933, 313773861, 2570832044, 2108100632, 1668212892, 3145456443, 2013908262, 418672217, 3070356634, 2594734927, 1852171925, 3867060991, 3473416636, 3907448597, 2614737639, 919489135, 164948639, 2094410160, 2997825956, 590424639, 2486224549, 1723872674, 3157750862, 3399941250, 3501252752, 3625268135, 2555048196, 3673637356, 1343127501, 4130281361, 3599595085, 2957853679, 1297403050, 81781910, 3051593425, 2283490410, 532201772, 1367295589, 3926170974, 895287692, 1953757831, 1093597963, 492483431, 3528626907, 1446242576, 1192455638, 1636604631, 209336225, 344873464, 1015671571, 669961897, 3375740769, 3857572124, 2973530695, 3747192018, 1933530610, 3464042516, 935293895, 3454686199, 2858115069, 1863638845, 3683022916, 4085369519, 3292445032, 875313188, 1080017571, 3279033885, 621591778, 1233856572, 2504130317, 24197544, 3017672716, 3835484340, 3247465558, 2220981195, 3060847922, 1551124588, 1463996600],
  en = [4104605777, 1097159550, 396673818, 660510266, 2875968315, 2638606623, 4200115116, 3808662347, 821712160, 1986918061, 3430322568, 38544885, 3856137295, 718002117, 893681702, 1654886325, 2975484382, 3122358053, 3926825029, 4274053469, 796197571, 1290801793, 1184342925, 3556361835, 2405426947, 2459735317, 1836772287, 1381620373, 3196267988, 1948373848, 3764988233, 3385345166, 3263785589, 2390325492, 1480485785, 3111247143, 3780097726, 2293045232, 548169417, 3459953789, 3746175075, 439452389, 1362321559, 1400849762, 1685577905, 1806599355, 2174754046, 137073913, 1214797936, 1174215055, 3731654548, 2079897426, 1943217067, 1258480242, 529487843, 1437280870, 3945269170, 3049390895, 3313212038, 923313619, 679998e3, 3215307299, 57326082, 377642221, 3474729866, 2041877159, 133361907, 1776460110, 3673476453, 96392454, 878845905, 2801699524, 777231668, 4082475170, 2330014213, 4142626212, 2213296395, 1626319424, 1906247262, 1846563261, 562755902, 3708173718, 1040559837, 3871163981, 1418573201, 3294430577, 114585348, 1343618912, 2566595609, 3186202582, 1078185097, 3651041127, 3896688048, 2307622919, 425408743, 3371096953, 2081048481, 1108339068, 2216610296, 0, 2156299017, 736970802, 292596766, 1517440620, 251657213, 2235061775, 2933202493, 758720310, 265905162, 1554391400, 1532285339, 908999204, 174567692, 1474760595, 4002861748, 2610011675, 3234156416, 3693126241, 2001430874, 303699484, 2478443234, 2687165888, 585122620, 454499602, 151849742, 2345119218, 3064510765, 514443284, 4044981591, 1963412655, 2581445614, 2137062819, 19308535, 1928707164, 1715193156, 4219352155, 1126790795, 600235211, 3992742070, 3841024952, 836553431, 1669664834, 2535604243, 3323011204, 1243905413, 3141400786, 4180808110, 698445255, 2653899549, 2989552604, 2253581325, 3252932727, 3004591147, 1891211689, 2487810577, 3915653703, 4237083816, 4030667424, 2100090966, 865136418, 1229899655, 953270745, 3399679628, 3557504664, 4118925222, 2061379749, 3079546586, 2915017791, 983426092, 2022837584, 1607244650, 2118541908, 2366882550, 3635996816, 972512814, 3283088770, 1568718495, 3499326569, 3576539503, 621982671, 2895723464, 410887952, 2623762152, 1002142683, 645401037, 1494807662, 2595684844, 1335535747, 2507040230, 4293295786, 3167684641, 367585007, 3885750714, 1865862730, 2668221674, 2960971305, 2763173681, 1059270954, 2777952454, 2724642869, 1320957812, 2194319100, 2429595872, 2815956275, 77089521, 3973773121, 3444575871, 2448830231, 1305906550, 4021308739, 2857194700, 2516901860, 3518358430, 1787304780, 740276417, 1699839814, 1592394909, 2352307457, 2272556026, 188821243, 1729977011, 3687994002, 274084841, 3594982253, 3613494426, 2701949495, 4162096729, 322734571, 2837966542, 1640576439, 484830689, 1202797690, 3537852828, 4067639125, 349075736, 3342319475, 4157467219, 4255800159, 1030690015, 1155237496, 2951971274, 1757691577, 607398968, 2738905026, 499347990, 3794078908, 1011452712, 227885567, 2818666809, 213114376, 3034881240, 1455525988, 3414450555, 850817237, 1817998408, 3092726480],
  tn = [0, 235474187, 470948374, 303765277, 941896748, 908933415, 607530554, 708780849, 1883793496, 2118214995, 1817866830, 1649639237, 1215061108, 1181045119, 1417561698, 1517767529, 3767586992, 4003061179, 4236429990, 4069246893, 3635733660, 3602770327, 3299278474, 3400528769, 2430122216, 2664543715, 2362090238, 2193862645, 2835123396, 2801107407, 3035535058, 3135740889, 3678124923, 3576870512, 3341394285, 3374361702, 3810496343, 3977675356, 4279080257, 4043610186, 2876494627, 2776292904, 3076639029, 3110650942, 2472011535, 2640243204, 2403728665, 2169303058, 1001089995, 899835584, 666464733, 699432150, 59727847, 226906860, 530400753, 294930682, 1273168787, 1172967064, 1475418501, 1509430414, 1942435775, 2110667444, 1876241833, 1641816226, 2910219766, 2743034109, 2976151520, 3211623147, 2505202138, 2606453969, 2302690252, 2269728455, 3711829422, 3543599269, 3240894392, 3475313331, 3843699074, 3943906441, 4178062228, 4144047775, 1306967366, 1139781709, 1374988112, 1610459739, 1975683434, 2076935265, 1775276924, 1742315127, 1034867998, 866637845, 566021896, 800440835, 92987698, 193195065, 429456164, 395441711, 1984812685, 2017778566, 1784663195, 1683407248, 1315562145, 1080094634, 1383856311, 1551037884, 101039829, 135050206, 437757123, 337553864, 1042385657, 807962610, 573804783, 742039012, 2531067453, 2564033334, 2328828971, 2227573024, 2935566865, 2700099354, 3001755655, 3168937228, 3868552805, 3902563182, 4203181171, 4102977912, 3736164937, 3501741890, 3265478751, 3433712980, 1106041591, 1340463100, 1576976609, 1408749034, 2043211483, 2009195472, 1708848333, 1809054150, 832877231, 1068351396, 766945465, 599762354, 159417987, 126454664, 361929877, 463180190, 2709260871, 2943682380, 3178106961, 3009879386, 2572697195, 2538681184, 2236228733, 2336434550, 3509871135, 3745345300, 3441850377, 3274667266, 3910161971, 3877198648, 4110568485, 4211818798, 2597806476, 2497604743, 2261089178, 2295101073, 2733856160, 2902087851, 3202437046, 2968011453, 3936291284, 3835036895, 4136440770, 4169408201, 3535486456, 3702665459, 3467192302, 3231722213, 2051518780, 1951317047, 1716890410, 1750902305, 1113818384, 1282050075, 1584504582, 1350078989, 168810852, 67556463, 371049330, 404016761, 841739592, 1008918595, 775550814, 540080725, 3969562369, 3801332234, 4035489047, 4269907996, 3569255213, 3669462566, 3366754619, 3332740144, 2631065433, 2463879762, 2160117071, 2395588676, 2767645557, 2868897406, 3102011747, 3069049960, 202008497, 33778362, 270040487, 504459436, 875451293, 975658646, 675039627, 641025152, 2084704233, 1917518562, 1615861247, 1851332852, 1147550661, 1248802510, 1484005843, 1451044056, 933301370, 967311729, 733156972, 632953703, 260388950, 25965917, 328671808, 496906059, 1206477858, 1239443753, 1543208500, 1441952575, 2144161806, 1908694277, 1675577880, 1842759443, 3610369226, 3644379585, 3408119516, 3307916247, 4011190502, 3776767469, 4077384432, 4245618683, 2809771154, 2842737049, 3144396420, 3043140495, 2673705150, 2438237621, 2203032232, 2370213795],
  nn = [0, 185469197, 370938394, 487725847, 741876788, 657861945, 975451694, 824852259, 1483753576, 1400783205, 1315723890, 1164071807, 1950903388, 2135319889, 1649704518, 1767536459, 2967507152, 3152976349, 2801566410, 2918353863, 2631447780, 2547432937, 2328143614, 2177544179, 3901806776, 3818836405, 4270639778, 4118987695, 3299409036, 3483825537, 3535072918, 3652904859, 2077965243, 1893020342, 1841768865, 1724457132, 1474502543, 1559041666, 1107234197, 1257309336, 598438867, 681933534, 901210569, 1052338372, 261314535, 77422314, 428819965, 310463728, 3409685355, 3224740454, 3710368113, 3593056380, 3875770207, 3960309330, 4045380933, 4195456072, 2471224067, 2554718734, 2237133081, 2388260884, 3212035895, 3028143674, 2842678573, 2724322336, 4138563181, 4255350624, 3769721975, 3955191162, 3667219033, 3516619604, 3431546947, 3347532110, 2933734917, 2782082824, 3099667487, 3016697106, 2196052529, 2313884476, 2499348523, 2683765030, 1179510461, 1296297904, 1347548327, 1533017514, 1786102409, 1635502980, 2087309459, 2003294622, 507358933, 355706840, 136428751, 53458370, 839224033, 957055980, 605657339, 790073846, 2373340630, 2256028891, 2607439820, 2422494913, 2706270690, 2856345839, 3075636216, 3160175349, 3573941694, 3725069491, 3273267108, 3356761769, 4181598602, 4063242375, 4011996048, 3828103837, 1033297158, 915985419, 730517276, 545572369, 296679730, 446754879, 129166120, 213705253, 1709610350, 1860738147, 1945798516, 2029293177, 1239331162, 1120974935, 1606591296, 1422699085, 4148292826, 4233094615, 3781033664, 3931371469, 3682191598, 3497509347, 3446004468, 3328955385, 2939266226, 2755636671, 3106780840, 2988687269, 2198438022, 2282195339, 2501218972, 2652609425, 1201765386, 1286567175, 1371368976, 1521706781, 1805211710, 1620529459, 2105887268, 1988838185, 533804130, 350174575, 164439672, 46346101, 870912086, 954669403, 636813900, 788204353, 2358957921, 2274680428, 2592523643, 2441661558, 2695033685, 2880240216, 3065962831, 3182487618, 3572145929, 3756299780, 3270937875, 3388507166, 4174560061, 4091327024, 4006521127, 3854606378, 1014646705, 930369212, 711349675, 560487590, 272786309, 457992840, 106852767, 223377554, 1678381017, 1862534868, 1914052035, 2031621326, 1211247597, 1128014560, 1580087799, 1428173050, 32283319, 182621114, 401639597, 486441376, 768917123, 651868046, 1003007129, 818324884, 1503449823, 1385356242, 1333838021, 1150208456, 1973745387, 2125135846, 1673061617, 1756818940, 2970356327, 3120694122, 2802849917, 2887651696, 2637442643, 2520393566, 2334669897, 2149987652, 3917234703, 3799141122, 4284502037, 4100872472, 3309594171, 3460984630, 3545789473, 3629546796, 2050466060, 1899603969, 1814803222, 1730525723, 1443857720, 1560382517, 1075025698, 1260232239, 575138148, 692707433, 878443390, 1062597235, 243256656, 91341917, 409198410, 325965383, 3403100636, 3252238545, 3704300486, 3620022987, 3874428392, 3990953189, 4042459122, 4227665663, 2460449204, 2578018489, 2226875310, 2411029155, 3198115200, 3046200461, 2827177882, 2743944855],
  sn = [0, 218828297, 437656594, 387781147, 875313188, 958871085, 775562294, 590424639, 1750626376, 1699970625, 1917742170, 2135253587, 1551124588, 1367295589, 1180849278, 1265195639, 3501252752, 3720081049, 3399941250, 3350065803, 3835484340, 3919042237, 4270507174, 4085369519, 3102249176, 3051593425, 2734591178, 2952102595, 2361698556, 2177869557, 2530391278, 2614737639, 3145456443, 3060847922, 2708326185, 2892417312, 2404901663, 2187128086, 2504130317, 2555048196, 3542330227, 3727205754, 3375740769, 3292445032, 3876557655, 3926170974, 4246310725, 4027744588, 1808481195, 1723872674, 1910319033, 2094410160, 1608975247, 1391201670, 1173430173, 1224348052, 59984867, 244860394, 428169201, 344873464, 935293895, 984907214, 766078933, 547512796, 1844882806, 1627235199, 2011214180, 2062270317, 1507497298, 1423022939, 1137477952, 1321699145, 95345982, 145085239, 532201772, 313773861, 830661914, 1015671571, 731183368, 648017665, 3175501286, 2957853679, 2807058932, 2858115069, 2305455554, 2220981195, 2474404304, 2658625497, 3575528878, 3625268135, 3473416636, 3254988725, 3778151818, 3963161475, 4213447064, 4130281361, 3599595085, 3683022916, 3432737375, 3247465558, 3802222185, 4020912224, 4172763771, 4122762354, 3201631749, 3017672716, 2764249623, 2848461854, 2331590177, 2280796200, 2431590963, 2648976442, 104699613, 188127444, 472615631, 287343814, 840019705, 1058709744, 671593195, 621591778, 1852171925, 1668212892, 1953757831, 2037970062, 1514790577, 1463996600, 1080017571, 1297403050, 3673637356, 3623636965, 3235995134, 3454686199, 4007360968, 3822090177, 4107101658, 4190530515, 2997825956, 3215212461, 2830708150, 2779915199, 2256734592, 2340947849, 2627016082, 2443058075, 172466556, 122466165, 273792366, 492483431, 1047239e3, 861968209, 612205898, 695634755, 1646252340, 1863638845, 2013908262, 1963115311, 1446242576, 1530455833, 1277555970, 1093597963, 1636604631, 1820824798, 2073724613, 1989249228, 1436590835, 1487645946, 1337376481, 1119727848, 164948639, 81781910, 331544205, 516552836, 1039717051, 821288114, 669961897, 719700128, 2973530695, 3157750862, 2871682645, 2787207260, 2232435299, 2283490410, 2667994737, 2450346104, 3647212047, 3564045318, 3279033885, 3464042516, 3980931627, 3762502690, 4150144569, 4199882800, 3070356634, 3121275539, 2904027272, 2686254721, 2200818878, 2384911031, 2570832044, 2486224549, 3747192018, 3528626907, 3310321856, 3359936201, 3950355702, 3867060991, 4049844452, 4234721005, 1739656202, 1790575107, 2108100632, 1890328081, 1402811438, 1586903591, 1233856572, 1149249077, 266959938, 48394827, 369057872, 418672217, 1002783846, 919489135, 567498868, 752375421, 209336225, 24197544, 376187827, 459744698, 945164165, 895287692, 574624663, 793451934, 1679968233, 1764313568, 2117360635, 1933530610, 1343127501, 1560637892, 1243112415, 1192455638, 3704280881, 3519142200, 3336358691, 3419915562, 3907448597, 3857572124, 4075877127, 4294704398, 3029510009, 3113855344, 2927934315, 2744104290, 2159976285, 2377486676, 2594734927, 2544078150],
  rn = [0, 151849742, 303699484, 454499602, 607398968, 758720310, 908999204, 1059270954, 1214797936, 1097159550, 1517440620, 1400849762, 1817998408, 1699839814, 2118541908, 2001430874, 2429595872, 2581445614, 2194319100, 2345119218, 3034881240, 3186202582, 2801699524, 2951971274, 3635996816, 3518358430, 3399679628, 3283088770, 4237083816, 4118925222, 4002861748, 3885750714, 1002142683, 850817237, 698445255, 548169417, 529487843, 377642221, 227885567, 77089521, 1943217067, 2061379749, 1640576439, 1757691577, 1474760595, 1592394909, 1174215055, 1290801793, 2875968315, 2724642869, 3111247143, 2960971305, 2405426947, 2253581325, 2638606623, 2487810577, 3808662347, 3926825029, 4044981591, 4162096729, 3342319475, 3459953789, 3576539503, 3693126241, 1986918061, 2137062819, 1685577905, 1836772287, 1381620373, 1532285339, 1078185097, 1229899655, 1040559837, 923313619, 740276417, 621982671, 439452389, 322734571, 137073913, 19308535, 3871163981, 4021308739, 4104605777, 4255800159, 3263785589, 3414450555, 3499326569, 3651041127, 2933202493, 2815956275, 3167684641, 3049390895, 2330014213, 2213296395, 2566595609, 2448830231, 1305906550, 1155237496, 1607244650, 1455525988, 1776460110, 1626319424, 2079897426, 1928707164, 96392454, 213114376, 396673818, 514443284, 562755902, 679998e3, 865136418, 983426092, 3708173718, 3557504664, 3474729866, 3323011204, 4180808110, 4030667424, 3945269170, 3794078908, 2507040230, 2623762152, 2272556026, 2390325492, 2975484382, 3092726480, 2738905026, 2857194700, 3973773121, 3856137295, 4274053469, 4157467219, 3371096953, 3252932727, 3673476453, 3556361835, 2763173681, 2915017791, 3064510765, 3215307299, 2156299017, 2307622919, 2459735317, 2610011675, 2081048481, 1963412655, 1846563261, 1729977011, 1480485785, 1362321559, 1243905413, 1126790795, 878845905, 1030690015, 645401037, 796197571, 274084841, 425408743, 38544885, 188821243, 3613494426, 3731654548, 3313212038, 3430322568, 4082475170, 4200115116, 3780097726, 3896688048, 2668221674, 2516901860, 2366882550, 2216610296, 3141400786, 2989552604, 2837966542, 2687165888, 1202797690, 1320957812, 1437280870, 1554391400, 1669664834, 1787304780, 1906247262, 2022837584, 265905162, 114585348, 499347990, 349075736, 736970802, 585122620, 972512814, 821712160, 2595684844, 2478443234, 2293045232, 2174754046, 3196267988, 3079546586, 2895723464, 2777952454, 3537852828, 3687994002, 3234156416, 3385345166, 4142626212, 4293295786, 3841024952, 3992742070, 174567692, 57326082, 410887952, 292596766, 777231668, 660510266, 1011452712, 893681702, 1108339068, 1258480242, 1343618912, 1494807662, 1715193156, 1865862730, 1948373848, 2100090966, 2701949495, 2818666809, 3004591147, 3122358053, 2235061775, 2352307457, 2535604243, 2653899549, 3915653703, 3764988233, 4219352155, 4067639125, 3444575871, 3294430577, 3746175075, 3594982253, 836553431, 953270745, 600235211, 718002117, 367585007, 484830689, 133361907, 251657213, 2041877159, 1891211689, 1806599355, 1654886325, 1568718495, 1418573201, 1335535747, 1184342925];
function on(e) {
  for (var t = [], n = 0; n < e.length; n += 4) {
    t.push(e[n] << 24 | e[n + 1] << 16 | e[n + 2] << 8 | e[n + 3]);
  }
  return t;
}
var an = /*#__PURE__*/function () {
  function an(e) {
    (0, _classCallCheck2.default)(this, an);
    if (!(this instanceof an)) throw Error("AES must be instanitated with `new`");
    Object.defineProperty(this, "key", {
      value: Ft(e, !0)
    }), this._prepare();
  }
  (0, _createClass2.default)(an, [{
    key: "_prepare",
    value: function _prepare() {
      var e = $t[this.key.length];
      if (null == e) throw new Error("invalid key size (must be 16, 24 or 32 bytes)");
      this._Ke = [], this._Kd = [];
      for (var t = 0; t <= e; t++) {
        this._Ke.push([0, 0, 0, 0]), this._Kd.push([0, 0, 0, 0]);
      }
      var n,
        s = 4 * (e + 1),
        r = this.key.length / 4,
        i = on(this.key);
      for (t = 0; t < r; t++) {
        n = t >> 2, this._Ke[n][t % 4] = i[t], this._Kd[e - n][t % 4] = i[t];
      }
      for (var o, a = 0, c = r; c < s;) {
        if (o = i[r - 1], i[0] ^= zt[o >> 16 & 255] << 24 ^ zt[o >> 8 & 255] << 16 ^ zt[255 & o] << 8 ^ zt[o >> 24 & 255] ^ Wt[a] << 24, a += 1, 8 != r) for (t = 1; t < r; t++) {
          i[t] ^= i[t - 1];
        } else {
          for (t = 1; t < r / 2; t++) {
            i[t] ^= i[t - 1];
          }
          o = i[r / 2 - 1], i[r / 2] ^= zt[255 & o] ^ zt[o >> 8 & 255] << 8 ^ zt[o >> 16 & 255] << 16 ^ zt[o >> 24 & 255] << 24;
          for (t = r / 2 + 1; t < r; t++) {
            i[t] ^= i[t - 1];
          }
        }
        for (t = 0; t < r && c < s;) {
          u = c >> 2, h = c % 4, this._Ke[u][h] = i[t], this._Kd[e - u][h] = i[t++], c++;
        }
      }
      for (var u = 1; u < e; u++) {
        for (var h = 0; h < 4; h++) {
          o = this._Kd[u][h], this._Kd[u][h] = tn[o >> 24 & 255] ^ nn[o >> 16 & 255] ^ sn[o >> 8 & 255] ^ rn[255 & o];
        }
      }
    }
  }, {
    key: "encrypt",
    value: function encrypt(e) {
      if (16 != e.length) throw new Error("invalid plaintext size (must be 16 bytes)");
      for (var t = this._Ke.length - 1, n = [0, 0, 0, 0], s = on(e), r = 0; r < 4; r++) {
        s[r] ^= this._Ke[0][r];
      }
      for (var i = 1; i < t; i++) {
        for (r = 0; r < 4; r++) {
          n[r] = Ht[s[r] >> 24 & 255] ^ Gt[s[(r + 1) % 4] >> 16 & 255] ^ Vt[s[(r + 2) % 4] >> 8 & 255] ^ Yt[255 & s[(r + 3) % 4]] ^ this._Ke[i][r];
        }
        s = n.slice();
      }
      var o,
        a = qt(16);
      for (r = 0; r < 4; r++) {
        o = this._Ke[t][r], a[4 * r] = 255 & (zt[s[r] >> 24 & 255] ^ o >> 24), a[4 * r + 1] = 255 & (zt[s[(r + 1) % 4] >> 16 & 255] ^ o >> 16), a[4 * r + 2] = 255 & (zt[s[(r + 2) % 4] >> 8 & 255] ^ o >> 8), a[4 * r + 3] = 255 & (zt[255 & s[(r + 3) % 4]] ^ o);
      }
      return a;
    }
  }, {
    key: "decrypt",
    value: function decrypt(e) {
      if (16 != e.length) throw new Error("invalid ciphertext size (must be 16 bytes)");
      for (var t = this._Kd.length - 1, n = [0, 0, 0, 0], s = on(e), r = 0; r < 4; r++) {
        s[r] ^= this._Kd[0][r];
      }
      for (var i = 1; i < t; i++) {
        for (r = 0; r < 4; r++) {
          n[r] = Qt[s[r] >> 24 & 255] ^ Xt[s[(r + 3) % 4] >> 16 & 255] ^ Zt[s[(r + 2) % 4] >> 8 & 255] ^ en[255 & s[(r + 1) % 4]] ^ this._Kd[i][r];
        }
        s = n.slice();
      }
      var o,
        a = qt(16);
      for (r = 0; r < 4; r++) {
        o = this._Kd[t][r], a[4 * r] = 255 & (Jt[s[r] >> 24 & 255] ^ o >> 24), a[4 * r + 1] = 255 & (Jt[s[(r + 3) % 4] >> 16 & 255] ^ o >> 16), a[4 * r + 2] = 255 & (Jt[s[(r + 2) % 4] >> 8 & 255] ^ o >> 8), a[4 * r + 3] = 255 & (Jt[255 & s[(r + 1) % 4]] ^ o);
      }
      return a;
    }
  }]);
  return an;
}();
var cn = /*#__PURE__*/function () {
  function cn(e) {
    (0, _classCallCheck2.default)(this, cn);
    if (!(this instanceof cn)) throw Error("AES must be instanitated with `new`");
    this.description = "Electronic Code Block", this.name = "ecb", this._aes = new an(e);
  }
  (0, _createClass2.default)(cn, [{
    key: "encrypt",
    value: function encrypt(e) {
      if ((e = Ft(e)).length % 16 != 0) throw new Error("invalid plaintext size (must be multiple of 16 bytes)");
      for (var t = qt(e.length), n = qt(16), s = 0; s < e.length; s += 16) {
        Mt(e, n, 0, s, s + 16), Mt(n = this._aes.encrypt(n), t, s);
      }
      return t;
    }
  }, {
    key: "decrypt",
    value: function decrypt(e) {
      if ((e = Ft(e)).length % 16 != 0) throw new Error("invalid ciphertext size (must be multiple of 16 bytes)");
      for (var t = qt(e.length), n = qt(16), s = 0; s < e.length; s += 16) {
        Mt(e, n, 0, s, s + 16), Mt(n = this._aes.decrypt(n), t, s);
      }
      return t;
    }
  }]);
  return cn;
}();
var un = /*#__PURE__*/function () {
  function un(e, t) {
    (0, _classCallCheck2.default)(this, un);
    if (!(this instanceof un)) throw Error("AES must be instanitated with `new`");
    if (this.description = "Cipher Block Chaining", this.name = "cbc", t) {
      if (16 != t.length) throw new Error("invalid initialation vector size (must be 16 bytes)");
    } else t = qt(16);
    this._lastCipherblock = Ft(t, !0), this._aes = new an(e);
  }
  (0, _createClass2.default)(un, [{
    key: "encrypt",
    value: function encrypt(e) {
      if ((e = Ft(e)).length % 16 != 0) throw new Error("invalid plaintext size (must be multiple of 16 bytes)");
      for (var t = qt(e.length), n = qt(16), s = 0; s < e.length; s += 16) {
        Mt(e, n, 0, s, s + 16);
        for (var r = 0; r < 16; r++) {
          n[r] ^= this._lastCipherblock[r];
        }
        this._lastCipherblock = this._aes.encrypt(n), Mt(this._lastCipherblock, t, s);
      }
      return t;
    }
  }, {
    key: "decrypt",
    value: function decrypt(e) {
      if ((e = Ft(e)).length % 16 != 0) throw new Error("invalid ciphertext size (must be multiple of 16 bytes)");
      for (var t = qt(e.length), n = qt(16), s = 0; s < e.length; s += 16) {
        Mt(e, n, 0, s, s + 16), n = this._aes.decrypt(n);
        for (var r = 0; r < 16; r++) {
          t[s + r] = n[r] ^ this._lastCipherblock[r];
        }
        Mt(e, this._lastCipherblock, 0, s, s + 16);
      }
      return t;
    }
  }]);
  return un;
}();
var hn = /*#__PURE__*/function () {
  function hn(e, t, n) {
    (0, _classCallCheck2.default)(this, hn);
    if (!(this instanceof hn)) throw Error("AES must be instanitated with `new`");
    if (this.description = "Cipher Feedback", this.name = "cfb", t) {
      if (16 != t.length) throw new Error("invalid initialation vector size (must be 16 size)");
    } else t = qt(16);
    n || (n = 1), this.segmentSize = n, this._shiftRegister = Ft(t, !0), this._aes = new an(e);
  }
  (0, _createClass2.default)(hn, [{
    key: "encrypt",
    value: function encrypt(e) {
      if (e.length % this.segmentSize != 0) throw new Error("invalid plaintext size (must be segmentSize bytes)");
      for (var t, n = Ft(e, !0), s = 0; s < n.length; s += this.segmentSize) {
        t = this._aes.encrypt(this._shiftRegister);
        for (var r = 0; r < this.segmentSize; r++) {
          n[s + r] ^= t[r];
        }
        Mt(this._shiftRegister, this._shiftRegister, 0, this.segmentSize), Mt(n, this._shiftRegister, 16 - this.segmentSize, s, s + this.segmentSize);
      }
      return n;
    }
  }, {
    key: "decrypt",
    value: function decrypt(e) {
      if (e.length % this.segmentSize != 0) throw new Error("invalid ciphertext size (must be segmentSize bytes)");
      for (var t, n = Ft(e, !0), s = 0; s < n.length; s += this.segmentSize) {
        t = this._aes.encrypt(this._shiftRegister);
        for (var r = 0; r < this.segmentSize; r++) {
          n[s + r] ^= t[r];
        }
        Mt(this._shiftRegister, this._shiftRegister, 0, this.segmentSize), Mt(e, this._shiftRegister, 16 - this.segmentSize, s, s + this.segmentSize);
      }
      return n;
    }
  }]);
  return hn;
}();
var ln = /*#__PURE__*/function () {
  function ln(e, t) {
    (0, _classCallCheck2.default)(this, ln);
    if (!(this instanceof ln)) throw Error("AES must be instanitated with `new`");
    if (this.description = "Output Feedback", this.name = "ofb", t) {
      if (16 != t.length) throw new Error("invalid initialation vector size (must be 16 bytes)");
    } else t = qt(16);
    this._lastPrecipher = Ft(t, !0), this._lastPrecipherIndex = 16, this._aes = new an(e);
  }
  (0, _createClass2.default)(ln, [{
    key: "encrypt",
    value: function encrypt(e) {
      for (var t = Ft(e, !0), n = 0; n < t.length; n++) {
        16 === this._lastPrecipherIndex && (this._lastPrecipher = this._aes.encrypt(this._lastPrecipher), this._lastPrecipherIndex = 0), t[n] ^= this._lastPrecipher[this._lastPrecipherIndex++];
      }
      return t;
    }
  }, {
    key: "decrypt",
    value: function decrypt(e) {
      return this.encrypt(e);
    }
  }]);
  return ln;
}();
var dn = /*#__PURE__*/function () {
  function dn(e) {
    (0, _classCallCheck2.default)(this, dn);
    if (!(this instanceof dn)) throw Error("Counter must be instanitated with `new`");
    0 === e || e || (e = 1), "number" == typeof e ? (this._counter = qt(16), this.setValue(e)) : this.setBytes(e);
  }
  (0, _createClass2.default)(dn, [{
    key: "setValue",
    value: function setValue(e) {
      if ("number" != typeof e || parseInt(e) != e) throw new Error("invalid counter value (must be an integer)");
      if (e > Number.MAX_SAFE_INTEGER) throw new Error("integer value out of safe range");
      for (var t = 15; t >= 0; --t) {
        this._counter[t] = e % 256, e = parseInt(e / 256);
      }
    }
  }, {
    key: "setBytes",
    value: function setBytes(e) {
      if (16 != (e = Ft(e, !0)).length) throw new Error("invalid counter bytes size (must be 16 bytes)");
      this._counter = e;
    }
  }, {
    key: "increment",
    value: function increment() {
      for (var e = 15; e >= 0; e--) {
        if (255 !== this._counter[e]) {
          this._counter[e]++;
          break;
        }
        this._counter[e] = 0;
      }
    }
  }]);
  return dn;
}();
var pn = /*#__PURE__*/function () {
  function pn(e, t) {
    (0, _classCallCheck2.default)(this, pn);
    if (!(this instanceof pn)) throw Error("AES must be instanitated with `new`");
    this.description = "Counter", this.name = "ctr", t instanceof dn || (t = new dn(t)), this._counter = t, this._remainingCounter = null, this._remainingCounterIndex = 16, this._aes = new an(e);
  }
  (0, _createClass2.default)(pn, [{
    key: "encrypt",
    value: function encrypt(e) {
      for (var t = Ft(e, !0), n = 0; n < t.length; n++) {
        16 === this._remainingCounterIndex && (this._remainingCounter = this._aes.encrypt(this._counter._counter), this._remainingCounterIndex = 0, this._counter.increment()), t[n] ^= this._remainingCounter[this._remainingCounterIndex++];
      }
      return t;
    }
  }, {
    key: "decrypt",
    value: function decrypt(e) {
      return this.encrypt(e);
    }
  }]);
  return pn;
}();
var fn = {
  AES: an,
  Counter: dn,
  ModeOfOperation: {
    ecb: cn,
    cbc: un,
    cfb: hn,
    ofb: ln,
    ctr: pn
  },
  utils: {
    hex: Bt,
    utf8: jt
  },
  padding: {
    pkcs7: {
      pad: function pad(e) {
        var t = 16 - (e = Ft(e, !0)).length % 16,
          n = qt(e.length + t);
        Mt(e, n);
        for (var s = e.length; s < n.length; s++) {
          n[s] = t;
        }
        return n;
      },
      strip: function strip(e) {
        if ((e = Ft(e, !0)).length < 16) throw new Error("PKCS#7 invalid length");
        var t = e[e.length - 1];
        if (t > 16) throw new Error("PKCS#7 padding byte out of range");
        for (var n = e.length - t, s = 0; s < t; s++) {
          if (e[n + s] !== t) throw new Error("PKCS#7 invalid padding byte");
        }
        var r = qt(n);
        return Mt(e, r, 0, 0, n), r;
      }
    }
  },
  _arrayTest: {
    coerceArray: Ft,
    createArray: qt,
    copyArray: Mt
  }
};
function gn(e, t, n) {
  var s = new Uint8Array(uni.base64ToArrayBuffer(t)),
    r = fn.utils.utf8.toBytes(n),
    i = fn.utils.utf8.toBytes(e),
    o = new fn.ModeOfOperation.cbc(s, r),
    a = fn.padding.pkcs7.pad(i),
    c = o.encrypt(a);
  return uni.arrayBufferToBase64(c);
}
var mn = {
    code: 2e4,
    message: "System error"
  },
  yn = {
    code: 20101,
    message: "Invalid client"
  },
  _n = {
    code: 20102,
    message: "Get encrypt key failed"
  },
  wn = {
    10001: "Secure network is not supported on current playground or unimpsdk",
    10003: "Config missing in current app. If the problem pesist, please contact DCloud.",
    10009: "Encrypt payload failed",
    10010: "Decrypt response failed"
  };
function vn(e) {
  var _ref25 = e || {},
    t = _ref25.errSubject,
    n = _ref25.subject,
    s = _ref25.errCode,
    r = _ref25.errMsg,
    i = _ref25.code,
    o = _ref25.message,
    a = _ref25.cause;
  return new ne({
    subject: t || n || "uni-secure-network",
    code: s || i || mn.code,
    message: r || o,
    cause: a
  });
}
var In,
  Sn,
  bn = null;
var kn = /*#__PURE__*/function (_Lt) {
  (0, _inherits2.default)(kn, _Lt);
  var _super9 = _createSuper(kn);
  function kn(e) {
    var _this14;
    (0, _classCallCheck2.default)(this, kn);
    _this14 = _super9.call(this, e), _this14.clientType = "mp-weixin", _this14.userEncryptKey = null;
    return _this14;
  }
  (0, _createClass2.default)(kn, [{
    key: "isLogin",
    value: function isLogin() {
      return !!this.scopedGlobalCache.mpWeixinCode || !!this.scopedGlobalCache.mpWeixinOpenid;
    }
  }, {
    key: "prepare",
    value: function () {
      var _prepare2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee38() {
        return _regenerator.default.wrap(function _callee38$(_context38) {
          while (1) {
            switch (_context38.prev = _context38.next) {
              case 0:
                if (this.isLogin()) {
                  _context38.next = 7;
                  break;
                }
                if (this.scopedGlobalCache.initPromise) {
                  _context38.next = 3;
                  break;
                }
                throw new Error("`uniCloud.initSecureNetworkByWeixin` has not yet been called");
              case 3:
                _context38.next = 5;
                return this.scopedGlobalCache.initPromise;
              case 5:
                if (this.isLogin()) {
                  _context38.next = 7;
                  break;
                }
                throw new Error("uniCloud.initSecureNetworkByWeixin` has not yet been called or successfully excuted");
              case 7:
              case "end":
                return _context38.stop();
            }
          }
        }, _callee38, this);
      }));
      function prepare() {
        return _prepare2.apply(this, arguments);
      }
      return prepare;
    }()
  }, {
    key: "getUserEncryptKey",
    value: function () {
      var _getUserEncryptKey = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee39() {
        var _this15 = this;
        var e;
        return _regenerator.default.wrap(function _callee39$(_context39) {
          while (1) {
            switch (_context39.prev = _context39.next) {
              case 0:
                if (!this.userEncryptKey) {
                  _context39.next = 2;
                  break;
                }
                return _context39.abrupt("return", this.userEncryptKey);
              case 2:
                if (!(bn && bn.expireTime)) {
                  _context39.next = 6;
                  break;
                }
                e = Date.now();
                if (!(bn.expireTime - e > 0)) {
                  _context39.next = 6;
                  break;
                }
                return _context39.abrupt("return", (this.userEncryptKey = bn, this.userEncryptKey));
              case 6:
                return _context39.abrupt("return", new Promise(function (e, t) {
                  uni.getUserCryptoManager().getLatestUserKey({
                    success: function success(t) {
                      bn = t, _this15.userEncryptKey = t, e(_this15.userEncryptKey);
                    },
                    fail: function fail(e) {
                      t(vn(_objectSpread(_objectSpread({}, _n), {}, {
                        cause: e
                      })));
                    }
                  });
                }));
              case 7:
              case "end":
                return _context39.stop();
            }
          }
        }, _callee39, this);
      }));
      function getUserEncryptKey() {
        return _getUserEncryptKey.apply(this, arguments);
      }
      return getUserEncryptKey;
    }()
  }, {
    key: "getWxAppId",
    value: function getWxAppId() {
      return wx.getAccountInfoSync().miniProgram.appId;
    }
  }, {
    key: "platformGetSignOption",
    value: function () {
      var _platformGetSignOption = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee40() {
        var _yield$this$getUserEn, e, t, n;
        return _regenerator.default.wrap(function _callee40$(_context40) {
          while (1) {
            switch (_context40.prev = _context40.next) {
              case 0:
                _context40.next = 2;
                return this.getUserEncryptKey();
              case 2:
                _yield$this$getUserEn = _context40.sent;
                e = _yield$this$getUserEn.encryptKey;
                t = _yield$this$getUserEn.iv;
                n = _yield$this$getUserEn.version;
                return _context40.abrupt("return", {
                  verifyClientSign: gn(JSON.stringify({
                    data: JSON.stringify({}),
                    appId: this.appId,
                    deviceId: this.deviceId,
                    wxAppId: this.getWxAppId(),
                    simulator: "devtools" === ce().platform,
                    timestamp: Date.now()
                  }), e, t),
                  encryptKeyId: n,
                  mpWeixinCode: this.scopedGlobalCache.mpWeixinCode,
                  mpWeixinOpenid: this.scopedGlobalCache.mpWeixinOpenid
                });
              case 7:
              case "end":
                return _context40.stop();
            }
          }
        }, _callee40, this);
      }));
      function platformGetSignOption() {
        return _platformGetSignOption.apply(this, arguments);
      }
      return platformGetSignOption;
    }()
  }, {
    key: "platformEncryptData",
    value: function () {
      var _platformEncryptData = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee41(e) {
        var _yield$this$getUserEn2, t, n, s, r;
        return _regenerator.default.wrap(function _callee41$(_context41) {
          while (1) {
            switch (_context41.prev = _context41.next) {
              case 0:
                _context41.next = 2;
                return this.getUserEncryptKey();
              case 2:
                _yield$this$getUserEn2 = _context41.sent;
                t = _yield$this$getUserEn2.encryptKey;
                n = _yield$this$getUserEn2.iv;
                s = _yield$this$getUserEn2.version;
                r = {
                  secretType: this.secretType,
                  encryptKeyId: s,
                  mpWeixinCode: this.scopedGlobalCache.mpWeixinCode,
                  mpWeixinOpenid: this.scopedGlobalCache.mpWeixinOpenid
                };
                return _context41.abrupt("return", this.secretType === Rt ? {
                  content: e,
                  _uniCloudOptions: r
                } : {
                  content: gn(JSON.stringify({
                    data: JSON.stringify(e),
                    appId: this.appId,
                    deviceId: this.deviceId,
                    wxAppId: this.getWxAppId(),
                    simulator: "devtools" === ce().platform,
                    timestamp: Date.now()
                  }), t, n),
                  _uniCloudOptions: r
                });
              case 8:
              case "end":
                return _context41.stop();
            }
          }
        }, _callee41, this);
      }));
      function platformEncryptData(_x33) {
        return _platformEncryptData.apply(this, arguments);
      }
      return platformEncryptData;
    }()
  }, {
    key: "platformDecryptResult",
    value: function () {
      var _platformDecryptResult = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee42(e) {
        var t, _yield$this$getUserEn3, n, s;
        return _regenerator.default.wrap(function _callee42$(_context42) {
          while (1) {
            switch (_context42.prev = _context42.next) {
              case 0:
                t = e.content;
                _context42.next = 3;
                return this.getUserEncryptKey();
              case 3:
                _yield$this$getUserEn3 = _context42.sent;
                n = _yield$this$getUserEn3.encryptKey;
                s = _yield$this$getUserEn3.iv;
                return _context42.abrupt("return", JSON.parse(function (e, t, n) {
                  var s = new Uint8Array(uni.base64ToArrayBuffer(e)),
                    r = new Uint8Array(uni.base64ToArrayBuffer(t)),
                    i = fn.utils.utf8.toBytes(n),
                    o = new fn.ModeOfOperation.cbc(r, i),
                    a = fn.padding.pkcs7.strip(o.decrypt(s));
                  return fn.utils.utf8.fromBytes(a);
                }(t, n, s)));
              case 7:
              case "end":
                return _context42.stop();
            }
          }
        }, _callee42, this);
      }));
      function platformDecryptResult(_x34) {
        return _platformDecryptResult.apply(this, arguments);
      }
      return platformDecryptResult;
    }()
  }, {
    key: "isClientKeyNotFound",
    value: function isClientKeyNotFound() {
      return !1;
    }
  }]);
  return kn;
}(Lt);
function Cn(e) {
  var t = ["hasClientKey", "encryptGetClientKeyPayload", "setClientKey", "encrypt", "decrypt"],
    n = {};
  var _loop = function _loop(_s10) {
    var r = t[_s10];
    n[r] = function () {
      for (var _len = arguments.length, t = new Array(_len), _key = 0; _key < _len; _key++) {
        t[_key] = arguments[_key];
      }
      return new Promise(function (n, s) {
        "function" == typeof e[r] ? e[r].apply(e, t.concat([function () {
          var _ref26 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            e = _ref26.type,
            t = _ref26.data,
            r = _ref26.errCode,
            i = _ref26.errMsg,
            o = _ref26.errSubject,
            a = _ref26.message;
          "success" === e ? n(t) : s(vn({
            errCode: r,
            errMsg: wn[r] || i || a,
            errSubject: o
          }));
        }])) : s(vn({
          message: "请检查manifest.json内是否开启安全网络模块，另外注意标准基座不支持安全网络模块"
        }));
      });
    };
  };
  for (var _s10 = 0; _s10 < t.length; _s10++) {
    _loop(_s10);
  }
  return n;
}
var Tn = /*#__PURE__*/function (_Lt2) {
  (0, _inherits2.default)(Tn, _Lt2);
  var _super10 = _createSuper(Tn);
  function Tn(e) {
    var _this16;
    (0, _classCallCheck2.default)(this, Tn);
    _this16 = _super10.call(this, e), _this16.clientType = "app", _this16.appUtils = _objectSpread({}, Cn(uni.requireNativePlugin("plus"))), _this16.systemInfo = In || (In = ce());
    return _this16;
  }
  (0, _createClass2.default)(Tn, [{
    key: "hasClientKey",
    value: function () {
      var _hasClientKey = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee43() {
        return _regenerator.default.wrap(function _callee43$(_context43) {
          while (1) {
            switch (_context43.prev = _context43.next) {
              case 0:
                _context43.next = 2;
                return this.appUtils.hasClientKey({
                  provider: this.provider,
                  spaceId: this.spaceId
                });
              case 2:
                this._hasClientKey = _context43.sent;
                return _context43.abrupt("return", this._hasClientKey);
              case 4:
              case "end":
                return _context43.stop();
            }
          }
        }, _callee43, this);
      }));
      function hasClientKey() {
        return _hasClientKey.apply(this, arguments);
      }
      return hasClientKey;
    }()
  }, {
    key: "getAppClientKey",
    value: function () {
      var _getAppClientKey = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee44() {
        var _yield$this$appUtils$, e, t, n, s, r;
        return _regenerator.default.wrap(function _callee44$(_context44) {
          while (1) {
            switch (_context44.prev = _context44.next) {
              case 0:
                _context44.next = 2;
                return this.appUtils.encryptGetClientKeyPayload({
                  data: JSON.stringify({})
                });
              case 2:
                _yield$this$appUtils$ = _context44.sent;
                e = _yield$this$appUtils$.data;
                t = _yield$this$appUtils$.key;
                _context44.next = 7;
                return this.uniCloudIns.callFunction({
                  name: "DCloud-clientDB",
                  data: {
                    redirectTo: "encryption",
                    action: "getAppClientKey",
                    data: e,
                    key: t
                  }
                });
              case 7:
                _context44.t0 = _context44.sent.result;
                if (_context44.t0) {
                  _context44.next = 10;
                  break;
                }
                _context44.t0 = {};
              case 10:
                n = _context44.t0;
                if (!(0 !== n.errCode)) {
                  _context44.next = 13;
                  break;
                }
                throw function (e) {
                  return new ne({
                    subject: e.errSubject || "uni-secure-network",
                    code: e.errCode || e.code || mn.code,
                    message: e.errMsg || e.message
                  });
                }(n);
              case 13:
                s = n.clientKey, r = n.key;
                _context44.next = 16;
                return this.appUtils.setClientKey({
                  provider: this.provider,
                  spaceId: this.spaceId,
                  clientKey: s,
                  key: r
                });
              case 16:
              case "end":
                return _context44.stop();
            }
          }
        }, _callee44, this);
      }));
      function getAppClientKey() {
        return _getAppClientKey.apply(this, arguments);
      }
      return getAppClientKey;
    }()
  }, {
    key: "ensureClientKey",
    value: function () {
      var _ensureClientKey = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee45() {
        var _this17 = this;
        var _ref27,
          _ref27$forceUpdate,
          e,
          _args45 = arguments;
        return _regenerator.default.wrap(function _callee45$(_context45) {
          while (1) {
            switch (_context45.prev = _context45.next) {
              case 0:
                _ref27 = _args45.length > 0 && _args45[0] !== undefined ? _args45[0] : {}, _ref27$forceUpdate = _ref27.forceUpdate, e = _ref27$forceUpdate === void 0 ? !1 : _ref27$forceUpdate;
                _context45.t1 = !0;
                _context45.next = 4;
                return this.hasClientKey();
              case 4:
                _context45.t2 = _context45.sent;
                _context45.t0 = _context45.t1 !== _context45.t2;
                if (_context45.t0) {
                  _context45.next = 8;
                  break;
                }
                _context45.t0 = e;
              case 8:
                if (!_context45.t0) {
                  _context45.next = 10;
                  break;
                }
                return _context45.abrupt("return", (e && this.scopedGlobalCache.initPromise && this.scopedGlobalCache.initStatus === d || !e && this.scopedGlobalCache.initPromise && this.scopedGlobalCache.initStatus !== f || (this.scopedGlobalCache.initPromise = this.getAppClientKey(), this.scopedGlobalCache.initPromise.then(function (e) {
                  _this17.scopedGlobalCache.initStatus = p;
                }).catch(function (e) {
                  throw _this17.scopedGlobalCache.initStatus = f, e;
                }), this.scopedGlobalCache.initStatus = d), this.scopedGlobalCache.initPromise));
              case 10:
              case "end":
                return _context45.stop();
            }
          }
        }, _callee45, this);
      }));
      function ensureClientKey() {
        return _ensureClientKey.apply(this, arguments);
      }
      return ensureClientKey;
    }()
  }, {
    key: "prepare",
    value: function () {
      var _prepare3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee46() {
        var _ref28,
          _ref28$forceUpdate,
          e,
          _args46 = arguments;
        return _regenerator.default.wrap(function _callee46$(_context46) {
          while (1) {
            switch (_context46.prev = _context46.next) {
              case 0:
                _ref28 = _args46.length > 0 && _args46[0] !== undefined ? _args46[0] : {}, _ref28$forceUpdate = _ref28.forceUpdate, e = _ref28$forceUpdate === void 0 ? !1 : _ref28$forceUpdate;
                _context46.next = 3;
                return this.ensureClientKey({
                  forceUpdate: e
                });
              case 3:
              case "end":
                return _context46.stop();
            }
          }
        }, _callee46, this);
      }));
      function prepare() {
        return _prepare3.apply(this, arguments);
      }
      return prepare;
    }()
  }, {
    key: "platformGetSignOption",
    value: function () {
      var _platformGetSignOption2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee47() {
        var _yield$this$appUtils$2, e, t;
        return _regenerator.default.wrap(function _callee47$(_context47) {
          while (1) {
            switch (_context47.prev = _context47.next) {
              case 0:
                _context47.next = 2;
                return this.appUtils.encrypt({
                  provider: this.provider,
                  spaceId: this.spaceId,
                  data: JSON.stringify({})
                });
              case 2:
                _yield$this$appUtils$2 = _context47.sent;
                e = _yield$this$appUtils$2.data;
                t = _yield$this$appUtils$2.key;
                return _context47.abrupt("return", {
                  verifyClientSign: e,
                  encryptKeyId: t
                });
              case 6:
              case "end":
                return _context47.stop();
            }
          }
        }, _callee47, this);
      }));
      function platformGetSignOption() {
        return _platformGetSignOption2.apply(this, arguments);
      }
      return platformGetSignOption;
    }()
  }, {
    key: "platformEncryptData",
    value: function () {
      var _platformEncryptData2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee48(e) {
        var _yield$this$appUtils$3, t, n, s;
        return _regenerator.default.wrap(function _callee48$(_context48) {
          while (1) {
            switch (_context48.prev = _context48.next) {
              case 0:
                _context48.next = 2;
                return this.appUtils.encrypt({
                  provider: this.provider,
                  spaceId: this.spaceId,
                  data: JSON.stringify(e)
                });
              case 2:
                _yield$this$appUtils$3 = _context48.sent;
                t = _yield$this$appUtils$3.data;
                n = _yield$this$appUtils$3.key;
                s = {
                  secretType: this.secretType,
                  encryptKeyId: n
                };
                return _context48.abrupt("return", this.secretType === Rt ? {
                  content: e,
                  _uniCloudOptions: s
                } : {
                  content: t,
                  _uniCloudOptions: s
                });
              case 7:
              case "end":
                return _context48.stop();
            }
          }
        }, _callee48, this);
      }));
      function platformEncryptData(_x35) {
        return _platformEncryptData2.apply(this, arguments);
      }
      return platformEncryptData;
    }()
  }, {
    key: "platformDecryptResult",
    value: function () {
      var _platformDecryptResult2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee49(e) {
        var t, _e$_uniCloudOptions, n, s, r;
        return _regenerator.default.wrap(function _callee49$(_context49) {
          while (1) {
            switch (_context49.prev = _context49.next) {
              case 0:
                t = e.content;
                _e$_uniCloudOptions = e._uniCloudOptions;
                n = _e$_uniCloudOptions === void 0 ? {} : _e$_uniCloudOptions;
                s = n.encryptKeyId;
                _context49.next = 6;
                return this.appUtils.decrypt({
                  provider: this.provider,
                  spaceId: this.spaceId,
                  data: t,
                  key: s
                });
              case 6:
                r = _context49.sent;
                return _context49.abrupt("return", JSON.parse(r.data));
              case 8:
              case "end":
                return _context49.stop();
            }
          }
        }, _callee49, this);
      }));
      function platformDecryptResult(_x36) {
        return _platformDecryptResult2.apply(this, arguments);
      }
      return platformDecryptResult;
    }()
  }, {
    key: "isClientKeyNotFound",
    value: function isClientKeyNotFound() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var t = e.result || {};
      return 70009 === t.errCode && "uni-secure-network" === t.errSubject;
    }
  }]);
  return Tn;
}(Lt);
function Pn() {
  var _ref29 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    e = _ref29.secretType;
  return e === xt || e === Rt || e === Ut;
}
function An() {
  var _ref30 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    e = _ref30.name,
    _ref30$data = _ref30.data,
    t = _ref30$data === void 0 ? {} : _ref30$data;
  return "app" === P && "DCloud-clientDB" === e && "encryption" === t.redirectTo && "getAppClientKey" === t.action;
}
function En() {
  var _ref31 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    e = _ref31.provider,
    t = _ref31.spaceId,
    n = _ref31.functionName;
  var _ce = ce(),
    s = _ce.appId,
    r = _ce.uniPlatform,
    i = _ce.osName;
  var o = r;
  "app" === r && (o = i);
  var a = function () {
    var _ref32 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      e = _ref32.provider,
      t = _ref32.spaceId;
    var n = T;
    if (!n) return {};
    e = function (e) {
      return "tencent" === e ? "tcb" : e;
    }(e);
    var s = n.find(function (n) {
      return n.provider === e && n.spaceId === t;
    });
    return s && s.config;
  }({
    provider: e,
    spaceId: t
  });
  if (!a || !a.accessControl || !a.accessControl.enable) return !1;
  var c = a.accessControl.function || {},
    u = Object.keys(c);
  if (0 === u.length) return !0;
  var h = function (e, t) {
    var n, s, r;
    for (var _i2 = 0; _i2 < e.length; _i2++) {
      var _o2 = e[_i2];
      _o2 !== t ? "*" !== _o2 ? _o2.split(",").map(function (e) {
        return e.trim();
      }).indexOf(t) > -1 && (s = _o2) : r = _o2 : n = _o2;
    }
    return n || s || r;
  }(u, n);
  if (!h) return !1;
  if ((c[h] || []).find(function () {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return e.appId === s && (e.platform || "").toLowerCase() === o.toLowerCase();
  })) return !0;
  throw console.error("\u6B64\u5E94\u7528[appId: ".concat(s, ", platform: ").concat(o, "]\u4E0D\u5728\u4E91\u7AEF\u914D\u7F6E\u7684\u5141\u8BB8\u8BBF\u95EE\u7684\u5E94\u7528\u5217\u8868\u5185\uFF0C\u53C2\u8003\uFF1Ahttps://uniapp.dcloud.net.cn/uniCloud/secure-network.html#verify-client")), vn(yn);
}
function On(_ref33) {
  var e = _ref33.functionName,
    t = _ref33.result,
    n = _ref33.logPvd;
  if (b && this.__dev__.debugLog && t && t.requestId) {
    var _s11 = JSON.stringify({
      spaceId: this.config.spaceId,
      functionName: e,
      requestId: t.requestId
    });
    console.log("[".concat(n, "-request]").concat(_s11, "[/").concat(n, "-request]"));
  }
}
function xn(e) {
  var t = e.callFunction,
    n = function n(_n7) {
      var _this18 = this;
      var s = _n7.name;
      _n7.data = kt.call(e, {
        data: _n7.data
      });
      var r = {
          aliyun: "aliyun",
          tencent: "tcb",
          tcb: "tcb"
        }[this.config.provider],
        i = Pn(_n7),
        o = An(_n7),
        a = i || o;
      return t.call(this, _n7).then(function (e) {
        return e.errCode = 0, !a && On.call(_this18, {
          functionName: s,
          result: e,
          logPvd: r
        }), Promise.resolve(e);
      }, function (e) {
        return !a && On.call(_this18, {
          functionName: s,
          result: e,
          logPvd: r
        }), e && e.message && (e.message = function () {
          var _ref34 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref34$message = _ref34.message,
            e = _ref34$message === void 0 ? "" : _ref34$message,
            _ref34$extraInfo = _ref34.extraInfo,
            t = _ref34$extraInfo === void 0 ? {} : _ref34$extraInfo,
            _ref34$formatter = _ref34.formatter,
            n = _ref34$formatter === void 0 ? [] : _ref34$formatter;
          for (var _s12 = 0; _s12 < n.length; _s12++) {
            var _n$_s = n[_s12],
              _r4 = _n$_s.rule,
              _i3 = _n$_s.content,
              _o3 = _n$_s.mode,
              _a = e.match(_r4);
            if (!_a) continue;
            var _c = _i3;
            for (var _e20 = 1; _e20 < _a.length; _e20++) {
              _c = Et(_c, "{$".concat(_e20, "}"), _a[_e20]);
            }
            for (var _e21 in t) {
              _c = Et(_c, "{".concat(_e21, "}"), t[_e21]);
            }
            return "replace" === _o3 ? _c : e + _c;
          }
          return e;
        }({
          message: "[".concat(_n7.name, "]: ").concat(e.message),
          formatter: Tt,
          extraInfo: {
            functionName: s
          }
        })), Promise.reject(e);
      });
    };
  e.callFunction = function (t) {
    var _e$config = e.config,
      s = _e$config.provider,
      r = _e$config.spaceId,
      i = t.name;
    var o, a;
    if (t.data = t.data || {}, b && e.__dev__.debugInfo && !e.__dev__.debugInfo.forceRemote && E ? (e._callCloudFunction || (e._callCloudFunction = n, e._callLocalFunction = Ct), o = Ct) : o = n, o = o.bind(e), An(t)) a = n.call(e, t);else if (function (_ref35) {
      var e = _ref35.name,
        _ref35$data = _ref35.data,
        t = _ref35$data === void 0 ? {} : _ref35$data;
      return "mp-weixin" === P && "uni-id-co" === e && "secureNetworkHandshakeByWeixin" === t.method;
    }(t)) a = o.call(e, t);else if (Pn(t)) {
      a = new Sn({
        secretType: t.secretType,
        uniCloudIns: e
      }).wrapEncryptDataCallFunction(n.bind(e))(t);
    } else if (En({
      provider: s,
      spaceId: r,
      functionName: i
    })) {
      a = new Sn({
        secretType: t.secretType,
        uniCloudIns: e
      }).wrapVerifyClientCallFunction(n.bind(e))(t);
    } else a = o(t);
    return Object.defineProperty(a, "result", {
      get: function get() {
        return console.warn("当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {};
      }
    }), a;
  };
}
Sn = "mp-weixin" !== P && "app" !== P ? /*#__PURE__*/function () {
  function _class2() {
    (0, _classCallCheck2.default)(this, _class2);
    throw vn({
      message: "Platform ".concat(P, " is not supported by secure network")
    });
  }
  return (0, _createClass2.default)(_class2);
}() : C ? "mp-weixin" === P ? kn : Tn : /*#__PURE__*/function () {
  function _class3() {
    (0, _classCallCheck2.default)(this, _class3);
    throw vn({
      message: "Platform ".concat(P, " is not enabled, please check whether secure network module is enabled in your manifest.json")
    });
  }
  return (0, _createClass2.default)(_class3);
}();
var Rn = Symbol("CLIENT_DB_INTERNAL");
function Un(e, t) {
  return e.then = "DoNotReturnProxyWithAFunctionNamedThen", e._internalType = Rn, e.inspect = null, e.__ob__ = void 0, new Proxy(e, {
    get: function get(e, n, s) {
      if ("_uniClient" === n) return null;
      if ("symbol" == (0, _typeof2.default)(n)) return e[n];
      if (n in e || "string" != typeof n) {
        var _t10 = e[n];
        return "function" == typeof _t10 ? _t10.bind(e) : _t10;
      }
      return t.get(e, n, s);
    }
  });
}
function Ln(e) {
  return {
    on: function on(t, n) {
      e[t] = e[t] || [], e[t].indexOf(n) > -1 || e[t].push(n);
    },
    off: function off(t, n) {
      e[t] = e[t] || [];
      var s = e[t].indexOf(n);
      -1 !== s && e[t].splice(s, 1);
    }
  };
}
var Nn = ["db.Geo", "db.command", "command.aggregate"];
function Dn(e, t) {
  return Nn.indexOf("".concat(e, ".").concat(t)) > -1;
}
function Fn(e) {
  switch (g(e)) {
    case "array":
      return e.map(function (e) {
        return Fn(e);
      });
    case "object":
      return e._internalType === Rn || Object.keys(e).forEach(function (t) {
        e[t] = Fn(e[t]);
      }), e;
    case "regexp":
      return {
        $regexp: {
          source: e.source,
          flags: e.flags
        }
      };
    case "date":
      return {
        $date: e.toISOString()
      };
    default:
      return e;
  }
}
function qn(e) {
  return e && e.content && e.content.$method;
}
var Mn = /*#__PURE__*/function () {
  function Mn(e, t, n) {
    (0, _classCallCheck2.default)(this, Mn);
    this.content = e, this.prevStage = t || null, this.udb = null, this._database = n;
  }
  (0, _createClass2.default)(Mn, [{
    key: "toJSON",
    value: function toJSON() {
      var e = this;
      var t = [e.content];
      for (; e.prevStage;) {
        e = e.prevStage, t.push(e.content);
      }
      return {
        $db: t.reverse().map(function (e) {
          return {
            $method: e.$method,
            $param: Fn(e.$param)
          };
        })
      };
    }
  }, {
    key: "toString",
    value: function toString() {
      return JSON.stringify(this.toJSON());
    }
  }, {
    key: "getAction",
    value: function getAction() {
      var e = this.toJSON().$db.find(function (e) {
        return "action" === e.$method;
      });
      return e && e.$param && e.$param[0];
    }
  }, {
    key: "getCommand",
    value: function getCommand() {
      return {
        $db: this.toJSON().$db.filter(function (e) {
          return "action" !== e.$method;
        })
      };
    }
  }, {
    key: "isAggregate",
    get: function get() {
      var e = this;
      for (; e;) {
        var t = qn(e),
          _n8 = qn(e.prevStage);
        if ("aggregate" === t && "collection" === _n8 || "pipeline" === t) return !0;
        e = e.prevStage;
      }
      return !1;
    }
  }, {
    key: "isCommand",
    get: function get() {
      var e = this;
      for (; e;) {
        if ("command" === qn(e)) return !0;
        e = e.prevStage;
      }
      return !1;
    }
  }, {
    key: "isAggregateCommand",
    get: function get() {
      var e = this;
      for (; e;) {
        var t = qn(e),
          _n9 = qn(e.prevStage);
        if ("aggregate" === t && "command" === _n9) return !0;
        e = e.prevStage;
      }
      return !1;
    }
  }, {
    key: "getNextStageFn",
    value: function getNextStageFn(e) {
      var t = this;
      return function () {
        return Kn({
          $method: e,
          $param: Fn(Array.from(arguments))
        }, t, t._database);
      };
    }
  }, {
    key: "count",
    get: function get() {
      return this.isAggregate ? this.getNextStageFn("count") : function () {
        return this._send("count", Array.from(arguments));
      };
    }
  }, {
    key: "remove",
    get: function get() {
      return this.isCommand ? this.getNextStageFn("remove") : function () {
        return this._send("remove", Array.from(arguments));
      };
    }
  }, {
    key: "get",
    value: function get() {
      return this._send("get", Array.from(arguments));
    }
  }, {
    key: "add",
    get: function get() {
      return this.isCommand ? this.getNextStageFn("add") : function () {
        return this._send("add", Array.from(arguments));
      };
    }
  }, {
    key: "update",
    value: function update() {
      return this._send("update", Array.from(arguments));
    }
  }, {
    key: "end",
    value: function end() {
      return this._send("end", Array.from(arguments));
    }
  }, {
    key: "set",
    get: function get() {
      return this.isCommand ? this.getNextStageFn("set") : function () {
        throw new Error("JQL禁止使用set方法");
      };
    }
  }, {
    key: "_send",
    value: function _send(e, t) {
      var n = this.getAction(),
        s = this.getCommand();
      if (s.$db.push({
        $method: e,
        $param: Fn(t)
      }), b) {
        var _e22 = s.$db.find(function (e) {
            return "collection" === e.$method;
          }),
          _t11 = _e22 && _e22.$param;
        _t11 && 1 === _t11.length && "string" == typeof _e22.$param[0] && _e22.$param[0].indexOf(",") > -1 && console.warn("检测到使用JQL语法联表查询时，未使用getTemp先过滤主表数据，在主表数据量大的情况下可能会查询缓慢。\n- 如何优化请参考此文档：https://uniapp.dcloud.net.cn/uniCloud/jql?id=lookup-with-temp \n- 如果主表数据量很小请忽略此信息，项目发行时不会出现此提示。");
      }
      return this._database._callCloudFunction({
        action: n,
        command: s
      });
    }
  }]);
  return Mn;
}();
function Kn(e, t, n) {
  return Un(new Mn(e, t, n), {
    get: function get(e, t) {
      var s = "db";
      return e && e.content && (s = e.content.$method), Dn(s, t) ? Kn({
        $method: t
      }, e, n) : function () {
        return Kn({
          $method: t,
          $param: Fn(Array.from(arguments))
        }, e, n);
      };
    }
  });
}
function jn(_ref36) {
  var e = _ref36.path,
    t = _ref36.method;
  return /*#__PURE__*/function () {
    function _class4() {
      (0, _classCallCheck2.default)(this, _class4);
      this.param = Array.from(arguments);
    }
    (0, _createClass2.default)(_class4, [{
      key: "toJSON",
      value: function toJSON() {
        return {
          $newDb: [].concat((0, _toConsumableArray2.default)(e.map(function (e) {
            return {
              $method: e
            };
          })), [{
            $method: t,
            $param: this.param
          }])
        };
      }
    }, {
      key: "toString",
      value: function toString() {
        return JSON.stringify(this.toJSON());
      }
    }]);
    return _class4;
  }();
}
function Bn(e) {
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Un(new e(t), {
    get: function get(e, t) {
      return Dn("db", t) ? Kn({
        $method: t
      }, null, e) : function () {
        return Kn({
          $method: t,
          $param: Fn(Array.from(arguments))
        }, null, e);
      };
    }
  });
}
var $n = /*#__PURE__*/function (_ref37) {
  (0, _inherits2.default)($n, _ref37);
  var _super11 = _createSuper($n);
  function $n() {
    (0, _classCallCheck2.default)(this, $n);
    return _super11.apply(this, arguments);
  }
  (0, _createClass2.default)($n, [{
    key: "_parseResult",
    value: function _parseResult(e) {
      return this._isJQL ? e.result : e;
    }
  }, {
    key: "_callCloudFunction",
    value: function _callCloudFunction(_ref38) {
      var _this19 = this;
      var e = _ref38.action,
        t = _ref38.command,
        n = _ref38.multiCommand,
        s = _ref38.queryList;
      function r(e, t) {
        if (n && s) for (var _n10 = 0; _n10 < s.length; _n10++) {
          var _r5 = s[_n10];
          _r5.udb && "function" == typeof _r5.udb.setResult && (t ? _r5.udb.setResult(t) : _r5.udb.setResult(e.result.dataList[_n10]));
        }
      }
      var i = this,
        o = this._isJQL ? "databaseForJQL" : "database";
      function a(e) {
        return i._callback("error", [e]), q(M(o, "fail"), e).then(function () {
          return q(M(o, "complete"), e);
        }).then(function () {
          return r(null, e), Q(B, {
            type: z,
            content: e
          }), Promise.reject(e);
        });
      }
      var c = q(M(o, "invoke")),
        u = this._uniClient;
      return c.then(function () {
        return u.callFunction({
          name: "DCloud-clientDB",
          type: l,
          data: {
            action: e,
            command: t,
            multiCommand: n
          }
        });
      }).then(function (e) {
        var _e$result = e.result,
          t = _e$result.code,
          n = _e$result.message,
          s = _e$result.token,
          c = _e$result.tokenExpired,
          _e$result$systemInfo = _e$result.systemInfo,
          u = _e$result$systemInfo === void 0 ? [] : _e$result$systemInfo;
        if (u) for (var _e23 = 0; _e23 < u.length; _e23++) {
          var _u$_e = u[_e23],
            _t12 = _u$_e.level,
            _n11 = _u$_e.message,
            _s13 = _u$_e.detail,
            _r6 = console["app" === P && "warn" === _t12 ? "error" : _t12] || console.log;
          var _i4 = "[System Info]" + _n11;
          _s13 && (_i4 = "".concat(_i4, "\n\u8BE6\u7EC6\u4FE1\u606F\uFF1A").concat(_s13)), _r6(_i4);
        }
        if (t) {
          return a(new ne({
            code: t,
            message: n,
            requestId: e.requestId
          }));
        }
        e.result.errCode = e.result.errCode || e.result.code, e.result.errMsg = e.result.errMsg || e.result.message, s && c && (ie({
          token: s,
          tokenExpired: c
        }), _this19._callbackAuth("refreshToken", [{
          token: s,
          tokenExpired: c
        }]), _this19._callback("refreshToken", [{
          token: s,
          tokenExpired: c
        }]), Q(W, {
          token: s,
          tokenExpired: c
        }));
        var h = [{
          prop: "affectedDocs",
          tips: "affectedDocs不再推荐使用，请使用inserted/deleted/updated/data.length替代"
        }, {
          prop: "code",
          tips: "code不再推荐使用，请使用errCode替代"
        }, {
          prop: "message",
          tips: "message不再推荐使用，请使用errMsg替代"
        }];
        var _loop2 = function _loop2(_t13) {
          var _h$_t = h[_t13],
            n = _h$_t.prop,
            s = _h$_t.tips;
          if (n in e.result) {
            var _t14 = e.result[n];
            Object.defineProperty(e.result, n, {
              get: function get() {
                return console.warn(s), _t14;
              }
            });
          }
        };
        for (var _t13 = 0; _t13 < h.length; _t13++) {
          _loop2(_t13);
        }
        return function (e) {
          return q(M(o, "success"), e).then(function () {
            return q(M(o, "complete"), e);
          }).then(function () {
            r(e, null);
            var t = i._parseResult(e);
            return Q(B, {
              type: z,
              content: t
            }), Promise.resolve(t);
          });
        }(e);
      }, function (e) {
        /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e.message) && console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB");
        return a(new ne({
          code: e.code || "SYSTEM_ERROR",
          message: e.message,
          requestId: e.requestId
        }));
      });
    }
  }]);
  return $n;
}( /*#__PURE__*/function () {
  function _class5() {
    var _ref39 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref39$uniClient = _ref39.uniClient,
      e = _ref39$uniClient === void 0 ? {} : _ref39$uniClient,
      _ref39$isJQL = _ref39.isJQL,
      t = _ref39$isJQL === void 0 ? !1 : _ref39$isJQL;
    (0, _classCallCheck2.default)(this, _class5);
    this._uniClient = e, this._authCallBacks = {}, this._dbCallBacks = {}, e._isDefault && (this._dbCallBacks = U("_globalUniCloudDatabaseCallback")), t || (this.auth = Ln(this._authCallBacks)), this._isJQL = t, Object.assign(this, Ln(this._dbCallBacks)), this.env = Un({}, {
      get: function get(e, t) {
        return {
          $env: t
        };
      }
    }), this.Geo = Un({}, {
      get: function get(e, t) {
        return jn({
          path: ["Geo"],
          method: t
        });
      }
    }), this.serverDate = jn({
      path: [],
      method: "serverDate"
    }), this.RegExp = jn({
      path: [],
      method: "RegExp"
    });
  }
  (0, _createClass2.default)(_class5, [{
    key: "getCloudEnv",
    value: function getCloudEnv(e) {
      if ("string" != typeof e || !e.trim()) throw new Error("getCloudEnv参数错误");
      return {
        $env: e.replace("$cloudEnv_", "")
      };
    }
  }, {
    key: "_callback",
    value: function _callback(e, t) {
      var n = this._dbCallBacks;
      n[e] && n[e].forEach(function (e) {
        e.apply(void 0, (0, _toConsumableArray2.default)(t));
      });
    }
  }, {
    key: "_callbackAuth",
    value: function _callbackAuth(e, t) {
      var n = this._authCallBacks;
      n[e] && n[e].forEach(function (e) {
        e.apply(void 0, (0, _toConsumableArray2.default)(t));
      });
    }
  }, {
    key: "multiSend",
    value: function multiSend() {
      var e = Array.from(arguments),
        t = e.map(function (e) {
          var t = e.getAction(),
            n = e.getCommand();
          if ("getTemp" !== n.$db[n.$db.length - 1].$method) throw new Error("multiSend只支持子命令内使用getTemp");
          return {
            action: t,
            command: n
          };
        });
      return this._callCloudFunction({
        multiCommand: t,
        queryList: e
      });
    }
  }]);
  return _class5;
}());
var Wn = "token无效，跳转登录页面",
  zn = "token过期，跳转登录页面",
  Jn = {
    TOKEN_INVALID_TOKEN_EXPIRED: zn,
    TOKEN_INVALID_INVALID_CLIENTID: Wn,
    TOKEN_INVALID: Wn,
    TOKEN_INVALID_WRONG_TOKEN: Wn,
    TOKEN_INVALID_ANONYMOUS_USER: Wn
  },
  Hn = {
    "uni-id-token-expired": zn,
    "uni-id-check-token-failed": Wn,
    "uni-id-token-not-exist": Wn,
    "uni-id-check-device-feature-failed": Wn
  };
function Gn(e, t) {
  var n = "";
  return n = e ? "".concat(e, "/").concat(t) : t, n.replace(/^\//, "");
}
function Vn() {
  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var n = [],
    s = [];
  return e.forEach(function (e) {
    !0 === e.needLogin ? n.push(Gn(t, e.path)) : !1 === e.needLogin && s.push(Gn(t, e.path));
  }), {
    needLoginPage: n,
    notNeedLoginPage: s
  };
}
function Yn(e) {
  return e.split("?")[0].replace(/^\//, "");
}
function Qn() {
  return function (e) {
    var t = e && e.$page && e.$page.fullPath || "";
    return t ? ("/" !== t.charAt(0) && (t = "/" + t), t) : t;
  }(function () {
    var e = getCurrentPages();
    return e[e.length - 1];
  }());
}
function Xn() {
  return Yn(Qn());
}
function Zn() {
  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!e) return !1;
  if (!(t && t.list && t.list.length)) return !1;
  var n = t.list,
    s = Yn(e);
  return n.some(function (e) {
    return e.pagePath === s;
  });
}
var es = !!_pages.default.uniIdRouter;
var _ref40 = function () {
    var _ref21 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _pages.default,
      _ref21$pages = _ref21.pages,
      e = _ref21$pages === void 0 ? [] : _ref21$pages,
      _ref21$subPackages = _ref21.subPackages,
      n = _ref21$subPackages === void 0 ? [] : _ref21$subPackages,
      _ref21$uniIdRouter = _ref21.uniIdRouter,
      s = _ref21$uniIdRouter === void 0 ? {} : _ref21$uniIdRouter,
      _ref21$tabBar = _ref21.tabBar,
      r = _ref21$tabBar === void 0 ? {} : _ref21$tabBar;
    var i = s.loginPage,
      _s$needLogin = s.needLogin,
      o = _s$needLogin === void 0 ? [] : _s$needLogin,
      _s$resToLogin = s.resToLogin,
      a = _s$resToLogin === void 0 ? !0 : _s$resToLogin,
      _Vn = Vn(e),
      c = _Vn.needLoginPage,
      u = _Vn.notNeedLoginPage,
      _ref23 = function () {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var t = [],
          n = [];
        return e.forEach(function (e) {
          var s = e.root,
            _e$pages = e.pages,
            r = _e$pages === void 0 ? [] : _e$pages,
            _Vn2 = Vn(r, s),
            i = _Vn2.needLoginPage,
            o = _Vn2.notNeedLoginPage;
          t.push.apply(t, (0, _toConsumableArray2.default)(i)), n.push.apply(n, (0, _toConsumableArray2.default)(o));
        }), {
          needLoginPage: t,
          notNeedLoginPage: n
        };
      }(n),
      h = _ref23.needLoginPage,
      l = _ref23.notNeedLoginPage;
    return {
      loginPage: i,
      routerNeedLogin: o,
      resToLogin: a,
      needLoginPage: [].concat((0, _toConsumableArray2.default)(c), (0, _toConsumableArray2.default)(h)),
      notNeedLoginPage: [].concat((0, _toConsumableArray2.default)(u), (0, _toConsumableArray2.default)(l)),
      loginPageInTabBar: Zn(i, r)
    };
  }(),
  ts = _ref40.loginPage,
  ns = _ref40.routerNeedLogin,
  ss = _ref40.resToLogin,
  rs = _ref40.needLoginPage,
  is = _ref40.notNeedLoginPage,
  os = _ref40.loginPageInTabBar;
if (rs.indexOf(ts) > -1) throw new Error("Login page [".concat(ts, "] should not be \"needLogin\", please check your pages.json"));
function as(e) {
  var t = Xn();
  if ("/" === e.charAt(0)) return e;
  var _e$split = e.split("?"),
    _e$split2 = (0, _slicedToArray2.default)(_e$split, 2),
    n = _e$split2[0],
    s = _e$split2[1],
    r = n.replace(/^\//, "").split("/"),
    i = t.split("/");
  i.pop();
  for (var _e24 = 0; _e24 < r.length; _e24++) {
    var _t15 = r[_e24];
    ".." === _t15 ? i.pop() : "." !== _t15 && i.push(_t15);
  }
  return "" === i[0] && i.shift(), "/" + i.join("/") + (s ? "?" + s : "");
}
function cs(e) {
  var t = Yn(as(e));
  return !(is.indexOf(t) > -1) && (rs.indexOf(t) > -1 || ns.some(function (t) {
    return function (e, t) {
      return new RegExp(t).test(e);
    }(e, t);
  }));
}
function us(_ref41) {
  var e = _ref41.redirect;
  var t = Yn(e),
    n = Yn(ts);
  return Xn() !== n && t !== n;
}
function hs() {
  var _ref42 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    e = _ref42.api,
    t = _ref42.redirect;
  if (!t || !us({
    redirect: t
  })) return;
  var n = function (e, t) {
    return "/" !== e.charAt(0) && (e = "/" + e), t ? e.indexOf("?") > -1 ? e + "&uniIdRedirectUrl=".concat(encodeURIComponent(t)) : e + "?uniIdRedirectUrl=".concat(encodeURIComponent(t)) : e;
  }(ts, t);
  os ? "navigateTo" !== e && "redirectTo" !== e || (e = "switchTab") : "switchTab" === e && (e = "navigateTo");
  var s = {
    navigateTo: uni.navigateTo,
    redirectTo: uni.redirectTo,
    switchTab: uni.switchTab,
    reLaunch: uni.reLaunch
  };
  setTimeout(function () {
    s[e]({
      url: n
    });
  });
}
function ls() {
  var _ref43 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    e = _ref43.url;
  var t = {
      abortLoginPageJump: !1,
      autoToLoginPage: !1
    },
    n = function () {
      var _re3 = re(),
        e = _re3.token,
        t = _re3.tokenExpired;
      var n;
      if (e) {
        if (t < Date.now()) {
          var _e25 = "uni-id-token-expired";
          n = {
            errCode: _e25,
            errMsg: Hn[_e25]
          };
        }
      } else {
        var _e26 = "uni-id-check-token-failed";
        n = {
          errCode: _e26,
          errMsg: Hn[_e26]
        };
      }
      return n;
    }();
  if (cs(e) && n) {
    n.uniIdRedirectUrl = e;
    if (G($).length > 0) return setTimeout(function () {
      Q($, n);
    }, 0), t.abortLoginPageJump = !0, t;
    t.autoToLoginPage = !0;
  }
  return t;
}
function ds() {
  !function () {
    var e = Qn(),
      _ls = ls({
        url: e
      }),
      t = _ls.abortLoginPageJump,
      n = _ls.autoToLoginPage;
    t || n && hs({
      api: "redirectTo",
      redirect: e
    });
  }();
  var e = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
  var _loop3 = function _loop3(_t16) {
    var n = e[_t16];
    uni.addInterceptor(n, {
      invoke: function invoke(e) {
        var _ls2 = ls({
            url: e.url
          }),
          t = _ls2.abortLoginPageJump,
          s = _ls2.autoToLoginPage;
        return t ? e : s ? (hs({
          api: n,
          redirect: as(e.url)
        }), !1) : e;
      }
    });
  };
  for (var _t16 = 0; _t16 < e.length; _t16++) {
    _loop3(_t16);
  }
}
function ps() {
  this.onResponse(function (e) {
    var t = e.type,
      n = e.content;
    var s = !1;
    switch (t) {
      case "cloudobject":
        s = function (e) {
          if ("object" != (0, _typeof2.default)(e)) return !1;
          var _ref44 = e || {},
            t = _ref44.errCode;
          return t in Hn;
        }(n);
        break;
      case "clientdb":
        s = function (e) {
          if ("object" != (0, _typeof2.default)(e)) return !1;
          var _ref45 = e || {},
            t = _ref45.errCode;
          return t in Jn;
        }(n);
    }
    s && function () {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var t = G($);
      ee().then(function () {
        var n = Qn();
        if (n && us({
          redirect: n
        })) return t.length > 0 ? Q($, Object.assign({
          uniIdRedirectUrl: n
        }, e)) : void (ts && hs({
          api: "navigateTo",
          redirect: n
        }));
      });
    }(n);
  });
}
function fs(e) {
  !function (e) {
    e.onResponse = function (e) {
      V(B, e);
    }, e.offResponse = function (e) {
      Y(B, e);
    };
  }(e), function (e) {
    e.onNeedLogin = function (e) {
      V($, e);
    }, e.offNeedLogin = function (e) {
      Y($, e);
    }, es && (U("_globalUniCloudStatus").needLoginInit || (U("_globalUniCloudStatus").needLoginInit = !0, ee().then(function () {
      ds.call(e);
    }), ss && ps.call(e)));
  }(e), function (e) {
    e.onRefreshToken = function (e) {
      V(W, e);
    }, e.offRefreshToken = function (e) {
      Y(W, e);
    };
  }(e);
}
var gs;
var ms = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  ys = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
function _s() {
  var e = re().token || "",
    t = e.split(".");
  if (!e || 3 !== t.length) return {
    uid: null,
    role: [],
    permission: [],
    tokenExpired: 0
  };
  var n;
  try {
    n = JSON.parse((s = t[1], decodeURIComponent(gs(s).split("").map(function (e) {
      return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2);
    }).join(""))));
  } catch (e) {
    throw new Error("获取当前用户信息出错，详细错误信息为：" + e.message);
  }
  var s;
  return n.tokenExpired = 1e3 * n.exp, delete n.exp, delete n.iat, n;
}
gs = "function" != typeof atob ? function (e) {
  if (e = String(e).replace(/[\t\n\f\r ]+/g, ""), !ys.test(e)) throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
  var t;
  e += "==".slice(2 - (3 & e.length));
  for (var n, s, r = "", i = 0; i < e.length;) {
    t = ms.indexOf(e.charAt(i++)) << 18 | ms.indexOf(e.charAt(i++)) << 12 | (n = ms.indexOf(e.charAt(i++))) << 6 | (s = ms.indexOf(e.charAt(i++))), r += 64 === n ? String.fromCharCode(t >> 16 & 255) : 64 === s ? String.fromCharCode(t >> 16 & 255, t >> 8 & 255) : String.fromCharCode(t >> 16 & 255, t >> 8 & 255, 255 & t);
  }
  return r;
} : atob;
var ws = s(function (e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var n = "chooseAndUploadFile:ok",
      s = "chooseAndUploadFile:fail";
    function r(e, t) {
      return e.tempFiles.forEach(function (e, n) {
        e.name || (e.name = e.path.substring(e.path.lastIndexOf("/") + 1)), t && (e.fileType = t), e.cloudPath = Date.now() + "_" + n + e.name.substring(e.name.lastIndexOf("."));
      }), e.tempFilePaths || (e.tempFilePaths = e.tempFiles.map(function (e) {
        return e.path;
      })), e;
    }
    function i(e, t, _ref46) {
      var s = _ref46.onChooseFile,
        r = _ref46.onUploadProgress;
      return t.then(function (e) {
        if (s) {
          var _t17 = s(e);
          if (void 0 !== _t17) return Promise.resolve(_t17).then(function (t) {
            return void 0 === t ? e : t;
          });
        }
        return e;
      }).then(function (t) {
        return !1 === t ? {
          errMsg: n,
          tempFilePaths: [],
          tempFiles: []
        } : function (e, t) {
          var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;
          var r = arguments.length > 3 ? arguments[3] : undefined;
          (t = Object.assign({}, t)).errMsg = n;
          var i = t.tempFiles,
            o = i.length;
          var a = 0;
          return new Promise(function (n) {
            for (; a < s;) {
              c();
            }
            function c() {
              var s = a++;
              if (s >= o) return void (!i.find(function (e) {
                return !e.url && !e.errMsg;
              }) && n(t));
              var u = i[s];
              e.uploadFile({
                filePath: u.path,
                cloudPath: u.cloudPath,
                fileType: u.fileType,
                onUploadProgress: function onUploadProgress(e) {
                  e.index = s, e.tempFile = u, e.tempFilePath = u.path, r && r(e);
                }
              }).then(function (e) {
                u.url = e.fileID, s < o && c();
              }).catch(function (e) {
                u.errMsg = e.errMsg || e.message, s < o && c();
              });
            }
          });
        }(e, t, 5, r);
      });
    }
    t.initChooseAndUploadFile = function (e) {
      return function () {
        var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
          type: "all"
        };
        return "image" === t.type ? i(e, function (e) {
          var t = e.count,
            n = e.sizeType,
            _e$sourceType = e.sourceType,
            i = _e$sourceType === void 0 ? ["album", "camera"] : _e$sourceType,
            o = e.extension;
          return new Promise(function (e, a) {
            uni.chooseImage({
              count: t,
              sizeType: n,
              sourceType: i,
              extension: o,
              success: function success(t) {
                e(r(t, "image"));
              },
              fail: function fail(e) {
                a({
                  errMsg: e.errMsg.replace("chooseImage:fail", s)
                });
              }
            });
          });
        }(t), t) : "video" === t.type ? i(e, function (e) {
          var t = e.camera,
            n = e.compressed,
            i = e.maxDuration,
            _e$sourceType2 = e.sourceType,
            o = _e$sourceType2 === void 0 ? ["album", "camera"] : _e$sourceType2,
            a = e.extension;
          return new Promise(function (e, c) {
            uni.chooseVideo({
              camera: t,
              compressed: n,
              maxDuration: i,
              sourceType: o,
              extension: a,
              success: function success(t) {
                var n = t.tempFilePath,
                  s = t.duration,
                  i = t.size,
                  o = t.height,
                  a = t.width;
                e(r({
                  errMsg: "chooseVideo:ok",
                  tempFilePaths: [n],
                  tempFiles: [{
                    name: t.tempFile && t.tempFile.name || "",
                    path: n,
                    size: i,
                    type: t.tempFile && t.tempFile.type || "",
                    width: a,
                    height: o,
                    duration: s,
                    fileType: "video",
                    cloudPath: ""
                  }]
                }, "video"));
              },
              fail: function fail(e) {
                c({
                  errMsg: e.errMsg.replace("chooseVideo:fail", s)
                });
              }
            });
          });
        }(t), t) : i(e, function (e) {
          var t = e.count,
            n = e.extension;
          return new Promise(function (e, i) {
            var o = uni.chooseFile;
            if ("undefined" != typeof wx && "function" == typeof wx.chooseMessageFile && (o = wx.chooseMessageFile), "function" != typeof o) return i({
              errMsg: s + " 请指定 type 类型，该平台仅支持选择 image 或 video。"
            });
            o({
              type: "all",
              count: t,
              extension: n,
              success: function success(t) {
                e(r(t));
              },
              fail: function fail(e) {
                i({
                  errMsg: e.errMsg.replace("chooseFile:fail", s)
                });
              }
            });
          });
        }(t), t);
      };
    };
  }),
  vs = n(ws);
var Is = "manual";
function Ss(e) {
  return {
    props: {
      localdata: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      options: {
        type: [Object, Array],
        default: function _default() {
          return {};
        }
      },
      spaceInfo: {
        type: Object,
        default: function _default() {
          return {};
        }
      },
      collection: {
        type: [String, Array],
        default: ""
      },
      action: {
        type: String,
        default: ""
      },
      field: {
        type: String,
        default: ""
      },
      orderby: {
        type: String,
        default: ""
      },
      where: {
        type: [String, Object],
        default: ""
      },
      pageData: {
        type: String,
        default: "add"
      },
      pageCurrent: {
        type: Number,
        default: 1
      },
      pageSize: {
        type: Number,
        default: 20
      },
      getcount: {
        type: [Boolean, String],
        default: !1
      },
      gettree: {
        type: [Boolean, String],
        default: !1
      },
      gettreepath: {
        type: [Boolean, String],
        default: !1
      },
      startwith: {
        type: String,
        default: ""
      },
      limitlevel: {
        type: Number,
        default: 10
      },
      groupby: {
        type: String,
        default: ""
      },
      groupField: {
        type: String,
        default: ""
      },
      distinct: {
        type: [Boolean, String],
        default: !1
      },
      foreignKey: {
        type: String,
        default: ""
      },
      loadtime: {
        type: String,
        default: "auto"
      },
      manual: {
        type: Boolean,
        default: !1
      }
    },
    data: function data() {
      return {
        mixinDatacomLoading: !1,
        mixinDatacomHasMore: !1,
        mixinDatacomResData: [],
        mixinDatacomErrorMessage: "",
        mixinDatacomPage: {}
      };
    },
    created: function created() {
      var _this20 = this;
      this.mixinDatacomPage = {
        current: this.pageCurrent,
        size: this.pageSize,
        count: 0
      }, this.$watch(function () {
        var e = [];
        return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach(function (t) {
          e.push(_this20[t]);
        }), e;
      }, function (e, t) {
        if (_this20.loadtime === Is) return;
        var n = !1;
        var s = [];
        for (var _r7 = 2; _r7 < e.length; _r7++) {
          e[_r7] !== t[_r7] && (s.push(e[_r7]), n = !0);
        }
        e[0] !== t[0] && (_this20.mixinDatacomPage.current = _this20.pageCurrent), _this20.mixinDatacomPage.size = _this20.pageSize, _this20.onMixinDatacomPropsChange(n, s);
      });
    },
    methods: {
      onMixinDatacomPropsChange: function onMixinDatacomPropsChange(e, t) {},
      mixinDatacomEasyGet: function mixinDatacomEasyGet() {
        var _this21 = this;
        var _ref47 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref47$getone = _ref47.getone,
          e = _ref47$getone === void 0 ? !1 : _ref47$getone,
          t = _ref47.success,
          n = _ref47.fail;
        this.mixinDatacomLoading || (this.mixinDatacomLoading = !0, this.mixinDatacomErrorMessage = "", this.mixinDatacomGet().then(function (n) {
          _this21.mixinDatacomLoading = !1;
          var _n$result = n.result,
            s = _n$result.data,
            r = _n$result.count;
          _this21.getcount && (_this21.mixinDatacomPage.count = r), _this21.mixinDatacomHasMore = s.length < _this21.pageSize;
          var i = e ? s.length ? s[0] : void 0 : s;
          _this21.mixinDatacomResData = i, t && t(i);
        }).catch(function (e) {
          _this21.mixinDatacomLoading = !1, _this21.mixinDatacomErrorMessage = e, n && n(e);
        }));
      },
      mixinDatacomGet: function mixinDatacomGet() {
        var _n12;
        var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var n = e.database(this.spaceInfo);
        var s = t.action || this.action;
        s && (n = n.action(s));
        var r = t.collection || this.collection;
        n = Array.isArray(r) ? (_n12 = n).collection.apply(_n12, (0, _toConsumableArray2.default)(r)) : n.collection(r);
        var i = t.where || this.where;
        i && Object.keys(i).length && (n = n.where(i));
        var o = t.field || this.field;
        o && (n = n.field(o));
        var a = t.foreignKey || this.foreignKey;
        a && (n = n.foreignKey(a));
        var c = t.groupby || this.groupby;
        c && (n = n.groupBy(c));
        var u = t.groupField || this.groupField;
        u && (n = n.groupField(u));
        !0 === (void 0 !== t.distinct ? t.distinct : this.distinct) && (n = n.distinct());
        var h = t.orderby || this.orderby;
        h && (n = n.orderBy(h));
        var l = void 0 !== t.pageCurrent ? t.pageCurrent : this.mixinDatacomPage.current,
          d = void 0 !== t.pageSize ? t.pageSize : this.mixinDatacomPage.size,
          p = void 0 !== t.getcount ? t.getcount : this.getcount,
          f = void 0 !== t.gettree ? t.gettree : this.gettree,
          g = void 0 !== t.gettreepath ? t.gettreepath : this.gettreepath,
          m = {
            getCount: p
          },
          y = {
            limitLevel: void 0 !== t.limitlevel ? t.limitlevel : this.limitlevel,
            startWith: void 0 !== t.startwith ? t.startwith : this.startwith
          };
        return f && (m.getTree = y), g && (m.getTreePath = y), n = n.skip(d * (l - 1)).limit(d).get(m), n;
      }
    }
  };
}
function bs(e) {
  return function (t) {
    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    n = function (e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return e.customUI = t.customUI || e.customUI, e.parseSystemError = t.parseSystemError || e.parseSystemError, Object.assign(e.loadingOptions, t.loadingOptions), Object.assign(e.errorOptions, t.errorOptions), "object" == (0, _typeof2.default)(t.secretMethods) && (e.secretMethods = t.secretMethods), e;
    }({
      customUI: !1,
      loadingOptions: {
        title: "加载中...",
        mask: !0
      },
      errorOptions: {
        type: "modal",
        retry: !1
      }
    }, n);
    var _n13 = n,
      s = _n13.customUI,
      r = _n13.loadingOptions,
      i = _n13.errorOptions,
      o = _n13.parseSystemError,
      a = !s;
    return new Proxy({}, {
      get: function get(s, c) {
        return function () {
          var _ref48 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            e = _ref48.fn,
            t = _ref48.interceptorName,
            n = _ref48.getCallbackArgs;
          return /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee50() {
            var _len2,
              s,
              _key2,
              r,
              i,
              o,
              _args = arguments;
            return _regenerator.default.wrap(function _callee50$(_context50) {
              while (1) {
                switch (_context50.prev = _context50.next) {
                  case 0:
                    for (_len2 = _args.length, s = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                      s[_key2] = _args[_key2];
                    }
                    r = n ? n({
                      params: s
                    }) : {};
                    _context50.prev = 2;
                    _context50.next = 5;
                    return q(M(t, "invoke"), _objectSpread({}, r));
                  case 5:
                    _context50.next = 7;
                    return e.apply(void 0, s);
                  case 7:
                    i = _context50.sent;
                    _context50.next = 10;
                    return q(M(t, "success"), _objectSpread(_objectSpread({}, r), {}, {
                      result: i
                    }));
                  case 10:
                    return _context50.abrupt("return", i);
                  case 13:
                    _context50.prev = 13;
                    _context50.t0 = _context50["catch"](2);
                    o = _context50.t0;
                    _context50.next = 18;
                    return q(M(t, "fail"), _objectSpread(_objectSpread({}, r), {}, {
                      error: o
                    }));
                  case 18:
                    throw o;
                  case 19:
                    _context50.prev = 19;
                    _context50.next = 22;
                    return q(M(t, "complete"), o ? _objectSpread(_objectSpread({}, r), {}, {
                      error: o
                    }) : _objectSpread(_objectSpread({}, r), {}, {
                      result: i
                    }));
                  case 22:
                    return _context50.finish(19);
                  case 23:
                  case "end":
                    return _context50.stop();
                }
              }
            }, _callee50, null, [[2, 13, 19, 23]]);
          }));
        }({
          fn: function () {
            var _s14 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee52() {
              var l,
                _len3,
                u,
                _key3,
                d,
                p,
                _ref50,
                f,
                g,
                m,
                y,
                _e27,
                _yield,
                _t18,
                _n14,
                _args4 = arguments;
              return _regenerator.default.wrap(function _callee52$(_context52) {
                while (1) {
                  switch (_context52.prev = _context52.next) {
                    case 0:
                      a && uni.showLoading({
                        title: r.title,
                        mask: r.mask
                      });
                      for (_len3 = _args4.length, u = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                        u[_key3] = _args4[_key3];
                      }
                      d = {
                        name: t,
                        type: h,
                        data: {
                          method: c,
                          params: u
                        }
                      };
                      "object" == (0, _typeof2.default)(n.secretMethods) && function (e, t) {
                        var n = t.data.method,
                          s = e.secretMethods || {},
                          r = s[n] || s["*"];
                        r && (t.secretType = r);
                      }(n, d);
                      p = !1;
                      _context52.prev = 5;
                      _context52.next = 8;
                      return e.callFunction(d);
                    case 8:
                      l = _context52.sent;
                      _context52.next = 14;
                      break;
                    case 11:
                      _context52.prev = 11;
                      _context52.t0 = _context52["catch"](5);
                      p = !0, l = {
                        result: new ne(_context52.t0)
                      };
                    case 14:
                      _ref50 = l.result || {}, f = _ref50.errSubject, g = _ref50.errCode, m = _ref50.errMsg, y = _ref50.newToken;
                      if (!(a && uni.hideLoading(), y && y.token && y.tokenExpired && (ie(y), Q(W, _objectSpread({}, y))), g)) {
                        _context52.next = 39;
                        break;
                      }
                      _e27 = m;
                      if (!(p && o)) {
                        _context52.next = 24;
                        break;
                      }
                      _context52.next = 20;
                      return o({
                        objectName: t,
                        methodName: c,
                        params: u,
                        errSubject: f,
                        errCode: g,
                        errMsg: m
                      });
                    case 20:
                      _context52.t1 = _context52.sent.errMsg;
                      if (_context52.t1) {
                        _context52.next = 23;
                        break;
                      }
                      _context52.t1 = m;
                    case 23:
                      _e27 = _context52.t1;
                    case 24:
                      if (!a) {
                        _context52.next = 37;
                        break;
                      }
                      if (!("toast" === i.type)) {
                        _context52.next = 29;
                        break;
                      }
                      uni.showToast({
                        title: _e27,
                        icon: "none"
                      });
                      _context52.next = 37;
                      break;
                    case 29:
                      if (!("modal" !== i.type)) {
                        _context52.next = 31;
                        break;
                      }
                      throw new Error("Invalid errorOptions.type: ".concat(i.type));
                    case 31:
                      _context52.next = 33;
                      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee51() {
                        var _ref52,
                          e,
                          t,
                          n,
                          s,
                          r,
                          _args2 = arguments;
                        return _regenerator.default.wrap(function _callee51$(_context51) {
                          while (1) {
                            switch (_context51.prev = _context51.next) {
                              case 0:
                                _ref52 = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {}, e = _ref52.title, t = _ref52.content, n = _ref52.showCancel, s = _ref52.cancelText, r = _ref52.confirmText;
                                return _context51.abrupt("return", new Promise(function (i, o) {
                                  uni.showModal({
                                    title: e,
                                    content: t,
                                    showCancel: n,
                                    cancelText: s,
                                    confirmText: r,
                                    success: function success(e) {
                                      i(e);
                                    },
                                    fail: function fail() {
                                      i({
                                        confirm: !1,
                                        cancel: !0
                                      });
                                    }
                                  });
                                }));
                              case 2:
                              case "end":
                                return _context51.stop();
                            }
                          }
                        }, _callee51);
                      }))({
                        title: "提示",
                        content: _e27,
                        showCancel: i.retry,
                        cancelText: "取消",
                        confirmText: i.retry ? "重试" : "确定"
                      });
                    case 33:
                      _yield = _context52.sent;
                      _t18 = _yield.confirm;
                      if (!(i.retry && _t18)) {
                        _context52.next = 37;
                        break;
                      }
                      return _context52.abrupt("return", s.apply(void 0, u));
                    case 37:
                      _n14 = new ne({
                        subject: f,
                        code: g,
                        message: m,
                        requestId: l.requestId
                      });
                      throw _n14.detail = l.result, Q(B, {
                        type: H,
                        content: _n14
                      }), _n14;
                    case 39:
                      return _context52.abrupt("return", (Q(B, {
                        type: H,
                        content: l.result
                      }), l.result));
                    case 40:
                    case "end":
                      return _context52.stop();
                  }
                }
              }, _callee52, null, [[5, 11]]);
            }));
            function s() {
              return _s14.apply(this, arguments);
            }
            return s;
          }(),
          interceptorName: "callObject",
          getCallbackArgs: function getCallbackArgs() {
            var _ref53 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              e = _ref53.params;
            return {
              objectName: t,
              methodName: c,
              params: e
            };
          }
        });
      }
    });
  };
}
function ks(e) {
  return U("_globalUniCloudSecureNetworkCache__{spaceId}".replace("{spaceId}", e.config.spaceId));
}
function Cs() {
  return _Cs.apply(this, arguments);
}
function _Cs() {
  _Cs = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee55() {
    var _ref65,
      e,
      _ref65$callLoginByWei,
      t,
      n,
      s,
      r,
      _args7 = arguments;
    return _regenerator.default.wrap(function _callee55$(_context55) {
      while (1) {
        switch (_context55.prev = _context55.next) {
          case 0:
            _ref65 = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {}, e = _ref65.openid, _ref65$callLoginByWei = _ref65.callLoginByWeixin, t = _ref65$callLoginByWei === void 0 ? !1 : _ref65$callLoginByWei;
            n = ks(this);
            if (!("mp-weixin" !== P)) {
              _context55.next = 4;
              break;
            }
            throw new Error("[SecureNetwork] API `initSecureNetworkByWeixin` is not supported on platform `".concat(P, "`"));
          case 4:
            if (!(e && t)) {
              _context55.next = 6;
              break;
            }
            throw new Error("[SecureNetwork] openid and callLoginByWeixin cannot be passed at the same time");
          case 6:
            if (!e) {
              _context55.next = 8;
              break;
            }
            return _context55.abrupt("return", (n.mpWeixinOpenid = e, {}));
          case 8:
            _context55.next = 10;
            return new Promise(function (e, t) {
              uni.login({
                success: function success(t) {
                  e(t.code);
                },
                fail: function fail(e) {
                  t(new Error(e.errMsg));
                }
              });
            });
          case 10:
            s = _context55.sent;
            r = this.importObject("uni-id-co", {
              customUI: !0
            });
            _context55.next = 14;
            return r.secureNetworkHandshakeByWeixin({
              code: s,
              callLoginByWeixin: t
            });
          case 14:
            n.mpWeixinCode = s;
            return _context55.abrupt("return", {
              code: s
            });
          case 16:
          case "end":
            return _context55.stop();
        }
      }
    }, _callee55, this);
  }));
  return _Cs.apply(this, arguments);
}
function Ts(_x37) {
  return _Ts.apply(this, arguments);
}
function _Ts() {
  _Ts = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee56(e) {
    var t;
    return _regenerator.default.wrap(function _callee56$(_context56) {
      while (1) {
        switch (_context56.prev = _context56.next) {
          case 0:
            t = ks(this);
            return _context56.abrupt("return", (t.initPromise || (t.initPromise = Cs.call(this, e)), t.initPromise));
          case 2:
          case "end":
            return _context56.stop();
        }
      }
    }, _callee56, this);
  }));
  return _Ts.apply(this, arguments);
}
function Ps(e) {
  return function () {
    var _ref54 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      t = _ref54.openid,
      _ref54$callLoginByWei = _ref54.callLoginByWeixin,
      n = _ref54$callLoginByWei === void 0 ? !1 : _ref54$callLoginByWei;
    return Ts.call(e, {
      openid: t,
      callLoginByWeixin: n
    });
  };
}
function As(e) {
  var t = {
    getSystemInfo: uni.getSystemInfo,
    getPushClientId: uni.getPushClientId
  };
  return function (n) {
    return new Promise(function (s, r) {
      t[e](_objectSpread(_objectSpread({}, n), {}, {
        success: function success(e) {
          s(e);
        },
        fail: function fail(e) {
          r(e);
        }
      }));
    });
  };
}
var Es = /*#__PURE__*/function (_ref55) {
  (0, _inherits2.default)(Es, _ref55);
  var _super12 = _createSuper(Es);
  function Es() {
    var _this22;
    (0, _classCallCheck2.default)(this, Es);
    _this22 = _super12.call(this), _this22._uniPushMessageCallback = _this22._receivePushMessage.bind((0, _assertThisInitialized2.default)(_this22)), _this22._currentMessageId = -1, _this22._payloadQueue = [];
    return _this22;
  }
  (0, _createClass2.default)(Es, [{
    key: "init",
    value: function init() {
      var _this23 = this;
      return Promise.all([As("getSystemInfo")(), As("getPushClientId")()]).then(function () {
        var _ref56 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [],
          _ref57 = (0, _slicedToArray2.default)(_ref56, 2),
          _ref57$ = _ref57[0];
        _ref57$ = _ref57$ === void 0 ? {} : _ref57$;
        var e = _ref57$.appId,
          _ref57$2 = _ref57[1];
        _ref57$2 = _ref57$2 === void 0 ? {} : _ref57$2;
        var t = _ref57$2.cid;
        if (!e) throw new Error("Invalid appId, please check the manifest.json file");
        if (!t) throw new Error("Invalid push client id");
        _this23._appId = e, _this23._pushClientId = t, _this23._seqId = Date.now() + "-" + Math.floor(9e5 * Math.random() + 1e5), _this23.emit("open"), _this23._initMessageListener();
      }, function (e) {
        throw _this23.emit("error", e), _this23.close(), e;
      });
    }
  }, {
    key: "open",
    value: function () {
      var _open = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee53() {
        return _regenerator.default.wrap(function _callee53$(_context53) {
          while (1) {
            switch (_context53.prev = _context53.next) {
              case 0:
                return _context53.abrupt("return", this.init());
              case 1:
              case "end":
                return _context53.stop();
            }
          }
        }, _callee53, this);
      }));
      function open() {
        return _open.apply(this, arguments);
      }
      return open;
    }()
  }, {
    key: "_isUniCloudSSE",
    value: function _isUniCloudSSE(e) {
      if ("receive" !== e.type) return !1;
      var t = e && e.data && e.data.payload;
      return !(!t || "UNI_CLOUD_SSE" !== t.channel || t.seqId !== this._seqId);
    }
  }, {
    key: "_receivePushMessage",
    value: function _receivePushMessage(e) {
      if (!this._isUniCloudSSE(e)) return;
      var t = e && e.data && e.data.payload,
        n = t.action,
        s = t.messageId,
        r = t.message;
      this._payloadQueue.push({
        action: n,
        messageId: s,
        message: r
      }), this._consumMessage();
    }
  }, {
    key: "_consumMessage",
    value: function _consumMessage() {
      var _this24 = this;
      for (;;) {
        var _e28 = this._payloadQueue.find(function (e) {
          return e.messageId === _this24._currentMessageId + 1;
        });
        if (!_e28) break;
        this._currentMessageId++, this._parseMessagePayload(_e28);
      }
    }
  }, {
    key: "_parseMessagePayload",
    value: function _parseMessagePayload(e) {
      var t = e.action,
        n = e.messageId,
        s = e.message;
      "end" === t ? this._end({
        messageId: n,
        message: s
      }) : "message" === t && this._appendMessage({
        messageId: n,
        message: s
      });
    }
  }, {
    key: "_appendMessage",
    value: function _appendMessage() {
      var _ref58 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        e = _ref58.messageId,
        t = _ref58.message;
      this.emit("message", t);
    }
  }, {
    key: "_end",
    value: function _end() {
      var _ref59 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        e = _ref59.messageId,
        t = _ref59.message;
      this.emit("end", t), this.close();
    }
  }, {
    key: "_initMessageListener",
    value: function _initMessageListener() {
      uni.onPushMessage(this._uniPushMessageCallback);
    }
  }, {
    key: "_destroy",
    value: function _destroy() {
      uni.offPushMessage(this._uniPushMessageCallback);
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        appId: this._appId,
        pushClientId: this._pushClientId,
        seqId: this._seqId
      };
    }
  }, {
    key: "close",
    value: function close() {
      this._destroy(), this.emit("close");
    }
  }]);
  return Es;
}( /*#__PURE__*/function () {
  function _class6() {
    (0, _classCallCheck2.default)(this, _class6);
    this._callback = {};
  }
  (0, _createClass2.default)(_class6, [{
    key: "addListener",
    value: function addListener(e, t) {
      this._callback[e] || (this._callback[e] = []), this._callback[e].push(t);
    }
  }, {
    key: "on",
    value: function on(e, t) {
      return this.addListener(e, t);
    }
  }, {
    key: "removeListener",
    value: function removeListener(e, t) {
      if (!t) throw new Error('The "listener" argument must be of type function. Received undefined');
      var n = this._callback[e];
      if (!n) return;
      var s = function (e, t) {
        for (var _n15 = e.length - 1; _n15 >= 0; _n15--) {
          if (e[_n15] === t) return _n15;
        }
        return -1;
      }(n, t);
      n.splice(s, 1);
    }
  }, {
    key: "off",
    value: function off(e, t) {
      return this.removeListener(e, t);
    }
  }, {
    key: "removeAllListener",
    value: function removeAllListener(e) {
      delete this._callback[e];
    }
  }, {
    key: "emit",
    value: function emit(e) {
      var n = this._callback[e];
      for (var _len4 = arguments.length, t = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        t[_key4 - 1] = arguments[_key4];
      }
      if (n) for (var _e29 = 0; _e29 < n.length; _e29++) {
        n[_e29].apply(n, t);
      }
    }
  }]);
  return _class6;
}());
function Os(_x38, _x39) {
  return _Os.apply(this, arguments);
}
function _Os() {
  _Os = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee57(e, t) {
    var n, _e33, s;
    return _regenerator.default.wrap(function _callee57$(_context57) {
      while (1) {
        switch (_context57.prev = _context57.next) {
          case 0:
            n = "http://".concat(e, ":").concat(t, "/system/ping");
            _context57.prev = 1;
            _context57.next = 4;
            return s = {
              url: n,
              timeout: 500
            }, new Promise(function (e, t) {
              se.request(_objectSpread(_objectSpread({}, s), {}, {
                success: function success(t) {
                  e(t);
                },
                fail: function fail(e) {
                  t(e);
                }
              }));
            });
          case 4:
            _e33 = _context57.sent;
            return _context57.abrupt("return", !(!_e33.data || 0 !== _e33.data.code));
          case 8:
            _context57.prev = 8;
            _context57.t0 = _context57["catch"](1);
            return _context57.abrupt("return", !1);
          case 11:
          case "end":
            return _context57.stop();
        }
      }
    }, _callee57, null, [[1, 8]]);
  }));
  return _Os.apply(this, arguments);
}
function xs(_x40) {
  return _xs.apply(this, arguments);
}
function _xs() {
  _xs = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee59(e) {
    var _ce2, _e34, _t20, t, _t$debugInfo, n, s, _yield2, r, i, o;
    return _regenerator.default.wrap(function _callee59$(_context59) {
      while (1) {
        switch (_context59.prev = _context59.next) {
          case 0:
            if (b) {
              _context59.next = 2;
              break;
            }
            return _context59.abrupt("return", Promise.resolve());
          case 2:
            if ("app" === P) {
              _ce2 = ce(), _e34 = _ce2.osName, _t20 = _ce2.osVersion;
              "ios" === _e34 && function (e) {
                if (!e || "string" != typeof e) return 0;
                var t = e.match(/^(\d+)./);
                return t && t[1] ? parseInt(t[1]) : 0;
              }(_t20) >= 14 && console.warn("iOS 14及以上版本连接uniCloud本地调试服务需要允许客户端查找并连接到本地网络上的设备（仅开发模式生效，发行模式会连接uniCloud云端服务）");
            }
            t = e.__dev__;
            if (t.debugInfo) {
              _context59.next = 6;
              break;
            }
            return _context59.abrupt("return");
          case 6:
            _t$debugInfo = t.debugInfo;
            n = _t$debugInfo.address;
            s = _t$debugInfo.servePort;
            _context59.next = 11;
            return function () {
              var _ref66 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee58(e, t) {
                var n, _s15, _r8;
                return _regenerator.default.wrap(function _callee58$(_context58) {
                  while (1) {
                    switch (_context58.prev = _context58.next) {
                      case 0:
                        _s15 = 0;
                      case 1:
                        if (!(_s15 < e.length)) {
                          _context58.next = 11;
                          break;
                        }
                        _r8 = e[_s15];
                        _context58.next = 5;
                        return Os(_r8, t);
                      case 5:
                        if (!_context58.sent) {
                          _context58.next = 8;
                          break;
                        }
                        n = _r8;
                        return _context58.abrupt("break", 11);
                      case 8:
                        _s15++;
                        _context58.next = 1;
                        break;
                      case 11:
                        return _context58.abrupt("return", {
                          address: n,
                          port: t
                        });
                      case 12:
                      case "end":
                        return _context58.stop();
                    }
                  }
                }, _callee58);
              }));
              return function (_x41, _x42) {
                return _ref66.apply(this, arguments);
              };
            }()(n, s);
          case 11:
            _yield2 = _context59.sent;
            r = _yield2.address;
            if (!r) {
              _context59.next = 15;
              break;
            }
            return _context59.abrupt("return", (t.localAddress = r, void (t.localPort = s)));
          case 15:
            i = console["app" === P ? "error" : "warn"];
            o = "";
            if (!("remote" === t.debugInfo.initialLaunchType ? (t.debugInfo.forceRemote = !0, o = "当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。") : o = "无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。", o += "\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs\n- 检查是否错误的使用拦截器修改uni.request方法的参数", "web" === P && (o += "\n- 部分浏览器开启节流模式之后访问本地地址受限，请检查是否启用了节流模式"), 0 === P.indexOf("mp-") && (o += "\n- 小程序中如何使用uniCloud，请参考：https://uniapp.dcloud.net.cn/uniCloud/publish.html#useinmp"), !t.debugInfo.forceRemote)) {
              _context59.next = 19;
              break;
            }
            throw new Error(o);
          case 19:
            i(o);
          case 20:
          case "end":
            return _context59.stop();
        }
      }
    }, _callee59);
  }));
  return _xs.apply(this, arguments);
}
function Rs(e) {
  e._initPromiseHub || (e._initPromiseHub = new I({
    createPromise: function createPromise() {
      var t = Promise.resolve();
      var n;
      n = 1, t = new Promise(function (e) {
        setTimeout(function () {
          e();
        }, n);
      });
      var s = e.auth();
      return t.then(function () {
        return s.getLoginState();
      }).then(function (e) {
        return e ? Promise.resolve() : s.signInAnonymously();
      });
    }
  }));
}
var Us = {
  tcb: It,
  tencent: It,
  aliyun: ge,
  private: bt
};
var Ls = new ( /*#__PURE__*/function () {
  function _class7() {
    (0, _classCallCheck2.default)(this, _class7);
  }
  (0, _createClass2.default)(_class7, [{
    key: "init",
    value: function init(e) {
      var t = {};
      var n = Us[e.provider];
      if (!n) throw new Error("未提供正确的provider参数");
      t = n.init(e), b && function (e) {
        if (!b) return;
        var t = {};
        e.__dev__ = t, t.debugLog = b && ("web" === P && navigator.userAgent.indexOf("HBuilderX") > 0 || "app" === P);
        var n = A;
        n && !n.code && (t.debugInfo = n);
        var s = new I({
          createPromise: function createPromise() {
            return xs(e);
          }
        });
        t.initLocalNetwork = function () {
          return s.exec();
        };
      }(t), Rs(t), xn(t), function (e) {
        var t = e.uploadFile;
        e.uploadFile = function (e) {
          return t.call(this, e);
        };
      }(t), function (e) {
        e.database = function (t) {
          if (t && Object.keys(t).length > 0) return e.init(t).database();
          if (this._database) return this._database;
          var n = Bn($n, {
            uniClient: e
          });
          return this._database = n, n;
        }, e.databaseForJQL = function (t) {
          if (t && Object.keys(t).length > 0) return e.init(t).databaseForJQL();
          if (this._databaseForJQL) return this._databaseForJQL;
          var n = Bn($n, {
            uniClient: e,
            isJQL: !0
          });
          return this._databaseForJQL = n, n;
        };
      }(t), function (e) {
        e.getCurrentUserInfo = _s, e.chooseAndUploadFile = vs.initChooseAndUploadFile(e), Object.assign(e, {
          get mixinDatacom() {
            return Ss(e);
          }
        }), e.SSEChannel = Es, e.initSecureNetworkByWeixin = Ps(e), e.importObject = bs(e);
      }(t);
      return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach(function (e) {
        if (!t[e]) return;
        var n = t[e];
        t[e] = function () {
          return n.apply(t, Array.from(arguments));
        }, t[e] = function (e, t) {
          return function (n) {
            var _this25 = this;
            var s = !1;
            if ("callFunction" === t) {
              var _e30 = n && n.type || u;
              s = _e30 !== u;
            }
            var r = "callFunction" === t && !s,
              i = this._initPromiseHub.exec();
            n = n || {};
            var _te2 = te(n),
              o = _te2.success,
              a = _te2.fail,
              c = _te2.complete,
              h = i.then(function () {
                return s ? Promise.resolve() : q(M(t, "invoke"), n);
              }).then(function () {
                return e.call(_this25, n);
              }).then(function (e) {
                return s ? Promise.resolve(e) : q(M(t, "success"), e).then(function () {
                  return q(M(t, "complete"), e);
                }).then(function () {
                  return r && Q(B, {
                    type: J,
                    content: e
                  }), Promise.resolve(e);
                });
              }, function (e) {
                return s ? Promise.reject(e) : q(M(t, "fail"), e).then(function () {
                  return q(M(t, "complete"), e);
                }).then(function () {
                  return Q(B, {
                    type: J,
                    content: e
                  }), Promise.reject(e);
                });
              });
            if (!(o || a || c)) return h;
            h.then(function (e) {
              o && o(e), c && c(e), r && Q(B, {
                type: J,
                content: e
              });
            }, function (e) {
              a && a(e), c && c(e), r && Q(B, {
                type: J,
                content: e
              });
            });
          };
        }(t[e], e).bind(t);
      }), t.init = this.init, t;
    }
  }]);
  return _class7;
}())();
(function () {
  var e = E;
  var t = {};
  if (e && 1 === e.length) t = e[0], Ls = Ls.init(t), Ls._isDefault = !0;else {
    var _t19 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo", "importObject"];
    var _n16;
    _n16 = e && e.length > 0 ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间" : O ? "应用未关联服务空间，请在uniCloud目录右键关联服务空间" : "uni-app cli项目内使用uniCloud需要使用HBuilderX的运行菜单运行项目，且需要在uniCloud目录关联服务空间", _t19.forEach(function (e) {
      Ls[e] = function () {
        return console.error(_n16), Promise.reject(new ne({
          code: "SYS_ERR",
          message: _n16
        }));
      };
    });
  }
  Object.assign(Ls, {
    get mixinDatacom() {
      return Ss(Ls);
    }
  }), fs(Ls), Ls.addInterceptor = D, Ls.removeInterceptor = F, Ls.interceptObject = K, b && "web" === P && (window.uniCloud = Ls);
})();
var Ns = Ls;
exports.default = Ns;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3), __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"]))

/***/ }),
/* 28 */
/*!************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/@babel/runtime/regenerator/index.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(/*! @babel/runtime/helpers/regeneratorRuntime */ 29)();
module.exports = runtime;

/***/ }),
/* 29 */
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorRuntime.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
function _regeneratorRuntime() {
  "use strict";

  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return exports;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function value(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) {
              if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            }
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) {
      keys.push(key);
    }
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) {
        "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      }
    },
    stop: function stop() {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 30 */
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 31 */
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 32 */
/*!*********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inherits.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ 16);
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}
module.exports = _inherits, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 33 */
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
var assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized.js */ 30);
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return assertThisInitialized(self);
}
module.exports = _possibleConstructorReturn, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 34 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _getPrototypeOf(o);
}
module.exports = _getPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 35 */
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/wrapNativeSuper.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(/*! ./getPrototypeOf.js */ 34);
var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ 16);
var isNativeFunction = __webpack_require__(/*! ./isNativeFunction.js */ 36);
var construct = __webpack_require__(/*! ./construct.js */ 15);
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;
  module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !isNativeFunction(Class)) return Class;
    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);
      _cache.set(Class, Wrapper);
    }
    function Wrapper() {
      return construct(Class, arguments, getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return setPrototypeOf(Wrapper, Class);
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _wrapNativeSuper(Class);
}
module.exports = _wrapNativeSuper, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 36 */
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/isNativeFunction.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
module.exports = _isNativeFunction, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 37 */
/*!************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-client/pages.json?{"type":"origin-pages-json"} ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  "pages": [{
    "path": "pages/index/index",
    "style": {
      "navigationBarTitleText": "首页"
    }
  }, {
    "path": "pages/test/test",
    "style": {
      "navigationBarTitleText": "演示页面"
    }
  }],
  "subPackages": [{
    "root": "pages_template",
    "pages": [{
      "path": "db-test/db-test",
      "style": {
        "navigationBarTitleText": "数据库API演示"
      }
    }, {
      "path": "db-test/list/list",
      "style": {
        "navigationBarTitleText": "列表加载演示"
      }
    }, {
      "path": "uni-id/index/index",
      "style": {
        "navigationBarTitleText": "【开箱即用】vk-uniCloud-router - 云函数路由模式 - uniCloud开发框架 - 已集成uni-id"
      }
    }, {
      "path": "uni-id/password/password",
      "style": {
        "navigationBarTitleText": "密码"
      }
    }, {
      "path": "uni-id/mobile/mobile",
      "style": {
        "navigationBarTitleText": "手机号"
      }
    }, {
      "path": "uni-id/univerify/univerify",
      "style": {
        "navigationBarTitleText": "APP一键登录"
      }
    }, {
      "path": "uni-id/weixin/weixin",
      "style": {
        "navigationBarTitleText": "微信"
      }
    }, {
      "path": "uni-id/weixin/h5-weixin",
      "style": {
        "navigationBarTitleText": "微信公众号"
      }
    }, {
      "path": "uni-id/weixin/set-user-info",
      "style": {
        "navigationBarTitleText": "设置基础信息"
      }
    }, {
      "path": "uni-id/alipay/alipay",
      "style": {
        "navigationBarTitleText": "支付宝"
      }
    }, {
      "path": "uni-id/qq/qq",
      "style": {
        "navigationBarTitleText": "QQ"
      }
    }, {
      "path": "uni-id/util/util",
      "style": {
        "navigationBarTitleText": "其他"
      }
    }, {
      "path": "uni-id/email/email",
      "style": {
        "navigationBarTitleText": "邮箱"
      }
    }, {
      "path": "uni-id/login/index/index",
      "style": {
        "navigationBarTitleText": "登录"
      }
    }, {
      "path": "uni-id/login/register/register",
      "style": {
        "navigationBarTitleText": "注册"
      }
    }, {
      "path": "uni-id/login/forget/forget",
      "style": {
        "navigationBarTitleText": "找回密码"
      }
    }, {
      "path": "vk-vuex/vk-vuex",
      "style": {
        "navigationBarTitleText": "vuex演示示例"
      }
    }, {
      "path": "openapi/weixin/weixin",
      "style": {
        "navigationBarTitleText": "微信开放平台API"
      }
    }, {
      "path": "openapi/weixin/msgSecCheck/msgSecCheck",
      "style": {
        "navigationBarTitleText": "文本安全检测"
      }
    }, {
      "path": "openapi/weixin/imgSecCheck/imgSecCheck",
      "style": {
        "navigationBarTitleText": "图片安全检测"
      }
    }, {
      "path": "openapi/weixin/sendMessage/sendMessage",
      "style": {
        "navigationBarTitleText": "发送订阅消息"
      }
    }, {
      "path": "openapi/baidu/baidu",
      "style": {
        "navigationBarTitleText": "百度开放平台API"
      }
    }, {
      "path": "openapi/qq/qq",
      "style": {
        "navigationBarTitleText": "qq开放接口"
      }
    }, {
      "path": "openapi/qq/msgSecCheck/msgSecCheck",
      "style": {}
    }, {
      "path": "openapi/qq/imgSecCheck/imgSecCheck",
      "style": {}
    }, {
      "path": "openapi/douyin/douyin",
      "style": {
        "navigationBarTitleText": "抖音开放接口"
      }
    }, {
      "path": "openapi/douyin/msgSecCheck/msgSecCheck",
      "style": {}
    }, {
      "path": "openapi/douyin/imgSecCheck/imgSecCheck",
      "style": {}
    }, {
      "path": "openapi/alipay/alipay",
      "style": {
        "navigationBarTitleText": "支付宝开放接口"
      }
    }, {
      "path": "uni-id/test/test",
      "style": {
        "navigationStyle": "custom",
        "navigationBarTextStyle": "white"
      }
    }]
  }],
  "globalStyle": {
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "",
    "navigationBarBackgroundColor": "#F8F8F8",
    "backgroundColor": "#F8F8F8"
  },
  "condition": {
    "current": 0,
    "list": [{
      "name": "",
      "path": "",
      "query": ""
    }]
  }
};
exports.default = _default;

/***/ }),
/* 38 */
/*!***********************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-client/pages.json?{"type":"stat"} ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  "appid": "__UNI__EF2903A"
};
exports.default = _default;

/***/ }),
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */
/*!**********************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-client/app.config.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _myPubFunction = _interopRequireDefault(__webpack_require__(/*! @/common/function/myPubFunction.js */ 43));
// 引入自定义公共函数
var _default = {
  // 开发模式启用调式模式(请求时会打印日志)
  debug: "development" !== 'production',
  // 主云函数名称
  functionName: "router",
  // 登录页面路径
  login: {
    url: '/pages_template/uni-id/login/index/index'
  },
  // 首页页面路径
  index: {
    url: '/pages/index/index'
  },
  // 404 Not Found 错误页面路径
  error: {
    url: '/pages/error/404/404'
  },
  // 前端默认时区（中国为8）
  targetTimezone: 8,
  // 日志风格
  logger: {
    colorArr: ["#0095f8", "#67C23A"]
  },
  /**
   * app主题颜色
   * vk.getVuex('$app.color.main')
   * vk.getVuex('$app.color.secondary')
   */
  color: {
    main: "#ff4444",
    secondary: "#555555"
  },
  // 需要检查是否登录的页面列表
  checkTokenPages: {
    /**
     * 如果 mode = 0 则代表自动检测
     * 如果 mode = 1 则代表list内的页面需要登录，不在list内的页面不需要登录
     * 如果 mode = 2 则代表list内的页面不需要登录，不在list内的页面需要登录
     * 注意1: list内是通配符表达式，非正则表达式
     * 注意2: 需要使用 vk.navigateTo 代替 uni.navigateTo 进行页面跳转才会生效
    * 注意3: 想要让 tabbar 页面必须登录才能访问，则需要手动在页面的onLoad里加 vk.pubfn.checkLogin();
    * 在无需登录的页面上执行kh或sys函数，也会自动判断是否登录，未登录会自动跳登录页面，登录成功后会自动返回本来要跳转的页面。
     */
    mode: 2,
    list: ["/pages_template/*", "/pages/login/*", "/pages/index/*", "/pages/error/*"]
  },
  // 需要检查是否可以分享的页面列表(仅小程序有效)
  checkSharePages: {
    /**
     * 如果 mode = 0 则不做处理
     * 如果 mode = 1 则代表list内的页面可以被分享，不在list内的页面不可以被分享
     * 如果 mode = 2 则代表list内的页面不可以被分享，不在list内的页面可以被分享
     * 注意: list内是通配符表达式，非正则表达式
     */
    mode: 0,
    // ['shareAppMessage', 'shareTimeline'],
    menus: ['shareAppMessage'],
    list: ["/pages/index/*", "/pages/goods/*", "/pages_template/*"]
  },
  // 静态文件的资源URL地址
  staticUrl: {
    // Logo
    logo: '/static/logo.png'
  },
  // 自定义公共函数，myPubFunction内的函数可通过vk.myfn.xxx() 调用
  myfn: _myPubFunction.default,
  // 第三方服务配置
  service: {
    // 密钥和签名信息 (由于签名的获取比较麻烦,建议初学者使用上传到unicloud的方案,上传到阿里云OSS是给有特殊需求的用户使用)
    // 相关文档 : https://help.aliyun.com/document_detail/31925.html?spm=a2c4g.11186623.6.1757.b7987d9czoFCVu
    aliyunOSS: {
      // 密钥和签名信息
      uploadData: {
        OSSAccessKeyId: "",
        policy: "",
        signature: ""
      },
      // oss上传地址
      action: "https://xxx.oss-cn-hangzhou.aliyuncs.com",
      // 根目录名称
      dirname: "test",
      // oss外网访问地址，也可以是阿里云cdn地址
      host: "https://xxx.xxx.com",
      // 上传时,是否按用户id进行分组储存
      groupUserId: true,
      // 是否默认上传到阿里云OSS
      isDefault: false
    }
  },
  // 全局异常码，可以自定义提示结果
  globalErrorCode: {
    // 阿里云10秒非正常超时，其实请求还在执行（且一般已经成功了，但前端接受不到成功结果）
    "cloudfunction-unusual-timeout": "请求超时，但请求还在执行，请重新进入页面。",
    // 请求超时（真正的请求超时）
    "cloudfunction-timeout": "请求超时，请重试！",
    // 不在预期内的异常（如数据库异常、云函数编译异常等）
    "cloudfunction-system-error": "网络开小差了！"
  },
  // 自定义拦截器
  interceptor: {

    // login:function(obj){
    // 	let { vk, params, res } = obj;
    // 	//console.log("params:",params);
    // 	//console.log("res:",res);
    // 	if(!params.noAlert){
    // 		vk.alert(res.msg);
    // 	}
    // 	console.log("跳自己的登录页面");
    // 	// 上方代码可自己修改，写成你自己的逻辑处理。
    // },

    // fail:function(obj){
    // 	let { vk, params, res } = obj;
    // 	//console.log("params:",params);
    // 	//console.log("res:",res);
    // 	return false;// 返回false则取消框架内置fail的逻辑,返回true则会继续执行框架内置fail的逻辑
    // 	// 上方代码可自己修改，写成你自己的逻辑处理。
    // }
  }
};
exports.default = _default;

/***/ }),
/* 43 */
/*!*****************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-client/common/function/myPubFunction.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * 自定义公共函数
 */
var myfn = {};
/**
 * 测试函数test1
 * vk.myfn.test1();
 */
myfn.test1 = function () {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var vk = uni.vk;
  console.log("执行了自定义公共函数test1");
  return obj;
};
var _default = myfn;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 44 */
/*!*********************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-client/package.json ***!
  \*********************************************************/
/*! exports provided: id, displayName, version, description, keywords, main, dependencies, devDependencies, scripts, author, license, repository, name, engines, dcloudext, uni_modules, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"id\":\"vk-cloud-router\",\"displayName\":\"【开箱即用】vk-unicloud-router - 云函数路由模式开发框架 - 已集成uni-id 框架内置了众多API、工具包，为你的业务扫平障碍。\",\"version\":\"2.15.1\",\"description\":\"这是一个unicloud快速开发框架+项目模板（已包含核心库）支持URL化，众多现成API供你使用（登录、注册、短信、微信百度服务端API等等）为你的业务扫平障碍。内置小白也能轻松上手的数据库API。\",\"keywords\":[\"vk-unicloud-router\",\"云函数路由、云对象路由\",\"vk云开发\",\"内置uni-id、uview、数据库baseDao\",\"内置众多API、工具包、支持微信公众号登录、微信小程序、app登录等\"],\"main\":\"main.js\",\"dependencies\":{},\"devDependencies\":{},\"scripts\":{\"test\":\"echo \\\"Error: no test specified\\\" && exit 1\"},\"author\":\"VK\",\"license\":\"MIT\",\"repository\":\"https://gitee.com/vk-uni/vk-uni-cloud-router\",\"name\":\"vk-unicloud-router\",\"engines\":{\"HBuilderX\":\"^3.1.2\"},\"dcloudext\":{\"sale\":{\"regular\":{\"price\":\"0.00\"},\"sourcecode\":{\"price\":\"0.00\"}},\"contact\":{\"qq\":\"370725567\"},\"declaration\":{\"ads\":\"无\",\"data\":\"插件不采集任何数据\",\"permissions\":\"无\"},\"npmurl\":\"https://vkdoc.fsq.pub/client/\",\"type\":\"unicloud-template-project\"},\"uni_modules\":{\"platforms\":{\"cloud\":{\"tcb\":\"y\",\"aliyun\":\"y\"},\"client\":{\"App\":{\"app-vue\":\"y\",\"app-nvue\":\"y\"},\"H5-mobile\":{\"Safari\":\"y\",\"Android Browser\":\"y\",\"微信浏览器(Android)\":\"y\",\"QQ浏览器(Android)\":\"y\"},\"H5-pc\":{\"Chrome\":\"y\",\"IE\":\"u\",\"Edge\":\"y\",\"Firefox\":\"y\",\"Safari\":\"y\"},\"小程序\":{\"微信\":\"y\",\"阿里\":\"y\",\"百度\":\"y\",\"字节跳动\":\"y\",\"QQ\":\"y\",\"钉钉\":\"y\",\"快手\":\"y\",\"飞书\":\"y\",\"京东\":\"y\"},\"快应用\":{\"华为\":\"y\",\"联盟\":\"y\"},\"Vue\":{\"vue2\":\"y\",\"vue3\":\"y\"}}}}}");

/***/ }),
/* 45 */,
/* 46 */,
/* 47 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    if(typeof renderjs.beforeCreate === 'function'){
			renderjs.beforeCreate = [renderjs.beforeCreate]
		}
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 48 */
/*!***********************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-client/store/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 49));
// 定义不需要永久存储的目录，即下次APP启动数据会自动清空，值为在modules目录下的文件名
var notSaveStateKeys = ['$error'];

/* 以下代码请勿改动，除非你知道改动带来的效果 */

var modulesTemp = {};
var lifeData = uni.getStorageSync('lifeData') || {};
var modulesFiles = __webpack_require__(50);
modulesFiles.keys().map(function (modulePath, index) {
  var moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  modulesTemp[moduleName] = modulesFiles(modulePath).default;
});
var modules = {};
for (var moduleName in modulesTemp) {
  var moduleItem = modulesTemp[moduleName];
  if (moduleItem && moduleItem.namespaced) {
    var moduleNameArr = moduleName.split("/");
    var lastName = moduleNameArr[moduleNameArr.length - 1];
    if (lastName === "index") {
      moduleName = moduleName.replace(/\/index$/, '');
    }
    modules[moduleName] = moduleItem;
  }
}
for (var _moduleName in modules) {
  if (notSaveStateKeys.indexOf(_moduleName) === -1) {
    if (!lifeData[_moduleName]) lifeData[_moduleName] = {};
  }
}
uni.setStorageSync('lifeData', lifeData);

// 保存变量到本地存储中
var saveLifeData = function saveLifeData(key, value) {
  // 判断变量名是否在需要存储的数组中
  if (notSaveStateKeys.indexOf(key) === -1) {
    // 获取本地存储的lifeData对象，将变量添加到对象中
    var tmp = uni.getStorageSync('lifeData');
    // 第一次打开APP，不存在lifeData变量，故放一个{}空对象
    tmp = tmp ? tmp : {};
    tmp[key] = value;
    // 执行这一步后，所有需要存储的变量，都挂载在本地的lifeData对象中
    uni.setStorageSync('lifeData', tmp);
  }
};
_vue.default.use(_vuex.default);
var store = new _vuex.default.Store({
  modules: modules,
  // 如果是开发环境,则开启严格模式
  strict: "development" === 'development',
  // 公共 mutations
  mutations: {
    updateStore: function updateStore(state, payload) {
      // 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
      if (typeof payload.value === "undefined") payload.value = "";
      var nameArr = payload.name.split('.');
      var saveKey = '';
      var len = nameArr.length;
      if (len >= 2) {
        var obj = state[nameArr[0]];
        for (var i = 1; i < len - 1; i++) {
          var keyName = nameArr[i];
          if ((0, _typeof2.default)(obj[keyName]) !== "object") obj[keyName] = {};
          obj = obj[keyName];
        }
        obj[nameArr[len - 1]] = JSON.parse(JSON.stringify(payload.value));
        saveKey = nameArr[0];
      } else {
        // 单层级变量，在state就是一个普通变量的情况
        state[payload.name] = JSON.parse(JSON.stringify(payload.value));
        saveKey = payload.name;
      }
      // 保存变量到本地，见顶部函数定义
      saveLifeData(saveKey, state[saveKey]);
    }
  }
});
var _default = store;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 49 */
/*!**************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vuex3/dist/vuex.common.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * vuex v3.6.2
 * (c) 2021 Evan You
 * @license MIT
 */


function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy (obj, cache) {
  if ( cache === void 0 ) cache = [];

  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  var hit = find(cache, function (c) { return c.original === obj; });
  if (hit) {
    return hit.copy
  }

  var copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy: copy
  });

  Object.keys(obj).forEach(function (key) {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy
}

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  var child = parent.getChild(key);

  if (!child) {
    if ((true)) {
      console.warn(
        "[vuex] trying to unregister module '" + key + "', which is " +
        "not registered"
      );
    }
    return
  }

  if (!child.runtime) {
    return
  }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  if (parent) {
    return parent.hasChild(key)
  }

  return false
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype[[104,111,116,85,112,100,97,116,101].map(function (item) {return String.fromCharCode(item)}).join('')] = function (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept another params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

// Credits: borrowed code from fcomb/redux-logger

function createLogger (ref) {
  if ( ref === void 0 ) ref = {};
  var collapsed = ref.collapsed; if ( collapsed === void 0 ) collapsed = true;
  var filter = ref.filter; if ( filter === void 0 ) filter = function (mutation, stateBefore, stateAfter) { return true; };
  var transformer = ref.transformer; if ( transformer === void 0 ) transformer = function (state) { return state; };
  var mutationTransformer = ref.mutationTransformer; if ( mutationTransformer === void 0 ) mutationTransformer = function (mut) { return mut; };
  var actionFilter = ref.actionFilter; if ( actionFilter === void 0 ) actionFilter = function (action, state) { return true; };
  var actionTransformer = ref.actionTransformer; if ( actionTransformer === void 0 ) actionTransformer = function (act) { return act; };
  var logMutations = ref.logMutations; if ( logMutations === void 0 ) logMutations = true;
  var logActions = ref.logActions; if ( logActions === void 0 ) logActions = true;
  var logger = ref.logger; if ( logger === void 0 ) logger = console;

  return function (store) {
    var prevState = deepCopy(store.state);

    if (typeof logger === 'undefined') {
      return
    }

    if (logMutations) {
      store.subscribe(function (mutation, state) {
        var nextState = deepCopy(state);

        if (filter(mutation, prevState, nextState)) {
          var formattedTime = getFormattedTime();
          var formattedMutation = mutationTransformer(mutation);
          var message = "mutation " + (mutation.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
          logger.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
          logger.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));
          endMessage(logger);
        }

        prevState = nextState;
      });
    }

    if (logActions) {
      store.subscribeAction(function (action, state) {
        if (actionFilter(action, state)) {
          var formattedTime = getFormattedTime();
          var formattedAction = actionTransformer(action);
          var message = "action " + (action.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c action', 'color: #03A9F4; font-weight: bold', formattedAction);
          endMessage(logger);
        }
      });
    }
  }
}

function startMessage (logger, message, collapsed) {
  var startMessage = collapsed
    ? logger.groupCollapsed
    : logger.group;

  // render
  try {
    startMessage.call(logger, message);
  } catch (e) {
    logger.log(message);
  }
}

function endMessage (logger) {
  try {
    logger.groupEnd();
  } catch (e) {
    logger.log('—— log end ——');
  }
}

function getFormattedTime () {
  var time = new Date();
  return (" @ " + (pad(time.getHours(), 2)) + ":" + (pad(time.getMinutes(), 2)) + ":" + (pad(time.getSeconds(), 2)) + "." + (pad(time.getMilliseconds(), 3)))
}

function repeat (str, times) {
  return (new Array(times + 1)).join(str)
}

function pad (num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num
}

var index_cjs = {
  Store: Store,
  install: install,
  version: '3.6.2',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers,
  createLogger: createLogger
};

module.exports = index_cjs;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 50 */
/*!*********************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-client/store/modules sync \.js$ ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./$app.js": 51,
	"./$user.js": 52
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 50;

/***/ }),
/* 51 */
/*!******************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-client/store/modules/$app.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _appConfig = _interopRequireDefault(__webpack_require__(/*! @/app.config.js */ 42));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var lifeData = uni.getStorageSync('lifeData') || {};
var $app = lifeData.$app || {};
var _default = {
  // 通过添加 namespaced: true 的方式使其成为带命名空间的模块
  namespaced: true,
  /**
   * vuex的基本数据，用来存储变量
   */
  state: {
    /**
     * 是否已经初始化
     * js调用示例
     * vk.getVuex('$app.inited');
     * 页面上直接使用示例
     * {{ vk.getVuex('$app.inited') }}
     * js更新示例
     * vk.setVuex('$app.inited', true);
     */
    inited: $app.inited || false,
    config: _objectSpread({}, _appConfig.default),
    // 动态主题色 vk.getVuex('$app.color.main') vk.setVuex('$app.color.main','#ff4444')
    color: $app.color || _appConfig.default.color,
    /**
     * vk.getVuex('$app.originalPage');
     * vk.setVuex('$app.originalPage', originalPage);
     */
    originalPage: $app.originalPage || null // 跳登录前的页面
  },

  /**
   * 从基本数据(state)派生的数据，相当于state的计算属性
   */
  getters: {},
  /**
   * 提交更新数据的方法，必须是同步的(如果需要异步使用action)。
   * 每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。
   * 回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数，提交载荷作为第二个参数。
   */
  mutations: {},
  /**
   * 和mutation的功能大致相同，不同之处在于 ==》
   * 1. Action 提交的是 mutation，而不是直接变更状态。
   * 2. Action 可以包含任意异步操作。
   */
  actions: {}
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 52 */
/*!*******************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-client/store/modules/$user.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * vuex 用户状态管理模块
 */
var lifeData = uni.getStorageSync('lifeData') || {};
var $user = lifeData.$user || {};
var _default = {
  // 通过添加 namespaced: true 的方式使其成为带命名空间的模块
  namespaced: true,
  /**
   * vuex的基本数据，用来存储变量
   */
  state: {
    /**
     * 登录用户信息
     * js调用示例
     * (推荐) vk.getVuex('$user.userInfo');
     * 或 vk.vuex.get('$user.userInfo');
     * 页面上直接使用示例
     * {{ vk.getVuex('$user.userInfo') }}
     * js更新示例
     * vk.setVuex('$user.userInfo.avatar', avatar);
     */
    userInfo: $user.userInfo || {},
    permission: $user.permission || []
  },
  /**
   * 从基本数据(state)派生的数据，相当于state的计算属性
   */
  getters: {},
  /**
   * 提交更新数据的方法，必须是同步的(如果需要异步使用action)。
   * 每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。
   * 回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数，提交载荷作为第二个参数。
   */
  mutations: {},
  /**
   * 和mutation的功能大致相同，不同之处在于 ==》
   * 1. Action 提交的是 mutation，而不是直接变更状态。 
   * 2. Action 可以包含任意异步操作。
   */
  actions: {}
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 53 */
/*!*****************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-client/uni_modules/vk-unicloud/index.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vkUnicloudPage = _interopRequireDefault(__webpack_require__(/*! ./vk_modules/vk-unicloud-page */ 54));
/**
 * vk-unicloud框架客户端(前端)
 * author	VK
 */
var _default = _vkUnicloudPage.default;
exports.default = _default;

/***/ }),
/* 54 */
/*!*********************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-client/uni_modules/vk-unicloud/vk_modules/vk-unicloud-page/index.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _vkUnicloudUserCenter = _interopRequireDefault(__webpack_require__(/*! ./libs/vk-unicloud/vk-unicloud-user-center */ 55));
var _vkUnicloudCallFunctionUtil = _interopRequireDefault(__webpack_require__(/*! ./libs/vk-unicloud/vk-unicloud-callFunctionUtil */ 56));
var _index = _interopRequireDefault(__webpack_require__(/*! ./libs/function/index */ 58));
var _modal = _interopRequireDefault(__webpack_require__(/*! ./libs/function/modal */ 65));
var _vk = _interopRequireDefault(__webpack_require__(/*! ./libs/function/vk.navigate */ 66));
var _vk2 = _interopRequireDefault(__webpack_require__(/*! ./libs/function/vk.localStorage */ 67));
var _vk3 = _interopRequireDefault(__webpack_require__(/*! ./libs/function/vk.sessionStorage */ 68));
var _aliyunOSSUtil = _interopRequireDefault(__webpack_require__(/*! ./libs/function/aliyunOSSUtil */ 69));
var _index2 = _interopRequireDefault(__webpack_require__(/*! ./libs/openapi/index */ 70));
var _vk4 = _interopRequireDefault(__webpack_require__(/*! ./libs/function/vk.request */ 72));
var _vk5 = _interopRequireDefault(__webpack_require__(/*! ./libs/function/vk.importObject */ 73));
var _vk6 = _interopRequireDefault(__webpack_require__(/*! ./libs/function/vk.filters */ 74));
var _mixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mixin.js */ 75));
var _permission = _interopRequireDefault(__webpack_require__(/*! ./libs/function/permission */ 76));
var _mixin2 = _interopRequireDefault(__webpack_require__(/*! ./libs/store/mixin/mixin */ 77));
var _error = _interopRequireDefault(__webpack_require__(/*! ./libs/store/libs/error */ 78));
var _console = _interopRequireDefault(__webpack_require__(/*! ./libs/install/console.log */ 79));
var _updateManager = _interopRequireDefault(__webpack_require__(/*! ./libs/function/updateManager.js */ 80));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var vk = _objectSpread(_objectSpread(_objectSpread({
  userCenter: _vkUnicloudUserCenter.default,
  callFunctionUtil: _vkUnicloudCallFunctionUtil.default,
  /**
   * 发起一个云函数请求
   */
  callFunction: _vkUnicloudCallFunctionUtil.default.callFunction,
  getToken: _vkUnicloudCallFunctionUtil.default.getToken,
  checkToken: _vkUnicloudCallFunctionUtil.default.checkToken,
  uploadFile: _vkUnicloudCallFunctionUtil.default.uploadFile,
  getConfig: _vkUnicloudCallFunctionUtil.default.getConfig,
  emitRefreshToken: _vkUnicloudCallFunctionUtil.default.emitRefreshToken,
  onRefreshToken: _vkUnicloudCallFunctionUtil.default.onRefreshToken,
  offRefreshToken: _vkUnicloudCallFunctionUtil.default.offRefreshToken,
  pubfn: _index.default,
  alert: _modal.default.alert,
  toast: _modal.default.toast,
  confirm: _modal.default.confirm,
  prompt: _modal.default.prompt,
  showActionSheet: _modal.default.showActionSheet,
  showLoading: _modal.default.showLoading,
  hideLoading: _modal.default.hideLoading,
  setLoading: _modal.default.setLoading,
  navigate: _vk.default,
  // 保留当前页面,并进行页面跳转
  navigateTo: _vk.default.navigateTo,
  // 关闭当前页面,并进行页面跳转
  redirectTo: _vk.default.redirectTo,
  // 并关闭所有页面,并进行页面跳转
  reLaunch: _vk.default.reLaunch,
  // 并关闭所有非tab页面,并进行tab面跳转
  switchTab: _vk.default.switchTab,
  // 页面返回
  navigateBack: _vk.default.navigateBack,
  // 跳转到首页
  navigateToHome: _vk.default.navigateToHome,
  // 跳转到登录页
  navigateToLogin: _vk.default.navigateToLogin,
  // 跳转到小程序
  navigateToMiniProgram: _vk.default.navigateToMiniProgram,
  // 触发全局的自定义事件，附加参数都会传给监听器回调函数。
  $emit: _vk.default.$emit,
  // 监听全局的自定义事件，事件由 uni.$emit 触发，回调函数会接收事件触发函数的传入参数。
  $on: _vk.default.$on,
  // 触发全局的自定义事件，附加参数都会传给监听器回调函数。
  $once: _vk.default.$once,
  // 移除全局自定义事件监听器。
  $off: _vk.default.$off,
  // 本地持久
  localStorage: _vk2.default,
  // 本地会话缓存
  sessionStorage: _vk3.default,
  // 获取应用语言列表
  getLocaleList: _index.default.getLocaleList,
  // 获取应用当前语言
  getLocale: _index.default.getLocale,
  // 获取应用当前语言对象
  getLocaleObject: _index.default.getLocaleObject,
  // 设置应用当前语言
  setLocale: _index.default.setLocale
}, _vk2.default), _vk3.default), {}, {
  // 阿里云oss
  aliyunOSSUtil: _aliyunOSSUtil.default,
  // 更新管理器
  updateManager: _updateManager.default,
  // 开放API
  openapi: _index2.default,
  // 请求库
  requestUtil: _vk4.default,
  // 发起URL请求
  request: _vk4.default.request,
  // 导出云对象
  importObject: _vk5.default
});
// vk实例初始化
vk.init = function () {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var Vue = obj.Vue,
    config = obj.config,
    store = obj.store;
  if (typeof store !== "undefined") {
    // 兼容旧版本
    Vue.use(store);
  } else {
    // 新版本无需传store
    Vue.mixin(_mixin2.default);
    if (config.globalError) {
      Vue.use(_error.default);
    }
  }
  // 自定义云函数路由配置
  vk.callFunctionUtil.setConfig(config);
  // 重写 console.log
  Vue.use(_console.default);
};
vk.getGlobalObject = function () {
  if ((typeof globalThis === "undefined" ? "undefined" : (0, _typeof2.default)(globalThis)) === "object") return globalThis;
  if ((typeof self === "undefined" ? "undefined" : (0, _typeof2.default)(self)) === "object") return self;
  if ((typeof window === "undefined" ? "undefined" : (0, _typeof2.default)(window)) === "object") return window;
  if ((typeof global === "undefined" ? "undefined" : (0, _typeof2.default)(global)) === "object") return global;
};
// 加载拓展功能
vk.use = function (obj, util) {
  for (var name in obj) {
    if (obj[name] && typeof obj[name].init === "function") {
      obj[name].init(util);
    }
    vk[name] = obj[name];
  }
};
var install = function install(Vue) {
  // 全局混入
  Vue.mixin(_mixin.default);

  // 加载全局过滤器开始
  for (var i in _vk6.default) {
    Vue.filter(i, _vk6.default[i]);
  }
  Vue.prototype.vk = vk;
  Vue.prototype.$fn = vk.pubfn;

  // 将vk挂载到uni对象
  if ((typeof uni === "undefined" ? "undefined" : (0, _typeof2.default)(uni)) == "object") uni.vk = vk;
  // 将vk挂载到全局
  var vkGlobalThis = vk.getGlobalObject();
  if ((0, _typeof2.default)(vkGlobalThis) == "object") vkGlobalThis.vk = vk;
  var util = {
    vk: vk
  };
  // 加载插件
  vk.use({
    callFunctionUtil: vk.callFunctionUtil,
    openapi: vk.openapi
  }, util);
  (0, _permission.default)(Vue);
};
var _default = {
  install: install
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/webpack/buildin/global.js */ 3), __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 55 */
/*!********************************************************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-client/uni_modules/vk-unicloud/vk_modules/vk-unicloud-page/libs/vk-unicloud/vk-unicloud-user-center.js ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _vkUnicloudCallFunctionUtil = _interopRequireDefault(__webpack_require__(/*! ./vk-unicloud-callFunctionUtil.js */ 56));
var _debounce = _interopRequireDefault(__webpack_require__(/*! ../function/debounce.js */ 57));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var callFunction = _vkUnicloudCallFunctionUtil.default.callFunction,
  config = _vkUnicloudCallFunctionUtil.default.config,
  saveToken = _vkUnicloudCallFunctionUtil.default.saveToken,
  deleteToken = _vkUnicloudCallFunctionUtil.default.deleteToken;
var debounceTime = 1000; // 防抖时长

var localeObj = {
  "zh-Hans": {
    "loading": "请求中...",
    "login": "登录中...",
    "register": "注册中...",
    "create": "生成中..."
  },
  "zh-Hant": {
    "loading": "請求中...",
    "login": "登入中...",
    "register": "注册中...",
    "create": "生成中..."
  },
  "en": {
    "loading": "loading...",
    "login": "login...",
    "register": "register...",
    "create": "create..."
  }
};
function addLoading(obj, title) {
  if (typeof obj.loading === "undefined" && !obj.title && title) {
    var locale;
    if (typeof uni.vk !== "undefined") {
      locale = localeObj[uni.vk.pubfn.getLocale()];
    } else {
      locale = localeObj["zh-Hans"];
    }
    obj.title = locale[title] || "loading...";
  }
  return obj;
}
var _default = {
  /**
   * 用户注册(用户名+密码)
   * data 请求参数 说明
   * @param {String} username 用户名
   * @param {String} password 密码
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   * @param {String} token 注册完成自动登录之后返回的token信息
   * @param {String} tokenExpired token过期时间
   * @param {Object} userInfo 用户信息
   * @param {String} uid 用户ID
   */
  register: function register() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return (0, _debounce.default)(function () {
      addLoading(obj, "register");
      return callFunction(_objectSpread(_objectSpread({}, obj), {}, {
        url: 'user/pub/register'
      }));
    }, debounceTime, true, "login");
  },
  /**
   * 用户登录(用户名+密码)
   * data 请求参数 说明
   * @param {String} username 用户名
   * @param {String} password 密码
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   * @param {String} token 注册完成自动登录之后返回的token信息
   * @param {String} tokenExpired token过期时间
   * @param {Object} userInfo 用户信息
   * @param {String} uid 用户ID
   */
  login: function login() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    addLoading(obj, "login");
    return callFunction(_objectSpread(_objectSpread({}, obj), {}, {
      url: 'user/pub/login'
    }));
  },
  /**
   * 登出(退出)
   * data 请求参数 说明
   * 无
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   */
  logout: function logout() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    addLoading(obj, "loading");
    return callFunction(_objectSpread(_objectSpread({}, obj), {}, {
      url: 'user/pub/logout',
      success: function success(res) {
        deleteToken();
        if (typeof obj.success == "function") obj.success(res);
      }
    }));
  },
  /**
   * 修改密码
   * @description 修改成功后，需要重新登录获取新的token
   * data 请求参数 说明
   * @param {String} oldPassword 旧密码
   * @param {String} newPassword 新密码
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   */
  updatePwd: function updatePwd() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    addLoading(obj, "loading");
    return callFunction(_objectSpread(_objectSpread({}, obj), {}, {
      url: 'user/kh/updatePwd'
    }));
  },
  /**
   * 重置密码
   * data 请求参数 说明
   * @param {String} password 重置后的密码
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   */
  resetPwd: function resetPwd(obj) {
    addLoading(obj, "loading");
    return callFunction(_objectSpread(_objectSpread({}, obj), {}, {
      url: 'user/kh/resetPwd'
    }));
  },
  /**
   * 设置头像
   * data 请求参数 说明
   * @param {String} avatar 头像地址
   * @param {Boolean} deleteOldFile 是否同时删除云储存内的头像文件
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   */
  setAvatar: function setAvatar() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    addLoading(obj, "loading");
    //obj.isRequest = true;
    return callFunction(_objectSpread(_objectSpread({}, obj), {}, {
      url: 'user/kh/setAvatar'
    }));
  },
  /**
   * 设置昵称等用户展示的个人信息
   * data 请求参数 说明
   * @param {String} nickname 昵称
   * @param {String} avatar 头像
   * @param {Number} gender 性别
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   */
  updateUser: function updateUser() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    addLoading(obj, "loading");
    callFunction(_objectSpread(_objectSpread({}, obj), {}, {
      url: 'user/kh/updateUser'
    }));
  },
  /**
   * 获取用户最新信息
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 错误信息
   * @param {Object} userInfo 用户信息
   */
  getCurrentUserInfo: function getCurrentUserInfo() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    addLoading(obj, "loading");
    return callFunction(_objectSpread(_objectSpread({}, obj), {}, {
      url: 'user/kh/getMyUserInfo'
    }));
  },
  /**
   * token校验
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   * @param {String} uid 当前token对应的用户uid
   * @param {Object} userInfo 当前用户信息
   * @param {Array} role 当前用户角色
   * @param {Array} permission 当前用户权限
   */
  checkToken: function checkToken() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    addLoading(obj, "loading");
    return callFunction(_objectSpread(_objectSpread({}, obj), {}, {
      url: 'user/pub/checkToken'
    }));
  },
  /**
   * 绑定手机号
   * data 请求参数 说明
   * @param {String} mobile 手机号
   * @param {String} code 手机收到的验证码
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   */
  bindMobile: function bindMobile() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    addLoading(obj, "loading");
    return callFunction(_objectSpread(_objectSpread({}, obj), {}, {
      url: 'user/kh/bindMobile'
    }));
  },
  /**
   * 解绑手机号
   * data 请求参数 说明
   * @param {String} mobile 手机号
   * @param {String} code 手机收到的验证码
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   */
  unbindMobile: function unbindMobile() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    addLoading(obj, "loading");
    return callFunction(_objectSpread(_objectSpread({}, obj), {}, {
      url: 'user/kh/unbindMobile'
    }));
  },
  /**
   * 绑定新的手机号（换绑手机号）
   * data 请求参数 说明
   * @param {String} oldMobile 旧手机号码
   * @param {String} oldMobileCode 旧手机收到的验证码
   * @param {String} mobile 新手机号码
   * @param {String} code 新手机收到的验证码
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   */
  bindNewMobile: function bindNewMobile() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    addLoading(obj, "loading");
    return callFunction(_objectSpread(_objectSpread({}, obj), {}, {
      url: 'user/kh/bindNewMobile'
    }));
  },
  /**
   * 手机号登录(手机号+手机验证码)
   * data 请求参数 说明
   * @param {String} mobile 手机号
   * @param {String} code 验证码
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   * @param {String} token 注册完成自动登录之后返回的token信息
   * @param {String} tokenExpired token过期时间
   */
  loginBySms: function loginBySms() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return (0, _debounce.default)(function () {
      addLoading(obj, "login");
      return callFunction(_objectSpread({
        url: 'user/pub/loginBySms'
      }, obj));
    }, debounceTime, true, "login");
  },
  /**
   * 发送手机号验证码
   * data 请求参数 说明
   * @param {String} mobile 手机号
   * @param {String} type  验证码类型
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   * @param {Object} requestRes 原始返回数据
   * @param {Object} requestParam 包含服务供应商和发送的手机号
   */
  sendSmsCode: function sendSmsCode() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    addLoading(obj, "loading");
    return callFunction(_objectSpread(_objectSpread({}, obj), {}, {
      url: 'user/pub/sendSmsCode'
    }));
  },
  /**
   * APP端 手机一键登录
   * data 请求参数 说明
   * @param {String} access_token 			uni.login登录成功后，返回的access_token参数
   * @param {String} openid 						uni.login登录成功后，返回的openid参数
   * @param {String} type 							指定操作类型，可选值为login、register，不传此参数时表现为手机号已注册则登录，手机号未注册则进行注册
   * @param {String} password 					密码，type为register时生效
   * @param {String} inviteCode 				邀请人的邀请码，type为register时生效
   * @param {String} myInviteCode 			设置当前注册用户自己的邀请码，type为register时生效
   * res 返回参数说明
   * @param {Number} code			错误码，0表示成功
   * @param {String} msg				详细信息
   * @param {String} uid 			当前token对应的用户uid
   * @param {String} type			操作类型，login为登录、register为注册
   * @param {String} mobile		登录者手机号
   * @param {String} userInfo	用户全部信息
   * @param {String} token			登录成功之后返回的token信息
   * @param {String} tokenExpired		token过期时间
   */
  loginByUniverify: function loginByUniverify() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    addLoading(obj, "login");
    if (typeof obj.needAlert === "undefined") obj.needAlert = true;
    uni.vk.toast("请在APP中使用本机号码一键登录", "none");
  },
  /**
   * 绑定邮箱
   * data 请求参数 说明
   * @param {String} email 邮箱
   * @param {String} code  邮箱收到的验证码
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   */
  bindEmail: function bindEmail() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    addLoading(obj, "loading");
    return callFunction(_objectSpread(_objectSpread({}, obj), {}, {
      url: 'user/kh/bindEmail'
    }));
  },
  /**
   * 解绑邮箱
   * @param {String} email 邮箱
   * @param {String} code  邮箱收到的验证码
   */
  unbindEmail: function unbindEmail() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    addLoading(obj, "loading");
    return callFunction(_objectSpread(_objectSpread({}, obj), {}, {
      url: 'user/kh/unbindEmail'
    }));
  },
  /**
   * 绑定新的邮箱（换绑邮箱）
   * @param {String} oldEmail 旧邮箱码
   * @param {String} oldEmailCode 旧邮箱收到的验证码
   * @param {String} email 新邮箱码
   * @param {String} code 新邮箱收到的验证码
   */
  bindNewEmail: function bindNewEmail() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    addLoading(obj, "loading");
    return callFunction(_objectSpread(_objectSpread({}, obj), {}, {
      url: 'user/kh/bindNewEmail'
    }));
  },
  /**
   * 邮箱登录(邮箱+邮箱验证码)
   * data 请求参数 说明
   * @param {String} email 邮箱
   * @param {String} code  邮箱收到的验证码
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   * @param {String} token 注册完成自动登录之后返回的token信息
   * @param {String} tokenExpired token过期时间
   */
  loginByEmail: function loginByEmail() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    addLoading(obj, "login");
    return callFunction(_objectSpread({
      url: 'user/pub/loginByEmail'
    }, obj));
  },
  /**
   * 发送邮件验证码
   * data 请求参数 说明
   * @param {String} email 邮箱
   * @param {String} type  验证码类型
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   * @param {String} email 手机号
   * @param {String} verifyCode 验证码
   */
  sendEmailCode: function sendEmailCode() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    addLoading(obj, "loading");
    return callFunction(_objectSpread(_objectSpread({}, obj), {}, {
      url: 'user/pub/sendEmailCode'
    }));
  },
  /**
   * 根据邮箱+验证码重置密码
   * data 请求参数 说明
   * @param {String} password 重置后的密码
   * @param {String} code 验证码
   * @param {String} email 邮箱号码
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   */
  resetPasswordByEmail: function resetPasswordByEmail() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    addLoading(obj, "loading");
    return callFunction(_objectSpread(_objectSpread({}, obj), {}, {
      url: 'user/pub/resetPasswordByEmail'
    }));
  },
  /**
   * 设置验证码
   * @description 设置验证码(此接口正式环境不要暴露,故写在了sys目录下)
   * data 请求参数 说明
   * @param {String} email  邮箱
   * @param {String} mobile 手机号
   * @param {String} type  验证码类型
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   * @param {String} email 邮箱
   * @param {String} mobile 手机号
   * @param {String} verifyCode 验证码(uni 1.1.2开始不再返回verifyCode)
   */
  setVerifyCode: function setVerifyCode() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    addLoading(obj, "loading");
    return callFunction(_objectSpread(_objectSpread({}, obj), {}, {
      url: 'user/sys/setVerifyCode'
    }));
  },
  /**
   * 微信登录获取用户code
   */
  getWeixinCode: function getWeixinCode() {
    return new Promise(function (resolve, reject) {
      uni.login({
        provider: 'weixin',
        success: function success(res) {
          resolve(res.code);
        },
        fail: function fail(err) {
          reject(new Error('微信登录失败'));
        }
      });
    });
  },
  /**
   * 用户登录(微信授权)
   * @description 用户登录(微信授权)
   * data 请求参数 说明
   * @param {String} code 微信登录返回的code
   * @param {String} platform 客户端类型：mp-weixin、app-plus，默认uni-id会自动取客户端类型，但是在云函数url化等场景无法取到客户端类型，可以使用此参数指定
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   * @param {String} token 登录成功之后返回的token信息
   * @param {String} tokenExpired token过期时间
   */
  loginByWeixin: function loginByWeixin() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var that = this;
    (0, _debounce.default)(function () {
      addLoading(obj, "login");
      var _obj$data = obj.data,
        data = _obj$data === void 0 ? {} : _obj$data;
      that.getWeixinCode().then(function (code) {
        callFunction(_objectSpread(_objectSpread({
          url: 'user/pub/loginByWeixin'
        }, obj), {}, {
          data: _objectSpread({
            code: code
          }, data)
        }));
      });
    }, debounceTime, true, "login");
  },
  /**
   * 获取微信openid
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   * @param {String} openid 用户openid
   * @param {String} unionid 用户unionid，可以取到此值时返回
   * @param {String} sessionKey 客户端为微信小程序时返回
   * @param {String} accessToken 客户端为APP时返回
   * @param {String} expiresIn 客户端为APP时返回，accessToken 接口调用凭证超时时间，单位（秒）
   * @param {String} refreshToken 客户端为APP时返回，用于刷新accessToken
   */
  code2SessionWeixin: function code2SessionWeixin() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var that = this;
    addLoading(obj, "loading");
    var _obj$data2 = obj.data,
      data = _obj$data2 === void 0 ? {} : _obj$data2;
    that.getWeixinCode().then(function (code) {
      callFunction(_objectSpread(_objectSpread({}, obj), {}, {
        url: 'user/pub/code2SessionWeixin',
        data: _objectSpread({
          code: code
        }, data)
      }));
    });
  },
  /**
   * 绑定微信
   * @description 将当前登录用户绑定微信
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   */
  bindWeixin: function bindWeixin() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var that = this;
    addLoading(obj, "loading");
    var _obj$data3 = obj.data,
      data = _obj$data3 === void 0 ? {} : _obj$data3;
    that.getWeixinCode().then(function (code) {
      callFunction(_objectSpread(_objectSpread({}, obj), {}, {
        url: 'user/kh/bindWeixin',
        data: _objectSpread({
          code: code
        }, data)
      }));
    });
  },
  /**
   * 解绑微信
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   */
  unbindWeixin: function unbindWeixin() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    addLoading(obj, "loading");
    var _obj$data4 = obj.data,
      data = _obj$data4 === void 0 ? {} : _obj$data4;
    return callFunction(_objectSpread(_objectSpread({}, obj), {}, {
      url: 'user/kh/unbindWeixin'
    }));
  },
  /**
   * 获取微信绑定的手机号(后面会支持支付宝)
   * data 请求参数
   * @param {String} encryptedData
   * @param {String} iv
   * @param {String} sessionKey
   */
  getPhoneNumber: function getPhoneNumber() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    addLoading(obj, "loading");
    return callFunction(_objectSpread(_objectSpread({}, obj), {}, {
      url: 'user/pub/getPhoneNumber'
    }));
  },
  /**
   * 通过微信小程序绑定的手机号登录
   * data 请求参数 说明
   * @param {String} encryptedData
   * @param {String} iv
   * @param {String} sessionKey
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   * @param {String} token 登录成功之后返回的token信息
   * @param {String} tokenExpired token过期时间
   */
  loginByWeixinPhoneNumber: function loginByWeixinPhoneNumber() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return (0, _debounce.default)(function () {
      addLoading(obj, "login");
      return callFunction(_objectSpread({
        url: 'user/pub/loginByWeixinPhoneNumber'
      }, obj));
    }, debounceTime, true, "login");
  },
  /**
   * 生成微信小程序码
   * @param {String} scene        自定义参数最大32个可见字符 只支持数字，大小写英文以及部分特殊字符：!#$&'()*+,/:;=?@-._~
   * @param {String} page         必须是已经发布的小程序存在的页面（否则报错），例如 pages/index/index, 根路径前不要填加 /,不能携带参数（参数请放在scene字段里），如果不填写这个字段，默认跳主页面
   * @param {number} width        二维码的宽度，单位 px，最小 280px，最大 1280px
   * @param {boolean} auto_color  自动配置线条颜色，如果颜色依然是黑色，则说明不建议配置主色调，默认 false
   * @param {Object} line_color   auto_color 为 false 时生效，使用 rgb 设置颜色 例如 {"r":"xxx","g":"xxx","b":"xxx"} 十进制表示
   * @param {boolean} is_hyaline  是否需要透明底色，为 true 时，生成透明底色的小程序
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   */
  getWeixinMPqrcode: function getWeixinMPqrcode() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    addLoading(obj, "create");
    return callFunction(_objectSpread(_objectSpread({}, obj), {}, {
      url: 'user/kh/getWeixinMPqrcode'
    }));
  },
  /**
   * 生成微信小程序scheme码
   * data 请求参数 说明
   * @param {String} path    小程序页面路径
   * @param {String} query   小程序页面参数
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   */
  getWeixinMPscheme: function getWeixinMPscheme() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    addLoading(obj, "create");
    return callFunction(_objectSpread(_objectSpread({}, obj), {}, {
      url: 'user/kh/getWeixinMPscheme'
    }));
  },
  /**
   * 生成微信小程序url链接
   * data 请求参数 说明
   * @param {String} path    小程序页面路径
   * @param {String} query   小程序页面参数
   * @param {String} env_version  默认值"release"。要打开的小程序版本。正式版为 "release"，体验版为"trial"，开发版为"develop"，仅在微信外打开时生效
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   */
  getWeixinMPurl: function getWeixinMPurl() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    addLoading(obj, "create");
    return callFunction(_objectSpread(_objectSpread({}, obj), {}, {
      url: 'user/kh/getWeixinMPurl'
    }));
  },
  /**
   * 获取支付宝code
   */
  getAlipayCode: function getAlipayCode() {},
  /**
   * 支付宝登录
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   * @param {String} token 登录成功之后返回的token信息
   * @param {String} tokenExpired token过期时间
   */
  loginByAlipay: function loginByAlipay() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var that = this;
    (0, _debounce.default)(function () {
      addLoading(obj, "login");
      var _obj$data5 = obj.data,
        data = _obj$data5 === void 0 ? {} : _obj$data5;
      that.getAlipayCode().then(function (code) {
        callFunction(_objectSpread(_objectSpread({
          url: 'user/pub/loginByAlipay'
        }, obj), {}, {
          data: _objectSpread(_objectSpread({}, data), {}, {
            code: code
          })
        }));
      });
    }, debounceTime, true, "login");
  },
  /**
   * 获取支付宝openid
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   * @param {String} openid 用户openid
   * @param {String} accessToken 客户端为APP时返回
   * @param {String} expiresIn 客户端为APP时返回，accessToken 接口调用凭证超时时间，单位（秒）
   * @param {String} refreshToken 客户端为APP时返回，用于刷新accessToken
   * @param {String} reExpiresIn refreshToken超时时间，单位（秒）
   */
  code2SessionAlipay: function code2SessionAlipay() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var that = this;
    addLoading(obj, "loading");
    var _obj$data6 = obj.data,
      data = _obj$data6 === void 0 ? {} : _obj$data6;
    that.getAlipayCode().then(function (code) {
      callFunction(_objectSpread(_objectSpread({}, obj), {}, {
        url: 'user/pub/code2SessionAlipay',
        data: _objectSpread(_objectSpread({}, data), {}, {
          code: code
        })
      }));
    });
  },
  /**
   * 绑定支付宝
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   */
  bindAlipay: function bindAlipay() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var that = this;
    addLoading(obj, "loading");
    var _obj$data7 = obj.data,
      data = _obj$data7 === void 0 ? {} : _obj$data7;
    that.getAlipayCode().then(function (code) {
      callFunction(_objectSpread(_objectSpread({}, obj), {}, {
        url: 'user/kh/bindAlipay',
        data: _objectSpread(_objectSpread({}, data), {}, {
          code: code
        })
      }));
    });
  },
  /**
   * 解绑支付宝
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   */
  unbindAlipay: function unbindAlipay() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    addLoading(obj, "loading");
    return callFunction(_objectSpread(_objectSpread({}, obj), {}, {
      url: 'user/kh/unbindAlipay'
    }));
  },
  /**
   * 生成支付宝小程序码
   * @param {String} page         必须是已经发布的小程序存在的页面（否则报错），例如 pages/index/index, 根路径前不要填加 /,不能携带参数（参数请放在scene字段里），如果不填写这个字段，默认跳主页面
   * @param {String} scene        最大32个可见字符，只支持数字，大小写英文以及部分特殊字符：!#$&'()*+,/:;=?@-._~，其它字符请自行编码为合法字符（因不支持%，中文无法使用 urlencode 处理，请使用其他编码方式）
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   */
  getAlipayMiniCode: function getAlipayMiniCode() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    addLoading(obj, "create");
    return callFunction(_objectSpread(_objectSpread({}, obj), {}, {
      url: 'user/kh/getAlipayMiniCode'
    }));
  },
  /**
   * 密码加密测试(暂不用)
   */
  encryptPwd: function encryptPwd() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    addLoading(obj, "loading");
    return callFunction(_objectSpread(_objectSpread({}, obj), {}, {
      url: 'user/sys/encryptPwd'
    }));
  },
  // 1.1.2新增
  /**
   * 设置用户邀请码(自动生成)
   * @description 针对未生成邀请码的用户使用此方法生成邀请码(自动生成)
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   * @param {String} myInviteCode 最终设置的邀请码
   */
  setUserInviteCode: function setUserInviteCode() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    addLoading(obj, "loading");
    return callFunction(_objectSpread(_objectSpread({}, obj), {}, {
      url: 'user/kh/setUserInviteCode'
    }));
  },
  /**
   * 用户接受邀请
   * @description 此接口用于在注册之后再填写邀请码的场景，多数情况下不会用到此接口而是在注册时填写邀请码
   * data 请求参数 说明
   * @param {String} inviteCode 邀请人的邀请码
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   */
  acceptInvite: function acceptInvite() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    addLoading(obj, "loading");
    return callFunction(_objectSpread(_objectSpread({}, obj), {}, {
      url: 'user/kh/acceptInvite'
    }));
  },
  /**
   * 获取接受邀请的用户清单
   * data 请求参数 说明
   * @param {Number}         pageIndex 当前页码
   * @param {Number}         pageSize  每页显示数量
   * @param {Array<Object>}  sortRule  排序规则
   * @param {object}         formData  查询条件数据源
   * @param {Array<Object>}  columns   查询条件规则
   * res 返回参数说明
   * @param {Number}         code      错误码，0表示成功
   * @param {String}         msg       详细信息
   */
  getInvitedUser: function getInvitedUser() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    addLoading(obj, "loading");
    return callFunction(_objectSpread(_objectSpread({}, obj), {}, {
      url: 'user/kh/getInvitedUser'
    }));
  },
  /**
   * 根据手机验证码重置账号密码
   * data 请求参数 说明
   * @param {String} password 重置后的密码
   * @param {String} code 验证码
   * @param {String} mobile 手机号
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   */
  resetPasswordByMobile: function resetPasswordByMobile() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    addLoading(obj, "loading");
    return callFunction(_objectSpread(_objectSpread({}, obj), {}, {
      url: 'user/pub/resetPasswordByMobile'
    }));
  },
  /**
   * 获取我拥有的菜单列表
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   * @param {String} menus 树形结构的菜单
   * @param {String} menuList 数组结构的菜单
   * @param {String} userInfo 用户信息
   */
  getMenu: function getMenu() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return callFunction(_objectSpread(_objectSpread({}, obj), {}, {
      url: 'user/kh/getMenu'
    }));
  },
  /**
   * 添加文件上传记录
   * data 请求参数 说明
   * @param {String} url					文件外网访问url
   * @param {String} name 				文件名
   * @param {Number} size				文件大小
   * @param {String} file_id			文件id
   * @param {String} provider		供应商
   * @param {String} category_id 分类ID
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   */
  addUploadRecord: function addUploadRecord() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var fileType = obj.fileType,
      filePath = obj.filePath;
    if (fileType === "image") {
      uni.getImageInfo({
        src: filePath,
        success: function success(res) {
          return callFunction(_objectSpread(_objectSpread({}, obj), {}, {
            url: 'user/kh/addUploadRecord',
            data: _objectSpread(_objectSpread({}, obj.data), {}, {
              orientation: res.orientation,
              width: res.width,
              height: res.height
            })
          }));
        },
        fail: function fail(err) {
          console.error(err);
        }
      });
    } else if (fileType === "video") {
      uni.getVideoInfo({
        src: filePath,
        success: function success(res) {
          return callFunction(_objectSpread(_objectSpread({}, obj), {}, {
            url: 'user/kh/addUploadRecord',
            data: _objectSpread(_objectSpread({}, obj.data), {}, {
              duration: parseFloat(res.duration.toFixed(3)),
              width: res.width,
              height: res.height
            })
          }));
        },
        fail: function fail(err) {
          console.error(err);
        }
      });
    } else {
      return callFunction(_objectSpread(_objectSpread({}, obj), {}, {
        url: 'user/kh/addUploadRecord'
      }));
    }
  },
  /**
   * 获取QQ code
   */
  getQQCode: function getQQCode() {},
  /**
   * QQ登录
   * data 请求参数 说明
   * @param {String} type 可传login或register，若为login：则不存在不会自动注册，若为register，则用户存在会报错，不传，则存在自动登录，不存在，则注册。
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   * @param {String} token 登录成功之后返回的token信息
   * @param {String} tokenExpired token过期时间
   */
  loginByQQ: function loginByQQ() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var that = this;
    (0, _debounce.default)(function () {
      addLoading(obj, "login");
      var _obj$data8 = obj.data,
        data = _obj$data8 === void 0 ? {} : _obj$data8;
      that.getQQCode().then(function () {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          code = _ref.code,
          accessToken = _ref.accessToken;
        callFunction(_objectSpread(_objectSpread({
          url: 'user/pub/loginByQQ'
        }, obj), {}, {
          data: _objectSpread(_objectSpread({}, data), {}, {
            code: code,
            accessToken: accessToken
          })
        }));
      });
    }, debounceTime, true, "login");
  },
  /**
   * 绑定QQ
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   */
  bindQQ: function bindQQ() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var that = this;
    addLoading(obj, "loading");
    var _obj$data9 = obj.data,
      data = _obj$data9 === void 0 ? {} : _obj$data9;
    that.getQQCode().then(function () {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        code = _ref2.code,
        accessToken = _ref2.accessToken;
      callFunction(_objectSpread(_objectSpread({}, obj), {}, {
        url: 'user/kh/bindQQ',
        data: _objectSpread(_objectSpread({}, data), {}, {
          code: code,
          accessToken: accessToken
        })
      }));
    });
  },
  /**
   * 解绑QQ
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   */
  unbindQQ: function unbindQQ() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    addLoading(obj, "loading");
    return callFunction(_objectSpread(_objectSpread({}, obj), {}, {
      url: 'user/kh/unbindQQ'
    }));
  },
  /**
   * 生成qq小程序码
   * @param {String} path         必须是已经发布的小程序存在的页面（否则报错），例如 pages/index/index, 根路径前不要填加 /,不能携带参数（参数请放在scene字段里），如果不填写这个字段，默认跳主页面
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   */
  getQQMiniCode: function getQQMiniCode() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    addLoading(obj, "create");
    return callFunction(_objectSpread(_objectSpread({}, obj), {}, {
      url: 'user/kh/getQQMiniCode'
    }));
  },
  /**
   * App升级中心 - 检测是当前版本是否需要升级
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   */
  checkVersion: function checkVersion() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return callFunction(_objectSpread(_objectSpread({}, obj), {}, {
      url: 'user/pub/checkVersion'
    }));
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 56 */
/*!*************************************************************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-client/uni_modules/vk-unicloud/vk_modules/vk-unicloud-page/libs/vk-unicloud/vk-unicloud-callFunctionUtil.js ***!
  \*************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, uniCloud) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var vk = {};
var counterNum = 0;
var uniCloudEnvs = {}; // uniCloud 环境列表
var lastToLoginTime = 0;
var CallFunctionUtil = /*#__PURE__*/function () {
  function CallFunctionUtil() {
    var _this = this;
    (0, _classCallCheck2.default)(this, CallFunctionUtil);
    this.config = {
      // 是否开启测试环境的云函数，true：使用测试环境，false：使用正式环境，默认true
      isTest: false,
      // 设为false可关闭打印日志
      debug: true,
      // 云函数路由（主函数名）
      functionName: "router",
      // 云函数路由（开发测试函数名）
      testFunctionName: "router-test",
      // 云函数url化后对应的url地址
      functionNameToUrl: {
        "router": "https://xxxxxxx.bspapp.com/http/router",
        "router-test": "https://xxxxxxx.bspapp.com/http/router"
      },
      // vk.callFunction的isRequest的默认值
      isRequestDefault: false,
      // 默认时区（中国为8）
      targetTimezone: 8,
      // 客户端登录页面地址
      login: {
        url: '/pages_template/uni-id/login/index/index'
      },
      // 请求配置
      request: {
        // 公共请求参数(每次请求都会带上的参数)
        dataParam: {}
      },
      // 日志风格
      logger: {
        colorArr: ["#0095ff", "#67C23A"]
      },
      // 缓存键名 - token（请勿修改）
      uniIdTokenKeyName: "uni_id_token",
      // 缓存键名 - token过期时间（请勿修改）
      uniIdTokenExpiredKeyName: "uni_id_token_expired",
      // 缓存键名 - 当前登录用户信息（请勿修改）
      uniIdUserInfoKeyName: "uni_id_user_info",
      // 缓存键名 - 公共请求参数（请勿修改）
      requestGlobalParamKeyName: "vk_request_global_param",
      // 监听token刷新事件的事件名
      onRefreshTokenEventName: "onRefreshToken",
      // 自定义组件配置
      components: {}
    };
    /**
     * 获取我的token
     * vk.getToken();
     */
    this.getToken = function () {
      var res = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var config = _this.config;
      return vk.getStorageSync(config.uniIdTokenKeyName);
    };
    /**
     * 保存新的token
     * 可通过下方的代码监听token的改变（写在app.vue的onLaunch内）
    vk.$on('onRefreshToken',(data) => {
    	console.log('token改变监听：', data);
    });
     */
    this.saveToken = function () {
      var res = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var config = _this.config;
      vk.setStorageSync(config.uniIdTokenKeyName, res.token);
      vk.setStorageSync(config.uniIdTokenExpiredKeyName, res.tokenExpired);
      _this.emitRefreshToken(res); // 触发token刷新事件
      if (_this.config.debug) console.log("--------【token已更新】--------");
    };
    // 删除token，并删除userInfo缓存
    this.deleteToken = function () {
      var config = _this.config;
      vk.removeStorageSync(config.uniIdTokenKeyName);
      vk.removeStorageSync(config.uniIdTokenExpiredKeyName);
      _this.deleteUserInfo();
      _this.emitRefreshToken(); // 触发token刷新事件
      if (_this.config.debug) console.log("--------【token已删除】--------");
    };
    // 更新userInfo缓存
    this.updateUserInfo = function () {
      var res = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var config = _this.config;
      var _res$userInfo = res.userInfo,
        userInfo = _res$userInfo === void 0 ? {} : _res$userInfo;
      if (typeof vk.setVuex === "function") {
        // 有安装vuex则使用vuex
        vk.setVuex('$user.userInfo', userInfo);
      } else {
        // 否则使用本地缓存
        vk.setStorageSync(config.uniIdUserInfoKeyName, userInfo);
      }
      //if (this.config.debug) console.log("--------【用户信息已更新】--------");
    };
    // 删除userInfo缓存
    this.deleteUserInfo = function () {
      var res = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _res$log = res.log,
        log = _res$log === void 0 ? true : _res$log;
      var config = _this.config;
      if (typeof vk.setVuex === "function") {
        // 有安装vuex则使用vuex
        vk.setVuex('$user.userInfo', {});
        vk.setVuex('$user.permission', []);
        vk.removeStorageSync(config.uniIdUserInfoKeyName);
      } else {
        // 否则使用本地缓存
        vk.removeStorageSync(config.uniIdUserInfoKeyName);
      }
      if (_this.config.debug && log) console.log("--------【用户信息已删除】--------");
    };
    // 检查token是否有效(本地版)
    // let valid = vk.callFunctionUtil.checkToken();
    this.checkToken = function () {
      var res = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var config = _this.config;
      var token = uni.getStorageSync(config.uniIdTokenKeyName);
      var tokenExpired = uni.getStorageSync(config.uniIdTokenExpiredKeyName);
      var valid = false;
      if (token && tokenExpired && tokenExpired > Date.now()) {
        valid = true;
      }
      return valid;
    };
    /**
     * 触发监听token更新事件
     */
    this.emitRefreshToken = function () {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var config = _this.config;
      return vk.$emit(config.onRefreshTokenEventName, data); // 触发token刷新事件
    };
    /**
     * 监听token更新事件
     */
    this.onRefreshToken = function (callback) {
      var config = _this.config;
      return vk.$on(config.onRefreshTokenEventName, callback);
    };
    /**
     * 移除token更新事件
     */
    this.offRefreshToken = function (callback) {
      var config = _this.config;
      return vk.$off(config.onRefreshTokenEventName, callback);
    };
    /**
     * 修改请求配置中的公共请求参数
     * 若把shop-manage改成*则代表全局
    	vk.callFunctionUtil.updateRequestGlobalParam({
    		"shop-manage":{
    			regExp:"^xxx/kh/",
    			data:{
    				shop_id : shop_id
    			}
    		}
    	});
    	对应的callFunction中增加参数globalParamName:"shop-manage"
    	vk.callFunction({
    		url: 'xxx/xxxxxx',
    		title: '请求中...',
    		globalParamName:"shop-manage",// 如果设置了正则规则,则不需要此参数
    		data: {},
    		success(data) {
    		}
    	});
     */
    this.updateRequestGlobalParam = function () {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var setKey = arguments.length > 1 ? arguments[1] : undefined;
      var config = _this.config;
      if (setKey) {
        // 覆盖对象
        config.request.dataParam = data;
      } else {
        // 覆盖参数（有就覆盖，没有则新增）
        var dataParam = uni.getStorageSync(config.requestGlobalParamKeyName) || {};
        config.request.dataParam = Object.assign(dataParam, data);
      }
      vk.setStorageSync(config.requestGlobalParamKeyName, config.request.dataParam);
    };
    /**
     * 获取请求配置中的公共请求参数
    	vk.callFunctionUtil.getRequestGlobalParam();
     */
    this.getRequestGlobalParam = function () {
      var globalParamName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "*";
      var config = _this.config;
      var data = config.request.dataParam;
      if (!data || JSON.stringify(data) === "{}") {
        data = uni.getStorageSync(config.requestGlobalParamKeyName) || {};
        config.request.dataParam = data;
      }
      var param = data[globalParamName] || {};
      return JSON.parse(JSON.stringify(param));
    };
    /**
     * 删除请求配置中的公共请求参数
     * globalParamName 不传代表删除所有
    	vk.callFunctionUtil.deleteRequestGlobalParam(globalParamName);
     */
    this.deleteRequestGlobalParam = function (globalParamName) {
      var config = _this.config;
      var globalParam = uni.getStorageSync(config.requestGlobalParamKeyName) || {};
      if (globalParamName) {
        delete globalParam[globalParamName];
      } else {
        globalParam = {};
      }
      config.request.dataParam = globalParam;
      vk.setStorageSync(config.requestGlobalParamKeyName, globalParam);
    };
    // 拦截器
    this.interceptor = {
      // 拦截1301、1302错误码（非法token和token失效）
      login: function login() {
        var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var nowTime = Date.now();
        if (nowTime - lastToLoginTime < 300) {
          return false;
        }
        lastToLoginTime = nowTime;
        var params = obj.params,
          res = obj.res;
        var config = _this.config;
        var callFunction = _this.callFunction;
        if (config.debug) console.log("跳登录页面");
        var _config$tokenExpiredA = config.tokenExpiredAutoDelete,
          tokenExpiredAutoDelete = _config$tokenExpiredA === void 0 ? true : _config$tokenExpiredA;
        if (tokenExpiredAutoDelete) _this.deleteToken();
        setTimeout(function () {
          if (config.login.url) {
            var currentPage = getCurrentPages()[getCurrentPages().length - 1];
            if (currentPage && currentPage.route && "/" + currentPage.route === config.login.url) {
              return false;
            }
            // 此处代码是为了防止首页启动时检测和正常检测冲突-----------------------------------------------------------
            if (vk.navigate.isOnLaunchToLogin) {
              setTimeout(function () {
                vk.navigate.isOnLaunchToLogin = false;
              }, 500);
              return false;
            }
            // 此处代码是为了防止首页启动时检测和正常检测冲突-----------------------------------------------------------
            uni.navigateTo({
              url: config.login.url,
              events: {
                // 监听登录成功后的事件
                loginSuccess: function loginSuccess(data) {
                  var num = 2;
                  var pages = getCurrentPages();
                  if (pages.length >= num) {
                    var that = pages[pages.length - num];
                    if (typeof that.onLoad == "function") {
                      // 重新执行页面onLoad函数
                      that.onLoad(that.options);
                    } else if (typeof that.init == "function") {
                      // 重新执行页面初始化函数
                      that.init(that.options);
                    } else {
                      // 重新执行一次云函数调用
                      callFunction(params);
                    }
                  } else {
                    // 重新执行一次云函数调用
                    callFunction(params);
                  }
                }
              }
            });
          } else {
            if (params.needAlert) {
              vk.alert(res.result.msg);
            }
          }
        }, 0);
      },
      // 全局请求失败拦截器
      fail: function fail() {
        var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return true;
      }
    };
    /**
     * 云函数请求封装 - 统一入口
     * @description 通过云函数路由，1个云函数实现多个云函数的效果。
     * @param {String}   name       大云函数名称（默认router）
     * @param {String}   url        请求路径
     * @param {Object}   data       请求参数，如 { a:1, b:"2" } 云函数内可通过 let { a, b } = data; 获取参数
     * @param {String}   title      遮罩层提示语，为空或不传则代表不显示遮罩层。
     * @param {Boolean|Object}  loading    若设置为false，即使title有值也不显示遮罩层
     * @param {Boolean}  isRequest  是否使用云函数url化地址访问云函数，默认false
     * @param {String}   env        云空间环境 文档：https://vkdoc.fsq.pub/client/question/q9.html#%E5%89%8D%E7%AB%AF%E8%AF%B7%E6%B1%82%E5%A4%9A%E6%9C%8D%E5%8A%A1%E7%A9%BA%E9%97%B4
     * @param {Boolean}  needAlert  为true代表请求错误时，会有弹窗提示，默认为true
     * @param {Number}   retryCount 系统异常重试机制（表单提交时慎用，建议只用在查询请求中，即无任何数据库修改的请求中）
     * @param {Function} success    请求成功时，执行的回调函数
     * @param {Function} fail  	 	  请求失败时，执行的回调函数
     * @param {Function} complete   无论请求成功与否，都会执行的回调函数
     */
    this.callFunction = function () {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var that = _this;
      var config = that.config;
      var url = obj.url,
        _obj$data = obj.data,
        data = _obj$data === void 0 ? {} : _obj$data,
        globalParamName = obj.globalParamName;
      if (!url) {
        vk.toast('vk.callFunction的url参数不能为空');
        return;
      }
      if (obj.retryCount) {
        // 系统异常重试机制（表单提交时慎用，建议只用在查询请求中，即无任何数据库修改的请求中）
        return that.callFunctionRetry(obj);
      }
      // 去除值为 undefined 的参数
      if ((0, _typeof2.default)(data) === "object") {
        obj.data = vk.pubfn.copyObject(data);
      }
      // 注入自定义全局参数开始-----------------------------------------------------------
      var globalParam = uni.getStorageSync(config.requestGlobalParamKeyName) || {};
      // 根据正则规格自动匹配全局请求参数
      for (var i in globalParam) {
        var _customDate = globalParam[i];
        if (_customDate.regExp) {
          if ((0, _typeof2.default)(_customDate.regExp) === "object") {
            // 数组形式
            for (var _i = 0; _i < _customDate.regExp.length; _i++) {
              var regExp = new RegExp(_customDate.regExp[_i]);
              if (regExp.test(url)) {
                obj.data = Object.assign(_customDate.data, obj.data);
                break;
              }
            }
          } else {
            // 字符串形式
            var _regExp = new RegExp(_customDate.regExp);
            if (_regExp.test(url)) {
              obj.data = Object.assign(_customDate.data, obj.data);
            }
          }
        }
      }
      // 根据指定globalParamName匹配全局请求参数
      var customDate = that.getRequestGlobalParam(globalParamName);
      if (customDate && JSON.stringify(customDate) !== "{}") {
        if (customDate.regExp) {
          obj.data = Object.assign(customDate.data, obj.data); // 新版本
        } else {
          obj.data = Object.assign(customDate, obj.data); // 兼容旧版本
        }
      }
      // 注入自定义全局参数结束-----------------------------------------------------------
      // 若执行的函数不是pub类型函数，则先本地判断下token，可以提高效率。
      // if (url.indexOf("/pub/") == -1 && url.indexOf("/pub_") == -1) {
      // 若执行的函数是kh或sys类型函数，先本地判断下token，可以提高效率。
      if (url.indexOf("/kh/") > -1 || url.indexOf("/sys/") > -1 || url.indexOf(".") > -1 && url.indexOf("pub_") == -1 && url.indexOf("/pub/") == -1 && url.indexOf("/pub.") == -1 && url.indexOf("pub.") !== 0 && url.indexOf("pub_") !== 0) {
        if (!vk.checkToken()) {
          // 若本地token校验未通过，则直接执行 login 拦截器函数
          return new Promise(function (resolve, reject) {
            // 执行 login 拦截器函数（跳转到页面页面）
            var res = {
              code: 30204,
              msg: "本地token校验未通过"
            };
            var params = obj;
            if (typeof that.interceptor.login === "function") {
              that.interceptor.login({
                res: res,
                params: params,
                vk: vk
              });
            }
            reject(res);
          });
        }
      }
      if (typeof obj.isRequest === "undefined") {
        obj.isRequest = config.isRequestDefault;
      }
      // 执行请求
      if (obj.isRequest) {
        return that.runRequest(obj);
      } else {
        return that.runCallFunction(obj);
      }
    };

    // 设置全局默认配置
    this.setConfig = function () {
      var customConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      for (var key in customConfig) {
        if (key === "vk") {
          vk = customConfig[key];
        } else if (key === "interceptor") {
          _this.interceptor = Object.assign(_this.interceptor, customConfig[key]);
          _this.config.interceptor = customConfig[key];
        } else if (key === "myfn") {
          vk.myfn = customConfig[key];
        } else if (key === "loginPagePath") {
          // 兼容老版本
          _this.config.login.url = customConfig[key];
        } else if (key === "uniCloud") {
          var uniCloudConfig = customConfig[key];
          if (uniCloudConfig && uniCloudConfig.envs) {
            for (var envKey in uniCloudConfig.envs) {
              var envItem = uniCloudConfig.envs[envKey];
              if (envItem && envItem.provider && envItem.spaceId) {
                var initConifg = {
                  provider: envItem.provider,
                  spaceId: envItem.spaceId
                };
                if (envItem.clientSecret) initConifg.clientSecret = envItem.clientSecret;
                if (envItem.endpoint) initConifg.endpoint = envItem.endpoint;
                uniCloudEnvs[envKey] = uniCloud.init(initConifg);
              }
            }
          }
        } else if ((0, _typeof2.default)(customConfig[key]) === "object" && (0, _typeof2.default)(_this.config[key]) === "object") {
          _this.config[key] = Object.assign(_this.config[key], customConfig[key]);
        } else if (typeof customConfig[key] !== "undefined") {
          _this.config[key] = customConfig[key];
        }
      }
    };
    /**
     * 获取vk前端配置
     * 示例
     * vk.callFunctionUtil.getConfig();
     * vk.callFunctionUtil.getConfig("login.url");
     */
    this.getConfig = function (key) {
      var config = _this.config;
      if (key) {
        return vk.pubfn.getData(config, key);
      } else {
        return config;
      }
    };

    // 初始化
    this.init = function () {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      vk = obj.vk;
    };
    /**
     * 云函数上传图片
     * @param {String} 	title										上传时的loading提示语
     * @param {String} 	file										要上传的文件对象，file与filePath二选一即可
     * @param {String} 	filePath								要上传的文件路径，file与filePath二选一即可	
     * @param {String} 	suffix									指定上传后的文件后缀，如果传了file 参数，则此参数可不传
     * @param {String} 	provider								云存储供应商，支持：unicloud、aliyun	
     * @param {String} 	cloudPath								指定上传后的云端文件路径（不指定会自动生成）cloudPath优先级大于cloudDirectory
     * @param {String} 	cloudDirectory					指定上传后的云端文件目录（不指定会自动生成）
     * @param {String} 	needSave								是否需要将图片信息保存到admin素材库
     * @param {String} 	category_id							素材库分类id，当needSave为true时生效	
     * @param {String} 	uniCloud								上传到其他空间时使用，uniCloud和env二选一即可
     * @param {String} 	env											上传到其他空间时使用，uniCloud和env二选一即可
     * @param {String} 	cloudPathAsRealPath			阿里云目录支持，需HBX3.8.5以上版本才支持
     * @param {String} 	cloudPathRemoveChinese	删除文件名中的中文
     * @param {String} 	fileType								文件类型，可选image、video、audio 不用传，会自动识别
     * @param {Function} onUploadProgress				上传进度回调
     * @param {Function} success								上传成功时，执行的回调函数
     * @param {Function} fail  	 								上传失败时，执行的回调函数
     * @param {Function} complete 							无论上传成功与否，都会执行的回调函数
     * vk.callFunctionUtil.uploadFile
     */
    this.uploadFile = function () {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var that = _this;
      var config = that.config;
      if (!obj.filePath && obj.file && obj.file.path) obj.filePath = obj.file.path;
      var filePath = obj.filePath,
        cloudPath = obj.cloudPath,
        title = obj.title,
        errorToast = obj.errorToast,
        needAlert = obj.needAlert,
        _success = obj.success,
        _fail = obj.fail,
        _complete = obj.complete,
        type = obj.type,
        provider = obj.provider,
        _obj$file = obj.file,
        file = _obj$file === void 0 ? {} : _obj$file,
        _obj$needSave = obj.needSave,
        needSave = _obj$needSave === void 0 ? false : _obj$needSave,
        category_id = obj.category_id,
        myCloud = obj.uniCloud,
        _obj$env = obj.env,
        env = _obj$env === void 0 ? "default" : _obj$env,
        _obj$cloudPathAsRealP = obj.cloudPathAsRealPath,
        cloudPathAsRealPath = _obj$cloudPathAsRealP === void 0 ? true : _obj$cloudPathAsRealP,
        _obj$cloudPathRemoveC = obj.cloudPathRemoveChinese,
        cloudPathRemoveChinese = _obj$cloudPathRemoveC === void 0 ? true : _obj$cloudPathRemoveC,
        cloudDirectory = obj.cloudDirectory;
      // 获取文件类型(image:图片 video:视频 other:其他)
      var fileType = _this.getFileType(obj);
      obj.fileType = fileType;
      if (type && !provider) provider = type;
      if (!provider) {
        var aliyunOSS = vk.pubfn.getData(config, "service.aliyunOSS");
        if (aliyunOSS && aliyunOSS.isDefault) {
          provider = "aliyun";
        } else {
          provider = "unicloud";
        }
      }
      if (provider === "aliyun") {
        return vk.aliyunOSSUtil.uploadFile(obj);
      }
      if (title) vk.showLoading(title);
      if (errorToast) needAlert = false;
      // 生成文件名
      if (!cloudPath) cloudPath = _this.createFileName(obj);
      var Logger = {};
      if (config.debug) Logger.filePath = filePath;
      if (config.debug) Logger.startTime = Date.now();
      var runCloud = myCloud || uniCloudEnvs[env] || uniCloud;
      return new Promise(function (resolve, reject) {
        runCloud.uploadFile({
          filePath: filePath,
          cloudPath: cloudPath,
          fileType: fileType,
          cloudPathAsRealPath: cloudPathAsRealPath,
          onUploadProgress: function onUploadProgress(progressEvent) {
            var percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total);
            if (typeof obj.onUploadProgress == "function") {
              obj.onUploadProgress({
                progressEvent: progressEvent,
                percentCompleted: percentCompleted,
                progress: percentCompleted
              });
            }
          },
          success: function success(res) {
            if (config.debug) Logger.result = (0, _typeof2.default)(res) == "object" ? JSON.parse(JSON.stringify(res)) : res;
            if (title) vk.hideLoading();
            uniCloud.getTempFileURL({
              fileList: [res.fileID],
              success: function success(data) {
                var _data$fileList$ = data.fileList[0],
                  fileID = _data$fileList$.fileID,
                  tempFileURL = _data$fileList$.tempFileURL;
                res.fileID = tempFileURL;
                res.url = tempFileURL;
                res.file_id = fileID;
                if (config.debug) Logger.result.url = tempFileURL;
                if (typeof _success == "function") _success(res);
                resolve(res);
                if (needSave) {
                  // 保存文件记录到数据库
                  vk.userCenter.addUploadRecord({
                    data: {
                      url: res.url,
                      name: file.name,
                      size: file.size,
                      file_id: res.file_id,
                      provider: provider,
                      category_id: category_id
                    },
                    filePath: filePath,
                    fileType: fileType,
                    success: function success() {
                      if (typeof obj.addSuccess == "function") obj.addSuccess(res);
                    },
                    fail: function fail(res) {
                      if (typeof obj.addFail === "function") obj.addFail(res);
                    }
                  });
                }
              }
            });
          },
          fail: function fail(err) {
            if (title) vk.hideLoading();
            if (config.debug) Logger.error = err;
            if (errorToast) vk.toast(JSON.stringify(err), "none");
            if (needAlert) {
              if (config.debug) vk.alert(JSON.stringify(err));
            }
            if (typeof _fail == "function") _fail(err);
            reject(err);
          },
          complete: function complete() {
            if (config.debug) {
              Logger.endTime = Date.now();
              Logger.runTime = Logger.endTime - Logger.startTime;
              var colorArr = config.logger.colorArr;
              var colorStr = colorArr[counterNum % colorArr.length];
              counterNum++;
              console.log("%c--------【开始】【文件上传】--------", 'color: ' + colorStr + ';font-size: 12px;font-weight: bold;');
              console.log("【本地文件】: ", Logger.filePath);
              console.log("【返回数据】: ", Logger.result);
              console.log("【预览地址】: ", Logger.result.fileID);
              console.log("【上传耗时】: ", Logger.runTime, "毫秒");
              console.log("【上传时间】: ", vk.pubfn.timeFormat(Logger.startTime, "yyyy-MM-dd hh:mm:ss"));
              if (Logger.error) console.error("【error】:", Logger.error);
              console.log("%c--------【结束】【文件上传】--------", 'color: ' + colorStr + ';font-size: 12px;font-weight: bold;');
            }
            if (typeof _complete == "function") _complete();
          }
        });
      });
    };
  }
  // 云函数普通请求
  (0, _createClass2.default)(CallFunctionUtil, [{
    key: "runCallFunction",
    value: function runCallFunction() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var that = this;
      var config = that.config;
      var url = obj.url,
        data = obj.data,
        title = obj.title,
        loading = obj.loading,
        isRequest = obj.isRequest,
        name = obj.name,
        complete = obj.complete,
        myCloud = obj.uniCloud,
        _obj$env2 = obj.env,
        env = _obj$env2 === void 0 ? "default" : _obj$env2;
      if (title) vk.showLoading(title);
      if (loading) vk.setLoading(true, loading);
      if (!name) name = config.isTest ? config.testFunctionName : config.functionName;
      obj.name = name;
      var Logger = {};
      if (config.debug) Logger.params = (0, _typeof2.default)(data) == "object" ? JSON.parse(JSON.stringify(data)) : data;
      var promiseAction = new Promise(function (resolve, reject) {
        if (config.debug) Logger.startTime = Date.now();
        var runCloud = myCloud || uniCloudEnvs[env] || uniCloud;
        runCloud.callFunction({
          name: name,
          data: {
            $url: url,
            data: data
          },
          success: function success() {
            var res = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            that.callFunctionSuccess({
              res: res.result,
              params: obj,
              Logger: Logger,
              resolve: resolve,
              reject: reject
            });
          },
          fail: function fail(res) {
            that.callFunctionFail({
              res: res,
              params: obj,
              Logger: Logger,
              reject: reject,
              sysFail: true
            });
          },
          complete: function complete(res) {
            that.callFunctionComplete({
              res: res,
              params: obj,
              Logger: Logger
            });
          }
        });
      });
      promiseAction.catch(function (error) {});
      return promiseAction;
    }

    // 云函数url化请求
  }, {
    key: "runRequest",
    value: function runRequest() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var that = this;
      var config = that.config;
      var url = obj.url,
        data = obj.data,
        title = obj.title,
        loading = obj.loading,
        name = obj.name,
        complete = obj.complete;
      if (typeof obj.needAlert === "undefined") obj.needAlert = true;
      if (!name) name = config.isTest ? config.testFunctionName : config.functionName;
      obj.name = name;
      var requestUrl = config.functionNameToUrl[name];
      var Logger = {};
      if (config.debug) Logger.params = (0, _typeof2.default)(data) == "object" ? JSON.parse(JSON.stringify(data)) : data;
      var uniIdToken = uni.getStorageSync(config.uniIdTokenKeyName);
      var tokenExpired = uni.getStorageSync(config.uniIdTokenExpiredKeyName);
      if (title) vk.showLoading(title);
      if (loading) vk.setLoading(true, loading);
      var promiseAction = new Promise(function (resolve, reject) {
        if (config.debug) Logger.startTime = Date.now();
        uni.request({
          method: "POST",
          url: requestUrl,
          data: {
            $url: url,
            data: data,
            uniIdToken: uniIdToken
          },
          success: function success() {
            var res = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            that.callFunctionSuccess({
              res: res.data,
              params: obj,
              Logger: Logger,
              resolve: resolve,
              reject: reject
            });
          },
          fail: function fail(res) {
            that.callFunctionFail({
              res: res,
              params: obj,
              Logger: Logger,
              reject: reject,
              sysFail: true
            });
          },
          complete: function complete(res) {
            that.callFunctionComplete({
              res: res,
              params: obj,
              Logger: Logger
            });
          }
        });
      });
      promiseAction.catch(function (error) {});
      return promiseAction;
    }

    // 云函数请求成功时执行
  }, {
    key: "callFunctionSuccess",
    value: function callFunctionSuccess(obj) {
      var that = this;
      var config = that.config;
      var _obj$res = obj.res,
        res = _obj$res === void 0 ? {} : _obj$res,
        params = obj.params,
        Logger = obj.Logger,
        resolve = obj.resolve,
        reject = obj.reject;
      var title = params.title,
        loading = params.loading,
        success = params.success;
      if (title) vk.hideLoading();
      if (loading) vk.setLoading(false, loading);
      if (typeof res.code === "undefined" && typeof res.errCode !== "undefined") res.code = res.errCode;
      var code = res.code;
      if (config.debug) Logger.result = (0, _typeof2.default)(res) == "object" ? JSON.parse(JSON.stringify(res)) : res;
      if (code == 0 || res.key == 1 || code == undefined && res.uid) {
        if (res.vk_uni_token) that.saveToken(res.vk_uni_token);
        if (res.userInfo && res.needUpdateUserInfo) that.updateUserInfo(res);
        if (typeof success == "function") success(res);
        resolve(res);
      } else if ([1301, 1302, 30201, 30202, 30203, 30204].indexOf(code) > -1 && res.msg.indexOf("token") > -1) {
        // 执行 login 拦截器函数（跳转到页面页面）
        if (typeof that.interceptor.login === "function") {
          that.interceptor.login({
            res: res,
            params: params,
            vk: vk
          });
        }
        reject(res);
      } else {
        that.callFunctionFail({
          res: res,
          params: params,
          Logger: Logger,
          reject: reject
        });
      }
    }

    // 云函数请求失败时执行
  }, {
    key: "callFunctionFail",
    value: function callFunctionFail(obj) {
      var that = this;
      var config = that.config;
      var _config$globalErrorCo = config.globalErrorCode,
        globalErrorCode = _config$globalErrorCo === void 0 ? {} : _config$globalErrorCo;
      var _obj$res2 = obj.res,
        res = _obj$res2 === void 0 ? {} : _obj$res2,
        params = obj.params,
        Logger = obj.Logger,
        reject = obj.reject,
        sysFail = obj.sysFail;
      var title = params.title,
        loading = params.loading,
        errorToast = params.errorToast,
        noAlert = params.noAlert,
        needAlert = params.needAlert,
        fail = params.fail;
      // 只有是系统异常时才进行重试
      if (params.needRetry) {
        if (sysFail || res.code && [90001].indexOf(res.code) > -1) {
          if (!obj.hookResult || typeof obj.hookResult === "function" && !obj.hookResult(err)) {
            Logger.sysFail = true;
            if (typeof params.retry == "function") params.retry(res, params);
            return false;
          }
        }
      }
      if (typeof noAlert !== "undefined") needAlert = !noAlert;
      if (typeof needAlert === "undefined") {
        needAlert = typeof fail === "function" ? false : true;
      }
      if (errorToast) needAlert = false;
      if (title) vk.hideLoading();
      if (loading) vk.setLoading(false, loading);
      var errMsg = "";
      var sysErr = false;
      if (typeof res.code !== "undefined") {
        if (res.msg) {
          errMsg = res.msg;
        } else if (res.errMsg) {
          errMsg = res.errMsg;
        } else if (res.message) {
          errMsg = res.message;
        }
      } else {
        sysErr = true;
        errMsg = JSON.stringify(res);
      }
      if (typeof errMsg !== "string") errMsg = JSON.stringify(errMsg);
      if (!errMsg) errMsg = "";
      if (res.code >= 90001 && errMsg.indexOf("数据库") > -1) {
        sysErr = true;
      } else if ([404, 500].indexOf(res.code) > -1 && errMsg.indexOf("云函数") > -1) {
        sysErr = true;
      } else if (res.code === 501 && errMsg.indexOf("timeout for 10000ms") > -1 || res.code === "SYS_ERR" && errMsg.indexOf(": request:ok") > -1) {
        errMsg = globalErrorCode["cloudfunction-unusual-timeout"] || "请求超时，但请求还在执行，请重新进入页面。";
      } else if (typeof errMsg.toLowerCase === "function" && (errMsg.toLowerCase().indexOf("timeout") > -1 || errMsg.toLowerCase().indexOf("etimedout") > -1)) {
        sysErr = true;
        errMsg = globalErrorCode["cloudfunction-timeout"] || "请求超时，请重试！";
      } else if (errMsg.indexOf("reaches burst limit") > -1) {
        errMsg = globalErrorCode["cloudfunction-reaches-burst-limit"] || "系统繁忙，请稍后再试。";
      } else if (res.code === "InternalServerError") {
        sysErr = true;
      }
      var runKey = true;
      if (typeof that.interceptor.fail == "function") {
        runKey = that.interceptor.fail({
          vk: vk,
          res: res,
          params: params
        });
        if (runKey === undefined) runKey = true;
      }
      if (runKey) {
        Logger.error = res;
        if (errorToast) vk.toast(errMsg, "none");
        if (needAlert && vk.pubfn.isNotNull(errMsg)) {
          if (sysErr) {
            var toastMsg = globalErrorCode["cloudfunction-system-error"] || "网络开小差了！";
            vk.toast(toastMsg, "none");
          } else {
            vk.alert(errMsg);
          }
        }
        if (typeof fail == "function") fail(res);
      }
      if (typeof reject == "function") reject(res);
    }

    // 云函数请求完成后执行
  }, {
    key: "callFunctionComplete",
    value: function callFunctionComplete(obj) {
      var that = this;
      var config = that.config;
      var _obj$res3 = obj.res,
        res = _obj$res3 === void 0 ? {} : _obj$res3,
        params = obj.params,
        Logger = obj.Logger;
      var name = params.name,
        url = params.url,
        isRequest = params.isRequest,
        complete = params.complete,
        debugLog = params.debug;
      if (params.needRetry && Logger.sysFail) {
        return false;
      }
      if (typeof debugLog === "undefined") debugLog = config.debug;
      if (debugLog) {
        Logger.endTime = Date.now();
        if (isRequest) {
          Logger.label = "【url化】";
        } else {
          Logger.label = "";
        }
        Logger.runTime = Logger.endTime - Logger.startTime;
        var colorArr = config.logger.colorArr;
        var colorStr = colorArr[counterNum % colorArr.length];
        counterNum++;
        var functionType = url.indexOf(".") > -1 ? "云对象" : "云函数";
        console.log("%c--------\u3010\u5F00\u59CB\u3011".concat(Logger.label, "\u3010").concat(functionType, "\u8BF7\u6C42\u3011\u3010").concat(name, "\u3011\u3010").concat(url, "\u3011--------"), "color: ".concat(colorStr, ";font-size: 12px;font-weight: bold;"));
        console.log("【请求参数】: ", Logger.params);
        console.log("【返回数据】: ", Logger.result);
        console.log("【总体耗时】: ", Logger.runTime, "毫秒【含页面渲染】");
        console.log("【请求时间】: ", vk.pubfn.timeFormat(Logger.startTime, "yyyy-MM-dd hh:mm:ss"));
        if (Logger.error) {
          var errorLog = console.warn || console.error;
          if (Logger.error.err && Logger.error.err.stack) {
            console.error("【Error】: ", Logger.error);
            console.error("【Stack】: ", Logger.error.err.stack);
          } else {
            errorLog("【Error】: ", Logger.error);
          }
        }
        console.log("%c--------\u3010\u7ED3\u675F\u3011".concat(Logger.label, "\u3010").concat(functionType, "\u8BF7\u6C42\u3011\u3010").concat(name, "\u3011\u3010").concat(url, "\u3011--------"), "color: ".concat(colorStr, ";font-size: 12px;font-weight: bold;"));
      }
      if (typeof complete == "function") complete(res);
    }
    // 生成文件名
  }, {
    key: "createFileName",
    value: function createFileName() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var file = obj.file,
        filePath = obj.filePath,
        _obj$index = obj.index,
        index = _obj$index === void 0 ? 0 : _obj$index,
        _obj$cloudPathRemoveC2 = obj.cloudPathRemoveChinese,
        cloudPathRemoveChinese = _obj$cloudPathRemoveC2 === void 0 ? true : _obj$cloudPathRemoveC2,
        cloudDirectory = obj.cloudDirectory;
      var suffix = this.getFileSuffix(obj);
      var oldName = index + "." + suffix;
      // 注意：小程序无法获取到 file.name
      if (file && file.name) {
        var suffixName = file.name.substring(file.name.lastIndexOf(".") + 1);
        if (suffixName && suffixName.length < 5) oldName = file.name;
        // 只保留["数字","英文",".","-"]
        if (cloudPathRemoveChinese) {
          oldName = oldName.replace(/[^a-zA-Z.-d]/g, '');
        }
        if (oldName.indexOf(".") == 0) oldName = "0" + oldName;
      }
      var date = new Date();
      var dateYYYYMMDD = vk.pubfn.timeFormat(date, "yyyy/MM/dd");
      var dateTime = date.getTime().toString(); // 时间戳
      // 时间戳后8位
      var dateTimeEnd8 = dateTime.substring(dateTime.length - 8, dateTime.length);
      var randomNumber = vk.pubfn.random(8); // 8位随机数
      // 文件路径
      var newFilePath = "";
      if (cloudDirectory) {
        // 如果自定义了上传目录，则使用自定义的上传目录
        if (cloudDirectory.lastIndexOf("/") !== cloudDirectory.length - 1) {
          cloudDirectory = cloudDirectory + "/";
        }
        newFilePath = cloudDirectory;
      } else {
        // 否则，使用年月日作为上传目录
        newFilePath = dateYYYYMMDD + "/";
      }
      // 文件名  = 时间戳后8位  - 随机数8位  + 原本文件名
      var fileNickName = dateTimeEnd8 + "-" + randomNumber + "-" + oldName;
      // 文件名全称（包含文件路径） = 文件路径  + 文件名
      var fileFullName = newFilePath + fileNickName;
      return fileFullName;
    }
  }, {
    key: "getFileSuffix",
    value: function getFileSuffix() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var file = obj.file,
        filePath = obj.filePath,
        _obj$suffix = obj.suffix,
        suffix = _obj$suffix === void 0 ? "png" : _obj$suffix;
      if (filePath) {
        var suffixName = filePath.substring(filePath.lastIndexOf(".") + 1);
        if (suffixName && suffixName.length < 5) suffix = suffixName;
      }
      if (file) {
        if (file.path) {
          var _suffixName = file.path.substring(file.path.lastIndexOf(".") + 1);
          if (_suffixName && _suffixName.length < 5) suffix = _suffixName;
        }
        if (file.name) {
          var _suffixName2 = file.name.substring(file.name.lastIndexOf(".") + 1);
          if (_suffixName2 && _suffixName2.length < 5) suffix = _suffixName2;
        }
      }
      return suffix;
    }
  }, {
    key: "getFileType",
    value: function getFileType() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var file = obj.file,
        filePath = obj.filePath;
      var fileType = "other";
      var suffix = this.getFileSuffix(obj);
      if (["png", "jpg", "jpeg", "gif", "bmp", "svg", "webp"].indexOf(suffix) > -1) {
        fileType = "image";
      } else if (["avi", "mp3", "mp4", "3gp", "mov", "rmvb", "rm", "flv", "mkv"].indexOf(suffix) > -1) {
        fileType = "video";
      }
      return fileType;
    }

    // 系统异常重试机制（表单提交时慎用，建议只用在查询请求中，即无任何数据库修改的请求中）
  }, {
    key: "callFunctionRetry",
    value: function callFunctionRetry() {
      var _this2 = this;
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var retryCount = obj.retryCount;
      delete obj.retryCount;
      return new Promise(function (resolve, reject) {
        _this2.callRetryFn(obj, resolve, reject, retryCount);
      });
    }
    // 重试实现
  }, {
    key: "callRetryFn",
    value: function callRetryFn(obj, resolve, reject, retryCount) {
      var that = this;
      var debug = that.config.debug;
      that.callFunction(_objectSpread(_objectSpread({}, obj), {}, {
        needRetry: retryCount ? true : false,
        // 判断是否需要重试
        retry: function retry(err) {
          obj.runCount = obj.runCount ? obj.runCount + 1 : 1;
          obj.needRetry = retryCount > obj.runCount ? true : false; // 判断是否需要重试
          var errorMsg = err.message ? "\u5F02\u5E38\u4FE1\u606F\uFF1A".concat(err.message) : "";
          if (debug) console.log("\u3010\u8BF7\u6C42\u5931\u8D25\u3011\u6B63\u5728\u7B2C\u3010".concat(obj.runCount, "\u3011\u6B21\u91CD\u8BD5\uFF1A").concat(obj.url));
          if (obj.retryInterval) {
            setTimeout(function () {
              that._callRetryFn(obj, resolve, reject, retryCount);
            }, obj.retryInterval);
          } else {
            // 如果无延迟，则不写setTimeout，因为setTimeout 即使time为0，也有一定延迟。
            that._callRetryFn(obj, resolve, reject, retryCount);
          }
        }
      }));
    }
  }, {
    key: "_callRetryFn",
    value: function _callRetryFn(obj, resolve, reject, retryCount) {
      if (obj.runCount < retryCount) {
        this.callRetryFn(obj, resolve, reject, retryCount);
      } else {
        this.callFunction(obj).catch(function (err) {
          reject();
        });
      }
    }
  }]);
  return CallFunctionUtil;
}();
var _default = new CallFunctionUtil();
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 27)["default"]))

/***/ }),
/* 57 */
/*!**************************************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-client/uni_modules/vk-unicloud/vk_modules/vk-unicloud-page/libs/function/debounce.js ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var timeoutArr = [];
/**
 * 防抖函数
 * 防抖原理：一定时间内，只有最后一次或第一次调用,回调函数才会执行
 * @param {Function}  fn 要执行的回调函数 
 * @param {Number}    time 延时的时间
 * @param {Boolean}   isImmediate 是否立即执行 默认true
 * @param {String} timeoutName 定时器ID
 * @return null
vk.pubfn.debounce(() => {
	
}, 1000);
 */
function debounce(fn) {
  var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  var isImmediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var timeoutName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "default";
  // 清除定时器
  if (!timeoutArr[timeoutName]) timeoutArr[timeoutName] = null;
  if (timeoutArr[timeoutName] !== null) clearTimeout(timeoutArr[timeoutName]);
  // 立即执行一次
  if (isImmediate) {
    var callNow = !timeoutArr[timeoutName];
    timeoutArr[timeoutName] = setTimeout(function () {
      timeoutArr[timeoutName] = null;
    }, time);
    if (callNow) {
      if (typeof fn === 'function') return fn();
    }
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时time毫秒后执行fn回调方法
    timeoutArr[timeoutName] = setTimeout(function () {
      if (typeof fn === 'function') return fn();
    }, time);
  }
}
var _default = debounce;
exports.default = _default;

/***/ }),
/* 58 */
/*!***********************************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-client/uni_modules/vk-unicloud/vk_modules/vk-unicloud-page/libs/function/index.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, wx) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _debounce = _interopRequireDefault(__webpack_require__(/*! ./debounce.js */ 57));
var _throttle = _interopRequireDefault(__webpack_require__(/*! ./throttle.js */ 59));
var _queryParams = _interopRequireDefault(__webpack_require__(/*! ./queryParams.js */ 60));
var _setClipboardData = _interopRequireDefault(__webpack_require__(/*! ./setClipboardData.js */ 61));
var _timeUtil = _interopRequireDefault(__webpack_require__(/*! ./timeUtil.js */ 62));
var _treeUtil = _interopRequireDefault(__webpack_require__(/*! ./treeUtil.js */ 63));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * 通用公共函数
 */
var pubfn = {};
// 防抖

/**
 * 树形结构转换
 */
pubfn.treeUtil = _treeUtil.default;
/**
 * 时间工具类
 */
pubfn.timeUtil = _timeUtil.default;
/**
 * 防抖函数
 */
pubfn.debounce = _debounce.default;
/**
 * 节流函数
 */
pubfn.throttle = _throttle.default;
/**
 * 对象转url参数
 * @param {*} data,对象
 * @param {*} isPrefix,是否自动加上"?"
 * 此函数参考uView
 * vk.pubfn.queryParams(json);
 */
pubfn.queryParams = _queryParams.default;
/**
 * 设置剪贴板
 */
pubfn.setClipboardData = _setClipboardData.default;

/**
 * 休眠，等待（单位毫秒）
 * @param {Number} ms 毫秒
 * await vk.pubfn.sleep(1000);
 */
pubfn.sleep = function (ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
};

/**
 * 日期格式化
 * @param {Date || Number} date 需要格式化的时间
 * vk.pubfn.timeFormat(new Date(),"yyyy-MM-dd hh:mm:ss");
 */
pubfn.timeFormat = pubfn.timeUtil.timeFormat;
/**
 * 解析日期对象属性
 * @param {Date || Number} date 需要转换的时间
 * vk.pubfn.getDateInfo(new Date());
 */
pubfn.getDateInfo = pubfn.timeUtil.getDateInfo;

/**
 * 日期对象转换（此API已弃用，建议用vk.pubfn.timeFormat代替）
 * @param {Date || Number} date 需要转换的时间
 * @param {Number} type 转换方式
 * type = 0 返回 2020-08-03 12:12:12
 * type = 1 返回 20200803121212
 * type = 2 返回 { YYYY, MM, DD, hh, mm, ss }
 */
pubfn.getFullTime = pubfn.timeUtil.getFullTime;

/**
 * 获取时间范围
 * @param {Date} date 日期对象 可以指定时间计算节点，默认使用当前时间进行计算
 * 返回的是时间戳(防止时区问题)
 * 返回数据如下：
 {
   todayStart 今日开始时间
   todayEnd   今日结束时间
   today12End 今日上午结束时间
   monthStart 本月开始时间
   monthEnd   本月结束时间
   yearStart  本年开始时间
   yearEnd    本年结束时间
   weekStart  本周开始时间
   weekEnd    本周结束时间
   now        现在的时间点(含月年日时分秒)
   months     本年度每月的开始和结束时间 months[1] 代表1月
 }
 * vk.pubfn.getCommonTime();
 */
pubfn.getCommonTime = pubfn.timeUtil.getCommonTime;

/**
 * 获得指定时间偏移 year年 month月 day天 hours时 minutes分 seconds秒前或后的时间戳
 * 返回时间戳形式
vk.pubfn.getOffsetTime(new Date(), {
	year:0,
	month:0,
	day:0,
	hours:0,
	minutes:0,
	seconds:0,
	mode:"after", // after 之后 before 之前
});
 */
pubfn.getOffsetTime = pubfn.timeUtil.getOffsetTime;

/**
 * 获得相对当前时间的偏移 count 小时的起止日期(小时的开始和结束)
 * @param {Number} count  默认0 (0代表当前小时 为-1代表上一个小时 为1代表下一个小时以此类推)
 * @param {Date || Number} date 指定从哪个时间节点开始计算
 * vk.pubfn.getHourOffsetStartAndEnd(0);
 */
pubfn.getHourOffsetStartAndEnd = pubfn.timeUtil.getHourOffsetStartAndEnd;

/**
 * 获得相对当前时间的偏移 count 天的起止日期(日的开始和结束)
 * @param {Number} count  默认0 (0代表今日 为-1代表昨日 为1代表明日以此类推)
 * @param {Date || Number} date 指定从那天开始计算
 * vk.pubfn.getDayOffsetStartAndEnd(0);
 */
pubfn.getDayOffsetStartAndEnd = pubfn.timeUtil.getDayOffsetStartAndEnd;

/**
 * 获得相对当前周addWeekCount个周的起止日期
 * @param {Number} addWeekCount  默认0 (0代表本周 为-1代表上周 为1代表下周以此类推 为2代表下下周)
 * vk.pubfn.getWeekOffsetStartAndEnd(0);
 */
pubfn.getWeekOffsetStartAndEnd = pubfn.timeUtil.getWeekOffsetStartAndEnd; // 新版写法
pubfn.getWeekStartAndEnd = pubfn.timeUtil.getWeekOffsetStartAndEnd; // 兼容老版本写法

/**
 * 获得相对当前时间的偏移 count 月的起止日期(月的开始和结束)
 * @param {Number} count  默认0 (0代表本月 为-1代表上月 为1代表下月以此类推)
 * @param {Date || Number} date 指定从那天开始计算
 * vk.pubfn.getMonthOffsetStartAndEnd(0);
 */
pubfn.getMonthOffsetStartAndEnd = pubfn.timeUtil.getMonthOffsetStartAndEnd;

/**
 * 获得相对当前时间的偏移 count 个季度的起止日期（季度的开始和结束时间戳）
 * @param {Number} count  默认0（0代表本季度 -1代表上个季度 1代表下个季度以此类推）
 * @param {Date || Number} date 指定从哪个时间节点开始计算
 * vk.pubfn.getQuarterOffsetStartAndEnd(0);
 */
pubfn.getQuarterOffsetStartAndEnd = pubfn.timeUtil.getQuarterOffsetStartAndEnd;

/**
 * 获得相对当前时间的偏移 count 年的起止日期(年的开始和结束)
 * @param {Number} count  默认0 (0代表今年 为-1代表去年 为1代表明年以此类推)
 * @param {Date || Number} date 指定从那天开始计算
 * vk.pubfn.getYearOffsetStartAndEnd(0);
 */
pubfn.getYearOffsetStartAndEnd = pubfn.timeUtil.getYearOffsetStartAndEnd;

/**
 * 获得指定年份和月份后的该月的开始时间和结束时间
 * 返回数据如下：(时间戳形式)
 {
   startTime 该月开始时间
   endTime   该月结束时间
 }
vk.pubfn.getMonthStartAndEnd({
	year:2021
	month:1
});
 */
pubfn.getMonthStartAndEnd = pubfn.timeUtil.getMonthStartAndEnd;

/**
 * Vue 全局表单验证器扩展
rules: {
  receiver_mobile:[
    { validator:vk.pubfn.validator("mobile"), message: '手机号格式错误', trigger: 'blur' }
  ],
},
 */
pubfn.validator = function (type) {
  return function (rule, value, callback) {
    var key = pubfn.test(value, type);
    if (typeof callback === "function") {
      if (key || !value) {
        callback();
      } else {
        return callback(false);
      }
    } else {
      return callback(false);
    }
  };
};

/**
 * 检测文本是否满足指定格式
 * @param {String} str 需要检测的文本
 * @param {String} type 检测类型（忽略大小写）
 * 包含
 * mobile 手机号码
 * tel 座机
 * card 身份证
 * mobileCode 6位数字验证码
 * username 账号以字母开头，长度在3~32之间，只能包含字母、数字和下划线
 * pwd 密码长度在6~18之间，只能包含字母、数字和下划线
 * password 与pwd效果一致，密码长度在6~18之间，只能包含字母、数字和下划线
 * paypwd 支付密码 6位纯数字
 * postal 邮政编码
 * qq QQ号
 * email 邮箱
 * money 金额(小数点只允许2位)
 * url 网址
 * ip IP地址
 * date 日期 2020-08-03
 * time 时间 12:12:12
 * dateTime 日期+时间 2020-08-03 12:12:12
 * number 纯数字
 * english 纯英文
 * chinese 纯中文
 * english+number 英文+数字
 * english+number+_ 英文+数字+_
 * english+number+_- 英文+数字+_-
 * lower 小写
 * upper 大写
 * version 版本号 xx.xx.xx (xx必须是数字)
 * html html格式
 * image 图片
 * video 视频
 * audio 音频
 * vk.pubfn.test(str, type);
 */
pubfn.test = function (str) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  type = type.toLowerCase();
  var newStr;
  switch (type) {
    case 'mobile':
      //手机号码
      return new RegExp(/^1[3|4|5|6|7|8|9][0-9]{9}$/).test(str);
    case 'tel':
      //座机
      return new RegExp(/^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/).test(str);
    case 'card':
      //身份证
      return new RegExp(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/).test(str);
    case 'mobilecode':
      //6位数字验证码
      return new RegExp(/^[0-9]{6}$/).test(str);
    case 'username':
      //账号以字母开头，长度在3~32之间，只能包含字母、数字和下划线
      return new RegExp(/^[a-zA-Z]([-_a-zA-Z0-9]{2,31})$/).test(str);
    case 'pwd':
      //密码长度在6~18之间，只能包含字母、数字和下划线和@
      return new RegExp(/^([a-zA-Z0-9_@]){6,18}$/).test(str);
    case 'password':
      //密码长度在6~18之间，只能包含字母、数字和下划线和@
      return new RegExp(/^([a-zA-Z0-9_@]){6,18}$/).test(str);
    case 'paypwd':
      //支付密码 6位纯数字
      return new RegExp(/^[0-9]{6}$/).test(str);
    case 'postal':
      //邮政编码
      return new RegExp(/[1-9]\d{5}(?!\d)/).test(str);
    case 'qq':
      //QQ号
      return new RegExp(/^[1-9][0-9]{4,9}$/).test(str);
    case 'email':
      //邮箱
      return new RegExp(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/).test(str);
    case 'money':
      //金额(小数点2位)
      return new RegExp(/^\d*(?:\.\d{0,2})?$/).test(str);
    case 'url':
      //网址
      return new RegExp(/^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/).test(str);
    case 'ip':
      //IP
      return new RegExp(/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/).test(str);
    case 'date':
      //日期 2014-01-01
      return new RegExp(/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/).test(str);
    case 'time':
      //时间 12:00:00
      return new RegExp(/^(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/).test(str);
    case 'datetime':
      //日期+时间 2014-01-01 12:00:00
      return new RegExp(/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/).test(str);
    case 'english+number':
      //英文+数字
      return new RegExp(/^[a-zA-Z0-9]*$/).test(str);
    case 'english+number+_':
      //英文+数字+_
      return new RegExp(/^[a-zA-Z0-9_]*$/).test(str);
    case 'english+number+_-':
      //英文+数字+_-
      return new RegExp(/^[a-zA-Z0-9_-]*$/).test(str);
    case 'version':
      //版本号 xx.xx.xx (xx必须是数字)
      return new RegExp(/^([1-9]\d|[1-9])(.([1-9]\d|\d)){2}$/).test(str);
    case 'number':
      //数字
      return new RegExp(/^[0-9]*$/).test(str);
    case 'english':
      //英文
      return new RegExp(/^[a-zA-Z]+$/).test(str);
    case 'chinese':
      //中文
      return new RegExp(/^[\u4e00-\u9fa5]+$/gi).test(str);
    case 'lower':
      //小写
      return new RegExp(/^[a-z]+$/).test(str);
    case 'upper':
      //大写
      return new RegExp(/^[A-Z]+$/).test(str);
    case 'html':
      //HTML标记
      return new RegExp(/<("[^"]*"|'[^']*'|[^'">])*>/).test(str);
    case 'image':
      //是否图片格式
      newStr = str.split("?")[0];
      return new RegExp(/\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)$/).test(newStr);
    case 'video':
      //是否视频格式
      newStr = str.split("?")[0];
      return new RegExp(/\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8|3gp)$/).test(newStr);
    case 'audio':
      //是否音频格式
      newStr = str.split("?")[0];
      return new RegExp(/\.(mp3)$/).test(newStr);
    default:
      return true;
  }
};
// 保留之前的函数名
pubfn.checkStr = pubfn.test;
/**
 * 删除对象中所有值为无效值的属性（如：undefined）
 * @param {Object} obj
 * vk.pubfn.objectDeleteInvalid(obj);
 */
pubfn.objectDeleteInvalid = function () {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  Object.keys(obj).forEach(function (item) {
    if (obj[item] === undefined) {
      delete obj[item];
    }
  });
  return obj;
};
/**
 * 对象属性拷贝（浅拷贝）
 * @description 将 obj2 的属性赋值给 obj1（如果obj1中有对应的属性，则会被obj2的属性值覆盖）
 * @param {Object} 	obj1
 * @param {Object} 	obj2
 * vk.pubfn.objectAssign(obj1, obj2);
 * vk.pubfn.objectAssign(obj1, obj2, true);
 * vk.pubfn.objectAssign(obj1, obj2, false);
 */
pubfn.objectAssign = function (obj1, obj2) {
  var deleteInvalid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (deleteInvalid) pubfn.objectDeleteInvalid(obj2);
  return Object.assign(obj1, obj2);
};
/**
 * 复制一份对象-没有映射关系
 * @description 主要用于解除映射关系（不支持克隆函数）
 * @param {Object} 	obj
 * let newObj = vk.pubfn.copyObject(obj);
 */
pubfn.copyObject = function (obj) {
  if (typeof obj !== "undefined") {
    return JSON.parse(JSON.stringify(obj));
  } else {
    return obj;
  }
};
/**
 * 深度克隆一个对象-没有映射关系
 * @description 主要用于解除映射关系（支持克隆函数）
 * @param {Object} 	obj
 * let newObj = vk.pubfn.deepClone(obj);
 */
pubfn.deepClone = function (obj) {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if ((0, _typeof2.default)(obj) !== "object" && typeof obj !== 'function') {
    //原始类型直接返回
    return obj;
  }
  var o = Object.prototype.toString.call(obj) === '[object Array]' ? [] : {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = (0, _typeof2.default)(obj[i]) === "object" ? pubfn.deepClone(obj[i]) : obj[i];
    }
  }
  return o;
};
/**
 * 表单自动填充数据
 * @description 主要用于表单修改时,数据库没有默认字段会报错的问题
 * @param {Object} 	defaultData 默认数据
 * @param {Object} 	itemData		当前数据
 * that.form1 = vk.pubfn.formAssign(defaultData,itemData);
 */
pubfn.formAssign = function (defaultData, itemData) {
  var newDefaultData = pubfn.copyObject(defaultData);
  return pubfn.objectAssign(newDefaultData, itemData);
};

/**
 * 两个(元素为对象)的数组合并,并去除重复的数据
 * @param	{Array} 	arr1 	第一个数组(arr1和aar2没有顺序要求)
 * @param	{Array} 	aar2 	第二个数组
 * @param	{String} 	flag 	判断标识,默认用id来判断,若flag传-1,代表不去除重复数据
 * let arr = vk.pubfn.arr_concat(arr1, arr2, "_id");
 */
pubfn.arr_concat = function (arr1, arr2, flag) {
  if (!flag) flag = "id"; // 默认用id来判断是否是同一个对象元素
  if (!arr1) arr1 = [];
  if (!arr2) arr2 = [];
  var arr3 = arr1.concat(arr2); // 新旧数据合并
  var arr = []; // 定义一个临时数组 存放对象
  if (flag != -1) {
    var arr_id = []; // 定义一个临时数组 存放id
    for (var i in arr3) {
      // 循环遍历当前数组
      // 判断当前数组下标为i的元素是否已经保存到临时数组
      // 如果已保存，则跳过，否则将此元素保存到临时数组中
      if (arr_id.indexOf(arr3[i][flag]) == -1) {
        arr_id.push(arr3[i][flag]); // 添加id到数组
        arr.push(arr3[i]); // 添加对象到数组
      }
    }
  } else {
    arr = arr3;
  }
  return arr;
};
/**
 * 自动根据字符串路径获取对象中的值支持.和[] , 且任意一个值为undefined时,不会报错,会直接返回undefined
 * @param	{Object} dataObj 数据源
 * @param	{String} name 支持a.b 和 a[b]
 * @param	{String} defaultValue undefined时的默认值
 * vk.pubfn.getData(dataObj, name);
 */
pubfn.getData = function (dataObj, name, defaultValue) {
  var newDataObj;
  if (pubfn.isNotNull(dataObj)) {
    newDataObj = JSON.parse(JSON.stringify(dataObj));
    var k = "",
      d = ".",
      l = "[",
      r = "]";
    name = name.replace(/\s+/g, k) + d;
    var tstr = k;
    for (var i = 0; i < name.length; i++) {
      var theChar = name.charAt(i);
      if (theChar != d && theChar != l && theChar != r) {
        tstr += theChar;
      } else if (newDataObj) {
        if (tstr != k) newDataObj = newDataObj[tstr];
        tstr = k;
      }
    }
  }
  if (typeof newDataObj === "undefined" && typeof defaultValue !== "undefined") newDataObj = defaultValue;
  return newDataObj;
};
/**
 * 自动根据字符串路径设置对象中的值 支持.和[]
 * @param	{Object} dataObj 数据源
 * @param	{String} name 支持a.b 和 a[b]
 * @param	{String} value 值
 * vk.pubfn.setData(dataObj, name, value);
 */
pubfn.setData = function (dataObj, name, value) {
  // 通过正则表达式  查找路径数据
  var dataValue;
  if ((0, _typeof2.default)(value) === "object") {
    dataValue = pubfn.copyObject(value);
  } else {
    dataValue = value;
  }
  var regExp = new RegExp("([\\w$-]+)|\\[(:\\d)\\]", "g");
  var patten = name.match(regExp);
  // 遍历路径  逐级查找  最后一级用于直接赋值
  for (var i = 0; i < patten.length - 1; i++) {
    var keyName = patten[i];
    if ((0, _typeof2.default)(dataObj[keyName]) !== "object") dataObj[keyName] = {};
    dataObj = dataObj[keyName];
  }
  // 最后一级
  dataObj[patten[patten.length - 1]] = dataValue;
};

/**
 * 检测参数是否为空 其中 undefined、null、{}、[]、"" 均为空值  true 空值  false 有值
 * vk.pubfn.isNull(value);
 */
pubfn.isNull = function (value) {
  var key = false;
  if (typeof value == "undefined" || Object.prototype.toString.call(value) == "[object Null]" || JSON.stringify(value) == "{}" || JSON.stringify(value) == "[]" || value === "" || JSON.stringify(value) === undefined) {
    key = true;
  }
  return key;
};
/**
 * 检测参数是否不为空 结果与 vk.pubfn.isNull 相反
 * vk.pubfn.isNotNull(value);
 */
pubfn.isNotNull = function (value) {
  return !pubfn.isNull(value);
};
/**
 * 检测所有参数 - 是否至少有一个为空
 * vk.pubfn.isNullOne(value1,value2,value3);
 */
pubfn.isNullOne = function () {
  var key = false;
  for (var i = 0; i < arguments.length; i++) {
    var str = i < 0 || arguments.length <= i ? undefined : arguments[i];
    if (pubfn.isNull(str)) {
      key = true;
      break;
    }
  }
  return key;
};
/**
 * 检测整个对象是否没有一个属性是空值,如果有空值,则返回首个是空值的属性名
 let nullKey = vk.pubfn.isNullOneByObject({ value1,value2,value3 });
 if(nullKey) return { code : -1, msg : `${nullKey}不能为空` };
 */
pubfn.isNullOneByObject = function (obj) {
  var key;
  for (var name in obj) {
    var val = obj[name];
    if (pubfn.isNull(val)) {
      key = name;
      break;
    }
  }
  return key;
};
/**
 * 检测所有参数 - 是否全部为空
 * vk.pubfn.isNullAll(value1,value2,value3);
 */
pubfn.isNullAll = function () {
  var key = true;
  for (var i = 0; i < arguments.length; i++) {
    var str = i < 0 || arguments.length <= i ? undefined : arguments[i];
    if (pubfn.isNotNull(str)) {
      key = false;
      break;
    }
  }
  return key;
};

/**
 * 检测所有参数 - 是否全部都不为空
 * vk.pubfn.isNotNullAll(value1,value2,value3);
 */
pubfn.isNotNullAll = function () {
  return !pubfn.isNullOne.apply(pubfn, arguments);
};
/**
 * 获取对象数组中的某一个item,根据指定的键名和键值
 * @description 主要用于在一个对象数组中快速获取 _id = 1 的对象
 * @param	{Array} list 数据源
 * @param	{String} key 键名(不可为空)
 * @param	{String} value 键值 (不可为空)
 * vk.pubfn.getListItem(list, key, value);
 */
pubfn.getListItem = function (list, key, value) {
  var item;
  for (var i = 0; i < list.length; i++) {
    if (list[i][key] === value) {
      item = list[i];
      break;
    }
  }
  return item;
};
/**
 * 获取对象数组中某个元素的index,根据指定的键名和键值
 * @description 主要用于在一个对象数组中快速获取 _id = 1 的index
 * @param	{Array} list 数据源
 * @param	{String} key 键名
 * @param	{String} value 键值
 * vk.pubfn.getListIndex(list, key, value);
 */
pubfn.getListIndex = function (list, key, value) {
  var index = -1;
  for (var i = 0; i < list.length; i++) {
    if (list[i][key] === value) {
      index = i;
      break;
    }
  }
  return index;
};
/**
 * 获取对象数组中某个元素的index,根据指定的键名和键值
 * @description 主要用于在一个对象数组中快速获取 _id = 1 的index
 * @param	{Array} list 数据源
 * @param	{String} key 键名
 * @param	{String} value 键值
 * vk.pubfn.getListItemIndex(list, key, value);
 */
pubfn.getListItemIndex = function (list, key, value) {
  var obj = {};
  var item;
  var index = -1;
  for (var i = 0; i < list.length; i++) {
    if (list[i][key] === value) {
      index = i;
      item = list[i];
      break;
    }
  }
  obj = {
    item: item,
    index: index
  };
  return obj;
};
/**
 * 数组转对象 - 将对象数组转成json
 * 如[{"_id":"001","name":"name1","sex":1},{"_id":"002","name":"name2","sex":2}]
 * 转成
 * {"001",{"_id":"001","name":"name1","sex":1},"002":{"_id":"002","name":"name2","sex":2}}
 * vk.pubfn.arrayToJson(list, "_id");
 */
pubfn.arrayToJson = function (list, key) {
  var json = {};
  for (var i in list) {
    var item = list[i];
    json[item[key]] = item;
  }
  return json;
};
pubfn.listToJson = pubfn.arrayToJson;

/**
 * 从数组中提取指定字段形式成为新的数组
 * 如[{"_id":"001","name":"name1","sex":1},{"_id":"002","name":"name2","sex":2}]
 * 提取_id字段转成
 * ["001","002"]
 * let idArr = vk.pubfn.arrayObjectGetArray(list, "_id");
 */
pubfn.arrayObjectGetArray = function (list, key) {
  return list.map(function (obj) {
    return obj[key];
  });
};

/**
 * 产生指定位数的随机数(支持任意字符,默认纯数字)
 * @param	{Number} length 随机数固定位数
 * @param	{String} range 指定的字符串中随机范围
 * @param	{Array} arr 产生的随机数不会和此数组的任意一项重复
 * vk.pubfn.random(6);
 * vk.pubfn.random(6, "abcdefghijklmnopqrstuvwxyz0123456789");
 * vk.pubfn.random(1,"12",["1","2"]);
 */
pubfn.random = function (length, range, arr) {
  var s;
  if (pubfn.isNull(arr)) {
    s = pubfn.randomFn(length, range);
  } else {
    var i = 0;
    var maxForCount = 100000;
    do {
      i++;
      s = pubfn.randomFn(length, range);
    } while (arr.indexOf(s) > -1 && i < maxForCount);
    if (i === maxForCount) {
      s = undefined;
    }
  }
  return s;
};
/**
 * 产生指定位数的随机数(支持任意字符,默认纯数字)
 * @param	{Number} length 随机数固定位数
 * @param	{String} range 指定的字符串中随机范围
 * vk.pubfn.random(6);
 * vk.pubfn.random(6, "abcdefghijklmnopqrstuvwxyz0123456789");
 */
pubfn.randomFn = function (length, range) {
  var s = "";
  var list = "123456789";
  //0123456789QWERTYUIPASDFGHJKLZXCVBNM
  if (pubfn.isNotNull(range)) {
    if (range == "a-z,0-9") {
      range = "abcdefghijklmnopqrstuvwxyz0123456789";
    } else if (range == "A-Z,0-9") {
      range = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    } else if (range == "a-z,A-Z,0-9" || range == "A-Z,a-z,0-9") {
      range = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    }
    list = range;
  }
  for (var i = 0; i < length; i++) {
    var code = list[Math.floor(Math.random() * list.length)];
    s += code;
  }
  return s;
};

/**
 * 将字符串id转化为指定位数的纯数字字符串id(会重复)
 * vk.pubfn.stringIdToNumberId(uid,8);
 */
pubfn.stringIdToNumberId = function (str, length) {
  var s = "";
  var list = "0123456789";
  for (var i = 0; i < length; i++) {
    if (str.length > i) {
      var index = str[i].charCodeAt() % 10;
      s += list[index];
    } else {
      s = "0" + s;
    }
  }
  return s;
};

/**
 * 将手机号,账号等隐藏中间字段
 * @param {String} str   需要转换的字符串
 * @param {Number} first 前面显示的字符数量
 * @param {Number} last  后面显示的字符数量
 * vk.pubfn.hidden(str, first, last);
 */
pubfn.hidden = function () {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var first = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var last = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var len = str.length - first - last;
  var xing = '';
  for (var i = 0; i < len; i++) {
    xing += '*';
  }
  return str.substring(0, first) + xing + str.substring(str.length - last);
};
/**
 * 判断常量数组A是否至少有一个元素在常量数组B中存在(两数组有交集)
 * @param {Array} arr1 数组A
 * @param {Array} arr2 数组B
 * vk.pubfn.checkArrayIntersection(arr1, arr2);
 */
pubfn.checkArrayIntersection = function () {
  var arr1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var arr2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var checkKey = false;
  for (var i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) > -1) {
      checkKey = true;
    }
  }
  return checkKey;
};
/**
 * 检测数据源是否满足表达式规则
 * @param {Object} data 数据源
 * @param {String} expText 表达式文本
 * vk.pubfn.checkDataExpText(data, expText);
 */
pubfn.checkDataExpText = function () {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var expText = arguments.length > 1 ? arguments[1] : undefined;
  expText = expText.replace(new RegExp("\\s", "g"), "");
  //console.log("expText:",expText);
  var orArr = expText.split("||");
  //console.log("orArr",orArr);
  var checkKey = false;
  for (var index1 = 0; index1 < orArr.length; index1++) {
    var orItem = orArr[index1];
    var andArr = orItem.split("&&");
    //console.log("andArr",andArr);
    var itemKey = true;
    for (var index2 = 0; index2 < andArr.length; index2++) {
      var andItem = andArr[index2];
      //console.log("andItem",andItem);
      if (andItem.indexOf("!=") > -1) {
        var andItemArr = andItem.split("!=");
        var key = andItemArr[0];
        var value = andItemArr[1];
        if (typeof data[key] === "undefined") itemKey = data[key] !== value ? true : false;
        if (typeof data[key] !== "undefined") itemKey = data[key].toString() !== value ? true : false;
      } else if (andItem.indexOf("==") > -1) {
        var _andItemArr = andItem.split("==");
        var _key = _andItemArr[0];
        var _value = _andItemArr[1];
        if (typeof data[_key] === "undefined") itemKey = data[_key] == _value ? true : false;
        if (typeof data[_key] !== "undefined") itemKey = data[_key].toString() == _value ? true : false;
      } else if (andItem.indexOf(">=") > -1) {
        var _andItemArr2 = andItem.split(">=");
        var _key2 = _andItemArr2[0];
        var _value2 = _andItemArr2[1];
        if (isNaN(_value2)) {
          if (typeof data[_key2] === "undefined") itemKey = false;
          if (typeof data[_key2] !== "undefined") itemKey = data[_key2].toString() >= _value2 ? true : false;
        } else {
          if (typeof data[_key2] === "undefined") itemKey = false;
          if (typeof data[_key2] !== "undefined") itemKey = data[_key2] >= Number(_value2) ? true : false;
        }
      } else if (andItem.indexOf(">") > -1) {
        var _andItemArr3 = andItem.split(">");
        var _key3 = _andItemArr3[0];
        var _value3 = _andItemArr3[1];
        if (isNaN(_value3)) {
          if (typeof data[_key3] === "undefined") itemKey = false;
          if (typeof data[_key3] !== "undefined") itemKey = data[_key3].toString() > _value3 ? true : false;
        } else {
          if (typeof data[_key3] === "undefined") itemKey = false;
          if (typeof data[_key3] !== "undefined") itemKey = data[_key3] > Number(_value3) ? true : false;
        }
      } else if (andItem.indexOf("<=") > -1) {
        var _andItemArr4 = andItem.split("<=");
        var _key4 = _andItemArr4[0];
        var _value4 = _andItemArr4[1];
        if (isNaN(_value4)) {
          if (typeof data[_key4] === "undefined") itemKey = false;
          if (typeof data[_key4] !== "undefined") itemKey = data[_key4].toString() <= _value4 ? true : false;
        } else {
          if (typeof data[_key4] === "undefined") itemKey = false;
          if (typeof data[_key4] !== "undefined") itemKey = data[_key4] <= Number(_value4) ? true : false;
        }
      } else if (andItem.indexOf("<") > -1) {
        var _andItemArr5 = andItem.split("<");
        var _key5 = _andItemArr5[0];
        var _value5 = _andItemArr5[1];
        if (isNaN(_value5)) {
          if (typeof data[_key5] === "undefined") itemKey = false;
          if (typeof data[_key5] !== "undefined") itemKey = data[_key5].toString() < _value5 ? true : false;
        } else {
          if (typeof data[_key5] === "undefined") itemKey = false;
          if (typeof data[_key5] !== "undefined") itemKey = data[_key5] < Number(_value5) ? true : false;
        }
      } else if (andItem.indexOf("{in}") > -1) {
        (function () {
          var andItemArr = andItem.split("{in}");
          var key = andItemArr[0];
          var value = andItemArr[1];
          if (Array.isArray(data[key])) {
            var index = data[key].findIndex(function (item) {
              return item.toString() === value.toString();
            });
            itemKey = index > -1 ? true : false;
          } else {
            itemKey = false;
          }
          //itemKey = (Array.isArray(data[key]) && data[key].indexOf(value) > -1 ) ? true : false;
        })();
      } else if (andItem.indexOf("{nin}") > -1) {
        (function () {
          var andItemArr = andItem.split("{nin}");
          var key = andItemArr[0];
          var value = andItemArr[1];
          if (Array.isArray(data[key])) {
            var index = data[key].findIndex(function (item) {
              return item.toString() === value.toString();
            });
            itemKey = index < 0 ? true : false;
          } else {
            itemKey = false;
          }
          //itemKey = (Array.isArray(data[key]) && data[key].indexOf(value) < 0 ) ? true : false;
        })();
      } else {
        var _andItemArr6 = andItem.split("=");
        var _key6 = _andItemArr6[0];
        var _value6 = _andItemArr6[1];
        if (typeof data[_key6] === "undefined") itemKey = data[_key6] == _value6 ? true : false;
        if (typeof data[_key6] !== "undefined") itemKey = data[_key6].toString() == _value6 ? true : false;
        //console.log("key:",key,"value:",value,"data[key]",data[key].toString(),"itemKey:",itemKey);
      }

      if (!itemKey) {
        break;
      }
    }
    if (itemKey) {
      checkKey = true;
      break;
    }
  }
  return checkKey;
};

/**
 * 判断变量是否是数组
 * vk.pubfn.isArray(value);
 */
pubfn.isArray = function (value) {
  return Object.prototype.toString.call(value) === "[object Array]" ? true : false;
};
/**
 * 判断变量是否是对象
 * vk.pubfn.isObject(value);
 */
pubfn.isObject = function (value) {
  return Object.prototype.toString.call(value) === "[object Object]" ? true : false;
};

/**
 * 计算运费
 *  @param {Object} freightItem 运费模板
 {
   first_weight             Number 首重（KG）
   first_weight_price       Number 首重 首重价格（100=1元）
   continuous_weight        Number 续重（KG）
   continuous_weight_price  Number 续重价格（100=1元）
   max_weight               Number 重量达到此值时（KG），会多计算首重的价格，并少一次续重的价格 倍乘（相当于拆分多个包裹）
 }
 * @param {Number} weight 运费重量
 * 返回值
 * @return {Number} 最终运费金额（100=1元）
 * vk.pubfn.calcFreights(freightItem, weight);
 */
pubfn.calcFreights = function (freightItem, weight) {
  var freightRes = vk.pubfn.calcFreightDetail(freightItem, weight);
  return freightRes.total_amount;
};

/**
 * 计算运费，返回细节
 * @param {Object} freightItem 运费模板
 {
   first_weight             Number 首重（KG）
   first_weight_price       Number 首重 首重价格（100=1元）
   continuous_weight        Number 续重（KG）
   continuous_weight_price  Number 续重价格（100=1元）
   max_weight               Number 重量达到此值时（KG），会多计算首重的价格，并少一次续重的价格 倍乘（相当于拆分多个包裹）
 }
 * @param {Number} weight 需要计算的商品重量
 * 返回值
 * @return {Number} weight 运费重量（KG）
 * @return {Number} first_weight_price 首重金额（100=1元）
 * @return {Number} continuous_weight_price 续重金额（100=1元）
 * @return {Number} total_amount 最终运费金额（100=1元）
 * @return {String} formula 运费计算公式字符串
 * let freightRes = vk.pubfn.calcFreightDetail(freightItem, weight);
 */
pubfn.calcFreightDetail = function (freightItem, weight) {
  var first_weight = freightItem.first_weight,
    first_weight_price = freightItem.first_weight_price,
    continuous_weight = freightItem.continuous_weight,
    continuous_weight_price = freightItem.continuous_weight_price,
    max_weight = freightItem.max_weight;
  if (!max_weight) max_weight = 1000000000;
  var originalWeight = weight;
  var money = 0; // 运费
  var first_weight_count = 0; // 包裹数量
  var packagesSurplusWeight = max_weight; // 包裹剩余重量
  var first_weight_key = false; // 是否已减过首重
  var continuous_weight_count = 0; // 续重次数
  var logArr = [];
  var logRun = false;
  while (weight > 0) {
    if (!first_weight_key) {
      // 首重
      first_weight_key = true;
      first_weight_count++;
      packagesSurplusWeight = max_weight; // 还原包裹剩余重量
      weight -= first_weight;
      packagesSurplusWeight -= first_weight;
    } else {
      // 续重
      continuous_weight_count++;
      weight -= continuous_weight;
      packagesSurplusWeight -= continuous_weight;
    }
    if (logRun) logArr.push({
      "总重量剩余": weight,
      "当前包裹重量剩余": packagesSurplusWeight,
      "当前第几个包裹": first_weight_count,
      "续重计算次数": continuous_weight_count
    });
    if (packagesSurplusWeight <= 0) {
      // 需要增加一个新的包裹
      first_weight_key = false; // 新包裹设置没有减过首重
    }
  }

  if (logRun) console.log(JSON.stringify(logArr));
  var total_amount = first_weight_price * first_weight_count + continuous_weight_price * continuous_weight_count;
  var res = {
    weight: originalWeight,
    // 商品重量（KG）
    first_weight: first_weight,
    // 首重步长
    first_weight_price: first_weight_price,
    // 首重单价
    first_weight_count: first_weight_count,
    // 首重计算次数
    continuous_weight: continuous_weight,
    // 续重步长
    continuous_weight_price: continuous_weight_price,
    // 续重单价
    continuous_weight_count: continuous_weight_count,
    // 续重计算次数
    first_weight_amount: first_weight_count * first_weight_price,
    // 首重总金额
    continuous_weight_amount: continuous_weight_price * continuous_weight_count,
    // 续重总金额
    total_amount: total_amount,
    // 最终运费金额
    formula: "".concat(first_weight_price, " * ").concat(first_weight_count, " + ").concat(continuous_weight_price, " * ").concat(continuous_weight_count, " = ").concat(total_amount) // 运费计算公式
  };

  return res;
};

/**
 * 从一个对象中取多个属性,并生成一个全新的对象,会过滤空字符串,空数组,空对象
 * @param {Object} obj 对象
 * @param {Array<String>} keys 键名数组
 * vk.pubfn.getNewObject(obj, keys);
 */
pubfn.getNewObject = function (obj, keys) {
  var selectedObj = pubfn.copyObject(obj);
  var newObject = {};
  if (keys && keys.length > 0) {
    for (var i in keys) {
      var key = keys[i];
      if (pubfn.isNotNull(selectedObj[key])) {
        newObject[key] = selectedObj[key];
      }
    }
  } else {
    newObject = selectedObj;
  }
  return newObject;
};

/**
 * 对象删除指定的字段,返回新的对象
 * @param {Object} data  操作对象
 * @param {Array<String>} deleteKeys 需要删除的键名(数组形式)
 * vk.pubfn.deleteObjectKeys(data, deleteKeys);
 */
pubfn.deleteObjectKeys = function (data) {
  var deleteKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var newData = {};
  if (data) {
    for (var key in data) {
      if (deleteKeys.indexOf(key) == -1) {
        newData[key] = data[key];
      }
    }
  }
  return newData;
};

/**
 * 数组结构转树形结构
 * @param {Array} treeData  数据源
 * @param {Object} treeProps 树结构配置
 * { id:"_id", parent_id:"parent_id", children:"children",need_field:["_id","name"],deleteParentId:true }
 * vk.pubfn.arrayToTree(treeData, treeProps);
 */
pubfn.arrayToTree = pubfn.treeUtil.arrayToTree;
/**
 * 树形结构转数组结构
 * @param {Array} treeData  数据源
 * @param {Object} treeProps 树结构配置
 * { id:"_id", parent_id:"parent_id", children:"children", deleteChildren:true }
 * vk.pubfn.treeToArray(treeData, treeProps);
 */
pubfn.treeToArray = pubfn.treeUtil.treeToArray;

/**
 * 通配符匹配
 * @param {String} text  被匹配的文本
 * @param {String} expText 通配符规则
 * vk.pubfn.wildcardTestOne(text, expText);
 */
pubfn.wildcardTestOne = function (text, expText) {
  if (!expText) return false;
  var regExpText = expText.replace(new RegExp("\\*"), "(.*)");
  var startText = expText.indexOf("*") !== 0 ? "^" : "";
  var endText = expText[expText.length - 1] !== "*" ? "$" : "";
  var regExp = new RegExp(startText + regExpText + endText);
  return regExp.test(text);
};
/**
 * 通配符匹配 expText支持数组
 * @param {String} text  被匹配的文本
 * @param {String | Array<String>} expText 通配符规则
 * vk.pubfn.wildcardTest(text, expText);
 */
pubfn.wildcardTest = function (text, expText) {
  var matchNum = 0; // 被匹配的次数
  var regExp1 = new RegExp("\\*");
  if (typeof expText === "string") {
    // 字符串
    if (pubfn.wildcardTestOne(text, expText)) {
      matchNum++;
    }
  } else if ((0, _typeof2.default)(expText) === "object") {
    // 数组
    for (var i = 0; i < expText.length; i++) {
      var expTextItem = expText[i];
      if (pubfn.wildcardTestOne(text, expTextItem)) {
        matchNum++;
      }
    }
  }
  return matchNum;
};

/**
 * 正则匹配
 * @param {String} text  被匹配的文本
 * @param {String} expText 正则表达式规则
 * vk.pubfn.regExpTestOne(text, expText);
 */
pubfn.regExpTestOne = function (text, expText) {
  if (!expText) return false;
  var regExp = new RegExp(expText);
  return regExp.test(text);
};

/**
 * 正则匹配
 * @param {String} text  被匹配的文本
 * @param {String || Array<String>} wildcardExp 正则表达式规则
 * vk.pubfn.regExpTest(text, regExp);
 */
pubfn.regExpTest = function (text, expText) {
  var matchNum = 0; // 被匹配的次数
  if (typeof expText === "string") {
    // 字符串
    if (pubfn.regExpTestOne(text, expText)) {
      matchNum++;
    }
  } else if ((0, _typeof2.default)(expText) === "object") {
    // 数组
    for (var i = 0; i < expText.length; i++) {
      var expTextItem = expText[i];
      if (pubfn.regExpTestOne(text, expTextItem)) {
        matchNum++;
      }
    }
  }
  return matchNum;
};

/**
 * 产生订单号，不依赖数据库，高并发时性能高（理论上会重复，但概率非常非常低）
 * @param {String} prefix 前缀
 * @param {Number} num 位数，建议在25-30之间，默认25
 * vk.pubfn.createOrderNo();
 */
pubfn.createOrderNo = function () {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 25;
  // 获取当前时间字符串格式如20200803093000123
  var fullTime = vk.pubfn.timeFormat(new Date(), "yyyyMMddhhmmss");
  fullTime = fullTime.substring(2);
  var randomNum = num - (prefix + fullTime).length;
  return prefix + fullTime + pubfn.random(randomNum);
};
var isSnakeCase = new RegExp('_(\\w)', 'g');
var isCamelCase = new RegExp('[A-Z]', 'g');
function parseObjectKeys(obj, type) {
  var parserReg;
  var parser;
  switch (type) {
    case 'snake2camel':
      parser = pubfn.snake2camel;
      parserReg = isSnakeCase;
      break;
    case 'camel2snake':
      parser = pubfn.camel2snake;
      parserReg = isCamelCase;
      break;
  }
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (parserReg.test(key)) {
        var keyCopy = parser(key);
        obj[keyCopy] = obj[key];
        delete obj[key];
        if (Object.prototype.toString.call(obj[keyCopy]) === '[object Object]') {
          obj[keyCopy] = parseObjectKeys(obj[keyCopy], type);
        } else if (Array.isArray(obj[keyCopy])) {
          obj[keyCopy] = obj[keyCopy].map(function (item) {
            return parseObjectKeys(item, type);
          });
        }
      }
    }
  }
  return obj;
}
/**
 * 字符串 - 蛇形转驼峰
 * @param {String} value
 * vk.pubfn.snake2camel(value);
 */
pubfn.snake2camel = function (value) {
  return value.replace(isSnakeCase, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
};
/**
 * 字符串 - 驼峰转蛇形
 * @param {String} value
 * vk.pubfn.camel2snake(value);
 */
pubfn.camel2snake = function (value) {
  return value.replace(isCamelCase, function (str) {
    return '_' + str.toLowerCase();
  });
};

/**
 * 对象内的属性名 - 蛇形转驼峰
 * @param {Object} obj
 * vk.pubfn.snake2camelJson(obj);
 */
pubfn.snake2camelJson = function (obj) {
  return parseObjectKeys(obj, 'snake2camel');
};
/**
 * 对象内的属性名 - 驼峰转蛇形
 * @param {Object} obj
 * vk.pubfn.camel2snakeJson(obj);
 */
pubfn.camel2snakeJson = function (obj) {
  return parseObjectKeys(obj, 'camel2snake');
};

/**
 * 将能转成数字的字符串转数字（支持字符串、对象、数组）
 * @param {Any} obj
 * @param {Object} option 哪些格式需要排除
 * 默认排除
 * mobile:true 手机号，如 15200000001
 * idCard:true 身份证，如 330154202109301214
 * startFrom0:true 第一位是0，且长度大于1的，同时第二位不是.的字符串  如 01，057189101254
 * maxLength:14 超过此长度的字符串排除
 * vk.pubfn.string2Number(obj, option);
 */
pubfn.string2Number = function (obj) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
  switch (type) {
    case 'string':
      if (obj && !isNaN(obj)) {
        var _option$mobile = option.mobile,
          mobile = _option$mobile === void 0 ? true : _option$mobile,
          _option$idCard = option.idCard,
          idCard = _option$idCard === void 0 ? true : _option$idCard,
          _option$startFrom = option.startFrom0,
          startFrom0 = _option$startFrom === void 0 ? true : _option$startFrom,
          _option$maxLength = option.maxLength,
          maxLength = _option$maxLength === void 0 ? 14 : _option$maxLength;
        if (obj.length > maxLength) {
          return obj;
        } else if (mobile && pubfn.test(obj, "mobile")) {
          return obj;
        } else if (idCard && pubfn.test(obj, "card")) {
          return obj;
        } else if (startFrom0 && obj.length > 1 && obj.indexOf("0") === 0 && obj.indexOf(".") !== 1) {
          return obj;
        }
        return Number(obj);
      } else {
        return obj;
      }
    case 'object':
      var keys = Object.keys(obj);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        obj[key] = pubfn.string2Number(obj[key]);
      }
      return obj;
    case 'array':
      for (var _i = 0; _i < obj.length; _i++) {
        obj[_i] = pubfn.string2Number(obj[_i]);
      }
      return obj;
    default:
      return obj;
  }
};

/**
 * 保留小数
 * @param {Number} val 原值
 * @param {Number} precision 精度
 * vk.pubfn.toDecimal(val, 2);
 */
pubfn.toDecimal = function (val) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  if (typeof val === "string") val = Number(val);
  return parseFloat(val.toFixed(precision));
};

/**
 * 判断文件url的类型
 * @param {String} url 文件的url路径
 * vk.pubfn.getFileType(url);
 * 返回值为字符串
 * image 图片
 * video 视频
 * audio 音频
 * other 其他
 */
pubfn.getFileType = function (url) {
  var fileType;
  if (pubfn.checkFileSuffix(url, ["png", "jpg", "jpeg", "gif", "bmp", "svg"])) {
    fileType = "image";
  } else if (pubfn.checkFileSuffix(url, ["avi", "mp4", "3gp", "mov", "rmvb", "rm", "flv", "mkv"])) {
    fileType = "video";
  } else if (pubfn.checkFileSuffix(url, ["mp3"])) {
    fileType = "audio";
  } else {
    fileType = "other";
  }
  return fileType;
};
/**
 * 获取文件url的后缀名
 * @param {String} url 文件的url路径，必须带
 * vk.pubfn.getFileSuffix(url);
 */
pubfn.getFileSuffix = function (url) {
  var suffix;
  var index = url.lastIndexOf(".");
  if (index > -1) {
    suffix = url.substring(index + 1);
  }
  return suffix;
};

/**
 * 判断文件url是否在指定后缀名数组内
 * @param {String} url 文件的url路径
 * @param {Array<String>} list 后缀名列表
 * vk.pubfn.checkFileSuffix(url,["png", "jpg", "jpeg", "gif", "bmp", "svg"]);
 */
pubfn.checkFileSuffix = function (url, list) {
  var key = false;
  var suffix = pubfn.getFileSuffix(url);
  for (var i = 0; i < list.length; i++) {
    if (list.indexOf(suffix) > -1) {
      key = true;
      break;
    }
  }
  return key;
};
// 前端专属开始 -----------------------------------------------------------
/**
 * 将时间显示成1秒前、1天前
 * @description 主要用于 文章最后回复时间: 1分钟前
 * @param {String || Number} 	startTime	需要计算的时间 如文章最后回复时间
 * vk.pubfn.dateDiff(startTime);
 */
pubfn.dateDiff = function (startTime) {
  var suffix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "前";
  if (!startTime) {
    return "";
  }
  if (typeof startTime === "string" && !isNaN(startTime)) startTime = Number(startTime);
  if (typeof startTime == "number") {
    if (startTime.toString().length == 10) startTime *= 1000;
    startTime = new Date(startTime);
    startTime = pubfn.timeFormat(startTime);
  }
  if (typeof startTime == "string") {
    startTime = startTime.replace("T", " ");
    startTime = startTime;
    startTime = new Date(startTime.replace(/-/g, "/")); //将-转化为/，使用new Date
  }

  var endTime = new Date(); //获取当前时间
  var nd = 1000 * 24 * 60 * 60; //一天的毫秒数
  var nh = 1000 * 60 * 60; //一小时的毫秒数
  var nm = 1000 * 60; //一分钟的毫秒数
  var ns = 1000; //一秒钟的毫秒数long diff;try {
  var diff = endTime.getTime() - startTime.getTime();
  var day = Math.floor(diff / nd); //计算差多少天
  var hour = Math.floor(diff % nd / nh); //计算差多少小时
  var min = Math.floor(diff % nd % nh / nm); //计算差多少分钟
  var sec = Math.round(diff % nd % nh % nm / ns); //计算差多少秒//输出结果
  var showStr = "1 秒";
  if (day > 0) {
    showStr = day + "天";
  } else if (hour > 0) {
    showStr = hour + "小时";
  } else if (min > 0) {
    showStr = min + "分钟";
  } else if (sec > 0) {
    showStr = sec + "秒";
  }
  showStr += suffix;
  return showStr;
};
/**
 * 将时间显示成1秒、1天
 * @description 主要用于 到期时间剩余 : 3天 这样的场景
 * @param {String || Number} endTime	需要计算的时间 如到期时间
 * vk.pubfn.dateDiff2(endTime);
 */
pubfn.dateDiff2 = function (startTime) {
  var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "1秒";
  if (!startTime) {
    return "";
  }
  if (typeof startTime === "string" && !isNaN(startTime)) startTime = Number(startTime);
  if (typeof startTime == "number") {
    if (startTime.toString().length == 10) startTime *= 1000;
    startTime = new Date(startTime);
    startTime = pubfn.timeFormat(startTime);
  }
  if (typeof startTime == "string") {
    startTime = startTime.replace("T", " ");
    startTime = startTime;
    startTime = new Date(startTime.replace(/-/g, "/")); //将-转化为/，使用new Date
  }

  var endTime = new Date(); //获取当前时间
  var nd = 1000 * 24 * 60 * 60; //一天的毫秒数
  var nh = 1000 * 60 * 60; //一小时的毫秒数
  var nm = 1000 * 60; //一分钟的毫秒数
  var ns = 1000; //一秒钟的毫秒数long diff;try {
  var diff = startTime.getTime() - endTime.getTime();
  var day = Math.floor(diff / nd);
  var hour = Math.floor(diff % nd / nh);
  var min = Math.floor(diff % nd % nh / nm);
  var sec = Math.round(diff % nd % nh % nm / ns);
  var showStr = str;
  if (day > 0) {
    showStr = day + "天";
  } else if (hour > 0) {
    showStr = hour + "小时";
  } else if (min > 0) {
    showStr = min + "分钟";
  } else if (sec > 0) {
    showStr = sec + "秒";
  }
  return showStr;
};
/**
 * 将大数字转中文
 * @description 主要用于展示浏览量等不需要非常精确显示的场景
 * 如:
 * 3210 -> 3千
 * 31210 -> 3万
 * 1523412 -> 1百万
 * 15234120 ->1千万
 * @param {Number} n 需要转换的数字
 * vk.pubfn.numStr(n);
 */
pubfn.numStr = function (n) {
  if (typeof n == "string") {
    n = parseFloat(n);
  }
  var str = n;
  if (n < 1000) {
    str = n;
  } else if (n < 10000) {
    var n1 = Math.floor(n / 100);
    str = n1 / 10 + "千";
  } else if (n < 1000000) {
    var _n = Math.floor(n / 1000);
    str = _n / 10 + "万";
  } else if (n < 10000000) {
    var _n2 = Math.floor(n / 1000000);
    str = _n2 + "百万";
  } else if (n < 100000000) {
    var _n3 = Math.floor(n / 10000000);
    str = _n3 + "千万";
  } else if (n >= 100000000) {
    var _n4 = Math.floor(n / 10000000);
    str = _n4 / 10 + "亿";
  }
  return str;
};
/**
 * 金额显示过滤器（已分为单位，将100 转成 1）
 * @param {Number} money 金额
 * vk.pubfn.priceFilter(money);
 */
pubfn.priceFilter = function (money) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  if (pubfn.isNull(money)) {
    return defaultValue;
  }
  if (isNaN(money)) {
    return money;
  }
  if (typeof money == "string") {
    money = parseFloat(money);
  }
  return (money / 100).toFixed(2);
};
// 金额过滤器 - 只显示小数点左边
pubfn.priceLeftFilter = function (n) {
  var s = "";
  if (n) {
    s = pubfn.priceFilter(n).split(".")[0];
  }
  return s;
};
// 金额过滤器 - 只显示小数点右边
pubfn.priceRightFilter = function (n) {
  var s = "";
  if (n) {
    s = pubfn.priceFilter(n).split(".")[1];
  }
  return s;
};
/**
 * 百分比过滤器 将 0.01 显示成 1%  1 显示成 100%
 * @param {Number} value 百分比值
 * @param {Boolean} needShowSymbol 显示 % 这个符号
 * @param {String | Number} defaultValue value为空时的默认值
 * vk.pubfn.percentageFilter(money);
 */
pubfn.percentageFilter = function (value) {
  var needShowSymbol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
  if (pubfn.isNull(value)) {
    return defaultValue;
  }
  if (isNaN(value)) {
    return value;
  }
  if (typeof value == "string") {
    value = parseFloat(value);
  }
  value = parseFloat((value * 100).toFixed(2));
  if (needShowSymbol) {
    value += "%";
  }
  return value;
};
/**
 * 折扣过滤器 将 0.1 显示成 1折 1 显示成 原价 0 显示成免费
 * @param {Number} value 折扣值
 * @param {Boolean} needShowSymbol 显示 折 这个中文字符
 * @param {String | Number} defaultValue value为空时的默认值
 * vk.pubfn.discountFilter(value);
 */
pubfn.discountFilter = function (value) {
  var needShowSymbol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
  if (pubfn.isNull(value)) {
    return defaultValue;
  }
  if (isNaN(value)) {
    return value;
  }
  if (typeof value == "string") {
    value = parseFloat(value);
  }
  value = parseFloat((value * 10).toFixed(2));
  if (value > 10) {
    return "折扣不可以大于原价";
  }
  if (value == 10) {
    return "原价";
  }
  if (value == 0) {
    return "免费";
  }
  if (value < 0) {
    return "折扣不可以小于0";
  }
  if (needShowSymbol) {
    value += " 折";
  }
  return value;
};
/**
 * 将字符串格式的时间转为时间戳
 * @param {String} 	dateString		格式为:2020-08-08 12:12:12
 */
pubfn.toTimeLong = function (dateString) {
  if (!dateString) {
    return "";
  }
  dateString = dateString.substring(0, 19);
  dateString = dateString.replace(new RegExp(/-/, "g"), '/');
  var time = new Date(dateString).getTime();
  if (isNaN(time)) {
    time = "";
  }
  return time;
};

/**
 * 单位进制换算
 * length	换算前大小
 * arr		进制的数组,如["B","KB","MB","GB"]
 * ary		进制,如KB-MB-GB,进制1024
 * precision	数值精度
 * vk.pubfn.calcSize(length,["B","KB","MB","GB"],1024,3);
 */
pubfn.calcSize = function () {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var arr = arguments.length > 1 ? arguments[1] : undefined;
  var ary = arguments.length > 2 ? arguments[2] : undefined;
  var precision = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2;
  var showType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "auto";
  length = parseFloat(length);
  var size = 0;
  var type = "";
  if (length < ary || arr.length <= 1) {
    type = arr[0];
    size = parseFloat(length.toFixed(precision));
  } else {
    for (var i = 1; i < arr.length; i++) {
      var currentType = arr[i];
      length = length / ary;
      if (showType === "auto") {
        if (length < ary) {
          type = currentType;
          size = parseFloat(length.toFixed(precision));
          break;
        }
      } else {
        if (showType === currentType) {
          type = currentType;
          size = parseFloat(length.toFixed(precision));
          break;
        }
      }
    }
  }
  return {
    size: size,
    type: type,
    title: size + " " + type
  };
};

/**
 * 将一个大数组拆分成N个小数组（分割数组）
 * @param {Array} array 大数组
 * @param {Number} size 小数组每组最大多少个
 * 代码示例
 * let newArray = vk.pubfn.splitArray(array, 2);
 */
pubfn.splitArray = function (array, size) {
  var data = [];
  for (var i = 0; i < array.length; i += size) {
    data.push(array.slice(i, i + size));
  }
  return data;
};

/**
 * 将对象内的属性按照ASCII字符顺序进行排序，返回排序后的对象
 * @param {Object} obj 需要排序对象
 * 代码示例
 * let newObj = vk.pubfn.objectKeySort(obj);
 */
pubfn.objectKeySort = function (obj) {
  var keys = Object.keys(obj).sort();
  var newObject = {};
  for (var i in keys) {
    newObject[keys[i]] = obj[keys[i]];
  }
  return newObject;
};

// 以下是前端专属API-----------------------------------------------------------

/**
 * 手机端长列表分页加载数据 2.0版本
 * @param {Vue页面对象} 	that						页面数据对象this
 * @param {String} 			url							请求地址(云函数路径)
 * @param {String} 			listName				后端返回的list数组的字段名称,默认rows(二选一即可)
 * @param {String} 			listKey					后端返回的list数组的字段名称,默认rows(二选一即可)
 * @param {String} 			formKey					表单请求的对象数据源字段名称,默认queryForm1
 * @param {Object} 			data						额外数据
 * @param {function} 		dataPreprocess	数据预处理函数
 *
 * 代码示例
	vk.pubfn.getListData2({
		that : this,
		url : "template/db_api/pub/select",
		data : {
			a : 1
		},
		dataPreprocess : function(list){
			return list;
		}
	});
 */
pubfn.getListData2 = function () {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var vk = uni.vk;
  var that = obj.that,
    listName = obj.listName,
    _obj$listKey = obj.listKey,
    listKey = _obj$listKey === void 0 ? "rows" : _obj$listKey,
    _obj$formKey = obj.formKey,
    formKey = _obj$formKey === void 0 ? "queryForm1" : _obj$formKey,
    url = obj.url,
    dataPreprocess = obj.dataPreprocess,
    _obj$idKeyName = obj.idKeyName,
    idKeyName = _obj$idKeyName === void 0 ? "_id" : _obj$idKeyName;
  if (listName) listKey = listName;
  /**
   * 2.0与1.0的区别
   * 2.0使用的queryForm1作为查询,而1.0是form1
   * 2.0云函数端是getTableData,而1.0是selects
   */
  var queryForm1 = that[formKey] || that.queryForm1 || that.queryForm;
  // 标记为请求中
  that.loading = true;
  var hasMore = true;
  if (queryForm1.pagination.pageIndex === 1) {
    that.firstLoading = true;
  }
  vk.callFunction({
    url: url,
    data: queryForm1,
    success: function success(data) {
      var list = data[listKey] || [];
      // 数据预处理
      if (typeof dataPreprocess == "function") {
        list = dataPreprocess(list);
      }
      if (queryForm1.pagination.pageIndex > 1) {
        // 翻页
        if (list.length == 0) {
          // 无数据时
          hasMore = false;
          queryForm1.pagination.pageIndex--;
          list = that.data.list;
        } else {
          // 有数据时
          if (list.length < queryForm1.pagination.pageSize) {
            hasMore = false;
          }
          // 数据合并
          list = vk.pubfn.arr_concat(that.data.list, list, idKeyName);
        }
      } else if (queryForm1.pagination.pageIndex == 1) {
        // 第一页
        if (list.length < queryForm1.pagination.pageSize) {
          hasMore = false;
        }
        if (list.length == 0) {
          that.state.isEmpty = true;
        } else {
          that.state.isEmpty = false;
        }
      }
      // 如果后端返回了hasMore,则使用后端的hasMore值
      if (typeof data.hasMore !== "undefined") {
        hasMore = data.hasMore;
      }
      data = _objectSpread(_objectSpread({}, data), {}, {
        total: data.total,
        list: list,
        hasMore: hasMore,
        pageIndex: data.pageIndex,
        pageSize: data.pageSize
      });
      that.state.loadmore = hasMore ? "loadmore" : "nomore"; // 更新状态
      that.data = vk.pubfn.objectAssign(that.data, data); // 更新数据
      if (typeof obj.success == "function") obj.success(data);
    },
    fail: function fail(err) {
      that.state.loadmore = "loadmore";
      if (queryForm1.pagination.pageIndex > 1) {
        queryForm1.pagination.pageIndex--;
      }
      if (typeof obj.fail == "function") {
        obj.fail(data);
      } else if (err && err.msg) {
        vk.toast(err.msg, "none");
      }
    },
    complete: function complete(res) {
      that.loading = false;
      if (queryForm1.pagination.pageIndex === 1) {
        that.state.firstLoading = false;
      }
      if (typeof obj.complete == "function") obj.complete(res);
    }
  });
};

/**
 * 手机端长列表分页加载数据(1.0版本)
 * @param {Vue页面对象} 	that						页面数据对象this
 * @param {String} 			url							请求地址(云函数路径)
 * @param {String} 			listName				后端返回的list数组的字段名称,默认rows
 * @param {String} 			listKey					后端返回的list数组的字段名称,默认rows
 * @param {String} 			formKey					表单请求的对象数据源字段名称,默认form1
 * @param {Object} 			data						额外数据
 * @param {function} 		dataPreprocess	数据预处理函数
 *
 * 代码示例
	vk.pubfn.getListData({
		that : this,
		url : "template/db_api/pub/select",
		listKey : "rows",
		formKey : "form1",
		data : {
			a : 1
		},
		dataPreprocess : function(list){
			return list;
		}
	});
 */
pubfn.getListData = function () {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var that = obj.that,
    listName = obj.listName,
    _obj$listKey2 = obj.listKey,
    listKey = _obj$listKey2 === void 0 ? "rows" : _obj$listKey2,
    _obj$formKey2 = obj.formKey,
    formKey = _obj$formKey2 === void 0 ? "form1" : _obj$formKey2,
    url = obj.url,
    dataPreprocess = obj.dataPreprocess,
    loading = obj.loading;
  var vk = uni.vk;
  if (listName) listKey = listName;
  var _that$data = that.data,
    data = _that$data === void 0 ? {} : _that$data;
  var form1 = that[formKey] || {};
  var _data$pageKey = data.pageKey,
    pageKey = _data$pageKey === void 0 ? true : _data$pageKey;
  if (!form1.pageIndex) form1.pageIndex = 1;
  if (!form1.pageSize) form1.pageSize = 20;
  var addTime = form1.addTime;
  var endTime = form1.endTime;
  if (endTime) endTime += " 23:59:59";
  if (!pageKey && form1.pageIndex > 1) {
    form1.pageIndex--;
    return false;
  }
  if (addTime) form1.addTimeLong = pubfn.toTimeLong(addTime);
  if (endTime) form1.endTimeLong = pubfn.toTimeLong(endTime);
  if (obj.data && JSON.stringify(obj.data) != "{}") {
    pubfn.objectAssign(form1, obj.data);
  }
  var title = obj.title;
  if (typeof obj.title == "undefined" && !loading) {
    title = form1.pageIndex == 1 ? "请求中..." : "";
  }
  vk.callFunction({
    url: url,
    data: form1,
    title: title,
    loading: loading,
    success: function success(data) {
      var list = data[listKey] || [];
      // 数据预处理
      if (typeof dataPreprocess == "function") {
        list = dataPreprocess(list);
      }
      if (form1.pageIndex > 1) {
        // 翻页
        if (list.length == 0) {
          // 无数据时
          pageKey = false;
          form1.pageIndex--;
          list = that.data.list;
        } else {
          // 有数据时
          if (list.length < form1.pageSize) {
            pageKey = false;
          }
          var oldList = that.data.list;
          // 数据合并
          list = pubfn.arr_concat(oldList, list, "_id");
        }
      } else if (form1.pageIndex == 1) {
        if (list.length < form1.pageSize) {
          pageKey = false;
        }
      }
      //console.log(pageKey,list.length,form1.pageSize);
      data = _objectSpread(_objectSpread({}, data), {}, {
        total: data.total,
        list: list,
        pageKey: pageKey,
        loadmore: pageKey ? "loadmore" : "nomore" // 更新状态
      });

      that.data = pubfn.objectAssign(that.data, data); // 更新数据
      if (typeof obj.success == "function") obj.success(data);
    },
    fail: function fail(err) {
      if (form1.pageIndex > 1) {
        form1.pageIndex--;
      }
      if (typeof obj.fail == "function") {
        obj.fail(data);
      } else if (err && err.msg) {
        vk.toast(err.msg, "none");
      }
    },
    complete: function complete(res) {
      if (typeof obj.complete == "function") obj.complete(res);
    }
  });
};

/**
 * 动态组件数据获取
 * @description 主要用于动态组件的数据获取
 * @param {Vue页面对象} that 页面数据对象this
 * @param {String}     ids  动态数据组件的ID
 *
 * 代码示例
 * 如:放置一个动态数据的 公告组件 和 一个轮播图组件
 * view  核心:自定义组件接收一个 Object 类型的属性 datas
  <vk-u-notice-bar :datas='componentsDynamic["notice-bar-01"]'></vk-u-notice-bar>
  <vk-u-swiper :datas='componentsDynamic["index-swiper-01"]' :custom-datas='{
    "height":600,
  }'></vk-u-swiper>
  在页面数据变量中新增 componentsDynamic
  data() {
    return {
      // 动态组件数据集合
      componentsDynamic:{}
    }
  }
  在页面初始化方法中执行下面的函数
  this.vk.pubfn.getComponentsDynamicData({
    that : this,
    ids : ["notice-bar-01","index-swiper-01"]
  });
 */
pubfn.getComponentsDynamicData = function () {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var that = obj.that,
    _obj$keyName = obj.keyName,
    keyName = _obj$keyName === void 0 ? "componentsDynamic" : _obj$keyName,
    title = obj.title,
    _obj$url = obj.url,
    url = _obj$url === void 0 ? "plugs/components_dynamic/client/pub/getComponentsDynamicData" : _obj$url,
    ids = obj.ids;
  var vk = uni.vk;
  var form1 = {
    ids: ids
  };
  if (obj.data && JSON.stringify(obj.data) != "{}") {
    pubfn.objectAssign(form1, obj.data);
  }
  // 读取缓存开始-----------------------------------------------------------
  var cacheKey = "pub-componentsDynamic";
  var cacheData = uni.getStorageSync(cacheKey) || {};
  var cacheDataKey = JSON.stringify(ids);
  if (cacheData[cacheDataKey]) {
    // 渲染本地数据
    that[keyName] = cacheData[cacheDataKey];
  }
  // 读取缓存结束-----------------------------------------------------------
  vk.callFunction({
    url: url,
    data: form1,
    title: title,
    success: function success(data) {
      if (JSON.stringify(cacheData[cacheDataKey]) !== JSON.stringify(data.componentsDynamic)) {
        // 渲染服务器数据
        that[keyName] = data.componentsDynamic;
        // 同时将组件数据进行缓存
        cacheData[cacheDataKey] = data.componentsDynamic;
        uni.setStorageSync(cacheKey, cacheData);
      }
      if (typeof obj.success == "function") obj.success(data);
    },
    fail: function fail(err) {
      console.error(err);
      if (typeof obj.fail == "function") obj.fail(data);
    },
    complete: function complete() {
      if (typeof obj.complete == "function") obj.complete(data);
    }
  });
};

/**
 * 将../../ 形式的页面相对路径 转成 页面绝对路径
 * @param {String} url 需要转换的url
 * vk.pubfn.getPageFullPath(url);
 */
pubfn.getPageFullPath = function (url) {
  var fullPath = url;
  if (fullPath.indexOf("/") !== 0) {
    if (fullPath.indexOf("./") === 0) {
      //fullPath = "." + fullPath;
      fullPath = fullPath.substring(2);
    }
    var urlSplit = fullPath.split("../");
    // 向上目录级数,0:根目录 1:向上1级
    var level = urlSplit.length;
    // 尾部路径
    var urlEnd = urlSplit[level - 1];
    // 获取当前页面的页面全路径
    var pages = getCurrentPages();
    var currentPage = pages[pages.length - 1];
    var currentPagePath = currentPage.route;
    // 分割成目录,最后一段是页面名称
    var urlArr = currentPagePath.split("/");
    var urlSplicing = "";
    // 开始拼接
    for (var i = 0; i < urlArr.length - level; i++) {
      urlSplicing += urlArr[i] + "/";
    }
    // 完整页面路径
    fullPath = urlSplicing + urlEnd;
    if (fullPath.indexOf("/") != 0) {
      fullPath = "/" + fullPath;
    }
  }
  return fullPath;
};
/**
 * 获取平台信息
 * let platform = vk.pubfn.getPlatform();
 */
pubfn.getPlatform = function () {
  var platform;
  platform = "mp-weixin";
  return platform;
};
/**
 * 获取当前页面实例
 * 返回数据
 * fullPath 当前打开页面的完整路径（带页面参数）
 * pagePath 当前打开页面的路径（不含参数）
 * options  当前打开页面的参数
 * route    当前打开页面路由地址
 * $vm      当前打开页面的vue实例
 * vk.pubfn.getCurrentPage();
 */
pubfn.getCurrentPage = function () {
  var res = {};
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  if (page.route.indexOf("/") == 0) page.route = page.route.substring(1);
  var pagePath = "/".concat(page.route);
  var fullPath = "/".concat(page.route);
  var options = page.options;
  if (page.$page) {
    if (typeof page.$page.fullPath !== "undefined") {
      fullPath = page.$page.fullPath;
    } else if ((0, _typeof2.default)(options) === "object") {
      var optionsStr = pubfn.queryParams(options);
      fullPath = pagePath + optionsStr;
    }
  }
  res.fullPath = fullPath;
  res.pagePath = pagePath;
  res.options = options;
  res.route = page.route;
  res.$vm = page.$vm;
  return res;
};
/**
 * 获取当前页面路由
 * vk.pubfn.getCurrentPageRoute();
 */
pubfn.getCurrentPageRoute = function (removeSlash) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  if (removeSlash) {
    return page.route;
  } else {
    return "/" + page.route;
  }
};
/**
 * 文件转base64

方式一

vk.pubfn.fileToBase64({
	file:res.tempFiles[0],
	success:function(base64){

	}
});

方式二

vk.pubfn.fileToBase64({ file }).then(base64 => {

});
 */
pubfn.fileToBase64 = function () {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var file = obj.file;
  var filePath = (0, _typeof2.default)(file) === "object" ? file.path : file;
  return new Promise(function (resolve, reject) {
    uni.getFileSystemManager().readFile({
      filePath: filePath,
      encoding: "base64",
      success: function success(res) {
        var base64 = res.data;
        if (base64.indexOf(";base64,") == -1) {
          base64 = "data:image/jpeg;base64," + base64;
        }
        if (obj.success) obj.success(base64);
        if (obj.complete) obj.complete(base64);
        resolve(base64);
      },
      fail: function fail(err) {
        if (obj.fail) obj.fail(err);
        reject(err);
      },
      complete: obj.complete
    });
    // let base64 = uni.getFileSystemManager().readFileSync(file.path, 'base64');
    // if(obj.success) obj.success(base64);
    // if(obj.complete) obj.complete(base64);
    // resolve(base64);
  });
};

/**
 * base64转文件
方式一

vk.pubfn.base64ToFile({
	base64:base64,
	success:function(file){

	}
});

方式二

vk.pubfn.base64ToFile({ base64 }).then(file => {

});
 */
pubfn.base64ToFile = function () {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _obj$base = obj.base64,
    base64 = _obj$base === void 0 ? "" : _obj$base,
    filePath = obj.filePath;
  var extName = base64.split(',')[0].match(/data\:\S+\/(\S+);/);
  if (extName) {
    extName = extName[1];
  } else {
    reject(new Error('base64 error'));
  }
  if (!filePath) {
    filePath = pubfn.random(32, "abcdefghijklmnopqrstuvwxyz0123456789") + '.' + extName;
  }
  var index = base64.indexOf("base64,");
  var base64Data = base64;
  if (index > -1) {
    base64Data = base64.substring(base64.indexOf("base64,") + 7);
  }
  var savePath;
  return new Promise(function (resolve, reject) {
    savePath = wx.env.USER_DATA_PATH + '/' + filePath;
    var fs = uni.getFileSystemManager();
    fs.writeFile({
      filePath: savePath,
      data: base64Data,
      encoding: "base64",
      success: function success(res) {
        var file = {
          path: savePath,
          lastModifiedDate: new Date(),
          name: filePath
        };
        if (obj.success) obj.success(file);
        resolve(file);
      },
      fail: function fail(res) {
        if (obj.fail) obj.fail(res);
        reject(res);
      },
      complete: obj.complete
    });
  });
};
/**
 * 将base64转换为blob （H5独有）
 vk.pubfn.base64toBlob(base64);
 */
pubfn.base64toBlob = function (base64) {
  var arr = base64.split(',');
  var mime = arr[0].match(/:(.*?);/)[1];
  var bstr = atob(arr[1]);
  var n = bstr.length;
  var u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {
    type: mime
  });
};
/**
 * //将blob转换为file
 vk.pubfn.blobToFile(base64);
 */
pubfn.blobToFile = function (blob, fileName) {
  blob.lastModifiedDate = new Date();
  blob.name = fileName;
  blob.path = URL.createObjectURL(blob);
  return blob;
};

/**
 * 小程序订阅消息 前端无需再写 #ifdef MP-WEIXIN
 vk.pubfn.requestSubscribeMessage({
	 tmplIds: ['NcspDBQpH6CGHos3mMADrrQpEv2gHmtfOPa5KTLs92E']
 });
 */
pubfn.requestSubscribeMessage = function (obj) {
  return uni.requestSubscribeMessage(obj);
};

/**
 * 检测是否需要登录 此方法目前为测试版
 * vk.pubfn.checkLogin();
 */
pubfn.checkLogin = function () {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var vk = uni.vk;
  var loginUrl = vk.getConfig("login.url");
  try {
    var url;
    try {
      url = obj.url || vk.pubfn.getCurrentPageRoute();
    } catch (err) {
      url = vk.getConfig("index.url") || "/pages/index/index";
    }
    vk.navigate.checkNeedLogin({
      url: url,
      success: function success(res) {
        if (res.needLogin) {
          // 记录下原本要跳转的页面
          url = vk.pubfn.getPageFullPath(obj.fullPath || url);
          vk.navigate.setOriginalPage({
            url: url
          });
          if (obj.isOnLaunch) vk.navigate.isOnLaunchToLogin = true; // 标记为首次启动的页面需要登录
          uni.reLaunch({
            url: loginUrl,
            success: function success() {
              setTimeout(function () {
                uni.hideHomeButton();
              }, 400);
            }
          });
        } else {
          vk.navigate.setOriginalPage(null);
        }
      }
    });
  } catch (err) {
    console.error("catch", err);
    uni.reLaunch({
      url: loginUrl
    });
    uni.hideHomeButton();
  }
};
/**
 * 获取文件本地路径
 * @param {Object} path
 */
pubfn.getLocalFilePath = function (path) {
  if (path.indexOf('_www') === 0 || path.indexOf('_doc') === 0 || path.indexOf('_documents') === 0 || path.indexOf('_downloads') === 0) {
    return path;
  }
  if (path.indexOf('file://') === 0) {
    return path;
  }
  if (path.indexOf('/storage/emulated/0/') === 0) {
    return path;
  }
  if (path.indexOf('/') === 0 && typeof plus !== "undefined") {
    var localFilePath = plus.io.convertAbsoluteFileSystem(path);
    if (localFilePath !== path) {
      return localFilePath;
    } else {
      path = path.substr(1);
    }
  }
  return '_www/' + path;
};

/**
 * 获取当前支持的应用语言
 * let localeList = vk.pubfn.getLocaleList();
 */
pubfn.getLocaleList = function () {
  var localeList = [{
    value: "zh-Hans",
    label: "简体中文"
  }, {
    value: "zh-Hant",
    label: "繁體中文"
  }, {
    value: "en",
    label: "English"
  }];
  return localeList;
};
/**
 * 获取当前应用语言
 * let locale = vk.pubfn.getLocale();
 */
pubfn.getLocale = function () {
  var localeValue;
  if (typeof uni.getLocale === "function") {
    localeValue = uni.getLocale();
  } else {
    localeValue = "zh-Hans"; // 默认中文简体
  }

  var localeObj = {
    "zh_CN": "zh-Hans",
    // 中国大陆（简体）
    "zh_HK": "zh-Hant",
    // 香港（繁体）
    "zh_MO": "zh-Hant",
    // 澳门（繁体）
    "zh_SG": "zh-Hans",
    // 新加坡（简体）
    "zh_TW": "zh-Hant" // 台湾（繁体）
  };

  if (localeObj[localeValue]) localeValue = localeObj[localeValue];
  return localeValue;
};
/**
 * 获取当前应用语言
 * let localeObj = vk.pubfn.getLocaleObject();
 */
pubfn.getLocaleObject = function () {
  var value = pubfn.getLocale();
  var list = pubfn.getLocaleList();
  return pubfn.getListItem(list, "value", value);
};
/**
 * 设置当前应用语言
 */
pubfn.setLocale = function () {
  var _uni;
  return (_uni = uni).setLocale.apply(_uni, arguments);
};

/**
 * 将obj2的数据赋值给obj1，并使vue双向绑定（vue2对象新增属性不会双向绑定）
 * @description 将 obj2 的属性赋值给 obj1 (如果obj1中有对应的属性,则会被obj2的属性值覆盖)
 * @param {Object} 	obj1
 * @param {Object} 	obj2
 * @param {Object} 	that 页面实例
 * vk.pubfn.objectAssignForVue(obj1, obj2, that);
 */
pubfn.objectAssignForVue = function (obj1, obj2, that) {
  pubfn.objectDeleteInvalid(obj2);
  for (var key in obj2) {
    that.$set(obj1, key, obj2[key]);
  }
};

// 前端专属结束 -----------------------------------------------------------
var _default = pubfn;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"]))

/***/ }),
/* 59 */
/*!**************************************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-client/uni_modules/vk-unicloud/vk_modules/vk-unicloud-page/libs/function/throttle.js ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var timeoutArr = [];
var flagArr = [];
/**
 * 节流函数
 * 节流原理：在一定时间内，只能触发一次
 * @param {Function} fn 要执行的回调函数 
 * @param {Number} time 延时的时间
 * @param {Boolean} isImmediate 是否立即执行
 * @param {String} timeoutName 定时器ID
 * @return null
vk.pubfn.throttle(function() {
	
}, 1000);
 */
function throttle(fn) {
  var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  var isImmediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var timeoutName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "default";
  if (!timeoutArr[timeoutName]) timeoutArr[timeoutName] = null;
  if (isImmediate) {
    if (!flagArr[timeoutName]) {
      flagArr[timeoutName] = true;
      // 如果是立即执行，则在time毫秒内开始时执行
      if (typeof fn === 'function') fn();
      timeoutArr[timeoutName] = setTimeout(function () {
        flagArr[timeoutName] = false;
      }, time);
    }
  } else {
    if (!flagArr[timeoutName]) {
      flagArr[timeoutName] = true;
      // 如果是非立即执行，则在time毫秒内的结束处执行
      timeoutArr[timeoutName] = setTimeout(function () {
        flagArr[timeoutName] = false;
        if (typeof fn === 'function') fn();
      }, time);
    }
  }
}
;
var _default = throttle;
exports.default = _default;

/***/ }),
/* 60 */
/*!*****************************************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-client/uni_modules/vk-unicloud/vk_modules/vk-unicloud-page/libs/function/queryParams.js ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * 对象转url参数
 * @param {*} data,对象
 * @param {*} isPrefix,是否自动加上"?"
 * 此函数参考uView
 */
function queryParams() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var newData = JSON.parse(JSON.stringify(data));
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';
  var _loop = function _loop(key) {
    var value = newData[key];
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (var i = 0; i < value.length; i++) {
            _result.push(key + '[' + i + ']=' + value[i]);
          }
          break;
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });
          break;
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push(key + '=' + _value);
          });
          break;
        case 'comma':
          // 结果: ids=1,2,3
          var commaStr = "";
          value.forEach(function (_value) {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(key + '=' + commaStr);
          break;
        default:
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });
      }
    } else {
      _result.push(key + '=' + value);
    }
  };
  for (var key in newData) {
    var _ret = _loop(key);
    if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}
var _default = queryParams;
exports.default = _default;

/***/ }),
/* 61 */
/*!**********************************************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-client/uni_modules/vk-unicloud/vk_modules/vk-unicloud-page/libs/function/setClipboardData.js ***!
  \**********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// JS对象深度合并
function setClipboardData() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  uni.setClipboardData(_objectSpread({}, obj));
}
var _default = setClipboardData;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 62 */
/*!**************************************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-client/uni_modules/vk-unicloud/vk_modules/vk-unicloud-page/libs/function/timeUtil.js ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
/**
 * 时间工具类
 */
var util = {};
util.getTargetTimezone = function (val) {
  if (typeof val === "number") {
    return val;
  }
  var vk = uni.vk;
  var defaultValue = 8;
  var targetTimezone = defaultValue;
  try {
    var config = vk.callFunctionUtil.getConfig();
    targetTimezone = config.targetTimezone;
    if (typeof targetTimezone !== "number") {
      targetTimezone = defaultValue;
    }
  } catch (err) {}
  return targetTimezone;
};

// 尽可能的将参数转成正确的时间对象
util.getDateObject = function (date, targetTimezone) {
  if (!date) return "";
  var nowDate;
  // 如果是字符串，且纯数字，则强制转数值
  if (typeof date === "string" && !isNaN(date) && date.length >= 10) date = Number(date);
  if (typeof date === "number") {
    if (date.toString().length == 10) date *= 1000;
    nowDate = new Date(date); // 转时间对象
  } else if ((0, _typeof2.default)(date) === "object") {
    nowDate = new Date(date.getTime()); // 新建一个时间对象
  } else if (typeof date === "string") {
    targetTimezone = util.getTargetTimezone(targetTimezone);
    var targetTimezoneStr = targetTimezone;
    var targetTimezoneF = targetTimezone >= 0 ? "+" : "";
    if (targetTimezone >= 0 && targetTimezone < 10) {
      targetTimezoneStr = "0".concat(targetTimezone);
    } else if (targetTimezone < 0 && targetTimezone > -10) {
      targetTimezoneStr = "-0".concat(targetTimezone * -1);
    }
    var arr1 = date.split(" ");
    var arr1_1 = arr1[0] || "";
    var arr1_2 = arr1[1] || "";
    var arr2;
    if (arr1_1.indexOf("-") > -1) {
      arr2 = arr1_1.split("-");
    } else {
      arr2 = arr1_1.split("/");
    }
    var arr3 = arr1_2.split(":");
    var dateObj = {
      year: Number(arr2[0]),
      month: Number(arr2[1]) || 1,
      day: Number(arr2[2]) || 1,
      hour: Number(arr3[0]) || 0,
      minute: Number(arr3[1]) || 0,
      second: Number(arr3[2]) || 0
    };
    for (var key in dateObj) {
      if (dateObj[key] >= 0 && dateObj[key] < 10) dateObj[key] = "0".concat(dateObj[key]);
    }
    // 格式 2022-10-01T00:00:00+08:00
    var dateStr = "".concat(dateObj.year, "-").concat(dateObj.month, "-").concat(dateObj.day, "T").concat(dateObj.hour, ":").concat(dateObj.minute, ":").concat(dateObj.second).concat(targetTimezoneF).concat(targetTimezoneStr, ":00");
    nowDate = new Date(dateStr);
  }
  return nowDate;
};

// 获取时间在不同时区下的时间对象
util.getTimeByTimeZone = function (date, targetTimezone) {
  var nowDate = util.getDateObject(date);
  targetTimezone = util.getTargetTimezone(targetTimezone);
  var timezoneOffset = nowDate.getTimezoneOffset();
  var offset = timezoneOffset * 60 * 1000 + targetTimezone * 60 * 60 * 1000;
  var targetTime = nowDate.getTime() + offset;
  nowDate = new Date(targetTime);
  return nowDate;
};

/**
 * 日期格式化
 * @param {Date || Number} date 需要格式化的时间
 * vk.pubfn.timeFormat(new Date(),"yyyy-MM-dd hh:mm:ss");
 */
util.timeFormat = function (date) {
  var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-MM-dd hh:mm:ss';
  var targetTimezone = arguments.length > 2 ? arguments[2] : undefined;
  try {
    if (!date) return "";
    var nowDate = util.getTimeByTimeZone(date, targetTimezone);
    var opt = {
      "M+": nowDate.getMonth() + 1,
      //月份
      "d+": nowDate.getDate(),
      //日
      "h+": nowDate.getHours(),
      //小时
      "m+": nowDate.getMinutes(),
      //分
      "s+": nowDate.getSeconds(),
      //秒
      //"w+": nowDate.getDay(), //周
      "q+": Math.floor((nowDate.getMonth() + 3) / 3),
      //季度
      "S": nowDate.getMilliseconds() //毫秒
    };

    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (nowDate.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in opt) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? opt[k] : ("00" + opt[k]).substr(("" + opt[k]).length));
      }
    }
    return fmt;
  } catch (err) {
    // 若格式错误,则原值显示
    return time;
  }
};

/**
 * 解析日期对象属性
 * @param {Date || Number} date 需要转换的时间
 * vk.pubfn.getDateInfo(new Date());
 */
util.getDateInfo = function () {
  var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
  var targetTimezone = arguments.length > 1 ? arguments[1] : undefined;
  var nowDate = util.getTimeByTimeZone(date, targetTimezone);
  var year = nowDate.getFullYear() + '';
  var month = nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
  var day = nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate();
  var hour = nowDate.getHours() < 10 ? '0' + nowDate.getHours() : nowDate.getHours();
  var minute = nowDate.getMinutes() < 10 ? '0' + nowDate.getMinutes() : nowDate.getMinutes();
  var second = nowDate.getSeconds() < 10 ? '0' + nowDate.getSeconds() : nowDate.getSeconds();
  var millisecond = nowDate.getMilliseconds(); //毫秒
  var week = nowDate.getDay(); // 周
  var quarter = Math.floor((nowDate.getMonth() + 3) / 3); //季度
  return {
    year: Number(year),
    month: Number(month),
    day: Number(day),
    hour: Number(hour),
    minute: Number(minute),
    second: Number(second),
    millisecond: Number(millisecond),
    week: Number(week),
    quarter: Number(quarter)
  };
};

/**
 * 获取时间范围
 * @param {Date} date 日期对象 可以指定时间计算节点，默认使用当前时间进行计算
 * 返回的是时间戳
 * 返回数据如下：
 {
	 todayStart     今日开始时间（时间戳）
	 todayEnd       今日结束时间（时间戳）
	 today12End     今日上午结束时间（时间戳）
	 monthStart     本月开始时间（时间戳）
	 monthEnd       本月结束时间（时间戳）
	 yearStart      本年开始时间（时间戳）
	 yearEnd        本年结束时间（时间戳）
	 weekStart      本周开始时间（时间戳）
	 weekEnd        本周结束时间（时间戳）
	 hourStart      当前小时开始时间（时间戳）
	 hourEnd        当前小时结束时间（时间戳）
	 yesterdayStart 昨天开始时间（时间戳）
	 yesterday12End 昨天上午结束时间（时间戳）
	 yesterdayEnd   昨天结束时间（时间戳）
	 lastMonthStart 上月开始时间（时间戳）
	 lastMonthEnd   上月结束时间（时间戳）
	 now        现在的时间点（含月年日时分秒）
	 months     本年度每月的开始和结束时间 months[1] 代表1月
	 days       本月每天的开始和结束时间 days[1] 代表1日
 }
 * vk.pubfn.getCommonTime();
 */
util.getCommonTime = function () {
  var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
  var targetTimezone = arguments.length > 1 ? arguments[1] : undefined;
  var res = {};
  var nowDate = util.getDateObject(date);
  targetTimezone = util.getTargetTimezone(targetTimezone);
  var dif = nowDate.getTimezoneOffset();
  var timeDif = dif * 60 * 1000 + targetTimezone * 60 * 60 * 1000;
  var _util$getDateInfo = util.getDateInfo(nowDate, targetTimezone),
    year = _util$getDateInfo.year,
    month = _util$getDateInfo.month,
    day = _util$getDateInfo.day,
    hour = _util$getDateInfo.hour,
    minute = _util$getDateInfo.minute,
    second = _util$getDateInfo.second,
    millisecond = _util$getDateInfo.millisecond,
    week = _util$getDateInfo.week,
    quarter = _util$getDateInfo.quarter;
  var oneDayTime = 24 * 60 * 60 * 1000;
  // 现在的时间
  res.now = {
    year: year,
    month: month,
    day: day,
    hour: hour,
    minute: minute,
    second: second,
    millisecond: millisecond,
    week: week,
    quarter: quarter,
    date_str: util.timeFormat(nowDate, "yyyy-MM-dd hh:mm:ss", targetTimezone),
    date_day_str: util.timeFormat(nowDate, "yyyy-MM-dd", targetTimezone),
    date_month_str: util.timeFormat(nowDate, "yyyy-MM", targetTimezone)
  };
  // 获取本月最大天数
  var month_last_day = new Date(year, month, 0).getDate();
  // 获取今年12月最大天数
  var year_last_day = new Date(year, 12, 0).getDate();
  // 今日开始时间
  res.todayStart = new Date("".concat(year, "/").concat(month, "/").concat(day)).getTime() - timeDif;
  // 今日12点时间
  res.today12End = new Date("".concat(year, "/").concat(month, "/").concat(day)).getTime() + (12 * 60 * 60 * 1000 - 1) - timeDif;
  // 今日结束时间
  res.todayEnd = new Date("".concat(year, "/").concat(month, "/").concat(day)).getTime() + (oneDayTime - 1) - timeDif;
  // 本月开始时间
  res.monthStart = new Date("".concat(year, "/").concat(month, "/1")).getTime() - timeDif;
  // 本月结束时间
  res.monthEnd = new Date("".concat(year, "/").concat(month, "/").concat(month_last_day)).getTime() + (oneDayTime - 1) - timeDif;
  // 本年开始时间
  res.yearStart = new Date("".concat(year, "/1/1")).getTime() - timeDif;
  // 本年结束时间
  res.yearEnd = new Date("".concat(year, "/12/").concat(year_last_day)).getTime() + (oneDayTime - 1) - timeDif;
  // 当前小时开始时间
  res.hourStart = new Date("".concat(year, "/").concat(month, "/").concat(day, " ").concat(hour, ":00:00")).getTime() - timeDif;
  // 当前小时结束时间
  res.hourEnd = new Date("".concat(year, "/").concat(month, "/").concat(day, " ").concat(hour, ":59:59")).getTime() - timeDif;
  // 计算上月开始-----------------------------------------------------------
  var year_last = year;
  var month_last = month - 1;
  if (month_last === 0) {
    month_last = 12;
    year_last = year - 1;
  }
  var month_last_day_last = new Date(year_last, month_last, 0).getDate();
  // 上月开始时间
  res.lastMonthStart = new Date("".concat(year_last, "/").concat(month_last, "/1")).getTime() - timeDif;
  // 上月结束时间
  res.lastMonthEnd = new Date("".concat(year_last, "/").concat(month_last, "/").concat(month_last_day_last)).getTime() + (oneDayTime - 1) - timeDif;
  // 计算上月结束-----------------------------------------------------------

  // 昨天开始时间
  res.yesterdayStart = res.todayStart - 1000 * 3600 * 24;
  // 昨天上午结束时间
  res.yesterday12End = res.today12End - 1000 * 3600 * 24;
  // 昨天结束时间
  res.yesterdayEnd = res.todayEnd - 1000 * 3600 * 24;
  var weekObj = util.getWeekOffsetStartAndEnd(0, nowDate, targetTimezone);
  // 本周开始时间
  res.weekStart = weekObj.startTime;
  // 本周结束时间
  res.weekEnd = weekObj.endTime;
  // 本年1-12月的起止时间
  res.months = [];
  res.months[0] = {
    startTime: res.monthStart,
    endTime: res.monthEnd,
    startTimeStr: util.timeFormat(res.monthStart, "yyyy-MM-dd hh:mm:ss", targetTimezone),
    endTimeStr: util.timeFormat(res.monthEnd, "yyyy-MM-dd hh:mm:ss", targetTimezone),
    monthStart: res.monthStart,
    // 兼容旧版
    monthEnd: res.monthEnd // 兼容旧版
  };

  for (var i = 1; i <= 12; i++) {
    // 获取此月最大天数
    var _month_last_day = new Date(year, i, 0).getDate();
    // 此月开始时间
    var startTime = new Date("".concat(year, "/").concat(i, "/1")).getTime() - timeDif;
    // 此月结束时间
    var endTime = new Date("".concat(year, "/").concat(i, "/").concat(_month_last_day)).getTime() + (oneDayTime - 1) - timeDif;
    res.months[i] = {
      startTime: startTime,
      endTime: endTime,
      startTimeStr: util.timeFormat(startTime, "yyyy-MM-dd hh:mm:ss", targetTimezone),
      endTimeStr: util.timeFormat(endTime, "yyyy-MM-dd hh:mm:ss", targetTimezone),
      monthStart: startTime,
      // 兼容旧版
      monthEnd: endTime // 兼容旧版
    };
  }
  // 本月1号到最后一天每天的起止时间
  res.days = [];
  res.days[0] = {
    startTime: res.todayStart,
    endTime: res.todayEnd,
    startTimeStr: util.timeFormat(res.todayStart, "yyyy-MM-dd hh:mm:ss", targetTimezone),
    endTimeStr: util.timeFormat(res.todayEnd, "yyyy-MM-dd hh:mm:ss", targetTimezone)
  };
  for (var _i = 1; _i <= month_last_day; _i++) {
    var nowTime = res.monthStart + (_i - 1) * oneDayTime;
    var _util$getDayOffsetSta = util.getDayOffsetStartAndEnd(0, nowTime, targetTimezone),
      _startTime = _util$getDayOffsetSta.startTime,
      _endTime = _util$getDayOffsetSta.endTime;
    res.days[_i] = {
      startTime: _startTime,
      endTime: _endTime,
      startTimeStr: util.timeFormat(_startTime, "yyyy-MM-dd hh:mm:ss", targetTimezone),
      endTimeStr: util.timeFormat(_endTime, "yyyy-MM-dd hh:mm:ss", targetTimezone)
    };
  }
  for (var key in res) {
    if (typeof res[key] === "number" && res[key].toString().length === 13) {
      res["".concat(key, "Str")] = util.timeFormat(res[key], "yyyy-MM-dd hh:mm:ss", targetTimezone);
    }
  }
  return res;
};

/**
 * 获得指定年份和月份后的该月的开始时间和结束时间
 * 返回数据如下：(时间戳形式)
 {
   startTime 该月开始时间
   endTime   该月结束时间
 }
vk.pubfn.getMonthStartAndEnd({
	year:2021
	month:1
});
 */
util.getMonthStartAndEnd = function (obj, targetTimezone) {
  targetTimezone = util.getTargetTimezone(targetTimezone);
  var res = {
    startTime: null,
    endTime: null
  };
  var year = obj.year,
    month = obj.month;
  if (year > 0 && month > 0) {
    var dif = new Date().getTimezoneOffset();
    var timeDif = dif * 60 * 1000 + targetTimezone * 60 * 60 * 1000;
    var month_last_day = new Date(year, month, 0).getDate();
    // 开始时间
    res.startTime = new Date("".concat(year, "/").concat(month, "/1")).getTime() - timeDif;
    // 结束时间
    res.endTime = new Date("".concat(year, "/").concat(month, "/").concat(month_last_day)).getTime() + (24 * 60 * 60 * 1000 - 1) - timeDif;
  }
  return res;
};

/**
 * 获得相对当前时间的偏移 count 小时的起止日期（返回小时的开始和结束时间戳）
 * @param {Number} count  默认0（0代表当前小时 -1代表上一个小时 1代表下一个小时以此类推）
 * @param {Date || Number} date 指定从哪个时间节点开始计算
 * vk.pubfn.getHourOffsetStartAndEnd(0);
 */
util.getHourOffsetStartAndEnd = function () {
  var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  var targetTimezone = arguments.length > 2 ? arguments[2] : undefined;
  var nowDate = util.getDateObject(date);
  targetTimezone = util.getTargetTimezone(targetTimezone);
  var res = {};
  var dif = nowDate.getTimezoneOffset();
  var timeDif = dif * 60 * 1000 + targetTimezone * 60 * 60 * 1000;
  // 一天的毫秒数
  var offsetMillisecond = 1000 * 60 * 60;
  // 相对于当前日期count个天的日期
  nowDate = new Date(nowDate.getTime() + offsetMillisecond * 1 * count);
  var dateInfo = util.getDateInfo(nowDate);
  // 获得当天的起始时间
  res.startTime = new Date("".concat(dateInfo.year, "/").concat(dateInfo.month, "/").concat(dateInfo.day, " ").concat(dateInfo.hour, ":00:00")).getTime() - timeDif;
  // 获得当天的结束时间
  res.endTime = new Date("".concat(dateInfo.year, "/").concat(dateInfo.month, "/").concat(dateInfo.day, " ").concat(dateInfo.hour, ":00:00")).getTime() + (offsetMillisecond - 1) - timeDif;
  return res;
};

/**
 * 获得相对当前时间的偏移 count 天的起止日期（返回日的开始和结束）
 * @param {Number} count  默认0（0代表今日 -1代表昨日 1代表明日以此类推）
 * @param {Date || Number} date 指定从哪个时间节点开始计算
 * vk.pubfn.getDayOffsetStartAndEnd(0);
 */
util.getDayOffsetStartAndEnd = function () {
  var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  var targetTimezone = arguments.length > 2 ? arguments[2] : undefined;
  var nowDate = util.getDateObject(date);
  targetTimezone = util.getTargetTimezone(targetTimezone);
  var res = {};
  var dif = nowDate.getTimezoneOffset();
  var timeDif = dif * 60 * 1000 + targetTimezone * 60 * 60 * 1000;
  // 一天的毫秒数
  var offsetMillisecond = 1000 * 60 * 60 * 24;
  // 相对于当前日期count个天的日期
  nowDate = new Date(nowDate.getTime() + offsetMillisecond * 1 * count);
  var dateInfo = util.getDateInfo(nowDate);
  // 获得当天的起始时间
  res.startTime = new Date("".concat(dateInfo.year, "/").concat(dateInfo.month, "/").concat(dateInfo.day)).getTime() - timeDif;
  // 获得当天的结束时间
  res.endTime = new Date("".concat(dateInfo.year, "/").concat(dateInfo.month, "/").concat(dateInfo.day)).getTime() + (offsetMillisecond - 1) - timeDif;
  return res;
};

/**
 * 获得相对当前周count个周的起止日期（返回周的开始和结束）
 * @param {Number} count  默认0（0代表本周 -1代表上周 1代表下周以此类推）
 * vk.pubfn.getWeekOffsetStartAndEnd(0);
 */
util.getWeekOffsetStartAndEnd = function () {
  var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  var targetTimezone = arguments.length > 2 ? arguments[2] : undefined;
  var res = {};
  var nowDate = util.getDateObject(date);
  targetTimezone = util.getTargetTimezone(targetTimezone);
  var dif = nowDate.getTimezoneOffset();
  var timeDif = dif * 60 * 1000 + targetTimezone * 60 * 60 * 1000;
  var nowDay = nowDate.getDay() === 0 ? 7 : nowDate.getDay();
  nowDate.setDate(nowDate.getDate() - nowDay + 1 + count * 7);
  var dateInfo1 = util.getDateInfo(nowDate);
  nowDate.setDate(nowDate.getDate() + 7);
  var dateInfo2 = util.getDateInfo(nowDate);
  // 开始时间 
  res.startTime = new Date("".concat(dateInfo1.year, "/").concat(dateInfo1.month, "/").concat(dateInfo1.day)).getTime() - timeDif;
  // 结束时间
  res.endTime = new Date("".concat(dateInfo2.year, "/").concat(dateInfo2.month, "/").concat(dateInfo2.day)).getTime() - 1 - timeDif;
  return res;
};

/**
 * 获得相对当前时间的偏移 count 个月的起止日期（月的开始和结束时间戳）
 * @param {Number} count  默认0（0代表本月 -1代表上月 1代表下月以此类推）
 * @param {Date || Number} date 指定从哪个时间节点开始计算
 * vk.pubfn.getMonthOffsetStartAndEnd(0);
 */
util.getMonthOffsetStartAndEnd = function () {
  var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  var targetTimezone = arguments.length > 2 ? arguments[2] : undefined;
  var res = {};
  var nowDate = util.getDateObject(date);
  targetTimezone = util.getTargetTimezone(targetTimezone);
  var dif = nowDate.getTimezoneOffset();
  var timeDif = dif * 60 * 1000 + targetTimezone * 60 * 60 * 1000;
  var dateInfo = util.getDateInfo(nowDate);
  var month = dateInfo.month + count;
  var year = dateInfo.year;
  if (month > 12) {
    year = year + Math.floor(month / 12);
    month = Math.abs(month) % 12;
  } else if (month <= 0) {
    year = year - 1 - Math.floor(Math.abs(month) / 12);
    month = 12 - Math.abs(month) % 12;
  }
  var month_last_day = new Date(year, month, 0).getDate();
  // 开始时间
  res.startTime = new Date("".concat(year, "/").concat(month, "/1")).getTime() - timeDif;
  // 结束时间
  res.endTime = new Date("".concat(year, "/").concat(month, "/").concat(month_last_day)).getTime() + (24 * 60 * 60 * 1000 - 1) - timeDif;
  return res;
};

/**
 * 获得相对当前时间的偏移 count 个季度的起止日期（季度的开始和结束时间戳）
 * @param {Number} count  默认0（0代表本季度 -1代表上个季度 1代表下个季度以此类推）
 * @param {Date || Number} date 指定从哪个时间节点开始计算
 * vk.pubfn.getQuarterOffsetStartAndEnd(0);
 */
util.getQuarterOffsetStartAndEnd = function () {
  var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  var targetTimezone = arguments.length > 2 ? arguments[2] : undefined;
  var res = {};
  var nowDate = util.getDateObject(date);
  nowDate.setMonth(nowDate.getMonth() + count * 3);
  targetTimezone = util.getTargetTimezone(targetTimezone);
  var dif = nowDate.getTimezoneOffset();
  var timeDif = dif * 60 * 1000 + targetTimezone * 60 * 60 * 1000;
  var dateInfo = util.getDateInfo(nowDate);
  var month = dateInfo.month;
  if ([1, 2, 3].indexOf(month) > -1) {
    // 第1季度
    month = 1;
  } else if ([4, 5, 6].indexOf(month) > -1) {
    // 第2季度
    month = 4;
  } else if ([7, 8, 9].indexOf(month) > -1) {
    // 第3季度
    month = 7;
  } else if ([10, 11, 12].indexOf(month) > -1) {
    // 第4季度
    month = 10;
  }
  nowDate.setMonth(month - 1); // 因为0代表1月，所以这里要减1
  var dateInfo1 = util.getDateInfo(nowDate);
  nowDate.setMonth(nowDate.getMonth() + 3);
  var dateInfo2 = util.getDateInfo(nowDate);
  // 开始时间
  res.startTime = new Date("".concat(dateInfo1.year, "/").concat(dateInfo1.month, "/1")).getTime() - timeDif;
  // 结束时间
  res.endTime = new Date("".concat(dateInfo2.year, "/").concat(dateInfo2.month, "/1")).getTime() - 1 - timeDif;
  return res;
};

/**
 * 获得相对当前时间的偏移 count 年的起止日期（年的开始和结束时间戳）
 * @param {Number} count  默认0 （0代表今年 -1代表去年 1代表明年以此类推）
 * @param {Date || Number} date 指定从哪个时间节点开始计算
 * vk.pubfn.getYearOffsetStartAndEnd(0);
 */
util.getYearOffsetStartAndEnd = function () {
  var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  var targetTimezone = arguments.length > 2 ? arguments[2] : undefined;
  var res = {};
  var nowDate = util.getDateObject(date);
  targetTimezone = util.getTargetTimezone(targetTimezone);
  var dif = nowDate.getTimezoneOffset();
  var timeDif = dif * 60 * 1000 + targetTimezone * 60 * 60 * 1000;
  var dateInfo = util.getDateInfo(nowDate);
  var year = dateInfo.year + count;
  // 开始时间
  res.startTime = new Date("".concat(year, "/1/1")).getTime() - timeDif;
  // 结束时间
  res.endTime = new Date("".concat(year, "/12/31")).getTime() + (24 * 60 * 60 * 1000 - 1) - timeDif;
  return res;
};

/**
 * 获得指定时间偏移 year年 month月 day天 hours时 minutes分 seconds秒前或后的时间戳
 * 返回时间戳
vk.pubfn.getOffsetTime(new Date(), {
	year:0,
	month:0,
	day:0,
	hours:0,
	minutes:0,
	seconds:0,
	mode:"after", // after 之后 before 之前
});

vk.pubfn.getOffsetTime(new Date(), {
	y:0,
	m:0,
	d:0,
	hh:0,
	mm:0,
	ss:0,
	mode:"after" // after 之后 before 之前
});
 */
util.getOffsetTime = function () {
  var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
  var obj = arguments.length > 1 ? arguments[1] : undefined;
  var targetTimezone = arguments.length > 2 ? arguments[2] : undefined;
  var nowDate = util.getDateObject(date);
  var dateInfo = util.getDateInfo(nowDate);
  targetTimezone = util.getTargetTimezone(targetTimezone);
  var dif = nowDate.getTimezoneOffset();
  var timeDif = dif * 60 * 1000 + targetTimezone * 60 * 60 * 1000;
  var year = obj.year || obj.y || 0;
  var month = obj.month || obj.m || 0;
  var day = obj.day || obj.d || 0;
  var hour = obj.hour || obj.hours || obj.hh || 0;
  var minute = obj.minute || obj.minutes || obj.mm || 0;
  var second = obj.second || obj.seconds || obj.ss || 0;
  var _obj$mode = obj.mode,
    mode = _obj$mode === void 0 ? "after" : _obj$mode;
  if (mode == "before") {
    year *= -1;
    month *= -1;
    day *= -1;
    hour *= -1;
    minute *= -1;
    second *= -1;
  }
  var offsetObj = {
    year: dateInfo.year + year,
    month: dateInfo.month + month,
    day: dateInfo.day + day,
    hour: dateInfo.hour + hour,
    minute: dateInfo.minute + minute,
    second: dateInfo.second + second
  };
  nowDate = new Date(offsetObj.year, offsetObj.month - 1, offsetObj.day, offsetObj.hour, offsetObj.minute, offsetObj.second);
  return nowDate.getTime() - timeDif;
};

/**
 * 判断是否是闰年
 * @param {Number | Date} year 需要计算的年份或时间,默认使用当前时间的年份
 * vk.pubfn.timeUtil.isLeapYear(year);
 */
util.isLeapYear = function (year) {
  if (typeof year === "undefined") {
    var _util$getCommonTime = util.getCommonTime(),
      now = _util$getCommonTime.now;
    year = now.year;
  } else if ((0, _typeof2.default)(year) === "object") {
    var _util$getCommonTime2 = util.getCommonTime(year),
      _now = _util$getCommonTime2.now;
    year = _now.year;
  }
  if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
    return true;
  } else {
    return false;
  }
};

/**
 * 判断是否是清明节
 * @param {Date} date 日期对象 可以指定时间计算节点，默认使用当前时间进行计算
vk.pubfn.timeUtil.isQingming(new Date());
 */
util.isQingming = function () {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
  var _util$getCommonTime3 = util.getCommonTime(data),
    now = _util$getCommonTime3.now;
  var year = now.year,
    month = now.month,
    day = now.day;
  var key = false;
  // 清明节的日期是不固定的，规律是：闰年开始的前2年是4月4日，闰年开始的第3年和第4年是4月5日
  if (util.isLeapYear(year) || util.isLeapYear(year - 1)) {
    if (month === 4 && day === 4) {
      key = true;
    }
  } else {
    if (month === 4 && day === 5) {
      key = true;
    }
  }
  return key;
};

/**
 * 日期对象转换（已弃用，建议不要使用此API）
 * @param {Date || Number} date 需要转换的时间
 * @param {Number} type 转换方式
 * type = 0 返回 2020-08-03 12:12:12
 * type = 1 返回 20200803121212
 * type = 2 返回 { YYYY, MM, DD, hh, mm, ss }
 */
util.getFullTime = function (date) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var targetTimezone = arguments.length > 2 ? arguments[2] : undefined;
  if (!date) return "";
  targetTimezone = util.getTargetTimezone(targetTimezone);
  var nowDate = util.getDateObject(date);
  var dif = nowDate.getTimezoneOffset();
  var timeDif = dif * 60 * 1000 + targetTimezone * 60 * 60 * 1000;
  var east8time = nowDate.getTime() + timeDif;
  nowDate = new Date(east8time);
  var YYYY = nowDate.getFullYear() + '';
  var MM = nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
  var DD = nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate();
  var hh = nowDate.getHours() < 10 ? '0' + nowDate.getHours() : nowDate.getHours();
  var mm = nowDate.getMinutes() < 10 ? '0' + nowDate.getMinutes() : nowDate.getMinutes();
  var ss = nowDate.getSeconds() < 10 ? '0' + nowDate.getSeconds() : nowDate.getSeconds();
  if (type === 2) {
    return {
      YYYY: Number(YYYY),
      MM: Number(MM),
      DD: Number(DD),
      hh: Number(hh),
      mm: Number(mm),
      ss: Number(ss),
      year: Number(YYYY),
      month: Number(MM),
      day: Number(DD),
      hour: Number(hh),
      minute: Number(mm),
      second: Number(ss)
    };
  } else if (type === 1) {
    return YYYY + "" + MM + "" + DD + "" + hh + "" + mm + "" + ss;
  } else {
    return YYYY + "-" + MM + "-" + DD + " " + hh + ":" + mm + ":" + ss;
  }
};
var _default = util;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 63 */
/*!**************************************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-client/uni_modules/vk-unicloud/vk_modules/vk-unicloud-page/libs/function/treeUtil.js ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./deepClone */ 64));
var util = {};
/**
 * 将树形结构转成数组结构
 * @param {Array} treeData  数据源
 * @param {Object} treeProps 树结构配置 { id : "menu_id", children : "children" }
 * vk.pubfn.treeToArray(treeData);
 */
util.treeToArray = function (treeData, treeProps) {
  var newTreeData = (0, _deepClone.default)(treeData);
  return util.treeToArrayFn(newTreeData, treeProps);
};
util.treeToArrayFn = function (treeData) {
  var treeProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var arr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var current_parent_id = arguments.length > 3 ? arguments[3] : undefined;
  var _treeProps$id = treeProps.id,
    id = _treeProps$id === void 0 ? "_id" : _treeProps$id,
    _treeProps$parent_id = treeProps.parent_id,
    parent_id = _treeProps$parent_id === void 0 ? "parent_id" : _treeProps$parent_id,
    _treeProps$children = treeProps.children,
    children = _treeProps$children === void 0 ? "children" : _treeProps$children,
    _treeProps$deleteChil = treeProps.deleteChildren,
    deleteChildren = _treeProps$deleteChil === void 0 ? true : _treeProps$deleteChil;
  for (var i in treeData) {
    var item = treeData[i];
    if (current_parent_id) item[parent_id] = current_parent_id;
    arr.push(item);
    if (item[children] && item[children].length > 0) {
      arr = util.treeToArrayFn(item[children], treeProps, arr, item[id]);
    }
    if (deleteChildren) {
      delete item[children];
    }
  }
  return arr;
};
/**
 * 数组结构转树形结构
let tree = vk.pubfn.arrayToTree(arrayData,{
	id:"code", 
	parent_id:"parent_code",
});
 */

util.arrayToTree = function (originalArrayData, treeProps) {
  var arrayData = (0, _deepClone.default)(originalArrayData);
  var _treeProps$id2 = treeProps.id,
    id = _treeProps$id2 === void 0 ? "_id" : _treeProps$id2,
    _treeProps$parent_id2 = treeProps.parent_id,
    parent_id = _treeProps$parent_id2 === void 0 ? "parent_id" : _treeProps$parent_id2,
    _treeProps$children2 = treeProps.children,
    children = _treeProps$children2 === void 0 ? "children" : _treeProps$children2,
    _treeProps$deletePare = treeProps.deleteParentId,
    deleteParentId = _treeProps$deletePare === void 0 ? false : _treeProps$deletePare,
    need_field = treeProps.need_field;
  var result = [];
  var temp = {};
  for (var i = 0; i < arrayData.length; i++) {
    temp[arrayData[i][id]] = arrayData[i]; // 以id作为索引存储元素，可以无需遍历直接定位元素
  }

  for (var j = 0; j < arrayData.length; j++) {
    var currentElement = arrayData[j];
    var newCurrentElement = {};
    if (need_field) {
      need_field = uniqueArr(need_field.concat([id, parent_id, children]));
      for (var keyName in currentElement) {
        if (need_field.indexOf(keyName) === -1) {
          delete currentElement[keyName];
        }
      }
    }
    var tempCurrentElementParent = temp[currentElement[parent_id]]; // 临时变量里面的当前元素的父元素
    if (tempCurrentElementParent) {
      // 如果存在父元素
      if (!tempCurrentElementParent[children]) {
        // 如果父元素没有chindren键
        tempCurrentElementParent[children] = []; // 设上父元素的children键
      }

      if (deleteParentId) {
        delete currentElement[parent_id];
      }
      tempCurrentElementParent[children].push(currentElement); // 给父元素加上当前元素作为子元素
    } else {
      // 不存在父元素，意味着当前元素是一级元素
      result.push(currentElement);
    }
  }
  return result;
};

// 最简单数组去重法
function uniqueArr(array) {
  var n = []; //一个新的临时数组
  //遍历当前数组
  for (var i = 0; i < array.length; i++) {
    //如果当前数组的第i已经保存进了临时数组，那么跳过，
    //否则把当前项push到临时数组里面
    if (n.indexOf(array[i]) == -1) n.push(array[i]);
  }
  return n;
}
var _default = util;
exports.default = _default;

/***/ }),
/* 64 */
/*!***************************************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-client/uni_modules/vk-unicloud/vk_modules/vk-unicloud-page/libs/function/deepClone.js ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

// 深度克隆
function deepClone(obj) {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if ((0, _typeof2.default)(obj) !== "object" && typeof obj !== 'function') {
    //原始类型直接返回
    return obj;
  }
  var o = isArray(obj) ? [] : {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = (0, _typeof2.default)(obj[i]) === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}
var _default = deepClone;
exports.default = _default;

/***/ }),
/* 65 */
/*!***********************************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-client/uni_modules/vk-unicloud/vk_modules/vk-unicloud-page/libs/function/modal.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
/**
 * 函数 - 弹窗
 */
var localeObj = {
  title: {
    "zh-Hans": "提示",
    "zh-Hant": "提示",
    "en": "Tips"
  },
  confirmText: {
    "zh-Hans": "确定",
    "zh-Hant": "確定",
    "en": "OK"
  },
  cancelText: {
    "zh-Hans": "取消",
    "zh-Hant": "取消",
    "en": "Cancel"
  },
  placeholderText: {
    "zh-Hans": "请输入",
    "zh-Hant": "請輸入",
    "en": "Please enter"
  }
};
var _default = {
  /**
  vk.alert("内容");
  vk.alert("内容","提示","好的",function(){
  
  });
   */
  alert: function alert() {
    var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : " ";
    var b = arguments.length > 1 ? arguments[1] : undefined;
    var c = arguments.length > 2 ? arguments[2] : undefined;
    var d = arguments.length > 3 ? arguments[3] : undefined;
    var vk = uni.vk;
    var locale = vk.getLocale();
    var obj = {
      title: localeObj.title[locale],
      confirmText: localeObj.confirmText[locale],
      placeholderText: localeObj.placeholderText[locale],
      content: a,
      showCancel: false
    };
    if (typeof d === 'function') {
      obj.title = b;
      obj.confirmText = c;
      obj.success = d;
    } else if (typeof c === 'function') {
      obj.title = b;
      obj.success = c;
    } else if (typeof b === 'function') {
      obj.success = b;
    } else if (b != undefined) {
      obj.title = b;
      if (c != undefined) {
        obj.confirmText = c;
      }
    }
    if (typeof obj.content === 'number') {
      obj.content = obj.content + "";
    } else if ((0, _typeof2.default)(obj.content) === 'object') {
      obj.content = JSON.stringify(obj.content);
    }
    return uni.showModal(obj);
  },
  /**
  vk.confirm("内容","提示","确定","取消",(res) => {
  	if(res.confirm){
  
  	}
  });
   */
  confirm: function confirm(a, b, c, d, e) {
    var vk = uni.vk;
    var locale = vk.getLocale();
    var obj = {
      showCancel: true,
      cancelColor: "#999",
      title: localeObj.title[locale],
      confirmText: localeObj.confirmText[locale],
      cancelText: localeObj.cancelText[locale],
      placeholderText: localeObj.placeholderText[locale]
    };
    if ((0, _typeof2.default)(a) === "object") {
      obj = a;
    } else {
      if (typeof a === "string") {
        obj.content = a;
      }
      if (typeof e === 'function') {
        obj.title = b;
        obj.confirmText = c;
        obj.cancelText = d;
        obj.success = e;
      } else if (typeof d === 'function') {
        obj.title = b;
        obj.confirmText = c;
        obj.success = d;
      } else if (typeof c === 'function') {
        obj.title = b;
        obj.success = c;
      } else if (typeof b === 'function') {
        obj.success = b;
      } else if (b != undefined) {
        obj.title = b;
        if (c != undefined) {
          obj.confirmText = c;
        }
      }
    }
    return uni.showModal(obj);
  },
  /**
  vk.prompt("请输入","提示","确定","取消",function(res){
  	if(res.confirm){
  		console.log(res.content);
  	}
  },"输入框内初始内容");
   */
  prompt: function prompt(a, b, c, d, e, f) {
    var vk = uni.vk;
    var locale = vk.getLocale();
    var obj = {
      showCancel: true,
      editable: true,
      cancelColor: "#999",
      title: localeObj.title[locale],
      confirmText: localeObj.confirmText[locale],
      cancelText: localeObj.cancelText[locale],
      placeholderText: localeObj.placeholderText[locale]
    };
    if ((0, _typeof2.default)(a) === "object") {
      obj = a;
    } else {
      if (typeof a === "string") {
        obj.placeholderText = a;
      }
      if (typeof e === 'function') {
        obj.title = b;
        obj.confirmText = c;
        obj.cancelText = d;
        obj.success = e;
        obj.content = f;
      } else if (typeof d === 'function') {
        obj.title = b;
        obj.confirmText = c;
        obj.success = d;
        obj.content = e;
      } else if (typeof c === 'function') {
        obj.title = b;
        obj.success = c;
        obj.content = d;
      } else if (typeof b === 'function') {
        obj.success = b;
        obj.content = c;
      }
    }
    return uni.showModal(obj);
  },
  /**
  vk.toast("提示内容","none");
   */
  toast: function toast(a, b, c, d, e) {
    var vk = uni.vk;
    if (typeof a === 'number') {
      a = a.toString();
    } else if ((0, _typeof2.default)(a) === 'object') {
      a = JSON.stringify(a);
    }
    var title = a;
    var icon = "none";
    var image = "";
    var mask = false;
    var duration = 1500;
    var fn;
    if (typeof e !== "undefined") {
      if (typeof e == "function") fn = e;
      if (typeof e == "number") duration = e;
      if (typeof e == "boolean") mask = e;
    }
    if (typeof d !== "undefined") {
      if (typeof d == "function") fn = d;
      if (typeof d == "number") duration = d;
      if (typeof d == "boolean") mask = d;
    }
    if (typeof c !== "undefined") {
      if (typeof c == "function") fn = c;
      if (typeof c == "number") duration = c;
      if (typeof c == "boolean") mask = c;
    }
    if (typeof b !== "undefined") {
      if (typeof b == "function") fn = b;
      if (typeof b == "number") duration = b;
      if (typeof b == "boolean") mask = b;
      if (typeof b == 'string') {
        if (b == "ok") b = "success";
        if (b == "success" || b == "loading" || b == "none" || b == "error") {
          icon = b;
        } else {
          image = b;
        }
      }
    }
    return uni.showToast({
      title: title,
      icon: icon,
      image: image,
      mask: mask,
      duration: duration,
      success: function success(res) {
        if (typeof fn === 'function') {
          setTimeout(function () {
            fn(res);
          }, duration);
        }
      }
    });
  },
  /**
   * 操作菜单
   vk.showActionSheet({
   	title:"",
   	list:["位置","@好友"],
   	color:"rgb(0, 0, 0)",
   	success:function(res){
   		if(res.index==0){
  
   		}else if(res.index==1){
  
   		}
   	}
   });
   */
  showActionSheet: function showActionSheet(object) {
    var vk = uni.vk;
    var title = object.title;
    var list = object.list;
    var color = object.color || "#000000";
    var _success = object.success;
    var _fail = object.fail;
    var _complete = object.complete;
    return uni.showActionSheet({
      itemList: list,
      itemColor: color,
      success: function success(res) {
        var index = res.tapIndex;
        var text = list[index];
        var g = {
          index: index,
          text: text
        };
        console.log(g);
        if (typeof _success == "function") _success(g);
      },
      fail: function fail(res) {
        console.log(res);
        if (typeof _fail == "function") _fail(res);
      },
      complete: function complete(res) {
        if (typeof _complete == "function") _complete(res);
      }
    });
  },
  showLoading: function showLoading(obj) {
    if (typeof obj == "string") {
      var title = obj;
      obj = {
        title: title,
        mask: true
      };
    }
    uni.showLoading(obj);
  },
  hideLoading: function hideLoading() {
    uni.hideLoading();
  },
  // 设置当前页面的loading变量的值
  setLoading: function setLoading() {
    var loading = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    try {
      var vk = uni.vk;
      if (typeof obj === "boolean") {
        var pages = getCurrentPages();
        var page = pages[pages.length - 1];
        var that = page.$vm;
        that.loading = loading;
      } else if ((0, _typeof2.default)(obj) === "object") {
        var data = obj.data,
          name = obj.name,
          _that = obj.that;
        if (!data) data = _that;
        vk.pubfn.setData(data, name, loading);
      } else if (typeof obj === "string") {
        var _pages = getCurrentPages();
        var _page = _pages[_pages.length - 1];
        var _that2 = _page.$vm;
        var _name = obj;
        vk.pubfn.setData(_that2, _name, loading);
      }
    } catch (err) {}
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 66 */
/*!*****************************************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-client/uni_modules/vk-unicloud/vk_modules/vk-unicloud-page/libs/function/vk.navigate.js ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * 函数 - 页面导航
 */

var config;
try {
  config = __webpack_require__(/*! @/app.config.js */ 42);
  if ((0, _typeof2.default)(config.default) === "object") {
    config = config.default;
  }
} catch (e) {
  config = {};
}
var util = {};
var lastNavigate = {
  url: "",
  time: 0
};
/**
 * 保留当前页面，跳转到应用内的某个页面，使用vk.navigateBack可以返回到原页面。
 * vk.navigateTo(url);
 */
util.navigateTo = function (obj) {
  var vk = uni.vk;
  if (typeof obj == "string") {
    var url = obj;
    obj = {
      url: url
    };
  } else if (typeof obj == "undefined") {
    obj = {};
  }
  if (!obj.url) {
    vk.toast("url不能为空!");
    return false;
  }
  var time = Date.now();
  if (lastNavigate.url === obj.url && time - lastNavigate.time < 200) {
    return false;
  }
  lastNavigate = {
    url: obj.url,
    time: time
  };
  util.checkNeedLogin({
    url: obj.url,
    success: function success(res) {
      if (res.needLogin) {
        obj.url = vk.pubfn.getPageFullPath(obj.url);
        vk.navigate.setOriginalPage(obj);
        obj.url = config.login.url;
        // login拦截器开始-----------------------------------------------------------
        var _config = config,
          _config$interceptor = _config.interceptor,
          interceptor = _config$interceptor === void 0 ? {} : _config$interceptor;
        if (typeof interceptor.login === "function") {
          var key = interceptor.login({
            vk: vk,
            params: obj,
            res: _objectSpread(_objectSpread({}, res), {}, {
              code: 30204,
              msg: "本地token校验未通过"
            })
          });
          if (typeof key === "undefined" || key !== true) return false;
        }
        // login拦截器结束-----------------------------------------------------------
      } else {
        vk.navigate.setOriginalPage(null);
      }
      util._navigateTo(obj);
    }
  });
};
util._navigateTo = function (obj) {
  var _config2 = config,
    _config2$interceptor = _config2.interceptor,
    interceptor = _config2$interceptor === void 0 ? {} : _config2$interceptor;
  if (typeof interceptor.navigateTo === "function") {
    var vk = uni.vk;
    obj.pagePath = vk.pubfn.getPageFullPath(obj.url);
    var key = interceptor.navigateTo(_objectSpread(_objectSpread({}, obj), {}, {
      vk: vk
    }));
    if (typeof key == "boolean" && key === false) return false;
  }
  var url = obj.url,
    _obj$animationType = obj.animationType,
    animationType = _obj$animationType === void 0 ? "pop-in" : _obj$animationType,
    _obj$animationDuratio = obj.animationDuration,
    animationDuration = _obj$animationDuratio === void 0 ? 300 : _obj$animationDuratio,
    events = obj.events,
    _obj$mode = obj.mode,
    mode = _obj$mode === void 0 ? "navigateTo" : _obj$mode;
  // 此处写法仅为支持vue3，vue3不支持uni[apiName]的形式调用
  var navigateFn;
  if (mode === "navigateTo") {
    navigateFn = uni.navigateTo;
  } else if (mode === "redirectTo") {
    navigateFn = uni.redirectTo;
  } else if (mode === "reLaunch") {
    navigateFn = uni.reLaunch;
  } else if (mode === "switchTab") {
    navigateFn = uni.switchTab;
  } else {
    navigateFn = uni.navigateTo;
  }
  // 此处写法仅为支持vue3，vue3不支持uni[apiName]的形式调用
  navigateFn({
    url: url,
    animationType: animationType,
    animationDuration: animationDuration,
    events: events,
    // 参考 https://uniapp.dcloud.io/api/router?id=navigateto
    success: function success(res) {
      if (typeof obj.success == "function") obj.success(res);
    },
    fail: function fail(err) {
      if (err.errMsg.indexOf("not found") > -1) {
        var vk = uni.vk;
        var errUrl = vk.pubfn.getPageFullPath(url);
        vk.toast("\u9875\u9762 ".concat(errUrl, " \u4E0D\u5B58\u5728"), "none");
        console.error(err);
        return false;
      }
      uni.switchTab({
        url: url,
        success: obj.success,
        fail: function fail() {
          uni.redirectTo({
            url: url,
            success: obj.success,
            fail: function fail(err) {
              console.error(err);
              if (typeof obj.fail == "function") obj.fail(err);
            }
          });
        }
      });
    },
    complete: function complete(res) {
      if (typeof obj.complete == "function") obj.complete(res);
    }
  });
};

/**
 * 关闭当前页面，跳转到应用内的某个页面。
 * vk.redirectTo(url);
 */
util.redirectTo = function (obj) {
  obj = util.paramsInit(obj);
  obj.mode = "redirectTo";
  util.navigateTo(obj);
};

/**
 * 关闭所有页面，打开到应用内的某个页面。
 * vk.reLaunch(url);
 */
util.reLaunch = function (obj) {
  obj = util.paramsInit(obj);
  obj.mode = "reLaunch";
  util.navigateTo(obj);
};

/**
 * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
 * vk.switchTab(url);
 */
util.switchTab = function (obj) {
  obj = util.paramsInit(obj);
  obj.mode = "switchTab";
  util.navigateTo(obj);
};
/**
 * 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages() 获取当前的页面栈，决定需要返回几层。
 * vk.navigateBack();
 */
util.navigateBack = function (obj) {
  var vk = uni.vk;
  if (typeof obj == "number") {
    var _delta = obj;
    obj = {
      delta: _delta
    };
  } else if (typeof obj == "undefined") {
    obj = {};
  }
  var _obj = obj,
    _obj$delta = _obj.delta,
    delta = _obj$delta === void 0 ? 1 : _obj$delta,
    _obj$animationType2 = _obj.animationType,
    animationType = _obj$animationType2 === void 0 ? "pop-out" : _obj$animationType2,
    _obj$animationDuratio2 = _obj.animationDuration,
    animationDuration = _obj$animationDuratio2 === void 0 ? 300 : _obj$animationDuratio2;
  uni.navigateBack({
    delta: delta,
    animationType: animationType,
    animationDuration: animationDuration,
    success: function success() {
      if (typeof obj.success == "function") obj.success();
    },
    fail: function fail(res) {
      console.error(res);
      if (typeof obj.fail == "function") obj.fail();
    },
    complete: function complete() {
      if (typeof obj.complete == "function") obj.complete();
    }
  });
};
/**
 * 跳转到登录前的页面
 * vk.navigate.originalTo();
 */
util.originalTo = function () {
  var vk = uni.vk;
  var originalPage = vk.navigate.getOriginalPage();
  vk.navigate.setOriginalPage(null);
  util.redirectTo(originalPage);
};

/**
 * 获取登录前的页面
 * vk.navigate.getOriginalPage();
 */
util.getOriginalPage = function () {
  if (typeof uni.vk.getVuex === "function") {
    // 有安装vuex则使用vuex
    return uni.vk.getVuex('$app.originalPage');
  } else {
    // 未安装则使用本地缓存
    return uni.vk.getStorageSync('vk.navigate.originalPage');
  }
};

/**
 * 设置登录前的页面
 * vk.navigate.setOriginalPage(originalPage);
 */
util.setOriginalPage = function (originalPage) {
  uni.vk.navigate.originalPage = originalPage; // 兼容老版本
  if (typeof uni.vk.getVuex === "function") {
    // 有安装vuex则使用vuex
    return uni.vk.setVuex('$app.originalPage', originalPage);
  } else {
    // 未安装则使用本地缓存
    return uni.vk.setStorageSync('vk.navigate.originalPage', originalPage);
  }
};

/**
 * 跳转到首页
 * vk.navigateToHome();
 */
util.navigateToHome = function () {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var vk = uni.vk;
  var _obj$mode2 = obj.mode,
    mode = _obj$mode2 === void 0 ? "reLaunch" : _obj$mode2;
  vk[mode](config.index.url);
};

/**
 * 跳转到登录页
 * vk.navigateToLogin();
 */
util.navigateToLogin = function () {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var vk = uni.vk;
  var _obj$mode3 = obj.mode,
    mode = _obj$mode3 === void 0 ? "reLaunch" : _obj$mode3;
  vk[mode](config.login.url);
};

/**
 * 检测是否满足条件(内部方法)
 util.checkWildcardTest({
	 url:url,
	 pagesRule:config.checkTokenPages,
	 success:function(res){
		 if(res.success){

		 }
	 }
 })
 */
util.checkWildcardTest = function (obj) {
  var vk = uni.vk;
  var url = obj.url,
    pagesRule = obj.pagesRule;
  // ../ 转成绝对路径
  url = vk.pubfn.getPageFullPath(url);
  var key = false;
  if (vk.pubfn.isNotNull(pagesRule)) {
    var _pagesRule$mode = pagesRule.mode,
      mode = _pagesRule$mode === void 0 ? 0 : _pagesRule$mode,
      _pagesRule$list = pagesRule.list,
      list = _pagesRule$list === void 0 ? [] : _pagesRule$list;
    if (mode > 0) {
      var regExpKey = false;
      var path = util.getPagePath(url);
      for (var i = 0; i < list.length; i++) {
        var pageRegExp = list[i];
        regExpKey = vk.pubfn.wildcardTest(path, pageRegExp);
        if (regExpKey) {
          break;
        }
      }
      if (mode === 1 && regExpKey) {
        key = true;
      } else if (mode === 2 && !regExpKey) {
        key = true;
      }
    }
  }
  return {
    url: url,
    key: key
  };
};

/**
 * 检测是否需要登录(内部方法)
 util.checkNeedLogin({
	 url:url,
	 success:function(res){
		 if(res.needLogin){

		 }
	 }
 })
 */
util.checkNeedLogin = function (obj) {
  var vk = uni.vk;
  var url = obj.url,
    success = obj.success;
  var needLogin = false; // 用户是否需要重新登录
  var pageNeedLogin = false; // 该页面是否需要登录才能访问
  var pagesRule = config.checkTokenPages;
  if (pagesRule) {
    var res = util.checkWildcardTest({
      url: url,
      pagesRule: pagesRule
    });
    pageNeedLogin = res.key;
    if (pageNeedLogin) {
      // 本地判断token有效期(联网会浪费性能)
      if (!vk.checkToken()) {
        needLogin = true;
      }
    }
  }
  success({
    url: url,
    needLogin: needLogin,
    pageNeedLogin: pageNeedLogin
  });
};

// 获取?前面的地址
util.getPagePath = function (url) {
  var pathIndex = url.indexOf("?");
  var path = url;
  if (pathIndex > -1) {
    path = path.substring(0, pathIndex);
  }
  return path;
};
util.paramsInit = function (obj) {
  var vk = uni.vk;
  if (typeof obj == "string") {
    var url = obj;
    obj = {
      url: url
    };
  } else if (typeof obj == "undefined") {
    obj = {};
  }
  if (!obj.url) {
    vk.toast("url不能为空!");
    return false;
  }
  return obj;
};

/**
 * 跳转到小程序
	vk.navigateToMiniProgram({
		appId: 'appId',
		path: 'pages/index/index',
		extraData:{
			//发送数据携带的参数
		},
		success(res) {
			// 打开成功

		}
	})
 */
util.navigateToMiniProgram = function (obj) {
  var vk = uni.vk;
  uni.navigateToMiniProgram(obj);
};

/**
 * 检测是否可以分享(内部方法)
 util.checkAllowShare({
	 url:url,
 });
 */
util.checkAllowShare = function (obj) {
  var vk = uni.vk;
  var url = obj.url,
    success = obj.success;
  var pagesRule = config.checkSharePages || {};
  if (pagesRule && pagesRule.mode > 0) {
    var res = util.checkWildcardTest({
      url: url,
      pagesRule: pagesRule
    });
    var menus = pagesRule.menus || ['shareAppMessage', 'shareTimeline'];
    if (res.key) {
      //console.log("允许分享");
      uni.showShareMenu({
        withShareTicket: false,
        menus: menus
      });
    } else {
      //console.log("禁止分享");
      uni.hideShareMenu({
        menus: menus
      });
    }
  }
};
util.$emit = function () {
  var _uni;
  return (_uni = uni).$emit.apply(_uni, arguments);
};
util.$on = function () {
  var _uni2;
  return (_uni2 = uni).$on.apply(_uni2, arguments);
};
util.$once = function () {
  var _uni3;
  return (_uni3 = uni).$once.apply(_uni3, arguments);
};
util.$off = function () {
  var _uni4;
  return (_uni4 = uni).$off.apply(_uni4, arguments);
};
var _default = util;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 67 */
/*!*********************************************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-client/uni_modules/vk-unicloud/vk_modules/vk-unicloud-page/libs/function/vk.localStorage.js ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * vk依赖扩展 - localStorage 本地缓存
 * pub - 公共的可随时删除的缓存
 * kh - 跟登录账号有关联的缓存
 * sys - 系统级缓存 - 一般不删除
 * 
 * 储存缓存
 * vk.setStorageSync(key, data);
 * 获取缓存
 * vk.getStorageSync(key);
 */
var localStorage = {};
/**
 * 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
 * @param {String} key 本地缓存中的指定的 key
 * @param {Any} data 需要存储的内容，只支持原生类型、及能够通过 JSON.stringify 序列化的对象
 */
localStorage.setStorageSync = function (key, data) {
  uni.setStorageSync(key, data);
  watchLocalStorage({
    type: "set",
    key: key,
    data: data
  });
};

/**
 * 从本地缓存中异步获取指定 key 对应的内容。
 * @param {String} key 本地缓存中的指定的 key
 */
localStorage.getStorageSync = function (key) {
  var data = uni.getStorageSync(key);
  // get 没有必要监听
  // watchLocalStorage({ type:"get", key, data });
  return data;
};

/**
 * 同步获取当前 storage 的相关信息。
 */
localStorage.getStorageInfoSync = function () {
  var info = uni.getStorageInfoSync();
  var sizeInfo = calcSize(Number(info.currentSize), 1024, 3, ["KB", "MB", "GB"]);
  info.sizeInfo = sizeInfo;
  return info;
};

/**
 * 从本地缓存中同步移除指定 key。
 * @param {String} key 本地缓存中的指定的 key
 */
localStorage.removeStorageSync = function (key) {
  uni.removeStorageSync(key);
  watchLocalStorage({
    type: "remove",
    key: key
  });
};
/**
 * 从本地缓存中异步移除指定 key。
 */
localStorage.removeStorage = function (obj) {
  uni.removeStorage({
    key: obj.key,
    success: function success(res) {
      watchLocalStorage({
        type: "remove",
        key: obj.key
      });
      if (obj.success) obj.success(res);
    },
    fail: obj.fail,
    complete: obj.complete
  });
};

/**
 * 同步清理本地数据缓存。若key有值,则清除键值为指定字符串开头的缓存
 * @param {String} key 本地缓存中的指定的 key
 * vk.clearStorageSync();
 */
localStorage.clearStorageSync = function (key) {
  if (key) {
    var _uni$getStorageInfoSy = uni.getStorageInfoSync(),
      keys = _uni$getStorageInfoSy.keys;
    if (keys) {
      keys.map(function (keyName) {
        if (keyName.indexOf(key) == 0) {
          localStorage.removeStorage({
            key: keyName
          });
        }
      });
    }
  } else {
    uni.clearStorage();
    watchLocalStorage({
      type: "clear"
    });
  }
};
var _default = localStorage;
/**
 * 单位进制换算
 * length	换算前大小
 * ary		进制,如KB-MB-GB,进制1024
 * precision	数值精度
 * arr		进制的数组,如["B","KB","MB","GB"]
 * calcSize(length,1024,3,["B","KB","MB","GB"]);
 */
exports.default = _default;
function calcSize() {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var ary = arguments.length > 1 ? arguments[1] : undefined;
  var precision = arguments.length > 2 ? arguments[2] : undefined;
  var arr = arguments.length > 3 ? arguments[3] : undefined;
  var size = parseFloat(length);
  var mySize = 0;
  var type = "";
  if (size < ary || arr.length <= 1) {
    type = arr[0];
    mySize = parseFloat(size.toFixed(precision));
  } else {
    for (var i = 1; i < arr.length; i++) {
      var g = arr[i];
      size = size / ary;
      if (size < ary) {
        type = g;
        mySize = parseFloat(size.toFixed(precision));
        break;
      }
    }
  }
  return {
    size: mySize,
    type: type,
    title: mySize + " " + type
  };
}
;
function watchLocalStorage(obj) {
  if (typeof localStorage.watch === "function") {
    localStorage.watch(obj);
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 68 */
/*!***********************************************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-client/uni_modules/vk-unicloud/vk_modules/vk-unicloud-page/libs/function/vk.sessionStorage.js ***!
  \***********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * vk依赖扩展 - sessionStorage 本地会话缓存（仅H5可用）
 * sessionStorage 属性允许你访问一个，对应当前源的 session Storage 对象。
 * 它与 localStorage 相似，不同之处在于 localStorage 里面存储的数据没有过期时间设置
 * 而存储在 sessionStorage 里面的数据在页面会话结束时会被清除。
 * pub - 公共的可随时删除的缓存
 * kh - 跟登录账号有关联的缓存
 * sys - 系统级缓存 - 一般不删除
 *
 * 储存缓存
 * vk.setSessionStorageSync(key, data);
 * 获取缓存
 * vk.getSessionStorageSync(key);
 */
var storage = {};
/**
 * 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
 * @param {String} key 本地缓存中的指定的 key
 * @param {Any} data 需要存储的内容，只支持原生类型、及能够通过 JSON.stringify 序列化的对象
 * vk.setSessionStorageSync(key, data);
 */
storage.setSessionStorageSync = function (key) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  console.warn("非H5环境不支持此API");
};

/**
 * 从本地缓存中异步获取指定 key 对应的内容。
 * @param {String} key 本地缓存中的指定的 key
 * vk.getSessionStorageSync(key);
 */
storage.getSessionStorageSync = function (key) {
  console.warn("非H5环境不支持此API");
};

/**
 * 从本地缓存中同步移除指定 key。
 * @param {String} key 本地缓存中的指定的 key
 * vk.removeSessionStorageSync(key);
 */
storage.removeSessionStorageSync = function (key) {
  console.warn("非H5环境不支持此API");
};

/**
 * 同步清理本地数据缓存。若key有值,则清除键值为指定字符串开头的缓存
 * @param {String} key 本地缓存中的指定的 key
 * vk.clearSessionStorageSync();
 */
storage.clearSessionStorageSync = function (key) {
  console.warn("非H5环境不支持此API");
};
var _default = storage;
/**
 * 单位进制换算
 * length	换算前大小
 * ary		进制,如KB-MB-GB,进制1024
 * precision	数值精度
 * arr		进制的数组,如["B","KB","MB","GB"]
 * calcSize(length,1024,3,["B","KB","MB","GB"]);
 */
exports.default = _default;
function calcSize() {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var ary = arguments.length > 1 ? arguments[1] : undefined;
  var precision = arguments.length > 2 ? arguments[2] : undefined;
  var arr = arguments.length > 3 ? arguments[3] : undefined;
  var size = parseFloat(length);
  var mySize = 0;
  var type = "";
  if (size < ary || arr.length <= 1) {
    type = arr[0];
    mySize = parseFloat(size.toFixed(precision));
  } else {
    for (var i = 1; i < arr.length; i++) {
      var g = arr[i];
      size = size / ary;
      if (size < ary) {
        type = g;
        mySize = parseFloat(size.toFixed(precision));
        break;
      }
    }
  }
  return {
    size: mySize,
    type: type,
    title: mySize + " " + type
  };
}
;
function watchSessionStorage(obj) {
  if (typeof storage.watch === "function") {
    storage.watch(obj);
  }
}

/***/ }),
/* 69 */
/*!*******************************************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-client/uni_modules/vk-unicloud/vk_modules/vk-unicloud-page/libs/function/aliyunOSSUtil.js ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * 阿里云oss工具类
 */
var aliyunOSSUtil = {};
var counterNum = 0;

/**
 * 上传至阿里云oss
vk.callFunctionUtil.uploadFile({
	filePath:tempFilePath,
	fileType:"image",
	provider:"aliyun",
	index,
	onUploadProgress:function(res){
		// 上传过程中
		if (res.progress > 0) {
			if(list[index]){
				list[index].progress = res.progress;

			}
		}
	},
	success:function(res){
		// 上传成功

	},
	fail:function(res){
		// 上传失败

	}
});
 */
aliyunOSSUtil.uploadFile = function (obj) {
  var filePath = obj.filePath,
    _obj$fileType = obj.fileType,
    fileType = _obj$fileType === void 0 ? "image" : _obj$fileType,
    _obj$name = obj.name,
    name = _obj$name === void 0 ? "file" : _obj$name,
    _obj$header = obj.header,
    header = _obj$header === void 0 ? {
      "x-oss-forbid-overwrite": true
    } : _obj$header,
    _obj$index = obj.index,
    index = _obj$index === void 0 ? 0 : _obj$index,
    _obj$file = obj.file,
    file = _obj$file === void 0 ? {} : _obj$file,
    _obj$needSave = obj.needSave,
    needSave = _obj$needSave === void 0 ? false : _obj$needSave,
    category_id = obj.category_id,
    title = obj.title,
    _obj$cloudPathRemoveC = obj.cloudPathRemoveChinese,
    cloudPathRemoveChinese = _obj$cloudPathRemoveC === void 0 ? true : _obj$cloudPathRemoveC,
    cloudDirectory = obj.cloudDirectory;
  var vk = getApp().globalData.vk;
  if (title) vk.showLoading(title);
  var fileNameObj = createFileName(obj);
  var aliyunOSS = getConfig();
  var fileName = fileNameObj.fileFullName;
  var formData = vk.pubfn.copyObject(aliyunOSS.uploadData);
  formData["key"] = fileName; // 存储在oss的文件路径
  /**
   * 特别说明
   * 若已知本地图片,则使用formData["name"] = filePath
   * 若已知base64,则是用formData["file"] = file;// file base64字符串转成blob对象
   */
  if (filePath.indexOf(";base64,") > -1) {
    formData["file"] = dataURLtoBlob(filePath);
  } else {
    formData["name"] = filePath;
  }
  var Logger = {};
  Logger.startTime = new Date().getTime();
  Logger.filePath = filePath;
  return new Promise(function (resolve, reject) {
    var uploadTask = uni.uploadFile({
      url: aliyunOSS.action,
      filePath: filePath,
      name: name,
      header: header,
      formData: formData,
      success: function success(res) {
        if (title) vk.hideLoading();
        if (![200, 201].includes(res.statusCode)) {
          if (typeof obj.fail === "function") obj.fail(res);
          Logger.error = res;
        } else {
          // 上传成功
          res.fileID = fileNameObj.url;
          res.url = fileNameObj.url;
          Logger.result = res;
          if (typeof obj.success === "function") obj.success(res);
          resolve(res);
          if (needSave) {
            // 保存文件记录到数据库
            vk.userCenter.addUploadRecord({
              data: {
                url: res.fileID,
                name: file.name,
                size: file.size,
                file_id: res.fileID,
                provider: "aliyun",
                category_id: category_id
              },
              filePath: filePath,
              fileType: fileType,
              success: function success() {
                if (typeof obj.addSuccess == "function") obj.addSuccess(res);
              },
              fail: function fail(res) {
                if (typeof obj.addFail === "function") obj.addFail(res);
              }
            });
          }
        }
      },
      fail: function fail(res) {
        if (title) vk.hideLoading();
        Logger.error = res;
        if (res.errMsg && res.errMsg.indexOf('fail url not in domain list') > -1) {
          vk.toast('上传域名未在白名单中');
        }
        if (typeof obj.fail === "function") obj.fail(res);
      },
      complete: function complete() {
        var vk = getApp().globalData.vk;
        var config = vk.callFunctionUtil.config;
        if (config.debug) {
          Logger.endTime = new Date().getTime();
          Logger.runTime = Logger.endTime - Logger.startTime;
          var colorArr = config.logger.colorArr;
          var colorStr = colorArr[counterNum % colorArr.length];
          counterNum++;
          console.log("%c--------【开始】【阿里云oss文件上传】--------", 'color: ' + colorStr + ';font-size: 12px;font-weight: bold;');
          console.log("【本地文件】: ", Logger.filePath);
          console.log("【返回数据】: ", Logger.result);
          console.log("【预览地址】: ", Logger.result.fileID);
          console.log("【上传耗时】: ", Logger.runTime, "毫秒");
          console.log("【上传时间】: ", vk.pubfn.timeFormat(Logger.startTime, "yyyy-MM-dd hh:mm:ss"));
          if (Logger.error) console.error("【error】:", Logger.error);
          console.log("%c--------【结束】【阿里云oss文件上传】--------", 'color: ' + colorStr + ';font-size: 12px;font-weight: bold;');
        }
      }
    });
    uploadTask.onProgressUpdate(function (res) {
      if (res.progress > 0) {
        if (typeof obj.onUploadProgress === "function") obj.onUploadProgress(res);
      }
    });
  });
};
var _default = aliyunOSSUtil; // 获取配置
exports.default = _default;
function getConfig() {
  var vk = getApp().globalData.vk;
  var aliyunOSS = vk.getConfig("service.aliyunOSS");
  var configData = {};
  if (aliyunOSS && aliyunOSS.uploadData && aliyunOSS.uploadData.OSSAccessKeyId) {
    try {
      // 只有开启按userId分组且开启了vk的vuex功能，才可以自动按userId分组
      if (aliyunOSS.groupUserId && typeof vk.getVuex === "function") {
        var userInfo = vk.getVuex("$user.userInfo");
        if (vk.pubfn.isNotNull(userInfo) && userInfo._id) {
          aliyunOSS.dirname += "/".concat(userInfo._id);
        }
      }
    } catch (err) {}
    configData = {
      uploadData: {
        OSSAccessKeyId: aliyunOSS.uploadData.OSSAccessKeyId,
        policy: aliyunOSS.uploadData.policy,
        signature: aliyunOSS.uploadData.signature,
        success_action_status: 200,
        key: "test.png"
      },
      action: aliyunOSS.action,
      dirname: aliyunOSS.dirname,
      host: aliyunOSS.host
    };
  }
  return configData;
}
// 生成文件名
function createFileName() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var file = obj.file,
    filePath = obj.filePath,
    _obj$index2 = obj.index,
    index = _obj$index2 === void 0 ? 0 : _obj$index2,
    _obj$cloudPathRemoveC2 = obj.cloudPathRemoveChinese,
    cloudPathRemoveChinese = _obj$cloudPathRemoveC2 === void 0 ? true : _obj$cloudPathRemoveC2,
    cloudDirectory = obj.cloudDirectory;
  var vk = getApp().globalData.vk;
  var aliyunOSS = getConfig();
  var dirname = aliyunOSS.dirname;
  var host = aliyunOSS.host;
  var fileObj = {};
  var suffix = getFileSuffix(obj);
  var oldName = index + "." + suffix;
  if (file && file.name) {
    var suffixName = file.name.substring(file.name.lastIndexOf(".") + 1);
    if (suffixName && suffixName.length < 5) oldName = file.name;
    // 只保留["数字","英文",".","-"]
    if (cloudPathRemoveChinese) {
      oldName = oldName.replace(/[^a-zA-Z.-d]/g, '');
    }
    if (oldName.indexOf(".") == 0) oldName = "0" + oldName;
  }
  var date = new Date();
  var dateYYYYMMDD = vk.pubfn.timeFormat(date, "yyyy/MM/dd");
  var dateTime = date.getTime().toString(); // 时间戳
  // 时间戳后8位
  var dateTimeEnd8 = dateTime.substring(dateTime.length - 8, dateTime.length);
  var randomNumber = vk.pubfn.random(8); // 8位随机数
  // 文件路径 = 固定路径名 + 业务路径

  // 业务路径
  var servicePath = "";
  if (cloudDirectory) {
    // 如果自定义了上传目录，则使用自定义的上传目录
    if (cloudDirectory.lastIndexOf("/") !== cloudDirectory.length - 1) {
      cloudDirectory = cloudDirectory + "/";
    }
    servicePath = cloudDirectory;
  } else {
    // 否则，使用年月日作为上传目录
    servicePath = dateYYYYMMDD + "/";
  }
  // 文件名 = 时间戳后8位 - 随机数8位 + 后缀名
  var fileNickName = dateTimeEnd8 + randomNumber + "-" + oldName;
  // 文件相对路径 = 业务目录 + 文件名
  var fileRelativePath = servicePath + fileNickName;
  // 文件名全称（包含文件路径） = 根目录 + 文件相对路径
  var fileFullName = dirname + "/" + fileRelativePath;
  // 外网地址 = 外网域名 + 文件名全称
  var url = host + "/" + fileFullName;
  fileObj.url = url;
  fileObj.fileFullName = fileFullName;
  fileObj.fileNickName = fileNickName;
  return fileObj;
}
function getFileSuffix() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var file = obj.file,
    filePath = obj.filePath,
    _obj$suffix = obj.suffix,
    suffix = _obj$suffix === void 0 ? "png" : _obj$suffix;
  if (filePath) {
    var suffixName = filePath.substring(filePath.lastIndexOf(".") + 1);
    if (suffixName && suffixName.length < 5) suffix = suffixName;
  }
  if (file) {
    if (file.path) {
      var _suffixName = file.path.substring(file.path.lastIndexOf(".") + 1);
      if (_suffixName && _suffixName.length < 5) suffix = _suffixName;
    }
    if (file.name) {
      var _suffixName2 = file.name.substring(file.name.lastIndexOf(".") + 1);
      if (_suffixName2 && _suffixName2.length < 5) suffix = _suffixName2;
    }
  }
  return suffix;
}
function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {
    type: mime
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 70 */
/*!**********************************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-client/uni_modules/vk-unicloud/vk_modules/vk-unicloud-page/libs/openapi/index.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _baidu = _interopRequireDefault(__webpack_require__(/*! ./baidu */ 71));
/**
 * 开放API
 */

var openapi = {};
openapi.baidu = _baidu.default;
openapi.init = function (util) {
  openapi.baidu.init(util);
};
// 微信小程序API
var _default = openapi;
exports.default = _default;

/***/ }),
/* 71 */
/*!****************************************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-client/uni_modules/vk-unicloud/vk_modules/vk-unicloud-page/libs/openapi/baidu/index.js ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * 百度API
 */
var baidu = {};
var vk = {};
var baiduOpenApiAccessTokenCacheName = "vk_openapi_baidu_open_token";
baidu.init = function () {
  var util = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  vk = util.vk;
};

// 百度开放平台api
baidu.open = {};
// 文字识别
baidu.open.ocr = {};

/**
 * 营业执照识别
 * 以下data参数三选一即可
 * @param {File} file     文件对象
 * @param {String} image  图像base64编码后进行urlencode
 * @param {String} url    图片完整URL
 *
vk.openapi.baidu.open.ocr.business_license({
	title:"识别中...",
	data: {
		file: res.tempFiles[0]
	},
	success: (res) => {
		that.data = res.data;
	},
});
 */
baidu.open.ocr.business_license = function () {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  obj.action = "ocr/v1/business_license";
  var file = obj.data.file;
  if (file) {
    vk.pubfn.fileToBase64({
      file: file
    }).then(function (base64) {
      obj.data.image = base64;
      delete obj.data.file;
      baidu.request(obj);
    });
  } else {
    baidu.request(obj);
  }
};

/**
 * 身份证识别
 * 以下data参数三选一即可
 * @param {File} file     文件对象
 * @param {String} image  图像base64编码后进行urlencode
 * @param {String} url    图片完整URL
vk.openapi.baidu.open.ocr.idcard({
	title:"识别中...",
	data: {
		image:base64,
		id_card_side:"front", // front：身份证含照片的一面 back：身份证带国徽的一面
	},
	success: (res) => {
		that.data = res.data;
	},
});
 */
baidu.open.ocr.idcard = function () {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  obj.action = "ocr/v1/idcard";
  var file = obj.data.file;
  if (!obj.data.id_card_side) obj.data.id_card_side = "front";
  if (file) {
    vk.pubfn.fileToBase64({
      file: file
    }).then(function (base64) {
      obj.data.image = base64;
      delete obj.data.file;
      baidu.request(obj);
    });
  } else {
    baidu.request(obj);
  }
};

/**
 * 百度开放平台通用请求接口
 * @param {String} action        接口名称
 * @param {String} actionVersion 接口版本名称 默认2.0
 * @param {String} title         loading文字
 * @param {object} data          请求参数
 * @param {String} success       成功回调
 * @param {String} fail          失败回调
 * @param {String} complete      完成回调
 * 使用示例
vk.openapi.baidu.request({
 	action: 'ocr/v1/business_license',
 	title:"识别中...",
 	data: {
 		image:base64
 	},
 	success: (data) => {
 		that.data = data;
 	},
});
 */
baidu.request = function () {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var title = obj.title;
  if (title) vk.showLoading(title);
  var baiduApiAccessToken = vk.getStorageSync(baiduOpenApiAccessTokenCacheName);
  if (baiduApiAccessToken && baiduApiAccessToken.expTime > new Date().getTime()) {
    // 获取缓存中的token
    obj.accessToken = baiduApiAccessToken.accessToken;
    request(obj);
  } else {
    // 发起请求获取token
    vk.callFunction({
      url: 'plugs/baidu/client/pub/getAccessToken',
      success: function success(tokenRes) {
        vk.setStorageSync(baiduOpenApiAccessTokenCacheName, {
          accessToken: tokenRes.access_token,
          expTime: 2590000000 + new Date().getTime()
        });
        obj.accessToken = tokenRes.access_token;
        request(obj);
      },
      fail: function fail(res) {
        if (title) vk.hideLoading();
        if (typeof obj.fail === "function") obj.fail(res);
        if (typeof obj.complete === "function") obj.complete(res);
      }
    });
  }
};
function request() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = obj.action,
    _obj$actionVersion = obj.actionVersion,
    actionVersion = _obj$actionVersion === void 0 ? "2.0" : _obj$actionVersion,
    accessToken = obj.accessToken,
    _obj$header = obj.header,
    header = _obj$header === void 0 ? {
      "content-type": "application/x-www-form-urlencoded"
    } : _obj$header,
    data = obj.data,
    title = obj.title;
  vk.request({
    url: "https://aip.baidubce.com/rest/".concat(actionVersion, "/").concat(action, "?access_token=").concat(accessToken),
    method: "POST",
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    errorCodeName: "error_code",
    errorMsgName: "error_msg",
    data: data,
    needAlert: true,
    success: function success(data) {
      if (title) vk.hideLoading();
      if (data.code) {
        if (typeof obj.fail === "function") obj.fail(data);
      } else {
        if (typeof obj.success === "function") obj.success(data);
      }
    },
    fail: function fail(data) {
      if (title) vk.hideLoading();
      // 如果是因为token失效报的错误,则清空下本地token缓存
      if (data && data.code === 110) vk.removeStorageSync(baiduOpenApiAccessTokenCacheName);
      if (typeof obj.fail === "function") obj.fail(data);
    },
    complete: function complete(data) {
      if (typeof obj.complete === "function") obj.complete(data);
    }
  });
}
var _default = baidu;
exports.default = _default;

/***/ }),
/* 72 */
/*!****************************************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-client/uni_modules/vk-unicloud/vk_modules/vk-unicloud-page/libs/function/vk.request.js ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var requestUtil = {};
requestUtil.config = {
  // 请求配置
  request: {
    // 公共请求参数(每次请求都会带上的参数)
    dataParam: {}
  },
  requestGlobalParamKeyName: "vk_url_request_global_param",
  debug: "development" !== "production",
  // 日志风格
  logger: {
    colorArr: ["#0095ff", "#67C23A"]
  }
};
var counterNum = 0;
/**
 * request 请求库
 * 注意: 该请求库目前主要是框架自身使用，且近期变动频率较高，目前请勿使用在你自己的业务中。
 * @param {String} url                服务器接口地址
 * @param {Object/String/ArrayBuffer} data 请求的参数                                      App（自定义组件编译模式）不支持ArrayBuffer类型
 * @param {Object} header             设置请求的 header，header 中不能设置 Referer。         App、H5端会自动带上cookie，且H5端不可手动修改
 * @param {String} method             默认 POST 可选 GET
 * @param {Number} timeout            超时时间，单位 ms 默认3000(30秒)
 * @param {String} dataType           默认json 如果设为 json，会尝试对返回的数据做一次 JSON.parse
 * @param {String} responseType       默认 text 设置响应的数据类型。合法值：text、arraybuffer App和支付宝小程序不支持
 * @param {Boolean} sslVerify         默认 true 是否需要验证ssl证书 仅App安卓端支持（HBuilderX 2.3.3+）          仅App安卓端支持（HBuilderX 2.3.3+）
 * @param {Boolean} withCredentials   默认 false 跨域请求时是否携带凭证（cookies）            仅H5支持（HBuilderX 2.6.15+）
 * @param {Boolean} firstIpv4         默认 false DNS解析时优先使用ipv4                       仅 App-Android 支持 (HBuilderX 2.8.0+)
 * @param {String} success            成功回调
 * @param {String} fail               失败回调
 * @param {String} complete           完成回调
 * 以下为特殊参数
 * @param {String} errorCodeName      服务器返回的错误码的字段名，若不为空，则会对返回结果进行判断
 * @param {String} errorMsgName       服务器返回的错误码的字符串含义，若不为空，且errorCodeName对应的值不为0，则会alert弹窗
 * @param {Boolean} needAlert         服务器返回的错误时，是否需要alert弹出提示
 *
 * 调用示例
vk.request({
	url: `https://www.xxx.com/api/xxxx`,
	method:"POST",
	header:{
		"content-type": "application/json; charset=utf-8",
	},
	data:{

	},
	success: function(data){

	},
	fail: function(err){

	}
});
 */

requestUtil.request = function () {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var vk = uni.vk;
  // 去除值为 undefined 的参数
  if ((0, _typeof2.default)(obj.data) === "object") {
    obj.data = vk.pubfn.copyObject(obj.data);
  }
  // 注入自定义全局参数开始-----------------------------------------------------------
  var config = requestUtil.config;
  var globalParam = uni.getStorageSync(config.requestGlobalParamKeyName) || {};
  // 根据正则规格自动匹配全局请求参数
  for (var i in globalParam) {
    var _customDate = globalParam[i];
    if (_customDate.regExp) {
      if ((0, _typeof2.default)(_customDate.regExp) === "object") {
        // 数组形式
        for (var _i = 0; _i < _customDate.regExp.length; _i++) {
          var regExp = new RegExp(_customDate.regExp[_i]);
          if (regExp.test(obj.url)) {
            obj.data = Object.assign(_customDate.data, obj.data);
            break;
          }
        }
      } else {
        // 字符串形式
        var _regExp = new RegExp(_customDate.regExp);
        if (_regExp.test(obj.url)) {
          obj.data = Object.assign(_customDate.data, obj.data);
        }
      }
    }
  }
  // 根据指定globalParamName匹配全局请求参数
  var customDate = requestUtil.getRequestGlobalParam(obj.globalParamName);
  if (customDate && JSON.stringify(customDate) !== "{}") {
    if (customDate.regExp) {
      obj.data = Object.assign(customDate.data, obj.data); // 新版本
    } else {
      obj.data = Object.assign(customDate, obj.data); // 兼容旧版本
    }
  }
  // 注入自定义全局参数结束-----------------------------------------------------------

  if (!obj.method) obj.method = "POST"; // 默认POST请求
  if (typeof obj.dataType === "undefined") obj.dataType = "json";
  if (obj.dataType == "default" || obj.dataType === "") delete obj.dataType;
  if (typeof obj.header === "undefined" && typeof obj.headers !== "undefined") {
    obj.header = obj.headers;
  }

  // 自动注入token到请求头开始-----------------------------------------------------------
  // 注意：自2.15.1开始，需要手动指定uniIdToken: true 才会自动添加token到请求头里
  if (typeof vk.getToken === "function" && obj.uniIdToken) {
    var uni_id_token;
    if (obj.uniIdToken === true) {
      uni_id_token = vk.getToken();
    } else if (typeof obj.uniIdToken === "boolean") {
      uni_id_token = obj.uniIdToken;
    }
    if (uni_id_token) {
      if (!obj.header) obj.header = {};
      obj.header["uni-id-token"] = uni_id_token;
    }
  }
  // 自动注入token到请求头结束-----------------------------------------------------------
  var interceptor = obj.interceptor;
  delete obj.interceptor;
  if (interceptor && typeof interceptor.invoke === "function") {
    var interceptorRes = interceptor.invoke(obj);
    if (interceptorRes === false) {
      return;
    }
  }
  if (typeof obj.timeout === "undefined") obj.timeout = 30000; // 超时时间，单位 ms(默认30秒)
  var Logger = {};
  if (config.debug) {
    Logger.params = (0, _typeof2.default)(obj.data) == "object" ? vk.pubfn.copyObject(obj.data) : obj.data;
    Logger.startTime = new Date().getTime();
    var url = obj.url;
    var path = obj.url.split("?")[0];
    path = path.substring(path.indexOf("://") + 3);
    Logger.domainName = path.substring(0, path.indexOf("/"));
    Logger.action = path.substring(path.indexOf("/") + 1);
    Logger.url = url;
  }
  if (obj.title) vk.showLoading(obj.title);
  if (obj.loading) vk.setLoading(true, obj.loading);
  var promiseAction = new Promise(function (resolve, reject) {
    uni.request(_objectSpread(_objectSpread({}, obj), {}, {
      success: function success(res) {
        if (interceptor && typeof interceptor.success === "function") {
          var _interceptorRes = interceptor.success(res);
          if (_interceptorRes === false) {
            return;
          }
        }
        requestSuccess({
          res: res,
          params: obj,
          Logger: Logger,
          resolve: resolve,
          reject: reject
        });
      },
      fail: function fail(res) {
        if (interceptor && typeof interceptor.fail === "function") {
          var _interceptorRes2 = interceptor.fail(res);
          if (_interceptorRes2 === false) {
            return;
          }
        }
        requestFail({
          res: res,
          params: obj,
          Logger: Logger,
          reject: reject
        });
      },
      complete: function complete(res) {
        if (interceptor && typeof interceptor.complete === "function") {
          var _interceptorRes3 = interceptor.complete(res);
          if (_interceptorRes3 === false) {
            return;
          }
        }
        requestComplete({
          res: res,
          params: obj,
          Logger: Logger
        });
      }
    }));
  });
  promiseAction.catch(function (error) {});
  return promiseAction;
};
// 请求成功回调
function requestSuccess() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var vk = uni.vk;
  var config = requestUtil.config;
  var _obj$res = obj.res,
    res = _obj$res === void 0 ? {} : _obj$res,
    params = obj.params,
    Logger = obj.Logger,
    resolve = obj.resolve,
    reject = obj.reject;
  var title = params.title,
    needOriginalRes = params.needOriginalRes,
    dataType = params.dataType,
    errorCodeName = params.errorCodeName,
    errorMsgName = params.errorMsgName,
    success = params.success,
    loading = params.loading;
  var data = res.data || {};
  if (vk.pubfn.isNotNullAll(errorCodeName, data[errorCodeName])) {
    data.code = data[errorCodeName];
    delete data[errorCodeName];
  }
  if (vk.pubfn.isNotNullAll(errorMsgName, data[errorMsgName])) {
    data.msg = data[errorMsgName];
    if (typeof data[errorMsgName] === "string") {
      delete data[errorMsgName];
    }
  }
  if (config.debug) Logger.result = (0, _typeof2.default)(data) == "object" ? vk.pubfn.copyObject(data) : data;
  if ([1301, 1302, 30201, 30202, 30203, 30204].indexOf(data.code) > -1 && data.msg.indexOf("token") > -1) {
    // 执行 login 拦截器函数（跳转到页面页面）
    var _vk$callFunctionUtil$ = vk.callFunctionUtil.interceptor,
      interceptor = _vk$callFunctionUtil$ === void 0 ? {} : _vk$callFunctionUtil$;
    if (typeof interceptor.login === "function") {
      interceptor.login({
        res: data,
        params: params,
        vk: vk
      });
    }
    reject(data);
  } else if (res.statusCode >= 400 || data.code) {
    requestFail({
      res: data,
      params: params,
      Logger: Logger,
      reject: reject
    });
  } else {
    if (title) vk.hideLoading();
    if (loading) vk.setLoading(false, loading);
    if (needOriginalRes) data.originalRes = vk.pubfn.copyObject(res);
    if (data.vk_uni_token) vk.callFunctionUtil.saveToken(data.vk_uni_token);
    if (data.userInfo && data.needUpdateUserInfo) vk.callFunctionUtil.updateUserInfo(data);
    if (typeof success === "function") success(data);
    if (typeof resolve === "function") resolve(data);
  }
}

// 请求失败回调
function requestFail() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var vk = uni.vk;
  var config = requestUtil.config;
  var _obj$res2 = obj.res,
    res = _obj$res2 === void 0 ? {} : _obj$res2,
    params = obj.params,
    Logger = obj.Logger,
    reject = obj.reject;
  var title = params.title,
    needAlert = params.needAlert,
    fail = params.fail,
    loading = params.loading;
  if (typeof needAlert === "undefined") {
    needAlert = typeof fail === "function" ? false : true;
  }
  var errMsg = "";
  var sysErr = false;
  if (typeof res.code !== "undefined") {
    errMsg = res.msg;
  } else {
    sysErr = true;
    errMsg = JSON.stringify(res);
  }
  if (errMsg.indexOf("fail timeout") > -1) {
    sysErr = true;
    errMsg = "请求超时，请重试！";
  }
  if (config.debug) Logger.error = res;
  if (title) vk.hideLoading();
  if (loading) vk.setLoading(false, loading);
  var runKey = true;
  // 自定义拦截器开始-----------------------------------------------------------
  var _vk$callFunctionUtil$2 = vk.callFunctionUtil.getConfig(),
    _vk$callFunctionUtil$3 = _vk$callFunctionUtil$2.interceptor,
    interceptor = _vk$callFunctionUtil$3 === void 0 ? {} : _vk$callFunctionUtil$3;
  if (interceptor.request && typeof interceptor.request.fail == "function") {
    runKey = interceptor.request.fail({
      vk: vk,
      res: res,
      params: params
    });
    if (runKey === undefined) runKey = true;
  }
  // 自定义拦截器结束-----------------------------------------------------------
  if (runKey) {
    if (needAlert && vk.pubfn.isNotNull(errMsg)) {
      if (sysErr) {
        vk.toast("网络开小差了！", "none");
      } else {
        vk.alert(errMsg);
      }
    }
    if (typeof fail === "function") fail(res);
    if (typeof reject === "function") reject(res);
  }
}

// 请求完成回调
function requestComplete() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var vk = uni.vk;
  var config = requestUtil.config;
  var _obj$res3 = obj.res,
    res = _obj$res3 === void 0 ? {} : _obj$res3,
    params = obj.params,
    Logger = obj.Logger;
  var title = params.title,
    needOriginalRes = params.needOriginalRes,
    complete = params.complete;
  if (config.debug) {
    Logger.endTime = new Date().getTime();
    Logger.runTime = Logger.endTime - Logger.startTime;
    var colorArr = config.logger.colorArr;
    var colorStr = colorArr[counterNum % colorArr.length];
    counterNum++;
    console.log("%c--------【开始】【服务器请求】【" + Logger.action + "】--------", 'color: ' + colorStr + ';font-size: 12px;font-weight: bold;');
    console.log("【请求地址】: ", Logger.url);
    console.log("【请求参数】: ", Logger.params);
    console.log("【返回数据】: ", Logger.result);
    console.log("【请求状态】: ", res.statusCode, "【http状态码】");
    console.log("【总体耗时】: ", Logger.runTime, "毫秒【含页面渲染】");
    console.log("【请求时间】: ", vk.pubfn.timeFormat(Logger.startTime, "yyyy-MM-dd hh:mm:ss"));
    if (Logger.error) {
      var errorLog = console.warn || console.error;
      if (Logger.error.err && Logger.error.err.stack) {
        console.error("【Error】: ", Logger.error);
        console.error("【Stack】: ", Logger.error.err.stack);
      } else {
        errorLog("【Error】: ", Logger.error);
      }
    }
    console.log("%c--------【结束】【服务器请求】【" + Logger.action + "】--------", 'color: ' + colorStr + ';font-size: 12px;font-weight: bold;');
  }
  var data = res.data;
  if (needOriginalRes) data.originalRes = vk.pubfn.copyObject(res);
  if (typeof complete === "function") complete(data);
}

/**
 * 修改请求配置中的公共请求参数
 * 若把shop-manage改成*则代表全局
	vk.requestUtil.updateRequestGlobalParam({
		"shop-manage":{
			regExp:"^xxx/kh/",
			data:{
				shop_id : shop_id
			}
		}
	});
	对应的request中增加参数globalParamName:"shop-manage"
	vk.request({
		url: 'xxx/xxxxxx',
		title: '请求中...',
		globalParamName:"shop-manage",// 如果设置了正则规则,则不需要此参数
		data: {},
		success(data) {
		}
	});
 */
requestUtil.updateRequestGlobalParam = function () {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var setKey = arguments.length > 1 ? arguments[1] : undefined;
  var vk = uni.vk;
  var config = requestUtil.config;
  if (setKey) {
    // 覆盖对象
    config.request.dataParam = data;
  } else {
    // 覆盖参数(有就覆盖,没有则新增)
    config.request.dataParam = Object.assign(config.request.dataParam, data);
  }
  vk.setStorageSync(config.requestGlobalParamKeyName, config.request.dataParam);
};

/**
 * 获取请求配置中的公共请求参数
	vk.requestUtil.getRequestGlobalParam();
 */
requestUtil.getRequestGlobalParam = function () {
  var globalParamName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "*";
  var vk = uni.vk;
  var config = requestUtil.config;
  var data = config.request.dataParam;
  if (!data || JSON.stringify(data) === "{}") {
    data = uni.getStorageSync(config.requestGlobalParamKeyName) || {};
    config.request.dataParam = data;
  }
  var param = data[globalParamName] || {};
  return JSON.parse(JSON.stringify(param));
};

/**
 * 删除请求配置中的公共请求参数
 * globalParamName 不传代表删除所有
	vk.requestUtil.deleteRequestGlobalParam(globalParamName);
 */
requestUtil.deleteRequestGlobalParam = function (globalParamName) {
  var vk = uni.vk;
  var config = requestUtil.config;
  var globalParam = uni.getStorageSync(config.requestGlobalParamKeyName) || {};
  if (globalParamName) {
    delete globalParam[globalParamName];
  } else {
    globalParam = {};
  }
  config.request.dataParam = globalParam;
  vk.setStorageSync(config.requestGlobalParamKeyName, globalParam);
};
var _default = requestUtil;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 73 */
/*!*********************************************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-client/uni_modules/vk-unicloud/vk_modules/vk-unicloud-page/libs/function/vk.importObject.js ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 28));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 31));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * 导出云对象实例
 * @param {String} name 云对象路径，如：client/pub 
 * @example const pubObject = uni.vk.importObject('client/pub'); // 导入云对象
 * 注意，只能在声明 async 的函数内使用，如：
async test(){
	let res = await pubObject.getList({
		title: "请求中",
		data: { 
			a: 1,
			b: "2"
		}
	});
}
 */
var importObject = function importObject(name) {
  var importObjectOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var newObj = new Proxy(importObject, {
    get: function get(target, key, receiver) {
      /**
       * 导出云对象内的某个方法
       * @param {Object}   data      请求参数，如 { a:1, b:"2" } 云对象内可通过 let { a, b } = data; 获取参数
       * @param {String}   title     遮罩层提示语，为空或不传则代表不显示遮罩层。
       * @param {Boolean}  needAlert 为true代表请求错误时，会有弹窗提示。默认为true
       * @param {Object}   loading   与title二选一，格式为 { name: "loading", that: that }  name是变量名，that是数据源，当发起请求时，自动that[name] = true; 请求结束后，自动that[name] = false;
       */
      return /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(options) {
          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  // 如果importObjectOptions中指定了easy为true，代表options的值就是请求参数
                  if (importObjectOptions.easy) {
                    delete importObjectOptions.easy;
                    options = {
                      data: options
                    };
                  }
                  // 如果importObjectOptions中指定了data，代表有默认请求参数，需要加到请求参数中
                  if (importObjectOptions.data) {
                    options.data = Object.assign(importObjectOptions.data, options.data);
                  }
                  return _context.abrupt("return", uni.vk.callFunction(_objectSpread(_objectSpread(_objectSpread({}, importObjectOptions), options), {}, {
                    url: "".concat(name, ".").concat(key)
                  })));
                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));
        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }();
    }
    // set: function(target, key, value, receiver) {
    // 	console.log("set");
    // 	console.log("target",target);
    // 	console.log("key",key);
    // 	console.log("value",value);
    // 	console.log("receiver", receiver);
    // },
  });

  return newObj;
};
var _default = importObject;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 74 */
/*!****************************************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-client/uni_modules/vk-unicloud/vk_modules/vk-unicloud-page/libs/function/vk.filters.js ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = _interopRequireDefault(__webpack_require__(/*! ./index.js */ 58));
/**
 * vk.filters
 * 全局过滤器
 */

var util = {};
// 将时间显示成1秒前、1天前
util.dateDiff = function (starttime, showType) {
  return _index.default.dateDiff(starttime, showType);
};
util.dateDiff2 = function (starttime, showType) {
  return _index.default.dateDiff2(starttime, showType);
};
// 计数器1
util.numStr = function (n) {
  return _index.default.numStr(n);
};
util.timeStr = function (date) {
  return _index.default.timeFormat(date);
};
/**
 * 日期对象转字符串
 * @description 最终转成 2020-08-01 12:12:12
 * @param {Date || Number} 	date		需要转换的时间
 * date参数支持
 * 支持:时间戳
 * 支持:2020-08
 * 支持:2020-08-24
 * 支持:2020-08-24 12
 * 支持:2020-08-24 12:12
 * 支持:2020-08-24 12:12:12
 */
util.timeFilter = function (date, fmt) {
  return _index.default.timeFormat(date, fmt);
};
// 金额过滤器
util.priceFilter = function (n) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : " - ";
  return _index.default.priceFilter(n, defaultValue);
};
// 金额过滤器 - 只显示小数点左边
util.priceLeftFilter = function (n) {
  return _index.default.priceLeftFilter(n);
};
// 金额过滤器 - 只显示小数点右边
util.priceRightFilter = function (n) {
  return _index.default.priceRightFilter(n);
};
// 百分比过滤器
util.percentageFilter = function (n, needShowSymbol) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : " - ";
  return _index.default.percentageFilter(n, needShowSymbol, defaultValue);
};
// 折扣过滤器
util.discountFilter = function (n, needShowSymbol) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : " - ";
  return _index.default.discountFilter(n, needShowSymbol, defaultValue);
};
// 大小过滤器 sizeFilter(1024,3,["B","KB","MB","GB"])
util.sizeFilter = function () {
  var res = _index.default.calcSize.apply(_index.default, arguments);
  return res.title;
};
var _default = util;
exports.default = _default;

/***/ }),
/* 75 */
/*!********************************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-client/uni_modules/vk-unicloud/vk_modules/vk-unicloud-page/libs/mixin/mixin.js ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var isOnLaunch = true;
var _default = {
  data: function data() {
    return {};
  },
  onLoad: function onLoad() {
    // 将vk实例挂载到app.globalData上，方便在非Vue页面自身函数中调用vk实例（因为获取不到this）
    var app = getApp({
      allowDefault: true
    });
    if (app && app.globalData && !app.globalData.vk) {
      app.globalData.vk = this.vk;
    }
    if (this.vk) {
      var url = this.vk.pubfn.getCurrentPageRoute();
      // 检测是否可以分享(小程序专属)
      this.vk.navigate.checkAllowShare({
        url: url
      });
      // 检测是否需要登录，只有首次启动的页面才需要检测，其他页面通过 vk.navigateTo 跳转前会自动判断。
      if (isOnLaunch && !this.vk.checkToken() && getCurrentPages().length == 1) {
        isOnLaunch = false; // 重新标记为非首次页面
        var currentPage = this.vk.pubfn.getCurrentPage() || {};
        var pagePath = currentPage.pagePath || "/".concat(currentPage.route) || url;
        var fullPath = currentPage.fullPath;
        var options = currentPage.options;
        this.vk.pubfn.checkLogin({
          url: pagePath,
          fullPath: fullPath,
          options: options,
          isOnLaunch: true
        }); // 检测是否需要登录
      }
    }
  },
  created: function created() {
    // 将vk实例挂载到app.globalData上，方便在非Vue页面自身函数中调用vk实例（因为获取不到this）
    var app = getApp({
      allowDefault: true
    });
    if (app && app.globalData && !app.globalData.vk) {
      app.globalData.vk = this.vk;
    }
  },
  methods: {
    $getData: function $getData(data, key, defaultValue) {
      var vk = this.vk;
      return vk.pubfn.getData(data, key, defaultValue);
    }
  }
};
exports.default = _default;

/***/ }),
/* 76 */
/*!****************************************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-client/uni_modules/vk-unicloud/vk_modules/vk-unicloud-page/libs/function/permission.js ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(Vue) {
  Vue.prototype.$hasPermission = function hasPermission(name) {
    var permission = this.$store.state.$user.permission || [];
    return permission.indexOf(name) > -1;
  };
  Vue.prototype.$hasRole = function hasRole(name) {
    var role = this.$store.state.$user.userInfo.role || [];
    return role.indexOf(name) > -1;
  };
}

/***/ }),
/* 77 */
/*!**************************************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-client/uni_modules/vk-unicloud/vk_modules/vk-unicloud-page/libs/store/mixin/mixin.js ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  beforeCreate: function beforeCreate() {
    // 将vuex方法挂在到vk实例中 beforeCreate created
    var vk = this.vk,
      $store = this.$store;
    if (typeof $store !== "undefined" && typeof vk.getVuexStore === "undefined") {
      vk.getVuexStore = function () {
        return $store;
      };
      vk.vuex = function (name, value) {
        $store.commit('updateStore', {
          name: name,
          value: value
        });
      };
      /**
       * (推荐) 设置vuex
       * vk.vuex.set('$user.userInfo.avatar', avatar);
       */
      vk.vuex.set = function (name, value) {
        $store.commit('updateStore', {
          name: name,
          value: value
        });
      };
      /**
       * (推荐) 读取vuex(具有解除对象内存印射功能，且任意一层数据为undefined，不会报错)
       * vk.vuex.get('$user.userInfo.avatar');
       */
      vk.vuex.get = function (name, defaultValue) {
        var value = vk.pubfn.getData($store.state, name);
        if (typeof value === "undefined") return typeof defaultValue !== "undefined" ? defaultValue : "";
        return JSON.parse(JSON.stringify(value));
      };
      vk.vuex.getters = function (name) {
        return $store.getters[name];
      };
      /**
       * 触发vuex的指定actions(异步)
       * $user是模块名,addFootprint是对应模块的action名称
       * vk.vuex.dispatch('$user/addFootprint', data);
       */
      vk.vuex.dispatch = $store.dispatch;
      /**
       * 触发vuex的指定mutations
       * $user是模块名,setFootprint是对应模块的action名称
       * vk.vuex.commit('$user/setFootprint', data);
       */
      vk.vuex.commit = $store.commit;

      /* 另一种方式 */
      /**
       * vk.setVuex('$user.userInfo.avatar', avatar);
       */
      vk.setVuex = vk.vuex.set;
      /**
       * vk.getVuex('$user.userInfo.avatar');
       */
      vk.getVuex = vk.vuex.get;
      /* 兼容老版本 */
      vk.state = vk.vuex.get;
      try {
        if (!vk.checkToken()) {
          vk.callFunctionUtil.deleteUserInfo({
            log: false
          });
        }
      } catch (err) {}
    }
  },
  computed: {}
};
exports.default = _default;

/***/ }),
/* 78 */
/*!*************************************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-client/uni_modules/vk-unicloud/vk_modules/vk-unicloud-page/libs/store/libs/error.js ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var install = function install(Vue) {
  var debug = "development" !== 'production';
  var vk = Vue.prototype ? Vue.prototype.vk : Vue.config.globalProperties.vk;
  if (debug && vk) {
    var oldErrorHandler = Vue.config.errorHandler;
    Vue.config.errorHandler = function errorHandler(err, vm, info) {
      var route = vm.$page && vm.$page.route;
      var date = new Date();
      var log = {
        err: err.toString(),
        info: info,
        route: route,
        time: date.getTime(),
        timeStr: date.toLocaleTimeString()
      };
      if (vk.vuex) vk.vuex.dispatch('$error/add', log);
      return oldErrorHandler(err, vm, info);
    };
  }
};
var _default = {
  install: install
};
exports.default = _default;

/***/ }),
/* 79 */
/*!****************************************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-client/uni_modules/vk-unicloud/vk_modules/vk-unicloud-page/libs/install/console.log.js ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var debug = "development" !== 'production';
var install = function install(Vue) {
  var vk = Vue.prototype ? Vue.prototype.vk : Vue.config.globalProperties.vk;
  if (vk) {
    vk.log = console.log;
    if (typeof vk.getConfig === "function") {
      debug = vk.getConfig().debug;
    }
    if (!debug) {
      console.log = function () {};
    }
  }
};
var _default = {
  install: install
};
exports.default = _default;

/***/ }),
/* 80 */
/*!*******************************************************************************************************************************!*\
  !*** E:/appProject/ich-zcb/ich-zcb-client/uni_modules/vk-unicloud/vk_modules/vk-unicloud-page/libs/function/updateManager.js ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var updateManager = {};
/**
 * 本API返回全局唯一的版本更新管理器对象： updateManager，用于管理小程序更新。
 * vk.updateManager.updateReady();
 */
updateManager.updateReady = function (obj) {
  updateManagerByMP(obj);
};
var _default = updateManager;
exports.default = _default;
function updateManagerByMP() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _obj$title = obj.title,
    title = _obj$title === void 0 ? "更新提示" : _obj$title,
    _obj$content = obj.content,
    content = _obj$content === void 0 ? "新版本已经准备好，点击更新！" : _obj$content,
    _obj$autoUpdate = obj.autoUpdate,
    autoUpdate = _obj$autoUpdate === void 0 ? true : _obj$autoUpdate,
    _obj$showCancel = obj.showCancel,
    showCancel = _obj$showCancel === void 0 ? false : _obj$showCancel,
    _obj$confirmText = obj.confirmText,
    confirmText = _obj$confirmText === void 0 ? "一键更新" : _obj$confirmText;
  var updateManager = uni.getUpdateManager();
  updateManager.onCheckForUpdate(function (res) {
    // 请求完新版本信息的回调
    // console.log(res.hasUpdate);
  });
  updateManager.onUpdateReady(function (res) {
    uni.showModal({
      title: title,
      content: content,
      showCancel: showCancel,
      confirmText: confirmText,
      success: function success(res) {
        if (res.confirm) {
          if (typeof obj.success === "function") {
            obj.success({
              applyUpdate: updateManager.applyUpdate
            });
          }
          if (typeof obj.complete === "function") obj.complete();
          if (autoUpdate) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        }
      }
    });
  });
  updateManager.onUpdateFailed(function (res) {
    // 新的版本下载失败
    console.error("onUpdateFailed", res);
    if (typeof obj.fail === "function") obj.fail(res);
    if (typeof obj.complete === "function") obj.complete();
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map