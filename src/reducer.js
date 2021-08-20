import { combineReducers } from 'redux'

import authReducer from "./features/auth/reducer";
import stateReducer from './features/state/reducer'
import polygonsReducer from "./features/polygons/reducer";
import notificationsReducer from "./features/notifications/reducer";
import unitsReducer from "./features/units/reducer";
import onecallReducer from "./features/onecall/reducer"
import {LOGOUT_REQUEST} from "./features/auth/actions";

const appReducer = combineReducers({
  auth: authReducer,
  state: stateReducer,
  onecall: onecallReducer,
  polygons: polygonsReducer,
  notifications: notificationsReducer,
  units: unitsReducer
})

const rootReducer = (state, action) => {
  if (action.type === "DESTROY_STATE") {
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}

export default rootReducer;