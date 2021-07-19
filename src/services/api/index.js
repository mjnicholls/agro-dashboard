
const baseURL = "http://k8s-eu4.owm.io";
const personalAccountPort = "12346"
const agriPort = "12345"

const personalAccountBase = `${baseURL}:${personalAccountPort}/`;
export const agriBase = `${baseURL}:${agriPort}/`;

export const loginURL = `${personalAccountBase}auth/login`
export const logoutURL = `${personalAccountBase}auth/logout`

export const polygonCreate = `${agriBase}polygon`
export const polygonDelete = `${agriBase}polygon/`
export const polygonSatelliteImagesList = `${agriBase}image/search`

// charts

export const historyNDVI = `${agriBase}history/ndvi`
export const historySoil = `${agriBase}history/soil`
export const historyAccumulatedTemperature = `${agriBase}/history/weather_at`
export const historyAccumulatedPrecipitation = `${agriBase}/history/weather_ap`


export const signUpUrl = "https://wp.agromonitoring.com/dashboard/login"
