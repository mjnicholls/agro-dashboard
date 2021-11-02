import React from 'react'

import PropTypes from 'prop-types'
import { Container } from 'reactstrap'

const Footer = (props) => (
  <footer className={`footer${props.default ? ' footer-default' : ''}`}>
    <Container fluid={!!props.fluid}>
      <ul className="nav">
        <li className="nav-item">
          <a
            className="nav-link"
            href="https://agromonitoring.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            AgroMonitoring
          </a>
        </li>{' '}
        <li className="nav-item">
          <a
            className="nav-link"
            href="https://agromonitoring.com/dashboard/dashboard-documentation"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </li>{' '}
        <li className="nav-item">
          <a
            className="nav-link"
            href="https://old.agromonitoring.com/dashboard/satellite"
            target="_blank"
            rel="noopener noreferrer"
          >
            Old dashboard
          </a>
        </li>
      </ul>

      <div className="copyright">
        2012 - {new Date().getFullYear()}{' '}
        <a href="https://agromonitoring.com/" target="_blank" rel="noreferrer">
          AgroMonitoring ©
        </a>{' '}
        All rights reserved
      </div>
    </Container>
  </footer>
)

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool,
}

export default Footer
