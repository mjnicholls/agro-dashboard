import React from 'react'

import ReactBSAlert from 'react-bootstrap-sweetalert'
import { Link } from 'react-router-dom'
import { Col, Row } from 'reactstrap'

import { supportEmailMailTo } from '../../../config'

const FailurePage = () => (
  <ReactBSAlert
    title="Error activating subscription"
    customClass="agro-alert-dark"
    showConfirm={false}
  >
    <Row className="my-3">
      <Col>
        <p>
          Something went wrong. Please try again or contact us at &nbsp;
          <a href={supportEmailMailTo}>info@openweathermap.org</a>
        </p>
      </Col>
    </Row>
    <Row>
      <Col className="text-right">
        <Link
          role="button"
          color="primary"
          className="btn btn-primary"
          to="/users/billing-plans"
        >
          Back to plans
        </Link>
      </Col>
    </Row>
  </ReactBSAlert>
)

export default FailurePage
