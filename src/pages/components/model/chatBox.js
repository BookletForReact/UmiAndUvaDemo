// 聊天框
import React from 'react'
import './chatBox.scss'
import GroupInfo from '../model/group/groupInfo'
import {connect} from 'dva'
const namespace = 'chat'

class ChatBox extends React.Component {
  constructor(props) {
    super(props)
  }

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
    const { currentMessage } = this.props
    const { showInfo } = this.state
    return (
      <div className="chat_box">
        <div className="chat_box-title">
          <div className="chat_box-title_info">
            <div className="chat_box-title_avatar">
              <img src="" alt="avatar" />
            </div>
            <div className="chat_box-title_name">
              {currentMessage.nick}
            </div>
          </div>
          <div className="chat_box-team_info" data-team-id="" id="teamInfo" onClick={() => this.toggleInfo()}>
              <i className="icon icon-team-info"></i>
              <p>资料</p>
          </div>
        </div>
        {
            showInfo ? 
                <GroupInfo confirmCallback={() => this.toggleInfo()}></GroupInfo>
                : null
        }
        <div className="chat_box-content">
          <div className="chat_box-item_other">
            <div className="chat_box-item_avatar">
              <img src="" alt="avatar" />
            </div>
            <div className="chat_box-item_message">
            
            </div>
          </div>
          <div className="chat_box-item_self">
            <div className="chat_box-item_message">
            
            </div>
            <div className="chat_box-item_message">
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect((state) => state[namespace])(ChatBox)