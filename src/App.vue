<template>
  <div id="app">
    <div id="main">
      <router-view class="main__view"></router-view>
    </div>
    <footer-component></footer-component>
  </div>
</template>

<script>
import FooterComponent from './views/Shared/Footer'

export default {
  components: {
    FooterComponent
  },

  created () {
    this.checkWindowSize()
    window.addEventListener('resize', this.checkWindowSize)
    //
    // TEST: Testing...
    ;(async () => {
      const getvalGameExists = await this.$store.dispatch(
        'games/getGameByName',
        'cartas'
      )
      console.log(getvalGameExists)

      const getvalGameCreated = await this.$store.dispatch(
        'games/createGameIfNotExists',
        {
          name: 'cartas',
          payload: {
            mode: 'testing'
          }
        }
      )
      console.log(getvalGameCreated)

      // Saving answers to cartas
      const userId = this.$store.state.currentUser.uid
      const savedAnswers = await this.$store.dispatch('games/saveAnswers', {
        payload: {
          date: new Date(),
          errores: 1,
          aciertos: 5,
          game_id: 'cartas',
          user_id: userId
        }
      })

      console.log(savedAnswers)
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
  background-color: black

#main
  height: calc(100vh - 57px)
  background-color: white
</style>
