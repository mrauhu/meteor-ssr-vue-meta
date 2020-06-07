import call from '/imports/api/helpers/call';

const SET_VERSION = 'SET_VERSION';

export default {
  namespaced: true,
  state: () => ({
    vueMetaVersion: null,
  }),
  mutations: {
    [SET_VERSION](state, value) {
      state.vueMetaVersion = value;
    },
  },
  actions: {
    async init({ commit }) {
      const version = await call('getVueMetaVersion');
      console.log('debug/init - vue-meta version', version);
      commit(SET_VERSION, version);
    },
  },
};
