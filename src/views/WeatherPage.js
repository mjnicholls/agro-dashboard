import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {getOneCallData} from '../services/api/weatherApi';

import CurrentWeather from './charts/CurrentWeather';
import CurrentSoil from './charts/CurrentSoil';
import HourlyForecast from './charts/HourlyForecast';
import DailyForecast from './charts/DailyForecast';
import HistoryWeather from './charts/HistoryWeather';
import WeatherAlerts from './charts/WeatherAlerts'

import {
  Row,
  Col,
} from "reactstrap";
import {timeInHours, formatDateShort} from "../utils/dateTime";
import {capitalize, getPreticipationInfo, convertTemp} from "../utils/utils";

const selectUnits = state => state.units.isMetric;


const WeatherPage = ({polygon}) => {

  const isMetric = useSelector(selectUnits);
  const [data, setData] = useState([]);
  const [hourly, setHourly] = useState([]);
  const [daily, setDaily] = useState([]);
  const [current, setCurrent] = useState({});
  const [alerts, setAlerts] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getOneCallData(polygon.center[1], polygon.center[0])
      .then(res => {
        setData(res);
        const offset = res.timezone_offset;
        // hourly data
        let hourlyData = [];
        for (let i = 0; i < res.hourly.length; i++) {
          let item = res.hourly[i];
          let prec = 0 + (item.rain && item.rain['1h']) ? item.rain['1h'] : 0 + (item.snow && item.snow['1h']) ? item.snow['1h'] : 0;
          hourlyData.push({
            dt: timeInHours(item.dt, offset),
            rain: prec.toFixed(2),
            temp: item.temp,
            windSpeed: item.wind_speed,
            pressure: item.pressure + "hPa",
            humidity: item.humidity + "%",
            dewPoint: item.dew_point,
            uvi: Math.round(item.uvi),
            clouds: item.clouds + '%',
            description: capitalize(item.weather[0].description).split(' ')
          });
        }
        setHourly(hourlyData);

        let dailyData = [];
        for (let i=0; i<res.daily.length; i++) {
          let item = res.daily[i];
          let prec = 0 + item.rain || 0 + item.snow || 0;
          dailyData.push({
            dt: formatDateShort(item.dt, offset),
            rain: prec.toFixed(2),
            tempMin: item.temp.min,
            tempMax: item.temp.max,
            tempMorn: item.temp.morn,
            tempDay: item.temp.day,
            tempEve: item.temp.eve,
            tempNight: item.temp.night,
            windSpeed: item.wind_speed,
            pressure: item.pressure + "hPa",
            humidity: item.humidity + "%",
            dewPoint: item.dew_point,
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
        setCurrent(current);
        setAlerts(res.alerts);

        // let alerts = [
        //   {
        //   "sender_name": "Latvian Environment, Geology and Meteorology Centre",
        //   "event": "Orange Forest-Fire Warning",
        //   "start": 1627452000,
        //   "end": 1627768740,
        //   "description": "In the time period till 31.07.2021 in some places in western regions and east part of Latvia high risk of forest fires is expected, but in north part of Vidzeme very high risk of forest fires is expected. BE AWARE that there is a risk of forest and bush fires. Be cautious near forest and bush areas. Do not start any open fires, do not discard cigarettes! In a case of a fire accident immediately must be reported to the fire and rescue service",
        //   "tags": [
        //   "Fire warning"
        //   ]
        //   },
        //   {
        //   "sender_name": "Latvian Environment, Geology and Meteorology Centre",
        //   "event": "Yellow Forest-Fire Warning",
        //   "start": 1627452000,
        //   "end": 1627768740,
        //   "description": "In the time period till 31.07.2021 in some places in western regions and east part of Latvia high risk of forest fires is expected, but in north part of Vidzeme very high risk of forest fires is expected. BE AWARE that there is a risk of forest and bush fires. Be cautious near forest and bush areas. Do not start any open fires, do not discard cigarettes! In a case of a fire accident immediately must be reported to the fire and rescue service",
        //   "tags": [
        //   "Fire warning"
        //   ]
        //   }
        // ]
        // setAlerts(alerts);
      })
      .catch((err) => {
        if (typeof err === "object") {
          err = err.message || "Something went wrong";
        }
        setError(err);
      })
      .finally(() => {setIsLoading(false)})
  }, [polygon])

  useEffect(() => {
    if (data.length) {
      let newHourlyData = [...hourly];
      newHourlyData.temp = data.hourly.map(item => convertTemp(item.temp, isMetric));
      newHourlyData.dewPoint = data.hourly.map(item => convertTemp(item.dew_point, isMetric))
      setHourly(newHourlyData);
    }

  }, [isMetric])

  return (
   <>
     <Row>
       <Col sm="4">
         <CurrentWeather
           polyId={polygon.id}
           current={current}
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
           alerts={alerts}
           isLoading={isLoading}
           error={error}
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