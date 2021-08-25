import React from "react";
import classnames from "classnames";
import { css } from "@emotion/react";
import { Redirect } from "react-router-dom";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  FormText,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
} from "reactstrap";
import { useDispatch, useSelector } from 'react-redux';
import { validateEmail } from "../../utils/validation";
import { loginUser, clearLoginError } from '../../features/auth/actions'
import DotLoader from 'react-spinners/DotLoader';

const isAuthenticatedSelector = state => state.auth.isAuthenticated;
const isFetchingSelector = state => state.auth.isFetching;
const errorMessageSelector = state => state.auth.errorMessage;

const override = css`
  align-self: center;
`;

const Login = (props) => {
  const [state, setState] = React.useState({});
  const [errors, setErrors] = React.useState({});
  let { from } = props.location.state || { from: { pathname: "/dashboard" } };
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const isFetching = useSelector(isFetchingSelector);
  const errorMessage = useSelector(errorMessageSelector);

  const dispatch = useDispatch();

  React.useEffect(() => {
    document.body.classList.toggle("login-page");
    return function cleanup() {
      document.body.classList.toggle("login-page");
    };
  });

  const clearErrors = () => {
    setErrors({});
    dispatch(clearLoginError())
  }

  const onSubmitLogin = () => {
    clearErrors();
    if (!state.email || !validateEmail(state.email)) {
      setErrors({email: true})
      return
    }
    if (!state.password) {
      setErrors({password: true})
      return
    }
    dispatch(loginUser(state.email, state.password))
  };

  return isAuthenticated ?
    <Redirect to={from} /> : <>
      <div className="content">
        <Container>
          <Col className="ml-auto mr-auto" lg="4" md="6">
            <Form className="form">
              <Card className="card-login card-white">
                <CardHeader>
                  <img
                    alt="..."
                    src={require("assets/img/card-primary.png").default}
                  />
                  <CardTitle tag="h1">Log in</CardTitle>
                </CardHeader>
                <CardBody>
                  <div style={{minHeight: "125px"}}>
                  {
                    isFetching ?
                      <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "125px"}}>
                        <DotLoader size="60px" color="#e14eca" css={override} />
                      </div> :

                      <>
                        <InputGroup
                    className={classnames({
                      "input-group-focus": state.emailFocus,
                      "has-danger": errors.email
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
                        onChange={(e) => setState({...state, email: e.target.value})}
                        onFocus={() => setState({ ...state, emailFocus: true })}
                        onBlur={() => setState({ ...state, emailFocus: false })}
                      />
                  </InputGroup>

                      <InputGroup
                        className={classnames({
                          "input-group-focus": state.passFocus,
                          "has-danger": errors.password
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
                          onChange={(e) => setState({...state, password: e.target.value})}
                          onFocus={() => setState({ ...state, passFocus: true })}
                          onBlur={() => setState({ ...state, passFocus: false })}
                        />
                      </InputGroup>
                      {(errors.message || errorMessage) &&
                      <FormText color="muted">{errors.message || errorMessage}</FormText>}
                      </>
                  }
                  </div>

                </CardBody>
                <CardFooter>
                  <Button
                    block
                    className="mb-3"
                    color="primary"
                    // href="#pablo"
                    onClick={onSubmitLogin}
                    size="lg"
                  >
                    Sign in
                  </Button>
                  <div className="pull-left">
                    <h6>
                      <a
                        className="link footer-link"
                        href="https://wp.agromonitoring.com/users/sign_up"
                      >
                        Create Account
                      </a>
                    </h6>
                  </div>
                  {/*<div className="pull-right">*/}
                    {/*<h6>*/}
                      {/*<a*/}
                        {/*className="link footer-link"*/}
                        {/*href="#pablo"*/}
                        {/*onClick={(e) => e.preventDefault()}*/}
                      {/*>*/}
                        {/*Need Help?*/}
                      {/*</a>*/}
                    {/*</h6>*/}
                  {/*</div>*/}
                </CardFooter>
              </Card>
            </Form>
          </Col>
        </Container>
      </div>
    </>
};

export default Login;
