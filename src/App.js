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
import PersonalAccountLayout from './layouts/PersonalAccount/PersonalAccount'
import store from './store'
import Notifications from './views/agro-components/Notifications'

axios.defaults.headers.common.Authorization = `Bearer ${
  store.getState().auth.token
}`
axios.defaults.timeout = 15000
axios.interceptors.response.use(
  (response) => (response && response.data ? response.data : response),
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

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
        <AuthRoute
          path="/dashboard"
          render={(props) => <AdminLayout {...props} />}
        />
        <Route path="/users" render={(props) => <AdminLayout {...props} />} />
        <Redirect from="/" to="/dashboard/polygons" />
      </Switch>
    </BrowserRouter>
    <Notifications />
  </Provider>
)

export default App
