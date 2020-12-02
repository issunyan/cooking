import Entry from './pages/Entry';

export default {
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Entry,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
};
