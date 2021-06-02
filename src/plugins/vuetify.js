import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

import pl from 'vuetify/es5/locale/pl'

Vue.use(Vuetify)

const opts = {
  lang: {
    locales: { pl },
    current: 'pl'
  },
  theme: {
    options: { variations: false },
    dark: localStorage.getItem('theme') === 'dark'
  }
}

export default new Vuetify(opts)
