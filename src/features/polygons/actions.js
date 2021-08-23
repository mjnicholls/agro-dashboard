import {axiosInstance} from "../../services/base";
import {createPolygonApi, deletePolygonApi, editPolygonApi} from "../../services/api/polygonApi"
import {notifySuccess, notifyError} from "../notifications/actions";
import {polygonShapeSize} from "../../config";
import {polygonsEndpoint} from "../../services/api";

export const POLYGONS_FETCH = 'polygons/fetch';
export const POLYGONS_FETCH_SUCCESS = 'polygons/fetch_success';
export const POLYGONS_FETCH_FAILURE = 'polygons/fetch_failure';
export const POLYGON_ADDED = 'polygons/add';
export const POLYGON_UPDATED = 'polygons/update';
export const POLYGON_DELETED = 'polygons/delete';


const polygonsFetched = () => {
  return {
    type: POLYGONS_FETCH,
    isFetching: true,
  }
}

export const receivePolygons = (data) => {
  return {
    type: POLYGONS_FETCH_SUCCESS,
    polygons: data
  }
}

const polygonsError = (message) => {
  return {
    type: POLYGONS_FETCH_FAILURE,
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
  /** Calculate polygon's bounding box and shape in pixels **/
  let bbox = calculateBbox(polygon)
  polygon.pixels = calculatePixels(polygon.geo_json.geometry.coordinates[0], bbox)
  polygon.bbox = bbox;
  return polygon
}

export const fetchPolygons = () => dispatch => {
  dispatch(polygonsFetched())
  axiosInstance.get(polygonsEndpoint)
    .then(response => {
      let polygons = response.data;
      polygons.reverse();
      for (let i=0; i<polygons.length; i++) {
        polygons[i] = enrichPolygon(polygons[i]);
      }
      dispatch(receivePolygons(polygons));
    })
    .catch(err => {
      let message = "Something went wrong"
        if (err.response && err.response.data && err.response.data.message) {
          message = err.response.data.message;
        }
        dispatch(polygonsError(message))
    })
}


export const addPolygon = (data) => {
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

export const editPolygon = (data) => {
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

export const deletePolygon = (polygonId) => {
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
