import axiosClient from './axiosClient'
import { currentSoil, weatherOneCall } from './index'

export const getOneCallData = (lat, lon) => {
  /** Weather data from one call API
   * for current weather (including alerts), hourly and daily forecast charts */
  const url = `${weatherOneCall}?lat=${lat}&lon=${lon}`
  return axiosClient.get(url)
}

export const getCurrentSoil = (polyid) => {
  const url = `${currentSoil}?polyid=${polyid}`
  return axiosClient.get(url)
}
