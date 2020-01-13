export default {
  namespace: 'user',
  state: {},
  reducers: {
    info(state, {userId}) {
      console.log(state, userId)
      return {userId}
    },
    // 用户信息：性别、昵称、手机号、头像等
    userInfo(state, userInfo) {
      console.log(state, userInfo)
      return {userInfo}
    }
  }
}