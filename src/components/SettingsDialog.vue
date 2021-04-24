<template>
  <v-dialog content-class="settingsDialog" v-model="isOpen" max-width="500">
    <v-card v-if="isOpen">
      <v-card-title v-text="$t('settings.title')"/>
      <v-divider></v-divider>
      <v-card-text class="settingsDialog__content">
        <div class="settingsDialog__language">
          <div class="text-h6 mb-2" v-text="$t('settings.language.title')"/>
          <v-select @change="changeLanguage" :items="localesSelectData" :value="settings.language"
                    prepend-icon="mdi-translate" label="Language" hide-details single-line filled/>
        </div>
        <v-divider/>
        <div class="settingsDialog__theme">
          <div class="text-h6 mb-2" v-text="$t('settings.theme.title')"/>
          <div class="d-flex justify-space-around">
            <v-card @click="changeTheme({themeId: 1, vuetify: $vuetify})"
                    class="d-flex justify-space-between align-center py-3 px-4" min-width="110"
                    :color="color(1)" :dark="1===settings.themeId" rounded link flat>
              <span class="subtitle-1" v-text="$t('settings.theme.light')"/>
              <v-icon right>mdi-white-balance-sunny</v-icon>
            </v-card>
            <v-card @click="changeTheme({themeId: 2, vuetify: $vuetify})"
                    class="d-flex justify-space-between align-center py-3 px-4" min-width="110"
                    :color="color(2)" :dark="2===settings.themeId" rounded link flat>
              <span class="subtitle-1" v-text="$t('settings.theme.dark')"/>
              <v-icon right>mdi-weather-night</v-icon>
            </v-card>
          </div>
        </div>
      </v-card-text>
      <v-divider/>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="isOpen=false" text v-text="$t('settings.theme.close')"/>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapMutations, mapState, mapActions} from "vuex";

export default {
  components: {},
  props: {},
  data: () => ({}),
  computed: {
    ...mapState('settings', [
      'dialog',
      'settings',
    ]),
    isOpen: {
      get() {
        return this.dialog;
      },
      set(val) {
        this.changeOpen(val);
      },
    },
    color() {
      return function (id) {
        const bright = 1 === this.settings.themeId ? 'lighten' : 'darken';
        return id === this.settings.themeId ? 'primary' : `grey ${bright}-3`;
      };
    },
    localesSelectData() {
      let items = [];
      for (const lang of this._i18n.availableLocales) {
        items.push({value: lang, text: this.$t(`settings.language.items.${lang}`)});
      }
      return items;
    },
  },
  async mounted() {
  },
  methods: {
    ...mapMutations('settings', [
          'changeOpen',
        ]
    ),
    ...mapActions('settings', [
          'changeTheme',
          'changeLanguage'
        ]
    ),
  }
}
</script>
<style lang="scss">
.settingsDialog {
  &__content {
    padding-top: 20px !important;
  }

  &__theme {
    margin-top: 20px;
  }

  &__language {
    margin-bottom: 30px;
  }
}
</style>
