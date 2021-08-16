import React from "react";
import { HashRouter, BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import store from './store'
import { Provider } from 'react-redux'

import "assets/css/nucleo-icons.css";
import "react-notification-alert/dist/animate.css";
import "assets/scss/black-dashboard-pro-react.scss?v=1.2.0";
import "assets/demo/demo.css";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import Notifications from './views/agro-components/Notifications'
import AuthLayout from "layouts/Auth/Auth.js";
import AdminLayout from "layouts/Admin/Admin.js";
import {fetchPolygons} from "./features/polygons/actions";

store.dispatch(fetchPolygons())

const App = () => {

  return (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
          <Route path="/dashboard" render={(props) => <AdminLayout {...props} />} />
          {/*<Route path="/rtl" render={(props) => <RTLLayout {...props} />} />*/}
          <Redirect from="/" to="/dashboard/polygons" />
        </Switch>
      </HashRouter>
      <Notifications />
    </Provider>
  )
}


export default App

