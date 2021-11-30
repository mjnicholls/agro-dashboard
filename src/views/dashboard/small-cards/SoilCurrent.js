import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { Card, CardHeader, CardBody, CardTitle, Col, Row } from 'reactstrap'

import { getCurrentSoil } from '../../../api/apiWeather'
import { convertTemp } from '../../../utils/utils'
import ChartContainer from '../../charts/ui/ChartContainer'

const selectUnits = (state) => state.units.isMetric

const CurrentSoil = ({ polyId }) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const isMetric = useSelector(selectUnits)

  useEffect(() => {
    setIsLoading(true)
    setData(null)
    setError(null)
    getCurrentSoil(polyId)
      .then((res) => {
        setData(res)
      })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [polyId])

  return (
    <Card className="mb-5">
      <CardHeader>
        <Row>
          <Col className="text-left">
            <h5 className="card-category mb-0">Current</h5>
            <CardTitle tag="h2">Soil data</CardTitle>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="py-2 overflow-auto">
        <ChartContainer
          isLoading={isLoading}
          error={error}
          style={{ height: '100px' }}
        >
          {data ? (
            <div className="card-category">
              <Row>
                <Col xs="7">Temperature at the surface</Col>
                <Col xs="5">
                  <CardTitle tag="h3" className="text-right mb-2">
                    {convertTemp(data.t0, isMetric)}°
                  </CardTitle>
                </Col>
              </Row>
              <Row>
                <Col xs="7">Temperature at the depth of 10cm</Col>
                <Col xs="5">
                  <CardTitle tag="h3" className="text-right mb-2">
                    {convertTemp(data.t10, isMetric)}°
                  </CardTitle>
                </Col>
              </Row>
              <Row>
                <Col xs="7">Soil moisture</Col>
                <Col xs="5">
                  <CardTitle tag="h3" className="text-right mb-2">
                    {Math.round(data.moisture * 100)}%
                  </CardTitle>
                </Col>
              </Row>
            </div>
          ) : null}
        </ChartContainer>
        {/* <Table> */}
        {/* <tbody> */}
        {/* <tr> */}
        {/* <td>Temperature at the surface</td> */}
        {/* <td><CardTitle tag="h3" className="text-right">{convertTemp(data.t0, isMetric)}°</CardTitle></td> */}
        {/* </tr> */}
        {/* <tr> */}
        {/* <td>Temperature at the depth of 10cm</td> */}
        {/* <td><CardTitle tag="h3" className="text-right">{convertTemp(data.t10, isMetric)}°</CardTitle></td> */}
        {/* </tr> */}
        {/* <tr> */}
        {/* <td>Soil moisture</td> */}
        {/* <td><CardTitle tag="h3" className="text-right">{Math.round(data.moisture * 100)}%</CardTitle></td> */}
        {/* </tr> */}
        {/* </tbody> */}
        {/* </Table> */}
      </CardBody>
    </Card>
  )
}

export default CurrentSoil
