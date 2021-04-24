<template>
  <v-card>
    <v-card-subtitle>{{ element.title }}</v-card-subtitle>
    <v-card-actions>
      <v-btn @click="cancel" :disabled="element.isUsed" text v-text="$t('tag.inputConfirm.cancel')"/>
      <v-spacer/>
      <v-btn @click="confirm" :disabled="element.isUsed" color="primary" v-text="$t('tag.inputConfirm.confirm')"/>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  components: {},
  props: {element: Object},
  data: () => ({}),
  computed: {},
  async mounted() {
  },
  methods: {
    async cancel() {
      this.element.setUsed();
      this.element.tab.execute(this.element.inputMsg, this.element.answerId, this.element.tab.epoch, {value: false});
    },
    async confirm() {
      this.element.setUsed();
      this.element.tab.execute(this.element.inputMsg, this.element.answerId, this.element.tab.epoch, {value: true});
    },
  }
}
</script>
<style lang="scss">
</style>
