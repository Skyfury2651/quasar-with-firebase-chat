<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Contacts</q-toolbar-title>
    </q-toolbar>
    <q-list class="full-width" separator bordered>
      <q-item v-for="(user,key) in users" :key="key" clickable v-ripple :to="'/chat/' + key">
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ user.name.charAt(0) ?? ''}}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.name }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-badge :color="user.online ? 'light-green-5' : 'grey-4'">
            {{ user.online ? 'Online' : 'Offline' }}
          </q-badge>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters('user', ['users'])
  }
}
</script>
