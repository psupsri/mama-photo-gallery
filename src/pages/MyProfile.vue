<template>
  <v-layout row wrap>
    <v-flex
      xs12
      sm6
      md4
      text-xs-center
    >
      <profile-form :data="currentUser" @submit="submit"></profile-form>
    </v-flex>
    <v-flex>
      <v-layout row wrap>
        <v-flex>
          <v-card>
            {{ ownPhotosCount }}
            Photo uploaded
          </v-card>
        </v-flex>
        <v-flex>
          <v-card>
            {{ ownPhotosLikedCount }}
            Like your photo
          </v-card>
        </v-flex>
        <v-flex>
          <v-card>
            {{ ownPhotosDownloadedCount }}
            Download your photo
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import _ from 'lodash'

import { Photos, Users } from '@/services'

import ProfileForm from '@/components/ProfileForm'

export default {
  components: {
    ProfileForm
  },
  data: () => ({
    currentUser: {
      displayName: '',
      email: '',
      photo: ''
    },
    ownPhotos: []
  }),
  created () {
    this.loadUser()
    this.loadPhotoByOwner()
  },
  computed: {
    ownPhotosCount () {
      return this.ownPhotos.length
    },
    ownPhotosLikedCount () {
      return _.reduce(this.ownPhotos, (sum, n) => {
        return sum + n.like
      }, 0)
    },
    ownPhotosDownloadedCount () {
      return _.reduce(this.ownPhotos, (sum, n) => {
        return sum + n.downloaded
      }, 0)
    }
  },
  methods: {
    loadUser () {
      Users.getById(Users.getCurrentUser().uid, (snapshot) => {
        const user = snapshot.val()
        this.currentUser = {
          displayName: user.displayName,
          email: user.email,
          photo: user.photo
        }
      })
    },
    loadPhotoByOwner () {
      Photos.getByOwner(Users.getCurrentUser().uid, (snapshot) => {
        this.ownPhotos = snapshot
      })
    },
    submit (value) {
      Users.update(Users.getCurrentUser().uid, value)
    }
  }
}
</script>
