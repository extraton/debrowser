<template>
  <v-card color="error">
    <v-card-subtitle class="white--text" v-text="$t('tag.fatal.error')"/>
    <v-card-text class="body-1 white--text">
      {{ message }}
    </v-card-text>
    <v-card-actions>
      <v-btn @click="refresh" class="ma-auto" v-text="$t('tag.fatal.refresh')"/>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapActions} from "vuex";
import utils from "@/lib/utils";

export default {
  components: {},
  props: {element: Object},
  data: () => ({}),
  computed: {
    message() {
      return utils.handleException(this.element.exception, this.$t('tag.fatal.console'));
    },
  },
  async mounted() {
  },
  methods: {
    ...mapActions('browser', [
      'refresh',
    ]),
  }
}
</script>
<style lang="scss">
</style>
