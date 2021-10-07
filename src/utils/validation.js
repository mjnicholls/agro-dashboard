export const validateEmail = (email) => {
  /* email: string */
  const re = /\S+@\S+\.\S+/
  return re.test(email)
}
