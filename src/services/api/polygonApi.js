import {axiosInstance} from "../base";
import {
  loginURL,
  polygonCreate,
  polygonHistoryNDVI,
  polygonHistorySoil,
  polygonSatelliteImagesList
} from './index';
import {startSatelliteImagesSearchDate} from '../../config'


export const createPolygon = (polygonData) => {
  axiosInstance.post(polygonCreate, polygonData)
    .then(response => {
      console.log("polygon creation response", response)
      // TODO if response is positive, pull again the polygons <- this should be done in redux actually
    })
    .catch(err => {
      console.log("polygon creation err ", err)
    })
}


export const getNDVIData = (polygonId, start, end) => {
  /** Get history NDVI chart data by polygon  */
  let url = `${polygonHistoryNDVI}?polyid=${polygonId}&start=${start}&end=${end}`
  return axiosInstance.get(url)
    .then(response => {
      if (response) {
        return response.data
      } else {
        console.log('no response polygons ', response)
      }
    })
    .catch(err => {
      throw new Error(err.message)
    })
}

export const getSoilData = (polygonId, start, end) => {
  /** Get soil chart data by polygon  */
  let url = `${polygonHistorySoil}?polyid=${polygonId}&start=${start}&end=${end}`
  return axiosInstance.get(url)
    .then(response => {
      if (response) {
        return response.data
      } else {
        console.log('no response soil ', response)
      }
    })
    .catch(err => {
      throw new Error(err)})
}

export const getSatelliteImagesList = (polygonId) => {
  let url = `${polygonSatelliteImagesList}?polyid=${polygonId}&start=${startSatelliteImagesSearchDate}&end=${Math.round(new Date().getTime() / 1000)}`
  return axiosInstance.get(url)
    .then(response => response.data)
    .catch(err => {
      throw new Error(err)})
}