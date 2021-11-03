import React, {useEffect} from 'react'

import axios from 'axios'
import GA4React from 'ga-4-react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import './assets/css/nucleo-icons.css'
import '../node_modules/react-notification-alert/dist/animate.css'
import './assets/scss/black-dashboard-pro-react.scss'
import './assets/demo/demo.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

import { receiveLogout } from './features/auth/actions'
import AdminLayout from './layouts/Admin/Admin'
import AuthLayout from './layouts/Auth/Auth'
import store from './store'
import AuthRoute from './views/AuthRoute'
import Notifications from './views/components/NotificationsTemporary'
import {setCookie} from "./utils/cookies";
import queryString from 'query-string'
import {cookies} from './config'

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
      const { data } = error.response
      if ((data.description && data.description.message) || data.message) {
        const errorMessage =
          data.description && data.description.message
            ? data.description.message
            : data.message
        if (typeof errorMessage === 'object') {
          const arr = Object.keys(errorMessage)
          for (let i = 0; i < arr.length; i += 1) {
            const key = arr[i]
            const val = errorMessage[key]
            message += `${key} ${Array.isArray(val) ? val.join(', ') : val}`
          }
        } else {
          message = errorMessage
        }
      } else if (data.code && data.code === 404) {
        // нет message, проверить код на 404
        message = 'Not found'
      }
      newErr = {
        ...data,
        message: message || 'Something went wrong',
      }
    }

    if (!newErr) {
      newErr = {
        ...error,
        message: 'Something went wrong',
      }
    }

    return Promise.reject(newErr)
  },
)

const ga4react = new GA4React('G-JE5157018X')

ga4react.initialize().then(
  (ga4) => {
    ga4.pageview('path')
  },
  (err) => {
    /* eslint-disable-next-line */
    console.error(err)
  },
)

const App = () => {

  useEffect(() => {
    const queryParams = queryString.parse(window.location.search)
    const tokenVal = queryParams.ad_campaign
    if (tokenVal) {
      const date = Math.round(new Date().getTime() / 1000)
      setCookie(cookies.ad, `campaign=${tokenVal}&date=${date}`) // TODO domains?
    }
  }, [])


  return (
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
}

export default App
