<template>
  <div :class="[{'mobile-trade-page' : isMobile}, mobileTradePageClass]"
    class="tradeModel-exchange">
     <!-- H5 版 -->
    <template v-if="isMobile" >
      <div
        v-on:dblclick="ondblclick"
        @click="onclickfun"
        class="trade-content a-8-bg"
        :class="{'trade-shrinks': shrink}">
        <div :class="leftClasses">
          <div ref="leftBox" class="left-block">
            <!-- 24小时行情 -->
            <Market @shrinkBlock="shrinkBlock"
              @serachShrinkBlock="serachShrinkBlock"
              moduleType='ex' />
          </div>
          <div class="main-block">
            <div class="center-block">
              <!-- 24小时 当前行情 -->
              <current-symbol :etfUrl="etfUrl" :etfPrice="etfPrice"
                :marketShrink="marketShrink"
                :fundRate="fundRate"></current-symbol>
              <div class="chart-box a-5-bg">
                <trading-view />
              </div>
              <div class="transaction a-6-bg">
                <trade-form />
              </div>
            </div>
          </div>
          <div class="right-block">
            <Depth :etfPrice="etfPrice"/>
          </div>
          <div v-if="isLogin" class="order-list">
            <orderList />
          </div>
        </div>
        <i v-if="!baseInfo"></i>
      </div>
    </template>
    <!-- PC 专业版 -->
    <template v-else>
      <div class="pro-trade" :class="{ 'hasEtfTip': isEtf && isShowEtfRiskTip }">
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
        <div v-on:dblclick="ondblclick"
          @click="onclickfun"
          class="trade-content a-8-bg trade-shrinks">
          <div class="left-expand">
            <div ref="leftBox" class="left-block"
              @mouseenter="evenHandMouseenter('proTradeMarketIsShow')"
              @mouseleave="evenHandMouseleave"
              v-show="proTradeMarketIsShow">
              <!-- 24小时行情 -->
              <Market @shrinkBlock="shrinkBlock" @serachShrinkBlock="serachShrinkBlock" />
            </div>
            <div class="main-block">
              <div class="center-block">
                <!-- 24小时 当前行情 -->
                <current-symbol :etfUrl="etfUrl" :etfPrice="etfPrice"
                  :marketShrink="marketShrink"
                  :fundRate="fundRate"/>
                <div class="chart-box a-5-bg">
                  <trading-view />
                </div>
              </div>
              <div class="order-list">
                <orderList />
              </div>
            </div>
            <div class="right-block">
              <International-depth :etfPrice="etfPrice" :proTrade="true"/>
              <div class="transaction a-6-bg" :style="showGridFlag ? 'height: 400px' : ''">
                 <trade-form :proTrade='true' :fundRate="fundRate"/>
                </div>
            </div>
          </div>
          <i v-if="!baseInfo"></i>
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
    <VersionChange />
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/modules/trade/index/mixin';
import 'BlockChain-ui/PC/common-mixin/trade/index/index.styl';
import Market from '@/components/modules/trade/market/index.vue';
// 当前币对信息
import currentSymbol from '@/components/modules/trade/currentSymbol/index.vue';
// 盘口 & 实时成交
import Depth from '@/components/modules/trade/depth/index.vue';
import InternationalDepth from '@/components/modules/trade/depth/internationalDepth.vue';
// tradingView/ Echarts
import tradingView from '@/components/modules/trade/tradingView/index.vue';
// 下单交易
import tradeForm from '@/components/modules/trade/tradeForm/ex-tradeForm.vue';
// 订单列表
import orderList from '@/components/modules/trade/orderList/orderList.vue';
// 版本切换
import VersionChange from '@/components/modules/newTrade/versionChange/index.vue';

export default {
  mixins: [mixin],
  components: {
    Market,
    currentSymbol,
    Depth,
    tradingView,
    tradeForm,
    orderList,
    InternationalDepth,
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
