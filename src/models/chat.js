// import { router } from 'umi'
// import API from '@/network/api'

export default {
  namespace: 'chat',
  state: {
    messageData: {
      '1': {
        avatar: '',
        nick: 'web开发讨论组',
        count: 5,
        chatList: [
          { nick: 'test', message: '这是一条测试信息' },
          { nick: 'test', message: '这是一条测试信息2' },
          { nick: 'test', message: '这是一条测试信息3' },
          { nick: 'test2', message: '这是一条测试信息4' },
          { isSelf: true, message: '这是一条测试信息4' },
        ]
      },
      '2': {
        avatar: '',
        nick: '张三',
        count: 0,
        chatList: [
          { nick: '张三', message: '这是一条测试信息' },
          { isSelf: true, message: '这是一条测试信息4' },
        ]
      }
    },
    currentMessage: {
      avatar: '',
      nick: 'web开发讨论组',
      count: 5,
      chatList: [
        { nick: 'test', message: '这是一条测试信息' },
        { nick: 'test', message: '这是一条测试信息2' },
        { nick: 'test', message: '这是一条测试信息3' },
        { nick: 'test2', message: '这是一条测试信息4' },
        { isSelf: true, message: '这是一条测试信息4' },
      ]
    }
  },
  reducers: {
    changeState(state, { payload }) {
      return { ...state, ...payload }
    }
  },
}