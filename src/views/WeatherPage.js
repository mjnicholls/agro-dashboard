import React from 'react';

import {CombinedHourlyDailyChart, DailyForecast, HourlyForecast, HistoryWeather} from './charts'

import {
  Row,
  Col,
} from "reactstrap";


const WeatherPage = ({polygon}) => {

  return (
   <>
     {/*<Row>*/}
       {/*<Col sm="4">*/}
         {/*<CurrentWeather*/}
           {/*current={data.current}*/}
           {/*minutely={data.minutely}*/}
           {/*isLoading={isLoading}*/}
           {/*error={error} />*/}
       {/*</Col>*/}
       {/*<Col sm="4">*/}
         {/*<CurrentSoil*/}
           {/*polyId={polygon.id}*/}
         {/*/>*/}
       {/*</Col>*/}
       {/*<Col sm="4">*/}
         {/*<WeatherAlerts*/}
           {/*alerts={data.alerts}*/}
           {/*isLoading={isLoading}*/}
           {/*error={error}*/}
         {/*/>*/}
       {/*</Col>*/}

     {/*</Row>*/}
    <Row>
      <Col>
        {/*<HourlyForecast />*/}
        <CombinedHourlyDailyChart />
      </Col>
    </Row>
     {/*<Row>*/}
       {/*<Col>*/}
         {/*<DailyForecast />*/}
       {/*</Col>*/}
     {/*</Row>*/}
    <Row>
      <Col>
        <HistoryWeather polygonId={polygon.id}/>
      </Col>
    </Row>
   </>
  )
}

export default WeatherPage;