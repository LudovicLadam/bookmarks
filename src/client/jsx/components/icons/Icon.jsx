import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import iconPaths from './selection'

class Icon extends Component {
  constructor(props) {
    super(props)
    this.getPath = this.getPath.bind(this)
  }

  getPath(iconName) {
    const icon = _.find(iconPaths.icons, function(icon) { return icon.properties.name === iconName })
    if (icon) return icon.icon.paths.join(' ')
    return ''
  }

  render() {
    const { onClick, fill, height, icon, size, width, className } = this.props

    const iconHeight = `${!height ? size : height}px`
    const iconWidth = `${!width ? size : width}px`

    return(
      <svg
        className={className}
        onClick={onClick}
        fill={fill}
        height={iconHeight}
        viewBox="0 0 1024 1024"
        width={iconWidth}
      >
        <path d={this.getPath(icon)} />
      </svg>
    )
  }
}

Icon.propTypes = {
  onClick: PropTypes.func,
  fill: PropTypes.string,
  height: PropTypes.number,
  icon: PropTypes.string.isRequired,
  size: PropTypes.number,
  width: PropTypes.number
}

Icon.defaultProps = {
  fill: 'white',
  size: 24,
}

export default Icon