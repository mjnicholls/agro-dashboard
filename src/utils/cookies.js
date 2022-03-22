const getCookie = (name) => {
  let res
  if (name) {
    const matches = document.cookie.match(
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
  const cookieValue = `${name}=${encodeURIComponent(value)}`
  document.cookie = setOptions(cookieValue, domain)
}

function setOptions(cookieContent, domain) {
  const expiryDate = expiryDateOneMonthFromNow()
  const options = { path: '/', expires: expiryDate }
  if (domain) {
    options.domain = domain
  }
  const optionsArray = Object.keys(options)
  for (let i = 0; i < optionsArray.length; i += 1) {
    cookieContent += `;${optionsArray[i]}=${options[optionsArray[i]]}`
  }
  return cookieContent
}

function expiryDateOneMonthFromNow() {
  const oneMonthInMs = 30 * 60 * 60 * 1000
  const date = new Date()
  date.setTime(date.getTime() + oneMonthInMs)
  return date.toUTCString()
}

const deleteCookie = (name, path, domain) => {
  if (getCookie(name)) {
    document.cookie = `${name}=${path ? `;path=${path}` : ''}${
      domain ? `;domain=${domain}` : ''
    };expires=Thu, 01 Jan 1970 00:00:01 GMT`
  }
}

export { getCookie, deleteCookie, setCookie }
