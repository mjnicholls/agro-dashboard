export const api = {
  one_call: {
    name: 'One Call API',
    link: 'https://openweathermap.org/api/one-call-api',
    isCurrent: true,
  },
  ndvi_history: {
    name: 'Historical NDVI by polygon',
    link: 'https://agromonitoring.com/api/history-ndvi',
    isCurrent: false,
  },
  weather_history: {
    name: 'Historical weather data',
    link: 'https://agromonitoring.com/api/history-weather',
    isCurrent: false,
  },
  weather_history_accumulated_precipitation: {
    name: 'Accumulated precipitation',
    link: '',
    isCurrent: false,
  },
  weather_history_accumulated_temperature: {
    name: 'Accumulated precipitation',
    link: '',
    isCurrent: false,
  },
  'Historical UV index': {
    name: 'Accumulated precipitation',
    link: '',
    isCurrent: false,
  },
  soil_history: {
    name: 'Historical soil data by polygon',
    link: 'https://agromonitoring.com/api/history-soil',
    isCurrent: false,
  },
  'Current weather data': {
    name: 'Current weather data',
    link: 'https://agromonitoring.com/api/current-weather',
    isCurrent: true,
  },
  '5 day/3 hour weather forecast': {
    name: '5 day/3 hour weather forecast',
    link: 'https://agromonitoring.com/api/forecast-weather',
    isCurrent: true,
  },
  'Current UV index': {
    name: 'Current UV index',
    link: '',
    isCurrent: true,
  },
  'Forecast UV index': {
    name: 'Forecast UV index',
    link: '',
    isCurrent: true,
  },
}

export const subscriptions = {
  free: {
    name: 'Free',
    polygons_total_area: '1,000ha',
    api_calls_per_min: '< 60',
    api: [
      'Current weather data',
      '5 day/3 hour weather forecast',
      'Current UV index',
    ],
  },
  starter: {
    name: 'Starter',
    polygons_total_area: '4,000ha',
    api_calls_per_min: '< 600',
    api: [
      'Current weather data',
      '5 day/3 hour weather forecast',
      'weather_history',
      'weather_history_accumulated_precipitation',
      'weather_history_accumulated_temperature',
      'Current UV index',
      'Forecast UV index',
      'Historical UV index',
    ],
  },
  small: {
    name: 'Small Kit',
    polygons_total_area: '20,000ha',
    api_calls_per_min: '< 3,000',
    api: [
      'Current weather data',
      '5 day/3 hour weather forecast',
      'weather_history',
      'weather_history_accumulated_precipitation',
      'weather_history_accumulated_temperature',
      'Current UV index',
      'Forecast UV index',
      'Historical UV index',
    ],
  },
  corp: {
    name: 'Corporate',
    polygons_total_area: 'Unlimited',
    api_calls_per_min: 'Unlimited',
    api: [
      'Current weather data',
      '5 day/3 hour weather forecast',
      'weather_history',
      'weather_history_accumulated_precipitation',
      'weather_history_accumulated_temperature',
      'Current UV index',
      'Forecast UV index',
      'Historical UV index',
    ],
  },
}
