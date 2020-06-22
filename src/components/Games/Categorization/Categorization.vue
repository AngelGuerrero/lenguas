<template>
  <div>
    <!-- Loading state -->
    <div v-if="xcategories.length <= 0">
      <b-alert variant="warning" show><strong>Cargando, por favor, espere...</strong></b-alert>
    </div>

    <!-- Success state -->
    <div id="categorization__wrapper" v-else>
      <b-container class="pt-4" fluid>
        <h2>Juego de palabras</h2>
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
                body-class="p-1"
                footer-bg-variant="white"
                footer-text-variant="dark"
              >
                <draggable
                  id="draggable-container"
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
                      v-for="(item, index) in list"
                      :key="item"
                      :id="'from-'+[index]"
                      :class="{ 'list-item-shuffling': drag.disabled }"
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
              <b-col
                v-for="(category, index) in categories"
                :key="category.id"
                class="p-1"
                sm="12"
                md="3"
              >
                <b-card-group deck>
                  <b-card
                    :header="category.name"
                    header-bg-variant="primary"
                    header-text-variant="light"
                    header-class="text-center text-uppercase font-weight-bold"
                    body-class="p-1"
                  >
                    <draggable
                      :id="'to-'+[index]"
                      tag="b-list-group"
                      v-bind="dragOptions"
                      v-model="category.input"
                      class="b-list-group-to"
                      :class="drag.dragging ? 'dragMode' : ''"
                      :group="drag.group"
                      :disabled="isGameOver || drag.disabled"
                      :sort="false"
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
              v-if="isGameOver"
              class="btn btn-success float-right"
              @click="finish()"
            >Enviar respuestas</button>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { mapState } from 'vuex'

export default {
  components: { draggable },

  created () {
    //
    // The first time gets remote data from firebase
    // and saves it to vuex if the data doesn't exists,
    // but still needs call the initial function 'load'
    // and loads all the necessary data for the component.
    this.$store.dispatch('games/getCategories')
  },

  watch: {
    //
    // If the user refresh the page,
    // the data will delay some time
    // and xcategories will be empty array,
    // then it needs listen changes in xcategories
    // and try to load again.
    xcategories: {
      immediate: true,
      deep: true,
      handler (val) { this.load(val) }
    }
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

    // Controls if list is reordering
    //
    isShuffle: false,

    // Variables for control the interval function.
    //
    interval: {
      fn: null,
      paused: false,
      cancelled: false
    }
  }),

  computed: {
    ...mapState('games', { xcategories: 'categories' }),

    dragOptions: function () { return { animation: 400, disabled: false } },

    isGameOver: function () { return this.list.length <= 0 }
  },

  methods: {
    /**
     * This function initialize the array of
     * all available words, and makes a copy
     * in categories hidding the right answers.
     */
    load (pcategories) {
      this.categories = pcategories.reduce(
        (acc, curr, idx, arr) => {
          acc.push({
            name: curr.name,
            words: curr.words.map(w => w),
            input: []
          })
          return acc
        },
        []
      )

      this.list = pcategories.reduce(
        (acc, val) => acc.concat(val.words),
        []
      )

      //
      // FIX: REMOVE NEXT LINE
      this.simulate()
    },

    /*
     * Start the game, this function is called on first and every movement,
     * also fires the interval time out for shuffle all the words list.
     */
    startGame (e) {
      //
      // Interval has started
      if (this.interval.fn !== null) return

      // Starts the interval and conditions to shuffle
      this.interval.fn = setInterval(_ => this.shuffle(), 5000)
    },

    /**
     * Attributes of the component that
     * will be render by vue draggable,
     * pased as props.
     */
    listGroupComponentAttributes: () => ({
      attrs: { horizontal: 'md' }
    }),

    /**
     * Clear the curent interval time out.
     */
    clearInterval: () => clearInterval(this.interval.fn),

    /**
     * Function to reorder words list,
     * meanwhile this function is executing
     * it must wait at least one second,
     * first to stop the user interaction and
     * second to view the time of css transitions
     * applicable only when is occurring this action.
     */
    shuffle () {
      const executeSuffle = () => this.list.sort(() => Math.random() - 0.5)

      const disableDragging = value => {
        this.drag.disabled = value
      }

      const isDragging = () => this.drag.dragging

      // Guards
      //
      if (this.interval.cancelled) {
        this.clearInterval()
        return
      }
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

          setTimeout(_ => disableDragging(false), 800)
        }, 50)
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

    // FIX: REMOVE THE NEXT FUNCTION
    async simulate () {
      this.list = []

      const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

      for (const cat of this.categories) {
        for (const word of cat.words) {
          await sleep(500)
          cat.input.push(word)
        }
      }

      this.finish()
    },

    finish () {
      // Save and send data to firebase
      const statistics = this.getStatistics()
      console.log(statistics)
    }
  }
}
</script>

<style lang="scss" scoped>
#categorization__wrapper {
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
#draggable-container {
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.dragMode {
  border: 3px dashed #f363f8;
  background: #faeffd;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0.5s;
}
.list-group {
  min-height: 20px;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

.b-list-group-to {
  min-height: 50px;
}

.list-group-item {
  cursor: move;

  i {
    cursor: pointer;
  }
}

.list-item-shuffling {
  border: 1px solid red !important;
  transition: transform 0.8s;
  user-select: none;
}

.list-transition-item {
  border-radius: 5px;
  user-select: none;
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
</style>
