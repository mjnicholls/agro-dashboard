import React from 'react'

import axios from 'axios'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import './assets/css/nucleo-icons.css'
import '../node_modules/react-notification-alert/dist/animate.css'
import './assets/scss/black-dashboard-pro-react.scss'
import './assets/demo/demo.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

import AuthRoute from './api/AuthRoute'
import { receiveLogout } from './features/auth/actions'
import AdminLayout from './layouts/Admin/Admin'
import AuthLayout from './layouts/Auth/Auth'
import store from './store'
import Notifications from './views/agro-components/Notifications'

// import GA4React from 'ga-4-react'

axios.defaults.headers.common.Authorization = `Bearer ${
  store.getState().auth.token
}`
axios.defaults.timeout = 15000
axios.interceptors.response.use(
  (response) => (response && response.data ? response.data : response),
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch(receiveLogout())
      return Promise.reject(error)
    }
    let message = ''
    let newErr
    if (error.response && error.response.data) {
      if (error.response.data.message) {
        const m = error.response.data.message
        if (typeof m === 'object') {
          const arr = Object.keys(m)
          for (let i = 0; i < arr.length; i += 1) {
            const key = arr[i]
            const val = m[key]
            console.log(key, val)
            message += `${key} ${Array.isArray(val) ? val.join(', ') : val}`
          }
        } else {
          message = m
        }
      } else if (error.response.data.code && error.response.data.code === 404) {
        // нет message, проверить код на 404
        message = 'Not found'
      }
      newErr = {
        ...error.response.data,
        message: message || 'Something went wrong',
      }
    }
    if (!newErr) {
      newErr = {
        ...error,
        message: 'Something went wrong',
      }
    }
    // if (
    //   error.response &&
    //   error.response.data &&
    //   error.response.data.message
    // ) {
    //   console.log("here", error.response.data)
    //   newErr = {...error.response.data}
    // }
    return Promise.reject(newErr)
  },
)

// const ga4react = new GA4React(
//   'G-JE5157018X'
// )
//
// ga4react.initialize().then(
//   (ga4) => {
//     ga4.pageview('path')
//   },
//   (err) => {
//     console.error(err)
//   },
// )

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
        <AuthRoute
          path="/dashboard"
          render={(props) => <AdminLayout {...props} />}
        />
        <AuthRoute
          path="/users"
          render={(props) => <AdminLayout {...props} />}
        />
        <Redirect from="/" to="/dashboard/polygons" />
      </Switch>
    </BrowserRouter>
    <Notifications />
  </Provider>
)

export default App
