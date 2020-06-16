<template>
  <div id="admin__wrapper">
    <!-- Left aside -->
    <aside-left-slot
      :mobile="this.$store.state.ui.asideLeft.isMobile"
      :visible="this.$store.state.ui.asideLeft.show"
    >
      <!-- Header -->
      <template v-slot:header>
        <b-container class="p-4">
          <h4 class="m-0">Módulos</h4>
        </b-container>
      </template>

      <!-- Main content slot -->
      <b-list-group>
        <b-list-group-item
          v-for="component in components"
          :key="component.id"
          @click="selectComponent(component.name)"
          href="#"
        >{{ component.title }}</b-list-group-item>
      </b-list-group>
    </aside-left-slot>

    <!-- Main content -->
    <div id="admin__main-wrapper" class="p-3">
      <b-container>
        <component v-bind:is="selectedComponent.component"></component>
      </b-container>
    </div>
  </div>
</template>

<script>
import AsideLeftSlot from '@/components/Shared/AsideLeftSlot'

export default {
  components: { AsideLeftSlot },

  created () {
    this.selectedComponent = this.components[1]
    this.checkWindowSize()
    window.addEventListener('resize', this.checkWindowSize)
  },

  data: () => ({
    selectedComponent: null,

    components: [
      {
        title: 'Usuarios',
        name: 'users',
        component: () => import('@/views/Users/UsersView')
      },
      {
        title: 'Juego categorización',
        name: 'categorization',
        component: () => import('@/components/Games/Categorization/Categorization.vue')
      }
    ]
  }),

  methods: {
    checkWindowSize () {
      this.$store.commit('ui/setAsideToMobile', window.innerWidth < 768)
    },

    selectComponent (name) {
      this.selectedComponent = this.components.find(com => com.name === name)
    }
  }
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
