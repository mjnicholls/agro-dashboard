import React from 'react'

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Col,
  Row,
} from 'reactstrap'

const FailurePage = () => (
  <Card>
    <CardHeader>
      <CardTitle tag="h2">Error activating subscription</CardTitle>
    </CardHeader>
    <CardBody>
      <Row>
        <Col>
          <p>Something went wrong. Please try again or contact us </p>
        </Col>
      </Row>
      <Row>
        <Col className="text-right">
          <a
            role="button"
            href="mailto:info@openweathermap.org"
            className="btn btn-primary"
          >
            Contact us
          </a>
        </Col>
      </Row>
    </CardBody>
  </Card>
)

export default FailurePage
