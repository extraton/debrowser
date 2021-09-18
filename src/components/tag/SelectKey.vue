<template>
  <v-card class="tSelectKey">
    <v-form v-model="valid" @submit.prevent="select" ref="form">
      <v-card-subtitle v-text="$t('tag.selectKey.title')"/>
      <v-card-text>
        <v-select v-model="keyId" :items="items" :rules="[required]" :disabled="element.isUsed"
                  :label="$t('tag.selectKey.key')"/>
        <v-text-field v-model="pass" :rules="[required]" :disabled="element.isUsed" type="password"
                      :label="$t('tag.selectKey.pass')"/>
        <v-checkbox v-model="save" label="Save for this session"/>
        <div class="error--text">{{ error }}</div>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="openKeysManagement(true)" :disabled="element.isUsed" color="primary" text>
          <v-icon left>mdi-key-chain</v-icon>
          {{ $t('tag.selectKey.myKeys') }}
        </v-btn>
        <v-spacer/>
        <v-btn :disabled="element.isUsed" type="submit" color="primary" v-text="$t('tag.selectKey.select')"/>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import keystoreLib from "@/lib/keystore";
import tonApi from "@/api/ton";
import utils from "@/lib/utils";
import SigningBoxClass from "@/lib/browser/SigningBox";

export default {
  components: {},
  props: {element: Object},
  data: () => ({
    valid: true,
    pass: null,
    save: true,
    error: null,
  }),
  computed: {
    ...mapState('keys', [
      'keys',
    ]),
    items() {
      let items = [];
      for (const key of this.keys) {
        items.push({value: key.id, text: key.name});
      }
      return items;
    },
    keyId: {
      get() {
        return this.element.keyId;
      },
      set(value) {
        this.element.setKeyId(value);
      }
    }
  },
  async created() {
  },
  async mounted() {
  },
  methods: {
    ...mapMutations('keys', {
          openKeysManagement: 'changeOpen',
        }
    ),
    required(value) {
      return !!value || this.$t('validation.required')
    },
    async select() {
      this.error = null;
      await this.$refs.form.validate();
      if (this.valid) {
        let keystore, key;
        for (key of this.keys) {
          if (key.id === this.keyId) {
            keystore = key.keys;
            break;
          }
        }
        try {
          const keys = await keystoreLib.decrypt(tonApi.serverDefault, keystore, this.pass);
          const SigningBox = new SigningBoxClass(this.element.tab.client, keys);
          const SigningBoxHandle = (await this.element.tab.client.crypto.register_signing_box(SigningBox)).handle;
          this.element.setUsed();
          this.pass = null;
          const sg = {signing_box: SigningBoxHandle};
          if (this.save) {
            this.element.tab.setSigningBox(sg);
          }
          this.element.tab.setKey(key);
          this.element.resolve(sg);
        } catch (e) {
          this.error = utils.handleException(e, this.$t('tag.selectKey.unknownError'));
        }
      }
    },
  }
}
</script>
<style lang="scss">
.tSelectKey {
}
</style>
