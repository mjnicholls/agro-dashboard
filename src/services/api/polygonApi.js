import {axiosInstance} from "../base";
import {
  polygonCreate,
  polygonDelete,
  polygonSatelliteImagesList
} from './index';
import {startSatelliteImagesSearchDate} from '../../config'


export const createPolygonApi = async (polygonData) => {
  return axiosInstance.post(polygonCreate, polygonData)
    .then(response => response)
    .catch(error => {
      throw new Error(error)
    })
}

export const editPolygonApi = async (polygonData) => {
  let url = polygonDelete + polygonData.id;
  return axiosInstance.put(url, polygonData)
    .then(response => response)
    .catch(error => {
      throw new Error(error)
    })
}

export const deletePolygonApi = (polygonId) => {
  let url = polygonDelete + polygonId;
  return axiosInstance.delete(url)
    .then(response => response)
    .catch(error => {
      throw new Error(error)
    })
}



export const getSatelliteImagesList = (polygonId) => {
  let url = `${polygonSatelliteImagesList}?polyid=${polygonId}&start=${startSatelliteImagesSearchDate}&end=${Math.round(new Date().getTime() / 1000)}`
  return axiosInstance.get(url)
    .then(response => response.data)
    .catch(err => {
      throw new Error(err)})
}