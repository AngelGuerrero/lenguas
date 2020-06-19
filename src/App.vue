<template>
  <div>
    <!-- If all data isn't loaded -->
    <div
      v-if="this.$store.getters.performingInitialTasks"
      class="vh-100 d-flex flex-column justify-content-center align-items-center bg-dark text-light"
    >
      <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner" class="mb-4"></b-spinner>
      <strong>Cargando...</strong>
      <strong>{{ this.$store.state.currentTask }}</strong>
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
    this.checkWindowSize()
    window.addEventListener('resize', this.checkWindowSize)
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
  background: $access-bg
  background-color: white !important
</style>
