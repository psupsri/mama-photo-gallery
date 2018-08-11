<template>
  <v-btn-toggle v-model="sorting">
    <v-tooltip top v-for="(item, i) in items" :key="i">
      <v-btn flat :color="item.color" slot="activator">
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
      <span>{{ item.title }}</span>
    </v-tooltip>
  </v-btn-toggle>
</template>

<script>
export default {
  props: ['value', 'items'],
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
      this.$emit('sortingFilter', this.sorting)
    }
  },
  created () {
    this.sorting = this.value
  }
}
</script>

