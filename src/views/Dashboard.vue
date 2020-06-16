<template>
  <div id="admin__wrapper">
    <!-- Aside left -->
    <aside-left />

    <!-- Main content -->
    <div id="admin__main-wrapper" class="p-3">
      <b-container>
        <router-view></router-view>
      </b-container>
    </div>
  </div>
</template>

<script>
import AsideLeft from '@/components/Shared/AsideLeft'

export default {
  components: { AsideLeft }
}
</script>

<style lang="sass" scoped>
#admin__wrapper
  background-color: white
  display: flex

#admin__main-wrapper
  flex-grow: 1
  overflow-y: auto
</style>
