/*!

=========================================================
* Black Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react'

import { Route, Switch, Redirect } from 'react-router-dom'

import Footer from '../../components/Footer/Footer.js'
import AuthNavbar from '../../components/Navbars/AuthNavbar.js'
import routes from '../../routes.js'

const Pages = (props) => {
  // React.useEffect(() => {
  //   document.documentElement.classList.remove("nav-open");
  // });
  const getRoutes = (routes) =>
    routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views)
      }
      if (prop.layout === '/auth') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={prop.layout + prop.name}
          />
        )
      }
      return null
    })

  const getActiveRoute = (routes) => {
    const activeRoute = 'AgroMonitoring'
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        const collapseActiveRoute = getActiveRoute(routes[i].views)
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute
        }
      } else if (
        window.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name
      }
    }
    return activeRoute
  }
  const getFullPageName = (routes) => {
    const pageName = getActiveRoute(routes)
    switch (pageName) {
      case 'Pricing':
        return 'pricing-page'
      case 'Login':
        return 'login-page'
      case 'Register':
        return 'register-page'
      case 'Lock Screen':
        return 'lock-page'
      default:
        return 'Default Brand Text'
    }
  }
  return (
    <>
      <AuthNavbar brandText={`${getActiveRoute(routes)} Page`} />
      <div className="wrapper wrapper-full-page">
        <div className={`full-page ${getFullPageName(routes)}`}>
          <Switch>
            {getRoutes(routes)}
            <Redirect from="*" to="/auth/login" />
          </Switch>
          <Footer fluid />
        </div>
      </div>
    </>
  )
}

export default Pages
