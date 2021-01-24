import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/style.css'
import '@/assets/iconfont/iconfont.css'
	
Vue.use(Antd);
Vue.prototype.$ajax = axios;
axios.defaults.baseURL = '/api';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
