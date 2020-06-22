<template>
  <transition name="slide-fade">
    <div id="aside__wrapper" v-show="asideLeft.show" :class="[asideLeft.isMobile ? 'mobile' : 'desktop']">
      <!-- Header -->
      <b-container class="p-4">
        <h4 class="m-0">Módulos</h4>
      </b-container>

      <!-- Main content slot -->
      <b-list-group>
        <b-list-group-item v-for="route in getDashboardRoutes" :key="route.id">
          <router-link :to="{name: route.name }">{{ route.title }}</router-link>
        </b-list-group-item>
      </b-list-group>
    </div>
  </transition>
</template>

<script>
import { routes } from '@/routes'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('ui', ['asideLeft']),

    getDashboardRoutes () {
      return routes.find(route => route.name === 'Dashboard').children
    }
  }
}
</script>

<style lang="sass" scoped>
$aside-background: #f8f9fa

#aside__wrapper
  width: 250px
  min-width: 250px
  max-width: 250px
  height: 100%
  overflow-y: auto
  background-color: white
  border-right: 0.5px solid lightgrey

.mobile
  position: absolute
  z-index: 100 !important
  height: calc(100% - 50px) !important

.desktop
  height: 100%

.slide-fade-enter-active, .slide-fade-leave-active
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1)

.slide-fade-enter, .slide-fade-leave-to
  opacity: 0
  background-color: $aside-background
  width: 100%
  transform: translateX(-50%)

@keyframes slide-right
  0%
    width: 0%
  50%
    width: 50%
  100%
    width: 100%
</style>
