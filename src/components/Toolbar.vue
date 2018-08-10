<template>
  <v-toolbar flat color="transparent" dense>
    <v-toolbar-title
      v-text="title"
    ></v-toolbar-title>
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
    <v-btn icon
      to="/"
      class="hidden-md-and-up"
    ><v-icon>home</v-icon></v-btn>
    <v-btn icon
      v-if="currentUser"
      class="hidden-md-and-up"
      :to="`/myalbum/${currentUser.uid}`"
    ><v-icon>collections</v-icon></v-btn>
    <v-btn icon
      v-if="currentUser"
      class="hidden-md-and-up"
      :to="`/profile/${currentUser.uid}`"
    ><v-icon>person</v-icon></v-btn>
    <v-btn
      icon color="success"
      @click="signIn"
      v-if="!currentUser"
      class="hidden-md-and-up"
    >
      <v-icon>input</v-icon>
    </v-btn>
    <v-btn
      icon color="error"
      @click="signOut"
      class="hidden-md-and-up"
      v-else
    >
      <v-icon>input</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import firebase from 'firebase'
import { Users } from '@/services'

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
        .then((res) => {
          const user = res.user
          Users.getById(user.uid, (snapshot) => {
            if (!snapshot.val()) {
              Users.set(user.uid, {
                displayName: user.displayName,
                email: user.email,
                photo: user.photoURL,
                role: {
                  admin: false
                }
              })
            }
          })
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
