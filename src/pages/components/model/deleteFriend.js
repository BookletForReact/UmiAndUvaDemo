// 删除好友
import { Modal, Button } from 'antd'
import React from 'react'

class DeleteFriend extends React.Component {
  state = {
    visible: false,
  }


  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleOk = () => {
    /* TODO
     * fn POST/friendship/delete
     * params friendId
    */
    alert(this.state.account)
    this.initData()
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }

  render() {
    const { visible } = this.state
    return (
      <span>
        <Button type="danger" onClick={this.showModal}>
          删除好友
        </Button>
        <Modal
          width="25%"
          title="提示"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
          <p>是否确认删除该好友</p>
        </Modal>
      </span>
    )
  }
}

export default DeleteFriend