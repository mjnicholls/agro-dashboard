import { cookies } from '../../config'
import { deleteCookie, getCookie } from '../../utils/cookies'
import { parseJwt } from '../../utils/userUtils'
import {
  API_KEY_STATUS,
  CLEAR_LOGIN_ERROR,
  HIDE_NOTIFICATION,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FRONTEND,
} from './actions'

const emptyUserData = {
  email: null,
  appid: null,
  tariff: null,
  confirmed_email: null,
}

const defaultEmptyState = {
  isFetching: false,
  isAuthenticated: false,
  token: null,
  user: { ...emptyUserData },
  errorSignIn: null,
  errorSignUp: null,
  limits: null,
  isApiKeyValid: null,
  errorMessage: null,
}

let tokenData
const token = getCookie(cookies.token)
if (token) {
  try {
    tokenData = parseJwt(token).passport
  } catch (err) {
    deleteCookie(cookies.token, '/', '')
  }
}

const initialState = tokenData
  ? {
      ...defaultEmptyState,
      isAuthenticated: true,
      token,
      user: { ...tokenData.data },
      limits: tokenData.limits,
    }
  : { ...defaultEmptyState }

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
      }
    case LOGIN_SUCCESS:
      return {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: null,
        token: action.data.token,
        user: action.data.user,
        limits: action.data.limits,
        isApiKeyValid: null,
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.payload,
      }
    case CLEAR_LOGIN_ERROR: {
      return { ...state, errorMessage: null }
    }
    case LOGOUT_REQUEST: {
      return { ...state, isFetching: true }
    }
    case LOGOUT_SUCCESS:
      return { ...defaultEmptyState }
    case LOGOUT_FRONTEND: {
      return { ...defaultEmptyState }
    }
    case HIDE_NOTIFICATION: {
      return {
        ...state,
        user: {
          ...state.user,
          confirmed_email: true,
        },
      }
    }
    case API_KEY_STATUS: {
      return { ...state, isApiKeyValid: action.payload }
    }
    default:
      return state
  }
}
