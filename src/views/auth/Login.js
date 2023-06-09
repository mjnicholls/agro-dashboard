import React from 'react'

import classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
} from 'reactstrap'

import cardPrimary from '../../assets/img/card-primary.png'
import { loginUser, clearLoginError } from '../../features/auth/actions'
import { validateEmail } from '../../utils/validation'
import LoaderCircle from '../components/LoaderCircle'

const isAuthenticatedSelector = (state) => state.auth.isAuthenticated
const isFetchingSelector = (state) => state.auth.isFetching
const errorMessageSelector = (state) => state.auth.errorMessage

const Login = (props) => {
  const [state, setState] = React.useState({})
  const [errors, setErrors] = React.useState({})
  const { from } = props.location.state || { from: { pathname: '/dashboard' } }
  const isAuthenticated = useSelector(isAuthenticatedSelector)
  const isFetching = useSelector(isFetchingSelector)
  const errorMessage = useSelector(errorMessageSelector)
  const dispatch = useDispatch()

  React.useEffect(() => {
    document.body.classList.toggle('login-page')
    return function cleanup() {
      document.body.classList.toggle('login-page')
    }
  })

  const clearErrors = () => {
    setErrors({})
    dispatch(clearLoginError())
  }

  const onSubmitLogin = () => {
    clearErrors()
    if (!state.email || !validateEmail(state.email)) {
      setErrors({ email: true })
      return
    }
    if (!state.password) {
      setErrors({ password: true })
      return
    }
    dispatch(loginUser(state.email, state.password))
  }

  return isAuthenticated ? (
    <Redirect to={from} />
  ) : (
    <>
      <div className="content">
        <Container>
          <Col className="ml-auto mr-auto" lg="4" md="6">
            <Form className="form">
              <Card className="card-login card-white">
                <CardHeader>
                  <img alt="Login background" src={cardPrimary} />
                  <CardTitle tag="h1">Log in</CardTitle>
                </CardHeader>
                <CardBody>
                  <div style={{ minHeight: '125px' }}>
                    {isFetching ? (
                      <LoaderCircle style={{ height: '125px' }} />
                    ) : (
                      <>
                        <InputGroup
                          className={classnames({
                            'input-group-focus': state.emailFocus,
                            'has-danger': errors.email,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-email-85" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email"
                            type="text"
                            onChange={(e) =>
                              setState({ ...state, email: e.target.value })
                            }
                            onFocus={() =>
                              setState({ ...state, emailFocus: true })
                            }
                            onBlur={() =>
                              setState({ ...state, emailFocus: false })
                            }
                          />
                        </InputGroup>

                        <InputGroup
                          className={classnames({
                            'input-group-focus': state.passFocus,
                            'has-danger': errors.password,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-lock-circle" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Password"
                            type="password"
                            onChange={(e) =>
                              setState({ ...state, password: e.target.value })
                            }
                            onFocus={() =>
                              setState({ ...state, passFocus: true })
                            }
                            onBlur={() =>
                              setState({ ...state, passFocus: false })
                            }
                          />
                        </InputGroup>
                        <div
                          className={classnames(
                            'invalid-feedback ',
                            errors.message || errorMessage ? 'd-block' : '',
                          )}
                        >
                          {errors.message || errorMessage}
                        </div>
                      </>
                    )}
                  </div>
                </CardBody>
                <CardFooter>
                  <Button
                    block
                    className="mb-3"
                    color="primary"
                    onClick={onSubmitLogin}
                    size="lg"
                  >
                    Sign in
                  </Button>
                  <div className="d-flex justify-content-between align-items-center">
                    <h6>
                      <NavLink
                        to="/auth/forgot-password"
                        className="link footer-link"
                      >
                        Forgot password?
                      </NavLink>
                    </h6>
                    <h6>
                      <NavLink to="/auth/sign-up" className="link footer-link">
                        Create Account
                      </NavLink>
                    </h6>
                  </div>
                </CardFooter>
              </Card>
            </Form>
          </Col>
        </Container>
      </div>
    </>
  )
}

export default Login
