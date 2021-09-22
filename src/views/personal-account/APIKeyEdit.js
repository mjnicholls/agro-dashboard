import React, {useState} from "react";
import {updateAPIKey} from '../../services/api/personalAccountAPI';
import {useDispatch} from 'react-redux';
import { notifyError, notifySuccess } from "../../features/notifications/actions";

import {
  Button,
  Col,
  FormGroup,
  Input,
  Row
} from "reactstrap";

const ApiKeyEdit = ({ apiKey, close, refreshData  }) => {
  const [name, setName] = useState(apiKey ? apiKey.name : '')
  const dispatch = useDispatch();

  const editingDisabled = () => {
    return apiKey && !name.length
  }

  const confirmEdit = () => {
    let data = {
      appid: apiKey.appid,
      appid_new_name: name,
    }
    updateAPIKey(data).then(
      () => { 
        refreshData();
        dispatch(notifySuccess("API Key updated"))
      }).catch(error => {
        dispatch(notifyError("Error updating API Key" + error.message))
      })
    close();
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
                  style={{color: "#222a42"}}
                  name="name"
                  type="text"
                  onChange={e => setName(e.target.value)}
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
          // color="link"
          type="button"
          onClick={close}
        >
          Cancel
        </Button>
        <Button
          className="btn-neutral"
          color="default"
          disabled={editingDisabled()}
          // color="link"
          data-dismiss="modal"
          type="button"
          onClick={confirmEdit}
        >
          Rename
        </Button>
      </div>
    </div>
  )
}

export default ApiKeyEdit;