// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import firebase from 'firebase'

let app
const config = {
  apiKey: 'AIzaSyAmhvtyJukfzpEwobwLhpabnm7dFFnydMM',
  authDomain: 'mama-photo-gallery.firebaseapp.com',
  databaseURL: 'https://mama-photo-gallery.firebaseio.com',
  projectId: 'mama-photo-gallery',
  storageBucket: 'mama-photo-gallery.appspot.com',
  messagingSenderId: '135989847086'
}

firebase.initializeApp(config)

router.beforeEach((to, from, next) => {
  if (to.matched.some((x) => x.meta.requiresAuth)) {
    if (firebase.auth().currentUser) {
      next()
      return
    }
    next({ path: '/', query: { redirect: to.fullPath } })
    return
  }
  next()
})

Vue.use(Vuetify)

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      router,
      ...App,
      created () {
        firebase.auth().onAuthStateChanged((user) => {
          console.log(user)
        })
      }
    })
  }
})
