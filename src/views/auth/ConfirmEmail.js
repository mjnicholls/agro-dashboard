import React, { useEffect, useState } from 'react'

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Container,
} from 'reactstrap'
import queryString from 'query-string'
import { useDispatch } from 'react-redux'

import {
  notifyError,
  notifySuccess,
} from '../../features/notifications/actions'
import LoaderCircle from '../components/LoaderCircle'
import { confirmEmailApi } from '../../api/auth'

const ConfirmEmail = (props) => {

  const [token, setToken] = useState('test')
  const [isFetching, setIsFetching] = useState(false)
  const dispatch = useDispatch()

  const confirmEmail = () => {
    setIsFetching(true)
    confirmEmailApi(token)
      .then(() => {dispatch(notifySuccess('Email confirmed'))})
      .catch((err) => {
        dispatch(notifyError(`Error confirming email: ${err.message}`))
      })
      .finally(() => setIsFetching(false))
  }

  useEffect(() => {
    const queryParams = queryString.parse(props.location.search)
    const tokenVal = queryParams.confirmation_token
    if (tokenVal) {
      setToken(tokenVal)
    }
  }, [])

  return (
    <div className="content">
      <Container>
        <Row>
          <Col className="ml-auto mr-auto" lg="6" md="8">
            <Card className="card-lock card-white" style={{minHeight: "170px"}}>
              <CardHeader>
                <CardTitle tag="h3">
                  <b>Confirm email</b>
                </CardTitle>
              </CardHeader>
              <CardBody>
                {isFetching &&
                  <LoaderCircle  /> }
              </CardBody>
                {!isFetching && <CardFooter className="d-flex justify-content-between">
                  <Button onClick={confirmEmail} color="primary">
                    Confirm
                  </Button>
                </CardFooter> }
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ConfirmEmail
