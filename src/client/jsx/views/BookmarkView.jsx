import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Header from '../components/Header'
import UrlForm from '../components/forms/UrlForm'

class BookmarkView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  render() {
    return(
      <div className="container">
        <Header noButton />
        <div className="a-return-link">
          <Link to="/">Retour à la liste</Link>
        </div>
        <UrlForm {...this.props} />
      </div>
    );
  }
}

export default connect((state, props) => ({
  bookmark: props.match && props.match.params && props.match.params.id && state.bookmarks[props.match.params.id],
  bookmarksIds: state.bookmarks && Object.keys(state.bookmarks)
}))(BookmarkView)