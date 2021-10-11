export const api = {
  one_call: {
    name: "One Call API",
    link: "https://openweathermap.org/api/one-call-api",
    isCurrent: true,
    tool_id: "tool1",
    tooltip: 'Make just one API call and get all your essential weather data for a specific location.',
  },
  ndvi_history: {
    name: 'Historical NDVI Chart',
    link: 'https://agromonitoring.com/api/history-ndvi',
    tooltip: 'Detailed historical data for analysis and comparison vegetation of one season to another.',
    isCurrent: false,
    tool_id: "tool2"
  },
  weather_history: {
    name: 'Historical Weather Data',
    link: 'https://agromonitoring.com/api/history-weather',
    isCurrent: false,
    tooltip: 'Historical weather data archive has a 1-hour step.',
    tool_id: "tool3"
  },
  weather_history_accumulated_precipitation: {
    name: 'Accumulated Precipitation',
    link: 'https://agromonitoring.com/api/accumulated-precipitation',
    isCurrent: false,
    tooltip: 'Call accumulated precipitation data by geo coordinates.',
    tool_id: "tool4",
  },
  weather_history_accumulated_temperature: {
    name: 'Accumulated Temperature',
    link: 'https://agromonitoring.com/api/accumulated-temperature',
    isCurrent: false,
    tooltip: 'Call accumulated temperature data by geo coordinates.',
    tool_id: "tool5"
  },

  'Historical UV index': {
    name: 'Historical UV index',
    link: '',
    isCurrent: false,
    tooltip: '',
    tool_id: "tool6",
  },
  soil_history: {
    name: 'Historical Soil Data Chart',
    link: 'https://agromonitoring.com/api/history-soil',
    isCurrent: false,
    tooltip: 'Soil data collection is two times a day with a 12-hour period.',
    tool_id: "tool7"
  },
  'API calls per day' : {
    name: 'API Calls Per Day',
    link: '',
    isCurrent: true,
    tooltip: '',
    tool_id: "tool8",
  },
  'Current weather data': {
    name: 'Current Weather Data',
    link: 'https://agromonitoring.com/api/current-weather',
    isCurrent: true,
    tooltip: 'Current weather data by geo coordinates.',
    tool_id: "tool9",
  },
  '5 day/3 hour weather forecast': {
    name: '5 day/3-hour Weather Forecast',
    link: 'https://agromonitoring.com/api/forecast-weather',
    isCurrent: true,
    tooltip: 'Forecast weather data by geo coordinates.',
    tool_id: "tool10",
  },
  'Current UV index': {
    name: 'Current UV Index',
    link: 'https://agromonitoring.com/api/current-uvi',
    isCurrent: true,
    tooltip: 'Current UVI data by polygon.',
    tool_id: "tool11",
  },

  'Forecast UV index': {
    name: 'Forecast UV Index',
    link: 'https://agromonitoring.com/api/forecast-uvi',
    isCurrent: true,
    tooltip: 'Forecast UVI data by polygon',
    tool_id: "tool12",
  },
}


export const subscriptions = {
 free: {
   name: "Free",
   polygons_total_area: "1,000ha",
   api_calls_per_min: '< 60',
   polygons_per_month: '< 10',
   price_exceeded_area: 'Unavailable',
   api_calls_per_day: '< 500',
   satelitte_imagery_service: 'Near real-time (operative) satellite data',
   current_soil: '2 times/day',
   weather_api_update: '< 2 hours',
   ssl: '',
   license_maps:  'CC BY-SA 4.0',
   license_data: 'ODbL',
   support: 'Helpdesk',
   api: ['Current weather data', '5 day/3-hour weather forecast', 'Current UV index'],
 },
 starter: {
   name: "Starter",
   polygons_total_area: "4,000ha",
   api_calls_per_min: '< 600',
   polygons_per_month: 'Unlimited',
   price_exceeded_area: '£0.02 per each 1 ha',
   api_calls_per_day: '< 1,000',
   api_calls_historical: '< 500',
   historical_data_depths: '1 Year',
   satelitte_imagery_service: 'Near real-time (operative) satellite data',
   current_soil: '2 times/day',
   weather_api_update: '< 1 hour',
   ssl: '',
   license_maps:  'CC BY-SA 4.0',
   license_data: 'ODbL',
   support: 'Helpdesk',
   api: ['Current weather data', '5 day/3 hour weather forecast', 'weather_history', 'weather_history_accumulated_precipitation', 'weather_history_accumulated_temperature', 'Current UV index', 'Forecast UV index', 'Historical UV index']
 },
 small: {
   name: "Small Kit",
   polygons_total_area: "20,000ha",
   api_calls_per_min: '< 3,000',
   polygons_per_month: 'Unlimited',
   price_exceeded_area: '£0.01 per each 1 ha',
   api_calls_per_day: '< 10,000',
   api_calls_historical: '< 5,000',
   historical_data_depths: '1 Year',
   satelitte_imagery_service: 'Near real-time (operative) satellite data',
   current_soil: '2 times/day',
   weather_api_update: '< 1 hour',
   ssl: '',
   license_maps:  'CC BY-SA 4.0',
   license_data: 'ODbL',
   support: 'Helpdesk',
   api: ['Current weather data', '5 day/3 hour weather forecast', 'weather_history', 'weather_history_accumulated_precipitation', 'weather_history_accumulated_temperature', 'Current UV index', 'Forecast UV index', 'Historical UV index']

 } ,
 corp: {
   name: "Corporate",
   polygons_total_area: 'Unlimited',
   api_calls_per_min: 'Unlimited',
   polygons_per_month: 'Unlimited',
   price_exceeded_area: 'Flexible discount system',
   api_calls_per_day: 'Unlimited',
   api_calls_historical: 'Unlimited',
   historical_data_depths: 'Total archive',
   satelitte_imagery_service: 'Near real-time (operative) satellite data',
   current_soil: '2 times/day',
   weather_api_update: '< 10 min',
   ssl: '',
   license_maps:  'CC BY-SA 4.0',
   license_data: 'ODbL',
   support: 'Direct 24x7',
   api: ['Current weather data', '5 day/3 hour weather forecast', 'weather_history', 'weather_history_accumulated_precipitation', 'weather_history_accumulated_temperature', 'Current UV index', 'Forecast UV index', 'Historical UV index']
 }
}