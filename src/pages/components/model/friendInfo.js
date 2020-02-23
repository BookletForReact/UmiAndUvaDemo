import React from 'react'
import API from '@/network/api'
import { Avatar, Modal, Row, Col, Input, Button, Switch, message } from 'antd'
import DeleteFriend from './deleteFriend'
import style from './friendInfo.scss'

class FriendInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      infoData: props.infoData,
      profileInfo: {
        user: {}
      }
    }
  }

  showInfoModelFn = () => {
    /* TODO 不依赖父组件传递的信息 直接调取接口获取好友信息
     * fn GET /friendship/:friendId/profile
     * params friendId
    */
    // FIXME 接口貌似缺少部分字段信息 比如：邮箱号 消息提醒 黑名单状态等
    const profileInfo = { // MOCK
      "displayName": "Martin",
      "message": "你好，我是一杯水",
      "status": 10,
      "updatedAt": "2017-09-18",
      "updatedTime": "1560222477000",
      "msgNotify": true, // 消息提醒
      "blackList": false, // 黑名单
      "user": {
        "id": "slEcpCI63",
        "nickname": "一杯水",
        "region": "86",
        "portraitUri": "http://7xogjk.com1.z0.glb.clouddn.com/Fo6wxS7zzvGpwyAFhlpTUVirpOGh",
        "gender": "male", // 性别
        "stAccount": "b323422", // SealTalk 号
        "phone": "18701029999", // 手机号
        "birth": "2020-02-02",
        "email": "18701029999@163.com"
      }
    }
    this.setState((state, props) => ({
      profileInfo,
      visible: true
    }))
  }

  chatFn = () => {
    this.setState({
      visible: false
    })
  }

  saveFn = () => {
    /* TODO 
     * fn POST /friendship/set_display_name
     * params friendId && displayName
    */
  }

  addBlacklistFn = async (friendId) => {
    const { data: { code, msg } } = await API.addBlacklist({ friendId })
    if (code) return message.error(msg)
    message.success('添加成功！')
  }

  removeBlacklistFn = async (friendId) => {
    const { data: { code, msg } } = await API.removeBlacklist({ friendId })
    if (code) return message.error(msg)
    message.success('添加成功！')
  }

  operateFn = (status, type) => {
    const { id } = this.state.profileInfo.user
    status && type === 'blackList' ? this.addBlacklistFn(id) : this.removeBlacklist(id)
    this.setState((state) => ({
      profileInfo: Object.assign(state.profileInfo, { [type]: status })
    }))
  }

  changeDisplayNameFn = (event) => {
    const displayName = event.target.value
    this.setState((state) => ({
      profileInfo: Object.assign(state.profileInfo, { displayName })
    }))
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  render () {
    const { user } = this.state.infoData
    return (
      <div>
        <Avatar
          size="large"
          src={user.portraitUri}
          onClick={this.showInfoModelFn}/>
        <Modal
          wrapClassName="friendInfo"
          width="400px"
          visible={this.state.visible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <div className={style['friendInfo-body']}>
            <Row 
              type="flex"
              justify="space-around"
              align="middle"
              className={style['friendInfo-top']}>
              <Col span={5}>
              <Avatar
                size={64}
                src={this.state.profileInfo.user.portraitUri}/>
              </Col>
              <Col span={19}>
                <h4>{this.state.profileInfo.user.nickname}</h4>
                <p>账号：{this.state.profileInfo.user.id}</p>
                <p>昵称：{this.state.profileInfo.user.nickname}</p>
              </Col>
            </Row>
            <div className={style['friendInfo-info']}>
              <p className={style['friendInfo-info--p']}>
                <span className={style['friendInfo-info--title']}>备注名</span>
                <Input
                  className={style['friendInfo-info--input']}
                  value={this.state.profileInfo.displayName}
                  onChange={this.changeDisplayNameFn} />
                <Button
                   className={style['friendInfo-info--btn']}
                  type="primary"
                  size="small"
                  onClick={this.saveFn}>
                  保存
                </Button>
              </p>
              <p className={style['friendInfo-info--p']}>
                <span className={style['friendInfo-info--title']}>手机号</span>
                <span>{this.state.profileInfo.user.phone}</span>
              </p>
              <p className={style['friendInfo-info--p']}>
                <span className={style['friendInfo-info--title']}>生日</span>
                <span>{this.state.profileInfo.user.birth}</span>
              </p>
              <p className={style['friendInfo-info--p']}>
                <span className={style['friendInfo-info--title']}>邮箱</span>
                <span>{this.state.profileInfo.user.email}</span>
              </p>
            </div>
            <div className={style['friendInfo-operate']}>
              <p className={style['friendInfo-operate--p']}>
                <span className={style['friendInfo-info--title']}>消息提醒</span>
                <Switch checked={this.state.profileInfo.msgNotify} className={style['friendInfo-info--switch']} onChange={(status) => this.operateFn(status, 'msgNotify')} />
              </p>
              <p className={style['friendInfo-operate--p']}>
                <span className={style['friendInfo-info--title']}>黑名单</span>
                <Switch checked={this.state.profileInfo.blackList} className={style['friendInfo-info--switch']} onChange={(status) => this.operateFn(status, 'blackList')} />
              </p>
            </div>
            <div className={style['friendInfo-bottom']}>
              <DeleteFriend></DeleteFriend>
              {/* TODO：send msg */}
              <Button
                className={style['friendInfo-bottom--send']}
                type="primary">
                发送消息
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default FriendInfo
