import {axiosInstance} from "../base";

const portDev = 11112;
const portProd = 12346;

let port = portDev;

const baseURL = `http://k8s-eu4.owm.io/${portProd}`;
const {post, destroy} = axiosInstance;

// export const login = `${serverBaseURL}/auth/login`;
// export const logout = `${serverBaseURL}/auth/logout`;

let config = {
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  }
}

const AuthApi = {
  login: (email, password) =>
    post(`${baseURL}/auth/login`, {
      "email": email,
      "password": password
    }, config),
  logout: () =>
    destroy(`${baseURL}/auth/logout`),
}

export default AuthApi;
