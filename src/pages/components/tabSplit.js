// import { Modal, Button, message } from 'antd'
import React from 'react'
// import API from '@/network/api'
import { tabList, tabContentMap } from './config.js'
import './tabSplit.scss'

export default class TabSplit extends React.Component {
  state = {
    tabList,
    currentTabMark: 'session'
  }

  changeTheTab (index, mark) {
    const newTabList = this.state.tabList.map(v => {
      v.checked = false
      return v
    })
    newTabList[index].checked = true
    this.setState({ currentTabMark: mark, tabList: newTabList })
  }

  render() {
    const { tabList, currentTabMark } = this.state
    return (
      <>
        <div className="tab">
          {
            tabList.map((item, index) => {
              return (
                <div key={index} className={`tab-item ${item.checked ? 'current' : ''}`} onClick={() => this.changeTheTab(index, item.mark)}>
                  <span className={`icon icon-${item.mark}`}></span>
                </div>
              )
            })
          }
        </div>
        <div className="tab-content">
          {
            tabContentMap[currentTabMark]()
          }
        </div>
      </>
    )
  }
}