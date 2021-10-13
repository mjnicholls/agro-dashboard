import axios from 'axios'

import {
  apiKeys,
  apiKeyUpdate,
  apiKeyDelete,
  apiKeyCreate,
  invoicesList,
  updateName,
  updatePass,
  mailing,
  accountInfo,
  deleteAccount,
  invoiceUpdate,
  confirmVat,
  countriesList,
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

export const getInvoices = () =>
  /** Get a list of invoices */
  axios.get(invoicesList)

export const updateUserName = (params) =>
  /** Update username or full name */
  axios.put(updateName, params)

export const updatePassword = (params) =>
  /** Update password */
  axios.put(updatePass, params)

export const getAccountInfo = () =>
  /** Get account preferences */
  axios.get(accountInfo)

export const updateMailing = (params) =>
  /** Update mailing settings */
  axios.put(mailing, params)

export const deleteAcct = () =>
  /** Delete account */
  axios.delete(deleteAccount)

export const createBillingDetails = (params) =>
  /** Create billing details */
  axios.post(invoiceUpdate, params)

export const updateBillingDetails = (params) =>
  /** Update billing information */
  axios.put(invoiceUpdate, params)

export const confirmVatNumber = () =>
  /** Confirm VAT: 200 - correct VAT, 422 - incorrect VAT */
  axios.get(confirmVat)

export const getCountries = () =>
  /** A list of countries for billing info dropdown */
  axios.get(countriesList)

export const getPolygons = () =>
  /** Get informational about polygons within personal account */
  axios.get(PolygonGet)

export const getAPIKeyStatus = () =>
  /** Check whether API key has been synced and is ready to use */
  axios.get(apiKeyStatus)
