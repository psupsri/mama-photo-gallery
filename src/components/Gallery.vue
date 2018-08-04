<template>
<v-container grid-list-xs wrap class="pa-0">
  <v-layout row wrap>
    <v-flex
      v-for="(photo, index) in photos"
      :key="index"
      xs3
    >
      <v-card flat tile>
        <v-card-media
          :src="photo.url"
          height="190px"
        ></v-card-media>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import firebase from 'firebase'

export default {
  data: () => ({
    photos: []
  }),
  created () {
    this.getPhotos()
  },
  methods: {
    getPhotos () {
      firebase.database().ref('photos')
        .on('value', (snapshot) => {
          this.photos = snapshot.val()
        })
    }
  }
}
</script>

