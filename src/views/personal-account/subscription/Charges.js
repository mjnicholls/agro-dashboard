import React from 'react'

import PropTypes from 'prop-types'
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
} from 'reactstrap'

import { supportEmailMailTo } from '../../../config'
import Unsubscribe from '../Unsubscribe'
import { subscriptions } from '../utils'
import ChargeBreakdown from './ChargeBreakdown'
const authSelector = (state) => state.auth

const Charges = ({ setHasUnsubscribed }) => {
  const auth = useSelector(authSelector)
  const { tariff } = auth.user
  const data = subscriptions[tariff]

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2>Your Charges</h2>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col>
            <Nav className="nav-pills-info nav-pills-icons mt-0 mb-5" pills>
              <NavItem>
                <NavLink className="py-4 px-5">
                  <h4>
                    Your Tariff: <b>{data.name.toUpperCase()}</b>
                  </h4>

                  {tariff === 'corp' ? (
                    <h4 style={{ marginTop: '25px' }}>
                      Need help? <a href={supportEmailMailTo}>Contact us.</a>
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
                      <Unsubscribe callback={() => setHasUnsubscribed(true)} />
                    </td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

Charges.propTpes = {
  setHasUnsubscribed: PropTypes.func,
}

export default Charges
