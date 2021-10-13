import axios from 'axios'

import { loginURL, logoutURL } from './index'

export const login = (email, password) =>
  axios.post(loginURL, {
    email,
    password,
  })

export const logout = () => axios.delete(logoutURL)
