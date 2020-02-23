import React from 'react'
import Item from './item.js'

export default class TeamList extends React.Component {
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
    teamData: [
      {
        nick: 'web讨论组',
        time: 1582455895563,
        desc: '这是一些测试内容',
        avatar: 'https://app.yunxin.163.com/webdemo/im/images/advanced.png'
      }
    ]
  }
  componentDidMount() {

  }
  render() {
    const { teamToolData, teamData } = this.state
    return (
      <>
        {
          teamToolData.map((item, index) => (
            <Item key={index} data={item}></Item>
          ))
        }
        <div className="split-title">高级群</div>
        {
          teamData.map((item, index) => (
            <Item key={index} data={item}></Item>
          ))
        }
      </>
    )
  }
}


