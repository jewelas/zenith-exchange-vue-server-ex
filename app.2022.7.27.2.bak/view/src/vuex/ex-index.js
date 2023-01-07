import Vue from 'vue';
import Vuex from 'vuex';
import {
  baseData,
  url,
  personal,
  ordercenter,
  assets,
  regExp,
  tradeOrderList,
  fiatdeal,
  trade,
} from 'BlockChain-ui/PC/vuex';


Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    website: 'ex',
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
    tradeOrderList,
    fiatdeal,
    trade,
  },
});
