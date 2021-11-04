/* eslint-disable */
import React, { useEffect, useState } from 'react'

import ReactBSAlert from 'react-bootstrap-sweetalert'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Row } from 'reactstrap'

import { isSubscriptionAvailableAPI, unsubscribe } from '../../../api/billing'
import ContactUsButton from '../../components/ContactUsButton'
import LoaderDots from '../../components/LoaderDots'
import {supportEmailMailTo} from "../../../config";

import { logoutUser } from '../../../features/auth/actions'

const userSelector = (state) => state.auth.user

const UnsubscribeAlert = ({ close }) => {
  const [isFetching, setIsFetching] = useState(false)
  const [isSubscriptionAvailable, setIsSubscriptionAvailable] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isFailure, setIsFailure] = useState(false)

  const dispatch = useDispatch()
  const user = useSelector(userSelector)

  useEffect(() => {
    isSubscriptionAvailableAPI(user.email).then((res) => {
      if (res && res.message && res.message.user)
        setIsSubscriptionAvailable(res.message.user.available_subscription)
    })
  }, [user])

  const logOut = () => {
    dispatch(logoutUser())
  }

  const unsubscribeFunc = () => {
    setIsFetching(true)

    unsubscribe({
      service_key: 'agri',
      plan_key: user.tariff,
      user: {
        email: user.email,
      },
    })
      .then(() => { setIsSuccess(true) })
      .catch(() => { setIsFailure(true) })
      .finally(() => {
        setIsFetching(false)
      })
  }

  const getTitle = () =>
    isSuccess ? "You are successfully unsubscribed" : isFailure ? "Error cancelling subscription" : "Are you sure you want to unsubscribe?"

  const AlertContent = () => (
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
              onClick={() => unsubscribeFunc()}
            >
              Unsubscribe
            </Button>
          ) : (
            <ContactUsButton />
          )}
        </Col>
      </Row>
    </>
  )

  const SuccessContent = () => (
    <>
      <Row className="my-3">
        <Col>
          <p>
            Please sign out and sign in again for changes to take effect. Please
            bear in mind that it might take a few minutes to process your
            request.
          </p>
        </Col>
      </Row>
      <Row>
        <Col className="text-right">
          <Button
            className="btn btn-primary"
            color="primary"
            data-dismiss="modal"
            type="button"
            onClick={logOut}
          >
            Logout
          </Button>
        </Col>
      </Row>
    </>
  )

  const FailureContent = () => (
    <Row className="my-3">
      <Col>
        <p>
          Something went wrong. Please try again or contact us at &nbsp;
          <a href={supportEmailMailTo}>info@openweathermap.org</a>
        </p>
      </Col>
    </Row>
  )

  return (
    <ReactBSAlert
      customClass="agro-alert-dark"
      title={getTitle()}
      onCancel={isSuccess ? () => {} : close}
      showConfirm={false}
      showCloseButton={!isSuccess}
    >
      {isFetching ? (
        <LoaderDots />
      ) : isSuccess ? <SuccessContent/> : isFailure ? <FailureContent/> : <AlertContent/> }
    </ReactBSAlert>
  )
}

export default UnsubscribeAlert
