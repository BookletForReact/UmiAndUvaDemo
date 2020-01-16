import React from 'react'
import Link from 'umi/link'
import styles from './index.scss'
import {connect} from 'dva'
import {Icon} from 'antd'

const namespace = 'user'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: ''
    }
  }

  handleChange = (event) => {
    const { target } = event
    this.setState({
      [target.name]: target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const payload = {
      region: '86',
      phone: this.state.name,
      password: this.state.password
    }
    this.props.dispatch({type: 'user/login', payload})
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
            <div className={`${styles['error-msg']} ${this.props.wrongPassword ? '' : styles.hide}`}>密码错误</div>
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

export default connect((state) => state[namespace])(Login)
