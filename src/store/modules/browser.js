import TabClass from "@/lib/browser/Tab";
import Vue from "vue";
import tonApi from "@/api/ton";

export default {
  namespaced: true,
  state: {
    tabs: [],
    tabsIncrement: 1,
    currentTabIndex: 0,
  },
  mutations: {
    setTabsIncrement: (state, val) => state.tabsIncrement = val,
    setCurrentTabIndex: (state, val) => state.currentTabIndex = val,
  },
  actions: {
    async addTab({state, commit}) {
      const id = state.tabsIncrement + 1;
      commit('setTabsIncrement', id);
      const Tab = new TabClass(id);
      state.tabs.push(Tab);
      commit('setCurrentTabIndex', state.tabs.length - 1)
    },
    removeTab: async ({state, commit}, index) => {
      const newIndex = index !== 0 ? index - 1 : 0;
      commit('setCurrentTabIndex', newIndex);
      Vue.delete(state.tabs, index);
    },
    async setAddress({state}, {account, server = tonApi.serverDefault}) {
      await state.tabs[state.currentTabIndex].setAddress(server, account);
    },
    start: ({state}) => state.tabs[state.currentTabIndex].start(),
    goHome: ({state}) => state.tabs[state.currentTabIndex].resetAddress(),
    refresh: ({state}) => state.tabs[state.currentTabIndex].refresh(),
    onAddressInput: async ({state}, addressStr) => {
      addressStr = addressStr.trim();
      if (addressStr !== '') {
        const addressStrSplitted = addressStr.split('/');
        const account = addressStrSplitted.pop();
        let server;
        const currentServer = state.tabs[state.currentTabIndex].address.server;
        if (addressStrSplitted.length > 0) {
          server = addressStrSplitted.join('/');
        } else if ('' !== currentServer) {
          server = currentServer;
        } else {
          server = tonApi.serverDefault;
        }
        server = server.toLowerCase();
        await state.tabs[state.currentTabIndex].setAddress(server, account);
      }
    },
  },
  getters: {
    address: (state) => state.tabs[state.currentTabIndex].address,
    isItHome: (state) => state.tabs[state.currentTabIndex].isItHome(),
    isFetching: (state) => state.tabs[state.currentTabIndex].fetching,
    isLaunched: (state) => state.tabs[state.currentTabIndex].launched,
    isLoading: (state) => state.tabs[state.currentTabIndex].isLoading(),
  },
}
