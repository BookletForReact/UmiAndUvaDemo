import React from 'react'
import './index.scss'

class TabList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectTab: 1
    }
  }

  switchTab = (event, type) => {
      this.setState({
        selectTab: type
      })
      event.preventDefault()
      this.props.tabChange(type)
  }
  
  render() {
    return (
        <div className="list">
            <a href="javascript(0):;" onClick={(event) => {this.switchTab(event, 1)}}>
                <i className={`${this.state.selectTab === 1 ? 'blue' : 'gray'} ${'fa fa-user-circle'}`}></i>
                <span className={`${this.state.selectTab === 1 ? 'trangle' : ''}`}></span>
            </a>
            <a href="javascript(0):;" onClick={(event) => {this.switchTab(event, 2)}}>
                <i className={`${this.state.selectTab === 2 ? 'blue' : 'gray'} ${'fa fa-user'}`}></i>
                <span className={`${this.state.selectTab === 2 ? 'trangle' : ''}`}></span>
            </a>
            <a href="javascript(0):;" onClick={(event) => {this.switchTab(event, 3)}}>
                <i className={`${this.state.selectTab === 3 ? 'blue' : 'gray'} ${'fa fa-users'}`}></i>
                <span className={`${this.state.selectTab === 3 ? 'trangle' : ''}`}></span>
            </a>
        </div>
    )
  }
}

export default TabList
