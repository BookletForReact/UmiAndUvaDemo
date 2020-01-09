export default {
  namespace: 'user',
  state: {},
  reducers: {
    info(state, {userId}) {
      console.log(state, userId)
      return {userId}
    }
  }
}