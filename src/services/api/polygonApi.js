import { axiosInstance } from '../base'
import {
  polygonCreate,
  polygonDelete,
  polygonSatelliteImagesList,
} from './index'
import { startSatelliteImagesSearchDate } from '../../config'

export const createPolygonApi = async (polygonData) =>
  axiosInstance.post(polygonCreate, polygonData)

export const editPolygonApi = async (polygonData) => {
  const url = polygonDelete + polygonData.id
  return axiosInstance.put(url, polygonData)
}

export const deletePolygonApi = (polygonId) => {
  const url = polygonDelete + polygonId
  return axiosInstance.delete(url)
}

export const getSatelliteImagesList = (polygonId, cancelToken) => {
  const url = `${polygonSatelliteImagesList}?polyid=${polygonId}&start=${startSatelliteImagesSearchDate}&end=${
    Math.floor(new Date().getTime() - 60000) / 1000
  }`
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

export const getImageStats = (url, cancelToken) => {
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
