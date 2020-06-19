<template>
  <div id="wrapper">
    <navbar></navbar>
    <!-- Aside left -->
    <aside-left />

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
  components: { Navbar, AsideLeft },

  data: () => ({
    showComponent: false
  })
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
  background-color: $access-bg
  background: rgba(255, 255, 255, 0.40)
  transition: all 1s

#dashboard__content
  flex-grow: 1
  overflow-y: auto
</style>
