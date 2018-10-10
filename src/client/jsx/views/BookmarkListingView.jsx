import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Pager } from 'react-bootstrap'

import Header from '../components/Header'
import BookmarkRow from '../components/bookmark/BookmarkRow'
import NoBookmarkRow from '../components/bookmark/NoBookmarkRow'
import Search from '../components/Search'

class BookmarkListingView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 1,
      bookmarkPerPage: 5,
      search: ''
    }
    this.handleOnClickOnPreviousPage = this.handleOnClickOnPreviousPage.bind(this)
    this.handleOnClickOnNextPage = this.handleOnClickOnNextPage.bind(this)
    this.handleOnChangeSearch = this.handleOnChangeSearch.bind(this)
    this.getBookmarks = this.getBookmarks.bind(this)
  }

  handleOnClickOnPreviousPage() {
    this.setState({
      currentPage: this.state.currentPage - 1
    })
  }

  handleOnClickOnNextPage() {
    this.setState({
      currentPage: this.state.currentPage + 1
    })
  }

  handleOnChangeSearch(event) {
    this.setState({ search: event.currentTarget.value })
  }

  getBookmarks(indexOfFirstBookmark, indexOfLastBookmark) {
    const { bookmarks } = this.props
    const { search } = this.state

    let filteredBookmarks = bookmarks
    if (!_.isEmpty(search)) {
      filteredBookmarks = _.filter(bookmarks, (bookmark) => { 
        return bookmark.title.indexOf(search) !== -1 
          || bookmark.author.indexOf(search) !== -1 
          || bookmark.url.indexOf(search) !== -1
          || bookmark.keywords.includes(search) 
      })
    }
    const currentBookmarks = _.slice(filteredBookmarks, indexOfFirstBookmark, indexOfLastBookmark)

    return currentBookmarks
  }

  render() {
    const { bookmarkPerPage, currentPage } = this.state
    const { bookmarks } = this.props

    const indexOfLastBookmark = currentPage * bookmarkPerPage
    const indexOfFirstBookmark = indexOfLastBookmark - bookmarkPerPage

    const currentBookmarks = this.getBookmarks(indexOfFirstBookmark, indexOfLastBookmark)

    return(
      <div className="container">
        <Header />
        <Search onChange={this.handleOnChangeSearch} />
        {_.isEmpty(currentBookmarks) && (
          <NoBookmarkRow />
        )}
        <div>
          {_.map(currentBookmarks, bookmark => (
            <BookmarkRow key={bookmark.id} bookmark={bookmark} />
          ))}
        </div>
        {bookmarks.length > bookmarkPerPage && (
        <Pager>
          {indexOfFirstBookmark >= bookmarkPerPage && (
            <Pager.Item previous onClick={this.handleOnClickOnPreviousPage}>
              &larr; Page précédente
            </Pager.Item>
          )}
          {bookmarks.length > indexOfLastBookmark && (
            <Pager.Item next onClick={this.handleOnClickOnNextPage}>
              Page suivante &rarr;
            </Pager.Item>
          )}
        </Pager>
        )}
      </div>
    );
  }
}

export default connect(state => ({
  bookmarks: _.map(state.bookmarks)
}))(BookmarkListingView)