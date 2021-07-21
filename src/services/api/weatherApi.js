import {
  weatherOneCall
} from "./index";
import {axiosInstance} from "../base";

export const getOneCallData = (lat, lon) => {
  let url = `${weatherOneCall}?lat=${lat}&lon=${lon}`;
  return axiosInstance.get(url)
    .then(response => response.data)
    .catch(err => {
      throw new Error(err.message)
    })

}