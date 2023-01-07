<template>
  <div class="newTradeModel-margin">
      <div class="new-pro-trade">
        <div
          class="newTrade-content a-8-bg"
          v-on:dblclick="ondblclick"
          @click="onclickfun"
        >
          <div class="tradeInfo-block">
            <!-- 24小时 当前行情 -->
            <CurrentSymbol
              :proTrade='true'
              moduleType="lever"
            />
            <div class="tradeView-block">
              <div class="newTrading-view">
                <div class="chart-box a-5-bg">
                  <TradingView moduleType="lever" />
                </div>
                <div class="newTrade-order">
                  <div class="order-list">
                    <OrderList moduleType="lever" />
                  </div>
                </div>
              </div>
              <div class="depth-view">
                <Depth
                  :proTrade='true'
                  moduleType="lever"/>
                <CurrentTrade
                  moduleType="lever"
                />
              </div>
            </div>
          </div>
          <div class="market-block a-6-bg">
            <TradeForm
              :proTrade='true'
              :fundRate="fundRate"
              moduleType="lever"/>
          </div>
        </div>
      </div>
    <c-h-bottomNav v-if="isMobile"
      :navList="navList"
      :navListActive="activeTypeId"
      @clickEvent="bottomNavClick" />
    <ThemeSetting v-if="isShowSetting" moduleType="lever" />
    <VersionChange />
    <i v-if="!baseInfo"></i>
  </div>
</template>
<script>
import commonMixin from 'BlockChain-ui/PC/common-mixin/modules/newTrade/index/mixin';
import mixin from 'BlockChain-ui/PC/common-mixin/newLever/index/index';
import 'BlockChain-ui/PC/common-mixin/newLever/index/index.styl';
// 当前币对信息
import CurrentSymbol from '@/components/modules/newTrade/currentSymbol/index.vue';
// 盘口 & 实时成交
import Depth from '@/components/modules/newTrade/depth/index.vue';
// tradingView/ Echarts
import TradingView from '@/components/modules/newTrade/tradingView/index.vue';
// 下单交易
import TradeForm from '@/components/modules/newTrade/tradeForm/lever-tradeForm.vue';
// 订单列表
import OrderList from '@/components/modules/newTrade/orderList/orderList.vue';
// 实时成交
import CurrentTrade from '@/components/modules/newTrade/currentTrade/index.vue';
// 主题设置
import ThemeSetting from '@/components/modules/newTrade/themeSetting/index.vue';
// 版本切换
import VersionChange from '@/components/modules/newTrade/versionChange/index.vue';

export default {
  mixins: [commonMixin, mixin],
  components: {
    CurrentSymbol,
    Depth,
    TradingView,
    TradeForm,
    OrderList,
    CurrentTrade,
    ThemeSetting,
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
