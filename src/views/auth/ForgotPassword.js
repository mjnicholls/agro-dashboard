import React, { useState } from 'react'

import { useDispatch } from 'react-redux'

import classnames from 'classnames'

import { NavLink } from 'react-router-dom'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Label,
  Row,
} from 'reactstrap'

import {
  notifyError,
  notifySuccess,
} from '../../features/notifications/actions'

import { forgotPassword } from '../../api/authAPI'
import { validateEmail } from '../../utils/validation'

const ForgotPassword = () => {
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

    forgotPassword(email)
      .then(() => {
        dispatch(
          notifySuccess(
            'We have sent you an email with reset password instructions',
          ),
        )
      })
      .catch((err) => {
        dispatch(notifyError(`Error resetting password: ${err.message}`))
      })
  }

  return (
    <>
      <div className="content">
        <Container>
          <Col className="ml-auto mr-auto" lg="6" md="8">
            <Card className="card-lock card-white">
              <CardHeader>
                <CardTitle tag="h3">
                  <b>Forgot password?</b>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Label>
                  Enter your email and we will send you reset password
                  instructions
                </Label>
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
              <CardFooter className="d-flex justify-content-between align-items-center">
                <h6>
                  <NavLink to="/auth/login" className="link footer-link">
                    Back to sign in
                  </NavLink>
                </h6>
                <Button
                  className="btn-round"
                  color="primary"
                  size="lg"
                  onClick={confirmPassReset}
                >
                  Get instructions
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Container>
      </div>
    </>
  )
}

export default ForgotPassword
