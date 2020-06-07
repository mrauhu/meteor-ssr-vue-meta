// Both
import '/imports/startup/both';

// Server
import './html-attr';
import './init-methods';

// SSR - after loading all
import './vue-ssr';

// Debug
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  console.trace();
});
