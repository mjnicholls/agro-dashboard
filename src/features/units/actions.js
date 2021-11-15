import { cookies } from '../../config'
import { setCookie } from '../../utils/cookies'
export const SET_UNITS = 'units/set'

export const toggleUnits = (payload) => ({
  type: SET_UNITS,
  payload,
})

export const setUnits = (isMetric) =>
  function setUnitsThunk(dispatch) {
    setCookie(cookies.units, isMetric ? 'metric' : 'imperial')
    dispatch(toggleUnits(isMetric))
  }
