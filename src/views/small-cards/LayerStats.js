import React, { useEffect, useState } from 'react'

import axios from 'axios/index'
import { useSelector } from 'react-redux'
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap'

import { getImageStats } from '../../services/api/polygonApi'
import { toDate } from '../../utils/dateTime'
import ChartContainer from '../charts/ui/ChartContainer'
import SatelliteLayerDropdown from './ui/SatelliteLayers'

const selectActivePoly = (state) => state.state.polygon

const ImageStats = ({ satelliteImage, satelliteLayer, setSatelliteLayer }) => {
  const [stats, setStats] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const activePolygon = useSelector(selectActivePoly)

  useEffect(() => {
    const cancelToken = axios.CancelToken.source()
    if (satelliteImage && activePolygon) {
      setIsLoading(true)
      setError(null)
      if (['truecolor', 'falsecolor'].includes(satelliteLayer)) {
        setIsLoading(false)
        setStats(
          "Please select NDVI, EVI, EVI2, NRI, DSWI, or NDWI layer to see vegetation indices' statistics",
        )
      } else {
        getImageStats(satelliteImage.stats[satelliteLayer], cancelToken)
          .then((res) => {
            setStats(res)
          })
          .catch((error) => {
            if (typeof error === 'object') {
              error = error.message || 'Something went wrong'
            }
            setStats(null)
            setError(error)
          })
          .finally(() => {
            setIsLoading(false)
          })
      }
    } else {
      setStats(null)
      setError(null)
    }

    return () => {
      cancelToken.cancel()
    }
  }, [satelliteImage, satelliteLayer, activePolygon])

  return (
    <Card className="small-card mb-5">
      <CardHeader>
        <Row>
          <Col>
            <SatelliteLayerDropdown
              satelliteImage={satelliteImage}
              satelliteLayer={satelliteLayer}
              setSatelliteLayer={setSatelliteLayer}
            />
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="py-2">
        <ChartContainer isLoading={isLoading} error={error}>
          <Row>
            <Col>
              {stats ? (
                typeof stats === 'string' ? (
                  <p className="my-3">{stats}</p>
                ) : (
                  <Table>
                    <thead>
                      <tr>
                        <th>
                          {satelliteImage ? toDate(satelliteImage.dt) : ''}
                        </th>
                        <th>{satelliteLayer.label}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>max</td>
                        <td>{stats.max.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td>mean</td>
                        <td>{stats.mean.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td>median</td>
                        <td>{stats.median.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td>min</td>
                        <td>{stats.min.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td>deviation</td>
                        <td>{stats.std.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td>num</td>
                        <td>{stats.num}</td>
                      </tr>
                    </tbody>
                  </Table>
                )
              ) : null}
            </Col>
          </Row>
        </ChartContainer>
      </CardBody>
    </Card>
  )
}

export default ImageStats
