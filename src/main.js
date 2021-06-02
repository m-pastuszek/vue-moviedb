import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.prototype.$appVersion = '1.0.4'
Vue.prototype.$apiKey = '3e050bb165be726c2a0ad52a1e78b4c4'

Vue.filter('truncate', function (text, stop, clamp) {
  return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
