<template>
  <aside
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
      <b-list-group-item>item</b-list-group-item>
    </b-list-group>
  </aside>
</template>

<script>
export default {}
</script>

<style lang="sass" scoped>
$aside-background: #f8f9fa

#aside__wrapper
  width: 250px
  height: 100%
  overflow-y: auto
  background-color: $aside-background

.mobile
  height: calc(100vh - 50px) !important
  position: absolute
  box-shadow: none

.desktop
  height: 100%
  box-shadow: 0px 0px 10px 6px darken($aside-background, 5)
</style>
