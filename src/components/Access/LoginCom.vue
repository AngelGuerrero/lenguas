<template>
  <b-form submit.prevent="login()">
    <!-- username -->
    <b-form-group>
      <b-form-input
        v-model.trim="form.username"
        type="text"
        required
        placeholder="Usuario"
        @keyup="onInputUsername()"
      ></b-form-input>
    </b-form-group>

    <!-- password -->
    <b-form-group>
      <b-form-input
        v-model.trim="form.password"
        type="password"
        required
        placeholder="Contraseña"
        @keyup="onInputPassword()"
      ></b-form-input>
    </b-form-group>

    <!-- Submit button -->
    <b-button type="submit" variant="primary" block @click.prevent="login()">Ingresar</b-button>
  </b-form>
</template>

<script>
export default {
  data: () => ({
    form: {
      username: null,
      password: null
    }
  }),

  methods: {
    login () {
      this.$store.dispatch('firebase/LOGIN', this.input)
    },

    onInputName () {},

    onInputUsername () {
      this.input.hasAdminAccess = this.input.name === this.admin.name
    },

    onInputPassword () {
      this.input.isAdmin = this.input.hasAdminAccess
        ? this.input.password === this.admin.password
        : false
    }
  }
}
</script>

<style lang="scss" scoped>
#login-container {
  min-height: calc(100vh - 115px);
}
</style>
