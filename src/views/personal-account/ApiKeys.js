/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Row,
  Col,
  Table,
  UncontrolledTooltip,
} from "reactstrap";
import ReactBSAlert from "react-bootstrap-sweetalert";
import APIKeyEdit from "./APIKeyEdit";
import ApiKeysDelete from "./APIKeysDelete";
import { createApiKey, getAPIKeys } from "../../services/api/personalAccountAPI";
import {
  notifyError,
  notifySuccess,
} from "../../features/notifications/actions";

const ApiKeys = () => {

  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [alert, setAlert] = React.useState(null);
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    getAPIKeys()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hideAlert = () => {
    setAlert(null);
  };

  const confirmCreate = () => {
    setError(null);

    if (!name.length) {
      setError(true);
      dispatch(notifyError("Name cannot be empty"));
      return;
    }

    setError({});

    let data = {
      appid_name: name,
    };

    createApiKey(data)
      .then(() => {
        setName("");
        refreshData();
        dispatch(notifySuccess("API Key created"));
      })
      .catch((error) => {
        dispatch(notifyError("Error creating API Key" + error.message));
      });
  };

  const htmlAlert = (apiKey, isEdit) => {
    setAlert(
      <ReactBSAlert
        customClass="agro-alert"
        title={isEdit ? "Edit API Key" : "Delete API key"}
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        showConfirm={false}
      >
        {isEdit ? (
          <APIKeyEdit
            apiKey={apiKey}
            close={hideAlert}
            refreshData={refreshData}
          />
        ) : (
          <ApiKeysDelete
            apiKey={apiKey}
            close={hideAlert}
            refreshData={refreshData}
          />
        )}
      </ReactBSAlert>
    );
  };

  return (
    <>
      <div className="content">
        {alert}
        <Row>
          <Col><h1>API Keys</h1></Col>
        </Row>
        <Row>
          <Col className="mb-0" md="8" mt="20">
            <Card>
              {/*<CardHeader>*/}
                {/*<CardTitle tag="h3">API Keys</CardTitle>*/}
              {/*</CardHeader>*/}
              <CardBody>
                <Table>
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

          <Col className="mb-2" md="4" mt="6">
            <Card>
              <CardHeader>
                <CardTitle tag="h3">New API Key </CardTitle>

                <Form>
                  <FormGroup>
                    <label>Name</label>
                    <Input
                      className={error ? "danger-border" : ""}
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </FormGroup>

                  <div className="text-right mb-3">
                    <Button
                      color="primary"
                      title="Create"
                      type="button"
                      onClick={() => confirmCreate()}
                    >
                      Create
                    </Button>
                  </div>
                </Form>
              </CardHeader>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ApiKeys;
