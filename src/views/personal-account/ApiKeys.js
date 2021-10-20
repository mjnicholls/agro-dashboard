import React, { useEffect, useState } from 'react'

import ReactBSAlert from 'react-bootstrap-sweetalert'
import { useDispatch } from 'react-redux'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Table,
  UncontrolledTooltip,
} from 'reactstrap'

import { createApiKey, getAPIKeys } from '../../api/personalAccountAPI'
import {
  notifyError,
  notifySuccess,
} from '../../features/notifications/actions'
import APIKeyEdit from './APIKeyEdit'
import ApiKeysDelete from './APIKeysDelete'

const ApiKeys = () => {
  const dispatch = useDispatch()

  const [data, setData] = useState([])
  const [alert, setAlert] = React.useState(null)
  const [name, setName] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    refreshData()
  }, [])

  const refreshData = () => {
    getAPIKeys()
      .then((res) => {
        console.log("res", res)
        setData(res)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  }

  const hideAlert = () => {
    setAlert(null)
  }

  const confirmCreate = () => {
    setError(null)

    if (!name.length) {
      setError(true)
      dispatch(notifyError('Name cannot be empty'))
      return
    }

    createApiKey({
      appid_name: name,
    })
      .then(() => {
        setName('')
        refreshData()
        dispatch(notifySuccess('API Key created'))
      })
      .catch((err) => {
        dispatch(notifyError(`Error creating API Key ${err.message}`))
      })
  }

  const htmlAlert = (apiKey, isEdit) => {
    setAlert(
      <ReactBSAlert
        customClass="agro-alert-dark"
        title={isEdit ? 'Edit API Key' : 'Delete API key'}
        onConfirm={hideAlert}
        onCancel={hideAlert}
        showConfirm={false}
        showCloseButton={true}
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
      </ReactBSAlert>,
    )
  }

  return (
    <>
      <div className="content">
        {alert}
        <Row>
          <Col>
            <h1>API Keys</h1>
          </Col>
        </Row>
        <Row>
          <Col className="mb-0" md="8" mt="20">
            <Card>
              <CardBody>
                <Table>
                  <thead>
                    <tr>
                      <th>Key</th>
                      <th>Name</th>
                      <th>Status</th>
                      <th aria-label="Edit"></th>
                      <th aria-label="Delete"></th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.map((item) => (
                      <tr key={item.appid}>
                        <td>
                          <code>{item.appid}</code>
                        </td>
                        <td>{item.name}</td>
                        {item.status === true ? (
                          <td>Active</td>
                        ) : (
                          <td>
                            <p style={{ color: 'red' }}>Not active</p>
                          </td>
                        )}
                        <td className="text-right">
                          <Button
                            className="btn-link btn-icon btn-neutral"
                            color="success"
                            id={`edit_${item.appid}`}
                            size="sm"
                            type="button"
                            onClick={(e) => {
                              htmlAlert(item, true)
                              e.stopPropagation()
                            }}
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target={`edit_${item.appid}`}
                          >
                            Edit key
                          </UncontrolledTooltip>
                          <Button
                            className="btn-link btn-icon btn-neutral"
                            color="danger"
                            id={`delete_${item.appid}`}
                            size="sm"
                            type="button"
                            disabled={data.length === 1}
                            onClick={(e) => {
                              htmlAlert(item, false)
                              e.stopPropagation()
                            }}
                          >
                            <i className="tim-icons icon-simple-remove" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target={`delete_${item.appid}`}
                          >
                            Delete key
                          </UncontrolledTooltip>
                          <Button
                            className="btn-link btn-icon btn-neutral"
                            color="danger"
                            id={`copy_${item.appid}`}
                            size="sm"
                            type="button"
                            onClick={(e) => {
                              navigator.clipboard.writeText(item.appid)
                              dispatch(notifySuccess('Copied!'))
                              e.stopPropagation()
                            }}
                          >
                            <i className="tim-icons icon-single-copy-04" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target={`copy_${item.appid}`}
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
                    <Label>Name</Label>
                    <Input
                      className={error ? 'danger-border' : ''}
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
  )
}

export default ApiKeys
