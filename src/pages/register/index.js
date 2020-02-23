import React from 'react';
import router from 'umi/router'
import Link from 'umi/link'
import styles from './index.scss';

import instance from '@/network'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      phone: '',
      name: '',
      password: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    instance.post('/user/send_code', {
      region: '86',
      phone: this.state.phone
    }).then(res => {
      instance.post('/user/verify_code', {
        region: '86',
        phone: this.state.phone,
        code: '9999'
      }).then(res => {
        instance.post('/user/register', {
          nickname: this.state.name,
          password: this.state.password,
          verification_token: res.result.verification_token
        }).then(res => {
          router.push('/login')
        })
      })
    })
    event.preventDefault()
  }

  render() {
    return (
      <div className={`${styles['container-login']} ${styles['container-register']}`}>
        <form onSubmit={this.handleSubmit}>
          <div className={styles.row}>
            <span className={styles['input-tip']}>
              手机号：
            </span>
            <input type="text" value={this.state.phone} name="phone" onChange={this.handleChange}/>
          </div>
          <div className={styles.row}>
            <span className={styles['input-tip']}>
              昵&nbsp;&nbsp;&nbsp;&nbsp;称：
            </span>
              <input type="text" value={this.state.name} name="name" onChange={this.handleChange}/>
          </div>
          <div className={styles.row}>
            <span className={styles['input-tip']}>
              密&nbsp;&nbsp;&nbsp;&nbsp;码：
            </span>
              <input type="password" value={this.state.password} name="password" onChange={this.handleChange}/>
          </div>
          <div className={`${styles.row} tc`}>
            <input type="submit" className={`${styles.btn} ${styles['btn-login']}`} value="注册"/>
          </div>
        </form>
        <div className={styles['user-redirect']}><Link to="/login">已有账号？直接登录</Link></div>
      </div>
    )
  }
}

export default Register;
