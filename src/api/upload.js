import http from '@/plugins/axios'

const baseUrl = 'upload'
const api = {}

api.uploadFile = formData => {
  return http({
    url: baseUrl,
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: localStorage.token || ''
    }
  })
}

export default api
