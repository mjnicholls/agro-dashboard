import React from 'react'

import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const isAuthenticatedSelector = (state) => state.auth.isAuthenticated

const AuthRoute = (props) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector)
  if (!isAuthenticated) {
    return (
      <Redirect
        to={{
          pathname: '/auth/login',
          state: { from: props.location },
        }}
      />
    )
  }
  return <Route {...props} />
}

export default AuthRoute
