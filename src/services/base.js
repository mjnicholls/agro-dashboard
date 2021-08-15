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
  // config.cancelToken = axios.CancelToken.source().token;
  return config;
});

// // Store requests
// let sourceRequest = {};
// axiosInstance.interceptors.request.use(function (request) {
//   if (sourceRequest[request.url]) {
//     sourceRequest[request.url].cancelToken.cancel();
//   }
//   // Store or update application token
//   const axiosSource = axios.CancelToken.source();
//   sourceRequest[request.url] = { cancelToken: axios.CancelToken.source() };
//   request.cancelToken = axiosSource.token;
//
//   return request;
// });

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
