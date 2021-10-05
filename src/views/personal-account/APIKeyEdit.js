import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { Button, Col, FormGroup, Input, Row } from 'reactstrap'

import {
  notifyError,
  notifySuccess,
} from '../../features/notifications/actions'
import { updateAPIKey } from '../../services/api/personalAccountAPI'

const ApiKeyEdit = ({ apiKey, close, refreshData }) => {
  const dispatch = useDispatch()

  const [name, setName] = useState(apiKey ? apiKey.name : '')

  const editingDisabled = () => {
    return apiKey && !name.length
  }

  const confirmEdit = () => {
    let data = {
      appid: apiKey.appid,
      appid_new_name: name,
    }
    updateAPIKey(data)
      .then(() => {
        refreshData()
        dispatch(notifySuccess('API Key updated'))
      })
      .catch((error) => {
        dispatch(notifyError('Error updating API Key' + error.message))
      })
    close()
  }

  return (
    <div>
      <Row>
        <Col className="mb-3">
          <p>You can change the name of the API key.</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <label>New name:</label>
            <Row>
              <Col>
                <Input
                  style={{ color: '#222a42' }}
                  name="name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </Col>
            </Row>
          </FormGroup>
        </Col>
      </Row>
      <div className="agro-pop-up-footer">
        <Button
          className="btn-neutral"
          color="default"
          type="button"
          onClick={close}
        >
          Cancel
        </Button>
        <Button
          className="btn-neutral"
          color="default"
          disabled={editingDisabled()}
          data-dismiss="modal"
          type="button"
          onClick={confirmEdit}
        >
          Create
        </Button>
      </div>
    </div>
  )
}

export default ApiKeyEdit
