"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.deepMerge = deepMerge;
exports.bindFunctions = bindFunctions;
function deepMerge(source) {
  var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var extended = _extends({}, target);

  Object.keys(source).forEach(function (key) {
    if (_typeof(source[key]) !== "object" || !source[key]) {
      extended[key] = source[key];
    } else {
      if (!target[key]) {
        extended[key] = source[key];
      } else {
        extended[key] = deepMerge(target[key], source[key]);
      }
    }
  });
  return extended;
}
// export function deepMerge(source, target = {}) {
//   // initialize with source styles
//   const styles = { ...source }

//   // massage in target styles
//   Object.keys(target).forEach(key => {
//     if (source[key]) {
//       styles[key] = (rsCss, props) => {
//         return target[key](source[key](rsCss, props), props)
//       }
//     } else {
//       styles[key] = target[key]
//     }
//   })

//   return styles
// }

var canUseDom = exports.canUseDom = !!(typeof window !== "undefined" && window.document && window.document.createElement);

/**
 * Bind multiple conponent methods:
 * @param {this} context
 * @param {Array} functions
 *
 * constructor() {
 *   ...
 *   bindFunctions.call(this, ['handleClick', 'handleOther'])
 * }
 */
function bindFunctions(functions) {
  var _this = this;

  functions.forEach(function (f) {
    return _this[f] = _this[f].bind(_this);
  });
}