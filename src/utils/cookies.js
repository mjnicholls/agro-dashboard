function getCookie (name) {
  var matches = document.cookie.match(new RegExp(
    /* eslint-disable no-useless-escape */
    '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
    /* eslint-enable */
  ))
  return matches ? decodeURIComponent(matches[1]) : undefined
}

function setCookie (name, value, options) {
  options = options || { path: '/', expires: 86400 }

  var expires = options.expires

  if (typeof expires === 'number' && expires) {
    var d = new Date()
    d.setTime(d.getTime() + expires * 1000)
    expires = options.expires = d
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString()
  }

  value = encodeURIComponent(value)

  var updatedCookie = name + '=' + value

  for (var propName in options) {
    updatedCookie += '; ' + propName
    var propValue = options[propName]
    if (propValue !== true) {
      updatedCookie += '=' + propValue
    }
  }
  document.cookie = updatedCookie
}

function clearCookies () {
  document.cookie.split(';').forEach((c) => {
    document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
  })
}

export {getCookie, setCookie, clearCookies}