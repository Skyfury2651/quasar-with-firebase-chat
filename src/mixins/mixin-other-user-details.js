export default {
  computed: {
    otherUserDetails() {
      return this.$store.state.user.users[this.$route.params.otherUserId]
    }
  }
}
