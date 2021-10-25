import axios from 'axios'

export const validateEmail = (email) => {
  /* email: string */
  const re = /\S+@\S+\.\S+/
  return re.test(email)
}

export const validatePhoneNumber = (val) => {
  let res
  if (val.length > 20) {
    res = 'Phone number is too long'
  } else {
    const re = /^[0-9A-Za-z\s-+()]+$/
    if (!re.test(val)) {
      res = 'Can only contain digits, letters and +, (), - characters'
    }
  }
  return res
}

export const validateVAT = (val, country) =>
  axios.get(`https://home.openweathermap.org/api/check_vat?vat_id=${val}&country=${country}`)


