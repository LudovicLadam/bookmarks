import React, { Component } from 'react'
import { FormGroup, ControlLabel, FormControl, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'

import CreatableInputOnly from './elements/CreatableInput'

class BookmarkForm extends Component {
  render() {
    const { title, author, keywords, onChangeFormValue, onChangeKeywords } = this.props

    return (
      <div>
        <FormGroup 
          controlId="title"
        >
          <Col componentClass={ControlLabel} sm={1}>
            Titre
          </Col>
          <Col sm={11}>
            <FormControl
              type="text"
              value={title}
              placeholder="Saisir un titre"
              onChange={onChangeFormValue}
            />
          </Col>
        </FormGroup>
        <FormGroup 
          controlId="author"
        >
          <Col componentClass={ControlLabel} sm={1}>
            Auteur
          </Col>
          <Col sm={11}>
            <FormControl
              type="text"
              value={author}
              placeholder="Saisir le nom de l'auteur"
              onChange={onChangeFormValue}
            />
          </Col>
        </FormGroup>
        <FormGroup 
          controlId="keywords"
        >
          <Col componentClass={ControlLabel} sm={1}>
            Mots-clés
          </Col>
          <Col sm={11}>
            <CreatableInputOnly
              values={keywords}
              onChange={onChangeKeywords}
              placeholder="Mots-clés"
            />
          </Col>
        </FormGroup>
      </div>
    )
  }
}

BookmarkForm.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  keywords: PropTypes.array,
  onChangeFormValue: PropTypes.func,
  onChangeKeywords: PropTypes.func
}

export default BookmarkForm