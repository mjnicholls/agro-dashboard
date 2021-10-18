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
import { getAccountInfo } from '../../api/personalAccountAPI'
// reactstrap components
import UserSettings from './UserSettings'
import UserPassword from './UserPassword'
import PrivacySettings from './PrivacySettings'
import InvoiceSettings from './InvoiceInfo'
import DeleteAcctCard from './DeleteAccountCard'
import UnitsRadioButtons from '../agro-components/UnitsRadioButtons'
import TabsSelector from '../agro-components/TabsSelector'
const AccountSettings = () => {
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
  const tabsOptions = [
    { id: 'User Settings', label: 'User Settings' },
    { id: 'Billing information', label: 'Billing information' },
  ]
  const [activeTab, setActiveTab] = useState(tabsOptions[0])
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    refreshData()
  }, [])

  const refreshData = () => {
    getAccountInfo().then((res) => {
      setName(res.user.full_name)
      setUsername(res.user.username)
      setEmail(res.user.email)
      setMailSettings(res.mailing)
      setIsActiveStripeCustomer(res.user.active_stripe_customer)
      if (Object.keys(res.invoice_info).length) {
        setInvoiceSettings({
          ...invoiceSettings,
          ...res.invoice_info,
        })
        setIsNew(false)
      }
    })
  }

  return (
    <>
      <div className="content no-card-header">
        <Row>
          <Col>
            <h1>Account Settings</h1>
          </Col>
          <Col>
            <TabsSelector
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              options={tabsOptions}
            />
          </Col>
        </Row>
        {activeTab.id === tabsOptions[0].id ? (
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
              <DeleteAcctCard />
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
