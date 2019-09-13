import http from '@/plugins/axios'

const api = {}

const baseUrl = 'posts/comments'

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
    params
  })
}

api.del = id => {
  return http({
    method: 'delete',
    url: `${baseUrl}?id=${id}`
  })
}

api.getNum = () =>
  http({
    method: 'get',
    url: `${baseUrl}/info`
  })

api.modState = (id, state) => {
  return http({
    method: 'put',
    url: `${baseUrl}`,
    params: {
      id,
      state
    }
  })
}

api.reply = data =>
  http({
    method: 'post',
    url: `${baseUrl}/reply`,
    data
  })
export default api
