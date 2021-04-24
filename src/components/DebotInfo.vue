<template>
  <v-card class="debotInfo">
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

export default {
  components: {},
  props: {info: Object},
  data: () => ({
    items: [],
  }),
  created() {
    this.items = [
      {name: this.$t('debotInfo.name'), key: 'name'},
      {name: this.$t('debotInfo.author'), key: 'author'},
      {name: this.$t('debotInfo.language'), key: 'language'},
      {name: this.$t('debotInfo.publisher'), key: 'publisher'},
      {name: this.$t('debotInfo.support'), key: 'support'},
      {name: this.$t('debotInfo.version'), key: 'version'},
    ];
  },
  computed: {
    ...mapGetters('browser', [
      'isLaunched',
    ]),
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
