import {
  apiKeys
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
