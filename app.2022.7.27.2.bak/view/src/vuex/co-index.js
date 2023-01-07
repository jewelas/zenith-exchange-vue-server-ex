import Vue from 'vue';
import Vuex from 'vuex';
import {
  baseData,
  url,
  personal,
  ordercenter,
  assets,
  regExp,
  coOrderList,
  fiatdeal,
  trade,
} from 'BlockChain-ui/PC/vuex';


Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    website: 'co',
  },
  mutations: {},
  actions: {},
  modules: {
    baseData,
    url,
    personal,
    ordercenter,
    assets,
    regExp,
    coOrderList,
    fiatdeal,
    trade,
  },
});
