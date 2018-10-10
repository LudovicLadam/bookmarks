import React, { Component } from 'react'
import PropTypes from 'prop-types'

import WidthHeightForm from './WidthHeightForm'

class PhotoForm extends Component {
  render() {
    return (
      <div>
        <WidthHeightForm {...this.props} />
      </div>
    )
  }
}

PhotoForm.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
}

export default PhotoForm