<template>
  <div id="app">
    <navbar-com></navbar-com>

    <b-container class="main">
      <router-view></router-view>
    </b-container>

    <footer-com></footer-com>
  </div>
</template>

<script>
import CATEGORIES from '@/data/categories'
import { mapState, mapGetters, mapActions } from 'vuex'

import NavbarCom from './components/Shared/NavbarCom'
import FooterCom from './components/Shared/FooterCom'

export default {
  components: {
    NavbarCom,
    FooterCom
  },

  created () {
    // this.loadSessionIfExists()
  },

  computed: {
    ...mapGetters('firebase', ['USER_HAS_SESSION', 'USER_HAS_FINISHED']),

    ...mapState('firebase', ['user_id', 'user'])
  },

  data: () => ({
    app_categories: [...CATEGORIES]
  }),

  methods: {
    ...mapActions('firebase', ['BIND_USER']),

    loadSessionIfExists () {
      const retval = this.USER_HAS_SESSION
      if (retval.ok) {
        this.BIND_USER(retval.id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  padding-top: 50px;
}

.main {
  min-height: calc(100vh - 107px);
  display: flex;
  align-content: stretch;
}
</style>
