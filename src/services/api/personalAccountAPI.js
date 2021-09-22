import {
  apiKeys,
  apiKeyUpdate,
  apiKeyDelete
} from "./index";
import {axiosInstance} from "../base";


export const getAPIKeys = () => {
  /** Get history NDVI chart data by polygon  */
  return axiosInstance.get(apiKeys)
    .then(response => response.data)
    .catch(err => {
      throw new Error(err)
    })
}

export const updateAPIKey = (params) => {
  return axiosInstance.put(apiKeyUpdate, params)
    .then(response => response)
    .catch(error => {
      throw new Error(error)
    })
}

export const deleteAPIKey = (apiKey) => {
  return axiosInstance.delete(apiKeyDelete, {params: apiKey})
    .then(response => response)
    .catch(error => {
      throw new Error(error)
    })
}


