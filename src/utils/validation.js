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
      res = 'Only digits, letters and +, (), - characters'
    }
  }
  return res
}
