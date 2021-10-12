import axios from 'axios'
import * as rax from 'retry-axios'

import { receiveLogout } from '../features/auth/actions'
import store from '../store'

const axiosInstance = axios.create({
  timeout: 15000,
})

axiosInstance.defaults.raxConfig = {
  instance: axiosInstance,
}
rax.attach(axiosInstance)

axiosInstance.interceptors.request.use((config) => {
  const { token } = store.getState().auth
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})

axiosInstance.interceptors.response.use(
  (response) => response,
  // eslint-disable-next-line
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch(receiveLogout())
    } else {
      let message = 'Something went wrong'
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message = error.response.data.message
      }
      return Promise.reject(message)
    }
  },
)

export { axiosInstance }
