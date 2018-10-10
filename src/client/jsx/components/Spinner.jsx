import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Icon from './icons/Icon'

class Spinner extends Component {
  render() {
    const { size, className } = this.props

    return(
      <Icon className={classNames(className, 'spinner')} icon='spinner' size={size} />
    );
  }
}

Icon.propTypes = {
  size: PropTypes.number
}

export default Spinner