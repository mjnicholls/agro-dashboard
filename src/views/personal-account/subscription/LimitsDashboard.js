import React from 'react'

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  UncontrolledTooltip,
} from 'reactstrap'

import { vegetationIndices } from '../../../config'
import {
  setActivePoly,
  setSatelliteMode,
} from '../../../features/state/actions'
import { toDate } from '../../../utils/dateTime'
import { numberWithCommas } from '../../../utils/utils'
import { subscriptions } from '../utils'

const authSelector = (state) => state.auth
const polygonsSelector = (state) => state.polygons

const LimitsDashboard = (props) => {
  const auth = useSelector(authSelector)
  const { tariff } = auth.user
  const polygons = useSelector(polygonsSelector)
  const dispatch = useDispatch()

  const data = subscriptions[tariff]

  const depthInYears = (year) =>
    year >= 0 ? `${year} year${year === 1 ? '' : 's'}` : 'Unlimited'

  const onSatelliteClick = () => {
    props.history.push('/dashboard/polygons')
    dispatch(setActivePoly(polygons[0]))
    dispatch(setSatelliteMode(true))
  }

  const onWeatherClick = () => {
    props.history.push('/dashboard/polygons') // TODO
    dispatch(setActivePoly(polygons[0]))
    dispatch(setSatelliteMode(false))
  }

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
              <th>
                {polygons.length ? (
                  <Button
                    type="button"
                    className="btn-link btn-primary remove-button-style text-uppercase"
                    tabIndex={0}
                    onClick={onSatelliteClick}
                  >
                    Satellite data
                  </Button>
                ) : (
                  <div>
                    <Link id="satellite" to="/dashboard/polygons">
                      Satellite data
                    </Link>
                    <UncontrolledTooltip
                      delay={0}
                      target="satellite"
                      placement="top"
                    >
                      Satellite section will be available in the left-hand menu
                      with the first polygon
                    </UncontrolledTooltip>
                  </div>
                )}
              </th>
              <th>Availability</th>
              {tariff === 'corp' && <th>Start date</th>}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Satellite imagery archive</td>
              <td>
                <FontAwesomeIcon icon={faCheckCircle} />
              </td>
              {tariff === 'corp' && <td>n/a</td>}
            </tr>
            <tr>
              <td>
                Indices statistics by field
                <br /> ({vegetationIndices}){' '}
              </td>
              <td>
                <FontAwesomeIcon icon={faCheckCircle} />
              </td>
              {tariff === 'corp' && <td>n/a</td>}
            </tr>
            <tr>
              <td>Historical NDVI Chart</td>
              <td>{depthInYears(auth.limits.history.ndvi_history.depth)}</td>
              {tariff === 'corp' && (
                <td>{toDate(auth.limits.history.ndvi_history.start)}</td>
              )}
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>
                {polygons.length ? (
                  <Button
                    type="button"
                    className="btn-link btn-primary remove-button-style text-uppercase"
                    tabIndex={0}
                    onClick={onWeatherClick}
                  >
                    Weather data
                  </Button>
                ) : (
                  <div>
                    <Link id="weather" to="/dashboard/polygons">
                      Weather data
                    </Link>
                    <UncontrolledTooltip
                      delay={0}
                      target="weather"
                      placement="top"
                    >
                      Weather section will be available in the left-hand menu
                      with the first polygon
                    </UncontrolledTooltip>
                  </div>
                )}
              </th>
              <th>Availability</th>
              {tariff === 'corp' && <th>Start date</th>}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Minute forecast</td>
              <td>1 hour</td>
              {tariff === 'corp' && <td>n/a</td>}
            </tr>
            <tr>
              <td>Hourly forecast</td>
              <td>2 days</td>
              {tariff === 'corp' && <td>n/a</td>}
            </tr>
            <tr>
              <td>Daily forecast</td>
              <td>8 days</td>
              {tariff === 'corp' && <td>n/a</td>}
            </tr>
            <tr>
              <td>Historical Soil Data Chart</td>
              <td>{depthInYears(auth.limits.history.soil_history.depth)}</td>
              {tariff === 'corp' && (
                <td>{toDate(auth.limits.history.soil_history.start)}</td>
              )}
            </tr>
            <tr>
              <td>Accumulated Parameters</td>
              <td>
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
              <td>{depthInYears(auth.limits.history.weather_history.depth)}</td>
              {tariff === 'corp' && (
                <td>{toDate(auth.limits.history.weather_history.start)}</td>
              )}
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>
                <Link to="/dashboard/map">
                  <b>Crop map</b>
                </Link>
              </th>
              <th>AVAILABILITY</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Crop Recognition Map</td>
              <td colSpan={tariff === 'corp' ? 2 : 1}>
                {data.crop_recognition}
              </td>
            </tr>
          </tbody>
          <thead>
            <br />
            <tr>
              <th colSpan={tariff === 'corp' ? 2 : 1}>Polygon creation</th>
              <th>Area</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={tariff === 'corp' ? 2 : 1}>Minimum polygon area</td>
              <td>{auth.limits.polygon_area.min_polygon_area} ha</td>
            </tr>
            <tr>
              <td colSpan={tariff === 'corp' ? 2 : 1}>Maximum polygon area</td>
              <td>
                {numberWithCommas(auth.limits.polygon_area.max_polygon_area)} ha
              </td>
            </tr>
          </tbody>
        </Table>
      </CardBody>
    </Card>
  )
}

export default LimitsDashboard
