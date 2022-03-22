import axiosClient from './axiosClient'
import {
  apiKeys,
  apiKeyUpdate,
  apiKeyDelete,
  apiKeyCreate,
  invoicesList,
  updateName,
  updatePass,
  updateMailing,
  accountInfo,
  deleteAccount,
  getPolygonsAccount,
  apiKeyStatus,
  updateBillingInfo,
  isSubscriptionAvailableURL,
  unsubscribeURL,
  subscribeURL,
} from './index'

export const getAPIKeys = () => axiosClient.get(apiKeys)

export const createApiKey = async (data) =>
  axiosClient.post(
    apiKeyCreate,
    {},
    { params: { appid_name: data.appid_name } },
  )

export const updateAPIKey = (params) => axiosClient.put(apiKeyUpdate, params)

export const deleteAPIKey = (apiKey) =>
  axiosClient.delete(apiKeyDelete, { params: apiKey })

export const getAPIKeyStatus = () => axiosClient.get(apiKeyStatus)

export const getAccountInfo = () => axiosClient.get(accountInfo)

export const updateUserNames = (params) => axiosClient.put(updateName, params)

export const updatePassword = (params) => axiosClient.put(updatePass, params)

export const updateMailingPreferences = (params) =>
  axiosClient.put(updateMailing, params)

export const getInvoices = () => axiosClient.get(invoicesList)

export const deleteAcct = (delParams) =>
  axiosClient.delete(deleteAccount, { data: delParams })

export const getPolygons = () => axiosClient.get(getPolygonsAccount)

export const createBillingDetails = (params) =>
  /** Create billing details */
  axiosClient.post(updateBillingInfo, params)

export const updateBillingDetails = (params) =>
  /** Update billing information */
  axiosClient.put(updateBillingInfo, params)

export const subscribe = (params) => axiosClient.put(subscribeURL, params)

export const unsubscribe = (data) => axiosClient.put(unsubscribeURL, data)

export const isSubscriptionAvailableAPI = (email) =>
  axiosClient.get(`${isSubscriptionAvailableURL}?user[email]=${email}`)
