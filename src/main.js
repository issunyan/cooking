import Vue from 'vue';
import VueRouter from 'vue-router';
// import { Button, Select } from 'element-ui';
import ElementUI from 'element-ui';

import routes from './routes';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(VueRouter);
// Vue.use(Button);
// Vue.use(Select);
Vue.use(ElementUI);

new Vue({
  render: (h) => h(App),
  router: new VueRouter(routes),
}).$mount('#app');
