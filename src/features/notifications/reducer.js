import {
  NOTIFICATION_SUCCESS,
  NOTIFICATION_ERROR,
  NOTIFICATION_CLEAR,
} from './actions'

const initialState = {}

export default function notificationsReducer(state = initialState, action) {
  switch (action.type) {
    case NOTIFICATION_SUCCESS: {
      return {
        isSuccess: true,
        message: action.payload,
      }
    }
    case NOTIFICATION_ERROR: {
      return {
        isSuccess: false,
        message: action.payload,
      }
    }
    case NOTIFICATION_CLEAR: {
      return {}
    }
    default:
      return state
  }
}
