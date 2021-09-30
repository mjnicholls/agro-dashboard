function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(
      /* eslint-disable no-useless-escape */
      `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`,
      /* eslint-enable */
    ),
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}

function setCookie(name, value, options) {
  options = options || { path: '/', expires: 86400 }

  let { expires } = options

  if (typeof expires === 'number' && expires) {
    const d = new Date()
    d.setTime(d.getTime() + expires * 1000)
    expires = options.expires = d
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString()
  }

  value = encodeURIComponent(value)

  let updatedCookie = `${name}=${value}`

  for (const propName in options) {
    updatedCookie += `; ${propName}`
    const propValue = options[propName]
    if (propValue !== true) {
      updatedCookie += `=${propValue}`
    }
  }

  document.cookie = updatedCookie
}

function clearCookies() {
  document.cookie.split(';').forEach((c) => {
    document.cookie = c
      .replace(/^ +/, '')
      .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`)
  })
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(
    Array.prototype.map
      .call(
        atob(str),
        (c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`,
      )
      .join(''),
  )
}

function parseJwt(token) {
  return JSON.parse(
    b64DecodeUnicode(token.split('.')[1].replace('-', '+').replace('_', '/')),
  )
}

export { getCookie, setCookie, clearCookies, parseJwt }
