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
// import validateEmail from '../../utils/validation'

const ResetPass = () => {
  
const [state, setState] = React.useState({})

const [pass, setPass] = useState('')
const [error, setError] = useState({})

const dispatch = useDispatch()

const confirmPassReset = () => {

    setError({})

   let newError = {}

    if (
      !pass.length
    ) {
      newError.pass = !pass.length
      dispatch(notifyError('Cannot be empty'))
      setError(newError)
      return
    }

    updatePassword(
        {
        new_password: pass,
      })
        .then(() => {
          dispatch(notifySuccess('Password reset'))
        })
        .catch((error) => {
          dispatch(notifyError('Error resetting password ' + error.message))
        })


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
                  })}
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="tim-icons icon-key-25" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="text"
                    onChange={(e) => setPass(e.target.value)}
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
