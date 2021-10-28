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
import { updateUserSettings } from '../../../api/personalAccountAPI'
import PropTypes from 'prop-types'

import {noBlank} from '../../../config'
import classnames from "classnames";


const UserSettings = ({ user, handleUserState }) => {
  const [error, setError] = useState({})

  const dispatch = useDispatch()

  const confirmUpdate = () => {
    setError({})

    const newError = {}

    if (!user.full_name && !user.username) {
      setError({
        username: noBlank,
        full_name: noBlank
      })
      return
    }

    const data = {
      // cannot send an empty string to back-end
      new_username: user.username ? user.username : null,
      new_full_name: user.name,
    }

    updateUserSettings(data)
      .then(() => {
        dispatch(notifySuccess('Details updated'))
      })
      // eslint-disable-next-line
      .catch((error) => {
        dispatch(notifyError(`Error updating detais ' + ${error.message}`))
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
              onChange={(e) => handleUserState('username', e.target.value)}
              value={user.username}
              className={error.username ? 'danger-border' : ''}
            />
            <div
              className={classnames(
                'invalid-feedback ',
                error.username ? 'd-block' : '',
              )}
            >{error.username}</div>
          </FormGroup>

          <Label>Full Name</Label>
          <FormGroup>
            <Input
              type="text"
              onChange={(e) => handleUserState('full_name', e.target.value)}
              value={user.full_name}
              className={error.full_name ? 'danger-border' : ''}
            />
            <div
              className={classnames(
                'invalid-feedback ',
                error.full_name ? 'd-block' : '',
              )}
            >{error.full_name}</div>
          </FormGroup>

          <Label>Email address</Label>
          <FormGroup>
            <Input type="email" value={user.email} disabled />
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
  user: PropTypes.shape({
    full_name: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    active_stripe_customer: PropTypes.bool
  }),
  handleUserState: PropTypes.func,
}

export default UserSettings
