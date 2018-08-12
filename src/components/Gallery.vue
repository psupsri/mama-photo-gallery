<template>
<v-card>
  <v-card-actions class="pa-2">
    <sorting-button
      :value="sorting"
      :items="sortingItems"
      @sortingFilter="sortingFilter"
    ></sorting-button>
    <v-spacer></v-spacer>
    <div v-if="currentUser">
      <v-btn color="success" @click.stop="toggleUploadDialog">
        <v-icon>add_photo_alternate</v-icon>
        &nbsp;Upload New
      </v-btn>
    </div>
  </v-card-actions>
  <v-card-actions>
    <tags :items="tags" @selectTag="selectTag"></tags>
  </v-card-actions>
  <v-card-title class="pa-2">
    <v-container grid-list-xs wrap class="pa-0">
      <v-layout row wrap>
        <v-flex
          v-for="(photo, index) in showPhotos[currentPage - 1]"
          :key="index"
          xs12 sm6 md3
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
  <v-card-actions >
    <v-spacer></v-spacer>
    <div class="text-xs-center">
      <v-pagination
        v-model="currentPage"
        :length="showPhotos.length"
        :total-visible="5"
      ></v-pagination>
    </div>
  </v-card-actions>
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
import _ from 'lodash'
import { Photos, Users } from '@/services'

import SortingButton from '@/components/SortingButton'
import UploadDialog from '@/components/UploadDialog'
import Tags from '@/components/Tags'

export default {
  props: ['items'],
  components: {
    UploadDialog,
    SortingButton,
    Tags
  },
  data: () => ({
    currentUser: null,
    currentPage: 1,
    itemsPerPage: 8,
    sorting: 0,
    sortingItems: [
      {
        title: 'New',
        color: 'primary',
        icon: 'format_list_numbered'
      },
      {
        title: 'Trending',
        color: 'red',
        icon: 'favorite'
      }
    ],
    uploadDialog: false,
    like: false,
    photos: [],
    options: [],
    tags: [],
    currentTag: 'all',
    progress: 0,
    uploading: false
  }),
  created () {
    this.reload()
    this.getPhotos()
  },
  watch: {
    currentUser () {
      this.getPhotos()
    },
    sorting () {
      this.getPhotos()
    },
    items () {
      this.getPhotos()
    },
    currentTag () {
      this.getPhotos()
    },
    photos () {
      this.getTags()
      this.getOptions()
    }
  },
  computed: {
    showPhotos () {
      return _.chunk(this.photos, this.itemsPerPage)
    }
  },
  methods: {
    reload () {
      firebase.auth().onAuthStateChanged((user) => {
        this.currentUser = user
      })
    },
    getPhotos () {
      let result = []
      if (this.sorting === 0) {
        result = this.items
      } else {
        result = _.orderBy(this.items, ['like', '_createdAt'], ['desc', 'desc'])
      }
      if (this.currentTag === 'all') {
        this.photos = result
      } else {
        this.photos = _.filter(result, { 'tag': this.currentTag })
      }
    },
    selectPhoto (id) {
      this.$router.push(`/photo/${id}`)
    },
    sortingFilter (v) {
      this.sorting = v
    },
    toggleUploadDialog () {
      (this.uploadDialog) ? this.uploadDialog = false : this.uploadDialog = true
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
    },
    getTags () {
      firebase.database()
        .ref('tags')
        .on('value', (snapshot) => {
          this.tags = snapshot.val()
        })
    },
    selectTag (v) {
      this.currentTag = v
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
            downloaded: 0,
            _createdAt: key
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
