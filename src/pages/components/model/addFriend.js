// 添加好友
import { Modal, Button, Input } from 'antd'
import React from 'react'

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

  handleOk = () => { 
    if (!this.state.account.trim()) {
      return false
    }
    /* TODO
     * fn POST /friendship/invite
     * params friendId
    */
    alert(this.state.account)
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
          onOk={this.handleOk}
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