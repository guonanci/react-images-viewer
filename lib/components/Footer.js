'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _noImportant = require('aphrodite/no-important');

var _theme = require('../theme');

var _theme2 = _interopRequireDefault(_theme);

var _util = require('../utils/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function Footer(_ref, _ref2) {
  var theme = _ref2.theme;

  var caption = _ref.caption,
      countCurr = _ref.countCurr,
      countSeparator = _ref.countSeparator,
      countTotal = _ref.countTotal,
      showCount = _ref.showCount,
      props = _objectWithoutProperties(_ref, ['caption', 'countCurr', 'countSeparator', 'countTotal', 'showCount']);

  if (!caption && !showCount) return null;

  var classes = _noImportant.StyleSheet.create((0, _util.deepMerge)(defaultStyles, theme));

  var imgCount = showCount ? _react2.default.createElement(
    'div',
    { className: (0, _noImportant.css)(classes.footerCount) },
    countCurr,
    countSeparator,
    countTotal
  ) : _react2.default.createElement('span', null);

  return _react2.default.createElement(
    'div',
    _extends({ className: (0, _noImportant.css)(classes.footer) }, props),
    caption ? _react2.default.createElement(
      'figcaption',
      { className: (0, _noImportant.css)(classes.footerCaption) },
      caption
    ) : _react2.default.createElement('span', null),
    imgCount
  );
}

Footer.propTypes = {
  caption: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
  countCurr: _propTypes2.default.number,
  countSeparator: _propTypes2.default.string,
  countTotal: _propTypes2.default.number,
  showCount: _propTypes2.default.bool
};
Footer.contextTypes = {
  theme: _propTypes2.default.object.isRequired
};

var defaultStyles = {
  footer: {
    boxSizing: 'border-box',
    color: _theme2.default.footer.color,
    cursor: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    left: 0,
    lineHeight: 1.3,
    paddingTop: _theme2.default.footer.gutter.vertical,
    paddingRight: _theme2.default.footer.gutter.horizontal,
    paddingBottom: _theme2.default.footer.gutter.vertical,
    paddingLeft: _theme2.default.footer.gutter.horizontal
  },
  footerCount: {
    color: _theme2.default.footer.count.color,
    fontSize: _theme2.default.footer.count.fontSize,
    paddingLeft: '1em' // add a small gutter for the caption
  },
  footerCaption: {
    flex: '1 1 0'
  }
};

exports.default = Footer;