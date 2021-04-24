<template>
  <v-app class="app">
    <snack/>
    <settings-dialog/>
    <keys-management-dialog/>
    <approve-dialog/>
    <app-bar/>
    <v-main class="app__main">
      <tab v-if="null !== currentTabIndex" :tab="browserTabs[currentTabIndex]"/>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar";
import {mapState} from "vuex";
import Tab from "@/components/Tab";
import KeysManagementDialog from "@/components/KeysManagementDialog";
import Snack from "@/components/Snack";
import ApproveDialog from "@/components/ApproveDialog";
import SettingsDialog from "@/components/SettingsDialog";

export default {
  components: {SettingsDialog, ApproveDialog, KeysManagementDialog, AppBar, Tab, Snack},
  data: () => ({}),
  computed: {
    ...mapState('browser', {
      currentTabIndex: 'currentTabIndex',
      browserTabs: 'tabs',
    }),
  },
  async created() {
  },
  methods: {
  },
  async mounted() {
  }
};
</script>

<style lang="scss">
.app {
  //background-color: #f2f2f2 !important;

  &__main {
    padding-top: 159px !important;
  }
}
</style>
