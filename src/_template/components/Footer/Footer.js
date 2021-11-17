import React from 'react'

import PropTypes from 'prop-types'
import { Col, Container, Row } from 'reactstrap'

//fluid={!!props.fluid}

const Footer = (props) => (
  <footer className={`footer${props.default ? ' footer-default' : ''}`}>
    <Container fluid="xxl">
      <Row>
        <Col lg="8">
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
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://old.agromonitoring.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Old Personal Account
              </a>
            </li>
          </ul>
        </Col>
        <Col lg="4">
          <div className="copyright">
            2012 - {new Date().getFullYear()}{' '}
            <a
              href="https://agromonitoring.com/"
              target="_blank"
              rel="noreferrer"
            >
              AgroMonitoring ©
            </a>{' '}
            All rights reserved
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <ul className="nav my-3">
            <li className="nav-item">
              <a
                className="nav-link text-capitalize"
                href="https://agromonitoring.com/storage/app/media/Terms/ExtremeElectronics_terms_and_conditions_of_sale.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms and conditions of sale
              </a>
            </li>{' '}
            <li className="nav-item">
              <a
                className="nav-link text-capitalize"
                href="https://agromonitoring.com/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy policy
              </a>
            </li>{' '}
            <li className="nav-item">
              <a
                className="nav-link text-capitalize"
                href="https://agromonitoring.com/storage/app/media/Terms/ExtremeElectronics_website_terms_and_conditions_of_use.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms and conditions of use
              </a>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
    <Container></Container>
  </footer>
)

Footer.propTypes = {
  default: PropTypes.bool,
  // fluid: PropTypes.bool,
}

export default Footer
