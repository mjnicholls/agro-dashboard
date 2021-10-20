import { getCookie } from '../../utils/cookies'
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
  TOKEN_COOK,
} from './actions'
import { parseJwt } from './utils'

let tokenData
const token = getCookie(TOKEN_COOK)

if (token) {
  try {
    tokenData = parseJwt(token).passport
  } catch (err) {
    // eslint-disable-next-line
    console.log(err)
  }
}

const initialState = {
  isFetching: false,
  isAuthenticated: !!tokenData,
  token: tokenData ? token : null,
  user: tokenData
    ? {
        ...tokenData.data,
      }
    : {
        email: null,
        appid: null,
        tariff: null,
        confirmed_email: null,
      },
  limits: tokenData ? tokenData.limits : null,
  isApiKeyValid: null,
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        user: {
          email: action.payload,
          appid: null,
          tariff: null,
          confirmed_email: null,
        },
        isApiKeyValid: null,
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
        errorMessage: action.message,
      }
    case CLEAR_LOGIN_ERROR: {
      return { ...state, errorMessage: null }
    }
    case LOGOUT_REQUEST: {
      return { ...state, isFetching: true }
    }
    case LOGOUT_SUCCESS:
      return {
        isFetching: false,
        isAuthenticated: false,
        token: null,
        user: {
          email: null,
          appid: null,
          tariff: null,
          confirmed_email: null,
        },
        limits: null,
        isApiKeyValid: null,
      }
    case LOGOUT_FRONTEND: {
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: {
          email: null,
          appid: null,
          tariff: null,
          confirmed_email: null,
        },
        limits: null,
      }
    }
    case HIDE_NOTIFICATION: {
      return {
        ...state,
        user: {
          ...state.user,
          confirmed_email: true
        }
      }
    }
    case API_KEY_STATUS: {
      return { ...state, isApiKeyValid: action.payload }
    }
    default:
      return state
  }
}
