import React from 'react'
import {connect} from 'dva'
import Item from './item.js'
import { setLongScrollTop } from '../config'

const namespace = 'chat'

class SessionList extends React.Component {
  state = {
    sessionData: [
      {
        nick: '消息中心',
        type: 'single',
        avatar: require('@/assets/images/notice.png'),
      },
      {
        id: 1,
        nick: 'web讨论组',
        time: 1582455895563,
        desc: '这是一些测试内容',
        avatar: 'https://app.yunxin.163.com/webdemo/im/images/advanced.png'
      },
      {
        id: 2,
        nick: '默认好友',
        time: 1583311345031,
        desc: '[离线]...',
        avatar: 'https://app.yunxin.163.com/webdemo/im/images/default-icon.png'
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
    this.props.dispatch({ type: `${namespace}/setCurrentMessage`, payload: item })
    setLongScrollTop()
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

