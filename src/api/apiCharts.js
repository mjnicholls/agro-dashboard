import axiosClient from './axiosClient'
import {
  historyAccumulatedPrecipitation,
  historyAccumulatedTemperature,
  historyNDVI,
  historySoil,
  historyWeather,
} from './index'

export const getHistoryNDVIData = (polygonId, start, end) => {
  const url = `${historyNDVI}?polyid=${polygonId}&start=${Math.ceil(
    start / 1000,
  )}&end=${Math.floor(end / 1000)}`
  return axiosClient.get(url)
}

export const getHistorySoilData = (polygonId, start, end, cancelToken) => {
  const url = `${historySoil}?polyid=${polygonId}&start=${Math.ceil(
    start / 1000,
  )}&end=${Math.floor(end / 1000)}`
  const config = {
    cancelToken: cancelToken.token,
  }
  return axiosClient.get(url, config)
}

const getAccumulatedTemperature = (polygonId, start, end, threshold) => {
  const url = `${historyAccumulatedTemperature}?polyid=${polygonId}&start=${start}&end=${end}&threshold=${threshold}`
  return axiosClient.get(url)
}

const getAccumulatedPrecipitation = (polygonId, start, end) => {
  const url = `${historyAccumulatedPrecipitation}?polyid=${polygonId}&start=${start}&end=${end}`
  return axiosClient.get(url)
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
  const config = {
    cancelToken: cancelToken.token,
  }
  const url = `${historyWeather}?polyid=${polygonId}&start=${Math.ceil(
    start / 1000,
  )}&end=${Math.floor(end / 1000)}`
  return axiosClient.get(url, config)
}
