import GA4React from 'ga-4-react'
import queryString from 'query-string'

import { gaID, cookies } from '../config'
import { getCookie, setCookie } from './cookies'

const adParamInUrl = 'campaign_id'
const campaignIdKey = 'campaign_id'
const dateKey = 'date'

// export const checkAdCampaignInURL = () => {
//   const adCampaign = findAdCampaignInUrl()
//   if (adCampaign) {
//     saveAdCampaignInCookies(adCampaign)
//   }
// }
//
//
// const findAdCampaignInUrl = () => {
//   const queryParams = queryString.parse(window.location.search)
//   return queryParams[adParamInUrl]
// }

// const saveAdCampaignInCookies = (ad) => {
//   const entryDate = Math.round(new Date().getTime() / 1000)
//   setCookie(
//     cookies.ad,
//     `${campaignIdKey}=${ad}&${dateKey}=${entryDate}`,
//     process.env.REACT_APP_COOKIE_DOMAIN,
//   )
// }

export const getAdCampaignFromCookies = () => {
  let campaignId = null
  let entryDate = null
  const advertisingCampaign = getCookie(cookies.ad)
  if (advertisingCampaign) {
    const vars = advertisingCampaign.split('&')
    for (let i = 0; i < vars.length; i += 1) {
      const [key, value] = vars[i].split('=')
      if (key === campaignIdKey) {
        campaignId = value
      } else if (key === dateKey) {
        entryDate = parseInt(value, 10)
      }
    }
  }
  return {
    campaign_id: campaignId,
    entrance_date: entryDate,
  }
}

export const setGoogleAnalytics = () => {
  const ga4react = new GA4React(gaID)
  ga4react.initialize().then(
    (ga4) => {
      ga4.pageview('path')
    },
    (err) => {
      /* eslint-disable-next-line */
      console.log(err)
    },
  )
}
