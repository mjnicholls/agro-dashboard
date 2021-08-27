import {parseJwt} from "./utils";
import {getCookie} from '../../utils/cookies'

import {
  API_KEY_STATUS, CLEAR_LOGIN_ERROR,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FRONTEND,
  TOKEN_COOK,
} from './actions';

let token, tokenData;
token = getCookie(TOKEN_COOK);

if (token) {
  try {
    tokenData = parseJwt(token).passport;
  }
  catch (err) {
    console.log(err)
  }
}

const initialState =   {
  isFetching: false,
  isAuthenticated: !!tokenData,
  token: tokenData ? token : null,
  user: tokenData ? tokenData.data : {
    email: null,
    appid: null,
    tariff: null
  },
  limits: tokenData ? tokenData.limits : null,
  isApiKeyValid: null
}

export default function authReducer(state = initialState, action) {
  switch(action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: {
          email: action.payload,
          appid: null,
          tariff: null
        }
      })
    case LOGIN_SUCCESS:
      return {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: null,
        token: action.data.token,
        user: {
          email: action.data.user.email || null,
          appid: action.data.user.appid || null,
          tariff: action.data.user.tariff || null,
        },
        limits: action.data.limits
      }
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case CLEAR_LOGIN_ERROR: {
      return Object.assign({}, state, {
        errorMessage: null
      })
    }
    case LOGOUT_REQUEST: {
      return Object.assign({}, state, {
        isFetching: true
      })
    }
    case LOGOUT_SUCCESS:
      return {
        isFetching: false,
        isAuthenticated: false,
        token: null,
        user: {
          email: null,
          appid: null,
          tariff: null
        },
        limits: null,
        isApiKeyValid: null
      }
    case LOGOUT_FRONTEND: {
      return Object.assign({}, state, {
        isAuthenticated: false,
        token: null,
        user: {
          email: null,
          appid: null,
          tariff: null
        },
        limits: null
      })
    }
    case API_KEY_STATUS: {
      return Object.assign({}, state, {
        isApiKeyValid: action.payload
      })
    }
    default:
      return state
  }
}
