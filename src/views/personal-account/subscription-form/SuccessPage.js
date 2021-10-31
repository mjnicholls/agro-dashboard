import React from 'react'

import { useDispatch } from 'react-redux'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Col,
  Row,
} from 'reactstrap'

import { supportEmailMailTo } from '../../../config'
import { logoutUser } from '../../../features/auth/actions'

const SuccessPage = () => {
  const dispatch = useDispatch()

  const logOut = () => {
    dispatch(logoutUser())
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h2">You have successfully subscribed</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col>
            <p>
              It might take a few minutes to process your request. Please sign
              out and sign in again for changes to take effect.{' '}
            </p>
            <p>
              If you have any problem with activation your billing subscription,
              please contact us at{' '}
              <a href={supportEmailMailTo}>info@openweathermap.org</a>.
            </p>
            <p>You will be automatically signed out in ...</p>
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
      </CardBody>
    </Card>
  )
}

export default SuccessPage
