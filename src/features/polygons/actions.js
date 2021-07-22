import {axiosInstance} from "../../services/base";
import {createPolygonApi, deletePolygonApi, editPolygonApi} from "../../services/api/polygonApi"
import {polygonsEndpoint} from "./endpoints"
import {notifySuccess, notifyError} from "../notifications/actions";
import {polygonShapeSize} from "../../config";

export const POLYGONS_LOADED = 'POLYGONS_LOADED';

export const POLYGONS_REQUEST = 'POLYGONS_REQUEST';
export const POLYGONS_SUCCESS = 'POLYGONS_SUCCESS';
export const POLYGONS_FAILURE = 'POLYGONS_FAILURE';
export const POLYGON_ADDED = 'POLYGON_ADDED';
export const POLYGON_UPDATED = 'POLYGON_UPDATED';
export const POLYGON_DELETED = 'POLYGON_DELETED';
export const POLYGONS_BOUNDS = 'POLYGONS_BOUNDS';


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

const setPolygonBounds = payload => {
  return {
    type: POLYGONS_BOUNDS,
    bounds: payload,
  }
}

const calculateBbox = (polygon) => {
  let coordinates = polygon.geo_json.geometry.coordinates;
  let lats = []; let lngs = [];
  for (let i = 0; i < coordinates[0].length; i++)  {
      lats.push(coordinates[0][i][1]);
      lngs.push(coordinates[0][i][0]);
  }
  // calc the min and max lng and lat
  let minlat = Math.min.apply(null, lats);
  let maxlat = Math.max.apply(null, lats);
  let minlng = Math.min.apply(null, lngs);
  let maxlng = Math.max.apply(null, lngs);
  return [[minlng, minlat], [maxlng, maxlat]];
}

const calculatePixels = (coordinates, bbox) => {
  let diffX = bbox[1][0] - bbox[0][0];
  let diffY = bbox[1][1] - bbox[0][1];
  let mulX = polygonShapeSize / diffX;
  let mulY = polygonShapeSize / diffY;
  let mul = Math.min(mulX, mulY);

  let coordinatesCanvasPixels = [];
  coordinates.forEach((point) => {
    coordinatesCanvasPixels.push(
      {
        x: Math.round((point[0] - bbox[0][0]) * mul) + 1 + (polygonShapeSize - diffX * mul) / 2,
        y: polygonShapeSize - Math.round((point[1] - bbox[0][1]) * mul) + 1 - (polygonShapeSize - diffY * mul) / 2
      }
    );
  });
  return coordinatesCanvasPixels
}

const enrichPolygon = (polygon) => {
  /** Calculate bounding box and pixels shape **/
  let bbox = calculateBbox(polygon)
  polygon.pixels = calculatePixels(polygon.geo_json.geometry.coordinates[0], bbox)
  polygon.bbox = bbox;
  return polygon
}

// const getTotalBbox = (bboxes) => {
//   let minlng = Math.min.apply(null, bboxes.map(x =>x[0][0]));
//   let minlat = Math.min.apply(null, bboxes.map(x =>x[0][1]));
//
//   let maxlng = Math.max.apply(null, bboxes.map(x =>x[1][0]));
//   let maxlat = Math.max.apply(null, bboxes.map(x =>x[1][1]));
//   return [[minlng, minlat], [maxlng, maxlat]];
//
// }

export function fetchPolygons() {
  return dispatch => {
    dispatch(requestPolygons())
    axiosInstance.get(polygonsEndpoint)
      .then(response => {
        let polygons = response.data;
        // let bboxes = [];
        for (let i=0; i<polygons.length; i++) {
          polygons[i] = enrichPolygon(polygons[i]);
          // bboxes.push(polygons[i].bbox);
        }
        dispatch(receivePolygons(polygons));
        // let totalBbox = getTotalBbox(bboxes);
        // dispatch(setPolygonBounds(totalBbox));
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
        let newPolygon = enrichPolygon(response.data);
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
