import axios from 'axios'

import {
  confirmEmailURL,
  forgotPasswordURL,
  loginURL,
  logoutURL,
  resetPasswordURL,
  signupURL,
} from './index'

export const login = (email, password) =>
  axios.post(loginURL, {
    email,
    password,
  })

export const logout = () => axios.delete(logoutURL)

export const createNewUser = (data) =>
  /** Sign up method */
  axios.post(signupURL, data)

export const forgotPassword = (email) =>
  /** Get reset password instructions */
  axios.post(forgotPasswordURL, {
    user: {
      email,
    },
  })

export const changePassword = (data) =>
  /** Change password */
  axios.put(resetPasswordURL, {
    user: {
      data,
    },
  })

export const confirmEmail = (email) =>
  axios.post(confirmEmailURL, {
    user: {
      email,
    },
  })
