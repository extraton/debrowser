<template>
  <v-card>
    <v-card-subtitle>{{ element.title }}</v-card-subtitle>
    <v-card-text>
      <v-form v-model="valid" @submit.prevent="apply" ref="form">
        <v-text-field v-model="value" :rules="[required, address]" :disabled="element.isUsed"
                      :label="$t('tag.inputAddress.address')" ref="input">
          <template v-slot:append-outer>
            <v-btn :disabled="element.isUsed" type="submit" color="primary" small
                   v-text="$t('tag.inputAddress.apply')"/>
          </template>
        </v-text-field>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  components: {},
  props: {element: Object},
  data: () => ({
    valid: true,
  }),
  computed: {
    value: {
      get() {
        return this.element.value;
      },
      set(value) {
        this.element.setValue(value);
      }
    }
  },
  async mounted() {
    if (!this.element.isUsed) {
      this.$refs.input.focus();
    }
  },
  methods: {
    required(value) {
      return !!value || this.$t('validation.required')
    },
    address(value) {
      return /^-?[0-9]+:[a-f0-9]{64}$/i.test(value) || this.$t('validation.address')
    },
    async apply() {
      await this.$refs.form.validate();
      if (this.valid) {
        this.element.tab.execute(this.element.inputMsg, this.element.answerId, this.element.tab.epoch, {value: this.value});
        this.element.setUsed();
      }
    },
  }
}
</script>
<style lang="scss">
</style>
