<template>
  <div class="d-flex justify-content-center align-items-center m-5">
    <b-card class="access-view__card" no-body bg-variant="light">
      <b-tabs pills card align="center">
        <b-tab title="Ingreso">
          <b-container>
            <login-com></login-com>
          </b-container>
        </b-tab>

        <b-tab title="Registro">
          <b-container>
            <register-com></register-com>
          </b-container>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
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

<style lang="sass" scoped>
.access-view__card
  width: 100%
  max-width: 450px
  min-height: 50%
  // style
  box-shadow: 0px 0px 30px 10px #dee3e7
  @media screen and (max-width: 500px)
    max-width: 1000px
</style>
