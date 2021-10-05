import { polygonShapeSize } from '../../config'
import { polygonsEndpoint } from '../../services/api'
import {
  createPolygonApi,
  deletePolygonApi,
  editPolygonApi,
} from '../../services/api/polygonApi'
import { axiosInstance } from '../../services/base'
import { notifySuccess, notifyError } from '../notifications/actions'

export const POLYGONS_FETCH = 'polygons/fetch'
export const POLYGONS_FETCH_SUCCESS = 'polygons/fetch_success'
export const POLYGONS_FETCH_FAILURE = 'polygons/fetch_failure'
export const POLYGON_ADDED = 'polygons/add'
export const POLYGON_UPDATED = 'polygons/update'
export const POLYGON_DELETED = 'polygons/delete'

const polygonsFetched = () => ({
  type: POLYGONS_FETCH,
  isFetching: true,
})

export const receivePolygons = (data) => ({
  type: POLYGONS_FETCH_SUCCESS,
  polygons: data,
})

const polygonsError = (message) => ({
  type: POLYGONS_FETCH_FAILURE,
  isFetching: false,
  message,
})

export const polygonAdded = (payload) => ({
  type: POLYGON_ADDED,
  payload,
})

export const polygonUpdated = (payload) => ({
  type: POLYGON_UPDATED,
  payload,
})

export const polygonDeleted = (polygonId) => ({
  type: POLYGON_DELETED,
  payload: polygonId,
})

const calculateBbox = (polygon) => {
  const { coordinates } = polygon.geo_json.geometry
  const lats = []
  const lngs = []
  for (let i = 0; i < coordinates[0].length; i++) {
    lats.push(coordinates[0][i][1])
    lngs.push(coordinates[0][i][0])
  }
  // calc the min and max lng and lat
  const minlat = Math.min.apply(null, lats)
  const maxlat = Math.max.apply(null, lats)
  const minlng = Math.min.apply(null, lngs)
  const maxlng = Math.max.apply(null, lngs)
  return [
    [minlng, minlat],
    [maxlng, maxlat],
  ]
}

const calculatePixels = (coordinates, bbox) => {
  const diffX = bbox[1][0] - bbox[0][0]
  const diffY = bbox[1][1] - bbox[0][1]
  const mulX = polygonShapeSize / diffX
  const mulY = polygonShapeSize / diffY
  const mul = Math.min(mulX, mulY)

  const coordinatesCanvasPixels = []
  coordinates.forEach((point) => {
    coordinatesCanvasPixels.push({
      x:
        Math.round((point[0] - bbox[0][0]) * mul) +
        1 +
        (polygonShapeSize - diffX * mul) / 2,
      y:
        polygonShapeSize -
        Math.round((point[1] - bbox[0][1]) * mul) +
        1 -
        (polygonShapeSize - diffY * mul) / 2,
    })
  })
  return coordinatesCanvasPixels
}

const enrichPolygon = (polygon) => {
  /** Calculate polygon's bounding box and shape in pixels * */
  const bbox = calculateBbox(polygon)
  polygon.pixels = calculatePixels(
    polygon.geo_json.geometry.coordinates[0],
    bbox,
  )
  polygon.bbox = bbox
  return polygon
}

export const fetchPolygons = () => (dispatch) => {
  dispatch(polygonsFetched())
  axiosInstance
    .get(polygonsEndpoint)
    .then((response) => {
      const polygons = response.data
      polygons.reverse()
      for (let i = 0; i < polygons.length; i++) {
        polygons[i] = enrichPolygon(polygons[i])
      }
      dispatch(receivePolygons(polygons))
    })
    .catch((err) => {
      let message = 'Something went wrong'
      if (err.response && err.response.data && err.response.data.message) {
        message = err.response.data.message
      }
      dispatch(polygonsError(message))
    })
}

export const addPolygon = (data) =>
  async function addPolygonThunk(dispatch, getState) {
    createPolygonApi(data)
      .then((response) => {
        const newPolygon = enrichPolygon(response.data)
        dispatch(polygonAdded(newPolygon))
        dispatch(
          notifySuccess(
            `New polygon was successfully created. Name: ${
              newPolygon.name
            }. Area: ${newPolygon.area.toFixed(2)} ha`,
          ),
        )
      })
      .catch((error) => {
        dispatch(notifyError(error.message))
      })
  }

export const editPolygon = (data) =>
  async function deletePolygonThunk(dispatch, getState) {
    editPolygonApi(data)
      .then((response) => {
        dispatch(polygonUpdated(response.data))
        dispatch(notifySuccess('Polygon has been renamed successfully'))
      })
      .catch((error) => {
        dispatch(notifyError(`Error updating polygon: ${error.message}`))
      })
  }

export const deletePolygon = (polygonId) =>
  async function deletePolygonThunk(dispatch, getState) {
    deletePolygonApi(polygonId)
      .then(() => {
        dispatch(polygonDeleted(polygonId))
        dispatch(notifySuccess('Polygon has been deleted successfully'))
      })
      .catch((error) => {
        dispatch(notifyError(`Error deleting polygon: ${error.message}`))
      })
  }
