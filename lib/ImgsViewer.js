'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _aphrodite = require('aphrodite');

var _reactScrolllock = require('react-scrolllock');

var _reactScrolllock2 = _interopRequireDefault(_reactScrolllock);

var _theme = require('./theme');

var _theme2 = _interopRequireDefault(_theme);

var _Arrow = require('./components/Arrow');

var _Arrow2 = _interopRequireDefault(_Arrow);

var _Container = require('./components/Container');

var _Container2 = _interopRequireDefault(_Container);

var _Footer = require('./components/Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _Header = require('./components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _PaginatedThumbnails = require('./components/PaginatedThumbnails');

var _PaginatedThumbnails2 = _interopRequireDefault(_PaginatedThumbnails);

var _Portal = require('./components/Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _Spinner = require('./components/Spinner');

var _Spinner2 = _interopRequireDefault(_Spinner);

var _util = require('./utils/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function normalizeSourceSet(data) {
  var sourceSet = data.srcSet || data.srcset;

  if (Array.isArray(sourceSet)) {
    return sourceSet.join();
  }

  return sourceSet;
}

var ImgsViewer = function (_Component) {
  _inherits(ImgsViewer, _Component);

  function ImgsViewer(props) {
    _classCallCheck(this, ImgsViewer);

    var _this = _possibleConstructorReturn(this, (ImgsViewer.__proto__ || Object.getPrototypeOf(ImgsViewer)).call(this, props));

    _this.theme = (0, _util.deepMerge)(_theme2.default, _this.theme);
    _this.classes = _aphrodite.StyleSheet.create((0, _util.deepMerge)(defaultStyles, _this.theme));
    _this.state = { imgLoaded: false };

    _util.bindFunctions.call(_this, ['gotoNext', 'gotoPrev', 'closeBackdrop', 'handleKeyboardInput', 'handleImgLoaded']);
    return _this;
  }

  _createClass(ImgsViewer, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        theme: this.theme
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.isOpen) {
        if (this.props.enableKeyboardInput) {
          window.addEventListener('keyboard', this.handleKeyboardInput);
        }
        if (typeof this.props.currImg === 'number') {
          this.preloadImg(this.props.currImg, this.handleImgLoaded);
        }
      }
    }
  }, {
    key: 'UNSAFE_componentWillReceiveProps',
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (!_util.canUseDom) return;

      // always to preload imgs with both directions
      // then when user changs direction, img also show quickly
      if (nextProps.preloadNextImg) {
        var nextIdx = nextProps.currImg + 1;
        var prevIdx = nextProps.currImg - 1;
        this.preloadImg(prevIdx);
        this.preloadImg(nextIdx);
      }
      // preload currImg
      if (this.props.currImg !== nextProps.currImg || !this.props.isOpen && nextProps.isOpen) {
        var img = this.preloadImg(nextProps.currImg, this.handleImgLoaded);
        this.setState({ imgLoaded: img.complete });
      }

      // add/remove event listeners
      if (!this.props.isOpen && nextProps.isOpen && nextProps.enableKeyboardInput) {
        window.addEventListener('keyboard', this.handleKeyboardInput);
      }
      if (!nextProps.isOpen && nextProps.enableKeyboardInput) {
        window.removeEventListener('keydown', this.handleKeyboardInput);
      }
    }
  }, {
    key: 'UNSAFE_componentWillUnmount',
    value: function UNSAFE_componentWillUnmount() {
      if (this.props.enableKeyboardInput) {
        window.removeEventListener('keydown', this.handleKeyboardInput);
      }
    }

    // ====================
    // Methods
    // ====================

  }, {
    key: 'preloadImg',
    value: function preloadImg(idx, onload) {
      var data = this.props.imgs[idx];

      if (!data) return;

      var img = new Image();
      var sourceSet = normalizeSourceSet(data);

      // Todo: add error handling for missing imgs
      img.onerror = onload;
      img.onload = onload;
      img.src = data.src;

      if (sourceSet) img.srcset = sourceSet;

      return img;
    }
  }, {
    key: 'gotoNext',
    value: function gotoNext(event) {
      var _props = this.props,
          currImg = _props.currImg,
          imgs = _props.imgs;
      var imgLoaded = this.state.imgLoaded;


      if (!imgLoaded || currImg === imgs.length - 1) return;

      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      this.props.onClickNext();
    }
  }, {
    key: 'gotoPrev',
    value: function gotoPrev(event) {
      var currImg = this.props.currImg;
      var imgLoaded = this.state.imgLoaded;


      if (!imgLoaded || currImg === 0) return;

      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      this.props.onClickPrev();
    }
  }, {
    key: 'closeBackdrop',
    value: function closeBackdrop(event) {
      if (event.target.id === 'viewerBackdrop' || event.target.tagName === 'FIGURE') {
        this.props.onClose();
      }
    }
  }, {
    key: 'handleKeyboardInput',
    value: function handleKeyboardInput(event) {
      var keyCode = event.keyCode;

      if (keyCode === 37 || keyCode === 33) {
        // left, up
        this.gotoPrev(event);
        return true;
      } else if (keyCode === 39 || keyCode === 34) {
        // right, down
        this.gotoNext(event);
        return true;
      } else if (keyCode === 27 || keyCode === 32) {
        // esc, space
        this.props.onClose();
        return true;
      }
      return false;
    }
  }, {
    key: 'handleImgLoaded',
    value: function handleImgLoaded() {
      this.setState({ imgLoaded: true });
    }

    // ====================
    // Renderers
    // ====================

  }, {
    key: 'renderArrowPrev',
    value: function renderArrowPrev() {
      if (this.props.currImg === 0) return null;

      return _react2.default.createElement(_Arrow2.default, {
        direction: 'left',
        icon: 'arrowLeft',
        onClick: this.gotoPrev,
        title: this.props.leftArrowTitle,
        type: 'button'
      });
    }
  }, {
    key: 'renderArrowNext',
    value: function renderArrowNext() {
      if (this.props.currImg === this.props.imgs.length - 1) return null;

      return _react2.default.createElement(_Arrow2.default, {
        direction: 'right',
        icon: 'arrowRight',
        onClick: this.gotoNext,
        title: this.props.rightArrowTitle,
        type: 'button'
      });
    }
  }, {
    key: 'renderDialog',
    value: function renderDialog() {
      var _props2 = this.props,
          backdropCloseable = _props2.backdropCloseable,
          isOpen = _props2.isOpen,
          showThumbnails = _props2.showThumbnails,
          width = _props2.width;
      var imgLoaded = this.state.imgLoaded;


      if (!isOpen) return _react2.default.createElement('span', { key: 'closed' });

      var offsetThumbnails = showThumbnails ? this.theme.thumnail.size + this.theme.container.gutter.vertical : 0;

      return _react2.default.createElement(
        _Container2.default,
        {
          key: 'open',
          onClick: backdropCloseable && this.closeBackdrop,
          onTouchEnd: backdropCloseable && this.closeBackdrop
        },
        _react2.default.createElement(
          _react.Fragment,
          null,
          _react2.default.createElement(
            'div',
            { className: (0, _aphrodite.css)(this.classes.content), style: { marginBottom: offsetThumbnails, maxWidth: width } },
            imgLoaded && this.renderHeader(),
            this.renderImgs(),
            this.renderSpinner(),
            imgLoaded && this.renderFooter()
          ),
          imgLoaded && this.renderThumbnails(),
          imgLoaded && this.renderArrowPrev(),
          imgLoaded && this.renderArrowNext(),
          this.props.preventScroll && _react2.default.createElement(_reactScrolllock2.default, null)
        )
      );
    }
  }, {
    key: 'renderImgs',
    value: function renderImgs() {
      var _props3 = this.props,
          currImg = _props3.currImg,
          imgs = _props3.imgs,
          onClickImg = _props3.onClickImg,
          showThumbnails = _props3.showThumbnails;
      var imgLoaded = this.state.imgLoaded;


      if (!imgs || !imgs.length) return null;

      var img = imgs[currImg];
      var sourceSet = normalizeSourceSet(img);
      var sizes = sourceSet ? '100vw' : null;

      var thumbnailsSize = showThumbnails ? this.theme.thumnail.size : 0;
      var heightOffset = this.theme.header.height + this.theme.footer.height + thumbnailsSize + this.theme.container.gutter.vertical + 'px';

      return _react2.default.createElement(
        'figure',
        { className: (0, _aphrodite.css)(this.classes.figure) },
        _react2.default.createElement('img', {
          className: (0, _aphrodite.css)(this.classes.img, imgLoaded && this.classes.imgLoaded),
          onClick: onClickImg,
          sizes: sizes,
          alt: img.alt,
          src: img.src,
          srcSet: sourceSet,
          style: {
            cursor: onClickImg ? 'pointer' : 'auto',
            maxHeight: 'calc(100vh - ' + heightOffset
          }
        })
      );
    }
  }, {
    key: 'renderThumbnails',
    value: function renderThumbnails() {
      var _props4 = this.props,
          imgs = _props4.imgs,
          currImg = _props4.currImg,
          onClickThumbnail = _props4.onClickThumbnail,
          showThumbnails = _props4.showThumbnails,
          thumbnailOffset = _props4.thumbnailOffset;


      if (!showThumbnails) return null;

      return _react2.default.createElement(_PaginatedThumbnails2.default, {
        currImg: currImg,
        imgs: imgs,
        offset: thumbnailOffset,
        onClickThumnail: onClickThumbnail
      });
    }
  }, {
    key: 'renderHeader',
    value: function renderHeader() {
      var _props5 = this.props,
          closeBtnTitle = _props5.closeBtnTitle,
          customControls = _props5.customControls,
          onClose = _props5.onClose,
          showCloseBtn = _props5.showCloseBtn;


      return _react2.default.createElement(_Header2.default, {
        customControls: customControls,
        onClose: onClose,
        showCloseBtn: showCloseBtn,
        closeBtnTitle: closeBtnTitle
      });
    }
  }, {
    key: 'renderFooter',
    value: function renderFooter() {
      var _props6 = this.props,
          currImg = _props6.currImg,
          imgs = _props6.imgs,
          imgCountSeparator = _props6.imgCountSeparator,
          showImgCount = _props6.showImgCount;


      if (!imgs || !imgs.length) return null;

      return _react2.default.createElement(_Footer2.default, {
        caption: imgs[currImg].caption,
        countCurr: currImg + 1,
        countSeparator: imgCountSeparator,
        countTotal: imgs.length,
        showCount: showImgCount
      });
    }
  }, {
    key: 'renderSpinner',
    value: function renderSpinner() {
      var _props7 = this.props,
          spinner = _props7.spinner,
          spinnerColor = _props7.spinnerColor,
          spinnerSize = _props7.spinnerSize;
      var imgLoaded = this.state.imgLoaded;

      var Spinner = spinner;

      return _react2.default.createElement(
        'div',
        { className: (0, _aphrodite.css)(this.classes.spinner, !imgLoaded && this.classes.spinnerActive) },
        _react2.default.createElement(Spinner, {
          color: spinnerColor,
          size: spinnerSize
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _Portal2.default,
        null,
        this.renderDialog()
      );
    }
  }]);

  return ImgsViewer;
}(_react.Component);

