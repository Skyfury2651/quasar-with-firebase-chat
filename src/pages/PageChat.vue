<template>
  <q-page class="flex column" ref="pageChat">
    <q-banner class="bg-grey-4 text-center" v-if="!otherUserDetails">
      {{ otherUserDetails.name }} is offline
    </q-banner>
    <div class="q-pa-md column col justify-end" :class="{'invisible' : !showMessages}">
      <q-chat-message v-for="message in messages" :key="message.text"
                      :name="message.from === 'me' ? userDetails.name : otherUserDetails.name " :text="[message.text]"
                      :sent="message.from === 'me'">

      </q-chat-message>
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-form @submit="sendMessage">
          <q-input bg-color="white" class="full-width" outlined rounded v-model="newMessage" label="Message" dense>
            <template v-slot:after>
              <q-btn round dense flat color="white" icon="send" type="submit" @click="sendMessage"/>
            </template>
          </q-input>
        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>
<script>
import {mapActions, mapState} from "vuex";
import mixinOtherUserDetails from 'src/mixins/mixin-other-user-details.js'

export default {
  mixins: [mixinOtherUserDetails],
  data() {
    return {
      newMessage: '',
      showMessages: false
    }
  },
  computed: {
    ...mapState('messages', ['messages']),
    ...mapState('user', ['userDetails'])
  },
  methods: {
    ...mapActions('user', ['firebaseGetMessages', 'firebaseStopGetMessages']),
    ...mapActions('messages', ['firebaseSendMessage']),
    scrollToBottom() {
      let pageChat = this.$refs.pageChat.$el
      setTimeout(() => {
        window.scrollTo(0, pageChat.scrollHeight)
      }, 20)
    },
    sendMessage() {
      this.firebaseSendMessage({
        message: {
          text: this.newMessage,
          from: 'me'
        },
        otherUserId: this.$route.params.otherUserId,
        userId: this.userDetails.userId
      })
      this.newMessage = ''
      this.scrollToBottom()
    }
  },
  mounted() {
    this.firebaseGetMessages(this.$route.params.otherUserId)
    setTimeout(() => {
      this.showMessages = true
      this.scrollToBottom()
    },20)
  },
  unmounted() {
    this.firebaseStopGetMessages(this.$route.params.otherUserId)
  }
}
</script>
