import router from 'umi/router'
import React from 'react'
import instance from '../../network'
import {connect} from 'dva'
import styles from './left.scss'
import {Icon} from 'antd'

class LeftPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: {},
    }
  }

  componentDidMount() {
    if (!this.props.user.userId) {
      instance.get('user/get_token').then(res => {
        if (res.code === 200 && res.result.userId) {
          this.props.dispatch({type: 'user/info', userId: res.result.userId})
          this.getUserInfo()
        } else {
          router.push('/login')
        }
      }).catch(() => {
        router.push('/login')
      })
    } else {
      this.getUserInfo()
    }
  }

  getUserInfo = () => {
    instance.get(`/user/${this.props.user.userId}`).then((res) => {
      this.setState({
        userInfo: res.result
      })
      this.props.dispatch({type: 'user/userInfo', userInfo: res.result})
    }).catch(e => {
    })
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
  userLogout = (e) => {
    e.preventDefault()
    this.props.dispatch({type: 'user/info', userId: ''})
    instance.post('/user/logout').then(res => {
      router.push('/login')
    }).catch(() => {
      router.push('/login')
    })
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
        <div className={styles.switchPanel}>
          
        </div>
        <div className={`${styles.item}`}></div>
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