ImgsViewer.propTypes = {
  lang: _propTypes2.default.string,
  backdropCloseable: _propTypes2.default.bool,
  closeBtnTitle: _propTypes2.default.string,
  currImg: _propTypes2.default.number,
  customControls: _propTypes2.default.arrayOf(_propTypes2.default.node),
  enableKeyboardInput: _propTypes2.default.bool,
  imgCountSeparator: _propTypes2.default.string,
  imgs: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    src: _propTypes2.default.string.isRequired,
    srcSet: _propTypes2.default.array,
    caption: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
    thumnail: _propTypes2.default.string
  })).isRequired,
  isOpen: _propTypes2.default.bool,
  leftArrowTitle: _propTypes2.default.string,
  onClickImg: _propTypes2.default.func,
  onClickNext: _propTypes2.default.func,
  onClickPrev: _propTypes2.default.func,
  onClickThumbnail: _propTypes2.default.func,
  onClose: _propTypes2.default.func.isRequired,
  preloadNextImg: _propTypes2.default.bool,
  preventScroll: _propTypes2.default.bool,
  rightArrowTitle: _propTypes2.default.string,
  showCloseBtn: _propTypes2.default.bool,
  showImgCount: _propTypes2.default.bool,
  showThumbnails: _propTypes2.default.bool,
  spinner: _propTypes2.default.func,
  spinnerColor: _propTypes2.default.string,
  spinnerSize: _propTypes2.default.number,
  theme: _propTypes2.default.object,
  thumbnailOffset: _propTypes2.default.number,
  width: _propTypes2.default.number
};
ImgsViewer.defaultProps = {
  lang: 'zh_CN',
  closeBtnTitle: '关闭（空格键）',
  currImg: 0,
  enableKeyboardInput: true,
  imgCountSeparator: ' / ',
  leftArrowTitle: '上一张（向左键）',
  onClickShowNextImg: true,
  preloadNextImg: true,
  preventScroll: true,
  rightArrowTitle: '下一张（向右键）',
  showCloseBtn: true,
  showImgCount: true,
  spinner: _Spinner2.default,
  spinnerColor: '#fff',
  spinnerSize: 100,
  theme: {},
  thumbnailOffset: 2,
  width: 1024
};
ImgsViewer.childContextTypes = {
  theme: _propTypes2.default.object.isRequired
};

var defaultStyles = {
  content: {
    position: 'relative'
  },
  figure: {
    margin: 0 // remove browser default
  },
  img: {
    display: 'block', // removes browser default gutter
    height: 'auto',
    margin: '0 auto', // main center on very short screens or very narrow img
    maxWidth: '100%',

    // disable user select
    WebkitTouchCallout: 'none',
    userSelect: 'none',

    // opacity animation on image load
    opacity: 0,
    transition: 'opacity .3s'
  },
  imgLoaded: {
    opcaty: 1
  },
  spinner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    // opacity animation to make spinner appear with delay
    opacity: 0,
    transition: 'opacity .3s'
  },
  spinnerActive: {
    opacity: 1
  }
};

exports.default = ImgsViewer;