<template>
  <div
    id="aside__wrapper"
    v-show="this.$store.state.ui.asideLeft.show"
    :class="[this.$store.state.ui.asideLeft.isMobile ? 'mobile' : 'desktop']"
  >
    <!-- Header -->
    <b-container class="p-4">
      <h4 class="m-0">Módulos</h4>
    </b-container>

    <!-- Main content slot -->
    <b-list-group>
      <b-list-group-item
        href="#"
        v-for="route in getDashboardRoutes"
        :key="route.id"
      >
        <router-link :to="route.path">{{ route.title }}</router-link>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { routes } from '@/routes'

export default {
  computed: {
    getDashboardRoutes () {
      return routes.find(route => route.name === 'Dashboard').children
    }
  }
}
</script>

<style lang="sass" scoped>
$aside-background: #f8f9fa

#aside__wrapper
  width: 100%
  height: 100%
  overflow-y: auto
  border-right: 0.5px solid lightgrey
  background-color: $aside-background

.mobile
  position: absolute
  z-index: 100 !important
  height: calc(100% - 50px) !important

.desktop
  height: 100%
</style>
