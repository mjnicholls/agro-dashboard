import React from 'react';
import HourlyForecast from './weather/HourlyForecast'


const WeatherPage = ({polygon}) => {

  return (
   <>
     <HourlyForecast polygon={polygon}/>
   </>
  )
}

export default WeatherPage;