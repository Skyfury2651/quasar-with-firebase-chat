<template>
  <q-form @submit="submitForm">
    <q-input v-if="tab === 'register'" outlined class="q-mb-md" v-model="formData.name" label="Name"></q-input>
    <q-input outlined class="q-mb-md" v-model="formData.email" type="email" label="Email"></q-input>
    <q-input outlined class="q-mb-md" v-model="formData.password" type="password" label="Password"></q-input>
    <div class="row">
      <q-space></q-space>
      <q-btn color="primary" :label="tab" type="submit"></q-btn>
    </div>
  </q-form>
</template>

<script>
import {mapActions} from 'vuex'

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
    ...mapActions('user', ['registerUser','loginUser']),
    submitForm() {
      if (this.tab === 'login') {
        this.loginUser(this.formData)
      } else {
        this.registerUser(this.formData)
      }
    },
  },
}
</script>

<style scoped>

</style>
