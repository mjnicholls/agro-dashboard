import React, { useState } from 'react'

import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Button,
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
import { subscriptions } from '../utils'
import ChargeBreakdown from './ChargeBreakdown'
import UnsubscribeAlert from './UnsubscribeAlert'

const authSelector = (state) => state.auth

const Charges = () => {
  const auth = useSelector(authSelector)
  const { tariff } = auth.user
  const data = subscriptions[tariff]
  const [unsubscribeAlert, setUnsubscribeAlert] = useState(false)

  // const fullSection22 = () => (
  //   <Nav
  //                           className="nav-pills-info nav-pills-icons justify-content-center"
  //                           pills
  //                         >
  //                           <NavItem>
  //                             <NavLink>
  //                               <Row>
  //                                 <Col className="col">
  //                                   <i
  //                                     className="tim-icons icon-paper"
  //                                     style={{ marginTop: '15px' }}
  //                                   />
  //                                   <p>Your Charges</p>
  //                                   <p>This Month</p>
  //                                 </Col>
  //                                 <Col className="col">
  //                                   <p style={{ fontSize: '40px' }}>£40</p>
  //                                   <Link to="/dashboard/payments">
  //                                     <Button
  //                                       className="btn-fill"
  //                                       color="primary"
  //                                       type="submit"
  //                                       style={{ marginTop: '17px' }}
  //                                     >
  //                                       Invoice
  //                                     </Button>
  //                                   </Link>
  //                                 </Col>
  //                               </Row>
  //                             </NavLink>
  //                           </NavItem>
  //                           <NavItem>
  //                             <NavLink>
  //                               <h4>
  //                                 Next Payment: <b>Sep 30, 2022</b>
  //                               </h4>
  //
  //                               <h4>
  //                                 Your Tariff: <b>{data.name.toUpperCase()}</b>
  //                               </h4>
  //
  //                               {tariff === 'corp' ? (
  //                                 <h4 style={{ marginTop: '25px' }}>
  //                                   Need help?{' '}
  //                                   <a href={supportEmailMailTo}>Contact us.</a>
  //                                 </h4>
  //                               ) : (
  //                                 <Link to="/dashboard/billing-plans">
  //                                   <Button
  //                                     className="btn-fill"
  //                                     color="primary"
  //                                     type="submit"
  //                                     // onClick={}
  //                                   >
  //                                     Upgrade
  //                                   </Button>
  //                                 </Link>
  //                               )}
  //                             </NavLink>
  //                           </NavItem>
  //                         </Nav>
  // )

  return (
    <>
      {unsubscribeAlert && (
        <UnsubscribeAlert
          close={() => {
            setUnsubscribeAlert(false)
          }}
        />
      )}
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
                        <Button
                          className="btn-fill"
                          color="primary"
                          type="submit"
                          style={{ width: '180px' }}
                          onClick={() => setUnsubscribeAlert(true)}
                        >
                          Unsubscribe
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              )}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  )
}

Charges.propTpes = {
  setHasUnsubscribed: PropTypes.func,
}

export default Charges
