import _ from 'lodash'
import React, { Component } from 'react'
import { Form, FormGroup, ControlLabel, FormControl, Button, Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import BookmarkForm from './BookmarkForm'
import PhotoForm from './PhotoForm'
import VideoForm from './VideoForm'
import Spinner from '../Spinner'

import Photo from '../../../../model/Photo'
import Video from '../../../../model/Video'

import { addBookmark } from '../../../actions/bookmarks'
import { buttons, types, validations } from '../../../constants'
import { formatUrl, checkUrl, getMediaId } from '../../../lib/url'
import { getPhotoValues } from '../../../api/photo'
import { getVideoValues } from '../../../api/video'

class UrlForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      load: false,
      bookmark: this.props.bookmark,
      urlType: undefined,
      validationState: undefined,
      errorMessage: ''
    }
    this.handleOnChangeUrl = this.handleOnChangeUrl.bind(this)
    this.handleSubmitUrl = this.handleSubmitUrl.bind(this)
    this.setValidationState = this.setValidationState.bind(this)
    this.handleOnChangeFormValue = this.handleOnChangeFormValue.bind(this)
    this.handleSaveBookmark = this.handleSaveBookmark.bind(this)
    this.setInvalidType = this.setInvalidType.bind(this)
    this.handleOnCancelBookmark = this.handleOnCancelBookmark.bind(this)
    this.resetState = this.resetState.bind(this)
    this.handleOnChangeKeywords = this.handleOnChangeKeywords.bind(this)
  }

  componentWillMount() {
    const { match: { params }, bookmark } = this.props
    if (!bookmark.id) return

    if (params && params.id) this.setState({
      validationState: validations.SUCCESS,
      urlType: checkUrl(bookmark.url)
    })
  }

  handleOnChangeUrl(event) {
    this.setState({ url: event.currentTarget.value })
  }

  setInvalidType(message = '') {
    this.setState({
      validationState: validations.ERROR,
      urlType: types.INVALID,
      load: false,
      errorMessage: message
    })
  }

  resetState() {
    this.setState({
      load: false,
      bookmark: {
        url: "",
        title: "",
        author: "",
        keywords: [],
        width: 0,
        height: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      },
      urlType: undefined,
      validationState: undefined
    })
  }

  handleSubmitUrl(event) {
    const { bookmarks } = this.props
    const { bookmark: { url } } = this.state
    const urlType = checkUrl(url)

    if (urlType === types.INVALID) {
      this.setInvalidType('Ce lien est invalide' )
      event.preventDefault()
      return
    }

    const alreadyExists = !_.isEmpty(_.filter(bookmarks, (b) => { return formatUrl(b.url) === formatUrl(url) }))
    if (alreadyExists) {
      this.setInvalidType('Ce lien a déjà été enregistré')
      event.preventDefault()
      return
    }

    this.setState({ load: true })

    const mediaId = getMediaId(urlType, url)
    let _promise = undefined

    if (urlType === types.PHOTO) _promise = getPhotoValues(mediaId, url)
    if (urlType === types.VIDEO) _promise = getVideoValues(url)

    _promise.then((values) => {
      const bookmark = Object.assign({}, this.state.bookmark, {
        title: values.title,
        author: values.author,
        keywords: values.keywords,
        height: values.height,
        width: values.width,
        hours: values.hours ? values.hours : this.state.bookmark.hours,
        minutes: values.minutes ? values.minutes : this.state.bookmark.minutes,
        seconds: values.seconds ? values.seconds : this.state.bookmark.seconds
      })
      this.setState({
        load: false,
        bookmark,
        validationState: validations.SUCCESS,
        urlType: urlType,
        errorMessage: ''
      })
    })
    .catch(() => {
      this.setInvalidType()
    })

    event.preventDefault()
  }

  handleSaveBookmark(event) {
    const { urlType, bookmark: { url, title, author, keywords,width, height, hours, minutes, seconds} } = this.state
    const { bookmarksIds, dispatch, history } = this.props
    let bookmark = undefined
    const id = this.state.bookmark.id ? this.state.bookmark.id : bookmarksIds.length === 0 ? parseInt(1) : parseInt(_.max(bookmarksIds)) + 1

    if (urlType === types.PHOTO) bookmark = new Photo(
      id,
      url,
      title,
      author,
      keywords,
      width,
      height
    )
    if (urlType === types.VIDEO) bookmark = new Video(
      id,
      url,
      title,
      author,
      keywords,
      width,
      height,
      hours,
      minutes,
      seconds
    )

    dispatch(addBookmark(bookmark))
    history.push('/')
    event.preventDefault()
  }

  handleOnChangeFormValue(event) {
    const { id, value } = event.currentTarget

    const bookmark = Object.assign({}, this.state.bookmark, {
      [id]: value
    })
    this.setState({
      bookmark
    })
  }

  setValidationState(urlType) {
    if (_.isEmpty(this.state.bookmark.url)) return null
    let validation = undefined

    switch(urlType) {
      case types.PHOTO:
      case types.VIDEO:
        validation = validations.SUCCESS
        break
      case types.INVALID:
      default:
        validation = validations.ERROR
    }
    this.setState({ validationState: validation })
  }

  handleOnCancelBookmark() {
    this.resetState()
  }

  handleOnChangeKeywords(values) {
    const bookmark = Object.assign({}, this.state.bookmark, {
      keywords: values
    })
    this.setState({
      bookmark
    })
  }

  render() {
    const { bookmark: { url, title, author, keywords, width, height, hours, minutes, seconds }, urlType, validationState, load, errorMessage } = this.state

    return(
      <div>
        <Form horizontal onSubmit={this.handleSubmitUrl}>
          <FormGroup 
            controlId="url"
            validationState={validationState}
          >
            <Col componentClass={ControlLabel} sm={1}>
              Lien
            </Col>
            <Col sm={11}>
              <FormControl
                type="text"
                disabled={validationState === validations.SUCCESS}
                value={url}
                placeholder="Saisir une url Flickr ou Vimeo"
                onChange={this.handleOnChangeFormValue}
              />
            </Col>
          </FormGroup>
          {(!urlType || urlType === types.INVALID) && (
            <FormGroup>
              <Col smOffset={1} sm={11} className="form-group-btn-url">
                <Button disabled={load} type="submit" bsStyle="primary">
                  {load && ( <Spinner className="btn-url-spinner" size={20} /> )}
                  {!load && buttons.SUBMIT}
                </Button>
                <span className='error-message'>{errorMessage}</span>
              </Col>
            </FormGroup>
          )}
        </Form>
        {urlType && urlType !== types.INVALID && (
        <Form horizontal onSubmit={this.handleSaveBookmark}>
          <BookmarkForm
            title={title}
            author={author}
            keywords={keywords}
            onChangeFormValue={this.handleOnChangeFormValue}
            onChangeKeywords={this.handleOnChangeKeywords}
          />
          {urlType === types.PHOTO && (
            <PhotoForm 
              width={width}
              height={height}
              onChangeFormValue={this.handleOnChangeFormValue}
            />
          )}
          {urlType === types.VIDEO && (
            <VideoForm
              width={width}
              height={height}
              hours={hours}
              minutes={minutes}
              seconds={seconds}
              onChangeFormValue={this.handleOnChangeFormValue}
            />
          )}
          <FormGroup>
            <Col smOffset={1} sm={11} className="form-group-btn-url">
              <Button type="submit" bsStyle="primary">{buttons.SUBMIT}</Button>
              <Button className="btn-cancel-url" onClick={this.handleOnCancelBookmark}>{buttons.CANCEL}</Button>
            </Col>
          </FormGroup>
        </Form>
        )}
      </div>
    );
  }
}

UrlForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}

UrlForm.defaultProps = {
  bookmark: {
    url: "",
    title: "",
    author: "",
    keywords: [],
    width: 0,
    height: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  },
}

export default connect((state, props) => ({
  bookmark: props.match && props.match.params && props.match.params.id && state.bookmarks && state.bookmarks[props.match.params.id],
  bookmarks: state.bookmarks
}))(withRouter(UrlForm))