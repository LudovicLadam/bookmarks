import Bookmark from './Bookmark'

export default class Photo extends Bookmark {
  constructor(id, url, title, author, keywords, width, height) {
    super(id, url, title, author, keywords)
    this.width = width
    this.height = height
  }
}