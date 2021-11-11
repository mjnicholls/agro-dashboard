const getCookie = (name) => {
  let res
  if (name) {
    const kk =
      'signed_in=test_currency_usd%40owm.io; __gads=ID=bdfa0f576082c199-2284a1a7c0cc00a3:T=1598344835:RT=1636103887:R:S=ALNI_MbCveBZGAGaZqu2f9yJv_NOdmE1-A; __stripe_mid=005a8c68-fe72-4f09-af9d-60e0178640778ad2ab; _gid=GA1.2.601517681.1636623906; agro-ad=fluff; _ga=GA1.1.580945751.1578119594; __stripe_sid=9430a25d-eb23-4fd8-ac35-222d398e464f8fd466; _ga_JE5157018X=GS1.1.1636644532.18.1.1636644816.0; agro-units=metric'
    // document.cookie
    const matches = kk.match(
      new RegExp(
        /* eslint-disable no-useless-escape */
        `(?:^|; )${name.replace(
          /([\.$?*|{}\(\)\[\]\\\/\+^])/g,
          '\\$1',
        )}=([^;]*)`,
        /* eslint-enable */
      ),
    )
    res = matches ? decodeURIComponent(matches[1]) : undefined
  }
  return res
}

const setCookie = (name, value, domain) => {
  const date = new Date()
  date.setTime(date.getTime() + 2592000000)
  const options = { path: '/', expires: date.toUTCString() }
  if (domain) {
    options.domain = domain
  }
  let updatedCookie = `${name}=${encodeURIComponent(value)}`
  const optionsArray = Object.keys(options)
  for (let i = 0; i < optionsArray.length; i += 1) {
    updatedCookie += `;${optionsArray[i]}=${options[optionsArray[i]]}`
  }
  document.cookie = updatedCookie
}

const deleteCookie = (name, path, domain) => {
  if (getCookie(name)) {
    document.cookie = `${name}=${path ? `;path=${path}` : ''}${
      domain ? `;domain=${domain}` : ''
    };expires=Thu, 01 Jan 1970 00:00:01 GMT`
  }
}

export { getCookie, deleteCookie, setCookie }
