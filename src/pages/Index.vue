<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-actions class="pa-2">
          <!-- <v-btn-toggle v-model="sorting">
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
          </v-btn-toggle> -->
          <v-spacer></v-spacer>
          <div>
            <v-btn color="success" @click.stop="toggleUploadDialog">
              <v-icon>add_photo_alternate</v-icon>
              &nbsp;Upload New
            </v-btn>
          </div>
        </v-card-actions>
        <v-card-title class="pa-2">
          <gallery></gallery>
        </v-card-title>
      </v-card>
      <upload-dialog :open="uploadDialog" @close="toggleUploadDialog" v-if="uploadDialog"></upload-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import Gallery from '@/components/Gallery'
import UploadDialog from '@/components/UploadDialog'
export default {
  components: {
    Gallery,
    UploadDialog
  },
  data: () => ({
    filter: 'all',
    sorting: 0,
    recent_sorting: 0,
    uploadDialog: false
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
    toggleFilter (v) {
      this.filter = v
    },
    toggleUploadDialog () {
      (this.uploadDialog) ? this.uploadDialog = false : this.uploadDialog = true
    }
  }
}
</script>
