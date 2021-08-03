import {ONECALL_FETCH, ONECALL_FETCH_SUCCESS, ONECALL_FETCH_FAILURE} from "./actions";

const initialState = {
  data: null,
  isLoading: true,
  error: null
}

export default function polygonsReducer(state = initialState, action) {
  switch(action.type) {
    case ONECALL_FETCH: {
      return {
        data: null,
        isLoading: true,
        error: null
      }
    }
    case ONECALL_FETCH_FAILURE: {
      return {
        data: null,
        isLoading: false,
        error: action.payload
      }
    }
    case ONECALL_FETCH_SUCCESS: {
      return {
        data: action.payload,
        isLoading: false,
        error: null
      }
    }
    default:
      return state
  }
}