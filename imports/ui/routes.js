import Home from './views/Home.vue';
import NotFound from './views/NotFound.vue';

export const beforeEach = async ({ next /* , store */ }) => {
  // We can use `store` in this block, for dispatching actions.
  next();
};

export default [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound,
  },
];
