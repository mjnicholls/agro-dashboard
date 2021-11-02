import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  UncontrolledTooltip,
} from 'reactstrap'

import { toDate } from '../../../utils/dateTime'
import { numberWithCommas } from '../../../utils/utils'
import { api, subscriptions } from '../utils'
import { vegetationIndices } from '../../../config'

const authSelector = (state) => state.auth

const LimitsDashboard = () => {
  const auth = useSelector(authSelector)
  const { tariff } = auth.user
  const data = subscriptions[tariff]

  const depthInYears = (year) =>
    year >= 0 ? `${year} year${year === 1 ? '' : 's'}` : 'Unlimited'

  const getColSpan = () => (tariff === 'corp' ? 3 : 2)

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2>Dashboard Limits</h2>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Table>
          <thead>
            <tr>
              <th colSpan={getColSpan()}>
                <Link to="/dashboard/polygons">
                  <b>Satellite data</b>
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Satellite imagery archive</td>
              <td colSpan={tariff === 'corp' ? 2 : 1}>
                <FontAwesomeIcon icon={faCheckCircle} />
              </td>
            </tr>
            <tr>
              <td>
                Indices statistics by field
                <br /> ({vegetationIndices}){' '}
              </td>
              <td colSpan={tariff === 'corp' ? 2 : 1}>
                <FontAwesomeIcon icon={faCheckCircle} />
              </td>
            </tr>
            <tr>
              <td>Historical NDVI Chart</td>
              <td colSpan={tariff === 'corp' ? 2 : 1}>
                {depthInYears(auth.limits.history.ndvi_history.depth)}
              </td>
              {tariff === 'corp' && (
                <td>{toDate(auth.limits.history.ndvi_history.start)}</td>
              )}
            </tr>
          </tbody>
          <thead>
            <tr>
              <th colSpan={getColSpan()}>
                <Link to="/dashboard/polygons">
                  <b>Weather data</b>
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Minute forecast</td>
              <td colSpan={tariff === 'corp' ? 2 : 1}>1 hour</td>
            </tr>
            <tr>
              <td>Hourly forecast</td>
              <td colSpan={tariff === 'corp' ? 2 : 1}>2 days</td>
            </tr>
            <tr>
              <td>Daily forecast</td>
              <td colSpan={tariff === 'corp' ? 2 : 1}>8 days</td>
            </tr>
            <tr>
              <td>Historical Soil Data Chart</td>
              <td colSpan={tariff === 'corp' ? 2 : 1}>
                {depthInYears(auth.limits.history.soil_history.depth)}
              </td>
              {tariff === 'corp' && (
                <td>{toDate(auth.limits.history.soil_history.start)}</td>
              )}
            </tr>
            <tr>
              <td>Accumulated Parameters</td>
              <td colSpan={tariff === 'corp' ? 2 : 1}>
                {depthInYears(
                  auth.limits.history.weather_history_accumulated_temperature
                    .depth,
                )}
              </td>
              {tariff === 'corp' && (
                <td>
                  {toDate(
                    auth.limits.history.weather_history_accumulated_temperature
                      .start,
                  )}
                </td>
              )}
            </tr>
            <tr>
              <td>Historical Weather Data</td>
              <td colSpan={tariff === 'corp' ? 2 : 1}>
                {depthInYears(auth.limits.history.weather_history.depth)}
              </td>
              {tariff === 'corp' && (
                <td>{toDate(auth.limits.history.weather_history.start)}</td>
              )}
            </tr>
          </tbody>
          <thead>
            <tr>
              <th colSpan={getColSpan()}>
                <Link to="/dashboard/map">
                  <b>Crop map</b>
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Crop Recognition Map</td>
              <td colSpan={tariff === 'corp' ? 2 : 1}>
                {data.crop_recognition}
              </td>
            </tr>
            <tr>
              <td>
                <a href={api.crop_recognition.link}>
                  {api.crop_recognition.name}
                </a>{' '}
                <i className="tim-icons icon-alert-circle-exc" id="tool15" />
                <UncontrolledTooltip delay={0} target="tool15">
                  Available only in the dashboard.
                </UncontrolledTooltip>
              </td>
              {tariff === 'free' ? (
                <td>2017, 2018 - available</td>
              ) : (
                <td>2017, 2018, 2019 - available 2020, 2021 - on request</td>
              )}
              <td></td>
            </tr>
          </tbody>
          <thead>
            <br />
            <tr>
              <th colSpan={tariff === 'corp' ? 4 : 3}>Polygons</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Min polygon area</td>
              <td colSpan={tariff === 'corp' ? 2 : 1}>
                {auth.limits.polygon_area.min_polygon_area} ha
              </td>
              <td></td>
            </tr>
            <tr>
              <td>Max polygon area</td>
              <td colSpan={tariff === 'corp' ? 2 : 1}>
                {numberWithCommas(auth.limits.polygon_area.max_polygon_area)} ha
              </td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </CardBody>
    </Card>
  )
}

export default LimitsDashboard
