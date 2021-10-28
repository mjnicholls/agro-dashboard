export const serverBaseURL = 'https://new.agromonitoring.com/api/'

// export const personalAccountBase = `${serverBaseURL}auth/`
export const personalAccountBase = `http://k8s-eu4.owm.io:12346/`
const agriBase = `${serverBaseURL}proxy/`

const testServer = 'http://k8s-eu4.owm.io:12346/'


// user
export const loginURL = `${personalAccountBase}auth/login`
export const logoutURL = `${personalAccountBase}auth/logout`
export const signupURL = `${testServer}auth/signup`

export const forgotPasswordURL = `${testServer}auth/password/forgot`
export const resetPasswordURL = `${testServer}auth/password/reset`
export const confirmEmailURL = `${testServer}account/confirmation`
export const isSubscriptionAvailableURL = `${testServer}account/subscription`

// billing
export const subscribeURL = `${testServer}account/subscribe`
export const unsubscribeURL = `${testServer}account/unsubscribe`

export const apiKeyStatus = `${personalAccountBase}appid/status`
export const polygonsEndpoint = `${agriBase}polygons`
export const polygonCreate = `${agriBase}polygon`
export const polygonDelete = `${agriBase}polygon/`
export const polygonSatelliteImagesList = `${agriBase}image/search`

// personal account

// API Keys
export const apiKeys = `${personalAccountBase}appid/all`
export const apiKeyUpdate = `${personalAccountBase}appid/update`
export const apiKeyDelete = `${personalAccountBase}appid/delete`
export const apiKeyCreate = `${personalAccountBase}appid/create`

// payments
export const invoicesList = `${personalAccountBase}/payments`

// user
export const accountInfo = `${personalAccountBase}account`
export const updateName = `${personalAccountBase}account/user/names`
export const updatePass = `${personalAccountBase}account/user/password`
export const updateMailing = `${personalAccountBase}account/mailing`

// delete account
export const deleteAccount = `${personalAccountBase}account/delete`

// update invoice info
export const invoiceUpdate = `${personalAccountBase}account/invoice`

// get vat info
export const PolygonGet = `${personalAccountBase}/polygons`

export const confirmVat = 'https://home.agromonitoring.com/api/check_vat'
export const countriesList = 'https://home.agromonitoring.com/api/countries'

// charts
const current = 'current/'
export const currentSoil = `${agriBase}${current}soil`

// history
const history = 'history/'
export const historyNDVI = `${agriBase}${history}ndvi`
export const historySoil = `${agriBase}${history}soil`
export const historyAccumulatedTemperature = `${agriBase}${history}weather_at`
export const historyAccumulatedPrecipitation = `${agriBase}${history}weather_ap`
export const historyWeather = `${agriBase}${history}weather`

export const weatherOneCall = `${agriBase}one_call`
