import React from 'react'
import Item from './item.js'

export default class FriendList extends React.Component {
  state = {
    friendData: [
      {
        nick: '添加好友',
        type: 'single',
        avatar: require('@/assets/images/addFriend.png')
      },
      {
        nick: '黑名单',
        type: 'single',
        avatar: require('@/assets/images/black.png')
      },
      {
        nick: '我的手机',
        type: 'single',
        avatar: require('@/assets/images/myPhone.png')
      },
      {
        nick: '默认好友[离线]',
        type: 'single',
        avatar: require('@/assets/images/default-icon.png')
      },
    ]
  }
  componentDidMount() {

  }
  render() {
    const { friendData } = this.state
    return (
      <>
        {
          friendData.map((item, index) => (
            <Item key={index} data={item}></Item>
          ))
        }
      </>
    )
  }
}


