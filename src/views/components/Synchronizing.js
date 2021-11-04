import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'reactstrap'

import { getAPIKeyStatus } from '../../api/personalAccount'
import { setApiKeyStatus } from '../../features/auth/actions'
import LoaderDots from './LoaderDots'

const selectIsApiKeyValid = (state) => state.auth.isApiKeyValid

const Synchronizing = () => {
  const isApiKeyValid = useSelector(selectIsApiKeyValid)
  const dispatch = useDispatch()

  const checkAPIKeyStatus = () => {
    getAPIKeyStatus()
      .then(() => {
        dispatch(setApiKeyStatus(true))
      })
      .catch((err) => {
        dispatch(setApiKeyStatus(false))
        setTimeout(checkAPIKeyStatus, 20000)
      })
  }

  useEffect(() => {
    if (isApiKeyValid === null) {
      checkAPIKeyStatus()
    }
  }, [isApiKeyValid])

  return (
    <Row>
      <Col className="text-center my-5 align-self-center">
        <div className="my-5">
          <div>
            <LoaderDots />
            <br />
          </div>
          {isApiKeyValid === false && (
            <p className="my-3">
              Synchronizing API key... It might take a few minutes
            </p>
          )}
        </div>
      </Col>
    </Row>
  )
}

export default Synchronizing
