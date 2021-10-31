import React, { useEffect, useState } from 'react'

import classnames from 'classnames'
import queryString from 'query-string'
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
} from 'reactstrap'

import { changePassword } from '../../api/auth'
import { noBlankErrorMessage, passwordLength } from '../../config'
import {
  notifyError,
  notifySuccess,
} from '../../features/notifications/actions'
import LoaderCircle from '../components/LoaderCircle'

const ChangePassword = (props) => {
  const [state, setState] = useState({})
  const [error, setError] = useState({})
  const [resetToken, setResetToken] = useState(null)
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    const queryParams = queryString.parse(props.location.search)
    const tokenVal = queryParams.reset_password_token
    if (!tokenVal) {
      props.history.push('/auth/login')
      return
    }
    setResetToken(tokenVal)
  }, [])

  const dispatch = useDispatch()

  const confirmPassReset = () => {
    setError({})
    const newError = {}

    if (password.length < passwordLength) {
      newError.password = password.length
        ? `Password must be ${passwordLength} characters or more`
        : noBlankErrorMessage
    }

    if (confirmPass.length < passwordLength) {
      newError.confirmPass = confirmPass.length
        ? `Password must be ${passwordLength} characters or more`
        : noBlankErrorMessage
    }
    if (Object.keys(newError).length) {
      setError(newError)
      return
    }

    if (password !== confirmPass) {
      setError({
        password: 'Passwords do not match',
        confirmPass: 'Passwords do not match',
      })
      return
    }

    setIsFetching(true)
    changePassword({
      password,
      password_confirmation: confirmPass,
      reset_password_token: resetToken,
    })
      .then(() => {
        dispatch(notifySuccess('Password changed'))
      })
      .catch((err) => {
        dispatch(notifyError(`Error resetting password: ${err.message}`))
        setError({
          api: `Error resetting password: ${err.message}`,
        })
      })
      .finally(() => {
        setIsFetching(false)
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
                  <b>Change your password</b>
                </CardTitle>
              </CardHeader>
              {isFetching ? (
                <LoaderCircle style={{ height: '200px' }} />
              ) : (
                <>
                  <CardBody>
                    <div>
                      <InputGroup
                        className={classnames('mb-0 ', {
                          'input-group-focus': state.passFocus,
                          'has-danger': error.pass,
                        })}
                        onFocus={() => setState({ ...state, passFocus: true })}
                        onBlur={() => setState({ ...state, passFocus: false })}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-lock-circle" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Password"
                          type="password"
                          autoComplete="off"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </InputGroup>
                    </div>
                    <div
                      className={classnames(
                        'invalid-feedback ',
                        error.password ? 'd-block' : '',
                      )}
                    >
                      {error.password}
                    </div>
                    <InputGroup
                      className={classnames('mb-0 mt-3 ', {
                        'input-group-focus': state.confirmPassFocus,
                        'has-danger': error.confirmPass,
                      })}
                      onFocus={() =>
                        setState({ ...state, confirmPassFocus: true })
                      }
                      onBlur={() =>
                        setState({ ...state, confirmPassFocus: false })
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-lock-circle" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Confirm Password"
                        type="password"
                        autoComplete="off"
                        onChange={(e) => setConfirmPass(e.target.value)}
                      />
                    </InputGroup>
                    <div
                      className={classnames(
                        'invalid-feedback ',
                        error.confirmPass ? 'd-block' : '',
                      )}
                    >
                      {error.confirmPass}
                    </div>
                    <div
                      className={classnames(
                        'invalid-feedback ',
                        error.api ? 'd-block' : '',
                      )}
                    >
                      {error.api}
                    </div>
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
                      Change password
                    </Button>
                  </CardFooter>
                </>
              )}
            </Card>
          </Col>
        </Container>
      </div>
    </>
  )
}

export default ChangePassword
