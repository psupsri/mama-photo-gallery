<template>
  <v-select
    :items="items"
    label="Select Tag"
    @change="selectItem"
  ></v-select>
</template>

<script>
export default {
  props: ['items'],
  methods: {
    selectItem (v) {
      this.$emit('selectItem', v)
    }
  }
}
</script>
