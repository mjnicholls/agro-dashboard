import React from 'react'

import classnames from 'classnames'
import { NavLink } from 'react-router-dom'

import PropTypes from 'prop-types'
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
} from 'reactstrap'

const AuthNavbar = (props) => {
  const [collapseOpen, setCollapseOpen] = React.useState(false)
  const [color, setColor] = React.useState('navbar-transparent')
  // this function opens and closes the collapse on small devices
  // it also adds navbar-transparent class to the navbar when closed
  // ad bg-white when opened
  const toggleCollapse = () => {
    if (collapseOpen) {
      setColor('navbar-transparent')
    } else {
      setColor('bg-white')
    }
    setCollapseOpen(!collapseOpen)
  }
  return (
    <Navbar
      className={classnames('navbar-absolute fixed-top', color)}
      expand="lg"
    >
      <Container fluid>
        <div className="navbar-wrapper">
          <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
            {props.brandText}
          </NavbarBrand>
        </div>
        <button
          aria-controls="navigation-index"
          aria-expanded={false}
          aria-label="Toggle navigation"
          className="navbar-toggler"
          data-toggle="collapse"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
        </button>
        <Collapse isOpen={collapseOpen} navbar>
          <Nav navbar className="ml-auto">
            <NavItem>
              <NavLink
                to="/dashboard/polygons"
                className="nav-link text-primary"
              >
                <i className="tim-icons icon-minimal-left" /> Back to Dashboard
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                to="/auth/sign-up/"
                className="nav-link text-primary"
              >
                <i className="tim-icons icon-single-02" /> Register
              </NavLink>
            </NavItem>
            {/* <NavItem> */}
            {/* <NavLink to="/auth/login" className="nav-link"> */}
            {/* <i className="tim-icons icon-single-02" /> Login */}
            {/* </NavLink> */}
            {/* </NavItem> */}
            <NavItem>
              <a className="nav-link" href="https://agromonitoring.com/price">
                <i className="tim-icons icon-coins" /> Pricing
              </a>
            </NavItem>
            <NavItem>
              <a className="nav-link" href="https://agromonitoring.com/">
                <i className="tim-icons icon-laptop" /> Website
              </a>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  )
}

AuthNavbar.propTypes = {
 brandText: PropTypes.string
}

export default AuthNavbar
