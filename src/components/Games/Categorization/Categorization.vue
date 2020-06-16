<template>
  <b-container class="pt-3">
    <b-container>
      <b-row>
        <b-col>
          <h4>Categories</h4>
          <pre>{{ this.$store.state.games.categories }}</pre>
        </b-col>
        <b-col>
          <h4>Local categories</h4>
          <pre> {{ this.categories }} </pre>
          <h4>List</h4>
          <pre> {{ this.list }} </pre>
        </b-col>
      </b-row>
    </b-container>

    <b-row>
      <!-- All word list -->
      <b-col sm="12" md="12">
        <b-card-group>
          <b-card header="Palabras">
            <draggable
              class="d-flex flex-wrap justify-content-center"
              :class="drag.dragging ? 'dragMode' : ''"
              tag="b-list-group"
              :list="list"
              :component-data="getListWordsComponentData()"
              v-bind="dragOptions"
              :group="drag.group"
              @start="drag.dragging = true"
              @end="drag.dragging = false"
            >
              <b-list-group-item v-for="item in list" :key="item">{{ item }}</b-list-group-item>
            </draggable>
          </b-card>
        </b-card-group>
      </b-col>

      <!-- Columns list containers -->
      <b-col class="pt-3" sm="12" md="12">
        <b-row>
          <b-col
            v-for="category in categories"
            :key="category.id"
            class="pb-3"
            sm="12"
            md="3"
          >
            <b-card-group deck>
              <b-card :header="category.name">
                <draggable
                  :class="drag.dragging ? 'dragMode' : ''"
                  tag="b-list-group"
                  v-model="category.input"
                  v-bind="dragOptions"
                  :group="drag.group"
                  @start="drag.dragging = true"
                  @end="drag.dragging = false"
                >
                  <b-list-group-item v-for="item in category.input" :key="item">{{ item }}</b-list-group-item>
                </draggable>
              </b-card>
            </b-card-group>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <b-row>
      <b-col sm="12" md="12">
        <button
          class="btn btn-success float-right"
          v-if="list.length <= 0"
          @click="finish()"
        >Enviar respuestas</button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import draggable from 'vuedraggable'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    draggable
  },

  created () {
    Promise.all(
      [
        this.$store.dispatch('games/loadCollectionIfNotExists')
      ]).then(this.load())
  },

  computed: {
    ...mapGetters('firebase', ['USER_HAS_FINISHED']),

    dragOptions: () => ({
      animation: 200,
      disabled: false,
      ghostClass: 'ghost'
    })
  },

  data: () => ({
    drag: {
      group: 'shared-group',
      dragging: false
    },

    list: [],

    categories: []
  }),

  methods: {
    ...mapActions('firebase', ['SAVE_ANSWERS']),

    load () {
      console.log('loading...')
      this.$forceUpdate()
      console.log(this.$store.state.games.categories)
      this.$store.state.games.categories.map(item => this.categories.push(item))
      //
      // Initialize categories
      this.categories = this.$store.state.games.categories.reduce((acc, curr, idx, arr) => {
        console.log(curr)
        acc.push({ name: curr.name, words: curr.words.map(w => w), input: [] })
        return acc
      }, [])

      // All available words
      this.list = this.$store.state.games.categories.reduce(
        (acc, val) => acc.concat(val.words.map(this.capitalize())),
        []
      )
    },

    getListWordsComponentData: () => ({
      attrs: {
        horizontal: 'md'
      }
    }),

    capitalize: () => ele => ele.charAt(0).toUpperCase() + ele.slice(1),

    getStatistics () {
      const statistics = this.categories.reduce((acc, current, index, arr) => {
        const matched = current.words.filter(ele =>
          current.input.find(word => word === ele)
        )
        const unmatched = current.input.filter(
          ele => !current.words.find(word => ele === word)
        )
        const success = matched.length
        const errors = unmatched.length

        acc.push({ module: current.name, matched, unmatched, success, errors })

        return acc
      }, [])

      return statistics
    },

    finish () {
      // Save and send data to firebase
      const statistics = this.getStatistics()
      this.SAVE_ANSWERS(statistics)
    }
  }
}
</script>

<style lang="scss" scoped>
.dragMode {
  border: 3px dashed #f363f8;
  background: #faeffd;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>
