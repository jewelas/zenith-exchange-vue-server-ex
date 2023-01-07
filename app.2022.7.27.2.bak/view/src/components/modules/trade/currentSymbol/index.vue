<!-- 币币交易 24小时行情 -->
<template>
<div>
  <div class="currentSymbol a-21-bg a-3-bd">
    <div class="symbol-total b-2-cl">
      <span
        class="symbol-name b-1-cl"
        @click="showLeftMarket"
        @mouseover="showCurrencyModal"
        @mouseleave="hideCurrencyModal"
      >
        <svg class="icon icon-22 market-show-button" aria-hidden="true"
          style="margin-top: 8px;">
          <use xlink:href="#icon-a_8"></use>
        </svg>
        {{symbolCurrent | getCoinShowName(symbolAll)}}
        <div class="coin-label"
          v-if="currentCoinLabel && coinTagOpen">
          <span class="coin-label a-12-cl">{{currentCoinLabel}}</span>
          <span class="coin-bg a-12-bg"></span>
        </div>
        <span
          class="symbol-name-vla"
          :class="symbolsData.rose.class"
        >{{symbolsData.rose.data}}</span>
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
      </span>
      <div class="eft-box" v-if="getShowEtf(symbolCurrent)">
        <span class="eft-class u-8-bd u-8-cl">
          ETF
        </span>
        <div class="eft-box-icon-box">
          <svg class="icon icon-14 eft-box-icon" aria-hidden="true">
            <use xlink:href="#icon-a_15"></use>
          </svg>
          <div class="page-market a-4-bg b-1-cl">
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
        </div>
      </div>
      <div class="price-box" :class="getShowEtf(symbolCurrent) ? 'price-box-eft ' : ''">
        <span
          v-show="symbolsData.close.data !== '--'"
          class="symbol-number"
          :class="symbolsData.close.class"
        >{{symbolsData.close.data}}</span>
        <span
          v-show="symbolsData.close.price !== '--'"
          class="symbol-property b-2-cl"
        >≈ {{symbolsData.close.price}}</span>
      </div>
    </div>
    <div class="symbol-info">
      <!-- {{symbolCurrent | getCoinShowName(symbolAll)}} -->
      <div class="info-item" v-if="getShowEtf(symbolCurrent) && fundRate"
        style="margin-left: 0; margin-right: 10px;">

        <!-- 资金费率 -->
        <span class="tit" :class="infoItemTitleClass">
          <!-- {{$t('etfAdd.jz')}} -->
          {{$t('etfAdd.fundRate')}}
        </span>
        <span
          class="vla" :class="infoItemValClass"
        >{{fundRate}}%</span>
      </div>
      <div class="info-item" v-if="getShowEtf(symbolCurrent)"
        style="margin-left: 0">
        <!-- 净值 -->
        <span class="tit" :class="infoItemTitleClass">
          <svg class="icon icon-14 eft-box-icon" aria-hidden="true">
            <use xlink:href="#icon-a_15"></use>
          </svg>
          {{$t('etfAdd.jz')}}
        </span>
        <span
          class="vla" :class="infoItemValClass"
        >{{etfPrice}}</span>
        <div class="page-market-jz a-4-bg b-1-cl">
          <div>{{$t('etfAdd.jzText1')}}</div>
          <div>{{$t('etfAdd.jzText2')}}</div>
        </div>
      </div>
      <div class="info-item" :style="!marketShrink ? 'margin-left: 10px' : ''">
        <span class="tit" :class="infoItemTitleClass">
          <!-- 涨跌幅  -->
          {{$t('trade.applies')}}
        </span>
        <span
          class="vla"
          :class="symbolsData.rose.class"
        >{{symbolsData.rose.data}}</span>
      </div>
      <div class="info-item" :style="!marketShrink ? 'margin-left: 10px' : ''">
        <span class="tit" :class="infoItemTitleClass">
          <!-- 最高价 -->
          {{$t('trade.height')}}
        </span>
        <span class="vla" :class="infoItemValClass">{{symbolsData.high}}</span>
      </div>
      <div class="info-item" :style="!marketShrink ? 'margin-left: 10px' : ''">
        <span class="tit" :class="infoItemTitleClass">
          <!-- 最低价 -->
          {{$t('trade.low')}}
        </span>
        <span class="vla" :class="infoItemValClass">{{symbolsData.low}}</span>
      </div>
      <div class="info-item info-item-vol" :style="!marketShrink ? 'margin-left: 10px' : ''">
        <span class="tit" :class="infoItemTitleClass">
          <!-- 24小时成交量 -->
          <!-- {{$t('trade.H_volume')}} -->
          {{$t('contract.H_volume')}}
        </span>
        <span class="vla" :class="infoItemValClass">
          {{symbolsData.vol}}
          {{symbolsData.symbol.symbol | getCoinShowName(coinList)}}
        </span>
      </div>
      <!--  <div class="info-item">
          <span class="tit" :class="infoItemTitleClass">24小时成交额</span>
          <span class="vla" :class="infoItemValClass">
            {{symbolsData.amount}}
            {{symbolsData.symbol.unit}}
          </span>
      </div>-->
    </div>
  </div>
  <div
      v-if="isMobile"
      class="currency-notes-modal currency-notes-modal-h5"
    >
      <currencyNotes :coinName="symbolCurrentCoinName">
      </currencyNotes>
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/modules/trade/currentSymbol/index/index';
import 'BlockChain-ui/PC/common-mixin/modules/trade/currentSymbol/index/index.styl';
import currencyNotes from './currencyNotes.vue';

export default {
  mixins: [mixin],
  components: {
    currencyNotes,
  },
  mounted() {
    this.init();
  },
};
</script>
