<template>
  <div id="wrapper">
    <navbar />
    <aside-left />

    <main id="dashboard__content" class="p-3">
      <router-view />
    </main>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Navbar from '@/views/Shared/Navbar'
import AsideLeft from '@/views/Shared/AsideLeft'

export default {
  components: { Navbar, AsideLeft },

  mounted () {
    this.checkWindowSize()
    window.addEventListener('resize', this.checkWindowSize)
  },

  methods: {
    ...mapMutations('ui', ['setAsideToMobile']),

    checkWindowSize () {
      this.setAsideToMobile(window.innerWidth < 768)
    }
  }
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
  background: rgba(255, 255, 255, 0.75)
  transition: all 1s

#dashboard__content
  flex-grow: 1
  overflow-y: auto
</style>
