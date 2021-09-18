<template>
  <v-card class="tMedia">
    <v-card-subtitle>{{ element.prompt }}</v-card-subtitle>
    <v-card-text class="text-center">
      <img class="tMedia__item" :src="element.data" :alt="element.prompt">
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  components: {},
  props: {element: Object},
  data: () => ({}),
  computed: {
  },
  async mounted() {
    if (!this.element.isUsed) {
      this.element.setUsed();
      if ('0' !== this.element.answerId) {
        this.element.tab.execute(this.element.inputMsg, this.element.answerId, this.element.tab.epoch);
      }
    }
  },
  methods: {
  }
}
</script>
<style lang="scss">
.tMedia {
}
</style>
