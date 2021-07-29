import {
  POLYGONS_FETCH_SUCCESS, POLYGON_ADDED, POLYGON_UPDATED, POLYGON_DELETED
} from './actions'

const initialState = []

export default function polygonsReducer(state = initialState, action) {
  switch(action.type) {
    case POLYGONS_FETCH_SUCCESS: {
      return action.polygons
    }
    case POLYGON_ADDED: {
      return [action.payload, ...state]
    }
    case POLYGON_UPDATED: {
      return state.map(item => {
      if (item.id !== action.payload.id) {
        return item
      }
      return {
        ...item,
        ...action.payload
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
