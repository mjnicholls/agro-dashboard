import axios from 'axios'

import { startSatelliteImagesSearchDate } from '../config'
import {
  polygonCreate,
  polygonDelete,
  polygonSatelliteImagesList,
} from './index'

export const createPolygonApi = async (data) =>
  /** Create polygon */
  axios.post(polygonCreate, data)

export const editPolygonApi = async (data) =>
  /** Edit polygon's name */
  axios.put(polygonDelete + data.id, data)

export const deletePolygonApi = (polygonId) =>
  /** Delete polygon */
  axios.delete(polygonDelete + polygonId)

export const getSatelliteImagesList = (polygonId, cancelToken) => {
  /** Get a list of satellite images for a polygon */
  const url = `${polygonSatelliteImagesList}?polyid=${polygonId}&start=${startSatelliteImagesSearchDate}&end=${
    Math.floor(new Date().getTime() - 60000) / 1000
  }`
  return axios.get(url, {
    cancelToken: cancelToken.token,
  })
}

export const getImageStats = (url, cancelToken) =>
  /** Get vegetation index statistics for a polygon */
  axios.get(url, {
    cancelToken: cancelToken.token,
  })
