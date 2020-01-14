export default {
  namespace: 'user',
  state: {},
  reducers: {
    info(state, {userId}) {
      return Object.assign(state, {userId})
    },
    // 用户信息：性别、昵称、手机号、头像等
    userInfo(state, {userInfo}) {
      return Object.assign(state, {userInfo: userInfo})
    }
  }
}