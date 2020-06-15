<template>
  <b-form @submit.prevent="login">
    <b-alert variant="danger" v-model="response.error" dismissible>{{ response.message }}</b-alert>
    <!-- email -->
    <b-form-group label="Email o nombre de usuario" label-for="input_emailOrNickName">
      <b-form-input
        id="input_emailOrNickName"
        v-model.trim="form.emailOrNickName"
        type="text"
        required
        placeholder="Email o nickname"
      ></b-form-input>
    </b-form-group>

    <!-- password -->
    <b-form-group label="Contraseña" label-for="input_password">
      <b-form-input
        id="input_password"
        v-model.trim="form.password"
        type="password"
        required
        placeholder="Contraseña"
      ></b-form-input>
    </b-form-group>

    <!-- Submit button -->
    <b-button type="submit" variant="primary" block :disabled="disabledByForm">Ingresar</b-button>
  </b-form>
</template>

<script>
import { mapActions } from 'vuex'

const _moduleUsers = 'users'

export default {
  data: () => ({
    form: {
      emailOrNickName: '',
      password: ''
    },

    response: {
      error: false,
      message: ''
    }
  }),

  computed: {
    disabledByForm () {
      return (this.form.emailOrNickName === '' || this.form.password === '')
    }
  },

  methods: {
    ...mapActions(_moduleUsers, ['getUserByNickName', 'signInWithEmailAndPassword']),

    async login (e) {
      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      //
      const pattern = new RegExp(emailRegex)

      // This is not an email, maybe nickname ?
      if (!pattern.test(this.form.emailOrNickName)) {
        this.loginWithNickName()
        return
      }

      //
      // Is email, log in with it
      this.loginWithEmailAndPassword(this.form.emailOrNickName, this.form.password)
    },

    async loginWithNickName () {
      const getval = await this.getUserByNickName(this.form.emailOrNickName)

      //
      // The user with nickname doesn't exist ?
      if (getval.error) {
        this.response.error = true
        this.response.message = getval.message
        return
      }

      this.loginWithEmailAndPassword(getval.data.email, this.form.password)
    },

    async loginWithEmailAndPassword (email, password) {
      const getval = await this.signInWithEmailAndPassword({ email, password })

      if (getval.error) {
        this.response.error = true
        this.response.message = getval.message
      }
    }
  }
}
</script>
