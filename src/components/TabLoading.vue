<template>
  <div ref="loading">
    <v-progress-linear class="tabLoading" color="primary" height="5" indeterminate rounded/>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data: () => ({}),
  computed: {},
  async mounted() {
    this.$refs.loading.scrollIntoView({behavior: 'smooth'});
  },
  methods: {}
}
</script>
<style lang="scss">
.tabLoading {
  max-width: 400px;
  width: 60%;
  margin: 35px auto 23px;
}
</style>
