import React from 'react'

import { Col, Row } from 'reactstrap'

import LoaderDots from './LoaderDots'

const Synchronizing = (props) => (
  <Row>
    <Col className="text-center my-5 align-self-center">
      <div className="my-5">
        <div>
          <LoaderDots />
          <br />
        </div>
        <p className="my-3">{props.children}</p>
      </div>
    </Col>
  </Row>
)

export default Synchronizing
