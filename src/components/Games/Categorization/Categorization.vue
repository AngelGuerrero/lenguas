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
        <!-- From -->
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
                :component-data="listGroupComponentAttributes()"
                :list="list"
                v-bind="dragOptions"
                :group="drag.group"
                :move="startGame"
                :sort="false"
                @start="drag.dragging = true"
                @end="drag.dragging = false"
                draggable=".list-transition-item"
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

        <!-- To -->
        <b-col class="pt-3" sm="12" md="12">
          <b-row>
            <b-col v-for="category in categories" :key="category.id" class="pb-3" sm="12" md="2">
              <b-card-group deck>
                <b-card
                  :header="category.name"
                  header-bg-variant="primary"
                  header-text-variant="light"
                  header-class="text-center text-uppercase font-weight-bold"
                >
                  <draggable
                    tag
                    v-bind="dragOptions"
                    v-model="category.input"
                    :class="drag.dragging ? 'dragMode' : ''"
                    :group="drag.group"
                    :disabled="isGameOver"
                    :sort="false"
                    @start="drag.dragging = true"
                    @end="drag.dragging = false"
                  >
                    <b-list-group-item v-for="item in category.input" :key="item" :disabled="isGameOver" >{{ item }}</b-list-group-item>
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
            v-if="isGameOver"
            class="btn btn-success float-right"
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
    prop_categories: {
      type: Array,
      required: true
    }
  },

  components: { draggable },

  created () {
    window.addEventListener('dragstart', (e) => console.log(e))
    this.load()
  },

  data: () => ({
    // Available words list.
    //
    list: [],

    // Contains the correct answers,
    // and the user answers.
    //
    categories: [],

    // Are the options for the
    // drang and drop components.
    //
    drag: {
      group: 'shared-group',
      dragging: false,
      disabled: false
    },

    // Variables for control the interval function.
    //
    interval: {
      fn: null,
      paused: false,
      cancelled: false
    }
  }),

  computed: {
    dragOptions: function () {
      return { animation: 400, disabled: false }
    },

    isGameOver: function () { return this.list.length <= 0 }
  },

  methods: {
    load () {
      //
      // Initialize categories
      this.categories = this.prop_categories.reduce((acc, curr, idx, arr) => {
        acc.push({ name: curr.name, words: curr.words.map(w => w), input: [] })
        return acc
      }, [])

      //
      // All available words
      this.list = this.prop_categories.reduce(
        (acc, val) => acc.concat(val.words),
        []
      )
    },

    startGame (e) {
      console.log(e.draggedContext.element)
      console.log(e.relatedContext)

      // Guards
      //
      if (e.draggedContext.element === null) {
        console.log('Element was null')
        console.log(e.draggedContext.element)
        return
      }
      //
      // Interval has started
      if (this.interval.fn !== null) return

      // Starts the interval for start to play
      this.interval.fn = setInterval(_ => this.shuffle(), 5000)
    },

    listGroupComponentAttributes: () => ({
      attrs: { horizontal: 'md' }
    }),

    clearInterval: () => clearInterval(this.interval.fn),

    shuffle () {
      const executeSuffle = () => this.list.sort(() => Math.random() - 0.5)

      const disableDragging = value => { this.drag.disabled = value }

      const isDragging = () => this.drag.dragging

      // Guards
      //
      if (this.interval.cancelled) { this.clearInterval(); return }
      //
      if (this.interval.paused) return

      // The user is not dragging ?
      //
      if (!this.drag.dragging) {
        setTimeout(_ => {
          if (!isDragging()) {
            disableDragging(true)
            executeSuffle()
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
