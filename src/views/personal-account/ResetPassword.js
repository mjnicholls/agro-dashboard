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
// import { updatePass } from ''

const ResetPass = () => {
  
const [state, setState] = React.useState({})

const [email, setEmail] = useState('')
const [error, setError] = useState({})

const dispatch = useDispatch()

const confirmPassReset = () => {

    setError({})

   let newError = {}


    if ( !email.length ) {
      newError.email = !email.length
      dispatch(notifyError('Please enter your email address'))
      setError({newError})
      return
    }

    let reset = {
      email: email,
    }

    if (
      !validateEmail(reset)
    ) {
      newError.email = validateEmail(reset)
      dispatch(notifyError('Email does not exist'))
      setError({newError})
      return
    }
  

    updatePass(reset)
      .then(() => {
        dispatch(notifySuccess('Email sent!'))
      })
      .catch((error) => {
        dispatch(notifyError('Error sending email ' + error.message))
      })

}


  return (
    <>
      <div className="content">
        <Container>
          <Col className="ml-auto mr-auto" lg="4" md="6">
            <Card className="card-lock card-white text-center">
              <CardHeader>
          
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
                    onChange={(e) => setEmail(e.target.value)}
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
