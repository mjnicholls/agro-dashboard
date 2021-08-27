import {axiosInstance} from "../../services/base";
import {apiKeyStatus, loginURL, logoutURL} from "../../services/api";
import {deleteCookie, setCookie} from '../../utils/cookies';
import {parseJwt} from "./utils";
import {fetchPolygons} from '../polygons/actions'

export const API_KEY_STATUS = 'API_KEY_STATUS';
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const CLEAR_LOGIN_ERROR = 'CLEAR_LOGIN_ERROR'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FRONTEND = 'LOGOUT_FRONTEND'
export const TOKEN_COOK = "AGRO_TOKEN"


const requestLogin = (email) => {
  return {
    type: LOGIN_REQUEST,
    payload: email,
  }
}

const receiveLogin = (data) => {
  return {
    type: LOGIN_SUCCESS,
    data
  }
}

const loginError = (message) => {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export const setApiKeyStatus = (status) => {
  return {
    type: API_KEY_STATUS,
    payload: status
  }
}

export const clearLoginError = () => {
  return {
    type: CLEAR_LOGIN_ERROR,
  }
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
  }
}

export function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
  }
}

export const destroyReduxState = () => {
  return {
    type: "DESTROY_STATE"
  }
}


export const loginUser = (email, password) => {

  return dispatch => {
    dispatch(requestLogin(email))

    axiosInstance.post(loginURL, {
      "email": email,
      "password": password
    })
      .then(response => {
        let token = response.data.token;
        let tokenInfo;
        try {
          tokenInfo = parseJwt(response.data.token).passport;
        }
        catch {
          dispatch(loginError("Error parsing token")) // TODO
        }
        if (!tokenInfo) {
          dispatch(loginError("Error parsing token")) // TODO
        }
        setCookie(TOKEN_COOK, token)

        let data = {
          token: token,
          user: tokenInfo.data,
          limits: tokenInfo.limits
        }
        dispatch(receiveLogin(data));
        dispatch(checkApiKey());
      })
      .catch(err => {
        let message;
        if (typeof err === "string") {
          message = err;
        }
        else if (err.response && err.response.data && err.response.data.message) {
          message = err.response.data.message;
        }
        dispatch(loginError(message || "Something went wrong"))
      })
  }
}

export const logoutUser = () => {
  return async function logoutThunk(dispatch) {
    dispatch(requestLogout())
    axiosInstance.delete(logoutURL)
      .then(() => {
        deleteCookie(TOKEN_COOK, "/");
        dispatch(destroyReduxState());
        dispatch(receiveLogout());
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const checkApiKey = () => {
  return dispatch => {
    axiosInstance.get(apiKeyStatus)
      .then(() => {
        dispatch(setApiKeyStatus(true))
        dispatch(fetchPolygons())
      })
      .catch(err => {
        console.log(err)
        dispatch(setApiKeyStatus(false))
      })
  }
}