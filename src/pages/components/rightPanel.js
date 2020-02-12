import {connect} from 'dva'
import AddFriend from './model/addFriend'
import FriendInfo from './model/friendInfo'

function Main() {
  // 接口貌似缺少部分字段信息 比如：邮箱号 消息提醒 黑名单状态等
  const mockInfoData = {
		"displayName": "Martin",
		"message": "你好，我是一杯水",
		"status": 10,
		"updatedAt": "2017-09-18",
		"updatedTime": "1560222477000",
		"user": {
			"id": "slEcpCI63",
			"nickname": "一杯水",
			"region": "86",
			"portraitUri": "http://7xogjk.com1.z0.glb.clouddn.com/Fo6wxS7zzvGpwyAFhlpTUVirpOGh",
			"gender": "male", // 性别
      "stAccount": "b323422", // SealTalk 号
      "phone": "18701029999" // 手机号
		}
	}
  return (
    <div>
      <AddFriend></AddFriend>
      <FriendInfo infoData={mockInfoData}></FriendInfo>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    userId: state.user.userId
  }
}

export default connect(mapStateToProps)(Main);
