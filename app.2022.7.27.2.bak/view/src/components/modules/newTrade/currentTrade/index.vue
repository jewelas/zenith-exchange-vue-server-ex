<!-- 币币交易 实时成交 -->
<template>
  <div class="currentTrade currentTrade-index-container" :class="newTradeClass">
    <div class="block-header a-4-bg">
      <span class="h4 b-1-cl">
        <!-- 实时成交 -->
        {{ $t("trade5.latestDeal") }}
      </span>
    </div>
    <div class="block-content a-6-bg">
      <div
        v-if="theadList && theadList.length"
        class="thead  a-7-bg-h b-2-cl"
      >
        <span
          v-for="(item, index) in theadList"
          :key="'thead' + index"
          :class="'td-symbol' + index"
          :style="{ width: cellWidth[index] + 'px' }"
        >
          {{ item }}
        </span>
      </div>
      <div class="tbody newTrade-tbody" :class="gridFix ? 'gridFix': ''">
        <vue-scroll>
          <div
            class="symbol-item a-7-bg-h b-1-cl"
            :class="{ 'change-item': item.change }"
            v-for="(item, index) in dataList"
            :key="kyes(item, index)"
          >
            <div v-if="flashSwitchs" class="change a-3-bg"></div>
            <div class="bg a-4-bg"></div>
            <!-- 价格 -->
            <span
              class="td-symbol"
              @click="handelPrice(item.price)"
              :class="item.side"
              :style="{ width: cellWidth[0] + 'px' }"
            >
              <b class="hover_hide">{{ item.price }}</b>
              <b class="hover_show">{{ item.rate }}</b>
            </span>
            <!-- 成交量 -->
            <span class="td-price" :style="{ width: cellWidth[1] + 'px' }">
              {{ item.vol }}
            </span>
            <!-- 时间 -->
            <span class="td-rose" :style="{ width: cellWidth[2] + 'px' }">
              {{ item.time }}
            </span>
          </div>
          <div
            class="symbol-item a-7-bg-h b-1-cl"
            :key="index + 'diff'"
            v-for="index in differNUmber"
          >
            <span class="td-symbol" :style="{ width: cellWidth[0] + 'px' }">
              --
            </span>
            <span class="td-price" :style="{ width: cellWidth[1] + 'px' }">
              --
            </span>
            <span class="td-rose" :style="{ width: cellWidth[2] + 'px' }">
              --
            </span>
          </div>
        </vue-scroll>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/modules/newTrade/currentTrade/currentTrade';
import 'BlockChain-ui/PC/common-mixin/modules/newTrade/currentTrade/currentTrade.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
  props: {
    showGridFlag: {
      default: false,
      type: Boolean,
    },
  },
};
</script>

<style>
  .newTrade-index-container .grid-newTrade-tbody {
    height: 760px;
  }
</style>
