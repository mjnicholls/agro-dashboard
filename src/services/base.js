import axios from 'axios';
import * as rax from 'retry-axios';


import {logoutFrontEnd} from '../features/auth/actions'
import store from '../store'

const axiosInstance = axios.create({
  timeout: 15000
});

axiosInstance.defaults.raxConfig = {
  instance: axiosInstance
};
const interceptorId = rax.attach(axiosInstance);

axiosInstance.interceptors.request.use(function (config) {
  const token = store.getState().auth.token;
  config.headers.Authorization =  token ? `Bearer ${token}` : '';
  return config;
});

axiosInstance.interceptors.response.use(response => response,
  error => {
    if (error.response && error.response.status === 401) {
      store.dispatch(logoutFrontEnd());
    } else {
      let message = "Something went wrong";
      if (error.response && error.response.data && error.response.data.message) {
        message = error.response.data.message;
      }
      return Promise.reject(message);
    }
});


export {axiosInstance};
