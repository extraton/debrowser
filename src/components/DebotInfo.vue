<template>
  <v-card class="debotInfo">
    <v-card-title>
      {{ info.name || $t('debotInfo.untitled') }}
      <v-spacer/>
      <span class="subtitle-1">{{ info.version }}</span>
    </v-card-title>
      <v-card-subtitle>by {{ info.author || $t('debotInfo.unknown') }}</v-card-subtitle>
    <div v-if="icon" class="text-center">
      <img :src="`data:image/png;base64,${icon}`" :alt="info.name"/>
    </div>
    <v-simple-table>
      <template v-slot:default>
        <tbody>
        <tr v-for="(item, i) in items" :key="i">
          <td>{{ item.name }}</td>
          <td>{{ info[item.key] || '-' }}</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-card-text class="text-pre-line body-1">{{ info.hello }}</v-card-text>
    <v-card-actions>
      <v-btn @click="start" :disabled="isLaunched" class="ma-auto" color="primary">
        {{ $t('debotInfo.launch') }}
        <v-icon right>mdi-rocket-launch</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import Enc from "@root/encoding";

export default {
  components: {},
  props: {info: Object},
  data: () => ({
    items: [],
  }),
  created() {
    this.items = [
      // {name: this.$t('debotInfo.name'), key: 'name'},
      // {name: this.$t('debotInfo.author'), key: 'author'},
      {name: this.$t('debotInfo.language'), key: 'language'},
      {name: this.$t('debotInfo.publisher'), key: 'publisher'},
      {name: this.$t('debotInfo.support'), key: 'support'},
      // {name: this.$t('debotInfo.version'), key: 'version'},
    ];
  },
  computed: {
    ...mapGetters('browser', [
      'isLaunched',
    ]),
    icon() {
      // return this.info.icon;
      return null !== this.info.icon && '' !== this.info.icon ? Enc.bufToBase64(Enc.hexToBuf(this.info.icon)) : null;
    }
  },
  async mounted() {
  },
  methods: {
    ...mapActions('browser', [
      'start',
    ]),
  }
}
</script>
<style lang="scss">
.debotInfo {
  margin: auto;
  max-width: 700px !important;
}
</style>
