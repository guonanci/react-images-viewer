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
      lightboxInialImg: index
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
  }
})
