import React, {useEffect, useState} from 'react';
import {getAPIKeys} from '../../services/api/personalAccountAPI'
// reactstrap components
import { Button, Card, CardHeader, CardBody, CardTitle, Row, Col, Table, UncontrolledTooltip } from "reactstrap";
import { setApiKeyStatus } from 'features/auth/actions';
import { apiKeys } from 'services/api';
import ReactBSAlert from "react-bootstrap-sweetalert";
import APIKeyEdit from './APIKeyEdit';
import ApiKeysDelete from './APIKeysDelete';

const ApiKeys = () => {
  

  const [data, setData] = useState([]);
  const [alert, setAlert] = React.useState(null);

  useEffect(() => {
    getAPIKeys()
      .then(res => {setData(res)})
      .catch(err => {console.log(err)})
  }, [])

  const refreshData = () => {
    getAPIKeys()
      .then(res => {
        setData(res)
      })
      .catch(err => {console.log(err)})
  }

  const hideAlert = () => {
    setAlert(null);
  };

  // to create modal for the delete/

  const htmlAlert = (apiKey, isEdit) => {
    setAlert(
      <ReactBSAlert
        customClass="agro-alert"
        title={isEdit ? "Edit API Key" : "Delete API key"}
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        showConfirm={false}
      >
        {isEdit ? <APIKeyEdit
          apiKey={apiKey}
          close={hideAlert}
          refreshData={refreshData}
        /> : <ApiKeysDelete
          apiKey={apiKey}
          close={hideAlert}
          refreshData={refreshData}
        />}
      </ReactBSAlert>
    );
  };


  return (   <>
    <div className="content">
      {alert}
      <Row>
        <Col className="mb-5" md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">API Keys</CardTitle>
            </CardHeader>
            <CardBody>
              <Table>
                <thead>
                <tr>
                  <th>Key</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th></th>
                  <th></th>
                </tr>

                </thead>

                <tbody>
                  {data.map(item => (
                    <tr>
                      <td>{item.appid}</td>
                      <td>{item.name}</td>
                      <td></td>
                      <td className="text-right">
                    <Button
                      className="btn-link btn-icon btn-neutral"
                      color="success"
                      id="tooltip618296632"
                      size="sm"
                      title="Refresh"
                      type="button"
                      onClick={(e) => {
                        htmlAlert(item, true);
                        e.stopPropagation();
                      }}
                    >
                      <i className="tim-icons icon-pencil" />
                    </Button>
                    <UncontrolledTooltip
                      delay={0}
                      target="tooltip618296632"
                    >
                      Edit key
                    </UncontrolledTooltip>
                    <Button
                      className="btn-link btn-icon btn-neutral"
                      color="danger"
                      id="tooltip707467505"
                      size="sm"
                      title="Delete"
                      type="button"
                      onClick={(e) => {
                        htmlAlert(item, false);
                        e.stopPropagation();
                      }}
                    >
                      <i className="tim-icons icon-simple-remove" />
                    </Button>
                    <UncontrolledTooltip
                      delay={0}
                      target="tooltip707467505"
                    >
                      Delete key
                    </UncontrolledTooltip>
                  </td>
                    </tr>
                  ))}
                </tbody>
               
                
             
                 
                 
              
                 
               </Table>
            </CardBody>
          </Card>
        </Col>
        
      </Row>
    </div>
  </>)

}

export default ApiKeys;