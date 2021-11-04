import React, { useState } from 'react'

import {
  Col,
  NavItem,
  NavLink,
  Nav,
  Row,
  TabContent,
  TabPane,
} from 'reactstrap'

import Charges from './Charges'
import FAQ from './FAQ'
import LimitsApi from './LimitsApi'
import LimitsDashboard from './LimitsDashboard'

const SubscriptionPage = (props) => {
  const [activePage, setActivePage] = useState('charge')

  return (
    <>
      <Row>
        <Col className="ml-auto mr-auto">
          <Nav
            className="nav-pills-info nav-pills-icons justify-content-center mt-3"
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
                API Limits
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                data-toggle="tab"
                className={activePage === 'dashboard' ? 'active' : ''}
                onClick={() => setActivePage('dashboard')}
              >
                <i className="tim-icons icon-chart-pie-36" />
                Dashboard
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent
            className="tab-space tab-subcategories"
            activeTab={activePage}
          >
            <TabPane tabId="charge">
              <Charges />
              <FAQ />
            </TabPane>
            <TabPane tabId="limits">
              <LimitsApi />
            </TabPane>
            <TabPane tabId="dashboard">
              <LimitsDashboard history={props.history} />
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </>
  )
}

export default SubscriptionPage
