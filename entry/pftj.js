import Vue from 'vue';
import App from '../src/views/index/pftj.vue';
import init from "../src/assets/js/init";
      
Vue.use(init);
Vue.config.productionTip = false;
new Vue({ render: h => h(App) }).$mount('#pftj'); 