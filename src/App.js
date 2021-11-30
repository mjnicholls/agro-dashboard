import React, { useEffect } from 'react'

import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import './assets/css/nucleo-icons.css'
import '../node_modules/react-notification-alert/dist/animate.css'
import './assets/scss/black-dashboard-pro-react.scss'
import './assets/demo/demo.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

import ErrorBoundary from './ErrorBoundary'
import AdminLayout from './layouts/Admin/Admin'
import AuthLayout from './layouts/Auth/Auth'
import store from './store'
import {
  setGoogleAnalytics,
  saveAdCampaignInCookies,
} from './utils/advertising'
import AuthRoute from './views/AuthRoute'
import Notifications from './views/components/NotificationsTemporary'

const App = () => {
  useEffect(() => {
    setGoogleAnalytics()
    saveAdCampaignInCookies()
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
