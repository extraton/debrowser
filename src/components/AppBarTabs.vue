<template>
  <v-tabs v-model="tab" class="appBarTabs" color="bar" align-with-title hide-slider>
    <div v-for="(tab, i) in tabs" :key="i" class="appBarTabs__tabBox">
      <v-tab class="appBarTabs__tabBox__tab">
        <span>{{ tab.title }}</span>
        <v-spacer/>
        <v-btn v-if="tabs.length > 1" @click.stop="removeTab(i)" x-small icon>
          <v-icon small>mdi-close</v-icon>
        </v-btn>
      </v-tab>
      <v-divider class="appBarTabs__divider" vertical/>
    </div>
    <v-btn class="appBarTabs__add" @click="addTab" small icon>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-tabs>
</template>

<script>
import {mapActions, mapState, mapMutations} from "vuex";

export default {
  components: {},
  props: {},
  data: () => ({}),
  computed: {
    ...mapState('browser', [
      'currentTabIndex',
      'tabs',
    ]),
    tab: {
      get() {
        return this.currentTabIndex
      },
      set(value) {
        this.setCurrentTabIndex(value);
      }
    }
  },
  async mounted() {
  },
  methods: {
    ...mapActions('browser', [
      'addTab',
      'removeTab',
    ]),
    ...mapMutations('browser', [
      'setCurrentTabIndex',
    ]),
  }
}
</script>
<style lang="scss">
.appBarTabs {
  height: 40px !important;
  //margin: 0 2px !important;
  padding: 0 18px !important;

  &__tabBox {
    display: flex;

    &__tab {
      height: 100%;
      width: 175px !important;

      span {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      //border: 1px solid rgba(255, 255, 255, 0.7);
      //border-top: none;
      //border-bottom: none;
    }

    &__tab.v-tab--active {
      background-color: rgba(255, 255, 255, 0.08) !important;
      color: rgba(255, 255, 255, 0.6) !important;
      //border: none;
    }
  }

  &__divider {
    margin: 0 4px !important;
  }

  &__add {
    margin: 7px 0 0 5px;
  }
}
</style>
