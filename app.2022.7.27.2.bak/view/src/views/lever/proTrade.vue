<template>
  <div :class="[{'mobile-trade-page' : isMobile}, mobileTradePageClass]">
      <div class="pro-trade" id="tradeModel-lever">
        <div
          v-on:dblclick="ondblclick"
          @click="onclickfun"
          class="trade-content a-8-bg">
          <div class="left-expand">
            <div ref="leftBox" class="left-block"
              @mouseenter="evenHandMouseenter('proTradeMarketIsShow')"
              @mouseleave="evenHandMouseleave"
              v-show="proTradeMarketIsShow">
              <!-- 24小时行情 -->
              <Market @shrinkBlock="shrinkBlock"
                @serachShrinkBlock="serachShrinkBlock"
                moduleType="lever"/>
            </div>
            <div class="lever-main-block" >
              <div class="center-block">
                <!-- 24小时 当前行情 -->
                <current-symbol moduleType="lever" />
                <div class="chart-box a-5-bg">
                  <trading-view moduleType="lever" />
                </div>
              </div>
              <div class="order-list">
                <orderList moduleType="lever"/>
              </div>
            </div>
            <div class="right-block">
              <Depth moduleType="lever" />
              <div class="lever-transaction a-6-bg">
                  <trade-form />
                </div>
            </div>
          </div>
          <i v-if="!baseInfo"></i>
        </div>
      </div>
    <c-h-bottomNav v-if="isMobile"
      :navList="navList"
      :navListActive="activeTypeId"
      @clickEvent="bottomNavClick" />
    <VersionChange />
  </div>
</template>
<script>
import commonMixin from 'BlockChain-ui/PC/common-mixin/modules/trade/index/mixin';
import mixin from 'BlockChain-ui/PC/common-mixin/lever/index/index';
import 'BlockChain-ui/PC/common-mixin/lever/index/index.styl';
// 下单交易
import tradeForm from '@/components/modules/trade/tradeForm/lever-tradeForm.vue';
import Market from '@/components/modules/trade/market/index.vue';
// 当前币对信息
import currentSymbol from '@/components/modules/trade/currentSymbol/index.vue';
// 盘口 & 实时成交
import Depth from '@/components/modules/trade/depth/internationalDepth.vue';
// tradingView/ Echarts
import tradingView from '@/components/modules/trade/tradingView/index.vue';
// 订单列表
import orderList from '@/components/modules/trade/orderList/orderList.vue';
// 版本切换
import VersionChange from '@/components/modules/newTrade/versionChange/index.vue';

export default {
  mixins: [commonMixin, mixin],
  components: {
    Market,
    currentSymbol,
    Depth,
    tradingView,
    tradeForm,
    orderList,
    VersionChange,
  },
  created() {
    if (this.isMobile) {
      window.location.href = '/margin';
    }
    this.leverInit();
    this.init();
  },
  mounted() {
    this.leverMounted();
  },
};
</script>
