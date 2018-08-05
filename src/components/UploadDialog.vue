<template>
<v-layout row justify-center>
  <v-dialog
    v-model="open"
    persistent
    max-width="300"
  >
    <v-card>
      <v-card-title>
        <input
          type="file"
          ref="file"
          v-show="false"
          @change="onPhotoPicked"
        >
        <img
          src="@/assets/upload_photo.png"
          class="cover"
          @click="pickPhoto"
          v-if="photo.url === ''"
        >
        <img :src="photo.url"
          class="cover" v-if="photo.url !== ''"
          @click="pickPhoto"
        >
        <v-progress-linear
          v-model="progress"
          color="success"
          height="10"
          v-if="photo.url !== ''"
        ></v-progress-linear>
      </v-card-title>
      <v-card-actions>
        <v-btn
          color="primary"
          @click="pickPhoto"
          v-if="photo.url !== ''"
          :flat="progress === 100 ? true : false"
        >find new
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="success"
          @click="upload"
          v-if="photo.url !== '' && progress !== 100"
        >upload</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          :flat="progress === 100 ? false : true"
          @click="close"
        >Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-layout>
</template>

<script>
import firebase from 'firebase'

export default {
  props: ['open'],
  data: () => ({
    photo: {
      name: '',
      url: '',
      file: ''
    },
    uploading: false,
    progress: 0,
    currentUser: null
  }),
  created () {
    this.currentUser = firebase.auth().currentUser
  },
  methods: {
    close () {
      this.$emit('close')
    },
    pickPhoto () {
      this.$refs.file.click()
    },
    onPhotoPicked (e) {
      this.progress = 0
      const files = e.target.files
      if (files[0] === undefined) return
      this.photo.name = files[0].name
      if (this.photo.name.lastIndexOf('.') <= 0) {
        return
      }
      const fr = new FileReader()
      fr.readAsDataURL(files[0])
      fr.addEventListener('load', () => {
        this.photo.url = fr.result
        this.photo.file = files[0] // this is an file file that can be sent to server...
      })
    },
    upload () {
      if (!this.photo.file) return
      const key = Date.now()
      const task = firebase.storage().ref(`files/${key}`).put(this.photo.file)
      this.uploading = true
      task.on('state_changed', (snapshot) => {
        this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      }, (error) => {
        console.log(error)
      }, () => {
        task.snapshot.ref.getDownloadURL().then((downloadURL) => {
          firebase.database().ref(`photos/${key}`)
            .set({
              name: this.photo.name,
              url: downloadURL,
              owner: this.currentUser.uid
            })
          this.uploading = false
        })
      })
    }
  }
}
</script>

<style scoped>
.cover {
  width: 270px;
  height: 270px;
  cursor: pointer;
  object-fit: cover;
}
</style>
