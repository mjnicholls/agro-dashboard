import React from 'react';
import HourlyForecast from './charts/HourlyForecastCombined';
import HistoryWeather from './charts/HistoryWeather';

import {
  Row,
  Col,
} from "reactstrap";


const WeatherPage = ({polygon}) => {

  return (
   <>
    <Row>
      <Col>
        <HourlyForecast polygon={polygon}/>
      </Col>
    </Row>
     <Row>
      <Col>
        <HistoryWeather polygonId={polygon.id}/>
      </Col>
    </Row>
   </>
  )
}

export default WeatherPage;