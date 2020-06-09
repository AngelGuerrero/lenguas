<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-container>
        <b-navbar-brand href="#">{{ title }}</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav></b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">

            <b-nav-item-dropdown right v-if="username">
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em>{{ username }}</em>
              </template>
              <b-dropdown-item href="#" @click="logout()">Salir</b-dropdown-item>
            </b-nav-item-dropdown>

          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
import { EventBus } from '../../event-bus'

export default {
  props: {
    username: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      title: 'Categorización'
    }
  },

  methods: {
    logout () {
      EventBus.$emit('on-logout')
    }
  }
}
</script>
