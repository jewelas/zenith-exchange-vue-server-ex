
import Vue from 'vue';
import BlockChainUI from 'BlockChain-ui/PC/components';
import vuescroll from 'vuescroll/dist/vuescroll-native';
import { colorMap, getCoinShowName } from '@/utils';
import bus from '@/api/bus';
import { i18n } from '@/locale';
import App from './App.vue';
import router from '../../router/co-router';
import store from '../../vuex/co-index';
import axios from '../../api/http/axios';
import 'BlockChain-ui/static/css/common.styl';
import Fuzionx from '../../components/fuzionx';
import '../../assets/fuzionx/styles/index.css';
import '../../assets/fuzionx/styles/theme.css';
import '../../assets/iconfont/icon.css';
import { injectTheme } from '../../components/fuzionx/utils';

injectTheme();
window.HOSTAPI = 'co';
Vue.use(vuescroll, {
  ops: {
    rail: {
      opacity: '1',
      background: colorMap['c-5-bd'],
      size: '4px',
      gutterOfSide: '0px',
    },
    bar: {
      background: colorMap['a-2-bg'],
      keepShow: true,
      size: '4px',
      minSize: 0.2,
    },
    scrollPanel: {
      easing: 'easeInQuad',
      speed: 800,
    },
  },
});
Vue.use(BlockChainUI);
Vue.use(Fuzionx);

Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.prototype.$bus = bus;

Vue.filter('getCoinShowName', (name, coinList) => getCoinShowName(name, coinList));

new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app');
