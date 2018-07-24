'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _noImportant = require('aphrodite/no-important');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Spinner = function Spinner(props) {
  var classes = _noImportant.StyleSheet.create(styles(props));

  return _react2.default.createElement(
    'div',
    { className: (0, _noImportant.css)(classes.bouncingLoader) },
    _react2.default.createElement('div', { className: (0, _noImportant.css)(classes.child) }),
    _react2.default.createElement('div', { className: (0, _noImportant.css)(classes.child, classes.child2) }),
    _react2.default.createElement('div', { className: (0, _noImportant.css)(classes.child, classes.child3) })
  );
};

Spinner.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.number
};

var bouncingKeyframes = function bouncingKeyframes(size) {
  return {
    '0%': {
      opacity: 1,
      transform: 'translateY(0)'
    },
    '100%': {
      opacity: .1,
      transform: 'translateY(-' + size + 'px)'
    }
  };
};

var styles = function styles(_ref) {
  var color = _ref.color,
      size = _ref.size;
  return {
    bouncingLoader: {
      display: 'flex',
      justifyContent: 'center'
    },
    child: {
      width: size,
      height: size,
      margin: 3 * size + 'px ' + .2 * size + 'px',
      background: color,
      borderRadius: '50%',
      animationName: bouncingKeyframes(size),
      animationDuration: '.6s',
      animationDirection: 'alternate',
      animationIterationCount: 'infinite'
    },
    child2: {
      animationDelay: '0.2s'
    },
    child3: {
      animationDelay: '0.4s'
    }
  };
};

exports.default = Spinner;