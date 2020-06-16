export default {
  namespaced: true,

  state: {
    asideLeft: {
      show: true,
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
