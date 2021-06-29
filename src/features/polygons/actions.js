import {axiosInstance} from "../../services/base";
import {polygonsEndpoint} from "./endpoints"

export const POLYGONS_LOADED = 'POLYGONS_LOADED';

export const POLYGONS_REQUEST = 'POLYGONS_REQUEST'
export const POLYGONS_SUCCESS = 'POLYGONS_SUCCESS'
export const POLYGONS_FAILURE = 'POLYGONS_FAILURE'

const requestPolygons = () => {
  return {
    type: POLYGONS_REQUEST,
    isFetching: true,
  }
}

const receivePolygons = (data) => {
  return {
    type: POLYGONS_SUCCESS,
    isFetching: false,
    polygons: data
  }
}

const polygonsError = (message) => {
  return {
    type: POLYGONS_FAILURE,
    isFetching: false,
    message
  }
}


export function fetchPolygons() {

  return dispatch => {
    dispatch(requestPolygons())
    axiosInstance.get(polygonsEndpoint)
      .then(response => {
        dispatch(receivePolygons(response.data))
      })
      .catch(err => {
        console.log("err ", err)
        let message = "Something went wrong"
          if (err.response && err.response.data && err.response.data.message) {
            message = err.response.data.message;
          }
          dispatch(polygonsError(message))
      })
  }

}
