import GA4React from 'ga-4-react'
import queryString from 'query-string'

import { gaID, cookies } from '../config'
import { setCookie } from './cookies'

export const setGoogleAnalytics = () => {
  const ga4react = new GA4React(gaID)
  ga4react.initialize().then(
    (ga4) => {
      ga4.pageview('path')
    },
    (err) => {
      /* eslint-disable-next-line */
      console.error(err)
    },
  )
}

export const saveAdCampaignInCookies = () => {
  const queryParams = queryString.parse(window.location.search)
  const tokenVal = queryParams.campaign_id
  if (tokenVal) {
    const date = Math.round(new Date().getTime() / 1000)
    setCookie(
      cookies.ad,
      `campaign_id=${tokenVal}&date=${date}`,
      process.env.REACT_APP_COOKIE_DOMAIN,
    )
  }
}
