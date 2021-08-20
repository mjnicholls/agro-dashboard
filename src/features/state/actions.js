export const SET_ACTIVE_POLY = 'state/set_active_poly'
export const SET_SATELLITE_MODE = 'state/set_satellite_mode'


export const setActivePoly = payload => {

  return {
    type: SET_ACTIVE_POLY,
    payload: payload
  }
}

export const setSatelliteMode = payload => {
  return {
    type: SET_SATELLITE_MODE,
    payload: payload
  }
}
