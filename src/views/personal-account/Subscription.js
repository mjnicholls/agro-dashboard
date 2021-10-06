/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Table,
  Row,
} from 'reactstrap'

import TabsSelector from '../agro-components/TabsSelector'
import ExportPolygons from './ExportPolygons'
import {api, subscriptions} from './utils'
import {getPolygons} from "../../services/api/personalAccountAPI";
import {toDate} from "../../utils/dateTime";
// import {getPolygons} from '../../services/api/personalAccountAPI.js'

const authSelector = (state) => state.auth

 const tabsOptions = [
    { id: 'api', label: 'API' },
    { id: 'dashboard', label: 'Dashboard' },
  ]

const Subscription = () => {

  const [activeTab, setActiveTab] = useState(tabsOptions[0])
  const [polygonsData, setPolygonsData] = useState({})
  const auth = useSelector(authSelector)
  const tariff = auth.user.tariff;
  const data = subscriptions[tariff];

  useEffect(() => {
    getPolygons()
      .then(res => {
        setPolygonsData(res)
      })
      .catch(err => {console.log(err)})
  }, [])

  const numberWithCommas = (x) => {
    let res = 0
    if (x) {
      res = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return res
  }

  const depthInYears = (year) => {
    return year > 0 ? year + ' year' : year === 0 ? '0 years' : 'Unlimited'
  }


  return (
    <div className="content">
      <Row className="mb-5">
        <Col>
          <h1 className="mb-0">{data.name}</h1>
          <span>Subscription plan start</span>
        </Col>
      </Row>

      <Row>
        <Col lg="7">
          <Card>
            <CardHeader>
              <CardTitle>
                <Row>
                  <Col>
                    <h2>Limits: {activeTab.id === "api" ? 'API' : 'Dashboard'}</h2>
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
              {activeTab.id === "api" ?
                <Table>
                <thead>
                  <tr>
                    <th>
                      <p>
                        Satellite data:
                      </p>
                      <span style={{textTransform: "none"}}>(imagery and statistics by polygon)</span>
                    </th>
                    <th>
                      <p>Limits</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="pl-5">API calls per minute</td>
                    <td>
                      <p>{data.api_calls_per_min}</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="pl-5">
                      Satellite imagery<br/>(NDVI, EVI, EVI2, NRI, DSWI, NDWI, True color, False color)
                    </td>
                    <td>
                      All{' '}
                      <a
                        href="https://home.agromonitoring.com/subscriptions#map"
                        target="_blank"
                      >
                        available data
                      </a>{' '}
                    </td>
                  </tr>
                  <tr>
                    <td className="pl-5">Total area of created polygons</td>
                    <td>{numberWithCommas(polygonsData.permissible_area)} ha</td>
                  </tr>

                  <tr>
                    <td className="pl-5">Number of created polygons per month</td>
                    <td>
                      <p>?</p>
                    </td>
                  </tr>

                  <tr>
                    <td className="pl-5">
                      Price for exceeded area{' '}
                      <a href="#">
                        Learn more
                      </a>
                    </td>
                    <td>
                      <p>?</p>
                    </td>
                  </tr>
                </tbody>
                <thead>
                  <tr>
                    <th colSpan={2}>
                      <p>Current and forecast weather data:</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="pl-5">
                      <p>API calls per day</p>
                    </td>
                    <td>
                      <p>?</p>
                    </td>
                  </tr>
                  {data.api.filter(key => api[key].isCurrent).map(key => (<tr key={"current_"+key} className="pl-5">
                    <td className="pl-5"><a href={api[key].link} target="_blank">{api[key].name}</a></td>
                    <td><FontAwesomeIcon icon={faCheckCircle} /></td>
                  </tr>))}
                </tbody>
                <thead>
                  <tr>
                    <th colSpan={2}>
                      <p>Historical weather data:</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="pl-5">API calls per day</td>
                    <td>
                      <p>?</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="pl-5">Historical weather data depth</td>
                    <td>
                      <p>?</p>
                    </td>
                  </tr>
                  {data.api.filter(key => api[key].isCurrent).map(key => (<tr key={"history_" + key} className="pl-5">
                    <td className="pl-5"><a href={api[key].link} target="_blank">{api[key].name}</a></td>
                    <td><FontAwesomeIcon icon={faCheckCircle} /></td>
                  </tr>))}
                </tbody>
              </Table>
                :
                <>
                  <div>Dashboard</div>
                  <p>Available parts of dashboard + limits</p>
                  <Table>
                    <thead>
                      <tr>
                        <th>API</th>
                        <th>Calls</th>
                        <th>Depth</th>
                        {tariff === "corp" && <th>Start date</th>}
                      </tr>
                    </thead>
                    <tbody>
                    {Object.keys(auth.limits.calls).map((key) => (
                        <tr key={"dashboard_"+key}>
                          <td><a href={api[key].link} target="_blank">{api[key].name}</a></td>
                          <td>{auth.limits.calls[key] >= 0 ? numberWithCommas(auth.limits.calls[key]) : "Unlimited"}</td>
                          <td>{auth.limits.history[key] ? depthInYears(auth.limits.history[key].depth) : null}</td>
                          {(tariff === "corp" && auth.limits.history[key]) && <td>{toDate(auth.limits.history[key].start)}</td>}
                        </tr>
                      )
                    )}
                    </tbody>
                    <thead>
                      <tr><th colSpan={tariff === "corp" ? 3 : 4}>Polygons</th></tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Min polygon area</td>
                        <td colSpan={tariff === "corp" ? 2 : 3}>{auth.limits.polygon_area.min_polygon_area} ha</td>
                      </tr>
                    <tr>
                        <td>Max polygon area</td>
                        <td colSpan={tariff === "corp" ? 2 : 3}>{numberWithCommas(auth.limits.polygon_area.max_polygon_area)} ha</td>
                      </tr>
                    </tbody>
                  </Table>
                </>
              }
            </CardBody>
          </Card>
        </Col>
        <Col lg="5">
          <Card>
            <CardHeader>
              <CardTitle>
                <h2>Charge this month</h2>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Table>
                <thead>
                  <tr>
                    <th colSpan={2}>Polygons</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Created polygons, total area:</td>
                    <td>{numberWithCommas(polygonsData.full_area)} ha</td>
                  </tr>
                  <tr>
                    <td>Total area polygons by tarriff:</td>
                    <td>{numberWithCommas(polygonsData.permissible_area)} ha</td>
                  </tr>
                  <tr>
                    <td>Exceeding area polygons:</td>
                    <td>{numberWithCommas(polygonsData.exceeding_area_limit)} ha</td>
                  </tr>
                  <tr>
                    <td>Charge for exceeding area:</td>
                    <td>{numberWithCommas(polygonsData.payment_for_exceeding_area_limit)}</td>
                  </tr>
                </tbody>
              </Table>
              <p>Total area</p>
              <p>Charge this month:</p>
              <p>- Fixed fee</p>
              <p>- Over limit use charge</p>

              <h4>Export polygons</h4>
              <div className="text-right">
                <ExportPolygons />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Subscription
