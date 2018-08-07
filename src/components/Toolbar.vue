<template>
  <v-toolbar flat color="transparent" dense>
    <v-toolbar-title v-text="title"></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat
        to="/"
      >home</v-btn>
      <v-btn flat
        v-if="currentUser"
        :to="`/myalbum/${currentUser.uid}`"
      >my album</v-btn>
      <v-btn flat
        v-if="currentUser"
        :to="`/profile/${currentUser.uid}`"
      >my profile</v-btn>
      <v-btn
        flat color="info"
        @click="signIn"
        v-if="!currentUser"
      >
        sign in
      </v-btn>
      <v-btn
        flat color="error"
        @click="signOut"
        v-else
      >
        sign out
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import firebase from 'firebase'

export default {
  props: ['title'],
  data: () => ({
    currentUser: null
  }),
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      this.currentUser = user
    })
  },
  methods: {
    signIn () {
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(() => {
          this.$router.push('/')
        })
    },
    signOut () {
      firebase.auth().signOut()
      this.$router.push('/')
    }
  }
}
</script>
