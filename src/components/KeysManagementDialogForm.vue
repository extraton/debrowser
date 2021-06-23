<template>
  <v-card class="keysManageDialogForm">
    <v-form v-model="valid" @submit.prevent="submit" ref="form">
      <v-card-title v-text="title"/>
      <v-divider></v-divider>
      <v-card-text>
        <v-text-field v-model="name" :rules="[required]" :label="$t('addKey.name')" filled/>
        <template v-if="null===editId">
          <v-textarea v-model="seed" :rules="[required, wordsNum]" :label="$t('addKey.seedPhrase')" rows="3" counter
                      filled>
            <template v-slot:counter="{props}">
              <v-counter v-bind="props" :value="`${matchSeed.length}/12 ${$t('addKey.or')} 24`"/>
            </template>
          </v-textarea>
          <div class="caption" v-text="$t('addKey.encodeTip')"/>
          <v-text-field v-model="pass" :rules="[required]" type="password" :label="$t('addKey.password')" filled/>
        </template>
        <v-text-field v-model="address" :rules="[validateAddress]" :label="$t('addKey.address')" filled/>
        <div class="error--text">{{ error }}</div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="primary" text @click="$emit('back')" v-text="$t('addKey.back')"/>
        <v-spacer></v-spacer>
        <v-btn color="primary" type="submit" v-text="submitButton"/>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import {mapActions, mapState} from "vuex";
import utils from "@/lib/utils";

export default {
  components: {},
  props: {editId: Number},
  data: () => ({
    name: null,
    seed: null,
    pass: null,
    address: null,
    valid: true,
    error: null,
    key: null,
  }),
  computed: {
    matchSeed() {
      const seed = this.seed || '';
      const r = seed.match(/[^\s-.]+/g);
      return null !== r ? r : [];
    },
    isEdit() {
      return null !== this.editId;
    },
    title() {
      return this.$t('addKey.' + (this.isEdit ? 'titleEdit' : 'title'));
    } ,
    submitButton() {
      return this.$t('addKey.' + (this.isEdit ? 'save' : 'add'));
    },
    ...mapState('keys', [
      'keys'
    ]),
  },
  async mounted() {
    if (null !== this.editId) {
      this.key = this.keys.find(el => el.id === this.editId);
      this.name = this.key.name;
      this.address = this.key.address;
    }
  },
  methods: {
    ...mapActions('keys', [
      'add',
      'edit',
    ]),
    wordsNum() {
      return this.matchSeed.length !== 12 && this.matchSeed.length !== 24
        ? this.$t('addKey.seedSize')
        : true;
    },
    required(value) {
      return !!value || this.$t('validation.required')
    },
    validateAddress(value) {
      if (null === value || '' === value) {
        return true;
      }
      return /^-?[0-9]+:[a-f0-9]{64}$/i.test(value) || this.$t('validation.address')
    },
    async submit() {
      this.error = null
      await this.$refs.form.validate();
      if (this.valid) {
        const seed = this.matchSeed.join(' ').toLowerCase();
        try {
          if (this.isEdit) {
            this.key.name = this.name;
            this.key.address = this.address !== '' ? this.address : null;
            await this.edit(this.key);
          } else {
            await this.add({name: this.name, pass: this.pass, seed, address: this.address});
          }
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
.keysManageDialogForm {
  .v-card__text {
    padding-top: 10px !important;
  }

  textarea {
    font-size: 20px;
  }
}
</style>
