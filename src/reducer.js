import { combineReducers } from 'redux'

import authReducer from "./features/auth/reducer";
import activepolyReducer from './features/activepoly/reducer'
import polygonsReducer from "./features/polygons/reducer";
import notificationsReducer from "./features/notifications/reducer";
import unitsReducer from "./features/units/reducer";
import onecallReducer from "./features/onecall/reducer"

const rootReducer = combineReducers({
  auth: authReducer,
  activepoly: activepolyReducer,
  onecall: onecallReducer,
  polygons: polygonsReducer,
  notifications: notificationsReducer,
  units: unitsReducer
})

export default rootReducer;