<template>
  <div class="text-xs-center">
    <v-chip
      :color="color"
      text-color="white"
      :selected="currentTag === 'all'"
      @click="select('all')">ALL</v-chip>
    <v-chip
      v-for="(item, i) in items"
      :key="i" :color="color"
      text-color="white"
      @click="select(item)"
      :selected="currentTag === item"
    >{{ item | toUpper }}</v-chip>
  </div>
</template>

<script>
export default {
  props: ['items'],
  data: () => ({
    currentTag: 'all',
    color: 'info'
  }),
  methods: {
    select (value) {
      this.currentTag = value
      this.$emit('selectTag', value)
    }
  }
}
</script>
