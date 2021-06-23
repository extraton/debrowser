import tonApi from "@/api/ton";
import keystoreLib from "@/lib/keystore";
import {keyRepository} from "@/db/repository/keyRepository";

export default {
  namespaced: true,
  state: {
    dialog: false,
    keys: [],
  },
  mutations: {
    changeOpen: (state, val) => state.dialog = val,
    setKeys:(state, keys) => state.keys = keys,
  },
  actions: {
    async updateList({state}) {
      state.keys = await keyRepository.getAll();
    },
    async add({dispatch}, {name, seed, pass, address}) {
      const keys = await tonApi.convertSeedToKeys(tonApi.serverDefault, seed);
      const encryptedKeys = await keystoreLib.encrypt(tonApi.serverDefault, keys, pass);
      await keyRepository.create(name, encryptedKeys, address);
      await dispatch('updateList');
    },
    async edit({dispatch}, key) {
      await keyRepository.update(key);
      await dispatch('updateList');
    },
    async remove({dispatch}, id){
      await keyRepository.remove(id);
      await dispatch('updateList');
    }
  },
  getters: {
  },
}
