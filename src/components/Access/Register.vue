<template>
  <b-form @submit.prevent="createAccount">
    <b-alert v-if="response.error" variant="danger" show>{{
      response.message
    }}</b-alert>

    <!-- fullname -->
    <b-form-group>
      <b-form-input
        id="input_fullname"
        type="text"
        placeholder="Nombre completo"
        v-model.trim="form.fullname"
        @change="fullnameValidations()"
        :state="validations.fullname.value"
      ></b-form-input>
      <!-- Invalid message -->
      <b-form-invalid-feedback :state="validations.fullname.value">{{
        validations.fullname.message
      }}</b-form-invalid-feedback>
      <!-- Valid message -->
      <b-form-valid-feedback :state="validations.fullname.value">{{
        validations.fullname.message
      }}</b-form-valid-feedback>
    </b-form-group>

    <!-- nickname -->
    <b-form-group>
      <b-form-input
        id="input_nickname"
        type="text"
        placeholder="Usuario"
        v-model.trim="form.nickname"
        @change="nicknameValidations()"
        :state="validations.nickname.value"
      ></b-form-input>
      <!-- Invalid message -->
      <b-form-invalid-feedback :state="validations.nickname.value">{{
        validations.nickname.message
      }}</b-form-invalid-feedback>
      <!-- Valid message -->
      <b-form-valid-feedback :state="validations.nickname.value">{{
        validations.nickname.message
      }}</b-form-valid-feedback>
    </b-form-group>

    <!-- email -->
    <b-form-group>
      <b-form-input
        id="input_email"
        type="email"
        name="user_email"
        placeholder="Email"
        v-model="form.email"
        @change="emailValidations()"
        :state="validations.email.value"
      ></b-form-input>
      <!-- Invalid message -->
      <b-form-invalid-feedback :state="validations.email.value">{{
        validations.email.message
      }}</b-form-invalid-feedback>
      <!-- Valid message -->
      <b-form-valid-feedback :state="validations.email.value">{{
        validations.email.message
      }}</b-form-valid-feedback>
    </b-form-group>

    <!-- password -->
    <b-form-group>
      <b-form-input
        type="password"
        :state="validations.password.value"
        v-model.trim="form.password"
        @input="passwordValidations()"
        placeholder="Contraseña"
      ></b-form-input>
      <!-- Invalid message -->
      <b-form-invalid-feedback :state="validations.password.value">{{
        validations.password.message
      }}</b-form-invalid-feedback>
      <!-- Valid message -->
      <b-form-valid-feedback :state="validations.password.value">{{
        validations.password.message
      }}</b-form-valid-feedback>
    </b-form-group>

    <!-- repeat password -->
    <b-form-group>
      <b-form-input
        type="password"
        :state="validations.passwordRepeat.value"
        v-model.trim="form.passwordRepeat"
        @input="passwordRepeatValidations()"
        placeholder="Repite contraseña"
      ></b-form-input>
      <!-- Invalid message -->
      <b-form-invalid-feedback :state="validations.passwordRepeat.value">{{
        validations.passwordRepeat.message
      }}</b-form-invalid-feedback>
      <!--  Valid message -->
      <b-form-valid-feedback :state="validations.passwordRepeat.value">{{
        validations.passwordRepeat.message
      }}</b-form-valid-feedback>
    </b-form-group>

    <b-button
      type="submit"
      variant="primary"
      :disabled="!hasPassedValidations"
      block
      >Crear cuenta</b-button
    >
  </b-form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    response: {
      error: false,
      message: ''
    },

    form: {
      fullname: '',
      nickname: '',
      email: '',
      password: '',
      passwordRepeat: ''
    },

    validations: {
      fullname: {
        value: null,
        message: ''
      },
      email: {
        value: null,
        message: ''
      },
      nickname: {
        value: null,
        message: ''
      },
      password: {
        value: null,
        message: ''
      },
      passwordRepeat: {
        value: null,
        message: ''
      }
    }
  }),

  computed: {
    hasPassedValidations: function () {
      //
      // Register validations
      const val = [
        this.validations.fullname.value,
        this.validations.email.value,
        this.validations.nickname.value,
        this.validations.password.value,
        this.validations.passwordRepeat.value
      ].every(val => val === true)

      return val
    }
  },

  methods: {
    ...mapActions('users', [
      'createUserAccount',
      'getUserByNickName',
      'getUserByEmail'
    ]),

    // #region [ Green ] Validations

    fullnameValidations () {
      //
      // Initial value
      this.validations.fullname.value = false
      //
      const maxLength = 50
      const minLength = 3

      // Empty space ?
      if (this.form.fullname.length <= 0) {
        this.validations.fullname.message = 'El nombre no puede estar vacío.'
        return
      }

      // Max and min
      if (
        this.form.fullname.length < minLength ||
        this.form.fullname.length > maxLength
      ) {
        this.validations.fullname.message = `El nombre debe ser una longitud entre: ${minLength} y ${maxLength} caractéres.`
        return
      }

      this.validations.fullname.value = true
      this.validations.fullname.message = ''
    },

    async emailValidations () {
      //
      // Initial value
      this.validations.email.value = false
      //
      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      //
      const pattern = new RegExp(emailRegex)

      // Invalid email
      if (!pattern.test(this.form.email)) {
        this.validations.email.message = 'Email no válido.'
        return
      }

      // Email is already taken ?
      const getvalUser = await this.getUserByEmail(this.form.email)

      if (getvalUser.data != null) {
        this.validations.email.message = 'Este email ya está registrado.'
        return
      }

      this.validations.email.value = true
      this.validations.email.message = ''
    },

    async nicknameValidations () {
      //
      // Initial value
      this.validations.nickname.value = false
      //
      const minLength = 6
      //
      const getvalUser = await this.getUserByNickName(this.form.nickname)

      // Empty space ?
      if (this.form.nickname.length <= 0) {
        this.validations.nickname.message = 'El campo no puede estar vacío.'
        return
      }

      // Min length ?
      if (this.form.nickname.length < minLength) {
        this.validations.nickname.message = `La longitud mínima es de ${minLength} caractéres.`
        return
      }

      // Dumplicated nickname ?
      if (getvalUser.data != null) {
        this.validations.nickname.message =
          'Este nombre de usuario ya está tomado, intenta con otro.'
        return
      }

      this.validations.nickname.value = true
      this.validations.nickname.message = 'Parece correcto.'
    },

    passwordValidations () {
      //
      // Initial value
      this.validations.password.value = false
      this.passwordRepeatValidations()
      //
      const minLength = 8

      // Empty space ?
      if (this.form.password.length <= 0) {
        this.validations.password.message =
          'La contraseña no puede quedar en blanco.'
        return
      }

      // Min length ?
      if (this.form.password.length < minLength) {
        this.validations.password.message = `La contraseña no puede ser menor a ${minLength} caractéres.`
        return
      }

      this.validations.password.value = true
      this.validations.password.message = ''
      this.passwordRepeatValidations()
    },

    passwordRepeatValidations () {
      //
      // Iinitial value
      this.validations.passwordRepeat.value = false

      // Match passwords?
      if (this.form.password !== this.form.passwordRepeat) {
        this.validations.passwordRepeat.message =
          'La confirmación de contraseña no coincide.'
        return
      }

      if (!this.validations.password.value) {
        return
      }

      this.validations.passwordRepeat.value = true
      this.validations.passwordRepeat.message = 'Las contraseñas coinciden.'
    },

    // #endregion

    async createAccount (event) {
      if (!this.hasPassedValidations) return

      //
      // Remove unnecessary properties
      delete this.form.passwordRepeat

      //
      // Create an account with email and password
      const getval = await this.createUserAccount(this.form)

      if (getval.error) {
        this.response.error = true
        this.response.message = getval.message
        return
      }

      this.reset(event)
      this.$router.replace('dashboard')
    },

    reset (event) {
      //
      // Reset form
      event.target.reset()
      //
      // Reset validations
      for (const property in this.validations) {
        if (Object.prototype.hasOwnProperty.call(this.validations, property)) {
          this.validations[property].value = null
          this.validations[property].message = ''
        }
      }
      //
      // Reset model
      for (const property in this.form) {
        if (Object.prototype.hasOwnProperty.call(this.form, property)) {
          this.form[property] = ''
        }
      }
      //
      //
      this.response.error = false
      this.response.message = ''

      return this.hasPassedValidations
    }
  }
}
</script>
