import axios from "axios/index";
import {apiKeyStatus} from "./index";
import {fetchPolygons} from "../../features/polygons/actions";
import {setApiKeyStatus} from "../../features/auth/actions";


export const checkApiKey = () => (dispatch, getState) => {
  const {token} = getState().auth
  axios.interceptors.request.use((config) => ({
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`
    }
  }))
  axios
    .get(apiKeyStatus)
    .then(() => {
      dispatch(setApiKeyStatus(true))
      dispatch(fetchPolygons())
    })
    .catch(() => {
      dispatch(setApiKeyStatus(false))
    })
}
