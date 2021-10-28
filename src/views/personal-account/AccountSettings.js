import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import { getAccountInfo } from '../../api/personalAccount'

import UserSettings from './account-settings/UserSettings'
import UserPassword from './account-settings/UserPassword'
import PrivacySettings from './account-settings/PrivacySettings'
import BillingInfo from './account-settings/BillingInformation2'
import DeleteAcctCard from './account-settings/DeleteAccount'
import UnitsRadioButtons from '../components/UnitsRadioButtons'
import TabsSelector from '../components/TabsSelector'

const tabsOptions = [
  { id: 'user', label: 'User Settings' },
  { id: 'billing', label: 'Billing information' },
]

const AccountSettings = () => {
  const [billingSettings, setBillingSettings] = useState({
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
  const [mailPreferences, setMailPreferences] = useState({
    news: false,
    product: false,
    system: false,
  })
  const [user, setUser] = useState({})

  const [isNew, setIsNew] = useState(true)

  const [activeTab, setActiveTab] = useState(tabsOptions[0])

  useEffect(() => {
    refreshData()
  }, [])

  const refreshData = () => {
    getAccountInfo().then((res) => {
      if (Object.keys(res.invoice_info).length) {
        setBillingSettings({
          ...billingSettings,
          ...res.invoice_info,
        })
        setIsNew(false)
      }
      setUser(res.user)
      setMailPreferences(res.mailing)
    })
  }

  const handleUserState = (key, value) => {
    const newObj = { ...user }
    newObj[key] = value
    setUser(newObj)
  }

  return (
    <>
      <div className="no-card-header">
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
        {activeTab.id === 'user' ? (
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
              <Col></Col>
            </Row>
            <Row>
              <Col>
                <h4>Personal information</h4>
                <Row>
                  <Col md="6">
                    <UserSettings
                      user={user}
                      handleUserState={handleUserState}
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
                  mailSettings={mailPreferences}
                  setMailSettings={setMailPreferences}
                />
              </Col>
              <DeleteAcctCard />
            </Row>
          </>
        ) : (
          <Row>
            <Col>
              <h4>Billing information</h4>
              <BillingInfo
                invoiceSettings={billingSettings}
                setInvoiceSettings={setBillingSettings}
                isNew={isNew}
                refreshData={refreshData}
                user={user}
              />
            </Col>
          </Row>
        )}
      </div>
    </>
  )
}

export default AccountSettings
