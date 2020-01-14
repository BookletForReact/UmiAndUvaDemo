import {connect} from 'dva'

function Main(props) {
  
  return (
    <div></div>
  );
}
function mapStateToProps(state) {
  return {
    userId: state.user.userId
  }
}
export default connect(mapStateToProps)(Main);
