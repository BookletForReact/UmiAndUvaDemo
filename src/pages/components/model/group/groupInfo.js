import { Button } from 'antd'
import React from 'react'
import './groupInfo.scss'
import GroupFriends from './groupFriends'
import GroupDetail from './groupDetail'

export default class GroupInfo extends React.Component {
    constructor(props) {
        super(props)
    }

    toPrev = () => {
        this.props.confirmCallback()
    }
    render() {
        return (
            <div className="group-info">
                <div className="group-title">
                    <Button type="primary" onClick={ this.toPrev }>返回</Button>
                    <span>资料</span>
                </div>
                {/* 群/组成员信息 */}
                <GroupFriends></GroupFriends>
                {/* 群/组资料 */}
                <GroupDetail></GroupDetail>
            </div>
        )
    }
}
