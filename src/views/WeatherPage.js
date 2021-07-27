import React, {useEffect, useState} from 'react';

import {getOneCallData} from '../services/api/weatherApi';

import CurrentWeather from './charts/CurrentWeather';
import CurrentSoil from './charts/CurrentSoil';
import HourlyForecast from './charts/HourlyForecast';
import DailyForecast from './charts/DailyForecast';
import HistoryWeather from './charts/HistoryWeather';

import {
  Row,
  Col,
} from "reactstrap";
import {timeInHours, formatDateShort} from "../utils/dateTime";
import {capitalize, getPreticipationInfo, kelvinToCelsius} from "../utils/utils";


const WeatherPage = ({polygon}) => {

  const [hourly, setHourly] = useState([]);
  const [daily, setDaily] = useState([]);
  const [current, setCurrent] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getOneCallData(polygon.center[1], polygon.center[0])
      .then(res => {
        const offset = res.timezone_offset;
        // hourly data
        let hourlyData = [];
        for (let i = 0; i < res.hourly.length; i++) {
          let item = res.hourly[i];
          let prec = 0 + (item.rain && item.rain['1h']) ? item.rain['1h'] : 0 + (item.snow && item.snow['1h']) ? item.snow['1h'] : 0;
          hourlyData.push({
            dt: timeInHours(item.dt, offset),
            rain: prec.toFixed(2),
            temp: kelvinToCelsius(item.temp),
            windSpeed: item.wind_speed.toFixed(1) + 'm/s',
            pressure: item.pressure + "hPa",
            humidity: item.humidity + "%",
            dewPoint: kelvinToCelsius(item.dew_point) + "°" ,
            uvi: Math.round(item.uvi),
            clouds: item.clouds + '%',
            description: capitalize(item.weather[0].description).split(' ')
          });
        }
        setHourly(hourlyData);
        // Daily: temp min, temp max, temp morn, temp day, temp eve, temp night, pressure,
        // humidity, dew_point, uvi, clouds, precipitation amount, wind speed, weather description (main/description)
        let dailyData = [];
        for (let i=0; i<res.daily.length; i++) {
          let item = res.daily[i];
          let prec = 0 + item.rain || 0 + item.snow || 0;
          dailyData.push({
            dt: formatDateShort(item.dt, offset),
            rain: prec.toFixed(2),
            tempMin: kelvinToCelsius(item.temp.min),
            tempMax: kelvinToCelsius(item.temp.max),
            tempMorn: kelvinToCelsius(item.temp.morn),
            tempDay: kelvinToCelsius(item.temp.day),
            tempEve: kelvinToCelsius(item.temp.eve),
            tempNight: kelvinToCelsius(item.temp.night),
            windSpeed: item.wind_speed.toFixed(1) + 'm/s',
            pressure: item.pressure + "hPa",
            humidity: item.humidity + "%",
            dewPoint: kelvinToCelsius(item.dew_point) + "°" ,
            uvi: Math.round(item.uvi),
            clouds: item.clouds + '%',
            description: capitalize(item.weather[0].description).split(' ')
          });
        }
        setDaily(dailyData);
        // TODO prettier way?
        let current = res.current;
        if (res.minutely) {
          current.precipitation = getPreticipationInfo(res.minutely); // TODO if not?
        }
        current.alerts = res.alerts;
        console.log("current ", current)
        setCurrent(current);
      })
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
       <Col sm="6">
         <CurrentWeather
           polyId={polygon.id}
           current={current}
           isLoading={isLoading}
           error={error} />
       </Col>
       <Col sm="6">
         <CurrentSoil
           polyId={polygon.id}
         />
       </Col>
     </Row>
    <Row>
      <Col>
        <HourlyForecast data={hourly} isLoading={isLoading} error={error}/>
      </Col>
    </Row>
     <Row>
       <Col>
         <DailyForecast data={daily} isLoading={isLoading} error={error}/>
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