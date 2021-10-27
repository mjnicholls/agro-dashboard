import axios from 'axios/index'
import { confirmVat, countriesList, invoiceUpdate, subscribeURL, unsubscribeURL } from './index'

export const createBillingDetails = (params) =>
  /** Create billing details */
  axios.post(invoiceUpdate, params)

export const updateBillingDetails = (params) =>
  /** Update billing information */
  axios.put(invoiceUpdate, params)

export const validateVat = (vat, country) =>
  /** Confirm VAT: 200 - correct VAT, 422 - incorrect VAT */
  axios.get(`${confirmVat}?vat_id=${vat}&country=${country}`)

export const getCountries = () =>
  /** A list of countries for billing info dropdown */
  axios.get(countriesList)

export const subscribe = (params) =>
  axios.post(subscribeURL, params)


export const unsubscribe = (data) =>
  axios.put(unsubscribeURL, data)

