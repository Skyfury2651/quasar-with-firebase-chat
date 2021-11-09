<template>
  <q-form @submit="submitForm">
    <q-input v-if="tab === 'register'" outlined class="q-mb-md" v-model="formData.name" label="Name"></q-input>
    <q-input outlined class="q-mb-md" v-model="formData.email" type="email" label="Email"></q-input>
    <q-input outlined class="q-mb-md" v-model="formData.password" type="password" label="Password"></q-input>
    <div class="row">
      <q-space></q-space>
      <q-btn color="primary" :label="tab"></q-btn>
    </div>
  </q-form>
</template>

<script>
// import firebase from "boot/firebase";

export default {
  props: ['tab'],
  data() {
    return {
      formData: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    submitForm() {
      if (this.tab === 'login') {
        console.log('login the user')
      } else {
        console.log('register the user')
      }
    },
    // google() {
    //   const provider = new firebase.auth.GoogleAuthProvider()
    //   firebase.auth().signInWithPopup(provider)
    //     .then(result => {
    //       console.log('result', result)
    //       this.$q.notify({message: 'Sign In Success.'})
    //       this.$router.push('/home')
    //     })
    //     .catch(error => console.log('error', error))
    // }
  },
  // mounted() {
  //  this.google()
  // }
}
</script>

<style scoped>

</style>
