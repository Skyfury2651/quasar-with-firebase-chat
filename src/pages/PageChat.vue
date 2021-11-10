<template>
  <q-page class=" page-chat flex column" ref="pageChat">
    <q-banner class="bg-grey-4 text-center" v-if="!otherUserDetails">
      {{ otherUserDetails.name }} is offline
    </q-banner>
    <div class="q-pa-md column col justify-end" :class="{'invisible' : !showMessages}">
      <q-chat-message v-for="message in messages" :key="message.text"
                      :name="message.from === 'me' ? userDetails.name : otherUserDetails.name " :text="[message.text]"
                      :sent="message.from === 'me'"
                      :bg-color="message.from === 'me' ? 'white':'light-green-2'">

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
    }, 20)
  },
  unmounted() {
    this.firebaseStopGetMessages(this.$route.params.otherUserId)
  }
}
</script>
<style lang="scss">
.page-chat {
  background: #e2dfd5;

  &:after {
    content: '';
    display: block;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    opacity: 0.1;
    background-image: radial-gradient(circle at 100% 150%, silver 24%, white 24%, white 28%, silver 28%, silver 36%, white 36%, white 40%, transparent 40%, transparent),
    radial-gradient(circle at 0 150%, silver 24%, white 24%, white 28%, silver 28%, silver 36%, white 36%, white 40%, transparent 40%, transparent),
    radial-gradient(circle at 50% 100%, white 10%, silver 10%, silver 23%, white 23%, white 30%, silver 30%, silver 43%, white 43%, white 50%, silver 50%, silver 63%, white 63%, white 71%, transparent 71%, transparent),
    radial-gradient(circle at 100% 50%, white 5%, silver 5%, silver 15%, white 15%, white 20%, silver 20%, silver 29%, white 29%, white 34%, silver 34%, silver 44%, white 44%, white 49%, transparent 49%, transparent),
    radial-gradient(circle at 0 50%, white 5%, silver 5%, silver 15%, white 15%, white 20%, silver 20%, silver 29%, white 29%, white 34%, silver 34%, silver 44%, white 44%, white 49%, transparent 49%, transparent);
    background-size: 100px 50px;
  }

  .q-message {
    z-index: 1;
  }
}
</style>
