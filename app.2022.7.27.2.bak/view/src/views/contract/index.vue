<template>
  <!-- 国际版 -->
  <div
    v-if="templateLayoutType && templateLayoutType === '2'"
    v-on:dblclick="ondblclick"
    @click="onclickfun"
    class="Int-contract-content a-8-bg"
    :class="{'trade-shrinks': shrink}">
    <div ref="leftBox" class="left-block">
      <!-- 交易面板 -->
      <div class="transaction a-6-bg">
        <trade-form />
      </div>
    </div>
    <!-- 24小时行情 -->
    <div class="top-market">
      <Market />
    </div>
    <div class="main-block">
      <div class="center-block">
        <!-- 24小时 当前行情 -->
        <current-symbol></current-symbol>
        <div class="chart-box a-6-bg">
          <trading-view moduleType="co" />
        </div>
      </div>
    </div>
    <!-- 深度盘口  和 实时成交 -->
    <div class="right-block">
      <Depth />
    </div>
    <div class="order-list">
      <orderList />
    </div>
    <i v-if="!baseInfo"></i>
  </div>
  <!-- 中国版 -->
  <div
    v-else
    v-on:dblclick="ondblclick"
    @click="onclickfun"
    class="contract-content a-8-bg"
    :class="{'trade-shrinks': shrink}">
    <div>
      <div ref="leftBox" class="left-block">
        <!-- 交易面板 -->
        <div class="transaction a-6-bg">
          <trade-form />
        </div>
      </div>
      <!-- 24小时行情 -->
      <div class="top-market">
        <Market />
      </div>
      <div class="main-block">
        <div class="center-block">
          <!-- 24小时 当前行情 -->
          <current-symbol></current-symbol>
          <div class="chart-box a-6-bg">
            <trading-view moduleType="co" />
          </div>
        </div>
      </div>
      <!-- 深度盘口  和 实时成交 -->
      <div class="right-block">
        <Depth />
      </div>
      <div v-if="isLogin" class="order-list">
        <orderList />
      </div>
    </div>
    <i v-if="!baseInfo"></i>
  </div>
</template>
<script>
import 'BlockChain-ui/PC/common-mixin/contract/index/index.styl';
import mixin from 'BlockChain-ui/PC/common-mixin/contract/index/index';
// mapState
// 24小时行情
import Market from '@/components/modules/coTrade/market.vue';
// 当前币对信息
import currentSymbol from '@/components/modules/coTrade/currentSymbol.vue';
// 盘口 && 实时成交
import Depth from '@/components/modules/coTrade/depth.vue';
// tradingView && Echarts
import tradingView from '@/components/modules/trade/tradingView/index.vue';
// 下单交易
import tradeForm from '@/components/modules/coTrade/tradeForm.vue';
// 订单列表
import orderList from '@/components/modules/coTrade/orderList.vue';

export default {
  mixins: [mixin],
  components: {
    Market,
    currentSymbol,
    Depth,
    tradingView,
    tradeForm,
    orderList,
  },
  mounted() {
    this.init();
  },
};
</script>
