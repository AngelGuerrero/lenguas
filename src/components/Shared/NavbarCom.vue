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
        <router-link :to="{name: 'home'}">{{ title }}</router-link>
      </b-navbar-brand>

      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown text="User" right>
          <b-dropdown-item href="#">Cuenta</b-dropdown-item>
          <b-dropdown-item href="#">Cerrar sesión</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-container>
  </b-navbar>
</template>

<script>
export default {
  data () {
    return {
      title: process.env.VUE_APP_TITLE
    }
  },

  methods: {
    toggleAsideLeft () {
      this.$store.commit('ui/toggleAside')
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
    color: lighten($enfasis, 20)
    color: blue
</style>
