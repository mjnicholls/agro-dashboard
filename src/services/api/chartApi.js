import { axiosInstance } from '../base'
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
  return axiosInstance
    .get(url)
    .then((response) => response.data)
    .catch((err) => {
      throw new Error(err)
    })
}

export const getHistorySoilData = (polygonId, start, end, cancelToken) => {
  /** Get soil chart data by polygon  */
  const url = `${historySoil}?polyid=${polygonId}&start=${Math.ceil(
    start / 1000,
  )}&end=${Math.floor(end / 1000)}`
  const config = {
    cancelToken: cancelToken.token,
  }
  return axiosInstance
    .get(url, config)
    .then((response) => response.data)
    .catch((err) => {
      throw new Error(err)
    })
}

const getAccumulatedTemperature = (polygonId, start, end, threshold) => {
  /** Get accumulated temperature data by polygon */
  const url = `${historyAccumulatedTemperature}?polyid=${polygonId}&start=${start}&end=${end}&threshold=${threshold}`
  return axiosInstance
    .get(url)
    .then((response) => {
      if (response.data) {
        if (response.data.length) {
          return response.data
        }
        throw new Error('No data for selected period')
      } else {
        throw new Error('Something went wrong')
      }
    })
    .catch((err) => {
      throw new Error(err)
    })
}

const getAccumulatedPrecipitation = (polygonId, start, end) => {
  /** Get accumulated temperature data by polygon */
  const url = `${historyAccumulatedPrecipitation}?polyid=${polygonId}&start=${start}&end=${end}`
  return axiosInstance
    .get(url)
    .then((response) => {
      if (response.data) {
        if (response.data.length) {
          return response.data
        }
        throw new Error('No data for selected period')
      } else {
        throw new Error('Something went wrong')
      }
    })
    .catch((err) => {
      throw new Error(err)
    })
}

export const getAccumulatedData = async (polygonId, start, end, threshold) => {
  /** Get accumulated data */
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
  /** Get soil chart data by polygon  */
  const config = {
    cancelToken: cancelToken.token,
  }
  const url = `${historyWeather}?polyid=${polygonId}&start=${Math.ceil(
    start / 1000,
  )}&end=${Math.floor(end / 1000)}`
  return axiosInstance
    .get(url, config)
    .then((response) => response.data)
    .catch((err) => {
      throw new Error(err)
    })
}
