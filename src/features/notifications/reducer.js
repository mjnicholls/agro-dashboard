import { NOTIFICATION_SUCCESS, NOTIFICATION_ERROR } from './actions'

const initialState = {
  temporary: {},
  permanent: {},
}

export default function notificationsReducer(state = initialState, action) {
  switch (action.type) {
    case NOTIFICATION_SUCCESS: {
      return {
        ...state,
        temporary: {
          isSuccess: true,
          message: action.payload,
        },
      }
    }
    case NOTIFICATION_ERROR: {
      return {
        ...state,
        temporary: {
          isSuccess: false,
          message: action.payload,
        },
      }
    }

    default:
      return state
  }
}
