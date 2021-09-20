import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';

import 'assets/css/nucleo-icons.css';
import 'react-notification-alert/dist/animate.css';
import 'assets/scss/black-dashboard-pro-react.scss?v=1.2.0';
import 'assets/demo/demo.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import Notifications from './views/agro-components/Notifications';
import AuthLayout from 'layouts/Auth/Auth.js';
import AdminLayout from 'layouts/Admin/Admin.js';
import {fetchPolygons} from './features/polygons/actions';
import {checkApiKey} from './features/auth/actions';
import AuthRoute from './services/AuthRoute';

const setState = () => {
  if (store.getState().auth.token) {
    store.dispatch(checkApiKey())
    if (store.getState().auth.isApiKeyValid) {
      store.dispatch(fetchPolygons())
    }
    else {
      setTimeout(setState, 20000)
    }
  }
}

setState();

const App = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
          <AuthRoute path="/dashboard" render={(props) => <AdminLayout {...props} /> } />
          <Redirect from="/" to="/dashboard/polygons" />
        </Switch>
      </BrowserRouter>
      <Notifications />
    </Provider>
  )
}


export default App

