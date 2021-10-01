import { SET_ACTIVE_POLY, SET_SATELLITE_MODE } from './actions'

const initialState = {
  polygon: null,
  isSatelliteMode: true,
}

export default function stateReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_POLY: {
      return {
        ...state,
        polygon: action.payload,
      }
    }
    case SET_SATELLITE_MODE: {
      return {
        ...state,
        isSatelliteMode: action.payload,
      }
    }
    default:
      return state
  }
}
