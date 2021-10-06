/* eslint-disable */
import React, { useState } from 'react'

import { useDispatch } from 'react-redux'

import classnames from 'classnames'
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
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
  
const [state, setState] = React.useState({})

const [email, setEmail] = useState('')
const [error, setError] = useState({})

const dispatch = useDispatch()

const confirmPassReset = () => {

    setError({})

   let newError = {}

    if (
      !email.length || validateEmail(!email.length)
    ) {
      newError.email = !email.length
      dispatch(notifyError('Please enter your email address'))
      setError({ email: true })
      return
    }

}


  return (
    <>
      <div className="content">
        <Container>
          <Col className="ml-auto mr-auto" lg="4" md="6">
            <Card className="card-lock card-white text-center">
              <CardHeader>
              <i className="tim-icons icon-key-25" />
              </CardHeader>
              <CardBody>
                <CardTitle tag="h4">Reset Password</CardTitle>
                <InputGroup
                  className={classnames({
                    'input-group-focus': state.passFocus,
                    'has-danger': error.email
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
                   
                    onFocus={(e) => setState({ ...state, passFocus: true })}
                    onBlur={(e) => setState({ ...state, passFocus: false })}
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
