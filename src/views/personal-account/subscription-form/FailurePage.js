import React from 'react'

import { Card, CardHeader, CardBody, CardTitle, Col, Row } from 'reactstrap'
import { Link } from 'react-router-dom'

import {supportEmailMailTo} from "../../../config";

const FailurePage = () => (
  <Card>
    <CardHeader>
      <CardTitle tag="h2">Error activating subscription</CardTitle>
    </CardHeader>
    <CardBody>
      <Row>
        <Col>
          <p>Something went wrong. Please try again or contact us at &nbsp;
            <a href={supportEmailMailTo}>info@openweathermap.org</a>.</p>
        </Col>
      </Row>
      <Row>
        <Col className="text-right">
          <Link role="button" color="primary" className="btn btn-primary" to="/users/billing-plans" >Back to plans</Link>
        </Col>
      </Row>
    </CardBody>
  </Card>
)

export default FailurePage
