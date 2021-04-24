<template>
  <v-app-bar class="appBar" color="bar" app dark dense>
    <v-icon left>$vuetify.icons.tonCrystal</v-icon>
    <v-toolbar-title>extraTON.DeBrowser</v-toolbar-title>

    <v-spacer></v-spacer>
    <right-corner-menu/>

    <template v-slot:extension>
      <app-bar-tabs/>
      <app-bar-address-field/>
      <v-progress-linear
          :active="isFetching"
          :indeterminate="isFetching"
          absolute
          bottom
          color="white"
          height="3"
      ></v-progress-linear>
    </template>


  </v-app-bar>
</template>

<script>
import RightCornerMenu from "@/components/RightCornerMenu";
import AppBarTabs from "@/components/AppBarTabs";
import AppBarAddressField from "@/components/AppBarAddressField";
import {mapGetters} from "vuex";

export default {
  components: {AppBarAddressField, AppBarTabs, RightCornerMenu},
  props: {},
  data: () => ({}),
  computed: {
    ...mapGetters('browser', ['isFetching'])
  },
  async mounted() {
  },
  methods: {}
}
</script>
<style lang="scss">
.appBar {
  height: 144px !important;
.v-toolbar__content {
  //height: 40px!important;
}
  .v-toolbar__extension {
    flex-direction: column;
    align-items: flex-start;
    height: 96px !important;
    padding: 0 8px;
  }
}
</style>
