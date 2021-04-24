<template>
  <v-card>
    <v-card-text class="tText body-1">
      {{ element.text }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  components: {},
  props: {element: Object},
  data: () => ({}),
  computed: {},
  async mounted() {
    if (!this.element.isUsed) {
      this.element.setUsed();
      if ('0' !== this.element.answerId) {
        this.element.tab.execute(this.element.inputMsg, this.element.answerId, this.element.tab.epoch);
      }
    }
  },
  methods: {}
}
</script>
<style lang="scss">
.tText {
  white-space: pre-line;
}
</style>
