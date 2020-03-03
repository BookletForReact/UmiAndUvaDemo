// 聊天框
import React from 'react'
import './chatBox.scss'
import GroupInfo from '../model/group/groupInfo'

class ChatBox extends React.Component {
  state = {
    showInfo: false
  }

  toggleInfo = () => {
    const { showInfo } = this.state
    this.setState({
        showInfo: !showInfo
    })
  }
  render() {
    const { showInfo } = this.state
    return (
      <div className="chat-box">
        <div className="title">
            <div className="team-info tc radius4px" data-team-id="" id="teamInfo" onClick={() => this.toggleInfo()}>
                <i className="icon icon-team-info"></i>
                <p>资料</p>
            </div>
        </div>
        {
            showInfo ? 
                <GroupInfo confirmCallback={() => this.toggleInfo()}></GroupInfo>
                : null
        }
      </div>
    )
  }
}

export default ChatBox