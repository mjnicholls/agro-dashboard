import { getCookie, setCookie } from '../../utils/cookies'
import { TOKEN_COOK, SET_UNITS } from './actions'

let units = getCookie(TOKEN_COOK)
if (!units) {
  units = 'metric'
  setCookie(TOKEN_COOK, units)
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
