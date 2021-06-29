export const validateEmail = (email) => {
  let re = /\S+@\S+\.\S+/
  return re.test(email)
}

