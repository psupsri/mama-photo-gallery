<template>
  <div>
    {{ id }}
  </div>
</template>

<script>
export default {
  data: () => ({
    id: null
  }),
  created () {
    this.reload()
  },
  methods: {
    reload () {
      this.id = this.$route.params.id
    }
  }
}
</script>
