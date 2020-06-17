<template>
  <b-navbar type="dark" fixed="top" variant="dark">
    <b-container fluid>
      <button
        class="navbar-toggler d-block"
        type="button"
        data-toggle="collapse"
        aria-controls="navbarToggleExternalContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="toggleAsideLeft()"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <b-navbar-brand href="#" class="app__title pl-4">
        <router-link to="/dashboard">{{ title }}</router-link>
      </b-navbar-brand>

      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown
          v-if="databaseUser"
          :text="this.$store.state.users.databaseUser.nickname"
          right
        >
          <b-dropdown-item href="#">Cuenta</b-dropdown-item>
          <b-dropdown-item href="#" @click="signOut"
            >Cerrar sesión</b-dropdown-item
          >
        </b-nav-item-dropdown>
        <b-nav-item-dropdown
          v-else
          text="Loading username..."
        ></b-nav-item-dropdown>
      </b-navbar-nav>
    </b-container>
  </b-navbar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      title: process.env.VUE_APP_TITLE
    }
  },

  computed: {
    ...mapState('users', ['databaseUser'])
  },

  methods: {
    toggleAsideLeft () {
      this.$store.commit('ui/toggleAside')
    },

    async signOut () {
      const getval = await this.$store.dispatch('users/signOut')

      if (getval.error) {
        console.log(`Something went wront: ${getval.message}`)
        return
      }

      this.$router.replace('login')
    }
  }
}
</script>

<style lang="sass">
@import "@/assets/sass/global.sass"

.app__title a
  font-family: $montserrat
  color: $enfasis
  text-decoration: none !important
  &:hover
    color: lighten($enfasis, 30)
</style>
