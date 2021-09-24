import {
  apiKeys,
  apiKeyUpdate,
  apiKeyDelete,
  apiKeyCreate,
  invoicesList,
  updateName,
  updatePass, 
  mailing,
  mailPref,
  deleteAccount, 
  invoiceUpdate
} from "./index";
import {axiosInstance} from "../base";


export const getAPIKeys = () => {
  return axiosInstance.get(apiKeys)
    .then(response => response.data)
    .catch(err => {
      throw new Error(err)
    })
}

// create API Key method 

export const createApiKey = async (name) => {
  let appid_name = name.appid_name;
  return axiosInstance.post(apiKeyCreate, {}, {params: {appid_name}})
    .then(response => response)
    .catch(error => {
      throw new Error(error)
    })
}

// update API Key method

export const updateAPIKey = (params) => {
  return axiosInstance.put(apiKeyUpdate, params)
    .then(response => response)
    .catch(error => {
      throw new Error(error)
    })
}

// delete API Key method

export const deleteAPIKey = (apiKey) => {
  return axiosInstance.delete(apiKeyDelete, {params: apiKey})
    .then(response => response)
    .catch(error => {
      throw new Error(error)
    })
}

// Invoices

export const getInvoices = () => {
  return axiosInstance.get(invoicesList)
    .then(response => response.data)
    .catch(err => {
      throw new Error(err)
    })
}

// update name method

export const updateUserName = (params) => {
  return axiosInstance.put(updateName, params)
    .then(response => response)
    .catch(error => {
      throw new Error(error)
    })
}

// update password method

export const updatePassword = (params) => {
  return axiosInstance.put(updatePass, params)
    .then(response => response)
    .catch(error => {
      throw new Error(error)
    })
}

// get mailing preferences method

export const getMailPrefs = () => {
  return axiosInstance.get(mailPref)
    .then(response => response.data)
    .catch(err => {
      throw new Error(err)
    })
}


// update mailing method

export const updateMailing = (params) => {
  return axiosInstance.put(mailing, params)
    .then(response => response)
    .catch(error => {
      throw new Error(error)
    })
}

// delete account 

export const deleteAcct = (params) => {
  return axiosInstance.delete(deleteAccount, params)
    .then(response => response)
    .catch(error => {
      throw new Error(error)
    })
}

// update invoice info 

export const invoiceEdit = (params) => {
  return axiosInstance.put(invoiceUpdate, params)
    .then(response => response)
    .catch(error => {
      throw new Error(error)
    })
}
