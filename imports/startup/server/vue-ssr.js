// noinspection ES6CheckImport,NpmUsedModulesInstalled
import { VueSSR } from 'meteor/akryum:vue-ssr';
import createApp from '/imports/ui/createApp';

const isDev = process.env.NODE_ENV !== 'production';

// Set version
process.env.VUE_APP_VERSION = require('/package.json').version;

Meteor.startup(() => {
  // This will be called each time the app is rendered
  VueSSR.createApp = function (context) {
    const start = isDev && Date.now();

    return new Promise((resolve, reject) => {
      console.log('[SSR]', context.url.path);
      const { app, router, store } = createApp({
        ssr: true,
        headers: context.headers,
      });

      // set router's location
      router.push(context.url)
        .catch((e) => {
          // Fix: unhandled exception,
          // because inside vue-router navigation guards
          // the `abort()` called before redirect conditions
          if (e) {
            console.error(e);
          }
        });

      // Set title and meta
      context.meta = app.$meta();
      context.appendHtml = () => {
        const {
          title, link, style, script, noscript, meta,
        } = context.meta.inject();

        return {
          head: `
          ${meta.text()}
          ${title.text()}
          ${link.text()}
          ${style.text()}
          ${script.text()}
          ${noscript.text()}
        `,
          body: script.text({ body: true }),
        };
      };

      // wait until router has resolved possible async hooks
      router.onReady(() => {
        const matchedComponents = router.getMatchedComponents();

        // no matched routes
        if (!matchedComponents.length) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({ code: 404, message: 'Not found' });
        }

        if (router.currentRoute.name === 'not-found') {
          context.statusCode = 404;
        }

        context.js = '';

        // Call preFetch hooks on components matched by the route.
        // A preFetch hook dispatches a store action and returns a Promise,
        // which is resolved when the action is complete and store state has been
        // updated.
        // Vuex Store prefetch
        // noinspection JSUnresolvedVariable,JSUnresolvedFunction
        Promise.all(matchedComponents.map(
          (component) => component.asyncData && component.asyncData({
            store,
            route: router.currentRoute,
          }),
        )).then(() => {
          context.rendered = () => {
            if (isDev) {
              console.log(`[SSR] Data prefetch: ${Date.now() - start}ms`);
            }

            // After all preFetch hooks are resolved, our store is now
            // filled with the state needed to render the app.
            // Expose the state on the render context, and let the request handler
            // inline the state in the HTML response. This allows the client-side
            // store to pick-up the server-side state without having to duplicate
            // the initial data fetching on the client.

            context.js += `window.__INITIAL_STATE__=${JSON.stringify(store.state)};`;
          };
          resolve(app);
        }).catch(reject);
      });
    });
  };
});
