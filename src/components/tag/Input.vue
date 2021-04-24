<template>
  <v-card>
    <v-card-subtitle>{{ element.title }}</v-card-subtitle>
    <v-card-text>
      <v-form v-model="valid" @submit.prevent="apply" ref="form">
        <v-textarea v-model="value" :rules="[required]" v-if="element.multiline" :disabled="element.isUsed"
                    :label="$t('tag.input.value')" ref="input">
          <template v-slot:append-outer>
            <v-btn :disabled="element.isUsed" type="submit" color="primary" small v-text="$t('tag.input.apply')"/>
          </template>
        </v-textarea>
        <v-text-field v-else v-model="value" :rules="[required]" :disabled="element.isUsed"
                      :label="$t('tag.input.value')" ref="input">
          <template v-slot:append-outer>
            <v-btn :disabled="element.isUsed" type="submit" color="primary" small v-text="$t('tag.input.apply')"/>
          </template>
        </v-text-field>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import Enc from "@root/encoding";

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
    async apply() {
      await this.$refs.form.validate();
      if (this.valid) {
        this.element.setUsed();
        this.element.tab.execute(this.element.inputMsg, this.element.answerId, this.element.tab.epoch, {value: Enc.strToHex(this.value)});
      }
    },
  }
}
</script>
<style lang="scss">
</style>
