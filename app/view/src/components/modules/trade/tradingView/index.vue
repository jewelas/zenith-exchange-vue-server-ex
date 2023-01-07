<template>
  <div
    class="ex-canter-echart-box a-6-bg"
    :style="{ height: TvBoxHeight }"
    :class="{ 'canter-echart-full': isfullTv }"
    ref="tv_chart_container"
  >
    <div class="top-menu b-3-cl" :class="{hide: chartType === 2, lefts: chartType === 3 }">
      <div class="top-menu-bar" ref="topMenuBar">
        <i
          class="slide-btn icon-left a-6-bg"
          :class="{ 'slide-btn-cur': parseFloat(slidePosition) < 0 }"
          @click="slideMarket('left')"
        >
          <svg class="icon icon-14 hover_hide" aria-hidden="true">
            <use xlink:href="#icon-a_10_1"></use>
          </svg>
          <svg class="icon icon-14 hover_show" aria-hidden="true">
            <use xlink:href="#icon-a_10"></use>
          </svg>
        </i>
        <div
          class="top-menu-box"
          :style="{ left: slidePosition }"
          ref="topMenuBox"
        >
          <span
            @click="timeClike('Line')"
            :class="{ 'a-4-bg b-1-cl': lastTimeS === 'Line' }"
            class="time-line  a-4-cl-h"
          >
            <i class="hoverHide">Line</i>
            <i class="b-1-cl hoverShow">Line</i>
          </span>
          <span
            v-for="item in baseTimeArry"
            @click="timeClike(item)"
            :key="item"
            :class="{ 'a-4-bg b-1-cl': lastTimeS === item }"
            class="time-line a-4-cl-h"
          >
            <i class="hoverHide">{{ item }}</i>
            <i class="b-1-cl hoverShow">{{ item }}</i>
          </span>
          <span class="time-line full-btn a-8-bd a-4-cl-h" @click="fullTv">
            <template v-if="!isfullTv">
              <i class="hoverHide">{{ $t("trade.full") }}</i>
              <i class="b-1-cl hoverShow">{{ $t("trade.full") }}</i>
            </template>
            <template v-else>
              <i class="hoverHide">{{ $t("trade.outFull") }}</i>
              <i class="b-1-cl hoverShow">{{ $t("trade.outFull") }}</i>
            </template>
          </span>
        </div>
        <i
          class="slide-btn icon-right a-6-bg"
          :class="{
            'slide-btn-cur':
              maxPosition > 0 && parseFloat(slidePosition) > -maxPosition
          }"
          @click="slideMarket('right')"
        >
          <svg class="icon icon-14 hover_hide" aria-hidden="true">
            <use xlink:href="#icon-a_11_1"></use>
          </svg>
          <svg class="icon icon-14 hover_show" aria-hidden="true">
            <use xlink:href="#icon-a_11"></use>
          </svg>
        </i>
      </div>
    </div>

    <div class="mask-bg a-6-bg" v-show="isshowLoading && maskBg"></div>
    <transition name="fade">
      <div v-show="isshowLoading" class="loading">
        <c-loading size="50" />
      </div>
    </transition>
    <p class="a-8-bg inline"></p>
    <div class="top-tab">
      <span
        @click="switchChartType(1)"
        @mouseenter="enter(1)"
        @mouseleave="leave()"
        class="switch-chart-type"
        :class="{'u-8-cl':chartTypeShow(1) }"
      >
        <!-- {{$t('trade.dataType2')}} -->
        <svg v-if="chartTypeShow(1)" class="icon icon-16" aria-hidden="true">
          <use xlink:href="#icon-c_12_1"></use>
        </svg>
        <svg v-else class="icon icon-16" aria-hidden="true">
          <use xlink:href="#icon-c_12"></use>
        </svg>
      </span>
      <span
        @click="switchChartType(2)"
        @mouseenter="enter(2)"
        @mouseleave="leave()"
        class="switch-chart-type"
        :class="{'u-8-cl':chartTypeShow(2) }"
      >
        <!-- 深度图 -->
        <!-- {{$t('trade.dataType3')}} -->
        <svg v-if="chartTypeShow(2)" class="icon icon-16" aria-hidden="true">
          <use xlink:href="#icon-c_13_1"></use>
        </svg>
        <svg v-else class="icon icon-16" aria-hidden="true">
          <use xlink:href="#icon-c_13"></use>
        </svg>
      </span>
    </div>
    <div class="kline-bg" v-if="klineLogo">
      <img :src="klineLogo" class="kline-img" alt="" />
    </div>
    <div class="coverKlineBox"></div>
    <div class="slide" :class="{ selected: chartType === 1 }">
      <div id="tv_chart_container" class="tv_chart_container"></div>
    </div>
    <div class="slide" :class="{ selected: chartType === 2 }"
         v-if="echartLoaded && chartType === 2">
      <div class="echarts" style="height: 100%">
        <Echarts :chartType="chartType" :moduleType="moduleType" />
      </div>
    </div>
    <div class="slide"
      v-if="chartType === 3 && !isMobile && echartLoaded"
      :class="{ selected: chartType === 3 }">
      <div class="echarts" style="height: 100%">
        <EchartsKline />
      </div>
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/modules/trade/tradingView/tradingView';
import 'BlockChain-ui/PC/common-mixin/modules/trade/tradingView/tradingView.styl';
import Echarts from '../echarts/index.vue';
import EchartsKline from '../echartsKline/index.vue';


export default {
  mixins: [mixin],
  components: {
    Echarts,
    EchartsKline,
  },
  mounted() {
    this.init();
  },
  destroyed() {
    this.$bus.$off('SYMBOL_LIST_ALL');
    // 监听 WebSocket 链接成功
    this.$bus.$off('WEBSOCKET_ON_OPEN');
    // 获取 当前选中的货币对
    this.$bus.$off('SYMBOL_CURRENT');
  },
  beforeDestroy() {
    this.MywebSocket = false;
  },
};
</script>
