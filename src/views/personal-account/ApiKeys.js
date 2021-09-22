import React, {useEffect, useState} from 'react';
import { getAPIKeys } from '../../services/api/personalAccountAPI'
// reactstrap components
import { Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Input,
  Row,
  Col,
  Table,
  UncontrolledTooltip } from "reactstrap";
import { setApiKeyStatus } from 'features/auth/actions';
import { apiKeys } from 'services/api';
import ReactBSAlert from "react-bootstrap-sweetalert";
import APIKeyEdit from './APIKeyEdit';
import ApiKeysDelete from './APIKeysDelete';
import { createApiKey } from '../../services/api/personalAccountAPI';
import { useDispatch } from 'react-redux';
import { notifyError, notifySuccess } from "../../features/notifications/actions";


const ApiKeys = () => {

  const [data, setData] = useState([]);
  const [alert, setAlert] = React.useState(null);
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const refreshData = () => {
    getAPIKeys()
      .then(res => {
        setData(res)
      })
      .catch(err => {console.log(err)})
  }

  useEffect(() => {
    refreshData();
  }, [])

  const hideAlert = () => {
    setAlert(null);
  };


  const confirmCreate = () => {
    let data = {
      appid_name: name,
    };

    createApiKey(data)
      .then(() => {
        setName("");
        refreshData();
        dispatch(notifySuccess("API Key created"))
      }).catch(error => {
        dispatch(notifyError("Error creating API Key" + error.message))
      })
  }

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
        /> }
      </ReactBSAlert>
    );
  };
      

  return (
    <>
      <div className="content">
        {alert}
        <Row>
          <Col className="mb-2" md="12" mt="8">
            <Card>
              <CardHeader>
                <div className="horizontal-container justify">
                  <Input
                    type="email"
                    placeholder="New API Key"
                    style={{ maxWidth: "400px", marginBottom: "20px" }}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                  <Button
                    color="primary"
                    // className="btn-link btn-icon btn-primary"
                    style={{
                      minWidth: "200px",
                      marginBottom: "20px",
                      backgroundColor: "#e14eca",
                    }}
                    size="sm"
                    title="Create"
                    type="button"
                    disabled={name.length === 0}
                    onClick={() => confirmCreate()}
                  >
                    Create New API Key
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col className="mb-0" md="12" mt="20">
            <Card>
              <CardHeader>
                <CardTitle tag="h3">API Keys</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="mb-0">
                  <thead>
                    <tr>
                      <th>Key</th>
                      <th>Name</th>
                    {/*  <th>Status</th>  */}
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.map((item) => (
                      <tr key={item.appid}>
                        <td>
                          <code>{item.appid}</code>
                        </td>
                        <td>{item.name}</td>
                        {/* <td></td> */}
                        <td className="text-right">
                          <Button
                            className="btn-link btn-icon btn-neutral"
                            color="success"
                            id="tooltip618296632"
                            size="sm"
                            title="Edit"
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
                            disabled={data.length === 1}
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
                          <Button
                            className="btn-link btn-icon btn-neutral"
                            color="danger"
                            id="tooltip707467506"
                            size="sm"
                            title="Copy"
                            type="button"
                            onClick={(e) => {
                              navigator.clipboard.writeText(item.appid);
                              dispatch(notifySuccess("Copied!"));
                              e.stopPropagation();
                            }}
                          >
                            <i className="tim-icons icon-single-copy-04" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip707467506"
                          >
                            Click to copy
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
    </>
  );

}

export default ApiKeys;