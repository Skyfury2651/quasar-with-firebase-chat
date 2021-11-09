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
          dense flat no-caps
          class="absolute-right q-pr-sm"
          icon="account_circle"
          label="Login"
        />
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

export default defineComponent({
  name: 'MainLayout',
  computed: {
    title() {
      let currentPath = this.$route.fullPath;
      let title = 'Smack chat'
      switch (currentPath) {
        case '/chat':
          title = 'Chat'
          break
        case '/auth':
          title = 'Auth'
          break
        default:
          title = 'Smack chat'
          break
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
    openURL
  }
})
</script>
