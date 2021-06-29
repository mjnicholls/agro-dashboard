

export const toDate = (ts) => {
  const formatOptions = { day: 'numeric', month: 'short', year: 'numeric' }
  let date = new Date(ts * 1000);
  return date.toLocaleString('en-US', formatOptions)
}


export const toDateShort = (ts) => {
  const formatOptions = { day: 'numeric', month: 'short' }
  let date = new Date(ts * 1000);
  return date.toLocaleString('en-US', formatOptions)
}