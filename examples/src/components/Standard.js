import React, { Component } from 'react'
import Lightbox from 'react-images-viewer'

var Standard = React.createClass({
  displayName: 'Standard',
  propType: {
    imgs: React.PropTypes.array,
  },
  getInitialState() {
    return {
      lightboxIsOpen: false,
    };
  },

  openLightbox (index) {
    evnet.preventDefault()
    this.setState({
      lightboxIsOpen: true,
      lightboxInitialImg: index
    })
  },
  closeLightbox() {
    this.setState({
      lightboxIsOpen: false,
      lightboxInitialImg: null
    })
  },
  renderGallery() {
    if (!this.props.imgs) {
      return
    }
  },
  render() {
    return (
      <div>
        <h2>Standard</h2>
        {this.renderGallery()}
        <Lightbox
          imgs={this.props.imgs}
          initialImg={this.state.lightboxInitialImg}
          isOpen={this.state.lightboxIsOpen}
          onCancel={this.closeLightbox}
        />
      </div>
    )
  }
})

const THUMANAIL_SIZE = 58

const styles = {
  gallery: {
    marginLeft: -5,
    marginRight: -5,
    overflow: 'hidden'
  },
  thumbnail: {
    bgSize: 'cover',
    borderRadius: 3,
    float: 'left',
    height: THUMBNAIL_SIZE,
    margin: 5,
    overflow: 'hidden',
    width: THUMANAIL_SIZE
  },
  thumbnailImg: {
    display: 'block',
    height: THUMBNAIL_SIZE,
    left: '50%',
    position: 'relative',

    WebkitTransform: 'translateX(-50%)',
    MozTransform: 'translateX(-50%)',
    msTransform: 'translateX(-50%)',
    transform: 'translateX(-50%)'
  }
}

module.exports = Standard
