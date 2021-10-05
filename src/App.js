import React from 'react'

import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import './assets/css/nucleo-icons.css'
import '../node_modules/react-notification-alert/dist/animate.css'
import './assets/scss/black-dashboard-pro-react.scss'
import './assets/demo/demo.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

import { checkApiKey } from './features/auth/actions'
import { fetchPolygons } from './features/polygons/actions'
import AdminLayout from './layouts/Admin/Admin'
import AuthLayout from './layouts/Auth/Auth'
import AuthRoute from './services/AuthRoute'
import store from './store'
import Notifications from './views/agro-components/Notifications'

const setState = () => {
  if (store.getState().auth.token) {
    store.dispatch(checkApiKey())
    if (store.getState().auth.isApiKeyValid) {
      store.dispatch(fetchPolygons())
    } else {
      setTimeout(setState, 20000)
    }
  }
}

setState()

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
        <AuthRoute
          path="/dashboard"
          render={(props) => <AdminLayout {...props} />}
        />
        <Redirect from="/" to="/dashboard/polygons" />
      </Switch>
    </BrowserRouter>
    <Notifications />
  </Provider>
)

export default App
