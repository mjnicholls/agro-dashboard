import React, { useState } from 'react'

import { useDispatch } from 'react-redux'

import classnames from 'classnames'
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
} from 'reactstrap'

import {
  notifyError,
  notifySuccess,
} from '../../features/notifications/actions'

import { validateEmail } from '../../utils/validation'

const ResetPass = () => {

  const [emailFocus, setEmailFocus] = React.useState(false)

  const [email, setEmail] = useState('')
  const [error, setError] = useState(false)

  const dispatch = useDispatch()

  const confirmPassReset = () => {
    setError(false)

    if (!email.length) {
      dispatch(notifyError('Please enter your email address'))
      setError(true)
      return
    }

    if (!validateEmail(email)) {
      setError(true)
      dispatch(notifyError('Email address is incorrect'))
      return
    }

    // eslint-disable-next-line
    updatePass({email: email})
      .then(() => {
        dispatch(notifySuccess('Email sent!'))
      })
      .catch((err) => {
        // eslint-disable-next-line
        dispatch(notifyError(`Error resetting password: ${err.message}`))
      })
  }

  return (
    <>
      <div className="content">
        <Container>
          <Col className="ml-auto mr-auto" lg="4" md="6">
            <Card className="card-lock card-white text-center">
              <CardBody>
                <CardTitle tag="h4">Reset Password</CardTitle>
                <InputGroup
                  className={classnames({
                    'input-group-focus': emailFocus,
                    'has-danger': error.email,
                  })}
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="tim-icons icon-email-85" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Enter email"
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                  />
                </InputGroup>
              </CardBody>
              <CardFooter>
                <Button
                  className="btn-round"
                  color="primary"
                  size="lg"
                  onClick={confirmPassReset}
                >
                  Reset
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Container>
      </div>
    </>
  )
}

export default ResetPass
