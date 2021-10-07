/* eslint-disable */
import React from 'react'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from 'reactstrap'
import ReactBSAlert from 'react-bootstrap-sweetalert'
import DeleteAccount from './DeleteAccount'

const DeleteAcctCard = () => {
  const [alert, setAlert] = React.useState(null)

  const hideAlert = () => {
    setAlert(null)
  }

  const htmlAlert = () => {
    setAlert(
      <ReactBSAlert
        customClass="agro-alert"
        title="Delete your account?"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        showConfirm={false}
      >
        <DeleteAccount close={hideAlert} />
      </ReactBSAlert>,
    )
  }

  return (
    <>
      {alert}
      <Col>
        <h4>Delete your account</h4>
        <Card>
          <CardHeader>
            <CardTitle tag="h4">Delete Your Account</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="mb-3">
              If you delete your account all your API keys will be blocked.
            </p>
            <p>
              If you have any questions, please reach out to our friendly
              support team by emailing us at{' '}
              <a href="mailto:info@openweathermap.org" target="_blank">
                info@openweathermap.org
              </a>
              .
            </p>

            <div className="text-right">
              <Button
                className="btn-fill"
                color="danger"
                type="button"
                title="Delete"
                onClick={(e) => {
                  htmlAlert()
                  e.stopPropagation()
                }}
              >
                Delete
              </Button>
            </div>
          </CardBody>
        </Card>
      </Col>
    </>
  )
}

export default DeleteAcctCard
