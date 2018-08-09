<template>
  <v-app>
    <v-jumbotron
      style="background: #fefefe"
      height="100%"
    >
      <v-container fill-height>
        <v-layout>
          <v-flex>
            <toolbar 
              :title="title"
            ></toolbar>
            <v-divider></v-divider>
            <v-container fill-height grid-list-md text-xs-center>
              <router-view></router-view>
            </v-container>
          </v-flex>
        </v-layout>
        
      </v-container>
    </v-jumbotron>
  </v-app>
</template>

<script>
import Toolbar from '@/components/Toolbar'

export default {
  components: {
    Toolbar
  },
  data: () => ({
    title: 'Mama-photos',
    sideMenu: false
  }),
  created () {
    this.$store.dispatch('getphotosfromdatabase')
  }
}
</script>
