import http from '@/plugins/axios'

const baseUrl = 'user'

const api = {}

api.login = data => {
  return http.post(`${ baseUrl }/login`, data)
}

api.signup = data => {
  return http.post(`${ baseUrl }/signup`, data)
}

api.getInfo = () => http.get(`${ baseUrl }/info`)

api.getUserData = params =>
    http.get(`${ baseUrl }`, {
      params
    })

api.update = data => {
  return http.put(`${ baseUrl }/update`, data)
}

api.reset = data => http.post(`${ baseUrl }/reset`, data)
export default api
