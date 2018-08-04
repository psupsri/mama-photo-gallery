<template>
  <v-app>
    <v-jumbotron
      style="background: #fefefe"
      height="100%">
      <v-container fill-height>
        <v-layout>
          <v-flex>
            <toolbar :title="title" :items="menu"></toolbar>
            <v-divider></v-divider>
            <v-container fill-height>
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
    menu: [
      { 'title': 'Home', 'link': '/' }
      // ,
      // { 'title': 'My Album', 'link': '/myalbum' }
    ]
  })
}
</script>
