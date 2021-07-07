import axios from 'axios';

import {logoutFrontEnd} from '../features/auth/actions'
import store from '../store'



const axiosInstance = axios.create({
// .. where we make our configurations
  timeout: 5000
});

axiosInstance.interceptors.request.use(function (config) {
  const token = store.getState().auth.token;
  config.headers.Authorization =  token ? `Bearer ${token}` : '';
  return config;
});

axiosInstance.interceptors.response.use((response) => response,
  (error) => {
  if (error.response && error.response.status === 401) {
    store.dispatch(logoutFrontEnd());
    // window.location = '/auth/login';
  }
});


export {axiosInstance};
