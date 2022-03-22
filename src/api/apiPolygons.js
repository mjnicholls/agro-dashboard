import { longTimeout, startSatelliteImagesSearchDate } from '../config'
import axiosClient from './axiosClient'
import { polygonURL, polygonsURL, polygonSatelliteImagesURL } from './index'

export const getPolygonsApi = () => axiosClient.get(polygonsURL, longTimeout)

export const createPolygonApi = (data) => axiosClient.post(polygonURL, data)

export const editPolygonNameApi = (data) =>
  axiosClient.put(`${polygonURL}/${data.id}`, data)

export const deletePolygonApi = (polygonId) =>
  axiosClient.delete(`${polygonURL}/${polygonId}`)

export const getSatelliteImagesList = (polygonId, cancelToken) => {
  const url = `${polygonSatelliteImagesURL}?polyid=${polygonId}&start=${startSatelliteImagesSearchDate}&end=${
    Math.floor(new Date().getTime() - 60000) / 1000 // TODO what is that -60 000? refactor
  }`
  return axiosClient.get(url, {
    cancelToken: cancelToken.token,
  })
}

export const getImageStats = (url, cancelToken) =>
  axiosClient.get(url, {
    cancelToken: cancelToken.token,
  })
