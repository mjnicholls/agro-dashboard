import React, { useState } from 'react'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Select from 'react-select'
import { Button, Col, FormGroup, Row } from 'reactstrap'

import { deleteAcct } from '../../../api/apiAccount'
import { deleteAcctOptions, errors } from '../../../config'
import { logoutUser } from '../../../features/auth/actions'
import {
  notifyError,
  notifySuccess,
} from '../../../features/notifications/actions'

const userSubscriptionSelector = (state) => state.auth.user.tariff

const DeleteAccount = ({ close }) => {
  const dispatch = useDispatch()
  const subscription = useSelector(userSubscriptionSelector)
  const [reason, setReason] = useState('')
  const [error, setError] = useState(null)

  const confirmDeleteAcct = () => {
    setError(null)
    if (!reason) {
      setError(errors.noBlank)
      return
    }
    deleteAcct({
      reason,
    })
      .then(() => {
        dispatch(notifySuccess('Account deleted'))
        dispatch(logoutUser())
      })
      .catch((err) => {
        dispatch(notifyError(`Error deleting account + ${err.message}`))
      })
    close()
  }

  return subscription === 'free' ? (
    <div>
      <Row>
        <Col>
          <Row className="my-3">
            <Col>
              <p>
                We&apos;re sorry to see you go. Please tell us why you&apos;re
                deleting your account:
              </p>
            </Col>
          </Row>
          <Row className="text-right">
            <Col md="9">
              <FormGroup>
                <Select
                  className={classnames(
                    'react-select info ',
                    error ? 'danger-border' : '',
                  )}
                  classNamePrefix="react-select"
                  onChange={(option) => {
                    setReason(option.label)
                  }}
                  options={deleteAcctOptions}
                  getOptionLabel={(option) => option.value}
                  getOptionValue={(option) => option.label}
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                />
                <div
                  className={classnames(
                    'invalid-feedback ',
                    error ? 'd-block' : '',
                  )}
                >
                  {error}
                </div>
              </FormGroup>
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="agro-pop-up-footer">
        <Button
          className="btn-danger"
          color="danger"
          data-dismiss="modal"
          type="button"
          onClick={confirmDeleteAcct}
        >
          Delete
        </Button>
      </div>
    </div>
  ) : (
    <div>
      <Row>
        <Col>
          <p className="mb-3">
            Please <NavLink to="/users/home">cancel your subscriptions</NavLink>
            &nbsp; before deleting your account. If you have a paid subscription
            and you delete your account, your money will not be returned.
          </p>
          <p className="mb-3">
            If you delete your account all your API keys will be blocked.
          </p>
        </Col>
      </Row>
    </div>
  )
}

DeleteAccount.propTypes = {
  close: PropTypes.func,
}

export default DeleteAccount
