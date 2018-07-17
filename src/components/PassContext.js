import PropTypes from 'prop-types'
import { Children, Component } from 'react'

// Pass the Viewer context through to the Portal's descendents

class PassContext extends Component {
  getChildContext () {
    return this.props.context
  }
  render () {
    // Verifies that children has only one child(a React element) and returns it. Otherwise this method throws an error.
    return Children.only(this.props.children)
  }
}


PassContext.propTypes = {
  context: PropTypes.object.isRequired,
  children: PropTypes.element
}
PassContext.childContextTypes = {
  theme: PropTypes.object
}

export default PassContext
