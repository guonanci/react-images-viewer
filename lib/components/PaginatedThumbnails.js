'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _noImportant = require('aphrodite/no-important');

var _Thumbnail = require('./Thumbnail');

var _Thumbnail2 = _interopRequireDefault(_Thumbnail);

var _Arrow = require('./Arrow');

var _Arrow2 = _interopRequireDefault(_Arrow);

var _theme = require('../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var classes = _noImportant.StyleSheet.create({
  paginatedThumbnails: {
    bottom: _theme2.default.container.gutter.vertical,
    height: _theme2.default.thumbnail.size,
    padding: '0 50px',
    position: 'absolute',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    left: '50%',
    transform: 'translateX(-50%)'
  }
});

var arrowStyles = {
  height: _theme2.default.thumbnail.size + _theme2.default.thumbnail.gutter * 2,
  width: 40
};

var PaginatedThumbnails = function (_Component) {
  _inherits(PaginatedThumbnails, _Component);

  function PaginatedThumbnails(props) {
    _classCallCheck(this, PaginatedThumbnails);

    var _this = _possibleConstructorReturn(this, (PaginatedThumbnails.__proto__ || Object.getPrototypeOf(PaginatedThumbnails)).call(this, props));

    _this.state = {
      hasCustomPage: false
    };

    _this.gotoPrev = _this.gotoPrev.bind(_this);
    _this.gotoNext = _this.gotoNext.bind(_this);
    return _this;
  }

  _createClass(PaginatedThumbnails, [{
    key: 'UNSAFE_componentWillReceiveProps',
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.currImg !== this.props.currImg) {
        this.setState({
          hasCustomPage: false
        });
      }
    }

    // ====================
    // Methods
    // ====================

  }, {
    key: 'getFirst',
    value: function getFirst() {
      var _props = this.props,
          currImg = _props.currImg,
          offset = _props.offset;

      if (this.state.hasCustomPage) {
        return this.clampFirst(this.state.first);
      }
      return this.clampFirst(currImg - offset);
    }
  }, {
    key: 'setFirst',
    value: function setFirst(event, newFirst) {
      var first = this.state.first;


      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      if (first === newFirst) return;

      this.setState({
        hasCustomPage: true,
        first: newFirst
      });
    }
  }, {
    key: 'gotoPrev',
    value: function gotoPrev(event) {
      this.setFirst(event, this.getFirst() - this.props.offset);
    }
  }, {
    key: 'gotoNext',
    value: function gotoNext(event) {
      this.setFirst(event, this.getFirst() + this.props.offset);
    }
  }, {
    key: 'clampFirst',
    value: function clampFirst(value) {
      var _props2 = this.props,
          imgs = _props2.imgs,
          offset = _props2.offset;


      var totalCount = 2 * offset + 1; // show $offset extra thumbnails on each side

      if (value < 0) {
        return 0;
      } else if (value + totalCount > imgs.length) {
        // Too far
        return imgs.length - totalCount;
      } else {
        return value;
      }
    }

    // ====================
    // Renderers
    // ====================

  }, {
    key: 'renderArrowPrev',
    value: function renderArrowPrev(theme) {
      var leftTitle = this.props.leftTitle;

      if (this.getFirst() <= 0) return null;

      return _react2.default.createElement(_Arrow2.default, {
        theme: theme,
        direction: 'left',
        size: 'small',
        icon: 'arrowLeft',
        onClick: this.gotoPrev,
        style: arrowStyles,
        title: leftTitle,
        type: 'button'
      });
    }
  }, {
    key: 'renderArrowNext',
    value: function renderArrowNext(theme) {
      var _props3 = this.props,
          offset = _props3.offset,
          imgs = _props3.imgs,
          rightTitle = _props3.rightTitle;

      var totalCount = 2 * offset + 1;
      if (this.getFirst() + totalCount >= imgs.length) return null;

      return _react2.default.createElement(_Arrow2.default, {
        theme: theme,
        direction: 'right',
        size: 'small',
        icon: 'arrowRight',
        onClick: this.gotoNext,
        style: arrowStyles,
        title: rightTitle,
        type: 'button'
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props,
          imgs = _props4.imgs,
          currImg = _props4.currImg,
          onClickThumbnail = _props4.onClickThumbnail,
          offset = _props4.offset,
          theme = _props4.theme;


      var totalCount = 2 * offset + 1; // show $offset extra thumbnails on each side
      var thumbnails = [];
      var baseOffset = 0;
      if (imgs.length <= totalCount) {
        thumbnails = imgs;
      } else {
        // Try to center current image in list
        baseOffset = this.getFirst();
        thumbnails = imgs.slice(baseOffset, baseOffset + totalCount);
      }

      return _react2.default.createElement(
        'div',
        { className: (0, _noImportant.css)(classes.paginatedThumbnails) },
        this.renderArrowPrev(theme),
        thumbnails.map(function (img, idx) {
          return _react2.default.createElement(_Thumbnail2.default, _extends({
            theme: theme,
            key: baseOffset + idx
          }, img, {
            index: baseOffset + idx,
            onClick: onClickThumbnail,
            active: baseOffset + idx === currImg
          }));
        }),
        this.renderArrowNext(theme)
      );
    }
  }]);

  return PaginatedThumbnails;
}(_react.Component);

exports.default = PaginatedThumbnails;


PaginatedThumbnails.propTypes = {
  theme: _propTypes2.default.object,
  leftTitle: _propTypes2.default.string,
  rightTitle: _propTypes2.default.string,
  currImg: _propTypes2.default.number,
  imgs: _propTypes2.default.array,
  offset: _propTypes2.default.number,
  onClickThumbnail: _propTypes2.default.func.isRequired
};