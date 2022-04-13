import Vue from 'vue';
import axios from 'axios'

require('../css/common.css')
import "babel-polyfill"; // 解决 IE11 Promise对象未定义
import { until, reg } from "./until";

import query  from "./query";
import { api } from "./api";
import * as echarts from 'echarts';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import vueSeamlessScroll from 'vue-seamless-scroll'

Vue.use(ElementUI);
Vue.use(vueSeamlessScroll);

// @import url('https://www.ship88.cn/hk/jquery.js')
// import 'https://www.ship88.cn/hk/jsencrypt.js'
// import 'https://www.ship88.cn/hk/jsWebControl.js'
// import 'https://cdn.jsdelivr.net/npm/hls.js@latest'

export default {
  install(Vue) {

      // Vue.use(FileSaver)
    Vue.prototype.axios = axios;
    Vue.prototype.$api = new api();
    Vue.prototype.until = new until();
    Vue.prototype.reg = new reg();
      Vue.prototype.query = query;
      Vue.prototype.$echarts = echarts
  }
};
