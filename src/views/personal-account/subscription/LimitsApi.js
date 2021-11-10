import React, { useState } from 'react'

import { faCheckCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { Card, CardBody, CardHeader, CardTitle, Table } from 'reactstrap'

import { vegetationIndices } from '../../../config'
import ExceedingPriceInfo from '../../components/ExceedingPriceInfo'
import { api, subscriptions } from '../utils'

const authSelector = (state) => state.auth

const LimitsApi = () => {
  const auth = useSelector(authSelector)
  const { tariff } = auth.user
  const data = subscriptions[tariff]
  const [alert, setAlert] = useState(null)

  const priceInfoAlert = () => {
    setAlert(<ExceedingPriceInfo close={() => setAlert(null)} />)
  }

  return (
    <>
      {alert}
      <Card>
        <CardHeader>
          <CardTitle>
            <h2>API Limits</h2>
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Table>
            <thead>
              <tr>
                <th>Satellite data: imagery and statistics by polygon</th>
                <th>Limits</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>API calls per minute</td>
                <td>{data.api_calls_per_min}</td>
              </tr>
              <tr>
                <td>
                  Satellite imagery
                  <br />({vegetationIndices})&nbsp;
                </td>
                <td>{data.satellite_imagery_data}</td>
              </tr>
              <tr>
                <td>Satellite imagery data update</td>
                <td>
                  <p>{data.satellite_imagery_service}</p>
                </td>
              </tr>
              <tr>
                <td>Current soil temperature and moisture data update</td>
                <td>
                  <p>{data.soil_update}</p>
                </td>
              </tr>
              <tr>
                <td>Number of created polygons per month</td>
                <td>
                  <p>{data.polygons_per_month}</p>
                </td>
              </tr>

              <tr>
                <td>
                  Price for exceeding area limit{' '}
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    onClick={priceInfoAlert}
                  />
                </td>
                <td>
                  <p>{data.price_exceeded_area}</p>
                </td>
              </tr>
            </tbody>
            <thead>
              <br />
              <tr>
                <th colSpan={2}>Current and forecast weather data:</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p>API calls per day</p>
                </td>
                <td>
                  <p>{data.api_calls_per_day}</p>
                </td>
              </tr>
              {data.api
                .filter((key) => api[key].isCurrent)
                .map((key) => (
                  <tr key={`current_${key}`}>
                    <td>
                      <a href={api[key].link} target="_blank">
                        {api[key].name}{' '}
                      </a>
                    </td>
                    <td>
                      <FontAwesomeIcon icon={faCheckCircle} />
                    </td>{' '}
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
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>API calls per day</td>
                    <td>
                      <p>{data.api_calls_historical}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>Historical weather data depth</td>
                    <td>
                      <p>{data.historical_data_depths}</p>
                    </td>
                  </tr>
                  {data.api
                    .filter((key) => !api[key].isCurrent)
                    .map((key) => (
                      <tr key={`history_ + ${key}`}>
                        <td>
                          <a href={api[key].link} target="_blank">
                            {api[key].name}
                          </a>
                        </td>
                        <td>
                          <FontAwesomeIcon icon={faCheckCircle} />
                        </td>{' '}
                      </tr>
                    ))}
                </tbody>
              </>
            )}
            <thead>
              <br />
              <tr>
                <th colSpan={2}>Service:</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Weather API data update</td>
                <td>
                  <p>{data.weather_api_update}</p>
                </td>
              </tr>
              <tr>
                <td>SSL</td>
                <td>
                  <FontAwesomeIcon icon={faCheckCircle} value={data.ssl} />
                </td>
              </tr>
              <tr>
                <td>License for maps, APIs, and other products</td>
                <td>{data.license_maps}</td>
              </tr>
              <tr>
                <td>License for data and database</td>
                <td>{data.license_data}</td>
              </tr>
              <tr>
                <td>Support</td>
                <td>
                  <p>{data.support}</p>
                </td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </>
  )
}

export default LimitsApi
