import React, { Component } from 'react'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'

import { checkUrl } from '../../../lib/url'
import { types } from '../../../constants'

import Icon from '../icons/Icon'
import { deleteBookmark } from '../../../actions/bookmarks'

class BookmarkRow extends Component {
  constructor(props) {
    super(props)
    this.handleOnDeleteBookmark = this.handleOnDeleteBookmark.bind(this)
    this.handleOnEditBookmark = this.handleOnEditBookmark.bind(this)
  }

  handleOnDeleteBookmark() {
    const { bookmark, dispatch } = this.props
    dispatch(deleteBookmark(bookmark.id))
  }

  handleOnEditBookmark() {
    const { bookmark, history } = this.props
    history.push(`/bookmark/${bookmark.id}`)
  }

  render() {
    const { bookmark } = this.props
    const iconName = checkUrl(bookmark.url) === types.PHOTO ? 'flickr3' : 'vimeo2'

    return(
      <div className="cell-bookmark">
        <div className="row-title">
          <Icon className="row-icon" icon={iconName} fill='black' />
          <h4 className="row-title">{bookmark.title}</h4>
          <span className="row-created-at">{moment(bookmark.createdAt).format('DD/MM/YYYY')}</span>
        </div>
        <div className="row-author-url">
          <div className="row-author">
            <span>{bookmark.author}</span>
          </div>
          <div className="row-url">
            <a target="_blank" href={bookmark.url}>{bookmark.url}</a>
          </div>
        </div>
        <div className="row-buttons">
          <Button bsStyle="primary" className="row-btn-edit" onClick={this.handleOnEditBookmark}>Modifier</Button>
          <Button onClick={this.handleOnDeleteBookmark}>Supprimer</Button>
        </div>
      </div>
    );
  }
}

export default connect()(withRouter(BookmarkRow))