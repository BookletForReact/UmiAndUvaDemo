import React from 'react'
import Link from 'umi/link'
import router from 'umi/router'
import styles from './index.scss'
import instance from '../../network'
import {connect} from 'dva'
import {Icon} from 'antd'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: '',
      wrongPassword: false
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    instance.post('/user/login', {
      region: '86',
      phone: this.state.name,
      password: this.state.password
    }).then(res => {
      this.props.dispatch({type: 'user/info', userId: res.result.id})
      router.push('/main')
    }).catch(e => {
      this.setState({
        wrongPassword: true
      })
    })
    event.preventDefault()
  }

  render() {
    return (
      <div className={styles['container-login']}>
        <form onSubmit={this.handleSubmit}>
          <div className={styles.row}>
            <span className={styles.icon}>
              {/* <i className={`${styles.fa} ${'fa fa-user'}`}></i> */}
              <Icon type="user" className={`${styles.fa}`}/>
            </span>
            <input type="text" value={this.state.name} name="name" onChange={this.handleChange}/>
          </div>
          <div className={styles.row}>
            <span className={styles.icon}>
              <Icon type="lock" className={styles.fa} />
              {/* <i className={`${styles.fa} ${'fa fa-lock'}`}></i> */}
              <input type="password" value={this.state.password} name="password" onChange={this.handleChange}/>
            </span>
          </div>
          <div className={styles.row}>
            <div className={`${styles['error-msg']} ${this.state.wrongPassword ? '' : styles.hide}`}>密码错误</div>
          </div>
          <div className={styles.row}>
            <input type="submit" className={`${styles.btn} ${styles['btn-login']}`} vlaue="登录"/>
          </div>
        </form>
        <div className={styles['user-redirect']}><Link to="/register">注册</Link></div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    userId: state.user.userId
  }
}
export default connect(mapStateToProps)(Login);
// export default Login
