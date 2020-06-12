<template>
  <b-form submit.prevent="register()">
    <!-- fullname -->
    <b-form-group>
      <b-form-input
        type="text"
        v-model.trim="form.fullname"
        placeholder="Nombre completo"
      ></b-form-input>
    </b-form-group>

    <!-- nickname -->
    <b-form-group>
      <b-form-input
        id="input_nickname"
        :state="validations.nickname.value"
        type="text"
        v-model.trim="form.nickname"
        @blur.passive="nicknameValidations()"
        placeholder="Usuario"
      ></b-form-input>
      <b-form-invalid-feedback :state="validations.nickname.value">
        {{ validations.nickname.message }}
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="validations.nickname.value">
        {{ validations.nickname.message }}
      </b-form-valid-feedback>
    </b-form-group>

    <!-- password -->
    <b-form-group>
      <b-form-input
        type="password"
        v-model.trim="form.password"
        placeholder="Contraseña"
      ></b-form-input>
    </b-form-group>

    <!-- repeat password -->
    <b-form-group>
      <b-form-input
        type="password"
        v-model.trim="form.passwordRepeat"
        placeholder="Repite contraseña"
      ></b-form-input>
    </b-form-group>

    <b-button @click="register()" type="submit" variant="primary" block>Registrar</b-button>
  </b-form>
</template>

<script>
export default {
  data: () => ({
    form: {
      fullname: null,
      nickname: null,
      password: null,
      passwordRepeat: null
    },

    validations: {
      nickname: {
        value: null,
        message: ''
      }
    }
  }),

  methods: {
    async nicknameValidations () {
      //
      // Validations
      const nicknameTaken = await this.$store.dispatch('access/isNickNameTaken', this.form.nickname)
      console.log(nicknameTaken)

      if (this.form.nickname != null && this.form.nickname.length <= 0) {
        this.validations.nickname.value = false
        this.validations.nickname.message = 'La longitud mínima debe ser de 4 caractéres.'
        return
      }

      if (nicknameTaken) {
        this.validations.nickname.value = false
        this.validations.nickname.message = 'Este nombre de usuario ya está tomado, intenta con otro.'
        return
      }

      this.validations.nickname.value = true
      this.validations.nickname.message = 'Parece correcto.'
    },

    async register () {
      // const userExists = await this.$store.dispatch('access/userExists', this.form)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
