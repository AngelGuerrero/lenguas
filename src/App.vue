<template>
  <div id="app">
    <main-navbar :username="user.name"></main-navbar>
    <user-input class="main" v-if="user.name.length <= 0"></user-input>

    <!-- main view -->
    <admin-panel class="main" v-if="user.isAdmin"></admin-panel>
    <div v-else>
      <stack-list class="main" v-show="user.name.length > 0" ref="stacklistComponent"></stack-list>
    </div>

    <main-footer></main-footer>
  </div>
</template>

<script>
import { EventBus } from './event-bus'

import stackList from './components/StackList'
import userInput from './components/user/UserInput'
import mainNavbar from './components/view/Navbar'
import adminPanel from './components/view/AdminPanel'
import mainFooter from './components/view/Footer'

export default {
  name: 'app',

  components: {
    userInput,
    stackList,
    mainNavbar,
    adminPanel,
    mainFooter
  },

  created () {
    EventBus.$on('on-get-user', response => (this.user = response))

    EventBus.$on('on-logout', () => this.resetData())

    this.resetData()
  },

  data () {
    return {
      user: {
        name: 'test',
        isAdmin: false
      }
    }
  },

  methods: {
    resetData () {
      // this.$refs.stacklistComponent.init()
      // this.$refs.stacklistComponent.$forceUpdate();
      // console.log(this.$refs.stacklistComponent)
      this.user.name = ''
      this.user.isAdmin = false
    }
  }
}
</script>

<style lang="scss">
.main {
  min-height: calc(100vh - 115px);
}
</style>
