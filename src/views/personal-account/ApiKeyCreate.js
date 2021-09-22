import React, {useState} from "react";
import {createApiKey} from '../../services/api/personalAccountAPI';
import {useDispatch} from 'react-redux';
import { notifyError, notifySuccess } from "../../features/notifications/actions";


import {
  Button,
  Col,
  FormGroup,
  Input,
  Row
} from "reactstrap";

const ApiKeyCreate = ({ apiKey, close, refreshData }) => {

     const [name, setName] = useState("");
     const dispatch = useDispatch();
     
     const createDisabled = () => {
      return apiKey && name !== apiKey.name
    };
  
    const confirmCreate = () => {
        let data = {
            appid_name: name,
          };

          createApiKey(data).then(() => {
            refreshData();
            dispatch(notifySuccess("API Key created"))
          }).catch(error => {
            dispatch(notifyError("Error creating API Key" + error.message))
          })
        close();
      }

      
    
    return (
        <div>
          <Row>
            <Col className="mb-3">
              <p>Enter the name of your new API Key.</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <label>Name:</label>
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
              type="button"
              onClick={close}
            >
              Cancel
            </Button>
            <Button
              className="btn-neutral"
              color="default"
              disabled={createDisabled()}
              data-dismiss="modal"
              type="button"
              onClick={confirmCreate}
            >
              Create
            </Button>
          </div>
        </div>
      )
    }

export default ApiKeyCreate;