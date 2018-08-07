<template>
  <v-layout>
    <v-flex>
      <gallery :photos="getPhotos"></gallery>
    </v-flex>
  </v-layout>
</template>

<script>
import Gallery from '@/components/Gallery'
import { mapGetters } from 'vuex'

export default {
  components: {
    Gallery
  },
  data: () => ({
    filter: 'all',
    photos: []
  }),
  computed: {
    ...mapGetters({
      getPhotos: 'getPhotos'
    })
  },
  methods: {
    toggleUploadDialog () {
      (this.uploadDialog) ? this.uploadDialog = false : this.uploadDialog = true
    }
  }
}
</script>
