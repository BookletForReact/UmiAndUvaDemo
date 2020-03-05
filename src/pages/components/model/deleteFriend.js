// 删除好友
import { Modal, Button, message } from 'antd'
import React from 'react'
import API from '@/network/api'

const { confirm } = Modal

class DeleteFriend extends React.Component {
  state = {
    visible: false,
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  deleteFriendFn = async (friendId) => {
    confirm({
      title: '删除好友',
      content: '是否要删除好友？',
      okText: '确定',
      cancelText: '取消',
      async onOk() {
        const { data: { code, msg } } = await API.addBlacklist({ friendId })
        if(code) return message.error(msg)
        message.success('删除成功！')
        this.initData()
    },
      onCancel() {},
    });
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
          onOk={this.deleteFriendFn}
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