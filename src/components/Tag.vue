<template>
<div>
  <div class="text-xs-center">
    <v-chip
      :color="color"
      text-color="white"
      :selected="currentItem === 'all'"
      @click="selectItem('all')">all</v-chip>
    <v-chip
      v-for="(item, i) in items"
      :key="i" :color="color"
      text-color="white"
      @click="selectItem(item)"
      :selected="currentItem === item"
    >{{ item }}</v-chip>
  </div>
</div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    select: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    currentItem: 'all',
    color: 'info'
  }),
  methods: {
    selectItem (value) {
      this.currentItem = value
      this.$emit('selectItem', value)
    }
  }
}
</script>
