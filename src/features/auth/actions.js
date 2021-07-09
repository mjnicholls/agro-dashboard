import {axiosInstance} from "../../services/base";
import {loginURL, logoutURL} from "../../services/api";
import {clearCookies, parseJwt, setCookie} from "./utils";
import {fetchPolygons} from '../polygons/actions'


export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const CLEAR_LOGIN_ERROR = 'CLEAR_LOGIN_ERROR'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FRONTEND = 'LOGOUT_FRONTEND'
// export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'
export const TOKEN_COOK = "AGRO_TOKEN"


const requestLogin = (email, password) => {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    email: email,
    password: password
  }
}

const receiveLogin = (data) => {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
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

export const clearLoginError = () => {
  return {
    type: CLEAR_LOGIN_ERROR,
    errorMessage: null
  }
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false,
  }
}

export function logoutFrontEnd() {
  return {
    type: LOGOUT_FRONTEND,
    // isAuthenticated: false,
    // token: null,
    // user: {
    //   email: null,
    //   appid: null,
    //   tariff: null
    // }
  }
}

export function loginUser (email, password) {

  return dispatch => {
    dispatch(requestLogin(email, password))

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
        dispatch(receiveLogin(data))
        dispatch(fetchPolygons())
      })
      .catch(err => {
        let message = "Something went wrong"
        if (err.response && err.response.data && err.response.data.message) {
          message = err.response.data.message;
        }
        dispatch(loginError(message))
      })
  }
}


export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    axiosInstance.delete(logoutURL)
      .then(() => {
        clearCookies();
        dispatch(receiveLogout());
      })
      .catch(err => {
        console.log("Logout error", err)
        // let message = "Something went wrong"
        // if (err.response && err.response.data && err.response.data.message) {
        //   message = err.response.data.message;
        // }
        // dispatch((message))
      })
  }
}




