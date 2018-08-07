import { Photos, Users } from '@/services'
import _ from 'lodash'

const state = {
  photos: []
}

const mutations = {
  GETPHOTOSFROMDATABASE (state) {
    Photos.get((result) => {
      state.photos = result
    })
  }
}

const actions = {
  getphotosfromdatabase ({ commit }) {
    commit('GETPHOTOSFROMDATABASE')
  }
}

const getters = {
  getPhotos: state => state.photos,
  getPhotosByOwner: state => _.filter(state.photos, { 'owner': Users.getCurrentUser().uid })
}

export default {
  state,
  getters,
  mutations,
  actions
}
