<template>
  <div class="tab">
    <home-tab v-if="isItHome"/>
    <debot-info v-if="null !== tab.debot" :info="tab.debot.info"/>
    <div v-for="(element, id) in tab.elements" :key="id">
      <tag v-if="id === 0 || tab.elements[id-1].isUsed" :element="element"/>
    </div>
    <tab-loading v-if="isLoading"/>
  </div>
</template>

<script>
import Tag from "@/components/Tag";
import TabLoading from "@/components/TabLoading";
import HomeTab from "@/components/HomeTab";
import {mapGetters} from "vuex";
import DebotInfo from "@/components/DebotInfo";

export default {
  components: {DebotInfo, HomeTab, TabLoading, Tag},
  props: {tab: Object},
  data: () => ({}),
  computed: {
    ...mapGetters('browser', ['isItHome', 'isLoading'])
  },
  async mounted() {},
  methods: {}
}
</script>
<style lang="scss">
.tab {
  height: 100%;
}
</style>
