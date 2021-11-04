import React from 'react'
import { logoutUser } from '../../../features/auth/actions'

import { useDispatch } from 'react-redux'
import { Button, Col, Row } from 'reactstrap'
import ReactBSAlert from 'react-bootstrap-sweetalert'

const UnsubscribeSuccessAlert = () => {
  const dispatch = useDispatch()

  const logOut = () => {
    dispatch(logoutUser())
  }

  return (
    <ReactBSAlert
      title="You are successfully unsubscribed"
      customClass="agro-alert-dark"
      showConfirm={false}
    >
      <Row className="my-3">
        <Col>
          <p>
            Please sign out and sign in again for changes to take effect. Please
            bear in mind that it might take a few minutes to process your
            request.
          </p>
        </Col>
      </Row>
      <Row>
        <Col className="text-right">
          <Button
            className="btn btn-primary"
            color="primary"
            data-dismiss="modal"
            type="button"
            onClick={logOut}
          >
            Logout
          </Button>
        </Col>
      </Row>
    </ReactBSAlert>
  )
}

export default UnsubscribeSuccessAlert
