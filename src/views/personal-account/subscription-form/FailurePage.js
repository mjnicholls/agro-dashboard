import React from 'react'

import { Card, CardHeader, CardBody, CardTitle, Col, Row } from 'reactstrap'

import ContactUsButton from '../../components/ContactUsButton'

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
          <ContactUsButton />
        </Col>
      </Row>
    </CardBody>
  </Card>
)

export default FailurePage
