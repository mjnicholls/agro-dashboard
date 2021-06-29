import {getCookie, parseJwt} from "./utils";
import {
  CLEAR_LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, LOGOUT_FRONTEND, TOKEN_COOK
} from './actions'

let token, user;
token = getCookie(TOKEN_COOK);
if (token) {
  try {
    let tokenInfo = parseJwt(token)
    if (tokenInfo && tokenInfo.passport && tokenInfo.passport.data) {
      let userInfo = tokenInfo.passport.data;
      user = {
        email: userInfo.username,
        appid: userInfo.appid,
        tariff: userInfo.tariff
      }
    }
  }
  catch (err) {
    console.log(err)
  }
}

const initialState =   {
  isFetching: false,
  isAuthenticated: !!user,
  token: user ? token : null,
  user: user ? user : {
    email: null,
    appid: null,
    tariff: null
  },
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
        user: action.data.user
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
          email: null,
          appid: null,
          tariff: null
        }
      })
    case LOGOUT_FRONTEND: {
      return Object.assign({}, state, {
        isAuthenticated: false,
        token: null,
        user: {
          email: null,
          appid: null,
          tariff: null
        }
      })
    }
    default:
      return state
  }
}
