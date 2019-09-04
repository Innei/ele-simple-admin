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
    params
  })
}
postApi.edit = (id, data) => {
  return http({
    method: 'PUT',
    url: baseUrl + '/' + 'edit',
    params: { id },
    data
  })
}

postApi.getPost = id => {
  return http.get(`${baseUrl}/${id}`)
}
postApi.del = id => {
  return http.delete(`${baseUrl}/${id}`)
}
export default postApi
