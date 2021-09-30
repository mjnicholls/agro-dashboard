import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  Table,
  TabPane,
  Row,
} from 'reactstrap'

// import {getPolygons} from '../../services/api/personalAccountAPI.js'
import { faListUl } from '@fortawesome/free-solid-svg-icons/index'
const authSelector = (state) => state.auth

const Subscription = () => {
  const [polygonsData, setPolygonsData] = useState({})
  const auth = useSelector(authSelector)

  // useEffect(() => {
  //   getPolygons()
  //     .then(res => {
  //       setPolygonsData(res)
  //     })
  //     .catch(err => {console.log(err)})
  // }, [])

  const [isIndividual, setIsIndividual] = useState(true)
  console.log('isIndividual', isIndividual)
  return (
    <div className="content">
      <Row>
        <Col>
          <h1>{auth.user.tariff}</h1>
          <p className="sub">Subscription plan start</p>
        </Col>
      </Row>

      <Row>
        <Col lg="8">
          <Card>
            <CardHeader>
              <CardTitle>
                <h2>Section: Information about limits</h2>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <div className="text-right mb-5">
                <b>Toggle API / Dashboard</b>
              </div>
              <Table>
                <thead>
                  <tr>
                    <th>
                      <p>
                        Satellite data (imageries and statistics by polygon)
                      </p>
                    </th>
                    <th>
                      <p>Limits</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Total area of created polygons</td>
                    <td>{polygonsData.permissible_area}</td>
                  </tr>
                  <tr>
                    <td>API calls per minute to satellite data</td>
                    <td>
                      <p className="text-danger">&#60;60</p>
                    </td>
                  </tr>
                  <tr>
                    <td>Number of created polygons per month</td>
                    <td>
                      <p className="text-danger">&#60;10</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Satellite imagery (NDVI, EVI, True color, False color)
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
                    <td>
                      Price for exceeded area{' '}
                      <a href="https://home.agromonitoring.com/subscriptions#description">
                        Learn more
                      </a>
                    </td>
                    <td>
                      <p className="text-danger">Unavailable</p>
                    </td>
                  </tr>
                  <tr>
                    <th colSpan={2}>
                      <p>Weather data</p>
                    </th>
                  </tr>
                  <tr>
                    <th colSpan={2}>
                      <p>Current and forecast weather data:</p>
                    </th>
                  </tr>
                  <tr>
                    <td>
                      <p className="ml-5">API calls per day</p>
                    </td>
                    <td>
                      <p className="text-danger">&#60; 500</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="ml-5">APIs included: </p>
                      <ul>
                        <li>
                          <a
                            href="https://agromonitoring.com/api/current-weather"
                            target="_blank"
                          >
                            Current weather data
                          </a>
                        </li>
                      </ul>
                    </td>
                    <td>
                      <p className="text-danger"></p>
                    </td>
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
                  </tr>
                  <tr>
                    <td>
                      <a href="https://agromonitoring.com/api/forecast-weather">
                        5 day/3 hour weather forecast
                      </a>
                    </td>
                    <td>
                      <FontAwesomeIcon icon={faCheckCircle} />
                    </td>
                  </tr>
                  <tr>
                    <td>API calls per day to historical weather data</td>
                    <td>
                      <p className="text-danger">—</p>
                    </td>
                  </tr>
                  <tr>
                    <td>Historical weather data depth</td>
                    <td>{auth.limits.history.weather_history.depth} years</td>
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
                  </tr>
                  <tr>
                    <td>
                      <a href="https://agromonitoring.com/api/forecast-weather">
                        5 day/3 hour weather forecast
                      </a>
                    </td>
                    <td>
                      <FontAwesomeIcon icon={faCheckCircle} />
                    </td>
                  </tr>
                  <tr>
                    <td>Historical weather data</td>
                    <td>{auth.limits.calls.weather_history}</td>
                  </tr>
                  <tr>
                    <td>Accumulated precipitation</td>
                    <td>
                      {
                        auth.limits.calls
                          .weather_history_accumulated_precipitation
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>Accumulated temperature</td>
                    <td>
                      {
                        auth.limits.calls
                          .weather_history_accumulated_temperature
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>Current UV index</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Forecast UV index</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Historical UV index</td>
                    <td></td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
        <Col lg="4">
          <Card>
            <CardHeader>
              <CardTitle>
                <h2>Section: information about money</h2>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <p>Charge this month:</p>
              <p>- Fixed fee</p>
              <p>- Over limit use charge</p>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Subscription
