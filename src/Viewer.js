import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite'
// import ScrollLock from 'react-scrolllock'

import defaultTheme from './theme'
import Arrow from './components/Arrow'
import Container from './components/Container'
import Footer from './components/Footer'
import Header from '/components/Header'
import PaginatedThumbnails from '/components/PaginatedThumbnails'
import Portal from '/components/Portal'
import DefaultSpinner from '/components/DefaultSpinner'

import { bindFunctions, canUseDom, deepMerge } from './utils/util'

function normalizeSourceSet(data) {
  const sourceSet = data.srcSet || data.srcSet

  if (Array.isArray(sourceSet)) {
    return sourceSet.join()
  }

  return sourceSet
}

class Viewer extends Component {
  constructor(props) {
    super(props)

    this.theme = deepMerge(defaultTheme, porps.theme)
    this.classes = StyleSheet
  }
}
