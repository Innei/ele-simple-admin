import http from '@/plugins/axios'

const baseUrl = 'user'

const api = {}

api.login = data => {
  return http.post(`${baseUrl}/login`, data)
}

api.signup = data => {
  return http.get(`${baseUrl}/signup`, data)
}

export default api
