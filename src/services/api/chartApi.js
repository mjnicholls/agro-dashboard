import {
  historyAccumulatedPrecipitation,
  historyAccumulatedTemperature,
  historyNDVI,
  historySoil,
  historyWeather
} from "./index";
import {axiosInstance} from "../base";

const parseResponse = (response) => {
  if (response) {
    if (response.length) {
      return response;
    } else {
      throw new Error("No data for selected period");
    }
  } else {
    throw new Error("Failed to fetch data"); // TODO shoud not happen, check cancelled
  }
}

const parseError = (error) => {
  if (typeof error === "object") {
    error = error.message || "Something went wrong";
  }
  throw new Error(error);
}

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
    .then(response => {
      return response.data
    })
    .catch(err => {
      throw new Error(err)})
}

// const getAccumulatedTemperature = (polygonId, start, end) => {
//   /** Get accumulated temperature data by polygon */
//   let url = `${historyAccumulatedTemperature}?polyid=${polygonId}&start=${Math.round(start/1000)}&end=${Math.round(end/1000)}`
//   return axiosInstance.get(url)
//     .then(response => response.data)
//     .catch(err => {
//       throw new Error(err)})
// }
//
// const getAccumulatedPrecipitation = (polygonId, start, end) => {
//   /** Get accumulated temperature data by polygon */
//   let url = `${historyAccumulatedPrecipitation}?polyid=${polygonId}&start=${Math.round(start/1000)}&end=${Math.round(end/1000)}`
//   return axiosInstance.get(url)
//     .then(response => response.data)
//     .catch(err => {
//       throw new Error(err)})
// }

export const getAccumulatedData = async (polygonId, start, end) => {
  /** Get accumulated data */
  let tempUrl = `${historyAccumulatedTemperature}?polyid=${polygonId}&start=${Math.round(start/1000)}&end=${Math.round(end/1000)}`
  let tempResponse = await axiosInstance.get(tempUrl);
  let rainUrl = `${historyAccumulatedPrecipitation}?polyid=${polygonId}&start=${Math.round(start/1000)}&end=${Math.round(end/1000)}`
  let rainResponse = await axiosInstance.get(rainUrl);

  let tempData = [];
  let rainData = [];
  if (tempResponse && tempResponse.data) {
    tempData = tempResponse.data
  } else {
    throw new Error("Error fetching temperature data")
  }
  if (rainResponse && rainResponse.data) {
    rainData = rainResponse.data
  } else {
    throw new Error("Error fetching rainfall data")
  }
  let res = [];
  if (tempData.length && rainData.length) {
    if (tempData.length !== rainData.length) {
      if (tempData.length > rainData.length) {
        tempData = tempData.slice(0, rainData.length)
      } else {
        rainData = rainData.slice(0, tempData.length)
      }
    }
    for (let i=0; i<rainData.length; i++) {
      res.push({
        ...rainData[i],
        temp: (tempData[i].temp - (273.15 * tempData[i].count)) // TODO Celcius
      })
    }
  }
  return res
}

export const getHistoryWeatherData = (polygonId, start, end) => {
  /** Get soil chart data by polygon  */
  let url = `${historyWeather}?polyid=${polygonId}&start=${Math.round(start/1000)}&end=${Math.round(end/1000)}`
  return axiosInstance.get(url)
    .then(response => {
      return response.data
      // parseResponse(response.data)
    })
    .catch(err => {
      throw new Error(err)
      // parseError(err)
    })
}
