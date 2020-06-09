<template>
  <b-container class="mycontainer">
    <b-row>
      <!-- All word list -->
      <b-col class="mycontainer" sm="12" md="12">
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
      <b-col class="mycontainer" sm="12" md="12">
        <b-row class="d-flex">
          <b-col
            v-for="category in categories"
            :key="category.id"
            class="mycontainer"
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
      <b-col class="mycontainer" sm="12" md="12">
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
import CATEGORIES from '../data/categories'

export default {
  components: {
    draggable
  },

  created () {
    this.init()
  },

  computed: {
    dragOptions () {
      return {
        animation: 200,
        disabled: false,
        ghostClass: 'ghost'
      }
    }
  },

  data () {
    return {
      drag: {
        group: 'shared-group',
        dragging: false
      },

      list: [],

      categories: []
    }
  },

  methods: {
    init () {
      Object.assign(this.$data, this.$options.data())
      console.log('iniciando stack...')
      //
      // Initialize categories
      this.categories = [...CATEGORIES]
      //
      // All available words
      const capitalize = ele => ele.charAt(0).toUpperCase() + ele.slice(1)
      this.list = CATEGORIES.reduce(
        (acc, val) => acc.concat(val.words.map(capitalize)),
        []
      )
    },

    getListWordsComponentData () {
      return {
        attrs: {
          horizontal: 'md'
        }
      }
    },

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
      this.getStatistics().map(ele => console.log(ele))
    }
  }
}
</script>

<style lang="scss" scoped>
.mycontainer {
  padding-top: 7px;
  padding-bottom: 7px;
}
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
