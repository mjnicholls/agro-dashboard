import {axiosInstance} from "../../services/base";
import {createPolygonApi, deletePolygonApi, editPolygonApi} from "../../services/api/polygonApi"
import {polygonsEndpoint} from "./endpoints"
import {notifySuccess, notifyError} from "../notifications/actions";

export const POLYGONS_LOADED = 'POLYGONS_LOADED';

export const POLYGONS_REQUEST = 'POLYGONS_REQUEST';
export const POLYGONS_SUCCESS = 'POLYGONS_SUCCESS';
export const POLYGONS_FAILURE = 'POLYGONS_FAILURE';
export const POLYGON_ADDED = 'POLYGON_ADDED';
export const POLYGON_UPDATED = 'POLYGON_UPDATED';
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

export const polygonUpdated = payload => {
  return {
    type: POLYGON_UPDATED,
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
    createPolygonApi(data)
      .then(response => {
        let newPolygon = response.data;
        dispatch(polygonAdded(newPolygon))
        dispatch(notifySuccess(
          `New polygon was successfully created. Name: ${newPolygon.name}. Area: ${newPolygon.area.toFixed(2)} ha`
        ))
      })
      .catch(error => {
        dispatch(notifyError(error.message))
      })
  }
}

export function editPolygon(data) {
  return async function deletePolygonThunk(dispatch, getState) {
    editPolygonApi(data)
      .then(response => {
        dispatch(polygonUpdated(response.data));
        dispatch(notifySuccess('Polygon has been renamed successfully'));
      })
      .catch(error => {
        dispatch(notifyError("Error updating polygon: " + error.message))
      })
  }
}


export function deletePolygon(polygonId) {
  return async function deletePolygonThunk(dispatch, getState) {
    deletePolygonApi(polygonId)
      .then(() => {
        dispatch(polygonDeleted(polygonId));
        dispatch(notifySuccess('Polygon has been deleted successfully'));
      })
      .catch(error => {
        dispatch(notifyError("Error deleting polygon: " + error.message))
      })
  }
}
