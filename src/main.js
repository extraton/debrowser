import Vue from 'vue'
import VueClipboards from 'vue-clipboards';
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import i18n from './plugins/i18n'
import {TonClient} from "@tonclient/core";
import {libWeb, libWebSetup} from "@tonclient/lib-web";
import snack from './plugins/snack';

libWebSetup({
  binaryURL: "/tonclient_1.20.0.wasm",
});
TonClient.useBinaryLibrary(libWeb);

Vue.config.productionTip = false
Vue.use(snack);
Vue.use(VueClipboards);

async function init() {
  await store.dispatch('settings/updateList');
  await store.dispatch('keys/updateList');
  vuetify.framework.theme.isDark = store.state.settings.settings.themeId === 2;
  vuetify.framework.lang.current = store.state.settings.settings.language;
  i18n.locale = store.state.settings.settings.language;
  await store.commit('setI18n', i18n);
  await store.dispatch('browser/addTab');
  new Vue({
    store,
    vuetify,
    i18n,
    render: h => h(App)
  }).$mount('#app')
}

init();
