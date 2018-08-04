// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyAmhvtyJukfzpEwobwLhpabnm7dFFnydMM',
  authDomain: 'mama-photo-gallery.firebaseapp.com',
  databaseURL: 'https://mama-photo-gallery.firebaseio.com',
  projectId: 'mama-photo-gallery',
  storageBucket: 'mama-photo-gallery.appspot.com',
  messagingSenderId: '135989847086'
}

firebase.initializeApp(config)

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  ...App
})
