export const SET_ACTIVE_POLY = 'state/set_active_poly'
export const SET_SATELLITE_MODE = 'state/set_satellite_mode'

export const setActivePoly = (payload) => ({
  type: SET_ACTIVE_POLY,
  payload,
})

export const setSatelliteMode = (payload) => ({
  type: SET_SATELLITE_MODE,
  payload,
})
