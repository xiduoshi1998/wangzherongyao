import Vue from 'vue'
import App from './App.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'
import "@/assets/font/font_css.css"
import '@/components/index.js'

import http from './network/http'

Vue.use(VueAwesomeSwiper,)
Vue.prototype.$http = http

Vue.config.productionTip = false

import './style.scss'
import router from './router'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
