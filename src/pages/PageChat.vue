<template>
  <q-page class="flex column">
    <q-banner class="bg-grey-4 text-center">
      User is offline
    </q-banner>
    <div class="q-pa-md column col justify-end">
      <q-chat-message v-for="message in messages" :key="message.text" :name="message.from" :text="[message.text]"
                      :sent="message.from === 'me'">

      </q-chat-message>
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-form @submit="sendMessage">
          <q-input bg-color="white" class="full-width" outlined rounded v-model="text" label="Message" dense>
            <template v-slot:after>
              <q-btn round dense flat color="white" icon="send" type="submit">
              </q-btn>
            </template>
          </q-input>
        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>
<script>
export default {
  setup() {
    return {
      newMessage: '',
      messages: [
        {
          text: 'Hey Jim, how are you?',
          from: 'me'
        },
        {
          text: 'Good tks how are as',
          from: 'them'
        },
        {
          text: 'yo dude?',
          from: 'me'
        }
      ]
    }
  },
  methods: {
    sendMessage() {
      this.messages.push({
        text: this.newMessage,
        from: 'me'
      })
    }
  }
}
</script>
