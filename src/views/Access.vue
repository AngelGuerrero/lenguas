<template>
  <div id="access__wrapper">
    <b-container id="img__container">
      <img src="@/assets/logo.png" class="responsive" width="60" alt="Logo" />
    </b-container>

    <b-container id="form__container">
      <b-card class="access-view__card" no-body bg-variant="">
        <b-tabs card align="center">
          <b-tab title="Ingreso" :active="selected_view === 'signin'">
            <b-container>
              <login />
            </b-container>
          </b-tab>

          <b-tab title="Registro" :active="selected_view === 'signup'">
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

  props: {
    selected_view: {
      type: String,
      required: false,
      default: 'signin'
    }
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
@import "@/assets/sass/_variables.sass"

#access__wrapper
  height: 100%
  display: flex
  flex-direction: column
  justify-content: center
  overflow-y: auto
  background: #3494E6
  background: $access-background

#img__container
  padding: 30px 0px 0px 0px
  height: 20%
  display: flex
  justify-content: center
  align-items: center

#form__container
  flex-grow: 1
  display: flex
  justify-content: center
  align-items: flex-start
  margin-bottom: 15px

.access-view__card
  width: 100%
  max-width: 450px
  min-height: 50%
  // style
  box-shadow: 0px 0px 30px 10px #dee3e7
  @media screen and (max-width: 500px)
    max-width: 1000px
</style>
