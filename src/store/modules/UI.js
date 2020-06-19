export default {
  namespaced: true,

  state: {
    asideLeft: {
      show: false,
      isMobile: false
    }
  },

  mutations: {
    toggleAside (state) {
      state.asideLeft.show = !state.asideLeft.show
    },

    setAsideToMobile (state, value) {
      state.asideLeft.isMobile = value
    }
  }
}
