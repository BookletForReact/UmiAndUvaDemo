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
  },
  // 获取所有的好友
  getAllFriends (params) {
    return instance.get('/friendship/all', { params })
  },
  // 获取通讯录群组
  getUserGroups (data) {
    return instance.post('/user/favgroups', data)
  },
  // 同步用户的群组、群组成员数据
  groupUserSyncInfo (version) {
    return instance.post(`/user/sync/${version}`)
  },
  // 创建群组
  createGroup (data) {
    return instance.post('/group/create', data)
  },
  // 获取群成员信息
  groupGetMemberInfo (data) {
    return instance.post('/group/get_member_info', data)
  },
  // 添加群成员
  groupAddMember (data) {
    return instance.post('/group/add', data)
  },
  // 解散群组
  groupDismiss (data) {
    return instance.post('/group/dismiss', data)
  }
}