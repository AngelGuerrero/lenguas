import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueRouter from 'vue-router'
import { routes } from './routes'
//
// Firebase
import '@/data/firebaseconfig'
import { firestorePlugin } from 'vuefire'
//
// Bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(firestorePlugin)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter)

const router = new VueRouter({ routes })

Vue.config.productionTip = false

new Vue({
  devtool: 'source-map',
  store,
  router,
  render: h => h(App)
}).$mount('#app')
