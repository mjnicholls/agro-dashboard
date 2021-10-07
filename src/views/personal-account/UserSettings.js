/* eslint-disable */
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
import { updateUserName } from '../../services/api/personalAccountAPI'

const UserSettings = ({ email, name, setName, username, setUserName }) => {
  
  const [error, setError] = useState({})
  //const [name, setName] = useState('')
  //const [username, setUserName] = useState('')

  const dispatch = useDispatch()

  const confirmUpdate = () => {


  setError({})

   let newError = {}

    if (
      !name.length &&
      !username.length
    ) {
      newError.username = !username.length
      dispatch(notifyError('Username cannot be empty'))
      setError(newError)
      return
    }

    else if (
      name.length &&
      !username.length
    ) {
      newError.username = !username.length
      dispatch(notifyError('Username cannot be empty'))
      setError(newError)
      return
    }



    let data = {
      new_username: username,
      new_full_name: name,
    }

    updateUserName(data)
      .then(() => {
        dispatch(notifySuccess('Username updated'))
      })
      .catch((error) => {
        dispatch(notifyError('Error updating name ' + error.message))
      })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Personal information</CardTitle>
      </CardHeader>
      <CardBody>
        <Form>
          <label>Username</label>
          <FormGroup>
            <Input
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              value={username}
              className={error.username ? 'danger-border' : ''}
            />
          </FormGroup>

          <label>Full Name</label>
          <FormGroup>
            <Input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className={error.name ? 'danger-border' : ''}
            />
          </FormGroup>

          <label>Email address</label>
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

export default UserSettings
