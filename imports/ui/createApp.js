import Vue from 'vue';
// Plugins
import VueMeta from 'vue-meta';
import VueMeteorTracker from 'vue-meteor-tracker';
import { sync } from 'vuex-router-sync';

import App from '/imports/ui/App.vue';
import { createRouter } from './router';
import { beforeEach } from './routes';
import { createStore } from './store';

Vue.use(VueMeta);
Vue.use(VueMeteorTracker);

// noinspection JSUnresolvedVariable
/**
 * Freezing data
 * @description This option will apply `Object.freeze` on the Meteor data to prevent Vue from
 * setting up reactivity on it.
 * This can improve the performance of Vue when rendering large collection lists for example.
 * By default, this option is turned off.
 * @see https://github.com/meteor-vue/vue-meteor-tracker/
 * @type {boolean}
 */
Vue.config.meteor.freeze = true;

/**
 * Create app
 * @param {Object} context
 * @param {boolean} context.ssr
 * @return {{app: VueConstructor|*, router: VueRouter, store: Store}}
 */
function createApp(context) {
  /*
    https://ssr.vuejs.org/guide/structure.html#avoid-stateful-singletons
   */
  const store = createStore();
  const router = createRouter();

  // sync the router with the vuex store.
  // this registers `store.state.route`
  sync(store, router);

  // Vuex state restoration
  // noinspection JSUnresolvedVariable
  if (!context.ssr && window.__INITIAL_STATE__) {
    // We initialize the store state with the data injected from the server
    store.replaceState(window.__INITIAL_STATE__);
  }

  // Before each route
  router.beforeEach(async (to, from, next) => {
    await beforeEach({ store, next });
  });

  const app = new Vue({
    el: '#app',
    router,
    store,
    ...App,
  });

  return {
    app,
    router,
    store,
  };
}

export default createApp;
