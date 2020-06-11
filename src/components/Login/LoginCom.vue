<template>
  <b-container id="login-container"
               class="d-flex justify-content-center align-items-center">
    <b-card-group deck>
      <b-card header="Registro">
        <b-card-body>
          <b-form submit.prevent="login()">
            <!-- username -->
            <b-form-group label="Nombre" label-for="username">
              <b-form-input
                v-model.trim="input.name"
                type="text"
                required="required"
                placeholder="Ingresa tu nombre"
                @keyup="onInputUsername()"
              ></b-form-input>
            </b-form-group>

            <!-- password -->
            <b-form-group label="Contraseña"
                          label-for="password"
                          v-if="input.hasAdminAccess">
              <b-form-input
                v-model.trim="input.password"
                type="password"
                required="required"
                placeholder="Contraseña"
                @keyup="onInputPassword()"
              ></b-form-input>
            </b-form-group>

            <b-button
                      type="submit"
                      variant="primary"
                      v-if="input.name"
                      @click.prevent="login()"
            >
            Ingresar
            </b-button>
          </b-form>
        </b-card-body>
      </b-card>
    </b-card-group>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState('firebase', ['admin', 'input']),

  methods: {
    login () {
      this.$store.dispatch('firebase/LOGIN', this.input)
    },

    onInputUsername () {
      this.input.hasAdminAccess = (this.input.name === this.admin.name)
    },

    onInputPassword () {
      this.input.isAdmin = this.input.hasAdminAccess ? (this.input.password === this.admin.password) : false
    }
  }
}
</script>

<style lang="scss" scoped>
#login-container {
  min-height: calc(100vh - 115px);
}
</style>
