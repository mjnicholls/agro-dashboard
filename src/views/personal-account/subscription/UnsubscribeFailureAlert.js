import React from 'react'

import { Button, Col, Row } from 'reactstrap'
import ReactBSAlert from 'react-bootstrap-sweetalert'
import { supportEmailMailTo } from '../../../config'

const UnsubscribeFailureAlert = ({ close }) => (
  <ReactBSAlert
    title="Error cancelling subscription"
    customClass="agro-alert-dark"
    showConfirm={false}
    onCancel={() => close()}
    showCloseButton
  >
    <Row className="my-3">
      <Col>
        <p>
          Something went wrong. Please try again or contact us at &nbsp;
          <a href={supportEmailMailTo}>info@openweathermap.org</a>
        </p>
      </Col>
    </Row>
  </ReactBSAlert>
)

export default UnsubscribeFailureAlert
