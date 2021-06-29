import {axiosInstance} from "../base";

const baseURL = "http://k8s-eu4.owm.io/12346";
const {post, destroy} = axiosInstance;

// export const login = `${baseURL}/auth/login`;
// export const logout = `${baseURL}/auth/logout`;

let config = {
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  }
}

const AuthApi = {
  login: (email, password) =>
    post(`${baseURL}/auth/login`, {
      "username": email,
      "password": password
    }, config),
  logout: () =>
    destroy(`${baseURL}/auth/logout`),
}

export default AuthApi;
