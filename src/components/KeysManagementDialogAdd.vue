<template>
  <v-card class="keysManageDialogAdd">
    <v-form v-model="valid" @submit.prevent="addKey" ref="form">
      <v-card-title v-text="$t('addKey.title')"/>
      <v-divider></v-divider>
      <v-card-text>
        <v-text-field v-model="name" :rules="[required]" :label="$t('addKey.name')" filled/>
        <v-textarea v-model="seed" :rules="[required, wordsNum]" :label="$t('addKey.seedPhrase')" rows="3" counter
                    filled>
          <template v-slot:counter="{props}">
            <v-counter v-bind="props" :value="`${matchSeed.length}/12 ${$t('addKey.or')} 24`"/>
          </template>
        </v-textarea>
        <div class="caption" v-text="$t('addKey.encodeTip')"/>
        <v-text-field v-model="pass" :rules="[required]" type="password" :label="$t('addKey.password')" filled/>
        <div class="error--text">{{ error }}</div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="primary" text @click="$emit('back')" v-text="$t('addKey.back')"/>
        <v-spacer></v-spacer>
        <v-btn color="primary" type="submit" v-text="$t('addKey.add')"/>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import {mapActions} from "vuex";
import utils from "@/lib/utils";

export default {
  components: {},
  props: {},
  data: () => ({
    name: null,
    seed: null,
    pass: null,
    valid: true,
    error: null,
  }),
  computed: {
    matchSeed() {
      const seed = this.seed || '';
      const r = seed.match(/[^\s-.]+/g);
      return null !== r ? r : [];
    },
  },
  async mounted() {
  },
  methods: {
    ...mapActions('keys', [
      'add',
    ]),
    wordsNum() {
      return this.matchSeed.length !== 12 && this.matchSeed.length !== 24
          ? this.$t('addKey.seedSize')
          : true;
    },
    required(value) {
      return !!value || this.$t('validation.required')
    },
    async addKey() {
      this.error = null
      await this.$refs.form.validate();
      if (this.valid) {
        const seed = this.matchSeed.join(' ').toLowerCase();
        try {
          await this.add({name: this.name, pass: this.pass, seed});
          this.$emit('back');
        } catch (e) {
          this.error = utils.handleException(e, this.$t('addKey.unknownError'));
        }
      }
    }
  }
}
</script>
<style lang="scss">
.keysManageDialogAdd {
  .v-card__text {
    padding-top: 10px !important;
  }

  textarea {
    font-size: 20px;
  }
}
</style>
