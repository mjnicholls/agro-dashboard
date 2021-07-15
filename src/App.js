import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import store from './store'
import { Provider } from 'react-redux'
import Notifications from './views/agro-components/Notifications'
import AuthLayout from "layouts/Auth/Auth.js";
import AdminLayout from "layouts/Admin/Admin.js";
import RTLLayout from "layouts/RTL/RTL.js";

import "assets/css/nucleo-icons.css";
import "react-notification-alert/dist/animate.css";
import "assets/scss/black-dashboard-pro-react.scss?v=1.2.0";
import "assets/demo/demo.css";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';


const App = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Route path="/rtl" render={(props) => <RTLLayout {...props} />} />
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
      </BrowserRouter>
      <Notifications />
    </Provider>
  )
}


export default App

