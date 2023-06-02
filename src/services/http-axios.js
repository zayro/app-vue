import axios from 'axios'
import { CONSTANT } from '@/environments'

const URL = CONSTANT.URL.API

const TOKEN = window.localStorage.getItem('accessToken')
  ? JSON.parse(window.localStorage.getItem('accessToken')).token
  : null

const http = axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${TOKEN}`
  },
  responseType: 'json', // defecto
  responseEncoding: 'utf8', // defecto
  withCredentials: false
})

const data = new FormData()

const httpFormData = axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
    Authorization: `Bearer ${TOKEN}`
  },
  responseType: 'json' // defecto
})

const httpDownload = axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': 'multipart/form-data;',
    Authorization: `Bearer ${TOKEN}`
  },
  responseType: 'blob',
  timeout: 30000
})

http.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 404) {
      throw new Error(`${err.config.url} not found`)
    }
    throw err
  }
)

// Add a request interceptor
http.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config
  },
  (error) => {
    // Do something with request error

    return Promise.reject(error)
  }
)

// Add a response interceptor
http.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response
  },
  (error) => {
    // Do something with response error

    return Promise.reject(error)
  }
)

export { http, httpFormData, httpDownload, axios }
