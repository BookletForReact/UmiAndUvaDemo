// 聊天框
import { connect } from 'dva'
import { message, Input, Radio, Icon } from 'antd'
import React from 'react'
import API from '@/network/api'
import './groupDetail.scss'
const defaultUrl = require('@/assets/images/default-icon.png')

class GroupDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            info: {}, // 群信息
            mockData: {
                code: 200,
                result: {
                    id: "KC6kot3ID",
                    name: "RongCloud",
                    portraitUri: "",
                    memberCount: 13,
                    maxMemberCount: 500,
                    creatorId: "I8cpNlo7t",
                    type: 1,
                    bulletin: "群公告",
                    bulletinTime: 1560931403360,
                    deletedAt: null,
                    isMute: 1, // 0 关闭全员禁言、 1 开启全员禁言
                    certiStatus: 0, // 0 关闭群认证、 1 开启群认证
                    memberProtection:0 // 0 关闭群成员保护模式、 1开启群成员保护模式
                }
            }
        }
     }

     async componentDidMount () {
        // 获取当前的 groupId
        if (!this.props.groupId) {
            this.props.dispatch({ type: 'group/getId' })
        }
        // 获取群信息
        this.getGroupInfo()
    }

    // 获取群信息
    getGroupInfo = async () => {
        const { groupId } = this.props
        const { code, result } = this.state.mockData // await API.getGroupInfo(groupId)
        if (code === 200) {
            this.setState({
                info: result
            })
        } else {
            message.error('获取群消息失败，请稍后重试')
        }
    }

    blurFn = async (e) => {
        this.updateGroupName(e.target.value)
    }

    updateGroupName = async (name) => {
        const { groupId } = this.props
        const { code } = await API.groupRename({ name, groupId })
        if (code === 200) {
            message.success('群名称修改成功')
        } else {
            message.error('群名称修改失败，请稍后重试')
        }
    }
    render() {
        const { info } = this.state
        const suffix = <span className="icon icon-write"></span>
        return (
            <div className="group-info-detail">
                <div className="group-info-row with-img">
                    <img className="img" src={info.portraitUri || defaultUrl} />
                    <span>{info.creatorId}</span>
                </div>
                <div className="group-info-row">
                    <span className="group-info-fixed-text">名称</span>
                    <Input suffix={suffix} placeholder={info.name} defaultValue={info.name} onBlur={this.blurFn} />
                </div>
                <div className="group-info-row">
                    <span className="group-info-fixed-text">介绍</span>
                    <Input suffix={suffix} placeholder={info.bulletin} defaultValue={info.bulletin} />
                </div>
                <div className="group-info-row">
                    <span className="group-info-fixed-text">身份验证</span>
                    <Radio.Group value={2} disabled>
                        <Radio value={1}>不需要验证</Radio>
                        <Radio value={2}>需要验证</Radio>
                        <Radio value={3}>禁止任何人加入</Radio>
                    </Radio.Group>
                </div>
                <div className="group-info-row">
                    <span className="group-info-fixed-text">邀请他人权限</span>
                    <Radio.Group value={1} disabled>
                        <Radio value={1}>管理员</Radio>
                        <Radio value={2}>所有人</Radio>
                    </Radio.Group>
                </div>
                <div className="group-info-row">
                    <span className="group-info-fixed-text">群资料修改权限</span>
                    <Radio.Group value={1} disabled>
                        <Radio value={1}>管理员</Radio>
                        <Radio value={2}>所有人</Radio>
                    </Radio.Group>
                </div>
                <div className="group-info-row">
                    <span className="group-info-fixed-text">被邀请人身份验证</span>
                    <Radio.Group value={1} disabled>
                        <Radio value={1}>需要验证</Radio>
                        <Radio value={2}>不需要验证</Radio>
                    </Radio.Group>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        groupId: state.group.groupId
    }
}
export default connect(mapStateToProps)(GroupDetail);
