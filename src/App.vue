<template>
  <div id="app">
    <navbar-com></navbar-com>

    <div class="main d-flex justify-content-center">
      <router-view></router-view>
    </div>

    <footer-com></footer-com>
  </div>
</template>

<script>
import CATEGORIES from '@/data/categories'
import { mapState, mapGetters, mapActions } from 'vuex'

import NavbarCom from './components/Shared/NavbarCom'
import FooterCom from './components/Shared/FooterCom'

const userx = 'users'

export default {
  components: {
    NavbarCom,
    FooterCom
  },

  created () {
    // this.loadSessionIfExists()
  },

  computed: {
    ...mapState(userx, ['user_id', 'user']),

    ...mapGetters(userx, ['USER_HAS_SESSION', 'USER_HAS_FINISHED'])
  },

  data: () => ({
    app_categories: [...CATEGORIES]
  }),

  methods: {
    ...mapActions(userx, ['BIND_USER']),

    loadSessionIfExists () {
      const retval = this.USER_HAS_SESSION
      if (retval.ok) {
        this.BIND_USER(retval.id)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import "@/assets/sass/_variables.sass"

#app
  padding-top: 50px

.main
  min-height: calc(100vh - 107px)
  display: flex
  align-content: stretch
</style>
