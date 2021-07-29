import { combineReducers } from 'redux'

import authReducer from "./features/auth/reducer";
import polygonsReducer from "./features/polygons/reducer";
import notificationsReducer from "./features/notifications/reducer";
import unitsReducer from "./features/units/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  polygons: polygonsReducer,
  notifications: notificationsReducer,
  units: unitsReducer
})

export default rootReducer;