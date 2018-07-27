import PropTypes from 'prop-types'
import React from 'react'
import { css, StyleSheet } from 'aphrodite/no-important'
import defaults from '../theme'
import { deepMerge } from '../utils/util'

function Footer ({ caption, countCurr, countSeparator, countTotal, showCount, theme, ...props }) {
  if (!caption && !showCount) return null

  const classes = StyleSheet.create(deepMerge(defaultStyles, theme))

  const imgCount = showCount ? (
    <div className={css(classes.footerCount)}>
      {countCurr}
      {countSeparator}
      {countTotal}
    </div>
  ) : <span />

  return (
    <div className={css(classes.footer)} {...props}>
      {caption ? (
        <figcaption className={css(classes.footerCaption)}>
          {caption}
        </figcaption>
      ) : <span />}
      {imgCount}
    </div>
  )
}

Footer.propTypes ={
  theme: PropTypes.object,
  caption: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  countCurr: PropTypes.number,
  countSeparator: PropTypes.string,
  countTotal: PropTypes.number,
  showCount: PropTypes.bool,
}

const defaultStyles = {
  footer: {
    boxSizing: 'border-box',
    color: defaults.footer.color,
    cursor: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    left: 0,
    lineHeight: 1.3,
    paddingTop: defaults.footer.gutter.vertical,
    paddingRight: defaults.footer.gutter.horizontal,
    paddingBottom: defaults.footer.gutter.vertical,
    paddingLeft: defaults.footer.gutter.horizontal,
  },
  footerCount: {
    color: defaults.footer.count.color,
    fontSize: defaults.footer.count.fontSize,
    paddingLeft: '1em', // add a small gutter for the caption
  },
  footerCaption: {
    flex: '1 1 0',
  }
}

export default Footer
