import SessionList from './model/tab/sessionList.js'
import FriendList from './model/tab/friendList.js'
import TeamList from './model/tab/teamList.js'

export const tabList = [
  { mark: 'session', checked: true },
  { mark: 'friend', checked: false },
  { mark: 'team', checked: false }
]

export const tabContentMap = {
  session: () => <SessionList></SessionList>,
  friend: () => <FriendList></FriendList>,
  team: () => <TeamList></TeamList>,
}