import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import { deleteAcct } from '../../api/personalAccountAPI'
import {
  notifyError,
  notifySuccess,
} from '../../features/notifications/actions'
import { deleteAcctOptions } from '../../config'
import PropTypes from 'prop-types'

const userSubscriptionSelector = (state) => state.auth.user.tariff

const DeleteAccount = ({ close }) => {
const dispatch = useDispatch()

  const subscription = useSelector(userSubscriptionSelector)
  const [reason, setReason] = useState()

  const confirmDeleteAcct = () => {
    
    const data = {
      reason: deleteAcctOptions
    }

    deleteAcct(data)
      .then(() => {
        dispatch(notifySuccess('Account deleted'))
      })
      .catch((error) => {
        dispatch(notifyError(`Error deleting account + ${error.message}`))
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
                We are sad to see you leave. Please share with us the reason why
                you are deleting your account:
              </p>
            </Col>
          </Row>
          <Row className="text-right">
            <Col md="9">
              <FormGroup>
                <Select
                  className="react-select info mb-3"
                  classNamePrefix="react-select"
                  options={deleteAcctOptions}
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                ></Select>
              </FormGroup>
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="agro-pop-up-footer">
        {/* <Button
          className="btn-neutral"
          color="default"
          type="button"
          onClick={close}
        >
          Cancel
        </Button>
       */}
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
        <Col className="mb-3">
          <p>
            Please{' '}
            <NavLink to="/dashboard/billing-plans">
              cancel your subscriptions
            </NavLink>{' '}
            before deleting your account.
          </p>
          <p>
            If you have a paid subscription and delete your account,{' '}
            <b>your money will not be returned.</b>
          </p>
        </Col>
      </Row>
      {/* <Row>
          </Row>
          <Row>
          <Col className="mb-3">
              <li>If you have a subscription Agriculture API, please unsubscribe <a href = "">here.</a></li>
          </Col>
        </Row> */}
      <div className="agro-pop-up-footer">
        {/* <Button
          className="btn-neutral"
          color="default"
          type="button"
          onClick={close}
        >
          Cancel
        </Button>
       */}
        {/* <Button
      className="btn-danger"
      color="danger"
      data-dismiss="modal"
      type="button"
      onClick={confirmDeleteAcct}
    >
      Delete
    </Button> */}
      </div>
    </div>
  )
}

DeleteAccount.propTypes = {
  close: PropTypes.func
}

export default DeleteAccount
