import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';

import Entry from './pages/Entry';
import App from './App.vue';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  router: new VueRouter({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: Entry,
      },
      {
        path: '*',
        redirect: '/',
      },
    ],
  }),
}).$mount('#app');
