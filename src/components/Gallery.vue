<template>
<v-card>
  <v-card-actions class="pa-2">
    <v-btn-toggle v-model="sorting">
      <v-tooltip top>
        <v-btn flat color="primary" slot="activator">
          <v-icon>format_list_numbered</v-icon>
        </v-btn>
        <span>New</span>
      </v-tooltip>
      <v-tooltip top>
        <v-btn flat color="red" slot="activator">
          <v-icon>favorite</v-icon>
        </v-btn>
        <span>Trending</span>
      </v-tooltip>
    </v-btn-toggle>
    <v-spacer></v-spacer>
    <div v-if="currentUser">
      <v-btn color="success" @click.stop="toggleUploadDialog">
        <v-icon>add_photo_alternate</v-icon>
        &nbsp;Upload New
      </v-btn>
    </div>
  </v-card-actions>
  <v-card-title class="pa-2">
    <v-container grid-list-xs wrap class="pa-0">
      <v-layout row wrap>
        <v-flex
          v-for="(photo, index) in photos"
          :key="index"
          xs12
          sm6
          md3
        >
          <v-card flat tile
            class="card"
          >
            <v-card-media
              :src="photo.url"
              height="190px"
            >
            <!-- @click="selectPhoto(photo._id)" -->
            </v-card-media>
            <div class="option fadein hidden-sm-and-down">
              <div class="top-right">
                <v-btn icon
                  color="white"
                  :ripple="false"
                  v-if="currentUser"
                  @click="clickLike(photo._id, photo.like)"
                >
                  <v-icon color="red accent-2"
                    v-if="options && options.length !== 0
                      && photo._id in options.photos
                      && options.photos[photo._id].like === true"
                  >favorite</v-icon>
                  <v-icon color="red accent-2"
                    v-else
                  >favorite_border</v-icon>
                </v-btn>
                <v-btn icon
                  color="info"
                >
                  <v-icon>share</v-icon>
                </v-btn>
              </div>
              <div class="bottom-right">
                <v-btn depressed
                  @click="selectPhoto(photo._id)"
                >
                  <v-icon>input</v-icon>
                  view
                </v-btn>
              </div>
            </div>
            <v-card-actions class="hidden-md-and-up">
              <v-btn icon
                color="white"
                :ripple="false"
                v-if="currentUser"
                @click="clickLike(photo._id, photo.like)"
              >
                <v-icon color="red accent-2"
                  v-if="options && options.length !== 0
                    && photo._id in options.photos
                    && options.photos[photo._id].like === true"
                >favorite</v-icon>
                <v-icon color="red accent-2"
                  v-else
                >favorite_border</v-icon>
              </v-btn>
              <v-btn icon
                color="info"
                outline
              >
                <v-icon>share</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn depressed
                @click="selectPhoto(photo._id)"
              >
                <v-icon>input</v-icon>
                view
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card-title>
  
  <upload-dialog
    :open="uploadDialog"
    :uploading="uploading"
    :progress="progress"
    @close="toggleUploadDialog"
    @upload="upload"
    v-if="uploadDialog"
  ></upload-dialog>
</v-card>
</template>

<script>
import firebase from 'firebase'
import { Photos, Users } from '@/services'

import UploadDialog from '@/components/UploadDialog'

export default {
  props: ['photos'],
  components: {
    UploadDialog
  },
  data: () => ({
    currentUser: null,
    sorting: 0,
    recent_sorting: 0,
    uploadDialog: false,
    like: false,
    options: [],
    progress: 0,
    uploading: false
  }),
  watch: {
    sorting () {
      if (this.sorting !== null) {
        this.recent_sorting = this.sorting
      } else {
        this.sorting = this.recent_sorting
      }
    }
  },
  created () {
    this.reload()
    this.loadUser()
    this.getOptions()
  },
  methods: {
    reload () {
      firebase.auth().onAuthStateChanged((user) => {
        this.currentUser = user
      })
    },
    loadUser () {
      this.currentUser = firebase.auth().currentUser
      // if (!this.currentUser) return
      // this.getOptions(this.currentUser.uid)
    },
    selectPhoto (id) {
      this.$router.push(`/photo/${id}`)
    },
    toggleFilter (v) {
      this.filter = v
    },
    toggleUploadDialog () {
      (this.uploadDialog) ? this.uploadDialog = false : this.uploadDialog = true
    },
    clickLike (id, value) {
      if (!this.options || this.options.length === 0) {
        console.log('1')
        this.likePhoto(id, value)
      } else {
        if (id in this.options.photos) {
          console.log('2')
          if (this.options.photos[id].like === true) {
            console.log('4')
            this.unlikePhoto(id, value)
          } else {
            console.log('5')
            this.likePhoto(id, value)
          }
        } else {
          console.log('3')
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
    },
    upload (value) {
      if (!value.file) return
      const key = Date.now()
      const id = Users.getCurrentUser().uid
      this.uploading = true
      const task = Photos.put(`files/user/${id}/photos/${key}`, value.file)
      task.on('state_changed', (snapshot) => {
        this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      }, (error) => {
        console.log(error)
      }, () => {
        task.snapshot.ref.getDownloadURL().then((downloadURL) => {
          Photos.set(`photos/${key}`, {
            name: value.name,
            url: downloadURL,
            owner: id,
            like: 0,
            downloaded: 0
          })
          this.uploading = false
        })
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
