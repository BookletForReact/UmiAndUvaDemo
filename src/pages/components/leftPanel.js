import router from 'umi/router'
import React from 'react'
import {connect} from 'dva'
import styles from './left.scss'
import {Icon} from 'antd'
import API from '@/network/api'
import TabSplit from './tabSplit'

class LeftPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: {},
    }
  }

  async componentDidMount() {
    if (!this.props.user.userId) {
      try {
        const { code, result } = await API.getToken()
        if (code === 200 && result.userId) {
          this.props.dispatch({ type: 'user/info', userId: result.userId })
          this.getUserInfo()
        } else {
          router.push('/login')
        }
      } catch (error) {
        // router.push('/login')
      }
    } else {
      this.getUserInfo()
    }
  }

  getUserInfo = async () => {
    const { result } = await API.getUserId(this.props.user.userId)
    this.setState({
      userInfo: result
    })
    this.props.dispatch({ type: 'user/userInfo', userInfo: result })
}

  
  // 编辑个人信息
  handleShowEditUser = () => {
    this.setState({
      showEditUser: true
    })
  }
  closeEditUser = () => {
    this.setState({
      showEditUser: false
    })
  }
  // 退出
  userLogout = async (e) => {
    e.preventDefault()
    this.props.dispatch({type: 'user/info', userId: ''})
    await API.logout()
    router.push('/login')
  }
  
  render() {
    // const {userInfo, sessionsList, friendsList, teamsList} = this.props;
    return (
      <div className={styles.leftPanel}>
        <div className={styles.title}>
          <img src={this.state.userInfo.portraitUri ? this.state.userInfo.portraitUri : require('../../assets/images/default-icon.png')} alt="" width="56" height="56" className="radius-circle avatar"/>
          <span className={styles.userName}>{this.state.userInfo.nickname}</span>
          <span><Icon type="edit" className={styles.cursor} onClick={this.handleShowEditUser}/>
            {/* <i onClick={this.handleShowEditUser} className={`${styles.cursor} ${'fa fa-pencil'}`}></i> */}
          </span>
          <a href="void(0);" onClick={this.userLogout} className={styles.exit}>退出</a>
        </div>
        <TabSplit></TabSplit>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(LeftPanel);
