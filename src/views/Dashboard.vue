<template>
  <div id="wrapper">
    <navbar></navbar>
    <!-- Aside left -->
    <aside-left class="dashboard__aside-left" />

    <!-- Main content -->
    <div id="dashboard__content" class="p-3">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from '@/views/Shared/Navbar'
import AsideLeft from '@/views/Shared/AsideLeft'

export default {
  components: { Navbar, AsideLeft }
}
</script>

<style lang="sass" scoped>
@import '@/assets/sass/_variables'

// Nabvar height, fixed
#wrapper
  padding-top: 50px
  height: 100%
  display: flex
  justify-content: stretch
  position: relative
  background-color: white

.dashboard__aside-left
  width: 250px
  min-width: 250px
  max-width: 250px

#dashboard__content
  flex-grow: 1
  overflow-y: auto
  background-color: white
  background: $access-bg !important
</style>
