import router from 'umi/router'
import instance from '../network'
import {connect} from 'dva'

function Main(props) {
  if (!props.userId) {
    instance.get('user/get_token').then(res => {
      if (res.code === 200 && res.result.userId) {
        props.dispatch({type: 'user/info', userId: res.result.userId})
        router.push('/')
      } else {
        router.push('/login')
      }
    })
  }
  return (
    <div>
      main
    </div>
  );
}
function mapStateToProps(state) {
  return {
    userId: state.user.userId
  }
}
export default connect(mapStateToProps)(Main);
