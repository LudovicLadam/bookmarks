import Bookmark from './Bookmark'

export default class Video extends Bookmark {
  constructor(id, url, title, author, keywords, width, height, hours, minutes, seconds) {
    super(id, url, title, author, keywords)
    this.width = width
    this.height = height
    this.hours = hours
    this.minutes = minutes
    this.seconds = seconds
  }
}