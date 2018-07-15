import PropTypes from 'prop-types'
import { Children, Component } from 'react'

// Pass the Viewer context through to the Portal's descendents

class PassContext extends Component {
  getChildContext () {
    return this.props.context
  }
  render () {
    return Children.only(this.props.children)
  }
}


PassContext.propTypes = {
  context: PropTypes.object.isRequired
}
PassContext.childContextTypes = {
  theme: PropTypes.object
}

export default PassContext
