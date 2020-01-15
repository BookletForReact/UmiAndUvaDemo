import React from 'react'
import ReactDom from 'react-dom'
import {Icon} from 'antd'
import instance from '../../network'

class EditUser extends React.Component {
  constructor(props) {
    super(props)
    this.container = document.createElement('div')
    document.body.appendChild(this.container)
    this.state = {
      userInfo: {
        nickname: '',
        gender: '',
        portraitUri: ''
      },
      isEdit: false
    }
  }
  // 处理表单变化
  handleChange = (e) => {
    let data = this.state.userInfo
    data[e.target.name] = e.target.value
    this.setState({
      userInfo: data
    })
  }
  // 编辑切换状态
  changeEdit = () => {
    this.setState({
      isEdit: !this.state.isEdit
    })
    if (!this.state.isEdit) {
      this.setState({
        userInfo: JSON.parse(JSON.stringify(this.props.origin))
      })
    }
  }
  // 保存
  changeSave = () => {
    let promises = []
    const cur = this.state.userInfo
    const origin = this.props.origin
    // 判断是否有变化
    if (cur.nickname && cur.nickname !== origin.nickname) {
      promises.push(instance.post('/user/set_nickname', {
        nickname: cur.nickname
      }))
    }
    if (cur.gender && cur.gender !== origin.gender) {
      promises.push(instance.post('/user/set_gender', {
        gender: cur.gender
      }))
    }
    if (cur.portraitUri !== origin.portraitUri) {
      promises.push(instance.post('/user/set_portrait_uri', {
        portraitUri: cur.portraitUri
      }))
    }
    Promise.all(promises).then(res => {
      if (promises.length) {
        // 更新值
        this.props.onInfoChange()
      }
      this.setState({
        isEdit: false
      })
    })
  }

  componentWillUnmount() {
    document.body.removeChild(this.container)
  }

  render() {
    return ReactDom.createPortal(
      <div className="mask">
        <div className="modal-default edit-user">
          <Icon type="close" className="icon-close" onClick={this.props.onClose}/>
          <div className="u-info">
            <img className="u-icon" src={this.props.origin.portraitUri ? this.props.origin.portraitUri : require('../../assets/images/default-icon.png')} alt="" />
            <div className="desc">
              <p className="nickname">{this.props.origin.nickname}</p>
              <p className="account">账号：{this.props.origin.phone}</p>
            </div>
          </div>
          <div className="infos">
            <div className="operate">
              <span className={`${'edit'} ${this.state.isEdit ? 'hide' : ''}`} onClick={this.changeEdit}>编辑</span>
              <span className={`${'save'} ${this.state.isEdit ? '' : 'hide'}`} onClick={this.changeSave}>保存</span>
              <span className={`${'cancel'} ${this.state.isEdit ? '' : 'hide'}`} onClick={this.changeEdit}>取消</span>
            </div>
            <div className="">基本信息</div>
            <div className={`${'showInfo'} ${this.state.isEdit ? 'hide' : ''}`}>
              <div className="items">
                <div className="item">手机</div>
                <div className="item-vlaue">{this.props.origin.phone}</div>
              </div>
              <div className="items">
                <div className="item">性别</div>
                <div className="item-vlaue">{this.props.origin.gender === 'male' ? '男' : '女'}</div>
              </div>
            </div>
            <div className={`${'showInfo editInfo'} ${this.state.isEdit ? '' : 'hide'}`}>
              <div className="items">
                <div className="item">昵称</div>
                <input type="text" className="item-input" name="nickname" value={this.state.userInfo.nickname} onChange={this.handleChange}/>
              </div>
              <div className="items">
                <div className="item">头像</div>
                <input type="text" className="item-input" name="portraitUri" value={this.state.userInfo.portraitUri} onChange={this.handleChange}/>
              </div>
              <div className="items">
                <div className="item">性别</div>
                <select name="gender" value={this.state.userInfo.gender} onChange={this.handleChange}>
                  <option value="female">女</option>
                  <option value="male">男</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>,
      this.container
    )
  }
}

export default EditUser