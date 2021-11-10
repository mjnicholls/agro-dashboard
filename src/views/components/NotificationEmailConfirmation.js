import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Button, UncontrolledAlert } from 'reactstrap'

import { receiveConfirmationEmail } from '../../api/auth'
import { destroyState } from '../../features/auth/actions'
import {
  notifyError,
  notifySuccess,
} from '../../features/notifications/actions'

const selectEmail = (state) => state.auth.user.email

const EmailConfirmationNotification = () => {
  const dispatch = useDispatch()
  const email = useSelector(selectEmail)

  const onDismiss = () => {
    dispatch(destroyState())
  }

  const sendConfirmation = () => {
    receiveConfirmationEmail(email)
      .then(() => {
        dispatch(notifySuccess('Confirmation email sent'))
        dispatch(destroyState())
      })
      .catch((err) => {
        dispatch(
          notifyError(`Error sending confirmation email: ${err.message}`),
        )
      })
  }

  return (
    <UncontrolledAlert
      className="alert-with-icon"
      color="danger"
      fade={false}
      toggle={onDismiss}
    >
      <span data-notify="icon" className="tim-icons icon-bell-55" />
      <span data-notify="message">
        You have to verify your email to use Agro services. Please{' '}
        <Button
          className="btn-link remove-button-style m-0 notification-link"
          style={{}}
          onClick={sendConfirmation}
        >
          <b>click here</b>
        </Button>{' '}
        to get an email with the confirmation link.
      </span>
    </UncontrolledAlert>
  )
}

export default EmailConfirmationNotification
