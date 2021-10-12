import axios from 'axios'
import * as rax from 'retry-axios'

const axiosInstance = axios.create({
  timeout: 15000,
})

axiosInstance.defaults.raxConfig = {
  instance: axiosInstance,
}
rax.attach(axiosInstance)
