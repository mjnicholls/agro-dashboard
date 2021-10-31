/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
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
  TabContent,
  TabPane,
  UncontrolledTooltip,
} from 'reactstrap'
import { Link } from 'react-router-dom'

import TabsSelector from '../components/TabsSelector'
import ExportPolygons from './ExportPolygons'
import { api, subscriptions } from './utils'
import { getPolygons } from '../../api/personalAccount'
import { toDate } from '../../utils/dateTime'
import { numberWithCommas } from '../../utils/utils'
import { supportEmailMailTo } from '../../config'

const authSelector = (state) => state.auth

const tabsOptions = [
  { id: 'api', label: 'API' },
  { id: 'dashboard', label: 'Dashboard' },
]

const Subscription2 = () => {
  const [activePage, setActivePage] = useState('charge') // Charges or Limits
  const [activeTab, setActiveTab] = useState(tabsOptions[0]) // api or dashboard

  const [polygonsData, setPolygonsData] = useState({})
  const auth = useSelector(authSelector)
  const tariff = auth.user.tariff
  const data = subscriptions[tariff]

  useEffect(() => {
    getPolygons()
      .then((res) => {
        setPolygonsData(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const depthInYears = (year) => {
    return year > 0 ? year + ' year' : year === 0 ? '0 years' : 'Unlimited'
  }

  return (
    <>
      <Row className="mb-5">
        <Col>
          <h1 className="mb-0">{data.name}</h1>
          <span>Your Subscription Plan</span>
        </Col>
      </Row>

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
                  <Row>
                    <Col lg="12">
                      <Card>
                        <CardHeader>
                          <CardTitle>
                            <h2>Your Charges</h2>
                          </CardTitle>
                        </CardHeader>
                        <CardBody>
                          <Nav
                            className="nav-pills-info nav-pills-icons justify-content-center"
                            pills
                          >
                            <NavItem>
                              <NavLink>
                                <Row>
                                  <Col className="col">
                                    <i
                                      className="tim-icons icon-paper"
                                      style={{ marginTop: '15px' }}
                                    />
                                    <p>Your Charges</p>
                                    <p>This Month</p>
                                  </Col>
                                  <Col className="col">
                                    <p style={{ fontSize: '40px' }}>£40</p>
                                    <Link to="/dashboard/payments">
                                      <Button
                                        className="btn-fill"
                                        color="primary"
                                        type="submit"
                                        style={{ marginTop: '17px' }}
                                      >
                                        Invoice
                                      </Button>
                                    </Link>
                                  </Col>
                                </Row>
                              </NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink>
                                <h4>
                                  Next Payment: <b>Sep 30, 2022</b>
                                </h4>

                                <h4>
                                  Your Tariff: <b>{data.name.toUpperCase()}</b>
                                </h4>

                                {tariff === 'corp' ? (
                                  <h4 style={{ marginTop: '25px' }}>
                                    Need help?{' '}
                                    <a href={supportEmailMailTo}>
                                      Contact us.
                                    </a>
                                  </h4>
                                ) : (
                                  <Link to="/dashboard/billing-plans">
                                    <Button
                                      className="btn-fill"
                                      color="primary"
                                      type="submit"
                                      // onClick={}
                                    >
                                      Upgrade
                                    </Button>
                                  </Link>
                                )}
                              </NavLink>
                            </NavItem>
                          </Nav>
                          <Table style={{ marginTop: '15px' }}>
                            <thead>
                              <tr>
                                <th colSpan={2}>Polygons</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Created polygons, total area:</td>
                                <td>
                                  {numberWithCommas(polygonsData.full_area)} ha
                                </td>
                              </tr>
                              <tr>
                                <td>Total area polygons by tariff:</td>
                                <td>
                                  {numberWithCommas(
                                    polygonsData.permissible_area,
                                  )}{' '}
                                  ha
                                </td>
                              </tr>
                              <tr>
                                <td>Exceeding area polygons:</td>
                                <td>
                                  {numberWithCommas(
                                    polygonsData.exceeding_area_limit,
                                  )}{' '}
                                  ha
                                </td>
                              </tr>
                              <tr>
                                <td>Charge for exceeding area:</td>
                                <td>
                                  {numberWithCommas(
                                    polygonsData.payment_for_exceeding_area_limit,
                                  )}
                                </td>
                              </tr>
                            </tbody>
                            <br />

                            <thead>
                              <tr>
                                <th colSpan={2}>Export Polygons to CSV File</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <ExportPolygons />
                                </td>
                              </tr>
                            </tbody>

                            <br />

                            <thead>
                              <tr>
                                <th colSpan={2}>Unsubscribe</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <Button
                                    className="btn-fill"
                                    color="primary"
                                    type="submit"
                                    style={{ marginTop: '15px' }}
                                    //onClick={}
                                  >
                                    Unsubscribe
                                  </Button>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="limits">
                  <Row>
                    <Col lg="12">
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
                            <Table>
                              <thead>
                                <tr>
                                  <th>
                                    <p>Satellite data:</p>
                                    <span style={{ textTransform: 'none' }}>
                                      (imagery and statistics by polygon)
                                    </span>
                                  </th>
                                  <th>
                                    <p>Limits</p>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>API calls per minute</td>
                                  <td>
                                    <p>{data.api_calls_per_min}</p>
                                  </td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>
                                    Satellite imagery
                                    <br />
                                    (NDVI, EVI, EVI2, NRI, DSWI, NDWI, True
                                    color, False color){' '}
                                    <i
                                      className="tim-icons icon-alert-circle-exc"
                                      id="tool16"
                                    />
                                    <UncontrolledTooltip
                                      delay={0}
                                      target="tool16"
                                    >
                                      If have the FREE plan and create a polygon
                                      outside these areas, you will start to
                                      receive satellite imagery for the polygon
                                      in a few days. If you have a paid plan,
                                      the Satellite data archive for your
                                      polygons will be downloaded for any
                                      territories.
                                    </UncontrolledTooltip>
                                  </td>
                                  <td>
                                    {' '}
                                    <a
                                      href="https://home.agromonitoring.com/subscriptions#map"
                                      target="_blank"
                                    >
                                      All available data
                                    </a>{' '}
                                  </td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>Total area of created polygons</td>
                                  <td>
                                    {numberWithCommas(
                                      polygonsData.permissible_area,
                                    )}{' '}
                                    ha
                                  </td>
                                  <td></td>
                                </tr>

                                <tr>
                                  <td>Number of created polygons per month</td>
                                  <td>
                                    <p>{data.polygons_per_month}</p>
                                  </td>
                                  <td></td>
                                </tr>

                                <tr>
                                  <td>
                                    Price for exceeded area{' '}
                                    <a href="#"> — Learn more</a>
                                  </td>
                                  <td>
                                    <p>{data.price_exceeded_area}</p>
                                  </td>
                                  <td></td>
                                </tr>
                              </tbody>
                              <thead>
                                <br />
                                <tr>
                                  <th colSpan={2}>
                                    <p>Current and forecast weather data:</p>
                                  </th>
                                  <th>
                                    <p></p>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    <p>API calls per day</p>
                                  </td>
                                  <td>
                                    <p>{data.api_calls_per_min}</p>
                                  </td>
                                  <td></td>
                                </tr>
                                {data.api
                                  .filter((key) => api[key].isCurrent)
                                  .map((key) => (
                                    <tr key={'current_' + key}>
                                      <td>
                                        <a href={api[key].link} target="_blank">
                                          {api[key].name}{' '}
                                        </a>
                                        <i
                                          className="tim-icons icon-alert-circle-exc"
                                          id={api[key].tool_id}
                                        />
                                        <UncontrolledTooltip
                                          delay={0}
                                          target={api[key].tool_id}
                                        >
                                          {api[key].tooltip}
                                        </UncontrolledTooltip>
                                      </td>
                                      <td>
                                        <FontAwesomeIcon icon={faCheckCircle} />
                                      </td>{' '}
                                      <td></td>
                                    </tr>
                                  ))}
                              </tbody>
                              {tariff === 'free' ? (
                                <br />
                              ) : (
                                <>
                                  <br />
                                  <thead>
                                    <tr>
                                      <th colSpan={2}>
                                        <p>Historical weather data:</p>
                                      </th>
                                      <th></th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    <tr>
                                      <td>API calls per day</td>
                                      <td>
                                        <p>{data.api_calls_historical}</p>
                                      </td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Historical weather data depth</td>
                                      <td>
                                        <p>{data.historical_data_depths}</p>
                                      </td>
                                      <td></td>
                                    </tr>
                                    {data.api
                                      .filter((key) => !api[key].isCurrent)
                                      .map((key) => (
                                        <tr key={`history_ + ${key}`}>
                                          <td>
                                            <a
                                              href={api[key].link}
                                              target="_blank"
                                            >
                                              {api[key].name}
                                            </a>
                                          </td>
                                          <td>
                                            <FontAwesomeIcon
                                              icon={faCheckCircle}
                                            />
                                          </td>{' '}
                                          <td></td>
                                        </tr>
                                      ))}
                                  </tbody>
                                </>
                              )}
                              <thead>
                                <br />
                                <tr>
                                  <th colSpan={2}>
                                    <p>Service:</p>
                                  </th>
                                  {/* eslint-disable-next-line */}
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    Satellite imagery (DVI, EVI, EVI2, NDWI, NRI, True
                                    color, False color) data update
                                  </td>
                                  <td>
                                    <p>{data.satelitte_imagery_service}</p>
                                  </td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>
                                    Current soil temperature and moisture data
                                    update
                                  </td>
                                  <td>
                                    <p>{data.current_soil}</p>
                                  </td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>Weather API data update</td>
                                  <td>
                                    <p>{data.weather_api_update}</p>
                                  </td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>SSL</td>

                                  <td>
                                    <FontAwesomeIcon
                                      icon={faCheckCircle}
                                      value={data.ssl}
                                    />
                                  </td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>
                                    License for maps, APIs, and other products
                                  </td>
                                  <td>
                                    <a
                                      href="http://creativecommons.org/licenses/by-sa/4.0/"
                                      target="_blank"
                                    >
                                      {data.license_maps}
                                    </a>
                                  </td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>License for data and database</td>
                                  <td>
                                    <p>
                                      {' '}
                                      <a href="http://opendatacommons.org/licenses/odbl/">
                                        {data.license_data}
                                      </a>
                                    </p>
                                  </td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>Support</td>
                                  <td>
                                    <p>{data.support}</p>
                                  </td>
                                  <td></td>
                                </tr>
                              </tbody>
                            </Table>
                          ) : (
                            <>
                              <Table>
                                <thead>
                                  <tr>
                                    <th>Sections</th>
                                    {/*<th>Calls</th>*/}
                                    <th>Depth</th>
                                    {tariff === 'corp' && <th>Start date</th>}
                                  </tr>
                                </thead>
                                <tbody>
                                  {Object.keys(auth.limits.calls).map(
                                    (key) =>
                                      !api[key].dashboardHidden && (
                                        <tr key={`dashboard_ + ${key}`}>
                                          <td>
                                            <a
                                              href={api[key].link}
                                              target="_blank"
                                            >
                                              {api[key].dashboardName ||
                                                api[key].name}
                                            </a>{' '}
                                            <i
                                              className="tim-icons icon-alert-circle-exc"
                                              id={api[key].tool_id}
                                            />
                                            <UncontrolledTooltip
                                              delay={0}
                                              target={api[key].tool_id}
                                            >
                                              {api[key].tooltip}
                                            </UncontrolledTooltip>
                                          </td>
                                          {/*<td>*/}
                                          {/*{auth.limits.calls[key] >= 0*/}
                                          {/*? numberWithCommas(*/}
                                          {/*auth.limits.calls[key],*/}
                                          {/*)*/}
                                          {/*: 'Unlimited'}*/}
                                          {/*</td>*/}
                                          <td>
                                            {auth.limits.history[key]
                                              ? depthInYears(
                                                  auth.limits.history[key]
                                                    .depth,
                                                )
                                              : ''}
                                          </td>
                                          {tariff === 'corp' && (
                                            <td>
                                              {auth.limits.history[key]
                                                ? toDate(
                                                    auth.limits.history[key]
                                                      .start,
                                                  )
                                                : ''}
                                            </td>
                                          )}
                                        </tr>
                                      ),
                                  )}
                                  <tr>
                                    <td>
                                      <a href={api.crop_recognition.link}>
                                        {api.crop_recognition.name}
                                      </a>{' '}
                                      <i
                                        className="tim-icons icon-alert-circle-exc"
                                        id="tool15"
                                      />
                                      <UncontrolledTooltip
                                        delay={0}
                                        target="tool15"
                                      >
                                        Available only in the dashboard.
                                      </UncontrolledTooltip>
                                    </td>
                                    {tariff === 'free' ? (
                                      <td>2017, 2018 - available</td>
                                    ) : (
                                      <td>
                                        2017, 2018, 2019 - available 2020, 2021
                                        - on request
                                      </td>
                                    )}
                                    <td></td>
                                  </tr>
                                </tbody>
                                <thead>
                                  <br />
                                  <tr>
                                    <th colSpan={tariff === 'corp' ? 4 : 3}>
                                      Polygons
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>Min polygon area</td>
                                    <td colSpan={tariff === 'corp' ? 2 : 1}>
                                      {
                                        auth.limits.polygon_area
                                          .min_polygon_area
                                      }{' '}
                                      ha
                                    </td>
                                    <td></td>
                                  </tr>
                                  <tr>
                                    <td>Max polygon area</td>
                                    <td colSpan={tariff === 'corp' ? 2 : 1}>
                                      {numberWithCommas(
                                        auth.limits.polygon_area
                                          .max_polygon_area,
                                      )}{' '}
                                      ha
                                    </td>
                                    <td></td>
                                  </tr>
                                </tbody>
                              </Table>
                            </>
                          )}
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Subscription2
