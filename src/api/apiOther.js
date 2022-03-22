import axiosClient from './axiosClient'
import { nominatimSearch, confirmVat, countriesList } from './index'

export const searchCity = (locationName) =>
  /** Nominatim search by location name */
  axiosClient.get(`${nominatimSearch}&q=${locationName}`)

export const validateVat = (vat, country) => {
  /** Confirm VAT
   * Override base url - the method is at the moment at another domain,
   * it might change in the future
   * API Response: 200 - correct VAT, 422 - incorrect VAT */
  const url = `${confirmVat}?vat_id=${vat}&country=${country}`
  return axiosClient({ url, baseURL: '' })
}

export const getCountries = () =>
  /** Get a list of countries for billing info dropdown
   * Override base url - the method is at the moment at another domain,
   * it might change in the future
   * */
  axiosClient({ url: countriesList, baseURL: '' })
