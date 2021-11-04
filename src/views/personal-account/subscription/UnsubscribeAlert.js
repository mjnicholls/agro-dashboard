import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Row } from 'reactstrap'
import {
  notifyError,
  notifySuccess,
} from '../../../features/notifications/actions'
import { isSubscriptionAvailableAPI, unsubscribe } from '../../../api/billing'
import LoaderDots from '../../components/LoaderDots'
import ContactUsButton from '../../components/ContactUsButton'

import ReactBSAlert from 'react-bootstrap-sweetalert'

const userSelector = (state) => state.auth.user

const UnsubscribeAlert = ({ close, onSuccess, onFailure }) => {
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
        close()
        if (onSuccess) {
          onSuccess()
        }
      })
      .catch((err) => {
        dispatch(notifyError(`Error cancelling subscription: ${err.message}`))
        close()
        console.log('before')
        if (onFailure) {
          onFailure()
        }
      })
      .finally(() => {
        setIsFetching(false)
      })
  }

  return (
    <ReactBSAlert
      customClass="agro-alert-dark"
      title="Are you sure you want to unsubscribe?"
      onConfirm={close}
      onCancel={close}
      showConfirm={false}
      showCloseButton
    >
      {isFetching ? (
        <LoaderDots />
      ) : (
        <>
          <Row className="mt-3 mb-5">
            <Col>
              <p>
                You will be charged at a fixed rate plus a fee for any exceeded
                area of your polygons this month
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
        </>
      )}
    </ReactBSAlert>
  )
}

export default UnsubscribeAlert
