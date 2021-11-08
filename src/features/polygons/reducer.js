import {
  POLYGONS_START_FETCHING,
  POLYGONS_FETCH_SUCCESS,
  POLYGONS_FETCH_FAILURE,
  POLYGON_ADDED,
  POLYGON_UPDATED,
  POLYGON_DELETED,
} from './actions'

const initialState = {
  isFetching: false,
  error: null,
  data: [],
}

export default function polygonsReducer(state = initialState, action) {
  switch (action.type) {
    case POLYGONS_START_FETCHING: {
      return { isFetching: true, error: null, data: [] }
    }
    case POLYGONS_FETCH_SUCCESS: {
      return { isFetching: false, error: null, data: action.polygons }
    }
    case POLYGONS_FETCH_FAILURE: {
      return { isFetching: false, error: action.payload, data: [] }
    }
    case POLYGON_ADDED: {
      return {
        ...state,
        data: [...state.data, action.payload],
      }
    }
    case POLYGON_UPDATED: {
      const updatedPolygons = state.data.map((item) => {
        if (item.id !== action.payload.id) {
          return item
        }
        return {
          ...item,
          ...action.payload,
        }
      })
      return {
        ...state,
        data: updatedPolygons,
      }
    }
    case POLYGON_DELETED: {
      const updatedPolygons = state.data.filter(
        (obj) => obj.id !== action.payload,
      )
      return {
        ...state,
        data: updatedPolygons,
      }
    }
    default:
      return state
  }
}
