import http from '@/plugins/axios'

const api = {}

const baseUrl = 'comments'

api.post = data => {
  return http({
    method: 'post',
    url: baseUrl,
    data
  })
}

export default api
