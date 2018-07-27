import PropTypes from 'prop-types'
import React from 'react'
import { css, StyleSheet } from 'aphrodite/no-important'

import defaults from '../theme'
import { deepMerge } from '../utils/util'

function Container (props) {
  const classes = StyleSheet.create(deepMerge(defaultStyles, props.theme))

  return (
    <div
      id="viewerBackdrop"
      className={css(classes.container)}
      {...props}
    />
  )
}

Container.propTypes = {
  theme: PropTypes.object
}

const defaultStyles = {
  container: {
    alignItems: 'center',
    backdropColor: defaults.container.background,
    boxSizing: 'border-box',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    left: 0,
    paddingTop: defaults.container.gutter.vertical,
    paddingRight: defaults.container.gutter.horizontal,
    paddingBottom: defaults.container.gutter.vertical,
    paddingLeft: defaults.container.gutter.horizontal,
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: defaults.container.zIndex,
  }
}

export default Container
