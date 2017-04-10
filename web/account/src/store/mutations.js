/**
 * Created by fengzy on 2016/10/11.
 */
export default {
  LOGON (state, {user}) {
    state.isLogon = true
    state.user = user
  },
  LOGOUT (state) {
    state.isLogon = false
    state.user = {}
  }
}
