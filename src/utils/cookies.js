/* eslint-disable */

function getCookie(name) {
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

function setCookie(name, value, options) {
  options = options || { path: '/', expires: 86400 }

  let { expires } = options

  if (typeof expires === 'number' && expires) {
    const d = new Date()
    d.setTime(d.getTime() + expires * 1000)
    expires = d
    options.expires = d
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString()
  }

  value = encodeURIComponent(value)

  let updatedCookie = `${name}=${value}`
  // eslint-disable-next-line
  for (const propName in options) {
    updatedCookie += `; ${propName}`
    const propValue = options[propName]
    if (propValue !== true) {
      updatedCookie += `=${propValue}`
    }
  }
  document.cookie = updatedCookie
}

function deleteCookie(name, path, domain) {
  if (getCookie(name)) {
    document.cookie = `${name}=${path ? `;path=${path}` : ''}${
      domain ? `;domain=${domain}` : ''
    };expires=Thu, 01 Jan 1970 00:00:01 GMT`
  }
}

export { getCookie, deleteCookie, setCookie }
