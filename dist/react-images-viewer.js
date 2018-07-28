(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('prop-types'), require('react'), require('aphrodite/no-important'), require('react-transition-group'), require('react-dom'), require('aphrodite'), require('react-scrolllock')) :
  typeof define === 'function' && define.amd ? define(['prop-types', 'react', 'aphrodite/no-important', 'react-transition-group', 'react-dom', 'aphrodite', 'react-scrolllock'], factory) :
  (global.ImgsViewer = factory(global.PropTypes,global.React,global.aphrodite,global.ReactTransitionGroup,global.ReactDOM,global.aphrodite,global.ScrollLock));
}(this, (function (PropTypes,React,noImportant,reactTransitionGroup,reactDom,aphrodite,ScrollLock) { 'use strict';

  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
  var React__default = 'default' in React ? React['default'] : React;
  ScrollLock = ScrollLock && ScrollLock.hasOwnProperty('default') ? ScrollLock['default'] : ScrollLock;

  // ===================
  // Theme
  // ===================

  var theme = {};

  // container
  theme.container = {
    background: 'rgba(0, 0, 0, .8)',
    gutter: {
      horizontal: 10,
      vertical: 10
    },
    zIndex: 2001

    // header
  };theme.header = {
    height: 40
  };
  theme.close = {
    fill: 'white'

    // footer
  };theme.footer = {
    color: '#fff',
    count: {
      color: 'rgba(255, 255, 255, .75)',
      fontSize: '.85em'
    },
    height: 40,
    gutter: {
      horizontal: 0,
      vertical: 5
    }

    // thumbnails
  };theme.thumbnail = {
    activeBorderColor: '#fff',
    size: 50,
    gutter: 2

    // arrow
  };theme.arrow = {
    background: 'none',
    fill: '#fff',
    height: 120
  };

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var objectWithoutProperties = function (obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

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

  var canUseDom = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

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

  var arrowLeft = (function (fill) {
  		return "<svg fill=\"" + fill + "\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"100%\" height=\"100%\" viewBox=\"0 0 512 512\" xml:space=\"preserve\">\n\t\t<path d=\"M213.7,256L213.7,256L213.7,256L380.9,81.9c4.2-4.3,4.1-11.4-0.2-15.8l-29.9-30.6c-4.3-4.4-11.3-4.5-15.5-0.2L131.1,247.9 c-2.2,2.2-3.2,5.2-3,8.1c-0.1,3,0.9,5.9,3,8.1l204.2,212.7c4.2,4.3,11.2,4.2,15.5-0.2l29.9-30.6c4.3-4.4,4.4-11.5,0.2-15.8 L213.7,256z\"/>\n\t</svg>";
  });

  var arrowRight = (function (fill) {
  		return "<svg fill=\"" + fill + "\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"100%\" height=\"100%\" viewBox=\"0 0 512 512\" xml:space=\"preserve\">\n\t\t<path d=\"M298.3,256L298.3,256L298.3,256L131.1,81.9c-4.2-4.3-4.1-11.4,0.2-15.8l29.9-30.6c4.3-4.4,11.3-4.5,15.5-0.2l204.2,212.7 c2.2,2.2,3.2,5.2,3,8.1c0.1,3-0.9,5.9-3,8.1L176.7,476.8c-4.2,4.3-11.2,4.2-15.5-0.2L131.3,446c-4.3-4.4-4.4-11.5-0.2-15.8 L298.3,256z\"/>\n\t</svg>";
  });

  var close = (function (fill) {
  	return "<svg fill=\"" + fill + "\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"100%\" height=\"100%\" viewBox=\"0 0 512 512\" style=\"enable-background:new 0 0 512 512;\" xml:space=\"preserve\">\n\t\t<path d=\"M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4 L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1 c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1 c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z\"/>\n\t</svg>";
  });

  var icons = { arrowLeft: arrowLeft, arrowRight: arrowRight, close: close };

  var Icon = function Icon(_ref) {
    var fill = _ref.fill,
        type = _ref.type,
        props = objectWithoutProperties(_ref, ['fill', 'type']);

    var icon = icons[type];

    return React__default.createElement('span', _extends({
      dangerouslySetInnerHTML: { __html: icon(fill) }
    }, props));
  };

  Icon.propTypes = {
    fill: PropTypes.string,
    type: PropTypes.oneOf(Object.keys(icons))
  };
  Icon.defaultProps = {
    fill: '#fff'
  };

  function Arrow(_ref) {
    var direction = _ref.direction,
        icon = _ref.icon,
        onClick = _ref.onClick,
        size = _ref.size,
        theme$$1 = _ref.theme,
        props = objectWithoutProperties(_ref, ['direction', 'icon', 'onClick', 'size', 'theme']);

    var classes = noImportant.StyleSheet.create(deepMerge(defaultStyles, theme$$1));

    return React__default.createElement(
      'button',
      _extends({
        type: 'button' // default: submit
        , className: noImportant.css(classes.arrow, classes['arrow__direction__' + direction], size && classes['arrow__size__' + size]),
        onClick: onClick,
        onTouchEnd: onClick
      }, props),
      React__default.createElement(Icon, { fill: !!theme$$1.arrow && theme$$1.arrow.fill || theme.arrow.fill, type: icon })
    );
  }

  Arrow.propTypes = {
    theme: PropTypes.object,
    direction: PropTypes.oneOf(['left', 'right']),
    icon: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    size: PropTypes.oneOf(['medium', 'small']).isRequired
  };
  Arrow.defaultProps = {
    size: 'medium'
  };
  var defaultStyles = {
    arrow: {
      background: 'none',
      border: 'none',
      borderRadius: 4,
      cursor: 'pointer',
      outline: 'none',
      padding: 10, // increase hit area
      position: 'absolute',
      top: '50%',

      // disable user select
      WebkitTouchCallout: 'none',
      userSelect: 'none'
    },

    // sizes
    arrow__size__medium: {
      height: theme.arrow.height,
      marginTop: theme.arrow.height / -2,
      width: 40,

      '@media (min-width: 768px)': {
        width: 70
      }
    },
    arrow__size__small: {
      height: theme.thumbnail.size,
      marginTop: theme.thumbnail.size / -2,
      width: 30,

      '@media (min-width: 500px)': {
        width: 40
      }
    },

    // direciton
    arrow__direction__right: {
      right: theme.container.gutter.horizontal
    },
    arrow__direction__left: {
      left: theme.container.gutter.horizontal
    }
  };

  function Container(props) {
    var classes = noImportant.StyleSheet.create(deepMerge(defaultStyles$1, props.theme));

    return React__default.createElement('div', _extends({
      id: 'viewerBackdrop',
      className: noImportant.css(classes.container)
    }, props));
  }

  Container.propTypes = {
    theme: PropTypes.object
  };

  var defaultStyles$1 = {
    container: {
      alignItems: 'center',
      backdropColor: theme.container.background,
      boxSizing: 'border-box',
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      left: 0,
      paddingTop: theme.container.gutter.vertical,
      paddingRight: theme.container.gutter.horizontal,
      paddingBottom: theme.container.gutter.vertical,
      paddingLeft: theme.container.gutter.horizontal,
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: theme.container.zIndex
    }
  };

  function Footer(_ref) {
    var caption = _ref.caption,
        countCurr = _ref.countCurr,
        countSeparator = _ref.countSeparator,
        countTotal = _ref.countTotal,
        showCount = _ref.showCount,
        theme$$1 = _ref.theme,
        props = objectWithoutProperties(_ref, ['caption', 'countCurr', 'countSeparator', 'countTotal', 'showCount', 'theme']);

    if (!caption && !showCount) return null;

    var classes = noImportant.StyleSheet.create(deepMerge(defaultStyles$2, theme$$1));

    var imgCount = showCount ? React__default.createElement(
      'div',
      { className: noImportant.css(classes.footerCount) },
      countCurr,
      countSeparator,
      countTotal
    ) : React__default.createElement('span', null);

    return React__default.createElement(
      'div',
      _extends({ className: noImportant.css(classes.footer) }, props),
      caption ? React__default.createElement(
        'figcaption',
        { className: noImportant.css(classes.footerCaption) },
        caption
      ) : React__default.createElement('span', null),
      imgCount
    );
  }

  Footer.propTypes = {
    theme: PropTypes.object,
    caption: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    countCurr: PropTypes.number,
    countSeparator: PropTypes.string,
    countTotal: PropTypes.number,
    showCount: PropTypes.bool
  };

  var defaultStyles$2 = {
    footer: {
      boxSizing: 'border-box',
      color: theme.footer.color,
      cursor: 'auto',
      display: 'flex',
      justifyContent: 'space-between',
      left: 0,
      lineHeight: 1.3,
      paddingTop: theme.footer.gutter.vertical,
      paddingRight: theme.footer.gutter.horizontal,
      paddingBottom: theme.footer.gutter.vertical,
      paddingLeft: theme.footer.gutter.horizontal
    },
    footerCount: {
      color: theme.footer.count.color,
      fontSize: theme.footer.count.fontSize,
      paddingLeft: '1em' // add a small gutter for the caption
    },
    footerCaption: {
      flex: '1 1 0'
    }
  };

  function Header(_ref) {
    var customControls = _ref.customControls,
        onClose = _ref.onClose,
        showCloseBtn = _ref.showCloseBtn,
        closeBtnTitle = _ref.closeBtnTitle,
        theme$$1 = _ref.theme,
        props = objectWithoutProperties(_ref, ['customControls', 'onClose', 'showCloseBtn', 'closeBtnTitle', 'theme']);

    var classes = noImportant.StyleSheet.create(deepMerge(defaultStyles$3, theme$$1));

    return React__default.createElement(
      'div',
      _extends({ className: noImportant.css(classes.header) }, props),
      customControls ? customControls : React__default.createElement('span', null),
      !!showCloseBtn && React__default.createElement(
        'button',
        {
          title: closeBtnTitle,
          className: noImportant.css(classes.close),
          onClick: onClose
        },
        React__default.createElement(Icon, { fill: !!theme$$1.close && theme$$1.close.fill || theme.close.fill, type: 'close' })
      )
    );
  }

  Header.propTypes = {
    theme: PropTypes.object,
    customControls: PropTypes.array,
    onClose: PropTypes.func.isRequired,
    showCloseBtn: PropTypes.bool,
    closeBtnTitle: PropTypes.string
  };

  var defaultStyles$3 = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      height: theme.header.height
    },
    close: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      outline: 'none',
      position: 'relative',
      top: 0,
      verticalAlign: 'bottom',
      zIndex: 1,

      // increase hit area
      height: 40,
      marginRight: -10,
      padding: 10,
      width: 40
    }
  };

  function Thumbnail(_ref) {
    var index = _ref.index,
        src = _ref.src,
        thumbnail = _ref.thumbnail,
        active = _ref.active,
        _onClick = _ref.onClick,
        theme$$1 = _ref.theme;

    var url = thumbnail || src;
    var classes = noImportant.StyleSheet.create(deepMerge(defaultStyles$4, theme$$1));

    return React__default.createElement('div', {
      className: noImportant.css(classes.thumbnail, active && classes.thumbnail__active),
      onClick: function onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        _onClick(index);
      },
      style: { backgroundImage: 'url("' + url + '")' }
    });
  }

  Thumbnail.propTypes = {
    theme: PropTypes.object,
    active: PropTypes.bool,
    index: PropTypes.number,
    onClick: PropTypes.func.isRequired,
    src: PropTypes.string,
    thumbnail: PropTypes.string
  };

  var defaultStyles$4 = {
    thumbnail: {
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      borderRadius: 2,
      boxShadow: 'inset 0 0 0 1px hsla(0, 0%, 100%, .2)',
      cursor: 'pointer',
      display: 'inline-block',
      height: theme.thumbnail.size,
      margin: theme.thumbnail.gutter,
      overflow: 'hidden',
      width: theme.thumbnail.size
    },
    thumbnail__active: {
      boxShadow: 'inset 0 0 0 2px ' + theme.thumbnail.activeBorderColor
    }
  };

  var classes = noImportant.StyleSheet.create({
    paginatedThumbnails: {
      bottom: theme.container.gutter.vertical,
      height: theme.thumbnail.size,
      padding: '0 50px',
      position: 'absolute',
      textAlign: 'center',
      whiteSpace: 'nowrap',
      left: '50%',
      transform: 'translateX(-50%)'
    }
  });

  var arrowStyles = {
    height: theme.thumbnail.size + theme.thumbnail.gutter * 2,
    width: 40
  };

  var PaginatedThumbnails = function (_Component) {
    inherits(PaginatedThumbnails, _Component);

    function PaginatedThumbnails(props) {
      classCallCheck(this, PaginatedThumbnails);

      var _this = possibleConstructorReturn(this, (PaginatedThumbnails.__proto__ || Object.getPrototypeOf(PaginatedThumbnails)).call(this, props));

      _this.state = {
        hasCustomPage: false
      };

      _this.gotoPrev = _this.gotoPrev.bind(_this);
      _this.gotoNext = _this.gotoNext.bind(_this);
      return _this;
    }

    createClass(PaginatedThumbnails, [{
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
      value: function renderArrowPrev(theme$$1) {
        var leftTitle = this.props.leftTitle;

        if (this.getFirst() <= 0) return null;

        return React__default.createElement(Arrow, {
          theme: theme$$1,
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
      value: function renderArrowNext(theme$$1) {
        var _props3 = this.props,
            offset = _props3.offset,
            imgs = _props3.imgs,
            rightTitle = _props3.rightTitle;

        var totalCount = 2 * offset + 1;
        if (this.getFirst() + totalCount >= imgs.length) return null;

        return React__default.createElement(Arrow, {
          theme: theme$$1,
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
            theme$$1 = _props4.theme;


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

        return React__default.createElement(
          'div',
          { className: noImportant.css(classes.paginatedThumbnails) },
          this.renderArrowPrev(theme$$1),
          thumbnails.map(function (img, idx) {
            return React__default.createElement(Thumbnail, _extends({
              theme: theme$$1,
              key: baseOffset + idx
            }, img, {
              index: baseOffset + idx,
              onClick: onClickThumbnail,
              active: baseOffset + idx === currImg
            }));
          }),
          this.renderArrowNext(theme$$1)
        );
      }
    }]);
    return PaginatedThumbnails;
  }(React.Component);


  PaginatedThumbnails.propTypes = {
    theme: PropTypes.object,
    leftTitle: PropTypes.string,
    rightTitle: PropTypes.string,
    currImg: PropTypes.number,
    imgs: PropTypes.array,
    offset: PropTypes.number,
    onClickThumbnail: PropTypes.func.isRequired
  };

  var Portal = function (_Component) {
    inherits(Portal, _Component);

    function Portal() {
      classCallCheck(this, Portal);

      var _this = possibleConstructorReturn(this, (Portal.__proto__ || Object.getPrototypeOf(Portal)).call(this));

      _this.portalElement = null;
      return _this;
    }

    createClass(Portal, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var p = document.createElement('div');
        document.body.appendChild(p);
        this.portalElement = p;
        this.componentDidUpdate();
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        // Animate fade on mount/unmount
        var duration = 200;
        var styles = '\n\t\t\t\t.fade-enter { opacity: 0.01; }\n\t\t\t\t.fade-enter.fade-enter-active { opacity: 1; transition: opacity ' + duration + 'ms; }\n\t\t\t\t.fade-leave { opacity: 1; }\n\t\t\t\t.fade-leave.fade-leave-active { opacity: .01; transition: opacity ' + duration + 'ms; }\n\t\t';

        reactDom.render(React__default.createElement(
          'div',
          null,
          React__default.createElement(
            'style',
            null,
            styles
          ),
          React__default.createElement(
            reactTransitionGroup.TransitionGroup,
            this.props,
            React__default.createElement(
              reactTransitionGroup.CSSTransition,
              { timeout: { enter: duration, exit: duration }, className: 'fade' },
              this.props.children
            )
          )
        ), this.portalElement);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        reactDom.unmountComponentAtNode(this.portalElement);
        document.body.removeChild(this.portalElement);
      }
    }, {
      key: 'render',
      value: function render() {
        return null;
      }
    }]);
    return Portal;
  }(React.Component);


  Portal.propTypes = {
    children: PropTypes.element
  };

  var Spinner = function Spinner(props) {
    var classes = noImportant.StyleSheet.create(styles(props));

    return React__default.createElement(
      'div',
      { className: noImportant.css(classes.bouncingLoader) },
      React__default.createElement('div', { className: noImportant.css(classes.child) }),
      React__default.createElement('div', { className: noImportant.css(classes.child, classes.child2) }),
      React__default.createElement('div', { className: noImportant.css(classes.child, classes.child3) })
    );
  };

  Spinner.propTypes = {
    color: PropTypes.string,
    size: PropTypes.number
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

  function normalizeSourceSet(data) {
    var sourceSet = data.srcSet || data.srcset;

    if (Array.isArray(sourceSet)) {
      return sourceSet.join();
    }

    return sourceSet;
  }

  var ThemeContext = React__default.createContext(theme);

  var ImgsViewer = function (_Component) {
    inherits(ImgsViewer, _Component);

    function ImgsViewer(props) {
      classCallCheck(this, ImgsViewer);

      var _this = possibleConstructorReturn(this, (ImgsViewer.__proto__ || Object.getPrototypeOf(ImgsViewer)).call(this, props));

      _this.theme = deepMerge(theme, _this.props.theme);
      _this.classes = aphrodite.StyleSheet.create(deepMerge(defaultStyles$5, _this.props.theme));
      _this.state = { imgLoaded: false };

      bindFunctions.call(_this, ['gotoNext', 'gotoPrev', 'closeBackdrop', 'handleKeyboardInput', 'handleImgLoaded']);
      return _this;
    }

    createClass(ImgsViewer, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (this.props.isOpen) {
          if (this.props.enableKeyboardInput) {
            window.addEventListener('keydown', this.handleKeyboardInput);
          }
          if (typeof this.props.currImg === 'number') {
            this.preloadImg(this.props.currImg, this.handleImgLoaded);
          }
        }
      }
      // static getDerivedStateFromProps (nextProps, prevState) {

    }, {
      key: 'UNSAFE_componentWillReceiveProps',
      value: function UNSAFE_componentWillReceiveProps(nextProps) {
        if (!canUseDom) return;

        // const instance = this

        // always to preload imgs with both directions
        // then when user changs direction, img also show quickly
        if (nextProps.preloadNextImg) {
          var nextIdx = nextProps.currImg + 1;
          var prevIdx = nextProps.currImg - 1;
          // debugger
          // if (!this) return null
          this.preloadImg(prevIdx);
          this.preloadImg(nextIdx);
        }
        // preload currImg
        if (this.props.currImg !== nextProps.currImg || !this.props.isOpen && nextProps.isOpen) {
          var img = this.preloadImgData(nextProps.imgs[nextProps.currImg], this.handleImgLoaded);
          if (img) this.setState({ imgLoaded: img.complete });
        }

        // add/remove event listeners
        if (!this.props.isOpen && nextProps.isOpen && nextProps.enableKeyboardInput) {
          window.addEventListener('keydown', this.handleKeyboardInput);
        }
        if (!nextProps.isOpen && nextProps.enableKeyboardInput) {
          window.removeEventListener('keydown', this.handleKeyboardInput);
        }

        return null;
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
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
        return this.prelaodImgData(this.props.imgs[idx], onload);
      }
    }, {
      key: 'preloadImgData',
      value: function preloadImgData(data, onload) {
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

        if (keyCode === 37 || keyCode === 33 || keyCode === 38) {
          // left, pageup, up
          this.gotoPrev(event);
          return true;
        } else if (keyCode === 39 || keyCode === 34 || keyCode === 40) {
          // right, pagedown, down
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
      value: function renderArrowPrev(theme$$1) {
        if (this.props.currImg === 0) return null;

        return React__default.createElement(Arrow, {
          theme: theme$$1,
          direction: 'left',
          icon: 'arrowLeft',
          onClick: this.gotoPrev,
          title: this.props.leftArrowTitle,
          type: 'button'
        });
      }
    }, {
      key: 'renderArrowNext',
      value: function renderArrowNext(theme$$1) {
        if (this.props.currImg === this.props.imgs.length - 1) return null;

        return React__default.createElement(Arrow, {
          theme: theme$$1,
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
        var _this2 = this;

        var _props2 = this.props,
            backdropCloseable = _props2.backdropCloseable,
            isOpen = _props2.isOpen,
            showThumbnails = _props2.showThumbnails,
            width = _props2.width;
        var imgLoaded = this.state.imgLoaded;


        if (!isOpen) return React__default.createElement('span', { key: 'closed' });

        var offsetThumbnails = showThumbnails ? this.theme.thumbnail.size + this.theme.container.gutter.vertical : 0;

        return React__default.createElement(
          ThemeContext.Consumer,
          null,
          function (theme$$1) {
            return React__default.createElement(
              Container,
              {
                theme: theme$$1,
                key: 'open',
                onClick: backdropCloseable && _this2.closeBackdrop,
                onTouchEnd: backdropCloseable && _this2.closeBackdrop
              },
              React__default.createElement(
                React.Fragment,
                null,
                React__default.createElement(
                  'div',
                  { className: aphrodite.css(_this2.classes.content), style: { marginBottom: offsetThumbnails, maxWidth: width } },
                  imgLoaded && _this2.renderHeader(theme$$1),
                  _this2.renderImgs(),
                  _this2.renderSpinner(),
                  imgLoaded && _this2.renderFooter(theme$$1)
                ),
                imgLoaded && _this2.renderThumbnails(theme$$1),
                imgLoaded && _this2.renderArrowPrev(theme$$1),
                imgLoaded && _this2.renderArrowNext(theme$$1),
                _this2.props.preventScroll && React__default.createElement(ScrollLock, null)
              )
            );
          }
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

        var thumbnailsSize = showThumbnails ? this.theme.thumbnail.size : 0;
        var heightOffset = this.theme.header.height + this.theme.footer.height + thumbnailsSize + this.theme.container.gutter.vertical + 'px';

        return React__default.createElement(
          'figure',
          { className: aphrodite.css(this.classes.figure) },
          React__default.createElement('img', {
            className: aphrodite.css(this.classes.img, imgLoaded && this.classes.imgLoaded),
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
      value: function renderThumbnails(theme$$1) {
        var _props4 = this.props,
            imgs = _props4.imgs,
            currImg = _props4.currImg,
            leftArrowTitle = _props4.leftArrowTitle,
            rightArrowTitle = _props4.rightArrowTitle,
            onClickThumbnail = _props4.onClickThumbnail,
            showThumbnails = _props4.showThumbnails,
            thumbnailOffset = _props4.thumbnailOffset;


        if (!showThumbnails) return null;

        return React__default.createElement(PaginatedThumbnails, {
          theme: theme$$1,
          leftTitle: leftArrowTitle,
          rightTitle: rightArrowTitle,
          currImg: currImg,
          imgs: imgs,
          offset: thumbnailOffset,
          onClickThumbnail: onClickThumbnail
        });
      }
    }, {
      key: 'renderHeader',
      value: function renderHeader(theme$$1) {
        var _props5 = this.props,
            closeBtnTitle = _props5.closeBtnTitle,
            customControls = _props5.customControls,
            onClose = _props5.onClose,
            showCloseBtn = _props5.showCloseBtn;


        return React__default.createElement(Header, {
          theme: theme$$1,
          customControls: customControls,
          onClose: onClose,
          showCloseBtn: showCloseBtn,
          closeBtnTitle: closeBtnTitle
        });
      }
    }, {
      key: 'renderFooter',
      value: function renderFooter(theme$$1) {
        var _props6 = this.props,
            currImg = _props6.currImg,
            imgs = _props6.imgs,
            imgCountSeparator = _props6.imgCountSeparator,
            showImgCount = _props6.showImgCount;


        if (!imgs || !imgs.length) return null;

        return React__default.createElement(Footer, {
          theme: theme$$1,
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

        var Spinner$$1 = spinner;

        return React__default.createElement(
          'div',
          { className: aphrodite.css(this.classes.spinner, !imgLoaded && this.classes.spinnerActive) },
          React__default.createElement(Spinner$$1, {
            color: spinnerColor,
            size: spinnerSize
          })
        );
      }
    }, {
      key: 'render',
      value: function render() {
        return React__default.createElement(
          ThemeContext.Provider,
          { value: this.props.theme },
          React__default.createElement(
            Portal,
            null,
            this.renderDialog()
          )
        );
      }
    }]);
    return ImgsViewer;
  }(React.Component);

  ImgsViewer.propTypes = {
    backdropCloseable: PropTypes.bool,
    closeBtnTitle: PropTypes.string,
    currImg: PropTypes.number,
    customControls: PropTypes.arrayOf(PropTypes.node),
    enableKeyboardInput: PropTypes.bool,
    imgCountSeparator: PropTypes.string,
    imgs: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      srcSet: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
      caption: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
      thumbnail: PropTypes.string
    })).isRequired,
    isOpen: PropTypes.bool,
    leftArrowTitle: PropTypes.string,
    onClickImg: PropTypes.func,
    onClickNext: PropTypes.func,
    onClickPrev: PropTypes.func,
    onClickThumbnail: PropTypes.func,
    onClose: PropTypes.func.isRequired,
    preloadNextImg: PropTypes.bool,
    preventScroll: PropTypes.bool,
    rightArrowTitle: PropTypes.string,
    showCloseBtn: PropTypes.bool,
    showImgCount: PropTypes.bool,
    showThumbnails: PropTypes.bool,
    spinner: PropTypes.func,
    spinnerColor: PropTypes.string,
    spinnerSize: PropTypes.number,
    theme: PropTypes.object,
    thumbnailOffset: PropTypes.number,
    width: PropTypes.number
  };
  ImgsViewer.defaultProps = {
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
    spinner: Spinner,
    spinnerColor: '#fff',
    spinnerSize: 50,
    theme: {},
    thumbnailOffset: 2,
    width: 1024
  };

  var defaultStyles$5 = {
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
      opacity: 1
    },
    spinner: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',

      // opacity animation to make spinner appear with delay
      opacity: 0,
      transition: 'opacity .3s',
      pointerEvents: 'none'
    },
    spinnerActive: {
      opacity: 1
    }
  };

  return ImgsViewer;

})));
