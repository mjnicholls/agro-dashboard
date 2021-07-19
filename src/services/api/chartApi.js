import {
  historyAccumulatedPrecipitation,
  historyAccumulatedTemperature,
  historyNDVI,
  historySoil
} from "./index";
import {axiosInstance} from "../base";

export const getNDVIData = (polygonId, start, end) => {
  /** Get history NDVI chart data by polygon  */


  let url = `${historyNDVI}?polyid=${polygonId}&start=${Math.round(start/1000)}&end=${Math.round(end/1000)}`
  return axiosInstance.get(url)
    .then(response => response.data)
    .catch(err => {
      throw new Error(err.message)
    })
}

export const getSoilData = (polygonId, start, end) => {
  /** Get soil chart data by polygon  */
  let url = `${historySoil}?polyid=${polygonId}&start=${Math.round(start/1000)}&end=${Math.round(end/1000)}`
  return axiosInstance.get(url)
    .then(response => response.data)
    .catch(err => {
      throw new Error(err)})
}

export const getAccumulatedTemperature = (polygonId, start, end) => {
  /** Get accumulated temperature data by polygon */
  let url = `${historyAccumulatedTemperature}?polyid=${polygonId}&start=${Math.round(start/1000)}&end=${Math.round(end/1000)}`
  return axiosInstance.get(url)
    .then(response => response.data)
    .catch(err => {
      throw new Error(err)})
}

export const getAccumulatedPrecipitation = (polygonId, start, end) => {
  /** Get accumulated temperature data by polygon */
  let url = `${historyAccumulatedPrecipitation}?polyid=${polygonId}&start=${Math.round(start/1000)}&end=${Math.round(end/1000)}`
  return axiosInstance.get(url)
    .then(response => response.data)
    .catch(err => {
      throw new Error(err)})
}