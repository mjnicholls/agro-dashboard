import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar'
// react plugin for creating notifications over the dashboard
import NotificationAlert from 'react-notification-alert'
import { Col, Row } from 'reactstrap'

import PropagateLoader from 'react-spinners/PropagateLoader'
// core components
import AdminNavbar from '../../components/Navbars/AdminNavbar.js'
import Footer from '../../components/Footer/Footer.js'
import Sidebar from '../../components/Sidebar/Sidebar2.js'
// import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from '../../routes.js'

import logo from '../../assets/img/agro-logo.png'

let ps

const selectIsApiKeyValid = (state) => state.auth.isApiKeyValid

const Admin = (props) => {
  const activeColor = 'blue'
  // const [activeColor, setActiveColor] = React.useState("blue");
  // const [sidebarMini, setSidebarMini] = React.useState(true);
  const [opacity, setOpacity] = React.useState(0)
  const [sidebarOpened, setSidebarOpened] = React.useState(false)
  const mainPanelRef = React.useRef(null)
  const notificationAlertRef = React.useRef(null)
  const location = useLocation()
  const isApiKeyValid = useSelector(selectIsApiKeyValid)

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
      for (let i = 0; i < tables.length; i++) {
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

  const getRoutes = (routes) =>
    routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views)
      }
      if (prop.layout === '/dashboard') {
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
    const activeRoute = 'AgroMonitoring Dashboard'
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
          {isApiKeyValid ? (
            <Switch>
              {getRoutes(routes)}
              <Redirect from="*" to="/dashboard/polygons" />
            </Switch>
          ) : (
            <Row>
              <Col className="text-center my-5 align-self-center">
                <div className="my-5">
                  <div>
                    <PropagateLoader color="#f2f2f2" size={15} />
                    <br />
                  </div>
                  {isApiKeyValid === false && (
                    <p className="my-3">
                      Synchronizing API key... It might take a few minutes
                    </p>
                  )}
                </div>
              </Col>
            </Row>
          )}
        </div>
        {
          // we don't want the Footer to be rendered on full screen maps page
          props.location.pathname.indexOf('full-screen-map') !== -1 ? null : (
            <Footer fluid />
          )
        }
      </div>
      {/* <FixedPlugin */}
      {/* activeColor={activeColor} */}
      {/* sidebarMini={sidebarMini} */}
      {/* handleActiveClick={handleActiveClick} */}
      {/* handleMiniClick={handleMiniClick} */}
      {/* /> */}
    </div>
  )
}

export default Admin
