<template>
  <v-layout>
    <v-flex>
      <gallery :photos="photos"></gallery>
      <upload-dialog :open="uploadDialog"
        @close="toggleUploadDialog"
        v-if="uploadDialog"
      ></upload-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from 'firebase'
import Gallery from '@/components/Gallery'
import UploadDialog from '@/components/UploadDialog'

export default {
  components: {
    Gallery,
    UploadDialog
  },
  data: () => ({
    id: null,
    photos: [],
    uploadDialog: false
  }),
  watch: {
    $route () {
      this.reload()
    }
  },
  created () {
    this.reload()
  },
  methods: {
    reload () {
      this.id = this.$route.params.id
      this.getPhotos()
    },
    toggleUploadDialog () {
      (this.uploadDialog) ? this.uploadDialog = false : this.uploadDialog = true
    },
    getPhotos () {
      firebase.database().ref('photos')
        .orderByChild('owner')
        .equalTo(this.id)
        .on('value', (snapshot) => {
          this.photos = snapshot.val()
        })
    }
  }
}
</script>
