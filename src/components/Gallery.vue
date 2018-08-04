<template>
<v-container grid-list-xs wrap class="pa-0">
  <v-layout row wrap>
    <v-flex
      v-for="(photo, index) in photos"
      :key="index"
      xs3
    >
      <v-card flat tile
        class="card"
      >
        <v-card-media
          :src="photo.url"
          height="190px"
        >
        </v-card-media>
        <div class="option fadein">
          <div class="top-right">
            <v-btn icon
              color="white"
              :ripple="false"
            >
              <v-icon color="red accent-2">favorite_border</v-icon>
            </v-btn>
            <v-btn icon
              color="info"
            >
              <v-icon>share</v-icon>
            </v-btn>
          </div>
          <div class="bottom-right">
            <v-btn depressed>
              <v-icon>input</v-icon>
              view
            </v-btn>
          </div>
        </div>
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

<style scoped>
.option {
  display: none;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
.top-right {
  position: absolute;
  top: 0;
  right: 0;
}
.bottom-right {
  position: absolute;
  bottom: 0;
  right: 0;
}
.card {
  cursor: pointer;
}
.card:hover .option {
  display: block;
}
@-webkit-keyframes fadeIn {
  0% {opacity: 0;}
  100% {opacity: 1;}
}

@keyframes fadeIn {
  0% {opacity: 0;}
  100% {opacity: 1;}
}

.fadein {
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
}

</style>
