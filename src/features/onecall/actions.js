import {getOneCallData} from "../../services/api/weatherApi";

export const ONECALL_FETCH = 'onecall/fetch';
export const ONECALL_FETCH_SUCCESS = 'onecall/fetch_success';
export const ONECALL_FETCH_FAILURE = 'onecall/fetch_error';


const onecallLoad = () => {
  return {
    type: ONECALL_FETCH
  }
}

const oneCallError = payload => {
  return {
    type: ONECALL_FETCH_FAILURE,
    payload: payload
  }
}

export const oneCallSuccess = payload => {
  return {
    type: ONECALL_FETCH_SUCCESS,
    payload: payload
  }
}

export const fetchOneCall = (lat, lon) => {
  return async function addPolygonThunk(dispatch) {
    dispatch(onecallLoad())
    getOneCallData(lat, lon)
      .then(response => {
          dispatch(oneCallSuccess(response))}
        )
      .catch(err => {
        let message = "Something went wrong"
        if (err.response && err.response.data && err.response.data.message) {
          message = err.response.data.message;
        }
        dispatch(oneCallError(message));
      })
  }
}
