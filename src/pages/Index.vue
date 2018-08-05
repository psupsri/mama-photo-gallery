<template>
  <v-layout>
    <v-flex>
      <gallery :photos="photos"></gallery>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from 'firebase'

import Gallery from '@/components/Gallery'

export default {
  components: {
    Gallery
  },
  data: () => ({
    filter: 'all',
    photos: []
  }),
  created () {
    this.getPhotos()
  },
  methods: {
    toggleUploadDialog () {
      (this.uploadDialog) ? this.uploadDialog = false : this.uploadDialog = true
    },
    getPhotos () {
      firebase.database().ref('photos')
        .on('value', (snapshot) => {
          let result = []
          snapshot.forEach((childSnapshot) => {
            // key will be "ada" the first time and "alan" the second time
            let key = childSnapshot.key
            // childData will be the actual contents of the child
            let data = childSnapshot.val()
            data._id = key
            result.push(data)
          })
          this.photos = result
        })
    }
  }
}
</script>
