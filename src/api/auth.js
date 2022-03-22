import axiosClient from './axiosClient'
import {
  confirmEmailURL,
  forgotPasswordURL,
  loginURL,
  logoutURL,
  resetPasswordURL,
  signupURL,
} from './index'

export const signInApi = (email, password) =>
  axiosClient.post(loginURL, {
    email,
    password,
  })

export const signOutApi = () => axiosClient.delete(logoutURL)

export const signUpApi = (data) => axiosClient.post(signupURL, data)

export const forgotPassword = (email) =>
  axiosClient.post(forgotPasswordURL, {
    user: {
      email,
    },
  })

export const changePassword = (params) =>
  axiosClient.put(resetPasswordURL, {
    user: {
      ...params,
    },
  })

export const receiveConfirmationEmail = (email) =>
  axiosClient.post(confirmEmailURL, {
    user: {
      email,
    },
  })

export const confirmEmailApi = (value) =>
  axiosClient.put(confirmEmailURL, {
    user: {
      confirmation_token: value,
    },
  })
