import React, { Component } from 'react'
import ImgsViewer from 'react-images-viewer'
import PropTypes from 'prop-types'
import { css, StyleSheet } from 'aphrodite/no-important'

class Gallery extends Component {
  constructor () {
    super()

    this.state = {
      isOpen: false,
      currImg: 0,
    }

    this.gotoNext = this.gotoNext.bind(this)
    this.gotoPrev = this.gotoPrev.bind(this)
    this.gotoImg = this.gotoImg.bind(this)
    this.handleClickImg = this.handleClickImg.bind(this)
    this.closeImgsViewer = this.closeImgsViewer.bind(this)
    this.openImgsViewer = this.openImgsViewer.bind(this)
  }
  openImgsViewer (index, event) {
    event.preventDefault()
    this.setState({
      currImg: index,
      isOpen: true,
    })
  }
  closeImgsViewer (index, event) {
    event.preventDefault()
    this.setState({
      currImg: 0,
      isOpen: false,
    })
  }
  gotoPrev () {
    this.setState({
      currImg: this.state.currImg - 1
    })
  }
  gotoNext () {
    this.setState({
      currImg: this.state.currImg + 1
    })
  }
  gotoImg (index) {
    this.setState({
      currImg: index
    })
  }
  handleClickImg () {
    if (this.state.currImg === this.props.imgs.length - 1) return
    this.gotoNext()
  }
  renderGallery () {
    const { imgs } = this.props

    if (!imgs) return

    const gallery = imgs.filter(i => i.useForDemo).map((obj, i) => {
      return (
        <a
          href={obj.src}
          className={css(classes.thumbnail, classes[obj.orientation])}
          key={i}
          onClick={(e) => this.openImgsViewer(i, e)}
        >
          <img src={obj.thumbnail} clasName={css(classes.source)} />
        </a>
      )
    })

    return (
      <div className={css(classes.gallery)}>
        {gallery}
      </div>
    )
  }
  render () {
    return (
      <div>
        {this.props.heading && <h2>{this.props.heading}</h2>}
        {this.props.subheading && <p>{this.props.subheading}</p>}
        {this.renderGallery()}
        <ImgsViewer
          currImg={this.state.currImg}
          imgs={this.props.imgs}
          isOpen={this.state.isOpen}
          onClickImg={this.handleclickImg}
          onClickNext={this.gotoNext}
          onClickPrev={this.gotoPrev}
          onClickThumbnail={this.gotoImg}
          onClose={this.closeLightbox}
          preventScroll={this.props.preventScroll}
          showThumbnails={this.props.showThumbnails}
          spinner={this.props.spinner}
          spinnerColor={this.props.spinnerColor}
          spinnerSize={this.props.spinnerSize}
          theme={this.props.theme}
        />
      </div>
    )
  }
}

Gallery.displayName = 'Gallery'
Gallery.propTypes = {
  preventScroll: PropTypes.bool,
  spinner: PropTypes.element,
  spinnerColor: PropTypes.string,
  spinnerSize: PropTypes.number,
  theme: PropTypes.object,
  heading: PropTypes.string,
  imgs: PropTypes.array,
  showThumbnails: PropTypes.bool,
  subheading: PropTypes.string,
}

const gutter = {
  small: 2,
  large: 4,
}
const classes = StyleSheet.create({
  gallery: {
    marginRight: -gutter.small,
    overflow: 'hidden',
    '@media (min-width: 500px)': {
      marginRight: -gutter.large,
    }
  },

  // anchor
  thumnail: {
    boxSizing: 'border-box',
    display: 'block',
    float: 'left',
    lineHeight: 0,
    paddingRight: gutter.smaill,
    paddingBottom: gutter.small,
    overflow: 'hidden',

    '@media (min-width: 500px)': {
      paddingRight: gutter.large,
      paddingBottom: gutter.large,
    }
  },

  // orientation
  landscape: {
    width: '30%',
  },
  square: {
    paddingBottom: 0,
    width: '40%',

    '@media (min-width: 500px)': {
      paddingBottom: 0,
    }
  },

  // actual <img />
  source: {
    border: 0,
    display: 'block',
    height: 'auto',
    maxWidth: '100%',
    width: 'auto'
  },
})

export default Gallery
