import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useSelector } from 'react-redux'
const isAuthenticatedSelector = state => state.auth.isAuthenticated;

const AuthRoute = props => {
  let isAuthenticated = useSelector(isAuthenticatedSelector);
  if (!isAuthenticated) {
    return <Redirect to={{
      pathname: "/auth/login",
      state: { from: props.location }
    }} />
  }
  return <Route {...props} />;
};

export default AuthRoute;