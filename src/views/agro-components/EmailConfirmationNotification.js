import React from 'react'

import { useDispatch } from 'react-redux'
import { UncontrolledAlert } from 'reactstrap'

import { hideNotification } from '../../features/auth/actions'


const EmailConfirmationNotification = () => {

  const dispatch = useDispatch()

  const onDismiss = () => {
    console.log("hh")
    dispatch(hideNotification())
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
        {/* eslint-disable-next-line */}
        <a href="#" target="_blank">
          click here
        </a>{' '}
        to get an email with the confirmation link.
      </span>
    </UncontrolledAlert>
  )
}

export default EmailConfirmationNotification;