import React from 'react'

import ReactBSAlert from 'react-bootstrap-sweetalert'
import { useDispatch } from 'react-redux'
import { Button, Col, Row } from 'reactstrap'

import { supportEmailMailTo } from '../../../config'
import { logoutUser } from '../../../features/auth/actions'

const SuccessPage = (props) => {
  const dispatch = useDispatch()

  const logOut = () => {
    props.history.push('/users/home')
    dispatch(logoutUser())
  }

  return (
    <ReactBSAlert
      title="You have successfully subscribed"
      customClass="agro-alert-dark"
      showConfirm={false}
    >
      <Row>
        <Col>
          <p>
            Please sign out and sign in again for changes to take effect. Please
            bear in mind that it might take a few minutes to process your
            request.
          </p>
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
          <p>
            If you have a problem activating your subscription, please contact
            us at&nbsp;
            <a href={supportEmailMailTo}>info@openweathermap.org</a>
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
            Sign out
          </Button>
        </Col>
      </Row>
    </ReactBSAlert>
  )
}

export default SuccessPage
