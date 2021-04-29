<template>
  <v-card class="tMenu">
    <v-list :disabled="element.isUsed">
      <v-subheader class="tMenu__title">{{ element.title }}</v-subheader>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item v-for="(choice, i) in element.choices" :key="i" @click="select(choice, i)" link>
          <v-list-item-content>
            <v-list-item-title v-text="choice.title"/>
            <v-list-item-subtitle v-text="choice.description"/>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  components: {},
  props: {element: Object},
  data: () => ({}),
  computed: {
    selectedItem: {
      get() {
        return this.element.selectedItem;
      },
      set(value) {
        this.element.setSelectedItem(value);
      }
    }
  },
  async mounted() {
  },
  methods: {
    async select(choice, index) {
      this.element.setUsed();
      this.element.tab.execute(this.element.inputMsg, choice.handlerId, this.element.tab.epoch, {index});
    },
  }
}
</script>
<style lang="scss">
.tMenu {
  &__title {
    white-space: pre-line;
  }
}
</style>
