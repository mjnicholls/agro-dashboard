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
} from '../../features/notifications/actions'
import { updateUserName } from '../../api/personalAccountAPI'
import PropTypes from 'prop-types'

const UserSettings = ({ email, name, setName, username, setUserName }) => {
  const [error, setError] = useState({})
  //const [name, setName] = useState('')
  //const [username, setUserName] = useState('')

  const dispatch = useDispatch()

  const confirmUpdate = () => {
    setError({})

    const newError = {}

    if (!name.length && !username.length) {
      newError.username = !username.length
      dispatch(notifyError('Both fields cannot be blank'))
      setError(newError)
      return
    }

    const data = {
      // cannot send an empty string to back-end
      new_username: username.length ? username : null,
      new_full_name: name,
    }

    updateUserName(data)
      .then(() => {
        dispatch(notifySuccess('Username updated'))
      })
      // eslint-disable-next-line
      .catch((error) => {
        dispatch(notifyError(`Error updating name ' + ${error.message}`))
      })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Personal information</CardTitle>
      </CardHeader>
      <CardBody>
        <Form>
          <Label>Username</Label>
          <FormGroup>
            <Input
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              value={username}
              className={error.username ? 'danger-border' : ''}
            />
          </FormGroup>

          <Label>Full Name</Label>
          <FormGroup>
            <Input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className={error.name ? 'danger-border' : ''}
            />
          </FormGroup>

          <Label>Email address</Label>
          <FormGroup>
            <Input type="email" value={email} disabled />
          </FormGroup>
        </Form>
      </CardBody>
      <CardFooter className="text-right">
        <Button
          className="btn-fill"
          color="primary"
          type="button"
          onClick={confirmUpdate}
        >
          Update
        </Button>
      </CardFooter>
    </Card>
  )
}

UserSettings.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  setName: PropTypes.func,
  username: PropTypes.string,
  setUserName: PropTypes.func,
}

export default UserSettings
