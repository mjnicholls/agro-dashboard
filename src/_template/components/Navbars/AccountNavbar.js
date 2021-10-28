import React from 'react'

import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip,
} from 'reactstrap'

import { logoutUser } from '../../features/auth/actions'

const userEmailSelector = (state) => state.auth.user.email
const selectActivePoly = (state) => state.state.polygon
const selectIsSatelliteMode = (state) => state.state.isSatelliteMode

const AccountNavbar = (props) => {
  const [collapseOpen, setCollapseOpen] = React.useState(false)
  const [color, setColor] = React.useState('navbar-transparent')
  const userEmail = useSelector(userEmailSelector)
  const dispatch = useDispatch()
  const activePolygon = useSelector(selectActivePoly)
  const isSatelliteMode = useSelector(selectIsSatelliteMode)

  React.useEffect(() => {
    window.addEventListener('resize', updateColor)
    return function cleanup() {
      window.removeEventListener('resize', updateColor)
    }
  })

  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && collapseOpen) {
      setColor('bg-white')
    } else {
      setColor('navbar-transparent')
    }
  }

  // this function opens and closes the collapse on small devices
  const toggleCollapse = () => {
    if (collapseOpen) {
      setColor('navbar-transparent')
    } else {
      setColor('bg-white')
    }
    setCollapseOpen(!collapseOpen)
  }

  const logOut = () => {
    dispatch(logoutUser())
  }

  const getActiveRoute = (routes) => {
    const activeRoute = 'Default Brand Text'
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

  const pageName = () => {
    let activeRoute = 'AgroMonitoring Dashboard'
    if (props.location.pathname.indexOf('/new-polygon') !== -1) {
      activeRoute = 'New polygon'
    } else if (activePolygon) {
      activeRoute = `${activePolygon.name}: ${
        isSatelliteMode ? 'Satellite data' : 'Weather data'
      }`
    }
    return activeRoute
  }

  return (
    <Navbar
      className={classNames('navbar-absolute', {
        [color]: props.location.pathname.indexOf('full-screen-map') === -1,
      })}
      expand="lg"
    >
      <Container fluid>
        <div className="navbar-wrapper">
          <div className="navbar-minimize d-inline">
            <Button
              className="minimize-sidebar btn-just-icon"
              color="link"
              id="tooltip209599"
              onClick={props.handleMiniClick}
            >
              <i className="tim-icons icon-align-center visible-on-sidebar-regular" />
              <i className="tim-icons icon-bullet-list-67 visible-on-sidebar-mini" />
            </Button>
            <UncontrolledTooltip
              delay={0}
              target="tooltip209599"
              placement="right"
            >
              Sidebar toggle
            </UncontrolledTooltip>
          </div>
          <div
            className={classNames('navbar-toggle d-inline', {
              toggled: props.sidebarOpened,
            })}
          >
            <button
              className="navbar-toggler"
              type="button"
              onClick={props.toggleSidebar}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
            {pageName()}
            {/* {props.brandText} */}
          </NavbarBrand>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navigation"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
        </button>
        <Collapse navbar isOpen={collapseOpen}>
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle
                caret
                color="default"
                data-toggle="dropdown"
                nav
                onClick={(e) => e.preventDefault()}
              >
                <div className="d-none d-lg-block">{userEmail}</div>
                <b
                  className="caret d-none d-lg-block d-xl-block"
                  style={{ left: 'auto', right: 0, top: '60%' }}
                />
                <p className="d-lg-none">{userEmail}</p>
              </DropdownToggle>
              <DropdownMenu className="dropdown-navbar" right tag="ul">
                {/* <NavLink tag="li"> */}
                {/* <DropdownItem className="nav-item">Profile</DropdownItem> */}
                {/* </NavLink> */}
                {/* <NavLink tag="li"> */}
                {/* <DropdownItem className="nav-item">Settings</DropdownItem> */}
                {/* </NavLink> */}
                {/* <DropdownItem divider tag="li" /> */}
                <NavLink tag="li">
                  <DropdownItem className="nav-item" onClick={logOut}>
                    Log out
                  </DropdownItem>
                </NavLink>
              </DropdownMenu>
            </UncontrolledDropdown>
            {/* <li> */}
            {/* <a className="btn btn-simple btn-github" */}
            {/* role="button" href="https://old.agromonitoring.com/dashboard/satellite" */}
            {/* target="_blank" rel="noopener noreferrer" */}
            {/* >Old Dashboard</a></li> */}
            <li className="separator d-lg-none" />
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  )
}

export default AccountNavbar
