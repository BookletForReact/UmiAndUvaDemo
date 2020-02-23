import React from 'react'
import Item from './item.js'

export default class SessionList extends React.Component {
  state = {
    sessionData: [
      {
        nick: '消息中心',
        type: 'single',
        avatar: require('@/assets/images/notice.png')
      },
      {
        nick: 'web讨论组',
        time: 1582455895563,
        desc: '这是一些测试内容',
        avatar: 'https://app.yunxin.163.com/webdemo/im/images/advanced.png'
      }
    ]
  }
  componentDidMount() {

  }
  render() {
    const { sessionData } = this.state
    return (
      <>
        {
          sessionData.map((item, index) => (
            <Item key={index} data={item}></Item>
          ))
        }
      </>
    )
  }
}


