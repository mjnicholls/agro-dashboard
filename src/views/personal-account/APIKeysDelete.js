import React, {useState} from "react";
import {deleteAPIKey} from '../../services/api/personalAccountAPI';
import {useDispatch} from 'react-redux';
import { notifyError, notifySuccess } from "../../features/notifications/actions";


import {
  Button,
  Col,
  FormGroup,
  Input,
  Row
} from "reactstrap";

const ApiKeyDelete = ({ apiKey, close, refreshData }) => {

     const [name, setName] = useState("");
     const dispatch = useDispatch();
     
     const deletionDisabled = () => {
      return apiKey && name !== apiKey.name
    };
  
    const confirmDelete = () => {
        let data = {
            appid: apiKey.appid,
            name: apiKey.name
          };

          deleteAPIKey(data).then(() => {
            refreshData();
            dispatch(notifySuccess("API Key deleted"))
          }).catch(error => {
            dispatch(notifyError("Error deleting API Key" + error.message))
          })
        close();
      }
    
    return (
        <div>
          <Row>
            <Col className="mb-3">
              <p>Are you sure you want to delete the API Key?</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <label>Please enter its name to confirm:</label>
                <Row>
                  <Col>
                    <Input
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
              type="button"
              onClick={close}
            >
              Cancel
            </Button>
            <Button
              className="btn-neutral"
              color="default"
              disabled={deletionDisabled()}
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

export default ApiKeyDelete;