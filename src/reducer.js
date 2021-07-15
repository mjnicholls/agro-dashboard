import { combineReducers } from 'redux'

import authReducer from "./features/auth/reducer";
import polygonsReducer from "./features/polygons/reducer";
import notificationsReducer from "./features/notifications/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  polygons: polygonsReducer,
  notifications: notificationsReducer
})

export default rootReducer;