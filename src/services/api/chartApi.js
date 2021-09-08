import {
  historyAccumulatedPrecipitation,
  historyAccumulatedTemperature,
  historyNDVI,
  historySoil,
  historyWeather
} from "./index";
import {axiosInstance} from "../base";

// const parseResponse = (response) => {
//   if (response) {
//     if (response.length) {
//       return response;
//     } else {
//       throw new Error("No data for selected period");
//     }
//   } else {
//     throw new Error("Failed to fetch data");
//   }
// }


export const getHistoryNDVIData = (polygonId, start, end) => {
  /** Get history NDVI chart data by polygon  */
  let url = `${historyNDVI}?polyid=${polygonId}&start=${Math.ceil(start/1000)}&end=${Math.floor(end/1000)}`
  return axiosInstance.get(url)
    .then(response => response.data)
    .catch(err => {
      throw new Error(err)
    })
}

export const getHistorySoilData = (polygonId, start, end, cancelToken) => {
  /** Get soil chart data by polygon  */
  let url = `${historySoil}?polyid=${polygonId}&start=${Math.ceil(start/1000)}&end=${Math.floor(end/1000)}`
  let config = {
    cancelToken: cancelToken.token,
  };
  return axiosInstance.get(url, config)
    .then(response => {
      return response.data
    })
    .catch(err => {
      throw new Error(err)})
}

const getAccumulatedTemperature = (polygonId, start, end, threshold) => {
  /** Get accumulated temperature data by polygon */
  let url = `${historyAccumulatedTemperature}?polyid=${polygonId}&start=${start}&end=${end}&threshold=${threshold}`
  return axiosInstance.get(url)
    .then(response => {
      if (response.data) {
        if (response.data.length) {
          return response.data
        } else {
          throw new Error("No data for selected period")
        }
      } else {
        throw new Error("Something went wrong");
      }
    })
    .catch(err => {
      throw new Error(err)})
}

const getAccumulatedPrecipitation = (polygonId, start, end, threshold) => {
  /** Get accumulated temperature data by polygon */
  let url = `${historyAccumulatedPrecipitation}?polyid=${polygonId}&start=${start}&end=${end}&threshold=${threshold}`
  return axiosInstance.get(url)
    .then(response => {
      if (response.data) {
        if (response.data.length) {
          return response.data
        } else {
          throw new Error("No data for selected period")
        }
      } else {
        throw new Error("Something went wrong");
      }
    })
    .catch(err => {
      throw new Error(err)})
}

export const getAccumulatedData = async (polygonId, start, end, threshold) => {
  /** Get accumulated data */
  start = Math.ceil(start/1000);
  end = Math.floor(end/1000);

  let [tempData, rainData] = await Promise.all([
    getAccumulatedTemperature(polygonId, start, end, threshold),
    getAccumulatedPrecipitation(polygonId, start, end, threshold)
  ])

  // let res = [];
  if (tempData.length !== rainData.length) {
    if (tempData.length > rainData.length) {
      tempData = tempData.slice(0, rainData.length)
    } else {
      rainData = rainData.slice(0, tempData.length)
    }
  }
  // for (let i=0; i<rainData.length; i++) {
  //   res.push({
  //     ...rainData[i],
  //     temp: tempData[i].temp
  //     // temp: (tempData[i].temp - (273.15 * tempData[i].count))
  //   })
  // }
  return [tempData, rainData]
}

export const getHistoryWeatherData = (polygonId, start, end, cancelToken) => {
  /** Get soil chart data by polygon  */
  let config = {
    cancelToken: cancelToken.token,
  };
  let url = `${historyWeather}?polyid=${polygonId}&start=${Math.ceil(start/1000)}&end=${Math.floor(end/1000)}`
  return axiosInstance.get(url, config)
    .then(response => {
      return response.data
    })
    .catch(err => {
      throw new Error(err)
    })
}
