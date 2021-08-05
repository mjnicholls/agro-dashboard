import React from 'react';

import {CombinedHourlyDailyChart, DailyForecast, HourlyForecast, HistoryWeather} from './charts'

import {
  Row,
  Col,
} from "reactstrap";


const WeatherPage = ({polyId}) => {

  return (
   <>
    <Row>
      <Col>
        <CombinedHourlyDailyChart polyId={polyId}/>
      </Col>
    </Row>
   </>
  )
}

export default WeatherPage;