import axios from 'axios'
import Vue from 'vue'
import router from './../router'
const http = axios.create({
  baseURL: process.env.VUE_APP_SERVER_URL || 'http://localhost:3000/api'
})

http.interceptors.request.use(
  config => {
    if (localStorage.token) {
      config.headers.Authorization = localStorage.token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

http.interceptors.response.use(
  res => {
    return res
  },
  err => {
    if (!err.response) {
      Vue.prototype.$message.error(err.msg)
      return Promise.reject(err)
    }
    if (err.response.data.msg) {
      Vue.prototype.$message.error(err.response.data.msg)

      if (err.response.status === 401) {
        router.push('/login')
        
      }
    }
    return Promise.reject(err)
  }
)
export default http
