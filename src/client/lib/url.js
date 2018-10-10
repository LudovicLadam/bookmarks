import _ from 'lodash'
import types from '../constants/types'

function isFlickrUrl(url) {
  const regex = /(http?s?:\/\/)?(www\.)?(flickr\.com|flic\.kr)\/(p\/|photos\/)[a-zA-Z0-9@\/]+/gm
  return regex.test(url)
}

function isVimeoUrl(url) {
  const regex = /(http?s?:\/\/)?(www\.)?(vimeo\.com)\/([0-9]+|channels\/[a-zA-Z0-9@-_]+\/[0-9]+)/gm
  return regex.test(url)
}

function checkUrl(url) {
  let type = types.INVALID
  if (isFlickrUrl(url)) type = types.PHOTO
  if (isVimeoUrl(url)) type = types.VIDEO
  return type
}

function formatUrl(url) {
  return url.replace(/(http?s?:\/\/)?(www\.)?/gm, '')
}

function getFlickrId(url) {
  const urlFormatted = formatUrl(url)
  const regexLong = /(http?s?:\/\/)?(www\.)?(flickr\.com)\/(photos\/)[a-zA-Z0-9@\/]+/gm
  const regexShort = /(http?s?:\/\/)?(www\.)?(flic\.kr)\/(p\/)[a-zA-Z0-9@\/]+/gm
  const splitUrl = _.split(urlFormatted, '/')
  let id = ""

  if (regexLong.test(urlFormatted)) id = splitUrl[3]
  if (regexShort.test(urlFormatted)) id = splitUrl[2]
  return id
}

function getVimeoId(url) {
}

function getMediaId(type, url) {
  let id = -1
  switch(type) {
    case types.PHOTO:
      id = getFlickrId(url)
      break
    case types.VIDEO:
      id = getVimeoId(url)
      break
    case types.INVALID:
    default:
  }
  return id
}

export {
  formatUrl,
  checkUrl,
  getMediaId
}