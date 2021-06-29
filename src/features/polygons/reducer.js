import {POLYGONS_SUCCESS } from './actions'

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
    default:
      return state
  }
}
