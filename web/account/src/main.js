import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import store from './store/index'
import routes from './route-config'
import './common/filters/filters'
import Config from 'config/config'
import VeeValidate from 'vee-validate'
import config from './validator'
Vue.use(VeeValidate, config)

import XibUI from 'common/components/index.js'
Vue.use(XibUI)

/* style  for common  */
import 'assets/styles/style-common.css'
import 'assets/styles/animate.min.css'
import 'assets/styles/icon.css'

/* For Mobile */
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'assets/styles/style-component.css'
Vue.use(MintUI)

Vue.use(VueResource)
if (process.env.NODE_ENV === 'development' && Config.isTestJson) {
  Vue.http.options.root = '/static/data'
}
Vue.http.options.emulateJSON = true
Vue.http.options.timeout = 60000

Vue.use(VueRouter)

export const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    console.log('need logon , ' + to.fullPath)
    let isLogon = store.getters.isLogon
    console.log(store.getters.user.name)
    if (!isLogon) {
      next({name: 'login', params: {redirect: to.fullPath}})
    } else {
      next()
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
