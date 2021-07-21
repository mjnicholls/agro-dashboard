import React, {useEffect, useState} from 'react';

import {getOneCallData} from '../../services/api/weatherApi'
import {chartOptions} from "../charts/base";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

const HourlyForecast = ({polygon}) => {

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    if (polygon) {
      getOneCallData(polygon.center[0], polygon.center[1])
        .then(res => {
          if (res.length) {
            setData(res)
            console.log(res)
          } else {
            setError("Failed to fetch data")
          }
        })
        .catch((err) => {
          if (typeof err === "object") {
            err = err.message || "Something went wrong";
          }
          setError(err);
        })
        .finally(() => {setIsLoading(false)})
    }
  }, [polygon])

  return (
    <Card className="card-chart">
      <CardHeader>
        <Row>
          <Col className="text-left" xs="6" sm="8">
            <h5 className="card-category">Forecast</h5>
            <CardTitle tag="h2">Hourly</CardTitle>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
          {isLoading ?
            <div className="chart-placeholder">Fetching data...</div> :
            error ?
              <div className="chart-placeholder">{error}</div>  :
              <div className="chart-area">Hourly data
                {/*<Line*/}
                  {/*data={chartData}*/}
                  {/*options={chartOptions} />*/}
              </div>
          }
      </CardBody>
    </Card>
  )
}

export default HourlyForecast;