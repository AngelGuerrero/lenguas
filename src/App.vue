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

#main
  height: calc(100vh - 57px)
  overflow: hidden

.main__view
  overflow-y: auto
</style>
