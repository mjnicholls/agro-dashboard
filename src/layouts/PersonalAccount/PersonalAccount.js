import React from 'react'

import classNames from 'classnames'
import PerfectScrollbar from 'perfect-scrollbar'
import NotificationAlert from 'react-notification-alert'
import { useSelector } from 'react-redux'
import { NavLink, Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { UncontrolledAlert } from 'reactstrap'

// core components
import logo from '../../assets/img/agro-logo.png'
import Footer from '../../components/Footer/Footer'
import AdminNavbar from '../../components/Navbars/AdminNavbar'
import Sidebar from '../../components/Sidebar/Sidebar2'
// import FixedPlugin from "components/FixedPlugin/FixedPlugin";
import routes from '../../routes'
import AuthRoute from '../../views/AuthRoute'

let ps
const isConfirmedEmailSelector = (state) => state.auth.user.confirmed_email

const PersonalAccount = (props) => {
  const activeColor = 'blue'
  // const [activeColor, setActiveColor] = React.useState("blue");
  // const [sidebarMini, setSidebarMini] = React.useState(true);
  const [opacity, setOpacity] = React.useState(0)
  const [sidebarOpened, setSidebarOpened] = React.useState(false)
  const mainPanelRef = React.useRef(null)
  const notificationAlertRef = React.useRef(null)
  const location = useLocation()

  const isConfirmed = useSelector(isConfirmedEmailSelector)

  React.useEffect(() => {
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0
    }
  }, [location])

  React.useEffect(() => {
    const innerMainPanelRef = mainPanelRef
    if (navigator.platform.indexOf('Win') > -1) {
      document.documentElement.classList.add('perfect-scrollbar-on')
      document.documentElement.classList.remove('perfect-scrollbar-off')
      ps = new PerfectScrollbar(mainPanelRef.current)
      if (mainPanelRef.current) {
        mainPanelRef.current.addEventListener('ps-scroll-y', showNavbarButton)
      }
      const tables = document.querySelectorAll('.table-responsive')
      for (let i = 0; i < tables.length; i += 1) {
        ps = new PerfectScrollbar(tables[i])
      }
    }
    window.addEventListener('scroll', showNavbarButton)
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy()
        document.documentElement.classList.add('perfect-scrollbar-off')
        document.documentElement.classList.remove('perfect-scrollbar-on')
        if (innerMainPanelRef.current) {
          innerMainPanelRef.current.removeEventListener(
            'ps-scroll-y',
            showNavbarButton,
          )
        }
      }
      window.removeEventListener('scroll', showNavbarButton)
    }
  }, [])

  const showNavbarButton = () => {
    if (
      document.documentElement.scrollTop > 50 ||
      document.scrollingElement.scrollTop > 50 ||
      (mainPanelRef.current && mainPanelRef.current.scrollTop > 50)
    ) {
      setOpacity(1)
    } else if (
      document.documentElement.scrollTop <= 50 ||
      document.scrollingElement.scrollTop <= 50 ||
      (mainPanelRef.current && mainPanelRef.current.scrollTop <= 50)
    ) {
      setOpacity(0)
    }
  }

  const getRoutes = (routesInstance) =>
    routesInstance.map((prop) => {
      if (prop.collapse) {
        return getRoutes(prop.views)
      }
      if (prop.layout === '/users') {
        return (
          <AuthRoute
            path={prop.layout + prop.path}
            component={prop.component}
            key={prop.layout + prop.name}
          />
        )
      }
      return null
    })

  const getRoutesInnerNavigation = (routesInstance) =>
    routesInstance.map((prop) => {
      if (prop.collapse) {
        return getRoutesInnerNavigation(prop.views)
      }
      if (prop.layout === '/users') {
        return (
          <NavLink
            className={classNames('innerMenu', {
              active:
                window.location.pathname.indexOf(prop.layout + prop.path) !==
                -1,
            })}
            to={prop.layout + prop.path}
            key={prop.layout + prop.name}
          >
            {prop.name}
          </NavLink>
        )
      }
      return null
    })

  const getActiveRoute = (routesInstance) => {
    const activeRoute = 'AgroMonitoring Dashboard'
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

  const handleMiniClick = () => {
    const notifyMessage = 'Sidebar mini '
    // if (document.body.classList.contains("sidebar-mini")) {
    //   setSidebarMini(false);
    //   notifyMessage += "deactivated...";
    // } else {
    //   setSidebarMini(true);
    //   notifyMessage += "activated...";
    // }
    let options = {}
    options = {
      place: 'tr',
      message: notifyMessage,
      type: 'primary',
      icon: 'tim-icons icon-bell-55',
      autoDismiss: 7,
    }
    notificationAlertRef.current.notificationAlert(options)
    document.body.classList.toggle('sidebar-mini')
  }

  const toggleSidebar = () => {
    setSidebarOpened(!sidebarOpened)
    document.documentElement.classList.toggle('nav-open')
  }

  const closeSidebar = () => {
    setSidebarOpened(false)
    document.documentElement.classList.remove('nav-open')
  }

  return (
    <div className="wrapper">
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <div className="navbar-minimize-fixed" style={{ opacity }}>
        <button
          type="button"
          className="minimize-sidebar btn btn-link btn-just-icon"
          onClick={handleMiniClick}
        >
          <i className="tim-icons icon-align-center visible-on-sidebar-regular text-muted" />
          <i className="tim-icons icon-bullet-list-67 visible-on-sidebar-mini text-muted" />
        </button>
      </div>
      <Sidebar
        {...props}
        routes={routes}
        activeColor={activeColor}
        logo={{
          outterLink: 'https://agromonitoring.com/',
          text: 'AgroMonitoring',
          imgSrc: logo,
        }}
        closeSidebar={closeSidebar}
      />
      <div className="main-panel" ref={mainPanelRef} data={activeColor}>
        <AdminNavbar
          {...props}
          handleMiniClick={handleMiniClick}
          brandText={getActiveRoute(routes)}
          sidebarOpened={sidebarOpened}
          toggleSidebar={toggleSidebar}
        />

        <div className="content">
          <div className="d-flex justify-content-end text-uppercase">
            {getRoutesInnerNavigation(routes)}
          </div>
          {/* <ul className="d-flex justify-content-end text-uppercase"> */}
          {/* <li>Subscription</li> */}
          {/* <li>API Keys</li> */}
          {/* <li>Billing Plans</li> */}
          {/* <li>Invoices</li> */}
          {/* <li>Settings</li> */}
          {/* </ul> */}
          {isConfirmed === false && (
            <UncontrolledAlert
              className="alert-with-icon"
              color="danger"
              fade={false}
            >
              <span data-notify="icon" className="tim-icons icon-bell-55" />
              <span data-notify="message">
                You have to verify your email to use Agro services. Please{' '}
                {/* eslint-disable-next-line */}
                <a href="#" target="_blank">
                  click here
                </a>{' '}
                to get an email with the confirmation link.
              </span>
            </UncontrolledAlert>
          )}
          <Switch>
            {getRoutes(routes)}
            <Redirect from="*" to="/users/home" />
          </Switch>
        </div>
        {
          // we don't want the Footer to be rendered on full screen maps page
          props.location.pathname.indexOf('full-screen-map') !== -1 ? null : (
            <Footer fluid />
          )
        }
      </div>
    </div>
  )
}

export default PersonalAccount
