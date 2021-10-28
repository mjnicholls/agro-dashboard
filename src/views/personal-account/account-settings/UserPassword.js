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
  Label,
} from 'reactstrap'

import {
  notifyError,
  notifySuccess,
} from '../../../features/notifications/actions'
import { updatePassword } from '../../../api/personalAccount'
import classnames from 'classnames'

import { noBlankErrorMessage } from '../../../config'

const UserPassword = () => {
  const [pass, setPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [error, setError] = useState({})

  const dispatch = useDispatch()

  const confirmPassUpdate = () => {
    setError({})

    const newError = {}

    if (!pass) {
      newError.pass = noBlankErrorMessage
    }
    if (!confirmPass) {
      newError.confirmPass = noBlankErrorMessage
    }

    if (!Object.keys(newError).length) {
      if (pass.length < 8) {
        newError.pass = 'Must be 8 characters or more'
      }
      if (confirmPass.length < 8) {
        newError.confirmPass = 'Must be 8 characters or more'
      }
    }

    if (!Object.keys(newError).length) {
      if (pass !== confirmPass) {
        newError.pass = 'Passwords do not match'
        newError.confirmPass = 'Passwords do not match'
      }
    }

    if (Object.keys(newError).length) {
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
          <Label>New password</Label>
          <FormGroup>
            <Input
              type="password"
              autoComplete="off"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
              className={error.pass ? 'danger-border' : ''}
            />
            <div
              className={classnames(
                'invalid-feedback ',
                error.pass ? 'd-block' : '',
              )}
            >
              {error.pass}
            </div>
          </FormGroup>
          <Label>Confirm new password</Label>
          <FormGroup>
            <Input
              type="password"
              autoComplete="off"
              onChange={(e) => setConfirmPass(e.target.value)}
              value={confirmPass}
              className={error.confirmPass ? 'danger-border' : ''}
            />
            <div
              className={classnames(
                'invalid-feedback ',
                error.confirmPass ? 'd-block' : '',
              )}
            >
              {error.confirmPass}
            </div>
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
