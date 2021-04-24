export default {
  namespaced: true,
  state: {
    dialog: false,
    activity: null,
    resolve: null,
  },
  mutations: {
    setActivity: (state, val) => state.activity = val,
    setResolve: (state, val) => state.resolve = val,
    changeOpen: (state, val) => state.dialog = val,
  },
  actions: {
    init: ({commit}, {activity, resolve}) => {
      console.log({activity});
      commit('setActivity', activity);
      commit('setResolve', resolve);
      commit('changeOpen', true);
    },
    approve: ({commit, state}) => {
      state.resolve({approved: true});
      commit('changeOpen', false);
    },
    cancel: ({commit, state}) => {
      state.resolve({approved: false});
      commit('changeOpen', false);
    },
  },
  getters: {
  },
}
