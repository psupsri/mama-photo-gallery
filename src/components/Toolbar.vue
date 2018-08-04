<template>
  <v-toolbar flat color="transparent" dense>
    <v-toolbar-title v-text="title"></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat v-for="(item, i) in items" :key="i" :to="item.link">{{ item.title }}</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  props: ['items', 'title']
}
</script>
