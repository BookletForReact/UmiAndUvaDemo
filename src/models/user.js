import { router } from 'umi'
import API from '@/network/api'

export default {
  namespace: 'user',
  state: {
    wrongPassword: false,
    userId: ''
  },
  reducers: {
    info(state, {userId}) {
      return Object.assign(state, {userId})
    },
    // 用户信息：性别、昵称、手机号、头像等
    userInfo(state, {userInfo}) {
      return Object.assign(state, {userInfo: userInfo})
    },
    changeState(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *login({ payload }, { call, put }) {
      try {
        const { result } = yield call(API.login, payload)
        yield put({ type: 'changeState', payload: { userId: result.id }})
        router.push('/')
      } catch (error) {
        yield put({ type: 'changeState', payload: { wrongPassword: true }})
      }
    }
  }
}