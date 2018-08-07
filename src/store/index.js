import Vue from 'vue'
import Vuex from 'vuex'
import Photos from './photos'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Photos
  }
})
