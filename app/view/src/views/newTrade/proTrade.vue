<template>
  <div class="newTradeModel-exchange">
    <!-- PC 专业版 -->
    <template>
      <div class="new-pro-trade" :class="{ 'hasEtfTip': isEtf && isShowEtfRiskTip }">
        <!-- ETF风险提示 -->
        <div v-if="isEtf && isShowEtfRiskTip" class="trade-etf_riskTip">
          <div>
            <svg class="icon icon-14 icon-tip" aria-hidden="true">
              <use xlink:href="#icon-c_5"></use>
            </svg>
            {{ etfRiskTip }}&nbsp;&nbsp;
            <a :href="etfUrl">{{$t('etfAdd.introduce')}}</a>
          </div>
          <span class="riskTip-close" @click="isShowEtfRiskTip = false">
            <img src="../../assets/images/1/close.png" alt="">
          </span>
        </div>
        <div
          class="newTrade-content a-8-bg"
          v-on:dblclick="ondblclick"
          @click="onclickfun"
        >
          <div class="tradeInfo-block">
            <!-- 24小时 当前行情 -->
            <CurrentSymbol
              :etfUrl="etfUrl"
              :etfPrice="etfPrice"
              :marketShrink="marketShrink"
              :fundRate="fundRate"
              :proTrade='true'
            />
            <div class="tradeView-block">
              <div class="newTrading-view">
                <div class="chart-box a-5-bg">
                  <TradingView />
                </div>
                <div class="newTrade-order">
                  <div class="order-list">
                    <OrderList />
                  </div>
                </div>
              </div>
              <div class="depth-view">
                <Depth
                  :etfPrice="etfPrice"
                  :proTrade='true'
                  :showGridFlag="showGridFlag"/>
                <CurrentTrade
                  moduleType="ex"
                  :showGridFlag="showGridFlag"
                />
              </div>
            </div>
          </div>
          <div class="market-block a-6-bg">
            <TradeForm :proTrade='true' :fundRate="fundRate"/>
          </div>
        </div>
      </div>
    </template>

    <c-alert
      :showFlag="tradeAlertState"
      @close="hideTradeAlert"
      :imgMap="imgMap"
      @confirm="hideTradeAlert">
      <!-- 交易限制提醒 -->
      <div class="alertTitle b-1-cl">
        <!-- 温馨提示 -->
        {{$t('tradeLimt.tradeLimit_text_instructions')}}
      </div>
      <div class="trade-limit-text b-2-cl">{{ tradeLimitAlertText }}</div>
    </c-alert>
    <!-- 免责声明 -->
    <c-noticeDialog
      :showFlag="etfDialog"
      :titleText="$t('etfAdd.dialogTitle')"
      :confirmText="$t('etfAdd.confirmText')"
      paddingTop="0px"
      @confirm="etfDialogConfirm">
      <div class="trade-noticeDialog">
        <div class="trade-noticeDialog-even">
           {{$t('etfAdd.dText1')}}
        </div>
        <div class="trade-noticeDialog-even">
          <!-- {{$t('etfAdd.dText2')}} {{ etfName }} -->
          {{$t('etfAdd.dText3')}}
        </div>
        <div class="trade-noticeDialog-even">
           {{$t('etfAdd.dText4')}} <a class="u-8-cl"
            :href="etfUrl" target="_blank">{{$t('etfAdd.dText5')}}</a>
        </div>
        <div class="trade-noticeDialog-even">
           {{$t('etfAdd.dText6')}}
        </div>
        <div class="trade-noticeDialog-even">
           {{$t('etfAdd.dText7')}}
        </div>
        <div class="trade-noticeDialog-even">
           {{$t('etfAdd.dText8')}}
        </div>
        <div class="trade-noticeDialog-even">
           {{$t('etfAdd.dText9')}}
        </div>
      </div>
    </c-noticeDialog>
    <c-h-bottomNav v-if="isMobile"
      :navList="navList"
      :navListActive="activeTypeId"
      @clickEvent="bottomNavClick" />
    <ThemeSetting v-if="isShowSetting" />
    <VersionChange />
    <i v-if="!baseInfo"></i>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/modules/newTrade/index/mixin';
import 'BlockChain-ui/PC/common-mixin/newTrade/index.styl';
// 当前币对信息
import CurrentSymbol from '@/components/modules/newTrade/currentSymbol/index.vue';
// 盘口 & 实时成交
import Depth from '@/components/modules/newTrade/depth/index.vue';
// tradingView/ Echarts
import TradingView from '@/components/modules/newTrade/tradingView/index.vue';
// 下单交易
import TradeForm from '@/components/modules/newTrade/tradeForm/ex-tradeForm.vue';
// 订单列表
import OrderList from '@/components/modules/newTrade/orderList/orderList.vue';
// 实时成交
import CurrentTrade from '@/components/modules/newTrade/currentTrade/index.vue';
// 主题设置
import ThemeSetting from '@/components/modules/newTrade/themeSetting/index.vue';
// 版本切换
import VersionChange from '@/components/modules/newTrade/versionChange/index.vue';

export default {
  mixins: [mixin],
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
      window.location.href = '/trade';
    }
    this.createdInit();
    // this.init();
  },
};
</script>
