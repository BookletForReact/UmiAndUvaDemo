import { stat } from "fs";

export default {
  namespace: 'group',
  state: {
    groupId: ''
  },
  reducers: {
    // 修改 groupId
    id (state, { groupId }) {
      console.log(`------------id: ${groupId}`)
      return Object.assign(state, { groupId })
    },
    getId (state) {
        console.log(`------------getId: ${state.groupId}`)
        return state.groupId
    }
  }
}