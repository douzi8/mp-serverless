(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "rIET");
/******/ })
/************************************************************************/
/******/ ({

/***/ "8jnn":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Context {
  constructor(ctx) {
    this.mpserverless = void 0;
    this.logger = void 0;
    this.httpclient = void 0;
    this.cloud = void 0;
    this.authUserId = void 0;
    this.mpserverless = ctx.mpserverless;
    this.logger = ctx.logger;
    this.httpclient = ctx.httpclient;
    this.cloud = ctx.cloud;
  }

  async getAuthUserId() {
    const {
      mpserverless
    } = this;

    if (!this.authUserId) {
      const userInfo = await mpserverless.user.getInfo();
      this.authUserId = userInfo.user.oAuthUserId;
    }

    return this.authUserId;
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Context);

/***/ }),

/***/ "jK02":
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),

/***/ "rIET":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "util"
var external_util_ = __webpack_require__("jK02");
var external_util_default = /*#__PURE__*/__webpack_require__.n(external_util_);

// EXTERNAL MODULE: ./src/services/context.ts
var context = __webpack_require__("8jnn");

// CONCATENATED MODULE: ./src/common/config.ts
const CHANGE_SPACE = ['2088702946325998'];
// CONCATENATED MODULE: ./src/services/admin.ts



class admin_Admin extends context["a" /* default */] {
  /**
   * 查询当前用户是否能切换小程序空间
   */
  async canChangeSpace() {
    const userId = await this.getAuthUserId();
    return CHANGE_SPACE.includes(userId);
  }

}

/* harmony default export */ var services_admin = (admin_Admin);
// CONCATENATED MODULE: ./src/functions/admin.ts


/**
 * 数据库操作文档: https://help.aliyun.com/document_detail/122550.html
 */

async function entry(ctx) {
  const {
    args,
    logger
  } = ctx;
  const {
    url
  } = args;
  const admin = new services_admin(ctx);
  let res;

  switch (url) {
    case 'space/change':
      res = await admin.canChangeSpace();
      break;

    default:
      throw new Error(`缺少对应的action: ${url}`);
  } //响应日志


  logger.info(`function response:`, external_util_default.a.inspect(res, {
    depth: 3,
    breakLength: Infinity
  }));
  return res;
}

/* harmony default export */ var functions_admin = __webpack_exports__["default"] = (entry);

/***/ })

/******/ })));