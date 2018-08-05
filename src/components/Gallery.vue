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
    <div>
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
          xs3
          @click="click(photo._id)"
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
  </v-card-title>
</v-card>
</template>

<script>
export default {
  props: ['photos'],
  data: () => ({
    sorting: 0,
    recent_sorting: 0
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
  methods: {
    click (v) {
      console.log(v)
    },
    toggleFilter (v) {
      this.filter = v
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
