import axios from 'axios'

import { login, logout } from '../../api/auth'
import { cookies } from '../../config'
import { deleteCookie, setCookie } from '../../utils/cookies'
import { getAdvertisingDetails } from '../../utils/utils'
import { fetchPolygons } from '../polygons/actions'
import { parseJwt } from './utils'

export const API_KEY_STATUS = 'API_KEY_STATUS'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const CLEAR_LOGIN_ERROR = 'CLEAR_LOGIN_ERROR'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FRONTEND = 'LOGOUT_FRONTEND'
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION'
export const DESTROY_STATE = 'DESTROY_STATE'

const requestLogin = (email) => ({
  type: LOGIN_REQUEST,
  payload: email,
})

const receiveLogin = (data) => ({
  type: LOGIN_SUCCESS,
  data,
})

const loginError = (message) => ({
  type: LOGIN_FAILURE,
  isFetching: false,
  isAuthenticated: false,
  message,
})

export const setApiKeyStatus = (status) => ({
  type: API_KEY_STATUS,
  payload: status,
})

export const clearLoginError = () => ({
  type: CLEAR_LOGIN_ERROR,
})

const requestLogout = () => ({
  type: LOGOUT_REQUEST,
})

export const receiveLogout = () => ({
  type: LOGOUT_SUCCESS,
})

export const hideNotification = () => ({
  type: HIDE_NOTIFICATION,
})

export const destroyState = () => ({
  type: DESTROY_STATE,
})

export const loginUser = (email, password) => (dispatch) => {
  dispatch(requestLogin(email))
  const advertising = getAdvertisingDetails()

  login(email, password, advertising)
    .then((data) => {
      const { token } = data

      let tokenInfo
      try {
        tokenInfo = parseJwt(token).passport
      } catch {
        dispatch(loginError('Error parsing token')) // TODO
      }
      if (!tokenInfo) {
        dispatch(loginError('Error parsing token')) // TODO
      }
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      axios.interceptors.response.use(
        (response) => (response && response.data ? response.data : response),
        // eslint-disable-next-line
        (error) => {
          if (error.response && error.response.status === 401) {
            dispatch(receiveLogout())
          } else {
            let message = 'Something went wrong'
            if (
              error.response &&
              error.response.data &&
              error.response.data.message
            ) {
              message = error.response.data.message
            }
            return Promise.reject(message)
          }
        },
      )

      setCookie(cookies.token, token)
      dispatch(
        receiveLogin({
          token,
          user: tokenInfo.data,
          limits: tokenInfo.limits,
        }),
      )

      dispatch(fetchPolygons())
    })
    .catch((err) => {
      dispatch(loginError(err.message))
    })
}

export const logoutUser = () => async (dispatch) => {
  dispatch(requestLogout())
  logout()
    .then(() => {
      deleteCookie(cookies.token, '/', '')
      delete axios.defaults.headers.common.Authorization
      dispatch(receiveLogout())
      dispatch(destroyState())
    })
    .catch((err) => {
      // eslint-disable-next-line
      console.log(err)
    })
}
