import React, { Component } from 'react'
import { FormGroup, FormControl} from 'react-bootstrap'
import PropTypes from 'prop-types'

class Search extends Component {


  render() {
    const { onChange } = this.props

    return(
      <div className="search-view">
        <FormGroup>
          <FormControl
            type="text"
            placeholder="Recherche : titre, auteur, lien ou mot-clé"
            onChange={onChange}
          />
        </FormGroup>
      </div>
    );
  }
}

Search.propTypes = {
  onChange: PropTypes.func
}

export default Search