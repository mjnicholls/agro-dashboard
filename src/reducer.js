import { combineReducers } from 'redux'

import authReducer from "./features/auth/reducer";
import polygonsReducer from "./features/polygons/reducer";

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  auth: authReducer,
  polygons: polygonsReducer
})

export default rootReducer;