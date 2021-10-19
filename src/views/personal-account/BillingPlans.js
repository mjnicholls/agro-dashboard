import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Table,
  NavItem,
  NavLink,
  Nav,
} from 'reactstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import ReactBSAlert from 'react-bootstrap-sweetalert'
import SubscriptionPop2 from './SubscriptionPop'
import Map from '../maps/MapCovereage'

const userSubscriptionSelector = (state) => state.auth.user.tariff

const BillingPlans = () => {

  const subscription = useSelector(userSubscriptionSelector)
  const [alert, setAlert] = React.useState(null)

  const hideAlert = () => {
    setAlert(null)
  }

  const subScriptionAlert = () => {
    setAlert(
      <ReactBSAlert
        title="Subscribe"
        customClass="agro-alert-dark"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        showConfirm={false}
        // eslint-disable-next-line
        showCloseButton={true}
      >
        <SubscriptionPop2 close={hideAlert} />
      </ReactBSAlert>,
    )
  }

  const priceInfoAlert = () => {
    setAlert(
      <ReactBSAlert
        title="Price for exceeding area limit"
        customClass="agro-alert-dark"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        showConfirm={false}
        // eslint-disable-next-line
        showCloseButton={true}
      >
        <div className="text-left">
          <p>
            If you need a broader territory that exceeds your plan
            threshold, you can still call data without limitation
            with Starter subscription plan and above. In
            this case, you will be charged according to your
            subscription plan. We send you an
            invoice for the exceeded amount at the very beginning of
            the next month.
          </p>

          <p>
            Please note that if a polygon was created and then deleted
            in the same payment month, it <b>will be included</b> in
            the total area of used polygons for that particular month,
            but it <b>will not be included</b> in your next payment
            month. The total area of used polygons will also include
            those polygons, which have been created before the current
            payment month and that still exist now or have been
            deleted during the current payment month.
          </p>
        </div>
      </ReactBSAlert>,
    )
  }

  const CorporateText = () => (
    <>
      <p>We provide a customised service and extended data range under this plan. You can receive data for broader areas, get access to more in-depth archives, ask for an almost unlimited number of requests per minute, historical data depth, etc.</p>
      <p>Send us your requirements, and we will prepare a relevant offer for you.</p>
    </>
  )

  return (
    <>
      <div className="content">
        {alert}

        <Row>
          <Col>
            <h1>Billing Plans</h1>
          </Col>
        </Row>

        <Row>
          <Col className="mb-0" md="12" mt="20">
            <Card>
              <CardBody>
                <Table
                  className="mb-2 text-center billing-plans-table"
                  style={{ tableLayout: 'fixed' }}
                >
                  <thead>
                    <tr className="sticky-row">
                      <th>
                        <p>Fixed price per month</p>
                        <p>(excl. VAT)</p>
                      </th>
                      <th>
                        <Nav
                          className="nav-pills-info nav-pills-icons justify-content-center"
                          pills
                        >
                          <NavItem>
                            <NavLink>
                              <h3 className="mb-0">Free</h3>
                              <h3><b>£0</b></h3>
                              <Link to="/dashboard/api-keys">
                                <Button
                                  className="btn-primary text-nowrap"
                                  color="primary"
                                  data-dismiss="modal"
                                  type="button"
                                >
                                  API Key
                                </Button>
                              </Link>
                            </NavLink>
                          </NavItem>
                        </Nav>
                      </th>
                      <th>
                        <Nav
                          className="nav-pills-info nav-pills-icons justify-content-center"
                          pills
                        >
                          <NavItem>
                            <NavLink>
                              <h3 className="mb-0">Starter</h3>
                              <h3><b>£20</b></h3>

                              {subscription === 'starter' ? (
                                <Button
                                  className="btn-primary btn-simple"
                                  color="primary"
                                  data-dismiss="modal"
                                  type="button"
                                  /* onClick={(e) => {
                                    htmlAlert(false);
                                    e.stopPropagation();
                                  }} */
                                >
                                  Unsubscribe
                                </Button>
                              ) : (
                                <Button
                                  className="btn-primary"
                                  color="primary"
                                  data-dismiss="modal"
                                  type="button"
                                  onClick={(e) => {
                                    subScriptionAlert(false)
                                    e.stopPropagation()
                                  }}
                                >
                                  Subscribe
                                </Button>
                              )}
                            </NavLink>
                          </NavItem>
                        </Nav>
                      </th>
                      <th>
                        <Nav
                          className="nav-pills-info nav-pills-icons justify-content-center"
                          pills
                        >
                          <NavItem>
                            <NavLink>
                              <h3 className="mb-0">Small Kit</h3>
                              <h3><b>£200</b></h3>

                              {subscription === 'small' ? (
                                <Button
                                  className="btn-primary btn-simple"
                                  color="primary"
                                  data-dismiss="modal"
                                  type="button"
                                  /* onClick={(e) => {
                                  htmlAlert(false);
                                  e.stopPropagation();
                                }}
                                */
                                >
                                  Unsubscribe
                                </Button>
                              ) : (
                                <Button
                                  className="btn-primary"
                                  color="primary"
                                  data-dismiss="modal"
                                  type="button"
                                  onClick={(e) => {
                                    subScriptionAlert(false)
                                    e.stopPropagation()
                                  }}
                                >
                                  Subscribe
                                </Button>
                              )}
                            </NavLink>
                          </NavItem>
                        </Nav>
                      </th>
                      <th>
                        <Nav
                          className="nav-pills-info nav-pills-icons justify-content-center"
                          pills
                        >
                          <NavItem>
                            <NavLink>
                              <h3 className="mb-0">Corporate</h3>
                              <h3>&nbsp;</h3>
                              <a
                                href="https://openweathermap.force.com/s/contactsupport"
                                target="_blank"
                              >
                                <Button
                                  className="btn-primary text-nowrap"
                                  color="primary"
                                  type="button"
                                >
                                  Contact us
                                </Button>
                              </a>
                            </NavLink>
                          </NavItem>
                        </Nav>
                      </th>
                    </tr>
                    <tr>
                      <th colSpan="5">
                        <h4>
                          Satellite data (imagery and statistics by polygon)
                        </h4>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="mb-2">
                      <td>Total area of created polygons</td>
                      <td>1,000 ha</td>
                      <td>4,000 ha</td>
                      <td>20,000 ha</td>
                      <td>Unlimited</td>
                    </tr>

                    <tr>
                      <td>
                        API calls <b>per minute</b> to satellite data
                      </td>
                      <td>&#60; 60</td>
                      <td>&#60; 600</td>
                      <td>&#60; 3,000</td>
                      <td>Unlimited</td>
                    </tr>

                    <tr>
                      <td>Number of created polygons per month</td>
                      <td>&#60; 10</td>
                      <td>Unlimited</td>
                      <td>Unlimited</td>
                      <td>Unlimited</td>
                    </tr>

                    <tr>
                      <td>
                        Satellite imagery (NDVI, EVI, EVI2, NDWI, NRI, True
                        color, False color)
                      </td>
                      <td>
                        <a href="#map" target="_blank">
                          All available data
                        </a>
                      </td>
                      <td>
                        <a href="#map" target="_blank">
                          All available data
                        </a>{' '}
                        + total archive on request
                      </td>
                      <td>
                        <a href="#map" target="_blank">
                          All available data
                        </a>{' '}
                        + total archive on request
                      </td>
                      <td>Total archive</td>
                    </tr>
                    <tr className="mb-2">
                      <td>
                        Satellite imagery data update
                      </td>
                      <td>
                        Near real-time (operative)
                      </td>
                      <td>
                        Near real-time (operative)
                      </td>
                      <td>
                        Near real-time (operative)
                      </td>
                      <td>
                        Near real-time (operative)
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Price for exceeding area limit{' '}

                          <FontAwesomeIcon icon={faInfoCircle} onClick={priceInfoAlert}/>

                      </td>
                      <td>Unavailable</td>
                      <td>£0.02 per each 1 ha</td>
                      <td>£0.01 per each 1 ha</td>
                      <td>Flexible discount system</td>
                    </tr>

                    <tr>
                      <td>
                        <a
                          href="https://agromonitoring.com/api/images"
                          target="_blank"
                        >
                          Satellite imagery (NDVI, EVI, True color, False color
                        </a>
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                      <td rowSpan="4">
                        <CorporateText />
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <a
                          href="https://agromonitoring.com/api/history-ndvi"
                          target="_blank"
                        >
                          NDVI history for a polygon
                        </a>
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <a
                          href="https://agromonitoring.com/api/current-soil"
                          target="_blank"
                        >
                          Current soil temperature and moisture
                        </a>
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <a
                          href="https://agromonitoring.com/api/history-soil"
                          target="_blank"
                        >
                          Historical soil temperature and moisture
                        </a>
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                    </tr>
                  <tr>
                      <td>Current soil temperature and moisture data update</td>
                      <td>2 times per day</td>
                      <td>2 times per day</td>
                      <td>2 times per day</td>
                      <td>2 times per day</td>
                    </tr>
                  </tbody>
                  <thead>
                    <tr>
                      <th colSpan="5">
                        <h4>Weather data</h4>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="mb-2">
                      <td>
                        API calls <b>per day</b> to current and forecast weather
                        data
                      </td>
                      <td>&#60; 500</td>
                      <td>&#60; 1,000</td>
                      <td>&#60; 10,000</td>
                      <td>Unlimited</td>
                    </tr>
                    <tr>
                      <td>
                        API calls <b>per day</b> to historical weather data
                      </td>
                      <td>—</td>
                      <td>&#60; 500</td>
                      <td>&#60; 5,000</td>
                      <td>Unlimited</td>
                    </tr>

                    <tr>
                      <td>Historical weather data depth</td>
                      <td>—</td>
                      <td>1 Year</td>
                      <td>1 Year</td>
                      <td>Total archive</td>
                    </tr>

                    <tr>
                      <td>
                        <a
                          href="https://agromonitoring.com/api/current-weather"
                          target="_blank"
                        >
                          Current weather data
                        </a>
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                      <td rowSpan="8">
                        <CorporateText />
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <a
                          href="https://agromonitoring.com/api/forecast-weather"
                          target="_blank"
                        >
                          5 day/3 hour weather forecast
                        </a>
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <a
                          href="https://agromonitoring.com/api/history-weather"
                          target="_blank"
                        >
                          Historical weather data
                        </a>
                      </td>
                      <td>—</td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <a
                          href="https://agromonitoring.com/api/accumulated-precipitation"
                          target="_blank"
                        >
                          Accumulated precipitation
                        </a>
                      </td>
                      <td>—</td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <a
                          href="https://agromonitoring.com/api/accumulated-temperature"
                          target="_blank"
                        >
                          Accumulated temperature
                        </a>
                      </td>
                      <td>—</td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <a
                          href="https://agromonitoring.com/api/current-uvi"
                          target="_blank"
                        >
                          Current UV index
                        </a>
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <a
                          href="https://agromonitoring.com/api/forecast-uvi"
                          target="_blank"
                        >
                          Forecast UV index
                        </a>
                      </td>
                      <td>—</td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <a
                          href="https://agromonitoring.com/api/history-uvi"
                          target="_blank"
                        >
                          Historical UV index
                        </a>
                      </td>
                      <td>—</td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                    </tr>
                  <tr>
                      <td>Weather API data update</td>
                      <td>&#60; 2 hours</td>
                      <td>&#60; 1 hour</td>
                      <td>&#60; 1 hour</td>
                      <td>&#60; 10 mins</td>
                    </tr>
                  </tbody>
                  <thead>
                    <tr>
                      <th colSpan="5">
                        <h4>Service</h4>
                      </th>
                    </tr>
                  </thead>
                  <tbody>

                    <tr>
                      <td>SSL</td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                    </tr>

                    <tr>
                      <td>License for maps, APIs, and other products</td>
                      <td>
                        <a
                          href="http://creativecommons.org/licenses/by-sa/4.0/"
                          target="_blank"
                        >
                          CC BY-SA 4.0
                        </a>
                      </td>
                      <td>
                        <a
                          href="http://creativecommons.org/licenses/by-sa/4.0/"
                          target="_blank"
                        >
                          CC BY-SA 4.0
                        </a>
                      </td>
                      <td>
                        <a
                          href="http://creativecommons.org/licenses/by-sa/4.0/"
                          target="_blank"
                        >
                          CC BY-SA 4.0
                        </a>
                      </td>
                      <td>
                        <a
                          href="http://creativecommons.org/licenses/by-sa/4.0/"
                          target="_blank"
                        >
                          CC BY-SA 4.0{' '}
                        </a>
                        (or custom)
                      </td>
                    </tr>

                    <tr>
                      <td>License for data and database</td>
                      <td>
                        <a
                          href="http://opendatacommons.org/licenses/odbl/"
                          target="_blank"
                        >
                          ODbL
                        </a>
                      </td>
                      <td>
                        <a
                          href="http://opendatacommons.org/licenses/odbl/"
                          target="_blank"
                        >
                          ODbL
                        </a>
                      </td>
                      <td>
                        <a
                          href="http://opendatacommons.org/licenses/odbl/"
                          target="_blank"
                        >
                          ODbL
                        </a>
                      </td>
                      <td>
                        <a
                          href="http://opendatacommons.org/licenses/odbl/"
                          target="_blank"
                        >
                          ODbL{' '}
                        </a>
                        (or custom)
                      </td>
                    </tr>

                    <tr>
                      <td>Support</td>
                      <td>Helpdesk</td>
                      <td>Helpdesk</td>
                      <td>Helpdesk</td>
                      <td>Direct 24x7</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <h1>Where you can get satellite imagery data right now</h1>
          </Col>
        </Row>


        <Row>
          <Col className="mb-0" md="12" mt="20">
            <Card>
              {/*<CardHeader>*/}
                {/*<h3>Where you can get satellite imagery data right now</h3>*/}
              {/*</CardHeader>*/}
              <CardBody>
                <Row>
                  <Col>
                    <p>
                      This map shows areas in blue for which satellite imagery
                      data is available in our system.
                    </p>
                    <ul>
                      <li>
                        <b>If you have a paid plan</b>, the satellite data
                        archive for your polygons can be downloaded for any
                        territories.
                      </li>
                      <li>
                        <b>If you have the FREE plan</b> and create a polygon
                        outside these areas, you will receive satellite imagery
                        for the polygon in a few days.
                      </li>
                    </ul>
                  </Col>
                </Row>


                <Row>
                  <Col>
                    <p>
                      Please{' '}
                      <a
                        href="https://openweathermap.force.com/s/contactsupport"
                        target="_blank"
                      >
                        contact us
                      </a>{' '}
                      with any questions. We will do our best to prepare a
                      proper solution for you.
                    </p>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Map />
      </div>
    </>
  )
}

export default BillingPlans
