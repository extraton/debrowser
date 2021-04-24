<template>
  <div :class="['publicKey', {'publicKey--left': left}]">
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs"
               v-on="on"
               v-clipboard="publicKey"
               @success="$snack.success({text: $t('copy.copied')})"
               @error="$snack.danger({text: $t('copy.error')})"
               icon small
        >
          <v-icon color="primary" small>mdi-content-copy</v-icon>
        </v-btn>
      </template>
      <span v-text="$t('copy.copy')"/>
    </v-tooltip>

    <span class="text-overline">{{ keyView }}</span>
  </div>
</template>

<script>

export default {
  components: {},
  props: {publicKey: String, left: {type: Boolean, default: false}},
  data: () => ({}),
  computed: {
    keyView() {
      return `${this.publicKey.substr(0, 6)}...${this.publicKey.substr(-6)}`;
    },
  },
  async mounted() {
  },
  methods: {}
}
</script>
<style lang="scss">
.publicKey {
  display: flex;
  justify-content: center;
  align-items: center;

  &--left {
    justify-content: left;
  }

  &__iconCopy {
    margin-right: 5px;
  }
}
</style>
