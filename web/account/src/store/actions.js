
export const logon = ({commit}, payload) => {
  console.log('payload')
  console.log(payload)
  commit('LOGON', payload)
}
export const logout = ({commit}) => {
  commit('LOGOUT')
}
