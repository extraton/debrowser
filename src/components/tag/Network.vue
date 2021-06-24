<template>
  <div :class="['tNetwork']">
    <tab-loading v-if="loading"/>
    <v-card v-else-if="error">
      <v-card-text>
        <div class="error--text" v-text="error"/>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';
import utils from "@/lib/utils";
import TabLoading from "@/components/TabLoading";
import Enc from "@root/encoding";

export default {
  components: {TabLoading},
  props: {element: Object},
  data: () => ({
    error: null,
    loading: true,
  }),
  computed: {},
  async mounted() {
    if (!this.element.isUsed) {
      this.element.setUsed();
      let config = {
        method: this.element.method,
        url: this.element.url,
        headers: this.element.headers,
        responseType: 'text',
        transformResponse: [data => data], //prevent JSON.parse
      };
      if (null !== this.element.body) {
        config.data = this.element.body;
      }
      axios(config).then(function (response) {
        let retHeaders = [];
        const entries = Object.entries(response.headers);
        entries.forEach(([key, value]) => {
          retHeaders.push(Enc.strToHex(`${key}: ${value}`))
        })
        const input = {
          statusCode: response.status,
          content: Enc.strToHex(response.data),
          retHeaders,
        };
        this.element.tab.execute(this.element.inputMsg, this.element.answerId, this.element.tab.epoch, input);
      }.bind(this)).catch(function (e) {
        this.error = utils.handleException(e, this.$t('tag.network.error'));
      }.bind(this)).finally(function () {
        this.loading = false;
      }.bind(this));
    }
  },
  methods: {}
}
</script>
<style lang="scss">
.tNetwork {
}
</style>
