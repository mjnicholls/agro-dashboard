import { setCookie } from '../../utils/cookies'

export const TOKEN_COOK = 'agro-units'
export const SET_UNITS = 'units/set'

export const toggleUnits = (payload) => ({
  type: SET_UNITS,
  payload,
})

// export const setUnits = payload => {
//   console.log("setUnits")
//   return dispatch => {
//     console.log("inside return")
//     setCookie(TOKEN_COOK, payload ? 'metric' : 'imperial');
//     dispatch(toggleUnits(payload))
//   }
// }

export const setUnits = (isMetric) =>
  function setUnitsThunk(dispatch, getState) {
    setCookie(TOKEN_COOK, isMetric ? 'metric' : 'imperial')
    dispatch(toggleUnits(isMetric))
  }
