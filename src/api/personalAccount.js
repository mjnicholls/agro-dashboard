import axios from 'axios'

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
  PolygonGet,
  apiKeyStatus,
} from './index'

export const getAPIKeys = () =>
  /** Get a list of API keys */
  axios.get(apiKeys)

export const createApiKey = async (data) =>
  /** Create API key */
  axios.post(apiKeyCreate, {}, { params: { appid_name: data.appid_name } })

export const updateAPIKey = (params) =>
  /** Update API key */
  axios.put(apiKeyUpdate, params)

export const deleteAPIKey = (apiKey) =>
  /** Delete API key */
  axios.delete(apiKeyDelete, { params: apiKey })

export const getAccountInfo = () =>
  /** Get account preferences */
  axios.get(accountInfo)

export const updateUserSettings = (params) =>
  /** Update username or full name */
  axios.put(updateName, params)

export const updatePassword = (params) =>
  /** Update password */
  axios.put(updatePass, params)

export const updateMailingPreferences = (params) =>
  /** Update updateMailing settings */
  axios.put(updateMailing, params)

export const getInvoices = () =>
  /** Get a list of invoices */
  axios.get(invoicesList)

export const deleteAcct = (delParams) =>
  /** Delete account */
  axios.delete(deleteAccount, { data: delParams })

export const getPolygons = () =>
  /** Get informational about polygons within personal account */
  axios.get(PolygonGet)

export const getAPIKeyStatus = () =>
  /** Check whether API key has been synced and is ready to use */
  axios.get(apiKeyStatus)
