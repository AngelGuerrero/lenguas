export default {
  namespaced: true,

  state: {
    asideLeft: {
      show: true,
      isMobile: false
    },

    dashboard: {
      alert: {
        show: false,
        message: '',
        variant: 'light'
      }
    }
  },

  mutations: {
    toggleAside (state) { state.asideLeft.show = !state.asideLeft.show },

    setAsideToMobile (state, value) { state.asideLeft.isMobile = value },

    setDashboardalert (state, payload) { state.dashboard.alert = payload }
  }
}
