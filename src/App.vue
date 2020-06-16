<template>
  <div id="app">
    <navbar-com></navbar-com>

    <div id="main">
      <router-view class="main__view"></router-view>
      <footer-com></footer-com>
    </div>

  </div>
</template>

<script>
import NavbarCom from './components/Shared/NavbarCom'
import FooterCom from './components/Shared/FooterCom'

export default {
  components: {
    NavbarCom,
    FooterCom
  }
}
</script>

<style lang="sass">
@import "@/assets/sass/global.sass"

#main
  margin-top: 50px
  height: calc(100vh - 50px)
  display: flex
  flex-direction: column
  align-items: stretch

.main__view
  flex-grow: 1
</style>
