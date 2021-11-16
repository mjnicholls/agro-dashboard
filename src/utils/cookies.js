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
