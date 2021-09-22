import {
  apiKeys,
  apiKeyUpdate,
  apiKeyDelete,
  apiKeyCreate
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

// create API Key method 

export const createApiKey = async (name) => {
  let appid_name = name.appid_name;
  return axiosInstance.post(apiKeyCreate, {}, {params: {appid_name}})
    .then(response => response)
    .catch(error => {
      throw new Error(error)
    })
}

// update API Key method

export const updateAPIKey = (params) => {
  return axiosInstance.put(apiKeyUpdate, params)
    .then(response => response)
    .catch(error => {
      throw new Error(error)
    })
}

// delete API Key method

export const deleteAPIKey = (apiKey) => {
  return axiosInstance.delete(apiKeyDelete, {params: apiKey})
    .then(response => response)
    .catch(error => {
      throw new Error(error)
    })
}


