import PropTypes from 'prop-types'
import React from 'react'
import { css, StyleSheet } from 'aphrodite/no-important'

import defaults from '../theme'
import { deepMerge } from '../utils/util'
import Icon from './Icon'

function Header ({ customControls, onClose, showCloseBtn, closeBtnTitle, theme, ...props }) {
  const classes = StyleSheet.create(deepMerge(defaultStyles, theme))

  return (
    <div className={css(classes.header)} {...props}>
      {customControls ? customControls : <span />}
      {!!showCloseBtn && (
        <button
          title={closeBtnTitle}
          className={css(classes.close)}
          onClick={onClose}
        >
          <Icon fill={!!theme.close && theme.close.fill || defaults.close.fill} type="close" />
        </button>
      )}
    </div>
  )
}

Header.propTypes = {
  theme: PropTypes.object,
  customControls: PropTypes.array,
  onClose: PropTypes.func.isRequired,
  showCloseBtn: PropTypes.bool,
  closeBtnTitle: PropTypes.string,
}

const defaultStyles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    height: defaults.header.height,
  },
  close: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
    position: 'relative',
    top: 0,
    verticalAlign: 'bottom',

    // increase hit area
    height: 40,
    marginRight: -10,
    padding: 10,
    width: 40,
  }
}

export default Header
