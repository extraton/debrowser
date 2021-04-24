<template>
  <v-card>
    <v-card-subtitle>{{ element.title }}</v-card-subtitle>
    <v-card-text>
      <v-form v-model="valid" @submit.prevent="apply" ref="form">
        <v-text-field v-model="value" :rules="[required, gte, lte, scale]" :disabled="element.isUsed"
                      :label="$t('tag.inputAmount.amount')" type="number" ref="input">
          <template v-slot:append-outer>
            <v-btn :disabled="element.isUsed" type="submit" color="primary" small v-text="$t('tag.inputAmount.apply')"/>
          </template>
        </v-text-field>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import BN from "bignumber.js";

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
    async apply() {
      await this.$refs.form.validate();
      if (this.valid) {
        this.element.setUsed();
        const value = this.undecimalBn(this.value).toString();
        this.element.tab.execute(this.element.inputMsg, this.element.answerId, this.element.tab.epoch, {value});
      }
    },
    undecimalBn(amount) {
      const decimals = BN(this.element.decimals);
      const multiplyBy = BN('10').exponentiatedBy(decimals);
      return BN(amount).multipliedBy(multiplyBy);
    },
    required(value) {
      return !!value || this.$t('validation.required')
    },
    gte(value) {
      return (BN(value)).isGreaterThanOrEqualTo(BN(this.element.min)) || this.$t('validation.gte', [this.element.min]);
    },
    lte(value) {
      return (BN(value)).isLessThanOrEqualTo(BN(this.element.max)) || this.$t('validation.lte', [this.element.max]);
    },
    scale(value) {
      return this.undecimalBn(value).isInteger() || this.$t('validation.scale')
    }
  }
}
</script>
<style lang="scss">
</style>
