import PropTypes from 'prop-types'
import React from 'react'
import { css, StyleSheet } from 'aphrodite/no-important'

const Spinner = props => {
  const classes = StyleSheet.create(styles(props))

  return (
    <div className={css(classes.bouncingLoader)}>
      <div className={css(classes.child)} />
      <div className={css(classes.child, classes.child2)} />
      <div className={css(classes.child, classes.child3)} />
    </div>
  )
}

Spinner.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
}

const bouncingKeyframes = (size) => ({
  '0%': {
    opacity: 1,
    transform: 'translateY(0)',
  },
  '100%': {
    opacity: .1,
    transform: `translateY(-${size}px)`,
  }
})

const styles = ({ color, size }) => ({
  bouncingLoader: {
    display: 'flex',
    justifyContent: 'center',
  },
  child: {
    width: size,
    height: size,
    margin: `${3 * size}px ${ .2 * size}px`,
    background: color,
    borderRadius: '50%',
    animationName: bouncingKeyframes(size),
    animationDuration: '.6s',
    animationDirection: 'alternate',
    animationIterationCount: 'infinite',
  },
  child2: {
    animationDelay: '0.2s',
  },
  child3: {
    animationDelay: '0.4s',
  }
})

export default Spinner
