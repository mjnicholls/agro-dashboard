import React, { useEffect, useState } from 'react'

import { Card, CardBody, Col, Row } from 'reactstrap'

import { getAccountInfo } from '../../../api/personalAccount'
import TabsSelector from '../../components/TabsSelector'
import UnitsRadioButtons from '../../components/UnitsRadioButtons'
import BillingInfo from './BillingInformation'
import DeleteAcctCard from './DeleteAccount'
import PrivacySettings from './PrivacySettings'
import UserPassword from './UserPassword'
import UserSettings from './UserSettings'

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
    new_vat_id: '',
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
          new_vat_id: res.invoice_info.vat_id,
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
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <UserSettings user={user} handleUserState={handleUserState} />
              </Col>
              <Col md="6">
                <UserPassword />
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <PrivacySettings
                  mailSettings={mailPreferences}
                  setMailSettings={setMailPreferences}
                />
              </Col>
              <Col md="6">
                <DeleteAcctCard />
              </Col>
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
