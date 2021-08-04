import {SET_ACTIVE_POLY} from './actions'

const initialState = null;

export default function activepolyReducer(state = initialState, action) {
  switch(action.type) {
    case SET_ACTIVE_POLY: {
      return action.payload
    }
    default:
      return state
    }
}
