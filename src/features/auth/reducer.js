import {parseJwt} from "./utils";
import {getCookie} from '../../utils/cookies'

import {
  CLEAR_LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, LOGOUT_FRONTEND, TOKEN_COOK
} from './actions'

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
    username: null,
    appid: null,
    tariff: null
  },
  limits: tokenData ? tokenData.limits : null
}

export default function authReducer(state = initialState, action) {
  switch(action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      })
    case LOGIN_SUCCESS:
      return {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: null,
        token: action.data.token,
        user: action.data.user,
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
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        token: null,
        user: {
          username: null,
          appid: null,
          tariff: null
        },
        limits: null
      })
    case LOGOUT_FRONTEND: {
      return Object.assign({}, state, {
        isAuthenticated: false,
        token: null,
        user: {
          username: null,
          appid: null,
          tariff: null
        },
        limits: null
      })
    }
    default:
      return state
  }
}
