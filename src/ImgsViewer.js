import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { StyleSheet, css } from 'aphrodite'
import ScrollLock from 'react-scrolllock'

import defaultTheme from './theme'
import Arrow from './components/Arrow'
import Container from './components/Container'
import Footer from './components/Footer'
import Header from './components/Header'
import PaginatedThumbnails from './components/PaginatedThumbnails'
import Portal from './components/Portal'
import DefaultSpinner from './components/Spinner'

import { bindFunctions, canUseDom, deepMerge } from './utils/util'

function normalizeSourceSet(data) {
  const sourceSet = data.srcSet || data.srcset

  if (Array.isArray(sourceSet)) {
    return sourceSet.join()
  }

  return sourceSet
}

const ThemeContext = React.createContext(defaultTheme)

class ImgsViewer extends Component {
  constructor (props) {
    super(props)

    this.theme = deepMerge(defaultTheme, this.props.theme)
    this.classes = StyleSheet.create(deepMerge(defaultStyles, this.props.theme))
    this.state = { imgLoaded: false }

    bindFunctions.call(this, [
      'gotoNext',
      'gotoPrev',
      'closeBackdrop',
      'handleKeyboardInput',
      'handleImgLoaded'
    ])
  }
  componentDidMount () {
    if (this.props.isOpen) {
      if (this.props.enableKeyboardInput) {
        window.addEventListener('keydown', this.handleKeyboardInput)
      }
      if (typeof this.props.currImg === 'number') {
        this.preloadImg(this.props.currImg, this.handleImgLoaded)
      }
    }
  }
  // static getDerivedStateFromProps (nextProps, prevState) {
  UNSAFE_componentWillReceiveProps (nextProps) {
    if (!canUseDom) return

    // const instance = this

    // always to preload imgs with both directions
    // then when user changs direction, img also show quickly
    if (nextProps.preloadNextImg) {
      const nextIdx = nextProps.currImg + 1
      const prevIdx = nextProps.currImg - 1
      // debugger
      // if (!this) return null
      this.preloadImg(prevIdx)
      this.preloadImg(nextIdx)
    }
    // preload currImg
    if (this.props.currImg !== nextProps.currImg || !this.props.isOpen && nextProps.isOpen) {
      const img = this.preloadImg(nextProps.currImg, this.handleImgLoaded)
      this.setState({ imgLoaded: img.complete })
    }

    // add/remove event listeners
    if (!this.props.isOpen && nextProps.isOpen && nextProps.enableKeyboardInput) {
      window.addEventListener('keydown', this.handleKeyboardInput)
    }
    if (!nextProps.isOpen && nextProps.enableKeyboardInput) {
      window.removeEventListener('keydown', this.handleKeyboardInput)
    }

    return null
  }
  componentWillUnmount () {
    if (this.props.enableKeyboardInput) {
      window.removeEventListener('keydown', this.handleKeyboardInput)
    }
  }

  // ====================
  // Methods
  // ====================

  preloadImg (idx, onload) {
    const data = this.props.imgs[idx]

    if(!data) return

    const img = new Image()
    const sourceSet = normalizeSourceSet(data)

    // Todo: add error handling for missing imgs
    img.onerror = onload
    img.onload = onload
    img.src = data.src

    if (sourceSet) img.srcset = sourceSet

    return img

  }
  gotoNext (event) {
    const { currImg, imgs } = this.props
    const { imgLoaded } = this.state

    if (!imgLoaded || currImg === (imgs.length - 1)) return

    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }

