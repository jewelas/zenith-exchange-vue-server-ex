<!-- 币币交易 24小时行情 -->
<template>
<div class="newCurrentSymbol a-5-bg">
  <div class="currentSymbol-info">
    <div class="symbol-info_item">
      <div
        class="symbol-name b-1-cl"
        @mouseover="handleMouseOver"
        @mouseout="handleMouseOut"
      >
        <!-- @click="showLeftMarket" -->
        {{symbolCurrent | getCoinShowName(symbolAll)}}
        <span
          v-if="moduleType === 'lever'"
          class="coin-label a-12-cl a-12-bd">{{symbolItem.multiple}}X</span>
        <span
          v-else-if="currentCoinLabel && coinTagOpen"
          class="coin-label a-12-cl a-12-bd">{{currentCoinLabel}}</span>
        <div
          v-if="isPro"
          class="proTrade-arrow">
          <img src="http://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20210820142418802.png" alt="">
        </div>
        <div
          v-if="isPro"
          class="trade-market a-7-bg"
          :class="{'trade-market_show': showMarket}">
          <Market :moduleType="moduleType" />
        </div>
      </div>
      <div
        @mouseenter="showEtfSby = true"
        @mouseleave="showEtfSby = false"
        class="eft-box" v-if="getShowEtf(symbolCurrent)">
        <span class="eft-coinName x-2-cl">
          ETF
          <svg aria-hidden="true" class="icon icon-12">
            <use xlink:href="#icon-a_15"></use>
          </svg>
        </span>
        <transition name="fade">
          <div v-if="showEtfSby" class="page-market a-4-bg b-1-cl">
            <div class="page-market-even">{{$t('etfAdd.sbyText1')}}</div>
            <div class="page-market-even">{{$t('etfAdd.sbyText2')}}</div>
            <div class="page-market-even">{{$t('etfAdd.sbyText3')}}</div>
            <div class="page-market-even">{{$t('etfAdd.sbyText4')}}</div>
            <div class="page-market-even">{{$t('etfAdd.sbyText5')}}</div>
            <div class="page-market-click">
              <a :href="etfUrl"
                class="u-8-cl"
                target="_block">{{$t('etfAdd.sbyText6')}}</a>
            </div>
          </div>
        </transition>
      </div>
      <div
        v-else
        class="x-2-cl"
        @mouseover="showCurrencyModal"
        @mouseleave="hideCurrencyModal"
      >
        {{coinSymbolIntroduce.longName}}
        <transition name="fade">
          <div
            v-if="symbol_profile"
            class="currency-notes-modal"
            v-show="currencyModalState"
          >
            <currencyNotes :coinName="symbolCurrentCoinName">
            </currencyNotes>
          </div>
        </transition>
      </div>
    </div>
    <div class="symbol-info_container" ref="curSymbolContainer">
      <div
        v-if="slideSide"
        class="slide-btn icon-left a-5-bg"
        :class="{'slide-btn-cur': slideSide === 'right'}"
        @click="slideSymbolInfo('right')">
        <svg class="icon icon-18 hover_hide" aria-hidden="true">
          <use xlink:href="#icon-a_10_1"></use>
        </svg>
        <svg class="icon icon-18 hover_show" aria-hidden="true">
          <use xlink:href="#icon-a_10"></use>
        </svg>
      </div>
      <div
        class="symbol-info_detail"
        ref="curSumbolDetail"
        :style="slideStyle"
      >
        <div class="symbol-info_item">
          <div
            class="symbol-price"
            :class="symbolsData.rose.class"
          >
            {{symbolsData.close.data | formatNumber}}
          </div>
          <div class="x-2-cl">
            {{symbolsData.close.price | formatNumber}}
          </div>
        </div>
        <div class="symbol-info_item applies">
          <div class="x-2-cl">
            {{$t('trade5.applies')}}
          </div>
          <div :class="symbolsData.rose.class">
            {{upAndDown}}{{symbolsData.rose.price}}&nbsp;&nbsp;
            {{symbolsData.rose.data}}
          </div>
        </div>
        <div class="symbol-info_item">
          <div class="x-2-cl">
            {{$t('trade.height')}}
          </div>
          <div class="b-1-cl">
            {{symbolsData.high | formatNumber}}
          </div>
        </div>
        <div class="symbol-info_item">
          <div class="x-2-cl">
            {{$t('trade.low')}}
          </div>
          <div class="b-1-cl">
            {{symbolsData.low | formatNumber}}
          </div>
        </div>
        <div class="symbol-info_item">
          <div class="x-2-cl">
            {{$t('trade.H_volume')}}
          </div>
          <div class="b-1-cl">
            {{symbolsData.vol | formatNumber}}
          </div>
        </div>
        <div class="symbol-info_item">
          <div class="x-2-cl">
            {{$t('trade.H_turnover')}}
          </div>
          <div class="b-1-cl">
            {{symbolsData.amount | formatNumber}}
          </div>
        </div>
        <div v-if="getShowEtf(symbolCurrent)" class="symbol-info_item">
          <div class="x-2-cl">
            {{$t('etfAdd.fundRate')}}
          </div>
          <div class="b-1-cl">
            {{fundRate}}%
          </div>
        </div>
      </div>
      <div
        v-if="slideSide"
        class="slide-btn icon-right a-5-bg "
        :class="{'slide-btn-cur': slideSide === 'left'}"
        @click="slideSymbolInfo('left')">
        <svg class="icon icon-18 hover_hide" aria-hidden="true">
          <use xlink:href="#icon-a_11_1"></use>
        </svg>
        <svg class="icon icon-18 hover_show" aria-hidden="true">
          <use xlink:href="#icon-a_11"></use>
        </svg>
      </div>
    </div>
  </div>
  <div class="setting-button">
    <div v-if="isPro && moduleType !== 'lever'" class="tradeTypeChange b-2-cl a-4-bg">
      <span
        :class="{'b-4-cl a-14-bg': tradePage === '1', 'b-4-cl': tradePageHover === '1'}"
        @click="changeTradeType('1')"
        @mouseover="tradePageHover = '1'"
        @mouseleave="tradePageHover = null">
        {{$t('trade5.tradeType1')}}
      </span>
      <!-- <span
        :class="{'b-4-cl a-14-bg': tradePage === '2', 'b-4-cl': tradePageHover === '2'}"
        @click="changeTradeType('2')"
        @mouseover="tradePageHover = '2'"
        @mouseleave="tradePageHover = null">
        {{$t('trade5.tradeType2')}}
      </span> -->
      <span
        v-if="showGridFlag && gridTradeFlag"
        :class="{'b-4-cl a-14-bg': tradePage === '3', 'b-4-cl': tradePageHover === '3'}"
        @click="changeTradeType('3')"
        @mouseover="tradePageHover = '3'"
        @mouseleave="tradePageHover = null">
        {{$t('trade5.tradeType3')}}
      </span>
    </div>
    <div class="setting-icon" @click="openSetting">
      <span class="static">
        <svg aria-hidden="true" class="icon icon-18">
          <use xlink:href="#icon-b_2"></use>
        </svg>
      </span>
      <span class="hover">
        <svg aria-hidden="true" class="icon icon-18">
          <use xlink:href="#icon-b_2_1"></use>
        </svg>
      </span>
    </div>
  </div>
  <!-- <div
      v-if="isMobile"
      class="currency-notes-modal currency-notes-modal-h5"
    >
      <currencyNotes :coinName="symbolCurrentCoinName">
      </currencyNotes>
    </div> -->
</div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/modules/newTrade/currentSymbol/index/index';
import 'BlockChain-ui/PC/common-mixin/modules/newTrade/currentSymbol/index/index.styl';
import Market from '@/components/modules/newTrade/market/index.vue';
import currencyNotes from './currencyNotes.vue';

export default {
  mixins: [mixin],
  components: {
    Market,
    currencyNotes,
  },
  mounted() {
    this.init();
  },
};
</script>
