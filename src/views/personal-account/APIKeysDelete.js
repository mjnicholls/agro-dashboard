/* eslint-disable */
import React from 'react'
import { useDispatch } from 'react-redux'
import { Button, Col, Row } from 'reactstrap'
import { deleteAPIKey } from '../../api/personalAccountAPI'
import {
  notifyError,
  notifySuccess,
} from '../../features/notifications/actions'

const ApiKeyDelete = ({ apiKey, close, refreshData }) => {
  const dispatch = useDispatch()

  const confirmDelete = () => {
    const data = {
      appid: apiKey.appid,
      name: apiKey.name,
    }

    deleteAPIKey(data)
      .then(() => {
        refreshData()
        dispatch(notifySuccess('API Key deleted'))
      })
      .catch((error) => {
        dispatch(notifyError(`Error deleting API Key${error.message}`))
      })
    close()
  }

  return (
    <div>
      <Row>
        <Col className="mb-3">
          <p>Are you sure you want to delete the API Key?</p>
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
          className="btn-neutral"
          color="default"
          data-dismiss="modal"
          type="button"
          onClick={confirmDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  )
}

export default ApiKeyDelete
