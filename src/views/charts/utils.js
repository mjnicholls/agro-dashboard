import {capitalize, convertSpeed, convertTemp} from "../../utils/utils";

const formatTemp = (el, isMetric) => convertTemp(el, isMetric) + '°';
const formatDesc = el => capitalize(el.weather[0].description);
const formatWindSpeed = (el, isMetric) => convertSpeed(el.wind_speed, isMetric) + (isMetric ? 'm/s' : 'mph')
const formatPressure = el => el.pressure + "hPa";;
const formatHumidity = el => el.humidity + "%";
const formatClouds = el => el.clouds + "%";
const formatUvi = el =>  Math.round(el.uvi);

export {
  formatTemp, formatDesc, formatWindSpeed, formatPressure, formatHumidity, formatClouds, formatUvi
}