    this.props.onClickNext()
  }
  gotoPrev (event) {
    const { currImg } = this.props
    const { imgLoaded } = this.state

    if (!imgLoaded || currImg === 0) return

    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }

    this.props.onClickPrev()
  }
  closeBackdrop (event) {
    if (event.target.id === 'viewerBackdrop' || event.target.tagName === 'FIGURE') {
      this.props.onClose()
    }
  }
  handleKeyboardInput (event) {
    const { keyCode } = event
    if (keyCode === 37 || keyCode === 33 || keyCode === 38) { // left, pageup, up
      this.gotoPrev(event)
      return true
    } else if (keyCode === 39 || keyCode === 34 || keyCode === 40) { // right, pagedown, down
      this.gotoNext(event)
      return true
    } else if (keyCode === 27 || keyCode === 32) { // esc, space
      this.props.onClose()
      return true
    }
    return false
  }
  handleImgLoaded () {
    this.setState({ imgLoaded: true })
  }

  // ====================
  // Renderers
  // ====================

  renderArrowPrev (theme) {
    if (this.props.currImg === 0) return null

    return (
      <Arrow
        theme={theme}
        direction="left"
        icon="arrowLeft"
        onClick={this.gotoPrev}
        title={this.props.leftArrowTitle}
        type="button"
      />
    )
  }
  renderArrowNext (theme) {
    if (this.props.currImg === (this.props.imgs.length - 1)) return null

    return (
      <Arrow
        theme={theme}
        direction="right"
        icon="arrowRight"
        onClick={this.gotoNext}
        title={this.props.rightArrowTitle}
        type="button"
      />
    )
  }
  renderDialog () {
    const { backdropCloseable, isOpen, showThumbnails, width, } = this.props

    const { imgLoaded } = this.state

    if (!isOpen) return <span key="closed" />

    const offsetThumbnails = showThumbnails ? this.theme.thumbnail.size + this.theme.container.gutter.vertical : 0

    return (
      <ThemeContext.Consumer>
        {theme => (
          <Container
            theme={theme}
            key="open"
            onClick={backdropCloseable && this.closeBackdrop}
            onTouchEnd={backdropCloseable && this.closeBackdrop}
          >
            <Fragment>
              <div className={css(this.classes.content)} style={{ marginBottom: offsetThumbnails, maxWidth: width }}>
                {imgLoaded && this.renderHeader(theme)}
                {this.renderImgs()}
                {this.renderSpinner()}
                {imgLoaded && this.renderFooter(theme)}
              </div>
              {imgLoaded && this.renderThumbnails(theme)}
              {imgLoaded && this.renderArrowPrev(theme)}
              {imgLoaded && this.renderArrowNext(theme)}
              {this.props.preventScroll && <ScrollLock />}
            </Fragment>
          </Container>
        )}
      </ThemeContext.Consumer>
    )
  }
  renderImgs () {
    const { currImg, imgs, onClickImg, showThumbnails } = this.props

    const { imgLoaded } = this.state

    if (!imgs || !imgs.length) return null

    const img = imgs[currImg]
    const sourceSet = normalizeSourceSet(img)
    const sizes = sourceSet ? '100vw' : null

    const thumbnailsSize = showThumbnails ? this.theme.thumbnail.size : 0
    const heightOffset = `${this.theme.header.height + this.theme.footer.height + thumbnailsSize + (this.theme.container.gutter.vertical)}px`

    return (
      <figure className={css(this.classes.figure)}>
        {/* Re-implement when react warning 'unknown props'
        https://fb.me/react-unknown-props is resolved
        <Swipeable onSwipedLeft={this.gotonext} onSwipedRight={this.gotoPrev} /> */}
        <img
          className={css(this.classes.img, imgLoaded && this.classes.imgLoaded)}
          onClick={onClickImg}
          sizes={sizes}
          alt={img.alt}
          src={img.src}
          srcSet={sourceSet}
          style={{
            cursor: onClickImg ? 'pointer' : 'auto',
            maxHeight: `calc(100vh - ${heightOffset}`,
          }}
        />
      </figure>
    )
  }
  renderThumbnails (theme) {
    const { imgs, currImg, leftArrowTitle, rightArrowTitle, onClickThumbnail, showThumbnails, thumbnailOffset } = this.props

    if (!showThumbnails) return null

    return (
      <PaginatedThumbnails
        theme={theme}
        leftTitle={leftArrowTitle}
        rightTitle={rightArrowTitle}
        currImg={currImg}
        imgs={imgs}
        offset={thumbnailOffset}
        onClickThumbnail={onClickThumbnail}
      />
    )
  }
  renderHeader (theme) {
    const { closeBtnTitle, customControls, onClose, showCloseBtn } = this.props

    return (
      <Header
        theme={theme}
        customControls={customControls}
        onClose={onClose}
        showCloseBtn={showCloseBtn}
        closeBtnTitle={closeBtnTitle}
      />
    )
  }
  renderFooter (theme) {
    const { currImg, imgs, imgCountSeparator, showImgCount } = this.props

    if (!imgs || !imgs.length) return null

    return (
      <Footer
        theme={theme}
        caption={imgs[currImg].caption}
        countCurr={currImg + 1}
        countSeparator={imgCountSeparator}
        countTotal={imgs.length}
        showCount={showImgCount}
      />
    )
  }
  renderSpinner () {
    const { spinner, spinnerColor, spinnerSize } = this.props

    const { imgLoaded } = this.state
    const Spinner = spinner

    return (
      <div className={css(this.classes.spinner, !imgLoaded && this.classes.spinnerActive)}>
        <Spinner
          color={spinnerColor}
          size={spinnerSize}
        />
      </div>
    )
  }
  render () {
    return (
      <ThemeContext.Provider value={this.props.theme}>
        <Portal>
          {this.renderDialog()}
        </Portal>
      </ThemeContext.Provider>
    )
  }
}

ImgsViewer.propTypes = {
  lang: PropTypes.string,
  backdropCloseable: PropTypes.bool,
  closeBtnTitle: PropTypes.string,
  currImg: PropTypes.number,
  customControls: PropTypes.arrayOf(PropTypes.node),
  enableKeyboardInput: PropTypes.bool,
  imgCountSeparator: PropTypes.string,
  imgs: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      srcSet: PropTypes.array,
      caption: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
      thumbnail: PropTypes.string
    })
  ).isRequired,
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
  width: PropTypes.number,
}
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
  spinner: DefaultSpinner,
  spinnerColor: '#fff',
  spinnerSize: 50,
  theme: {},
  thumbnailOffset: 2,
  width: 1024,
}

const defaultStyles = {
  content: {
    position: 'relative',
  },
  figure: {
    margin: 0, // remove browser default
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
    transition: 'opacity .3s',
  },
  imgLoaded: {
    opacity: 1,
  },
  spinner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    // opacity animation to make spinner appear with delay
    opacity: 0,
    transition: 'opacity .3s',
  },
  spinnerActive: {
    opacity: 1,
  }
}

export default ImgsViewer
