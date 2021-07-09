import { POLYGONS_SUCCESS, POLYGON_ADDED, POLYGON_DELETED } from './actions'

const initialState = []

export default function polygonsReducer(state = initialState, action) {
  switch(action.type) {
    case 'polygons/polygonAdded': {
      return [
        ...state,
        {
          id: "",
          name: action.payload,
        }
      ]
    }
    case POLYGONS_SUCCESS: {
      return action.polygons
    }
    case POLYGON_ADDED: {
      return [action.payload, ...state]
    }
    case POLYGON_DELETED: {
      return state.filter((obj) => obj.id !== action.payload)
    }
    default:
      return state
  }
}
