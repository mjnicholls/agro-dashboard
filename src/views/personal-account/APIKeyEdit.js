import React, { useState } from 'react'

import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap'

import { updateAPIKey } from '../../api/personalAccountAPI'
import {
  notifyError,
  notifySuccess,
} from '../../features/notifications/actions'

const ApiKeyEdit = ({ apiKey, close, refreshData }) => {
  const dispatch = useDispatch()

  const [name, setName] = useState(apiKey ? apiKey.name : '')

  const editingDisabled = () => apiKey && !name.length

  const confirmEdit = () => {
    updateAPIKey({
      appid: apiKey.appid,
      appid_new_name: name,
    })
      .then(() => {
        refreshData()
        dispatch(notifySuccess('API Key updated'))
      })
      .catch((error) => {
        dispatch(notifyError(`Error updating API Key: ${error.message}`))
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
            <Label>New name:</Label>
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
          disabled={editingDisabled()}
          data-dismiss="modal"
          type="button"
          onClick={confirmEdit}
        >
          Confirm
        </Button>
      </div>
    </div>
  )
}

ApiKeyEdit.propTypes = {
  apiKey: PropTypes.string,
  close: PropTypes.func,
  refreshData: PropTypes.func,
}

export default ApiKeyEdit
