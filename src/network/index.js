import axios from 'axios'

axios.defaults.baseURL = 'http://10.115.0.27:8585'

const instance = axios.create({
  withCredentials: true, // 是否携带cookie
})

instance.interceptors.request.use(function(request) {
  return request
}, function(error) {
  return Promise.reject(error)
})

instance.interceptors.response.use(function(res) {
  if (res.data.code !== 200) {
    return Promise.reject()
  }
  return res.data
}, function (error) {
  return Promise.reject(error)
})

export default instance