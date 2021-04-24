<template>
  <div :class="['address', {'address--left': left}]">
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs"
               v-on="on"
               v-clipboard="address"
               @success="$snack.success({text: $t('copy.copied')})"
               @error="$snack.danger({text: $t('copy.error')})"
               icon small
        >
          <v-icon color="primary" small>mdi-content-copy</v-icon>
        </v-btn>
      </template>
      <span v-text="$t('copy.copy')"/>
    </v-tooltip>

    <span class="text-overline">{{ addressView }}</span>
  </div>
</template>

<script>

export default {
  components: {},
  props: {address: String, left: {type: Boolean, default: false}},
  data: () => ({}),
  computed: {
    addressView() {
      return `${this.address.substr(0, 8)}...${this.address.substr(-6)}`;
    },
  },
  async mounted() {
  },
  methods: {}
}
</script>
<style lang="scss">
.address {
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
