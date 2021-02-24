<template>
  <div>
    <!-- If all data isn't loaded -->
    <loading v-if="this.$store.getters.performingInitialTasks" />
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
import Loading from './views/Shared/Loading'
import FooterComponent from './views/Shared/Footer'

export default {
  components: { FooterComponent, Loading }
}
</script>

<style lang="sass">
@import "@/assets/sass/global.sass"

#app
  height: 100vh
  overflow: hidden
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;

#main
  height: calc(100vh - 57px)
  background: $access-bg
  background-color: white !important
</style>
