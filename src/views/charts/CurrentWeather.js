import React, {useEffect, useState} from 'react';
import {capitalize, kelvinToCelsius} from "../../utils/utils";

import {
  Card,
  CardFooter,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

import OWMWeatherIcon from "../owm-icons";

const CurrentWeather = ({ polyId, isLoading, error, current }) => {

  return (
    <Card>
      <CardHeader>
        <Row>
          <Col className="text-left" sm="7">
            <h5 className="card-category">Current</h5>
            <CardTitle tag="h2">Weather</CardTitle>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        {isLoading ?
          <div className="chart-placeholder">Fetching data...</div> :
          error ?
            <div className="chart-placeholder">{error}</div>  :
            <div>
              <OWMWeatherIcon src={current.weather[0].icon} />
              <div>{kelvinToCelsius(current.temp)}°</div>
              <div>{capitalize(current.weather[0].description)}</div>
              {current.precipitation && <div>{current.precipitation}</div>}
              {current.alerts && current.alerts.length && <div>{capitalize(current.alerts[0].event)}</div>}
            </div> }
      </CardBody>
      <CardFooter>

      </CardFooter>
    </Card>
  )
}

export default CurrentWeather;