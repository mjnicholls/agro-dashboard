import axios from 'axios'

import {
  historyAccumulatedPrecipitation,
  historyAccumulatedTemperature,
  historyNDVI,
  historySoil,
  historyWeather,
} from './index'

export const getHistoryNDVIData = (polygonId, start, end) => {
  /** Get history NDVI chart data by polygon  */
  const url = `${historyNDVI}?polyid=${polygonId}&start=${Math.ceil(
    start / 1000,
  )}&end=${Math.floor(end / 1000)}`
  return axios.get(url)
}

export const getHistorySoilData = (polygonId, start, end, cancelToken) => {
  /** Get soil chart data by polygon  */
  const url = `${historySoil}?polyid=${polygonId}&start=${Math.ceil(
    start / 1000,
  )}&end=${Math.floor(end / 1000)}`
  const config = {
    cancelToken: cancelToken.token,
  }
  return axios.get(url, config)
}

const getAccumulatedTemperature = (polygonId, start, end, threshold) => {
  /** Get accumulated temperature data by polygon */
  const url = `${historyAccumulatedTemperature}?polyid=${polygonId}&start=${start}&end=${end}&threshold=${threshold}`
  return axios.get(url)
}

const getAccumulatedPrecipitation = (polygonId, start, end) => {
  /** Get accumulated precipitation data by polygon */
  const url = `${historyAccumulatedPrecipitation}?polyid=${polygonId}&start=${start}&end=${end}`
  return axios.get(url)
}

export const getAccumulatedData = async (polygonId, start, end, threshold) => {
  /** Get accumulated data,
   * Two requests: one to accumulated temperature and one to accumulated precipitation */
  let [tempData, rainData] = await Promise.all([
    getAccumulatedTemperature(
      polygonId,
      Math.ceil(start / 1000),
      Math.floor(end / 1000),
      threshold,
    ),
    getAccumulatedPrecipitation(
      polygonId,
      Math.ceil(start / 1000),
      Math.floor(end / 1000),
    ),
  ])

  if (tempData.length !== rainData.length) {
    if (tempData.length > rainData.length) {
      tempData = tempData.slice(0, rainData.length)
    } else {
      rainData = rainData.slice(0, tempData.length)
    }
  }
  return [tempData, rainData]
}

export const getHistoryWeatherData = (polygonId, start, end, cancelToken) => {
  /** Get historical weather chart data by polygon  */
  const config = {
    cancelToken: cancelToken.token,
  }
  const url = `${historyWeather}?polyid=${polygonId}&start=${Math.ceil(
    start / 1000,
  )}&end=${Math.floor(end / 1000)}`
  return axios.get(url, config)
}
