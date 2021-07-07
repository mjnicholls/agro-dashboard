
const baseURL = "http://k8s-eu4.owm.io";
const personalAccountPort = "12346"
const agriPort = "12345"

const personalAccountBase = `${baseURL}:${personalAccountPort}/`;
export const agriBase = `${baseURL}:${agriPort}/`;

export const loginURL = `${personalAccountBase}auth/login`
export const logoutURL = `${personalAccountBase}auth/logout`

export const polygonCreate = `${agriBase}/polygon`
export const polygonDelete = `${agriBase}/polygon`
export const polygonHistoryNDVI = `${agriBase}history/ndvi`
export const polygonHistorySoil = `${agriBase}history/soil`
export const polygonSatelliteImagesList = `${agriBase}image/search`

export const signUpUrl = "https://wp.agromonitoring.com/dashboard/login"
