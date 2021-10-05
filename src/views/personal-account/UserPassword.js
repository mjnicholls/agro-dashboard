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
} from 'reactstrap'

import {
  notifyError,
  notifySuccess,
} from '../../features/notifications/actions'
import { updatePassword } from '../../services/api/personalAccountAPI'

const UserPassword = () => {
  const [pass, setPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [error, setError] = useState(null)

  const dispatch = useDispatch()

  const confirmPassUpdate = () => {
    setError(null)

    if (!pass.length || !confirmPass.length) {
      setError(true)
      dispatch(notifyError('Fields can not be empty'))
      return
    }

    updatePassword({
      new_password: pass,
      new_password_confirm: confirmPass,
    })
      .then(() => {
        dispatch(notifySuccess('Password updated'))
      })
      .catch((error) => {
        dispatch(notifyError('Error updating password ' + error.message))
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
            <label>New password</label>
            <Input
              type="password"
              autoComplete="off"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
              className={error ? 'danger-border' : ''}
            />
          </FormGroup>
          <FormGroup>
            <label>Confirm new password</label>
            <Input
              type="password"
              autoComplete="off"
              onChange={(e) => setConfirmPass(e.target.value)}
              value={confirmPass}
              className={error ? 'danger-border' : ''}
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
