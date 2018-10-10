import actions from '../constants/actions'

export const addBookmark = bookmark => ({
  type: actions.bookmark.ADD_BOOKMARK,
  bookmark
})

export const deleteBookmark = id => ({
  type: actions.bookmark.DELETE_BOOKMARK,
  id
})