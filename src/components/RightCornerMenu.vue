<template>
  <v-menu v-model="menu" bottom left offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item @click="openSettings(true)">
        <v-list-item-icon>
          <v-icon>mdi-cogs</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="$t('rightCornerMenu.settings')"/>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="openKeysManagement(true)">
        <v-list-item-icon>
          <v-icon>mdi-key-chain</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="$t('rightCornerMenu.keys')"/>
        </v-list-item-content>
      </v-list-item>
      <v-list-item href="http://github.com/extraton/debrowser" target="_blank">
        <v-list-item-icon>
          <v-icon>mdi-github</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="$t('rightCornerMenu.source')"/>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  components: {},
  data: () => ({
    menu: false,
  }),
  computed: {},
  watch: {},
  mounted() {
  },
  methods: {
    ...mapMutations('keys', {
          openKeysManagement: 'changeOpen'
        }
    ),
    ...mapMutations('settings', {
          openSettings: 'changeOpen'
        }
    ),
  },
}
</script>

<style lang="scss">
</style>
