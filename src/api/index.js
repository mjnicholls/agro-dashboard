const accountBase = 'auth'
const agriBase = 'proxy'

// authorisation
export const loginURL = `${accountBase}/auth/login`
export const logoutURL = `${accountBase}/auth/logout`
export const signupURL = `${accountBase}/auth/signup`
export const forgotPasswordURL = `${accountBase}/auth/password/forgot`
export const resetPasswordURL = `${accountBase}/auth/password/reset`

// personal account
export const confirmEmailURL = `${accountBase}/account/confirmation`
export const isSubscriptionAvailableURL = `${accountBase}/account/subscription`

export const subscribeURL = `${accountBase}/account/subscribe`
export const unsubscribeURL = `${accountBase}/account/unsubscribe`

export const apiKeyStatus = `${accountBase}/appid/status`
export const apiKeys = `${accountBase}/appid/all`
export const apiKeyUpdate = `${accountBase}/appid/update`
export const apiKeyDelete = `${accountBase}/appid/delete`
export const apiKeyCreate = `${accountBase}/appid/create`

export const invoicesList = `${accountBase}/payments`

export const accountInfo = `${accountBase}/account`
export const updateName = `${accountBase}/account/user/names`
export const updatePass = `${accountBase}/account/user/password`
export const updateMailing = `${accountBase}/account/mailing`
export const updateBillingInfo = `${accountBase}/account/invoice`

export const deleteAccount = `${accountBase}/account/delete`

export const getPolygonsAccount = `${accountBase}/polygons`

// dashboard
export const polygonsURL = `${agriBase}/polygons`
export const polygonURL = `${agriBase}/polygon`
export const polygonSatelliteImagesURL = `${agriBase}/image/search`

export const currentSoil = `${agriBase}/current/soil`
export const historyNDVI = `${agriBase}/history/ndvi`
export const historySoil = `${agriBase}/history/soil`
export const historyAccumulatedTemperature = `${agriBase}/history/weather_at`
export const historyAccumulatedPrecipitation = `${agriBase}/history/weather_ap`
export const historyWeather = `${agriBase}/history/weather`
export const weatherOneCall = `${agriBase}/one_call`

// third-party endpoints
export const confirmVat = 'https://old.agromonitoring.com/api/check_vat'
export const countriesList = 'https://old.agromonitoring.com/api/countries'
export const nominatimSearch =
  'https://nominatim.openstreetmap.org/search?format=json&limit=7'
