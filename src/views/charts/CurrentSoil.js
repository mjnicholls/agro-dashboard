import React, {useEffect, useState} from 'react';
import {capitalize, kelvinToCelsius} from "../../utils/utils";

import {
  Card,
  CardFooter,
  CardHeader,
  CardBody,
  CardTitle,
  Col,
  Row,
  Table,
} from "reactstrap";

import {getCurrentSoil} from "../../services/api/weatherApi";
import OWMWeatherIcon from "../owm-icons";

const CurrentSoil = ({ polyId }) => {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentSoil(polyId)
      .then(res => {
        setData(res)
      })
      .catch((err) => {
        if (typeof err === "object") {
          err = err.message || "Something went wrong";
        }
        setError(err);
      })
      .finally(() => {setIsLoading(false)})
  }, [])


  return (
    <Card>
      <CardHeader>
        <Row>
          <Col className="text-left" sm="7">
            <h5 className="card-category">Current</h5>
            <CardTitle tag="h2">Soil data</CardTitle>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        {isLoading ?
          <div className="chart-placeholder">Fetching data...</div> :
          error ?
            <div className="chart-placeholder">{error}</div>  :
              <Table>
                <tbody>
                  <tr>
                    <td>Soil temperature at the surface</td>
                    <td>{kelvinToCelsius(data.t0)}°</td>
                  </tr>
                  <tr>
                    <td>Soil temperature at the depth of 10cm</td>
                    <td>{kelvinToCelsius(data.t10)}°</td>
                  </tr>
                  <tr>
                    <td>Soil moisture</td>
                    <td>{data.moisture}</td>
                  </tr>
                </tbody>
              </Table>
           }
      </CardBody>
      <CardFooter>

      </CardFooter>
    </Card>
  )
}

export default CurrentSoil;