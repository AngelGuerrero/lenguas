<template>
  <div>
    <b-container class="pt-4" fluid>
      <h2>Juego de palabras</h2>
    </b-container>

    <b-container>
      <!-- <pre>{{ $data.list }}</pre> -->

    </b-container>

    <b-container class="pt-3" fluid>
      <b-row>
        <!-- All word list -->
        <b-col sm="12" md="12" v-if="!isGameOver">
          <b-card-group>
            <!-- Main card -->
            <b-card
              header="Palabras disponibles"
              header-bg-variant="dark"
              header-text-variant="white"
              header-class="text-center text-uppercase font-weight-bold"
              body-bg-variant="light"
              footer-bg-variant="white"
              footer-text-variant="dark"
            >
              <draggable
                tag="b-list-group"
                class="d-flex flex-wrap justify-content-center"
                :class="drag.dragging ? 'dragMode' : ''"
                :disabled="drag.disabled"
                :list="list"
                :component-data="getListWordsComponentData()"
                v-bind="dragOptions"
                :group="drag.group"
                :move="startGame"
                @start="drag.dragging = true"
                @end="drag.dragging = false"
              >
                <transition-group
                  name="list-transition"
                  class="d-flex flex-wrap justify-content-between list-wrapper-transition"
                >
                  <b-list-group-item
                    v-for="item in list"
                    :key="item"
                    :class="{ 'border-danger': drag.disabled }"
                    class="list-transition-item m-1 border border-success"
                  >{{ item }}</b-list-group-item>
                </transition-group>
              </draggable>
              <!-- Footer slot card -->
              <template v-slot:footer>
                <div class="w-25 d-flex align-items-center" v-if="drag.disabled">
                  <b-spinner label="Loading..." small variant="danger"></b-spinner>
                  <strong class="mx-3 text-danger">Reordenando...</strong>
                </div>
                <div v-else class="w-50 d-flex align-items-center">
                  <b-spinner type="grow" label="Ahora puedes arrastrar" small variant="success"></b-spinner>
                  <strong class="mx-3 text-success">Ahora puedes arrastrar</strong>
                </div>
              </template>
            </b-card>
          </b-card-group>
        </b-col>

        <!-- Columns list containers -->
        <b-col class="pt-3" sm="12" md="12">
          <b-row>
            <b-col v-for="category in categories" :key="category.id" class="pb-3" sm="12" md="4">
              <b-card-group deck>
                <b-card
                  :header="category.name"
                  header-bg-variant="primary"
                  header-text-variant="light"
                  header-class="text-center text-uppercase font-weight-bold"
                >
                  <draggable
                    tag="b-list-group"
                    v-bind="dragOptions"
                    v-model="category.input"
                    :class="drag.dragging ? 'dragMode' : ''"
                    :group="drag.group"
                    :disabled="isGameOver"
                    @start="drag.dragging = true"
                    @end="drag.dragging = false"
                  >
                    <b-list-group-item
                      v-for="item in category.input"
                      :key="item"
                      :disabled="isGameOver"
                    >{{ item }}</b-list-group-item>
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
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  props: {
    p_categories: {
      type: Array,
      required: true
    }
  },

  components: { draggable },

  created () {
    //
    // Load categories and all word list
    this.load()
  },

  computed: {
    dragOptions: function () {
      return {
        animation: 400,
        disabled: false
      }
    },

    isGameOver: function () {
      return this.list.length <= 0
    }
  },

  data: () => ({
    //
    // All words available
    list: [],
    //
    // Categories which contains the correct answers
    categories: [],
    //
    // Drag and drop options components
    drag: {
      group: 'shared-group',
      dragging: false,
      disabled: false
    },
    //
    // Variables for control the interval function
    // and shuffle list
    interval: {
      fn: null,
      paused: false,
      cancelled: false
    }
  }),

  methods: {
    load () {
      //
      // Initialize categories
      this.categories = this.p_categories.reduce((acc, curr, idx, arr) => {
        acc.push({ name: curr.name, words: curr.words.map(w => w), input: [] })
        return acc
      }, [])

      // All available words
      this.list = this.p_categories.reduce(
        (acc, val) => acc.concat(val.words),
        []
      )
    },

    startGame () {
      if (this.interval.fn !== null) return
      //
      // Starts the interval for start to play
      this.interval.fn = setInterval(_ => this.shuffle(), 5000)
    },

    getListWordsComponentData: () => ({
      attrs: {
        horizontal: 'md'
      }
    }),

    shuffle () {
      const exec = () => this.list.sort(() => Math.random() - 0.5)
      const disableDragging = val => { this.drag.disabled = val }
      const isDragging = () => this.drag.dragging

      //
      // Check if the internal went cancelled
      if (this.interval.cancelled) {
        clearInterval(this.interval.fn)
        return
      }
      //
      // Is paused?
      if (this.interval.paused) return
      //
      // The user is dragging ?
      if (!this.drag.dragging) {
        setTimeout(() => {
          if (!isDragging()) {
            disableDragging(true)
            exec()
          }

          setTimeout(_ => disableDragging(false), 500)
        }, 500)
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
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}

.list-transition-item {
  transition: all 0.8s;
  border-radius: 5px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
}
.list-transition-enter,
.list-transition-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-transition-leave-active {
  position: absolute;
}
.card-bg {
  background-color: white !important;
  background: transparent !important;
}
</style>
