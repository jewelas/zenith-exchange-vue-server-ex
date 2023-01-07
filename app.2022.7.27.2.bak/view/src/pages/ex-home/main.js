
import Vue from 'vue';
import BlockChainUI from 'BlockChain-ui/PC/components';
import vuescroll from 'vuescroll/dist/vuescroll-native';
import { colorMap, getCoinShowName } from '@/utils';
import bus from '@/api/bus';
import { i18n } from '@/locale';
import App from './App.vue';
import router from '../../router/ex-router';
import store from '../../vuex/ex-index';
import axios from '../../api/http/axios';
import 'BlockChain-ui/static/css/common.styl';
import Fuzionx from '../../components/fuzionx';
import '../../assets/fuzionx/styles/index.css';
import '../../assets/fuzionx/styles/theme.css';
import '../../assets/iconfont/icon.css';
import { injectTheme } from '../../components/fuzionx/utils';

injectTheme();

window.HOSTAPI = 'ex';
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

// Vue.prototype.getCoinShowName = (name) =>{
//   const coinList = this.$store.state.baseData.symbolAll;
//   if (coinList && coinList[name]) {
//     return coinList[name.toUpperCase()].showName || name;
//   }
//   return name;
// }

Vue.filter('getCoinShowName', (name, coinList) => getCoinShowName(name, coinList));
Vue.directive('drag', {
  bind(el) {
    const odiv = el; // 获取当前元素
    const w = document.body.clientWidth;
    const h = document.body.clientHeight;
    odiv.ontouchstart = (e) => {
      // 算出鼠标相对元素的位置
      const disX = e.changedTouches[0].clientX - odiv.offsetLeft;
      const disY = e.changedTouches[0].clientY - odiv.offsetTop;

      // const vh = document.documentElement.scrollTop;
      // document.documentElement.style.top = `-${vh}px`;
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.position = 'fixed';
      document.ontouchmove = (ev) => {
        // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = ev.changedTouches[0].clientX - disX;
        let top = ev.changedTouches[0].clientY - disY;
        // 移动当前元素
        if (top < 40) { top = 40; }
        if (top > (h - 40)) { top = h - 40; }
        if (left < 0) { left = 0; }
        if (left > (w - 42)) { left = w - 42; }
        odiv.style.left = `${left}px`;
        odiv.style.top = `${top}px`;
        odiv.style['border-radius'] = '20px';
      };
      document.ontouchend = () => {
        odiv.style.left = `${w - 42}px`;
        odiv.style['border-radius'] = '20px 0 0 20px';
        document.ontouchstart = null;
        document.ontouchmove = null;
        setTimeout(() => {
          document.documentElement.style.overflow = 'auto';
          document.documentElement.style.position = 'inherit';
          // document.documentElement.scrollTop = vh;
          // document.documentElement.style.top = '0px';
        }, 500);
      };
    };
  },
});
const screenWidth = document.body.clientWidth;
if (screenWidth < 961) {
  window.isMobile = true;
}
new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app');
