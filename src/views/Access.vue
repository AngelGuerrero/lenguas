<template>
  <div id="access__wrapper">
    <b-container id="img__container">
      <img src="@/assets/logo.png" class="responsive" width="100" alt="Logo" />
    </b-container>

    <b-container id="form__container">
      <b-card class="access-view__card" no-body bg-variant="light">
        <b-tabs pills card align="center">
          <b-tab title="Ingreso">
            <b-container>
              <login />
            </b-container>
          </b-tab>

          <b-tab title="Registro">
            <b-container>
              <register />
            </b-container>
          </b-tab>
        </b-tabs>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import Login from '@/components/Access/Login'
import Register from '@/components/Access/Register'

export default {
  components: {
    Register,
    Login
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
#access__wrapper
  height: 100%
  display: flex
  flex-direction: column
  justify-content: center

#img__container
  padding: 30px 0px
  height: 30%
  display: flex
  justify-content: center
  align-items: center

#form__container
  flex-grow: 1
  display: flex
  justify-content: center
  align-items: flex-start

.access-view__card
  width: 100%
  max-width: 450px
  min-height: 50%
  // style
  box-shadow: 0px 0px 30px 10px #dee3e7
  @media screen and (max-width: 500px)
    max-width: 1000px
</style>
