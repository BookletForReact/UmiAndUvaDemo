// import { router } from 'umi'
// import API from '@/network/api'
const namespace = 'chat'
export default {
  namespace,
  state: {
    messageMockData: {
      '1': {
        count: 5,
        chatList: [
          { nick: 'test', message: '这是一条测试信息', time: 1583478923411 },
          { nick: 'test', message: '这是一条测试信息2', time: 1583478924411 },
          { nick: 'test', message: '这是一条测试信息3', time: 1583478925411 },
          { nick: 'test2', message: '这是一条测试信息5这是一条测试信息5这是一条测试信息5这是一条测试信息5这是一条测试信息5这是一条测试信息5这是一条测试信息5这是一条测试信息5这是一条测试信息5', time: 1583478963411 },
          { isSelf: true, message: '经典款撒娇肯定是卡', time: 1583478927411 },
          { nick: 'test2', message: '这是一条测试信息4', time: 1583478963411 },
          { nick: 'test2', message: '这是一条测试信息4', time: 1583478963411 },
          { nick: 'test2', message: '这是一条测试信息4', time: 1583478963411 },
          { isSelf: true, message: '这是一条测试信息5', time: 1583478927411 },
          { isSelf: true, message: '都是卡绝对是卡大家都是卡绝对是卡大家都是卡绝对是卡大家都是卡绝对是卡大家都是卡绝对是卡大家都是卡绝对是卡大家都是卡绝对是卡大家都是卡绝对是卡大家都是卡绝对是卡大家都是卡绝对是卡大家都是卡绝对是卡大家都是卡绝对是卡大家都是卡绝对是卡大家都是卡绝对是卡大家都是卡绝对是卡大家都是卡绝对是卡大家都是卡绝对是卡大家都是卡绝对是卡大家都是卡绝对是卡大家都是卡绝对是卡大家都是卡绝对是卡大家都是卡绝对是卡大家都是卡绝对是卡大家都是卡绝对是卡大家都是卡绝对是卡大家都是卡绝对是卡大家都是卡绝对是卡大家都是卡绝对是卡', time: 1583478927411 },
          { nick: 'test2', message: '这是一条测试信息4', time: 1583478963411 },
          { nick: 'test2', message: '这是一条测试信息4', time: 1583478963411 },
        ]
      },
      '2': {
        count: 2,
        chatList: [
          { nick: '张三', message: '这是一条测试信息' },
          { isSelf: true, message: '这是一条测试信息4' },
        ]
      }
    },
    currentMessage: {}
  },
  reducers: {
    changeState(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *setCurrentMessage({ payload }, { put, select }) {
      const { messageMockData } = yield select(state => state[namespace]);
      const currentMessage = {
        ...payload,
        chatList: messageMockData[payload.id].chatList
      }
      yield put({ type: 'changeState', payload: { currentMessage } })
    },
    *sendMessage({ payload }, { put, select }) {
      const { currentMessage } = yield select(state => state[namespace])
      if (!Object.keys(currentMessage).length) return
      const message = {
        isSelf: true,
        message: payload,
        time: new Date().getTime()
      }
      currentMessage.chatList.push(message)
      yield put({ type: 'changeState', payload: { currentMessage } })
    }
  }
}