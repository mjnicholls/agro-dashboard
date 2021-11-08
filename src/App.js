import React, { useEffect } from 'react'

import axios from 'axios'
import GA4React from 'ga-4-react'
import queryString from 'query-string'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import './assets/css/nucleo-icons.css'
import '../node_modules/react-notification-alert/dist/animate.css'
import './assets/scss/black-dashboard-pro-react.scss'
import './assets/demo/demo.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

import { gaID, cookies, defaultTimeout } from './config'
import ErrorBoundary from './ErrorBoundary'
import { receiveLogout } from './features/auth/actions'
import AdminLayout from './layouts/Admin/Admin'
import AuthLayout from './layouts/Auth/Auth'
import store from './store'
import { setCookie } from './utils/cookies'
import AuthRoute from './views/AuthRoute'
import Notifications from './views/components/NotificationsTemporary'

axios.defaults.headers.common.Authorization = `Bearer ${
  store.getState().auth.token
}`
axios.defaults.timeout = defaultTimeout

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

const App = () => {
  useEffect(() => {
    /* Check advertising campaign in cookies, set Google Analytics */
    const ga4react = new GA4React()

    ga4react.initialize(gaID).then(
      (ga4) => {
        ga4.pageview('path')
      },
      (err) => {
        /* eslint-disable-next-line */
        console.error(err)
      },
    )
    const queryParams = queryString.parse(window.location.search)
    const tokenVal = queryParams.campaign_id
    if (tokenVal) {
      const date = Math.round(new Date().getTime() / 1000)
      setCookie(cookies.ad, `campaign_id=${tokenVal}&date=${date}`) // TODO domains?
    }
  }, [])

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  )
}

export default App
