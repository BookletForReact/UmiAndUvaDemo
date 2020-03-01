// 添加好友
import { Modal, Checkbox, message } from 'antd'
import React from 'react'
import API from '@/network/api'

class AddGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true,
      account: '',
      userList: [], // 所有的好友
      addFriendIds: [], // 新建群组好友ID集合
      mockData: {	
        'code': 200,
        'result': [{
          'displayName': 'Martin',
          'message': '你好，我是一杯水',
          'status': 10,
          'updatedAt': '2017-09-18',
          'updatedTime': '1560222477000',
          'user': {
            'id': 'slEcpCI63',
            'nickname': '一杯水',
            'region': '86',
            'phone': '13269772766',
            'portraitUri': 'http://7xogjk.com1.z0.glb.clouddn.com/Fo6wxS7zzvGpwyAFhlpTUVirpOGh',
            'gender': 'male', // 性别
            'stAccount': 'b323422', // SealTalk 号
            'phone': '18701029999' // 手机号
          }
        }, {
          'displayName': 'Alin',
          'message': '你好，我是一杯水',
          'status': 10,
          'updatedAt': '2017-09-18',
          'updatedTime': '1560222477000',
          'user': {
            'id': '123456',
            'nickname': '一杯水',
            'region': '86',
            'phone': '13269772766',
            'portraitUri': 'http://7xogjk.com1.z0.glb.clouddn.com/Fo6wxS7zzvGpwyAFhlpTUVirpOGh',
            'gender': 'male', // 性别
            'stAccount': 'b323422', // SealTalk 号
            'phone': '18701029999' // 手机号
          }
        }]
      }
    }
  }

  async componentDidMount () {
    this.getAllFriend()
  }

  getAllFriend = async () => {
    // 获取所有的通讯录好友
    const { code, result } = this.state.mockData // await API.getAllFriends()
    if (code === 200 && result.length > 0) {
      const userList = result.map((item) => {
        item.value = item.user.id
        item.label = item.displayName
        return item
      })
      this.setState({
        userList
      })
    } else {
      message.error('暂无好友')
    }
  }

  initData = () => {
    this.setState({
      visible: false,
      account: ''
    })
  }

  showModal = () => {
    this.setState({
      visible: true,
      account: ''
    })
  }

  addGroupFn = async () => {
    this.props.okConfirm(this.state.addFriendIds)
  }

  handleCancel = () => {
    this.initData()
  }
  // 添加好友的ID
  onChange = (checkedValues) => {
    this.setState({
      addFriendIds: checkedValues
    })
  }

  render() {
    const { userList } = this.state
    return (
      <div>
        <Modal
          width="80%"
          title="添加成员"
          visible={this.state.visible}
          onOk={this.addGroupFn}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
          <Checkbox.Group options={userList} onChange={this.onChange} />
        </Modal>
      </div>
    )
  }
}

export default AddGroup