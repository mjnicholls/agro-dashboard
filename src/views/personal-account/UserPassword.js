import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap'

import {
  notifyError,
  notifySuccess,
} from '../../features/notifications/actions'
import { updatePassword } from '../../api/personalAccountAPI'

const UserPassword = () => {
  const [pass, setPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [error, setError] = useState({})

  const dispatch = useDispatch()

  const confirmPassUpdate = () => {
    setError({})

    if (!pass.length || !confirmPass.length) {
      newError.pass = !pass.length
      newError.confirmPass = !confirmPass.length
      dispatch(notifyError('Cannot be empty'))
      setError(newError)
      return
    }

    let newError = {}

    if (pass.length < 8 || confirmPass.length < 8) {
      newError.pass = pass.length < 8
      newError.confirmPass = confirmPass.length < 8
      dispatch(notifyError('Must be eight characters or more'))
      setError(newError)
      return
    }

    if (pass !== confirmPass) {
      newError.pass = true
      newError.confirmPass = true
      dispatch(notifyError('Passwords do not match'))
      setError(newError)
      return
    }

    updatePassword({
      new_password: pass,
      new_password_confirm: confirmPass,
    })
      .then(() => {
        dispatch(notifySuccess('Password updated'))
      })
       // eslint-disable-next-line
      .catch((error) => {
        dispatch(notifyError(`Error updating password + ${error.message}`))
      })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Update Password</CardTitle>
      </CardHeader>
      <CardBody>
        <Form>
          <FormGroup>
            <Label>New password</Label>
            <Input
              type="password"
              autoComplete="off"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
              className={error.pass ? 'danger-border' : ''}
            />
          </FormGroup>
          <FormGroup>
            <Label>Confirm new password</Label>
            <Input
              type="password"
              autoComplete="off"
              onChange={(e) => setConfirmPass(e.target.value)}
              value={confirmPass}
              className={error.confirmPass ? 'danger-border' : ''}
            />
          </FormGroup>
        </Form>
      </CardBody>
      <CardFooter className="text-right">
        <Button
          className="btn-fill"
          color="primary"
          type="submit"
          onClick={confirmPassUpdate}
        >
          Submit
        </Button>
      </CardFooter>
    </Card>
  )
}

export default UserPassword
