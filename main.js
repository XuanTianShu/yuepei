import Vue from 'vue'
import App from './App'
import store from './store' // store
import plugins from './plugins' // plugins
import './permission' // permission
import config from './config' // config
Vue.prototype.$baseUrl=config.baseUrl
Vue.use(plugins)

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

import noClick from '@/utils/utils.js'
Vue.prototype.$disabledClick=noClick.disabledClick
// import {disabledClick} from '@/utils/utils.js'
// Vue.prototype.$disabledClick=disabledClick

Vue.config.productionTip = false
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
  ...App
})

app.$mount()
