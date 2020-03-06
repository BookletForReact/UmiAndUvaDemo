// 聊天框
import React from 'react'
import {connect} from 'dva'
import './chatBox.scss'
import GroupInfo from '../model/group/groupInfo'
import { setLongScrollTop } from './config'

const namespace = 'chat'

class ChatBox extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    showInfo: false,
    sendContent: ''
  }

  componentDidMount() {
    
  }
  
  toggleInfo = () => {
    const { showInfo } = this.state
    this.setState({ showInfo: !showInfo })
  }

  inputChange = (e) => {
    this.setState({ sendContent: e.target.value })
  }

  sendHandle = () => {
    this.props.dispatch({ type: `${namespace}/sendMessage`, payload: this.state.sendContent })
    this.setState({ sendContent: '' })
    setLongScrollTop()
  }

  render() {
    const { currentMessage } = this.props
    const { showInfo, sendContent } = this.state
    const avatarUrl = 'https://app.yunxin.163.com/webdemo/im/images/default-icon.png'

    return (
      Object.keys(currentMessage).length ?
      <div className="chat_box">
        <div className="chat_box-title">
          <div className="chat_box-title_info">
            <div className="chat_box-title_avatar">
              <img src={currentMessage.avatar} alt="avatar" />
            </div>
            <div className="chat_box-title_name">
              {currentMessage.nick}
            </div>
          </div>
          <div className="chat_box-team_info" data-team-id="" id="teamInfo" onClick={this.toggleInfo}>
              <i className="icon icon-team-info"></i>
              <p>资料</p>
          </div>
        </div>
        {
            showInfo ? 
                <GroupInfo confirmCallback={() => this.toggleInfo()}></GroupInfo>
                : null
        }
        <div className="chat_box-content" id="chat-box">
          { 
            currentMessage.chatList.map((item, index) => (
              <div className="chat_box-item" key={index}>
                { item.isSelf ?
                  <div className="chat_box-item_self">
                    <div className="chat_box-item_self_text">
                      <div className="chat_box-item_message chat_box-item_self_message">{item.message}</div>
                    </div>
                    <div className="chat_box-item_avatar">
                      <img src={item.avatar || avatarUrl} alt="avatar" />
                    </div>
                  </div>
                  :
                  <div className="chat_box-item_other">
                    <div className="chat_box-item_avatar">
                      <img src={item.avatar || avatarUrl} alt="avatar" />
                    </div>
                    <div className="chat_box-item_other_text">
                      <div className="chat_box-item_other_name">{item.nick}</div>
                      <div className="chat_box-item_message chat_box-item_other_message">{item.message}</div>
                    </div>
                  </div>
                }
              </div>
            ))
          }
        </div>
        <div className="chat_box-footer">
          <div className="chat_box-emoji_wrap">
            <span className="chat_box-emoji"></span>
          </div>
          <div className="chat_box-input_wrap">
            <input value={sendContent} className="chat_box-input" onChange={this.inputChange} />
          </div>
          <div className="chat_box-btn_wrap">
            <button className="chat_box-btn" onClick={this.sendHandle}>发送</button>
          </div>
        </div>
      </div>
      : null
    )
  }
}

export default connect((state) => state[namespace])(ChatBox)