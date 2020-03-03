// 聊天框
import { connect } from 'dva'
import { message } from 'antd'
import React from 'react'
import API from '@/network/api'
import './groupFriends.scss'
import AddGroup from './addGroup'

const defaultUrl = require('@/assets/images/default-icon.png')
const ROLE = {
    SELF: 0,
    MEMBER: 1,
    MANAGER: 2
}
class GroupFriends extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showAddPane: false, // 是否展示添加好友面板
            friendList: [], // 当前群所有成员列表
            origionList: [],
            mockData1:{
                code: 200,
                result: [
                    {
                        groupNickname: "hi", //群成员昵称
                        role: 0,  // 1 为成员, 0 为群主, 2 为管理员
                        createdAt: "2016-11-22T03:06:13.000Z",
                        createdTime: 1560222249000,
                        updatedAt: "2016-11-22T03:06:13.000Z",
                        updatedTime: 1560222249000,
                        user: {
                            id: "xNlpDTUmw",
                            nickname: "zl01", //用户昵称
                            portraitUri: "",
                            gender: "male", // 性别
                            stAccount: "b323422", // SealTalk 号
                            phone: "18701029999" // 手机号
                        }
                    },{
                        groupNickname: "hi", //群成员昵称
                        role: 1,  // 1 为成员, 0 为群主, 2 为管理员
                        createdAt: "2016-11-22T03:06:13.000Z",
                        createdTime: 1560222249000,
                        updatedAt: "2016-11-22T03:06:13.000Z",
                        updatedTime: 1560222249000,
                        user: {
                            id: "xNlpDTUmw",
                            nickname: "zl01", //用户昵称
                            portraitUri: "",
                            gender: "male", // 性别
                            stAccount: "b323422", // SealTalk 号
                            phone: "18701029999" // 手机号
                        }
                    },{
                        groupNickname: "lalala", //群成员昵称
                        role: 1,
                        createdAt: "2016-11-22T03:14:09.000Z",
                        createdTime: 1560222249000,
                        updatedAt: "2016-11-22T03:14:09.000Z",
                        updatedTime: 1560222249000,
                        user: {
                            id: "h6nEgcPC7",
                            nickname: "zl02",
                            portraitUri: "",
                            gender: "male", // 性别
                            stAccount: "b323422", // SealTalk 号
                            phone: "18701029999" // 手机号
                        }
                    }]
                }
        }
     }

     async componentDidMount () {
        // 获取当前的 groupId
        if (!this.props.groupId) {
            this.props.dispatch({ type: 'group/getId' })
        }
        // 获取群信息
        this.getGroupMemebers()
    }

    // 获取群成员
    getGroupMemebers = async () => {
        const { code, result } = this.state.mockData1 // await API.getGroupMemebers(this.props.groupId)
        if (code === 200 && result.length > 0) {
            const friendList = result.map((item) => {
                item.showMoveBtn = false
                return item
            })
            this.setState({
                friendList,
                origionList: JSON.parse(JSON.stringify(friendList))
            })
        } else {
            message.error('未知群组')
        }
    }

    // 鼠标移过展示移除标签
    mouseOverFn = (item, index) => {
        const {
            role
        } = item
        if (role === ROLE.SELF || role === ROLE.MANAGER) {
            return
        }
        item.showMoveBtn = true
        const { origionList } = this.state
        const list = JSON.parse(JSON.stringify(origionList))
        list.splice(index, 1, item)
        this.setState({
            friendList: list
        })
    }
    // 移除好友
    removeFriend = async (item, index) => {
        const { groupId } = this.props
        const { id } = item.user
        const { code } = await API.groupMemberKick({ groupId, memberIds: [id]})
        if (code === 200) {
            message.success('操作成功')
            // 更新好友列表
            this.getGroupMemebers()
        } else {
            message.error('操作失败，请稍后重试')
        }
    }
    
    resetList = () => {
        const { origionList } = this.state
        const list = JSON.parse(JSON.stringify(origionList))
        this.setState({
            friendList: list
        })
    }

    togglePane = () => {
        const { showAddPane } = this.state
        this.setState({
            showAddPane: !showAddPane
        })
    }
    confirmFn = () => {
        this.togglePane()
        // 更新好友列表
        this.getGroupMemebers()
    }

    render() {
        const { showAddPane, friendList } = this.state
        return (
            <div className="friend-content">
                <span className="add-friend-to-group-icon" onClick={() => this.togglePane()}>+</span>
                {
                    friendList.map((item, index) => (
                        <div className="friend-item" key={index} onMouseOver={() => this.mouseOverFn(item, index)} onMouseLeave={() => this.resetList()}>
                            <img className="img" src={item.user.portraitUri || defaultUrl} />
                            <span className="nick-name">{item.user.nickname}</span>
                            {
                                item.role === 0 ? <i className="icon radius-circle icon-user"></i> : null
                            }
                            {
                                item.showMoveBtn ? 
                                    <span className="hover" onClick={() => this.removeFriend(item, index)}>移除</span>
                                 : null
                            }
                        </div>
                    ))
                }
                {
                    showAddPane ? <AddGroup okConfirm={() => this.confirmFn()}></AddGroup> : null
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        groupId: state.group.groupId
    }
}
export default connect(mapStateToProps)(GroupFriends);
