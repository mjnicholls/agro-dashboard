import axios from 'axios'

export const searchCity = (query) =>
  /** Search method for the map
   * @param query: string - location name
   * */
  axios.get(
    `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=5`,
  )
