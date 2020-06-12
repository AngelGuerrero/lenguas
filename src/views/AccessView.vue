<template>
  <b-container id="access-view-container" class="d-flex justify-content-center align-items-center">
    <b-card class="access-view__card" no-body bg-variant="light">
      <b-tabs pills card align="center">
        <b-tab title="Ingresar">
          <b-container>
            <login-com></login-com>
          </b-container>
        </b-tab>

        <b-tab title="Registrar" active>
          <b-container>
            <register-com></register-com>
          </b-container>
        </b-tab>
      </b-tabs>
    </b-card>
  </b-container>
</template>

<script>
import LoginCom from '@/components/Access/LoginCom'
import RegisterCom from '@/components/Access/RegisterCom'

export default {
  components: {
    RegisterCom,
    LoginCom
  },

  data: () => ({
    input: {
      name: null,
      email: null,
      password: null
    }
  }),

  methods: {
    login () {
      this.$store.dispatch('firebase/LOGIN', this.input)
    },

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
.access-view__card {
  min-height: 50%;
  width: 90%;
  max-width: 400px;
  box-shadow: 5px 5px 12px 10px #dee3e7;
}
</style>
