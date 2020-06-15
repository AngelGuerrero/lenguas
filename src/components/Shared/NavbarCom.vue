<template>
  <div>
    <b-navbar toggleable="lg" type="dark" fixed="top" variant="dark">
      <b-container>
        <b-navbar-brand href="#" class="app__title">
          <router-link :to="{name: 'home'}">{{ title }}</router-link>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse" v-if="user_id"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav v-if="user_id">
          <b-navbar-nav></b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">

            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em>{{ user.name }}</em>
              </template>
              <b-dropdown-item href="#" @click="logout()">Salir</b-dropdown-item>
            </b-nav-item-dropdown>

          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

const _userx = 'users'

export default {
  computed: mapState(_userx, ['user_id', 'user']),

  data () {
    return {
      title: process.env.VUE_APP_TITLE
    }
  },

  methods: mapActions(_userx, {
    logout: 'LOGOUT'
  })

}
</script>

<style lang="sass">
@import "@/assets/sass/_variables.sass"

.app__title a
  color: $enfasis
</style>
