<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-card>
      <v-card-media
        :src="currentUser.photo"
        height="300px"
        class="card"
      >
        <div class="option fadein">
          <div class="bottom-right">
            <v-btn depressed
              @click.stop="toggleUploadDialog"
            >
              <v-icon>edit</v-icon>
              edit photo
            </v-btn>
          </div>
        </div>
      </v-card-media>

      <v-card-title primary-title>
        <v-text-field
          v-model="currentUser.displayName"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="currentUser.email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
      </v-card-title>
      <v-card-actions>
        <div v-if="editForm">
          <v-btn
            color="success"
            :disabled="!valid"
            @click="submit"
          >submit</v-btn>
          <v-btn
            flat
            color="info"
            @click="cancel"
          >cancel</v-btn>
          <v-btn
            flat
            color="error"
            @click="clear"
          >clear</v-btn>
        </div>
        <div v-else>
          <v-btn
            flat
            color="info"
            @click="editForm = true"
          >edit</v-btn>
        </div>
      </v-card-actions>
    </v-card>
    <upload-dialog
      :open="uploadDialog"
      :uploading="uploading"
      :progress="progress"
      @close="toggleUploadDialog"
      @upload="upload"
      v-if="uploadDialog"
    ></upload-dialog>
  </v-form>
</template>

<script>
import { Photos, Users } from '@/services'
import UploadDialog from '@/components/UploadDialog'

export default {
  props: {
    data: Object,
    edit: {
      type: Boolean,
      default: false
    }
  },
  components: {
    UploadDialog
  },
  data: () => ({
    currentUser: {
      displayName: '',
      email: '',
      photo: ''
    },
    editForm: false,
    valid: true,
    nameRules: [
      v => !!v || 'Name is required'
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    uploadDialog: false,
    progress: 0,
    uploading: false
  }),
  created () {
    this.loadData()
  },
  watch: {
    data () {
      this.loadData()
    },
    edit () {
      this.editForm = this.edit
    }
  },
  methods: {
    loadData () {
      const data = this.data
      this.currentUser = {
        displayName: data.displayName,
        email: data.email,
        photo: data.photo
      }
    },
    submit () {
      if (this.$refs.form.validate()) {
        this.$emit('submit', this.currentUser)
      }
      this.editForm = false
    },
    cancel () {
      this.loadData()
      this.editForm = false
    },
    clear () {
      this.$refs.form.reset()
    },
    toggleUploadDialog () {
      (this.uploadDialog) ? this.uploadDialog = false : this.uploadDialog = true
    },
    upload (value) {
      if (!value.file) return
      const key = Date.now()
      const id = Users.getCurrentUser().uid
      this.uploading = true
      const task = Photos.put(`files/user/${id}/avatar/${key}`, value.file)
      task.on('state_changed', (snapshot) => {
        this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      }, (error) => {
        console.log(error)
      }, () => {
        task.snapshot.ref.getDownloadURL().then((downloadURL) => {
          Users.update(id, {
            photo: downloadURL
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
