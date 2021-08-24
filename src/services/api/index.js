
export const serverBaseURL = "https://wp.agromonitoring.com/api/";

export const personalAccountBase = `${serverBaseURL}auth/`
const agriBase = `${serverBaseURL}proxy/`;

export const loginURL = `${personalAccountBase}auth/login`
export const logoutURL = `${personalAccountBase}auth/logout`

export const polygonsEndpoint = `${agriBase}polygons`
export const polygonCreate = `${agriBase}polygon`
export const polygonDelete = `${agriBase}polygon/`
export const polygonSatelliteImagesList = `${agriBase}image/search`

// charts
const current = "current/";
export const currentSoil = `${agriBase}${current}soil`;


// history
const history = "history/";
export const historyNDVI = `${agriBase}${history}ndvi`;
export const historySoil = `${agriBase}${history}soil`;
export const historyAccumulatedTemperature = `${agriBase}${history}weather_at`;
export const historyAccumulatedPrecipitation = `${agriBase}${history}weather_ap`;
export const historyWeather = `${agriBase}${history}weather`;

export const weatherOneCall = `${agriBase}one_call`;
