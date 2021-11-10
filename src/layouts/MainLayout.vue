<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="$route.fullPath.includes('/chat')"
          icon="arrow_back"
          label="Back" dense flat
          @click="$router.back()"/>

        <q-toolbar-title>
          {{ title }}
        </q-toolbar-title>

        <q-btn
          v-if="!userDetails.userId"
          dense flat no-caps
          class="absolute-right q-pr-sm"
          icon="account_circle"
          label="Login"
          to="/auth"
        />
        <q-btn
          v-else
          @click="logoutUser"
          dense flat no-caps
          class="absolute-right q-pr-sm"
          icon="account_circle">
          Logout<br>{{ userDetails.name }}
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import {defineComponent, ref} from 'vue'
import {openURL} from 'quasar'
import {mapActions, mapState} from "vuex";
import mixinOtherUserDetails from 'src/mixins/mixin-other-user-details.js'

export default defineComponent({
  mixins: [mixinOtherUserDetails],
  computed: {
    ...mapState("user", ['userDetails']),
    title() {
      let currentPath = this.$route.fullPath;
      let title = 'Smack chat'
      console.log(currentPath)
      switch (currentPath) {
        case '/chat':
          title = this.otherUserDetails.name
          break
        case '/auth':
          title = 'Auth'
          break
        default:
          title = 'Smack chat'
          break
      }
      if (currentPath.includes('/chat')){
        title = this.otherUserDetails.name
      }

      return title
    }
  },
  setup() {
    const leftDrawerOpen = ref(false)
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  methods: {
    ...mapActions('user', ['logoutUser'])
  }
})
</script>

<style lang="scss">
.q-toolbar {
  q-btn {
    line-height: 1.2;
  }
}
</style>
