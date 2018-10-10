import React, { Component } from 'react'
import { PageHeader, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Icon from './icons/Icon'

class Header extends Component {
  render() {
    const { noButton } = this.props

    return(
      <PageHeader>
        <div className={classNames('title', !noButton && 'float-left')}>
          Bookmark
        </div>
        {!noButton && (
          <div className="add-button-view" >
            <Link to='/bookmark'><Button bsStyle="primary">Ajouter</Button></Link>
          </div>
        )}
      </PageHeader>
    );
  }
}

Icon.propTypes = {
  noButton: PropTypes.bool
}

export default Header