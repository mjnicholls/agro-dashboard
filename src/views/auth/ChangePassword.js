import React, { useEffect, useState } from 'react'

import queryString from 'query-string'
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
} from 'reactstrap'

import {
  notifyError,
  notifySuccess,
} from '../../features/notifications/actions'

import { changePassword } from '../../api/authAPI'

import { passwordLength } from '../../config'

const ChangePassword = (props) => {
  const [state, setState] = useState({})
  const [resetToken, setResetToken] = useState(null)
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')

  useEffect(() => {
    const queryParams = queryString.parse(props.location.search)
    const tokenVal = queryParams.reset_password_token
    if (!tokenVal) {
      props.history.push('/auth/login')
      return
    }
    setResetToken(tokenVal)
  }, [])

  const [error, setError] = useState({})

  const dispatch = useDispatch()

  const confirmPassReset = () => {
    setError(false)

    if (
      password.length < passwordLength ||
      confirmPass.length < passwordLength
    ) {
      setError({
        password: !password.length,
        confirmPassword: !password.length,
      })
      dispatch(
        notifyError(`Password must be ${passwordLength} characters or more`),
      )
      return
    }

    if (password.length !== confirmPass.length) {
      setError({
        password: true,
        confirmPassword: true,
      })
      dispatch(notifyError("Passwords don't match"))
      return
    }

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
              <CardBody>
                <InputGroup
                  className={classnames({
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
                <InputGroup
                  className={classnames({
                    'input-group-focus': state.confirmPassFocus,
                    'has-danger': error.confirmPass,
                  })}
                  onFocus={() => setState({ ...state, confirmPassFocus: true })}
                  onBlur={() => setState({ ...state, confirmPassFocus: false })}
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
            </Card>
          </Col>
        </Container>
      </div>
    </>
  )
}

export default ChangePassword
