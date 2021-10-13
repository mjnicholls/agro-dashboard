import React from 'react'

import { Route, Switch, Redirect } from 'react-router-dom'

import Footer from '../../components/Footer/Footer'
import AuthNavbar from '../../components/Navbars/AuthNavbar'
import routes from '../../routes'

const Pages = () => {
  // React.useEffect(() => {
  //   document.documentElement.classList.remove("nav-open");
  // });

  const getRoutes = (routesInstance) =>
    routesInstance.map((prop) => {
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

  const getActiveRoute = (routesInstance) => {
    const activeRoute = 'AgroMonitoring'
    for (let i = 0; i < routesInstance.length; i += 1) {
      if (routesInstance[i].collapse) {
        const collapseActiveRoute = getActiveRoute(routesInstance[i].views)
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute
        }
      } else if (
        window.location.pathname.indexOf(
          routesInstance[i].layout + routesInstance[i].path,
        ) !== -1
      ) {
        return routesInstance[i].name
      }
    }
    return activeRoute
  }
  const getFullPageName = (routesInstance) => {
    const pageName = getActiveRoute(routesInstance)
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
