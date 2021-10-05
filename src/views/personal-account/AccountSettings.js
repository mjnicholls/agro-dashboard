/* eslint-disable */
import React, { useEffect, useState } from 'react'
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
import { getAccountInfo } from '../../services/api/personalAccountAPI'
// reactstrap components
import UserSettings from './UserSettings'
import UserPassword from './UserPassword'
import PrivacySettings from './PrivacySettings'
import InvoiceSettings from './InvoiceInfo'
import DeleteAccount from './DeleteAccount'
import UnitsRadioButtons from '../agro-components/UnitsRadioButtons'
import TabsSelector from '../charts/ui/TabsSelector'
const AccountSettings = () => {
  const [alert, setAlert] = React.useState(null)
  const [invoiceSettings, setInvoiceSettings] = useState({
    type: 'individual',
    organisation: '',
    title: '',
    first_name: '',
    last_name: '',
    country: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    postal_code: '',
    state: '',
    phone: '',
    vat_id: '',
  })
  const [mailSettings, setMailSettings] = useState({
    news: false,
    product: false,
    system: false,
  })

  const [isNew, setIsNew] = useState(true)
  const [isActiveStripeCustomer, setIsActiveStripeCustomer] = useState(false)
  const options = [
    { id: 'User Settings', label: 'User Settings' },
    { id: 'Billing information', label: 'Billing information' },
  ]
  const [activeTab, setActiveTab] = useState(options[0])
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    refreshData()
  }, [])

  const hideAlert = () => {
    setAlert(null)
  }

  const refreshData = () => {
    getAccountInfo().then((res) => {
      setName(res.user.full_name)
      setUsername(res.user.username)
      setEmail(res.user.email)
      setMailSettings(res.mailing)
      setIsActiveStripeCustomer(res.user.active_stripe_customer)
      if (Object.keys(res.invoice_info).length) {
        setInvoiceSettings(res.invoice_info)
        setIsNew(false)
      }
    })
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
      <div className="content no-card-header">
        <Row>
          <Col>
            <h1>Account Settings</h1>
          </Col>
          <Col>
            <TabsSelector
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              options={options}
            />
          </Col>
        </Row>
        {activeTab.id === options[0].id ? (
          <>
            <Row>
              <Col>
                <h4>Dashboard Settings</h4>
                <Card>
                  <CardBody>
                    <UnitsRadioButtons />
                  </CardBody>
                </Card>
              </Col>
              <Col>
                {/*<h4>&nbsp;</h4>*/}
                {/*<Card>*/}
                {/*<CardBody>*/}
                {/*<p>If you have any questions, please reach out to our friendly support team by emailing us at <a href="mailto:info@openweathermap.org" target="_blank">info@openweathermap.org</a></p>*/}
                {/*</CardBody>*/}
                {/*</Card>*/}
              </Col>
            </Row>
            <Row>
              <Col>
                <h4>Personal information</h4>
                <Row>
                  <Col md="6">
                    <UserSettings
                      name={name}
                      setName={setName}
                      username={username}
                      setUserName={setUsername}
                      email={email}
                    />
                  </Col>
                  <Col md="6">
                    <UserPassword />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <h4>Privacy settings</h4>
                <PrivacySettings
                  mailSettings={mailSettings}
                  setMailSettings={setMailSettings}
                />
              </Col>
              <Col>
                <h4>Delete your account</h4>
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Delete Your Account</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <p className="mb-3">
                      If you delete your account all your API keys will be
                      blocked.
                    </p>
                    <p>
                      If you have any questions, please reach out to our
                      friendly support team by emailing us at{' '}
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
            </Row>
          </>
        ) : (
          <Row>
            <Col>
              <h4>Billing information</h4>
              <InvoiceSettings
                invoiceSettings={invoiceSettings}
                setInvoiceSettings={setInvoiceSettings}
                isNew={isNew}
                refreshData={refreshData}
                isActiveStripeCustomer={isActiveStripeCustomer}
              />
            </Col>
          </Row>
        )}
      </div>
    </>
  )
}

export default AccountSettings
