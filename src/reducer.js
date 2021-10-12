import { combineReducers } from 'redux'

import authReducer from './features/auth/reducer'
import notificationsReducer from './features/notifications/reducer'
import polygonsReducer from './features/polygons/reducer'
import stateReducer from './features/state/reducer'
import unitsReducer from './features/units/reducer'

const appReducer = combineReducers({
  auth: authReducer,
  state: stateReducer,
  polygons: polygonsReducer,
  notifications: notificationsReducer,
  units: unitsReducer,
})

const rootReducer = (state, action) => {
  if (action.type === 'DESTROY_STATE') {
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}

export default rootReducer
