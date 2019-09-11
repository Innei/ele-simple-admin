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

api.getList = params => {
  return http({
    method: 'get',
    url: baseUrl,
    ...params
  })
}

api.del = id => {
  return http({
    method: 'delete',
    url: `${baseUrl}?id=${id}`
  })
}
export default api
