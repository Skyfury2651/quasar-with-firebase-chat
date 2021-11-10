export default {
  users: state => {
    let userFiltered = {}
    Object.keys(state.users).forEach(key => {
      if (key !== state.userDetails.userId){
        userFiltered[key] = state.users[key]
      }
    })

    return userFiltered
  }
}
