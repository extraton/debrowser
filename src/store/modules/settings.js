import {paramRepository} from "@/db/repository/paramRepository";

export default {
  namespaced: true,
  state: {
    dialog: false,
    settings: null,
  },
  mutations: {
    changeOpen: (state, val) => state.dialog = val,
    setSettings: (state, val) => state.settings = val,
  },
  actions: {
    async updateList({state, commit}) {
      state.settings = await paramRepository.getAll();
      if (state.settings.isFirstLook) {
        commit('changeOpen', true);
        await paramRepository.createOrUpdate('isFirstLook', false);
      }
    },
    async changeTheme({dispatch}, {themeId, vuetify}) {
      await paramRepository.createOrUpdate('themeId', themeId);
      dispatch('updateList');
      vuetify.theme.dark = themeId === 2;
    },
    async changeLanguage(tools, language) {
      await paramRepository.createOrUpdate('language', language);
      location.reload();
    },
  },
  getters: {},
}
