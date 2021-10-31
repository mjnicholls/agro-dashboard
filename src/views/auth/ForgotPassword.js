import React, { useState } from 'react'

import classnames from 'classnames'
import { useDispatch } from 'react-redux'
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

import { forgotPassword } from '../../api/auth'
import { noBlankErrorMessage } from '../../config'
import {
  notifyError,
  notifySuccess,
} from '../../features/notifications/actions'
import { validateEmail } from '../../utils/validation'
import LoaderCircle from '../components/LoaderCircle'

const ForgotPassword = () => {
  const [emailFocus, setEmailFocus] = React.useState(false)

  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [isFetching, setIsFetching] = useState(false)

  const dispatch = useDispatch()

  const confirmPassReset = () => {
    setError(false)

    if (!email.length) {
      setError(noBlankErrorMessage)
      return
    }
    if (!validateEmail(email)) {
      setError('Email address is incorrect')
      return
    }
    setIsFetching(true)
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
        setError(`Error resetting password: ${err.message}`)
      })
      .finally(() => {
        setIsFetching(false)
      })
  }

  return (
    <>
      <div className="content">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="6" md="8">
              <Card className="card-lock card-white">
                <CardHeader>
                  <CardTitle tag="h3">
                    <b>Forgot your password?</b>
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  {isFetching ? (
                    <LoaderCircle />
                  ) : (
                    <>
                      <Label>
                        Enter your email and we will send you reset password
                        instructions
                      </Label>
                      <InputGroup
                        className={classnames('mb-0', {
                          'input-group-focus': emailFocus,
                          'has-danger': error,
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
                      <div
                        className={classnames(
                          'invalid-feedback ',
                          error ? 'd-block' : '',
                        )}
                      >
                        {error}
                      </div>
                    </>
                  )}
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
          </Row>
        </Container>
      </div>
    </>
  )
}

export default ForgotPassword
