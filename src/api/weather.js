import axios from 'axios'

import { currentSoil, weatherOneCall } from './index'

export const getOneCallData = (lat, lon) => {
  /** Weather data from one call API
   * for current weather (including alerts), hourly and daily forecast charts */
  const url = `${weatherOneCall}?lat=${lat}&lon=${lon}`
  return axios.get(url)
}

export const getCurrentSoil = (polyid) => {
  /** Current soil data */
  const url = `${currentSoil}?polyid=${polyid}`
  return axios.get(url)
}
