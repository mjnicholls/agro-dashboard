import React, {useEffect, useState} from 'react';

import {getOneCallData} from '../services/api/weatherApi';

import CurrentWeather from './current/CurrentWeather';
import CurrentSoil from './current/CurrentSoil';
import HourlyForecast from './charts/HourlyForecast';
import DailyForecast from './charts/DailyForecast';
import HistoryWeather from './charts/HistoryWeather';
import WeatherAlerts from './current/WeatherAlerts'

import {
  Row,
  Col,
} from "reactstrap";



const WeatherPage = ({polygon}) => {

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getOneCallData(polygon.center[1], polygon.center[0])
      .then(res => { setData(res); })
      .catch((err) => {
        if (typeof err === "object") {
          err = err.message || "Something went wrong";
        }
        setError(err);
      })
      .finally(() => {setIsLoading(false)})
  }, [polygon])

  return (
   <>
     <Row>
       <Col sm="4">
         <CurrentWeather
           current={data.current}
           minutely={data.minutely}
           isLoading={isLoading}
           error={error} />
       </Col>
       <Col sm="4">
         <CurrentSoil
           polyId={polygon.id}
         />
       </Col>
       <Col sm="4">
         <WeatherAlerts
           alerts={data.alerts}
           isLoading={isLoading}
           error={error}
         />
       </Col>

     </Row>
    <Row>
      <Col>
        <HourlyForecast
          data={data.hourly}
          offset={data.timezone_offset}
          isLoading={isLoading}
          error={error}
        />
      </Col>
    </Row>
     <Row>
       <Col>
         <DailyForecast
           data={data.daily}
           offset={data.timezone_offset}
           isLoading={isLoading}
           error={error}
         />
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