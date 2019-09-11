import http from '@/plugins/axios'

const baseUrl = 'posts'

const postApi = {}

postApi.create = data => {
  return http.post(`${baseUrl}/create`, data)
}

postApi.getLists = params => {
  // return http.get(baseUrl, {
  //   params
  // })
  return http({
    method: 'GET',
    params,
    url: `${baseUrl}/list`
  })
}
postApi.edit = (id, data, params) => {
  return http({
    method: 'PUT',
    url: baseUrl + '/edit',
    params: { id, ...params },
    data
  })
}

postApi.getPost = id => {
  return http.get(`${baseUrl}?id=${id}`)
}
postApi.del = id => {
  return http.delete(`${baseUrl}?id=${id}`)
}

postApi.save = (id, draft, data) => {
  return http({
    method: 'post',
    url: baseUrl + '/save',
    params: {
      id,
      draft
    },
    data
  })
}
export default postApi
