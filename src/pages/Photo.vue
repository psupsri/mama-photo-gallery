<template>
  <v-layout row wrap>
    <v-flex
      xs12
      sm6
      md4
      text-xs-center
    >
      <v-card>
        <v-card-media
          :src="photo.url"
          :height="300"
        ></v-card-media>
        <v-card-actions>
          <v-btn
            v-if="currentUser"
            color="success"
            @click="download"
          >download</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex>
      <v-avatar
        :tile="false"
        :size="150"
        color="grey lighten-4"
        v-if="owner"
      >
        <img :src="owner.photo" alt="avatar">
      </v-avatar>
      {{ owner.displayName }}
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
    currentUser: null
  }),
  watch: {
    $route () {
      this.reload()
    }
  },
  created () {
    this.reload()
    this.loadPhotoData()
    this.loadOwnerData()
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
      Photos.update(`photos/${this.id}`, {
        downloaded: this.photo.downloaded + 1
      })
    }
  }
}
</script>
