<template>
  <div id="app">
    <navbar-com></navbar-com>
    <!-- main view -->
    <div class="main">
      <login-com v-if="!user_id"></login-com>
      <div v-else>
        <div v-if="user_id">
          <admin-panel-com v-if="user.isAdmin"></admin-panel-com>
          <div v-else>
            <stack-panel-com
              v-if="!USER_HAS_FINISHED"
              :p_categories="app_categories"
              ref="stackpanelcom"
            ></stack-panel-com>
            <stack-msg v-else></stack-msg>
          </div>
        </div>
      </div>
    </div>

    <footer-com></footer-com>
  </div>
</template>

<script>
import CATEGORIES from '@/data/categories'
import { mapState, mapGetters, mapActions } from 'vuex'

import NavbarCom from './components/Shared/NavbarCom'
import FooterCom from './components/Shared/FooterCom'
import AdminPanelCom from './components/Admin/AdminPanelCom'
import StackPanelCom from './components/Stack/StackPanelCom'
import StackMsg from './components/Stack/StackMsg'
import LoginCom from './components/Login/LoginCom'

export default {
  name: 'app',

  components: {
    NavbarCom,
    FooterCom,
    AdminPanelCom,
    StackPanelCom,
    StackMsg,
    LoginCom
  },

  created () {
    this.loadSessionIfExists()
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
  min-height: calc(100vh - 115px);
}
</style>
