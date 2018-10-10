export default class Bookmark {
  constructor(id, url, title, author, keywords) {
    this.id = id
    this.url = url
    this.title = title
    this.author = author
    this.createdAt = new Date()
    this.keywords = keywords
  }
}