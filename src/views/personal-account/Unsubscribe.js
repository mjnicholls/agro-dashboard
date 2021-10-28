import React, { useEffect, useState } from 'react'

import ReactBSAlert from 'react-bootstrap-sweetalert'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { isSubscriptionAvailableAPI, unsubscribe } from '../../api/billing'
import {
  notifySuccess,
  notifyError,
} from '../../features/notifications/actions'

import { Button, Col, Row } from 'reactstrap'

import ContactUsButton from '../components/ContactUsButton'

const userSelector = (state) => state.auth.user

const Unsubscribe = ({callback}) => {
  const [alert, setAlert] = useState(null)
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
  }

  const hideAlert = () => {
    setAlert(null)
  }

  const htmlAlert = () => {
    setAlert(
      <ReactBSAlert
        customClass="agro-alert-dark"
        title="Unsubscribe"
        onConfirm={hideAlert}
        onCancel={hideAlert}
        showConfirm={false}
        showCloseButton
      >
        <Row>
          <Col>
            <p>Are you sure you want to unsubscribe?</p>
            <p>
              Дорогой клиент, вы отписываетесь от сервиса, с вас будет списана
              оплата за фиксу и за прувышение (если оно было в текущем месяце)
            </p>
          </Col>
        </Row>
        <Row>
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
  callback: PropTypes.func
}

export default Unsubscribe
