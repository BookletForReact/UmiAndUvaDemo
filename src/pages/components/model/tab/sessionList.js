import React from 'react'
import Item from './item.js'
import {connect} from 'dva'
const namespace = 'chat'

class SessionList extends React.Component {
  state = {
    sessionData: [
      {
        nick: '消息中心',
        type: 'single',
        avatar: require('@/assets/images/notice.png'),
        onClick () {
        }
      },
      {
        id: 2,
        nick: 'web讨论组',
        time: 1582455895563,
        desc: '这是一些测试内容',
        avatar: 'https://app.yunxin.163.com/webdemo/im/images/advanced.png'
      },
      {
        id: 3,
        nick: '默认好友',
        time: 1583311345031,
        desc: '[离线]...',
        avatar: require('@/assets/images/default-icon.png')
      }
    ]
  }
  componentDidMount() {

  }
  
  clickHandle (item) {
    const _data = this.state.sessionData.map(v => {
      v.selected = item.id === v.id
      return v
    })
    this.setState({ sessionData: _data })
  }
  render() {
    const { sessionData } = this.state
    return (
      <>
        {
          sessionData.map((item, index) => (
            <Item key={index} data={item} itemClick={() => this.clickHandle(item)}></Item>
          ))
        }
      </>
    )
  }
}

export default connect((state) => state[namespace])(SessionList)

