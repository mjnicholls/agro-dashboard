import React, { useState } from 'react'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  NavItem,
  NavLink,
  Nav,
  Table,
  Row,
  TabContent,
  TabPane,
  UncontrolledAlert,
} from 'reactstrap'

import { supportEmailMailTo } from '../../config'
import TabsSelector from '../components/TabsSelector'
import ChargeBreakdown from './ChargeBreakdown'
import LimitsApi from './LimitsApi'
import LimitsDashboard from './LimitsDashboard'
import Unsubscribe from './Unsubscribe'
import { subscriptions } from './utils'

const authSelector = (state) => state.auth

const tabsOptions = [
  { id: 'api', label: 'API' },
  { id: 'dashboard', label: 'Dashboard' },
]

const SubscriptionPage3 = () => {
  const [activePage, setActivePage] = useState('charge') // Charges or LimitsApi
  const [activeTab, setActiveTab] = useState(tabsOptions[0]) // api or dashboard
  const [hasUnsubscribed, setHasUnsubscribed] = useState(false)
  const auth = useSelector(authSelector)
  const { tariff } = auth.user
  const data = subscriptions[tariff]

  return (
    <>
      {hasUnsubscribed && (
        <UncontrolledAlert color="success" fade={false}>
          <span>
            <b>Success - </b> You have been unsubscribed successfully. Please
            sign out for changes to take effect.
          </span>
        </UncontrolledAlert>
      )}
      <Row>
        <Col className="ml-auto mr-auto">
          <Card className="card-plain card-subcategories">
            <CardBody>
              <Nav
                className="nav-pills-info nav-pills-icons justify-content-center"
                pills
              >
                <NavItem>
                  <NavLink
                    data-toggle="tab"
                    className={activePage === 'charge' ? 'active' : ''}
                    onClick={() => setActivePage('charge')}
                  >
                    <i className="tim-icons icon-coins" />
                    Your Charges
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    data-toggle="tab"
                    className={activePage === 'limits' ? 'active' : ''}
                    onClick={() => setActivePage('limits')}
                  >
                    <i className="tim-icons icon-alert-circle-exc" />
                    Your Limits
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent
                className="tab-space tab-subcategories"
                activeTab={activePage}
              >
                <TabPane tabId="charge">
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        <h2>Your Charges</h2>
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col>
                          <Nav
                            className="nav-pills-info nav-pills-icons mt-0 mb-5"
                            pills
                          >
                            <NavItem>
                              <NavLink className="py-4 px-5">
                                <h4>
                                  Your Tariff: <b>{data.name.toUpperCase()}</b>
                                </h4>

                                {tariff === 'corp' ? (
                                  <h4 style={{ marginTop: '25px' }}>
                                    Need help?{' '}
                                    <a href={supportEmailMailTo}>Contact us.</a>
                                  </h4>
                                ) : (
                                  <Link
                                    to="/users/billing-plans"
                                    role="button"
                                    className="btn btn-primary"
                                  >
                                    Upgrade
                                  </Link>
                                )}
                              </NavLink>
                            </NavItem>
                          </Nav>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <ChargeBreakdown />
                        </Col>
                        <Col>
                          <Table>
                            <thead>
                              <tr>
                                <th>My payments</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <Link
                                    to="/users/payments"
                                    role="button"
                                    className="btn btn-primary"
                                    style={{ width: '180px' }}
                                  >
                                    To invoices
                                  </Link>
                                </td>
                              </tr>
                            </tbody>
                          </Table>

                          {tariff !== 'free' && (
                            <Table>
                              <thead>
                                <tr>
                                  <th>
                                    <br />
                                    Unsubscribe
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    <Unsubscribe
                                      callback={() => setHasUnsubscribed(true)}
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          )}
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </TabPane>
                <TabPane tabId="limits">
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        <Row>
                          <Col>
                            <h2>
                              Limits:{' '}
                              {activeTab.id === 'api' ? 'API' : 'Dashboard'}
                            </h2>
                          </Col>
                          <Col>
                            <TabsSelector
                              activeTab={activeTab}
                              setActiveTab={setActiveTab}
                              options={tabsOptions}
                            />
                          </Col>
                        </Row>
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      {activeTab.id === 'api' ? (
                        <LimitsApi />
                      ) : (
                        <LimitsDashboard />
                      )}
                    </CardBody>
                  </Card>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>FAQ</h2>
        </Col>
      </Row>
      <Row>
        <Col lg="4">
          <h4>
            <b>What does a monthly price consist of?</b>
          </h4>
          <p>
            The monthly price for your subscription consists of two parts - one
            is <u>a fixed fee</u> for a certain fixed area of polygons (your
            fields) per month. Another is a separate{' '}
            <u>fee for all exceeded areas</u> over that threshold area.
          </p>
        </Col>
        <Col lg="4">
          <h4>
            <b>What is a monthly period?</b>
          </h4>
          <p>
            For recurrent subscription, it is a one month starting from the day
            of your subscription. At the end of the calendar month, we will
            charge your account for all your polygons during that month For
            manual invoicing, it is a calendar month. We count your subscription
            activity and charge from 1st to the last day of each month. You can
            subscribe to our service at any day of the month, for your first
            month we calculate your monthly fee on daily basis.
          </p>
        </Col>
        <Col lg="4">
          <h4>
            <b>How we count the active area within a month?</b>
          </h4>
          <p>
            Any polygon that is created under your account is considered as an
            active polygon. When you create a new polygon, it starts to receive
            data automatically, and we add up its area to the total monthly
            active area by default. If you delete a polygon, it still will be
            counted as an active in the current calendar month, although it will
            not be counted in the next calendar period.
          </p>
        </Col>
        <Col lg="4">
          <h4>
            <b>What is a monthly fixed fee?</b>
          </h4>
          <p>
            Fixedfee depends on a chosen subscription; each subscription has its
            own allowance threshold. For example, fixed fee of Starter
            subscription covers a territory that is not exceeded 4,000 ha in
            total per month. Everything after this threshould will be charge via
            fee for exceeded areas.
          </p>
        </Col>
        <Col lg="4">
          <h4>
            <b>How is the exceeded area fee calculated?</b>
          </h4>
          <p>
            We count area of your active polygons that exceeds a monthly
            threshold of your subscription. Different subscriptions have
            different price rate for exceeded area, please refer to the
            price-list for details.
          </p>
        </Col>
      </Row>
    </>
  )
}

export default SubscriptionPage3
