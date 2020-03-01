import { message } from 'antd'
import React from 'react'
import Item from './item.js'
import API from '@/network/api'
import AddGroup from '../group/addGroup.js'

export default class TeamList extends React.Component {
  constructor () {
    super()
    // this.teamToolDataClicked = this.teamToolDataClicked.bind(this)
  }
  state = {
    teamToolData: [
      {
        nick: '创建讨论组',
        type: 'single',
        avatar: require('@/assets/images/addTeam.png')
      },
      {
        nick: '创建高级群',
        type: 'single',
        avatar: require('@/assets/images/addTeam.png')
      },
      {
        nick: '搜索高级群',
        type: 'single',
        avatar: require('@/assets/images/searchTeam.png')
      }
    ],
    teamData: [],
    mockData: {
      code: 200,
      result: {
        list: [
            {
              id: 'kFpN4KiZn',
              name: 'ceshiqunzu',
              portraitUri: 'https://app.yunxin.163.com/webdemo/im/images/advanced.png',
              creatorId: 'kFpN4KiZn',
              memberCount: 2,
              maxMemberCount: 500,
              memberProtection: 0,
              createdAt: '2019-06-17T10:06:26.000Z',
              updatedAt: '2019-06-17T10:06:26.000Z',
              updatedTime: 1560765986000,
              createdTime: 1560765986000
            }
          ],
          total: 4,
          limit: 1,
          offset: 0
      }
    },
    showAddPane: false
  }
  async componentDidMount() {
    this.getUserGroups()
  }
  
  getUserGroups = async () => {
    const { result } = await API.getUserGroups()
    // const result = this.state.mockData.result
    const { list } = result
    const newList = list.map((item) => {
      item.avatar = item.portraitUri
      item.nick = item.name
      item.type = 'single'
      return item
    })
    this.setState({
      teamData: newList
    })
  }
  teamToolDataClicked = (index) => {
    switch(index) {
      case 0:
      case 1:
        this.togglePane()
        break;
      default:
        break;
    }
  }
  togglePane () {
    const { showAddPane } = this.state
    this.setState({
      showAddPane: !showAddPane
    })
  }
  async createGroup(ids) {
    debugger
    const { code, result } = await API.createGroup({ memberIds: ids })
    if (code === 200 && result.length > 0) {
      message.success('群组创建成功')
    } else {
      message.error('创建群组失败')
    }
  }
  render() {
    const { teamToolData, teamData, showAddPane } = this.state
    return (
      <>
        {
          teamToolData.map((item, index) => (
            <Item key={index} data={item} itemClick={() => this.teamToolDataClicked(index)}></Item>
          ))
        }
        <div className="split-title">高级群</div>
        {
          teamData.map((item, index) => (
            <Item key={index} data={item}></Item>
          ))
        }
        {
          showAddPane ? <AddGroup okConfirm={() => this.createGroup()}></AddGroup> : null
        }
      </>
    )
  }
}


