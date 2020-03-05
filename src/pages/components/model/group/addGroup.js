// 添加好友
import { Modal, Checkbox, message } from 'antd'
import React from 'react'
// import API from '@/network/api'
import './addGroup.scss'

class AddGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true,
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

  // 获取所有的通讯录好友
  getAllFriend = async () => {
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

  togglePane = () => {
    const { visible } = this.state
    this.setState({
      visible: !visible
    })
  }

  // 创建群组
  addGroupFn = async () => {
    // const { addFriendIds } = this.state
    // const { code } = await API.createGroup({ memberIds: addFriendIds })
    // if (code === 200) {
    //   message.success('群组创建成功')
    // } else {
    //   message.error('创建群组失败')
    // }
    this.togglePane()
    // 触发父元素的回调
    this.props.okConfirm()
  }

  handleCancel = () => {
    this.togglePane()
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
      <div className="add-group">
        <Modal
          width="50%"
          title="添加成员"
          visible={this.state.visible}
          onOk={this.addGroupFn}
          onCancel={this.togglePane}
          okText="确认"
          cancelText="取消"
          wrapClassName="add-group-modal"
        >
          <Checkbox.Group options={userList} onChange={this.onChange} />z
        </Modal>
      </div>
    )
  }
}

export default AddGroup