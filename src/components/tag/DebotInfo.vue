<template>
  <v-card class="tDebotInfo">
    <v-card-title>
      {{ element.info.name || $t('debotInfo.untitled') }}
      <v-spacer/>
      <span class="subtitle-1">{{ element.info.version }}</span>
    </v-card-title>
    <v-card-subtitle>by {{ element.info.author || $t('debotInfo.unknown') }}</v-card-subtitle>
    <div v-if="icon" class="text-center">
      <img :src="`${icon}`" :alt="element.info.name"/>
    </div>
    <v-simple-table>
      <template v-slot:default>
        <tbody>
        <tr v-for="(item, i) in items" :key="i">
          <td>{{ item.name }}</td>
          <td>{{ element.info[item.key] || '-' }}</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-card-text class="text-pre-line body-1">{{ element.info.hello }}</v-card-text>
    <v-card-actions>
      <v-btn @click="launch" :disabled="this.element.isUsed" class="ma-auto" color="primary">
        {{ $t('debotInfo.launch') }}
        <v-icon right>mdi-rocket-launch</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapActions} from "vuex";
import Enc from "@root/encoding";

export default {
  components: {},
  props: {element: Object},
  data: () => ({items: []}),
  computed: {
    icon() {
      let icon = null;
      const isIconNull = null === this.element.info.icon;
      const isIconEmpty = '' === this.element.info.icon;
      if (!isIconNull && !isIconEmpty) {
        try {
          icon = Enc.hexToStr(this.element.info.icon)
        } catch (e) {
          console.error('Cannot decode icon');
        }
      }
      return icon;
    }
  },
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
  async mounted() {
  },
  methods: {
    ...mapActions('browser', [
      'start',
    ]),
    launch() {
      this.element.setUsed();
      this.start();
    }
  }
}
</script>
<style lang="scss">
.tDebotInfo {
  margin: auto;
  max-width: 700px !important;
}
</style>
