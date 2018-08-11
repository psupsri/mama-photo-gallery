<template>
  <v-layout>
    <v-flex>
      <gallery :items="getPhotosByOwner"></gallery>
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
    id: null,
    photos: []
  }),
  watch: {
    $route () {
      this.reload()
    }
  },
  created () {
    this.reload()
  },
  computed: {
    ...mapGetters({
      getPhotosByOwner: 'getPhotosByOwner'
    })
  },
  methods: {
    reload () {
      this.id = this.$route.params.id
    }
  }
}
</script>
