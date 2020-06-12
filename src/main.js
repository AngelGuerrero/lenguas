import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
//
// Firebase
import '@/data/firebaseconfig'
import { firestorePlugin } from 'vuefire'
//
// Bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//
// Own global styles
import './assets/scss/global.scss'

Vue.use(firestorePlugin)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
