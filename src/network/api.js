import instance from './index'

export default {
  getToken(params) {
    return instance.get('/user/get_token', { params })
  },
  login (data) {
    return instance.post('/user/login', data)
  },
  logout (data) {
    return instance.post('/user/logout', data)
  },
  getUserId (userId) {
    return instance.get(`/user/${userId}`)
  },
  addFriend(data) {
    return instance.post('friendship/invite', data)
  },
  addBlacklist(data) {
    return instance.post('user/add_to_blacklist', data)
  },
  removeBlacklist(data) {
    return instance.post('user/remove_from_blacklist', data)
  },
  deleteFriend(data) {
    return instance.post('friendship/delete', data)
  }
}