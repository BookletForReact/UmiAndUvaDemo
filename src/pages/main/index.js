import React from 'react'
import router from 'umi/router'
import styles from './index.scss'
import instance from '../../network'
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

    getUserInfo = () => {
        instance.get(`/user/${this.props.userId}`).then((res) => {
            console.log(res);
            const {
                nickname,
                portraitUri,
                gender,
                phone,
            } = res.result;
            console.log(`${nickname} ${portraitUri} ${gender} ${phone}`);
            this.props.dispatch({type: 'user/userInfo'});
        }).catch(e => {
        })
    }
  
    handleLogout = (event) => {
        instance.post('/user/logout').then(() => {
            router.push('/login')
        }).catch(e => {
            this.setState({
                wrongPassword: true
            })
        })
        event.preventDefault()
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
