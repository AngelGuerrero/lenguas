<template>
  <div>
    <!-- If all data isn't loaded -->
    <div
      v-if="this.$store.state.performingInitialState"
      class="vh-100 d-flex flex-column justify-content-center align-items-center bg-dark text-light"
    >
      <b-spinner
        style="width: 3rem; height: 3rem;"
        label="Large Spinner"
        class="mb-4"
      ></b-spinner>
      <strong>Cargando...</strong>
      <b-container class="text-center">
        <p>Show current task</p>
      </b-container>
    </div>
    <!-- Else -->
    <div id="app" v-else>
      <div id="main">
        <router-view class="main__view"></router-view>
      </div>
      <footer-component></footer-component>
    </div>
  </div>
</template>

<script>
import FooterComponent from './views/Shared/Footer'

export default {
  components: {
    FooterComponent
  },

  created () {
    this.$store.commit('pushActionResolve', 'asyncFunction')
    this.$store.commit('pushActionResolve', 'asyncFunction')
    this.$store.commit('pushActionResolve', 'asyncFunction')
    this.$store.commit('pushActionResolve', 'asyncFunction')
    this.$store.commit('pushActionResolve', 'asyncFunction')
    this.$store.commit('pushActionResolve', 'asyncFunction')
    this.$store.commit('pushActionResolve', 'asyncFunction')
    this.$store.dispatch('executeAsyncActions')
    // this.checkWindowSize()
    // window.addEventListener('resize', this.checkWindowSize);
    //
    // TEST: Testing...
    ;(async () => {
      // const getvalGameExists = await this.$store.dispatch(
      //   'games/getGameByName',
      //   'cartas'
      // )
      // console.log(getvalGameExists)
      // const getvalGameCreated = await this.$store.dispatch(
      //   'games/createGameIfNotExists',
      //   {
      //     name: 'cartas',
      //     payload: {
      //       mode: 'testing'
      //     }
      //   }
      // )
      // console.log(getvalGameCreated)
      // Saving answers to cartas
      // const userId = this.$store.state.currentUser.uid
      // const savedAnswers = await this.$store.dispatch('games/saveAnswers', {
      //   payload: {
      //     date: new Date(),
      //     errores: 1,
      //     aciertos: 5,
      //     game_id: 'cartas',
      //     user_id: userId
      //   }
      // })
      // console.log(savedAnswers)
    })()
  },

  methods: {
    checkWindowSize () {
      this.$store.commit('ui/setAsideToMobile', window.innerWidth < 768)
    }
  }
}
</script>

<style lang="sass">
@import "@/assets/sass/global.sass"

#app
  height: 100vh
  overflow: hidden

#main
  height: calc(100vh - 57px)
  background-color: white
</style>
