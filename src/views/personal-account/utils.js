export const api = {
  one_call: {
    name: "One Call API",
    link: "https://openweathermap.org/api/one-call-api",
    isCurrent: true
  },
  ndvi_history: {
    name: 'Historical NDVI by polygon',
    link: 'https://agromonitoring.com/api/history-ndvi',
    isCurrent: false
  },
  weather_history: {
    name: 'Historical weather data',
    link: 'https://agromonitoring.com/api/history-weather',
    isCurrent: false
  },
  weather_history_accumulated_precipitation: {
    name: 'Accumulated precipitation',
    link: '',
    isCurrent: false
  },
  weather_history_accumulated_temperature: {
    name: 'Accumulated precipitation',
    link: '',
    isCurrent: false
  },
  'Historical UV index': {
    name: 'Accumulated precipitation',
    link: '',
    isCurrent: false
  },
  soil_history: {
    name: 'Historical soil data by polygon',
    link: 'https://agromonitoring.com/api/history-soil',
    isCurrent: false
  },
  'API calls per day' : {
    name: 'API calls per day',
    link: '',
    isCurrent: true
  },
  'Current weather data': {
    name: 'Current weather data',
    link: 'https://agromonitoring.com/api/current-weather',
    isCurrent: true
  },
  '5 day/3 hour weather forecast': {
    name: '5 day/3 hour weather forecast',
    link: 'https://agromonitoring.com/api/forecast-weather',
    isCurrent: true
  },
  'Current UV index': {
    name: 'Current UV index',
    link: '',
    isCurrent: true
  },

  'Forecast UV index': {
    name: 'Forecast UV index',
    link: '',
    isCurrent: true
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
   api_calls_historical: '—',
   historical_data_depths: '—',
   satelitte_imagery_service: 'Near real-time (operative) satellite data',
   current_soil: '2 times/day',
   weather_api_update: '< 2 hours',
   ssl: '',
   license_maps:  'CC BY-SA 4.0',
   license_data: 'ODbL',
   support: 'Helpdesk',
   api: ['Current weather data', '5 day/3 hour weather forecast', 'Current UV index'],
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