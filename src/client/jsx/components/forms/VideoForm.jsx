import React, { Component } from 'react'
import { FormGroup, ControlLabel, FormControl, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'

import WidthHeightForm from './WidthHeightForm'

class VideoForm extends Component {
  render() {
    const { hours, minutes, seconds, onChangeFormValue } = this.props

    return (
      <div>
        <WidthHeightForm {...this.props} />
        <FormGroup>
          <Col componentClass={ControlLabel} sm={1}>
            Heure(s)
          </Col>
          <Col sm={2}>
            <FormControl
              type="number"
              id="hours"
              value={hours}
              placeholder="heures"
              onChange={onChangeFormValue}
            />
          </Col>
          <Col componentClass={ControlLabel} sm={1}>
            Minute(s)
          </Col>
          <Col sm={2}>
            <FormControl
              type="number"
              id="minutes"
              value={minutes}
              placeholder="minutes"
              onChange={onChangeFormValue}
            />
          </Col>
          <Col componentClass={ControlLabel} sm={1}>
            Seconde(s)
          </Col>
          <Col sm={2}>
            <FormControl
              type="number"
              id="seconds"
              value={seconds}
              placeholder="secondes"
              onChange={onChangeFormValue}
            />
          </Col>
        </FormGroup>
      </div>
    )
  }
}

VideoForm.propTypes = {
  hours: PropTypes.number,
  minutes: PropTypes.number,
  seconds: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
  onChangeFormValue: PropTypes.func
}

export default VideoForm