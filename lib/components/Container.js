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

function Container(props) {
  var classes = _noImportant.StyleSheet.create((0, _util.deepMerge)(defaultStyles, props.theme));

  return _react2.default.createElement('div', _extends({
    id: 'viewerBackdrop',
    className: (0, _noImportant.css)(classes.container)
  }, props));
}

Container.propTypes = {
  theme: _propTypes2.default.object
};

var defaultStyles = {
  container: {
    alignItems: 'center',
    backdropColor: _theme2.default.container.background,
    boxSizing: 'border-box',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    left: 0,
    paddingTop: _theme2.default.container.gutter.vertical,
    paddingRight: _theme2.default.container.gutter.horizontal,
    paddingBottom: _theme2.default.container.gutter.vertical,
    paddingLeft: _theme2.default.container.gutter.horizontal,
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: _theme2.default.container.zIndex
  }
};

exports.default = Container;