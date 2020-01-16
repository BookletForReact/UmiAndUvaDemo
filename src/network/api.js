import instance from './index'

export default {
  login (data) {
    return instance.post('/user/login', data)
  },
  logout (data) {
    return instance.post('/user/logout', data)
  },
  getUserId (userId) {
    return instance.get(`/user/${userId}`)
  }
}