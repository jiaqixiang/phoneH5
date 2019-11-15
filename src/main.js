// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import YDUI from 'vue-ydui';
import 'vue-ydui/dist/ydui.rem.css';
import '../static/iconfont/iconfont.css';
import Common from './common/common';
import * as Api from './common/api';

Vue.use(YDUI);

Vue.config.productionTip = false;
Vue.prototype.GLOBAL = Common;
// Vue.prototype.$api = Api;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
