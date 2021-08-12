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
//     throw new Error("Failed to fetch data"); // TODO shoud not happen, check cancelled
//   }
// }

const parseError = (error) => {
  if (typeof error === "object") {
    error = error.message || "Something went wrong";
  }
  throw new Error(error);
}

export const getHistoryNDVIData = (polygonId, start, end) => {
  /** Get history NDVI chart data by polygon  */
  let url = `${historyNDVI}?polyid=${polygonId}&start=${Math.round(start/1000)}&end=${Math.round(end/1000)}`
  return axiosInstance.get(url)
    .then(response => response.data)
    .catch(err => {
      throw new Error(err)
    })
}

export const getHistorySoilData = (polygonId, start, end) => {
  /** Get soil chart data by polygon  */
  let url = `${historySoil}?polyid=${polygonId}&start=${Math.round(start/1000)}&end=${Math.round(end/1000)}`
  return axiosInstance.get(url)
    .then(response => {
      return response.data
    })
    .catch(err => {
      throw new Error(err)})
}

const getAccumulatedTemperature = (polygonId, start, end) => {
  /** Get accumulated temperature data by polygon */
  let url = `${historyAccumulatedTemperature}?polyid=${polygonId}&start=${start}&end=${end}`
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

const getAccumulatedPrecipitation = (polygonId, start, end) => {
  /** Get accumulated temperature data by polygon */
  let url = `${historyAccumulatedPrecipitation}?polyid=${polygonId}&start=${start}&end=${end}`
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

export const getAccumulatedData = async (polygonId, start, end) => {
  /** Get accumulated data */
  start = Math.round(start/1000);
  end = Math.round(end/1000);

  let [tempData, rainData] = await Promise.all([
    getAccumulatedTemperature(polygonId, start, end),
    getAccumulatedPrecipitation(polygonId, start, end)
  ])

  let res = [];
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
      temp: (tempData[i].temp - (273.15 * tempData[i].count))
    })
  }
  return res
}

export const getHistoryWeatherData = (polygonId, start, end) => {
  /** Get soil chart data by polygon  */
  let url = `${historyWeather}?polyid=${polygonId}&start=${Math.round(start/1000)}&end=${Math.round(end/1000)}`
  return axiosInstance.get(url)
    .then(response => {
      return response.data
    })
    .catch(err => {
      throw new Error(err)
    })
}
