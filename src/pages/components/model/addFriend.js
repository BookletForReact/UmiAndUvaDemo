// 添加好友
import { Modal, Button, Input, message } from 'antd'
import React from 'react'
import API from '@/network/api'

class AddFriend extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      account: ''
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

  addFriendFn = async () => {
    const { account } = this.state
    if (!account.trim()) {
      alert('好友ID不能为空！')
      return false
    }
    if (account.length < 2 || account.length > 20) {
      alert('好友ID长度在2～20位之间')
      return false
    }
    // 如果通过验证，再继续进行调用接口操作
    const { data: { code, msg } } = await API.addFriend({ friendId: account })
    if (code) return message.error(msg)
    message.success('添加成功！')
    this.initData()
  }

  handleCancel = () => {
    this.initData()
  }

  handleChangeAccount = (event) => {
    this.setState({
      account: event.target.value
    })
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          添加好友
        </Button>
        <Modal
          width="25%"
          title="添加好友"
          visible={this.state.visible}
          onOk={this.addFriendFn}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
          <Input
            placeholder="请输入账号"
            value={this.state.account}
            onChange={this.handleChangeAccount} />
        </Modal>
      </div>
    )
  }
}

export default AddFriend