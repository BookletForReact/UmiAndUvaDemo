import React from 'react'
import router from 'umi/router'
import styles from './index.scss'
import API from '@/network/api'
import { connect } from 'dva'

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount () {
        console.log('componentDidMount');
        this.props.dispatch({type: 'user/info'});
        this.getUserInfo();
    }

    getUserInfo = async () => {
        const res = await API.getUserId(this.props.userId)
        const {
            nickname,
            portraitUri,
            gender,
            phone,
        } = res.result;
        console.log(`${nickname} ${portraitUri} ${gender} ${phone}`);
        this.props.dispatch({type: 'user/userInfo'});
    }
  
    handleLogout = async event => {
        event.preventDefault()
        try {
            await API.logout()
            router.push('/login')
        } catch (error) {
            this.setState({
                wrongPassword: true
            })
        }
    }
  
    render() {
        return (
            <div className={styles['container-main']}>
                <div className={styles['logout-btn']} onClick={this.handleLogout}>退出登录</div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
      userId: state.user.userId
    }
}
export default connect(mapStateToProps)(Main);
// export default Main
