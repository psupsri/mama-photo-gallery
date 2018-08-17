<template>
  <v-layout row wrap>
    <v-flex
      xs12 sm6 md4
      text-xs-center
    >
      <v-card>
        <v-card-media
          :src="photo.url"
          :height="300"
        ></v-card-media>
        <v-card-title>
        </v-card-title>
        <v-card-actions>
          <v-btn
            v-if="currentUser"
            color="success"
            @click="download"
          >download</v-btn>
          <v-btn
            :href="photo.url"
            target="_blank"
            flat
            color="info"  
          >Open</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon
            color="white"
            :ripple="false"
            v-if="currentUser"
            @click="clickLike(id, photo.like)"
          >
            <v-icon color="red accent-2"
              v-if="options && options.length !== 0
                && id in options.photos
                && options.photos[id].like === true"
            >favorite</v-icon>
            <v-icon color="red accent-2"
              v-else
            >favorite_border</v-icon>
          </v-btn>
          <v-btn
            icon
            outline
            color="info">
            <v-icon>share</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { Photos, Users } from '@/services'

export default {
  data: () => ({
    id: null,
    photo: {},
    owner: {},
    currentUser: null,
    options: []
  }),
  watch: {
    $route () {
      this.reload()
    },
    id () {
      this.loadPhotoData()
    },
    photo () {
      this.loadOwnerData()
      this.getOptions()
    }
  },
  created () {
    this.reload()
  },
  methods: {
    reload () {
      this.id = this.$route.params.id
      this.currentUser = Users.getCurrentUser()
    },
    loadPhotoData () {
      Photos.getById(this.id, (snapshot) => {
        this.photo = snapshot.val()
      })
    },
    loadOwnerData () {
      Users.getById(this.photo.owner, (snapshot) => {
        this.owner = snapshot.val()
      })
    },
    download () {
      // Photos.update(`photos/${this.id}`, {
      //   downloaded: this.photo.downloaded + 1
      // })
      const url = this.photo.url
      console.log(url)
      // var xhr = new XMLHttpRequest()
      // xhr.responseType = 'blob'
      // xhr.onload = (event) => {
      //   var blob = xhr.response
      // }
      // xhr.open('GET', url)
      // xhr.send()
    },
    clickLike (id, value) {
      if (!this.options || this.options.length === 0) {
        this.likePhoto(id, value)
      } else {
        if (id in this.options.photos) {
          if (this.options.photos[id].like === true) {
            this.unlikePhoto(id, value)
          } else {
            this.likePhoto(id, value)
          }
        } else {
          this.likePhoto(id, value)
        }
      }
    },
    likePhoto (id, value) {
      Photos.update(`photos/${id}`, {
        like: value + 1
      })
      Photos.update(`options/${this.currentUser.uid}/photos/${id}`, {
        like: true
      })
    },
    unlikePhoto (id, value) {
      Photos.update(`photos/${id}`, {
        like: value - 1
      })
      Photos.update(`options/${this.currentUser.uid}/photos/${id}`, {
        like: false
      })
    },
    getOptions () {
      if (!Users.getCurrentUser()) return
      const id = Users.getCurrentUser().uid
      Photos.getOptions(id, (res) => {
        this.options = res
      })
    }
  }
}
</script>
