import Vue from 'vue'
import Vuex from 'vuex'
import browser from './modules/browser'
import keys from './modules/keys'
import approve from './modules/approve'
import settings from './modules/settings'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    i18n: null,
  },
  mutations: {
    setI18n: (state, i18n) => state.i18n = i18n,
  },
  modules: {
    browser,
    keys,
    approve,
    settings,
  }
})
