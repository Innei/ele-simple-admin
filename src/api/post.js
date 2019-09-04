import http from '@/plugins/axios'

const baseUrl = 'posts'

const postApi = {}

postApi.create = data => {
  return http.post(`${baseUrl}/create`, data)
}

postApi.getLists = params => {
  return http.get(baseUrl, {
    params
  })
}
postApi.edit = (id, data) => {
  return http.put(
    `${baseUrl}/edit`,
    {
      params: {
        id
      }
    },
    data
  )
}

postApi.getPost = id => {
  return http.get(`${baseUrl}/${id}`)
}
export default postApi
