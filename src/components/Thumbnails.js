import PropTypes from 'prop-types'
import React from 'react'
import { css, StyleSheet } from 'aphrodite/no-important'
import Thumbnail from './Thumbnail'
import defaults from '../theme'

function Thumbnails ({ currImg, imgs, onClickThumbnail }) {
  return (
    <div className={css(classes.thumbnail)}>
      {imgs.map((img, idx) => {
        <Thumbnail
          {...img}
          active={idx === currImg}
          index={idx}
          key={idx}
          onClick={onClickThumbnail}
        />
      })}
    </div>
  )
}

Thumbnails.propTypes = {
  currImg: PropTypes.number,
  imgs: PropTypes.array,
  onClickThumbnail: PropTypes.func.isRequired,
}

const classes = StyleSheet.create({
  Thumbnails: {
    bottom: defaults.container.gutter.vertical,
    color: '#fff',
    height: defaults.thumbnail.height,
    left: defaults.container.gutter.horizontal,
    overflowX: 'scroll',
    overflowY: 'hidden',
    position: 'absolute',
    right: defaults.container.gutter.horizontal,
    textAlign: 'center',
    whiteSpace: 'nowrap',
  }
})

export default Thumbnails
