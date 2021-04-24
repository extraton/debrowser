<template>
  <div class="amount">
    <span class="text-overline">{{ amountView }} TON</span>
  </div>
</template>

<script>
import utils from "@/lib/utils";

export default {
  components: {},
  props: {nano: String,},
  data: () => ({}),
  computed: {
    amountView() {
      return utils.convertNanoToView(this.nano, 9, 9);
    },
  },
  async mounted() {
  },
  methods: {}
}
</script>
<style lang="scss">
.amount {
}
</style>
