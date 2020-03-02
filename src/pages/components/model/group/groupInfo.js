// 聊天框
import { Button } from 'antd'
import React from 'react'
import API from '@/network/api'
import './groupInfo.scss'

class GroupInfo extends React.Component {
  state = {
    show: true
  }

  toggle = () => {
    const { show } = this.state
    this.setState({
        show: !show
    })
  }
  render() {
    return (
      <div className="group-info">
        <div className="group-title">
            <Button type="primary" onClick={ this.toggle }>返回</Button>
            <span>资料</span>
        </div>
        {/* 群/组成员信息 */}
        <div className="friend-content">
            <span className="add-friend-to-group-icon">+</span>
            {

            }
        </div>
        {/* 群/组资料 */}
        <div className="group-info-detail">
            
        </div>
      </div>
    )
  }
}

export default GroupInfo