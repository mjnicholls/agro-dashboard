import axios from 'axios'

import { cookies } from '../config'
import { getCookie } from '../utils/cookies'
import { signoutUnauthorised } from '../utils/userUtils'

const client = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
})

client.interceptors.response.use(
  (response) => (response && response.data ? response.data : response),
  (error) => {
    let errMessage
    if (error.response) {
      if (error.response && error.response.status === 401) {
        signoutUnauthorised()
        return Promise.reject(error)
      }
      errMessage = extractResponseErrorMessage(error.response)
    } else if (error.request) {
      errMessage = error.request.data.message
    } else {
      errMessage = error.message
    }
    if (!errMessage) {
      errMessage = 'Something went wrong'
    }
    return Promise.reject(errMessage)
  },
)

client.interceptors.request.use((config) => {
  const token = getCookie(cookies.token)
  if (token) {
    // eslint-disable-next-line
    config.headers.Authorization = token ? `Bearer ${token}` : ''
  }
  return config
})

const extractResponseErrorMessage = (response) => {
  /** description.message takes precedence over data.message at the moment,
   * because it is where original api response can be found,
   * while data.message might contain message like 'Error from old Personal Account API'
   * Such error messages should be processed on the server in the future
   */
  let message
  const { data } = response
  if (data.description && data.description.message) {
    message = data.description.message
    if (typeof message === 'object') {
      message = formatMessageFromArray(message)
    }
  } else {
    message = data.message
  }
  return message
}

const formatMessageFromArray = (errObject) => {
  const arr = Object.keys(errObject)
  let message = ''
  for (let i = 0; i < arr.length; i += 1) {
    const key = arr[i]
    const val = errObject[key]
    message += `${key} ${Array.isArray(val) ? val.join(', ') : val}`
  }
  return message
}

export default client
