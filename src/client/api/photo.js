import _ from 'lodash'
import axios from 'axios'

import apiConf from '../../conf/apiConf'

const headers = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  mode: 'no-cors',
  credentials: 'include'
}

function getApiRequest(method, values) {
  let argumentsFormated = ""
  _.forEach(values, (value, key) => {
    argumentsFormated += `${key}=${value}&`
  })

  return `https://api.flickr.com/services/rest/?method=${method}&api_key=${apiConf.flickr.key}&${argumentsFormated}format=json&nojsoncallback=1`
}

function getInfos(id) {
  const request = getApiRequest('flickr.photos.getInfo', { photo_id: id })

  return axios(request, headers).then(res => {
    return res.data.photo
  })
}

function getSizes(id, url) {
  const request = getApiRequest('flickr.photos.getSizes', { photo_id: id })

  return axios(request, headers).then(res => {
    const sizes = res.data.sizes.size
    const iUrl = _.findIndex(sizes, (s) => { s.url === url })
    if (iUrl !== -1) return sizes[iUrl]

    const iOriginal = _.findIndex(sizes, (s) => { s.label === 'Original' })
    if (iOriginal !== -1) return sizes[iOriginal] 

    return sizes[sizes.length - 1]
  })
}

function getPhotoValues(id, url) {
  return Promise.all([
    getInfos(id),
    getSizes(id, url)
  ])
  .then(values => {
    const infos = values[0]
    const size = values[1]

    const photoValues = {
      author: infos.owner.username,
      keywords: ["photo"],
      title: infos.title._content,
      height: parseInt(size.height),
      width: parseInt(size.width)
    }

    return photoValues
  })
  .catch(() => {
    throw new 'invalid url'
  })
}

export {
  getPhotoValues
}