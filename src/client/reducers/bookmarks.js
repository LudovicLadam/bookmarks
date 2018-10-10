import _ from 'lodash'
import actions from '../constants/actions'

const bookmarks = (state = [], action) => {
  switch (action.type) {
    case actions.bookmark.ADD_BOOKMARK:
      return Object.assign({}, state, {
        [action.bookmark.id]: action.bookmark
      })
    case actions.bookmark.DELETE_BOOKMARK:
      return _.omit(state, action.id)
    default:
      return state
  }
}

export default bookmarks
