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
      console.log("err soil", err)
      throw new Error(err)})
}

const getAccumulatedTemperature = (polygonId, start, end) => {
  /** Get accumulated temperature data by polygon */
  let url = `${historyAccumulatedTemperature}?polyid=${polygonId}&start=${Math.round(start/1000)}&end=${Math.round(end/1000)}`
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
  let url = `${historyAccumulatedPrecipitation}?polyid=${polygonId}&start=${Math.round(start/1000)}&end=${Math.round(end/1000)}`
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

  let tempUrl = `${historyAccumulatedTemperature}?polyid=${polygonId}&start=${start}&end=${end}`
  let rainUrl = `${historyAccumulatedPrecipitation}?polyid=${polygonId}&start=${start}&end=${end}`

   // TODO doesn't catch server error
  const [tempResponse, rainResponse] = await Promise.all([
    axiosInstance.get(tempUrl),
    axiosInstance.get(rainUrl)
  ]).catch(err => {
    console.log("**", err, err.response, err.request, err.message)
     err = err.message || "Something went wrong";
    throw new Error(err);
  });


  let tempData = [];
  let rainData = [];
  if (tempResponse && tempResponse.data) {
    if (tempResponse.data.length) {
      tempData = tempResponse.data
    } else {
      throw new Error("No data for selected period")
    }
  } else {
    throw new Error("Error fetching temperature data")
  }
  if (rainResponse && rainResponse.data) {
    if (rainResponse.data.length) {
      rainData = rainResponse.data
    } else {
      throw new Error("No data for selected period")
    }
  } else {
    throw new Error("Error fetching temperature data")
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

// getAccumulatedTemperature(polygonId, start, end)
  //   .then(tempData => {
  //     getAccumulatedPrecipitation(polygonId, start, end)
  //       .then(rainData => {
  //           let data = [];
  //           if (tempData.length && rainData.length) {
  //             if (tempData.length !== rainData.length) {
  //               if (tempData.length > rainData.length) {
  //                 tempData = tempData.slice(0, rainData.length)
  //               } else {
  //                 rainData = rainData.slice(0, tempData.length)
  //               }
  //             }
  //             for (let i=0; i<rainData.length; i++) {
  //               data.push({
  //                 ...rainData[i],
  //                 temp: (tempData[i].temp - (273.15 * tempData[i].count))
  //               })
  //             }
  //           }
  //           return data
  //       })
  //       .catch(err => {
  //         throw new Error(err)})
  //   })
  //   .catch(err => {
  //     throw new Error(err)})

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
