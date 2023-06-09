import React from 'react'

import ReactBSAlert from 'react-bootstrap-sweetalert'
import { Button, Card, CardBody } from 'reactstrap'

import { supportEmail, supportEmailMailTo } from '../../../config'
import DeleteAccountPopUp from './DeleteAccountPopUp'

const DeleteAcctCard = () => {
  const [alert, setAlert] = React.useState(null)

  const hideAlert = () => {
    setAlert(null)
  }

  const htmlAlert = () => {
    setAlert(
      <ReactBSAlert
        customClass="agro-alert-dark"
        title="Delete your account?"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        showConfirm={false}
        showCloseButton
      >
        <DeleteAccountPopUp close={hideAlert} />
      </ReactBSAlert>,
    )
  }

  return (
    <>
      {alert}
      <h4>Delete your account</h4>
      <Card>
        <CardBody>
          <p className="mb-3">
            If you delete your account all your API keys will be blocked.
          </p>
          <p className="mb-3">
            If you have any questions, please reach out to our friendly support
            team at{' '}
            <a href={supportEmailMailTo} target="_blank">
              {supportEmail}
            </a>
          </p>

          <div className="text-right">
            <Button
              className="btn-fill mt-3"
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
    </>
  )
}

export default DeleteAcctCard
