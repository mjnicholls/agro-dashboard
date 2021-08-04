export const SET_ACTIVE_POLY = 'activepoly/set'

export const setActivePoly = payload => {
  return {
    type: SET_ACTIVE_POLY,
    payload: payload
  }
}
