import {axiosInstance} from "../../services/base";
import {createPolygonApi, deletePolygonApi} from "../../services/api/polygonApi"
import {polygonsEndpoint} from "./endpoints"

export const POLYGONS_LOADED = 'POLYGONS_LOADED';

export const POLYGONS_REQUEST = 'POLYGONS_REQUEST';
export const POLYGONS_SUCCESS = 'POLYGONS_SUCCESS';
export const POLYGONS_FAILURE = 'POLYGONS_FAILURE';
export const POLYGON_ADDED = 'POLYGON_ADDED';
export const POLYGON_DELETED = 'POLYGON_DELETED';

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

export const polygonAdded = payload => {
  return {
    type: POLYGON_ADDED,
    payload: payload
  }
}

export const polygonDeleted = polygonId => {
  return {
    type: POLYGON_DELETED,
    payload: polygonId
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


export function addPolygon(data) {
  return async function addPolygonThunk(dispatch, getState) {
    try {
      // возвращаются данные
      let newPolygon = await createPolygonApi(data)
      console.log("newPolygon", newPolygon)
      dispatch(polygonAdded(newPolygon.data))
      // TODO notification successfully deleted polygon
    }
    catch (err) {
      console.log(err)
      // TODO notification error deleting polygon
    }
  }
}



export function deletePolygon(polygonId) {
  return async function deletePolygonThunk(dispatch, getState) {
    try {
      deletePolygonApi(polygonId)
      dispatch(polygonDeleted(polygonId))
      // TODO notification successfully deleted polygon
    }
    catch (err) {
      console.log(err)
      // TODO notification error deleting polygon
    }
  }
}
