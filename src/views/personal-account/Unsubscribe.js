import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import ReactBSAlert from 'react-bootstrap-sweetalert'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Row } from 'reactstrap'

import { isSubscriptionAvailableAPI, unsubscribe } from '../../api/billing'
import {
  notifySuccess,
  notifyError,
} from '../../features/notifications/actions'
import ContactUsButton from '../components/ContactUsButton'
import LoaderDots from '../components/LoaderDots'

const userSelector = (state) => state.auth.user

const Unsubscribe = ({ callback }) => {
  const [alert, setAlert] = useState(null)
  const [isFetching, setIsFetching] = useState(false)
  const [isSubscriptionAvailable, setIsSubscriptionAvailable] = useState(null)

  const dispatch = useDispatch()
  const user = useSelector(userSelector)

  useEffect(() => {
    isSubscriptionAvailableAPI(user.email).then((res) => {
      if (res && res.message && res.message.user)
        setIsSubscriptionAvailable(res.message.user.available_subscription)
    })
  }, [user])

  const unsubscribeFunc = () => {
    setIsFetching(true)

    unsubscribe({
      service_key: 'agri',
      plan_key: user.tariff,
      user: {
        email: user.email,
      },
    })
      .then(() => {
        dispatch(notifySuccess('You have been unsubscribed successfully'))
        hideAlert()
        if (callback) {
          callback()
        }
      })
      .catch((err) => {
        dispatch(notifyError(`Error cancelling subscription: ${err.message}`))
      })
      .finally(() => { setIsFetching(false) })
  }

  const hideAlert = () => {
    setAlert(null)
  }

  const htmlAlert = () => {
    setAlert(
      <ReactBSAlert
        customClass="agro-alert-dark"
        title="Are you sure you want to unsubscribe?"
        onConfirm={hideAlert}
        onCancel={hideAlert}
        showConfirm={false}
        showCloseButton
      >
        {isFetching ? <LoaderDots /> : <>
          <Row className="mt-3 mb-5">
            <Col>
              <p>
                You will be charged at a fixed rate plus a fee for any exceeded area of your polygons this month
              </p>
            </Col>
          </Row>
          <Row >
            <Col className="text-right">
              {isSubscriptionAvailable ? (
                <Button
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  onClick={unsubscribeFunc}
                >
                  Unsubscribe
                </Button>
              ) : (
                <ContactUsButton />
              )}
            </Col>
          </Row>
        </>}
      </ReactBSAlert>,
    )
  }

  return (
    <>
      {alert}
      <Button
        className="btn-fill"
        color="primary"
        type="submit"
        style={{ width: '180px' }}
        onClick={htmlAlert}
      >
        Unsubscribe
      </Button>
    </>
  )
}

Unsubscribe.propTypes = {
  callback: PropTypes.func,
}

export default Unsubscribe
