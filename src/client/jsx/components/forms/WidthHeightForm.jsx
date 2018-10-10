import React, { Component } from 'react'
import { FormGroup, ControlLabel, FormControl, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'

class WidthHeightForm extends Component {
  render() {
    const { height, width, onChangeFormValue } = this.props

    return (
      <div>
        <FormGroup 
          controlId="width"
        >
          <Col componentClass={ControlLabel} sm={1}>
            Largeur
          </Col>
          <Col sm={11}>
            <FormControl
              type="number"
              value={width}
              placeholder="Largeur"
              onChange={onChangeFormValue}
            />
          </Col>
        </FormGroup>
        <FormGroup 
          controlId="height"
        >
          <Col componentClass={ControlLabel} sm={1}>
            Hauteur
          </Col>
          <Col sm={11}>
            <FormControl
              type="number"
              value={height}
              placeholder="Hauteur"
              onChange={onChangeFormValue}
            />
          </Col>
        </FormGroup>
      </div>
    )
  }
}

WidthHeightForm.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  onChangeFormValue: PropTypes.func
}

export default WidthHeightForm