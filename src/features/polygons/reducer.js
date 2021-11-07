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
      return { isFetching: false, error: null, data: action.payload }
    }
    case POLYGON_ADDED: {
      return [action.payload, ...state]
    }
    case POLYGON_UPDATED: {
      return state.map((item) => {
        if (item.id !== action.payload.id) {
          return item
        }
        return {
          ...item,
          ...action.payload,
        }
      })
    }
    case POLYGON_DELETED: {
      return state.filter((obj) => obj.id !== action.payload)
    }
    default:
      return state
  }
}
