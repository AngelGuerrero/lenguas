<template>
  <div>
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
          <b-avatar button variant="dark" v-b-toggle.sidebar-right></b-avatar>
        </b-navbar-nav>
      </b-container>
    </b-navbar>

    <b-sidebar
      id="sidebar-right"
      right
      shadow
      backdrop
      no-header-close
      header-class="d-block p-0"
      v-model="showSidebar"
    >
      <!-- Title -->
      <template v-slot:title="{ hide }">
        <b-container class="border py-1 bg-light d-flex justify-content-between align-items-center">
          <h6 class="m-0">Info. del usuario</h6>

          <b-button variant="link" class="text-decoration-none" @click="hide">
            <p class="h4 m-0">
              <b-icon icon="x"></b-icon>
            </p>
          </b-button>
        </b-container>
      </template>

      <!-- Default content -->
      <template v-slot:default>
        <div class="p-3">
          <!-- Header avatar -->
          <div class="sidebar-header-avatar d-flex justify-content-center">
            <b-avatar size="72px" class="text-center"></b-avatar>
          </div>

          <!-- Header username -->
          <b-container class="text-center py-2">
            <span class="text-muted">{{ currentProfile.fullname }}</span>
          </b-container>

          <!-- Header links -->
          <hr />
          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item href="#">Perfil</b-nav-item>
              <b-nav-item href="#">Cuenta</b-nav-item>
            </b-nav>
          </nav>
        </div>
      </template>

      <!-- Footer sidebar -->
      <template v-slot:footer>
        <div class="bg-light px-3 py-2">
          <b-button variant="danger" block size="sm" @click="signOut">
            <b-icon icon="power" aria-hidden="true"></b-icon>Cerrar sesión
          </b-button>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      showSidebar: false,
      title: process.env.VUE_APP_TITLE
    }
  },

  computed: {
    ...mapState('users', ['currentProfile'])
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

#sidebar-right
  background: white !important
</style>
