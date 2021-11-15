import { cookies } from '../../config'
import { getCookie, setCookie } from '../../utils/cookies'
import { SET_UNITS } from './actions'

let units = getCookie(cookies.units)
if (!units) {
  units = 'metric'
  setCookie(cookies.units, units)
}

const initialState = {
  isMetric: !(units === 'imperial'), // metric by default
}

export default function unitsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_UNITS:
      return {
        isMetric: action.payload,
      }
    default:
      return state
  }
}
