'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.deepMerge = deepMerge;
exports.bindFunctions = bindFunctions;
function deepMerge(target) {
  var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var extended = Object.assign({}, target);

  Object.keys(source).forEach(function (key) {
    if (_typeof(source[key]) !== 'object' || !source[key]) {
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

var canUseDom = exports.canUseDom = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

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