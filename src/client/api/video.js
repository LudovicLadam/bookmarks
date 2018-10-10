import axios from 'axios'
import moment from 'moment'

const headers = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  mode: 'no-cors',
  credentials: 'include'
}

function getVimeoApiRequest(url) {
  return `https://vimeo.com/api/oembed.json?url=${url}`
}

function getVideoValues(url) {
  const apiUrl = getVimeoApiRequest(url)
  return axios(apiUrl, headers).then(res => {
    const duration = res.data.duration

    const videoValues = {
      author: res.data.author_name,
      title: res.data.title,
      keywords: ["video"],
      height: parseInt(res.data.height),
      width: parseInt(res.data.width),
      hours: moment.duration(duration, 'seconds').hours(),
      minutes: moment.duration(duration, 'seconds').minutes(),
      seconds: moment.duration(duration, 'seconds').seconds()
    }

    return videoValues
  }).catch((e) => {
    throw 'invalid url'
  })
}

export {
  getVideoValues
}