import React, { useEffect, useState } from 'react'

import { faCheckCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactBSAlert from 'react-bootstrap-sweetalert'
import { useSelector } from 'react-redux'
import { Button, Card, CardBody, Col, Row, Table } from 'reactstrap'

import { isSubscriptionAvailableAPI } from '../../api/apiAccount'
import { supportEmailMailTo, vegetationIndices } from '../../config'
import ContactUsButton from '../components/ContactUsButton'
import ExceedingPriceInfo from '../components/ExceedingPriceInfo'
import Map from '../maps/MapCovereage'
import SubscriptionPopUp from './subscription/popup/SubscriptionPopUp'
import { subscriptions } from './utils'

const userSelector = (state) => state.auth.user

const BillingPlans = () => {
  const [alert, setAlert] = useState(null)
  const [isSubscriptionAvailable, setIsSubscriptionAvailable] = useState(true)

  const user = useSelector(userSelector)
  const subscription = user.tariff

  useEffect(() => {
    isSubscriptionAvailableAPI(user.email).then((res) => {
      if (res && res.message && res.message.user)
        setIsSubscriptionAvailable(res.message.user.available_subscription)
    })
  }, [user])

  const hideAlert = () => {
    setAlert(null)
  }

  const subScriptionAlert = (plan) => {
    setAlert(
      <ReactBSAlert
        title="Subscribe"
        customClass="agro-alert-dark"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        showConfirm={false}
        showCloseButton
      >
        <SubscriptionPopUp close={hideAlert} plan={plan} />
      </ReactBSAlert>,
    )
  }

  const priceInfoAlert = () => {
    setAlert(<ExceedingPriceInfo close={hideAlert} />)
  }

  const CorporateText = () => (
    <>
      <p>
        We provide a customised service and extended data range under this plan.
        You can receive data for broader areas, get access to more in-depth
        archives, ask for an almost unlimited number of requests per minute,
        historical data depth, etc.
      </p>
      <p>
        Send us your requirements, and we will prepare a relevant offer for you.
      </p>
    </>
  )

  const buttonSubscribe = (plan) =>
    plan === subscription ? (
      <h6 className="p-2" style={{ color: '#e14eca' }}>
        Your plan
      </h6>
    ) : (
      <Button
        className="btn btn-primary"
        color="primary"
        data-dismiss="modal"
        type="button"
        onClick={() => {
          subScriptionAlert(plan)
        }}
        disabled={plan === subscription}
      >
        Subscribe
      </Button>
    )

  const ShowSubscribeButton = ({ plan }) => {
    if (plan === subscription) {
      return (
        <h6 className="p-2" style={{ color: '#e14eca' }}>
          Your plan
        </h6>
      )
    }
    if (plan === 'corp') {
      return <ContactUsButton />
    }
    if (plan === 'free') {
      return null
    }
    return isSubscriptionAvailable ? buttonSubscribe(plan) : <ContactUsButton />
  }

  return (
    <>
      <div>
        {alert}
        <Row>
          <Col>
            <h1>Billing Plans</h1>
          </Col>
        </Row>

        <Row>
          <Col className="mb-0" mt="20">
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
                      <th className="price-container">
                        <h3 className="mb-0">Free</h3>
                        <h3>
                          <b>£0</b>
                        </h3>
                        <ShowSubscribeButton plan="free" />
                      </th>
                      <th className="price-container">
                        <div>
                          <h3 className="mb-0">Starter</h3>
                          <h3>
                            <b>£20</b>
                          </h3>
                          <ShowSubscribeButton plan="starter" />
                        </div>
                      </th>
                      <th className="price-container">
                        <h3 className="mb-0">Small Kit</h3>
                        <h3>
                          <b>£200</b>
                        </h3>
                        <ShowSubscribeButton plan="small" />
                      </th>
                      <th className="price-container">
                        <h3 className="mb-0">Corporate</h3>
                        <h3>&nbsp;</h3>
                        <ShowSubscribeButton plan="corp" />
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
                      <td>{subscriptions.free.polygons_total_area}</td>
                      <td>{subscriptions.starter.polygons_total_area}</td>
                      <td>{subscriptions.small.polygons_total_area}</td>
                      <td>{subscriptions.corp.polygons_total_area}</td>
                    </tr>

                    <tr>
                      <td>
                        API calls <b>per minute</b> to satellite data
                      </td>
                      <td>{subscriptions.free.api_calls_per_min}</td>
                      <td>{subscriptions.starter.api_calls_per_min}</td>
                      <td>{subscriptions.small.api_calls_per_min}</td>
                      <td>{subscriptions.corp.api_calls_per_min}</td>
                    </tr>

                    <tr>
                      <td>Number of created polygons per month</td>
                      <td>{subscriptions.free.polygons_per_month}</td>
                      <td>{subscriptions.starter.polygons_per_month}</td>
                      <td>{subscriptions.small.polygons_per_month}</td>
                      <td>{subscriptions.corp.polygons_per_month}</td>
                    </tr>

                    <tr>
                      <td>
                        Satellite imagery
                        <br />({vegetationIndices})
                      </td>
                      <td>{subscriptions.free.satellite_imagery_data}</td>
                      <td>{subscriptions.starter.satellite_imagery_data}</td>
                      <td>{subscriptions.small.satellite_imagery_data}</td>
                      <td>{subscriptions.corp.satellite_imagery_data}</td>
                    </tr>
                    <tr className="mb-2">
                      <td>Satellite imagery data update</td>
                      <td>{subscriptions.free.satellite_imagery_service}</td>
                      <td>{subscriptions.starter.satellite_imagery_service}</td>
                      <td>{subscriptions.small.satellite_imagery_service}</td>
                      <td>{subscriptions.corp.satellite_imagery_service}</td>
                    </tr>
                    <tr>
                      <td>
                        Price for exceeding area limit&nbsp;
                        <FontAwesomeIcon
                          icon={faInfoCircle}
                          onClick={priceInfoAlert}
                        />
                      </td>
                      <td>{subscriptions.free.price_exceeded_area}</td>
                      <td>{subscriptions.starter.price_exceeded_area}</td>
                      <td>{subscriptions.small.price_exceeded_area}</td>
                      <td>{subscriptions.corp.price_exceeded_area}</td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          href="https://agromonitoring.com/api/images"
                          target="_blank"
                        >
                          Satellite imagery
                        </a>
                        <br />
                        {vegetationIndices}
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
                      <td>-</td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                    </tr>
                    <tr>
                      <td>Current soil temperature and moisture data update</td>
                      <td>{subscriptions.free.soil_update}</td>
                      <td>{subscriptions.starter.soil_update}</td>
                      <td>{subscriptions.small.soil_update}</td>
                      <td>{subscriptions.corp.soil_update}</td>
                    </tr>
                    <tr>
                      <td>Crop Recognition Map</td>
                      <td>{subscriptions.free.crop_recognition}</td>
                      <td>{subscriptions.starter.crop_recognition}</td>
                      <td>{subscriptions.small.crop_recognition}</td>
                      <td>{subscriptions.corp.crop_recognition}</td>
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
                      <td>{subscriptions.free.api_calls_per_day}</td>
                      <td>{subscriptions.starter.api_calls_per_day}</td>
                      <td>{subscriptions.small.api_calls_per_day}</td>
                      <td>{subscriptions.corp.api_calls_per_day}</td>
                    </tr>
                    <tr>
                      <td>
                        API calls <b></b> to historical weather data
                      </td>
                      <td>{subscriptions.free.api_calls_historical}</td>
                      <td>{subscriptions.starter.api_calls_historical}</td>
                      <td>{subscriptions.small.api_calls_historical}</td>
                      <td>{subscriptions.corp.api_calls_historical}</td>
                    </tr>

                    <tr>
                      <td>Historical weather data depth</td>
                      <td>{subscriptions.free.historical_data_depths}</td>
                      <td>{subscriptions.starter.historical_data_depths}</td>
                      <td>{subscriptions.small.historical_data_depths}</td>
                      <td>{subscriptions.corp.historical_data_depths}</td>
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
                      <td>-</td>
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
                      <td>-</td>
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
                      <td>-</td>
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
                      <td>-</td>
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
                      <td>-</td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </td>
                    </tr>
                    <tr>
                      <td>Weather API data update</td>
                      <td>{subscriptions.free.weather_api_update}</td>
                      <td>{subscriptions.starter.weather_api_update}</td>
                      <td>{subscriptions.small.weather_api_update}</td>
                      <td>{subscriptions.corp.weather_api_update}</td>
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
                      <td>{subscriptions.free.license_maps}</td>
                      <td>{subscriptions.starter.license_maps}</td>
                      <td>{subscriptions.small.license_maps}</td>
                      <td>{subscriptions.corp.license_maps}</td>
                    </tr>

                    <tr>
                      <td>License for data and database</td>
                      <td>{subscriptions.free.license_data}</td>
                      <td>{subscriptions.starter.license_data}</td>
                      <td>{subscriptions.small.license_data}</td>
                      <td>{subscriptions.corp.license_data}</td>
                    </tr>

                    <tr>
                      <td>Support</td>
                      <td>{subscriptions.free.support}</td>
                      <td>{subscriptions.starter.support}</td>
                      <td>{subscriptions.small.support}</td>
                      <td>{subscriptions.corp.support}</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col id="coverage">
            <h1>Where you can get satellite imagery data right now</h1>
          </Col>
        </Row>

        <Row>
          <Col className="mb-0" md="12" mt="20">
            <Card>
              {/* <CardHeader> */}
              {/* <h3>Where you can get satellite imagery data right now</h3> */}
              {/* </CardHeader> */}
              <CardBody>
                <Row>
                  <Col>
                    <p>
                      This map shows areas in purple for which satellite imagery
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
                      <a href={supportEmailMailTo} target="_blank">
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
