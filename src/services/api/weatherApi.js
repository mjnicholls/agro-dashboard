import { axiosInstance } from '../base'
import { currentSoil, weatherOneCall } from './index'

export const getOneCallData = (lat, lon) => {
  const url = `${weatherOneCall}?lat=${lat}&lon=${lon}`
  return axiosInstance
    .get(url)
    .then((response) => response.data)
    .catch((err) => {
      throw new Error(err.message)
    })
}

export const getCurrentSoil = (polyid) => {
  const url = `${currentSoil}?polyid=${polyid}`
  return axiosInstance
    .get(url)
    .then((response) => response.data)
    .catch((err) => {
      throw new Error(err.message)
    })
}
