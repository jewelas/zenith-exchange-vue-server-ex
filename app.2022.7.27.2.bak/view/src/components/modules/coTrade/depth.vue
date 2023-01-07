<!-- 币币交易 盘口 -->
<template>
  <div class="coDepth-block codepath-container">
    <div class="coDepth">
      <div class="block-header a-3-bd a-21-bg e-2-cl">
        <span class="h4 b-1-cl">
          <!-- 盘口 -->
          {{ $t("contract.handicap") }}
        </span>
        <span
          class="title-tab a-12-bd"
          @click="switchBlock('D')"
          :class="{ 'selected b-1-cl': shrinksDdpthNewShow === 'D' }"
        >
          <!-- 盘口 -->
          {{ $t("contract.handicap") }}
        </span>
        <span
          class="title-tab title-new-tab a-12-bd"
          @click="switchBlock('T')"
          :class="{ 'selected b-1-cl': shrinksDdpthNewShow === 'T' }"
        >
          <!-- 实时成交 -->
          {{ $t("contract.latestDeal") }}
        </span>
        <div class="switch-btn">
          <i class="dtIcon" @click="switchDepthType('center')">
            <svg class="icon icon-14" aria-hidden="true">
              <use xlink:href="#icon-a_5"></use>
            </svg>
          </i>
          <i class="dtIcon" @click="switchDepthType('sell')">
            <svg class="icon icon-14" aria-hidden="true">
              <use xlink:href="#icon-a_7"></use>
            </svg>
          </i>
          <i class="dtIcon" @click="switchDepthType('buy')">
            <svg class="icon icon-14" aria-hidden="true">
              <use xlink:href="#icon-a_6"></use>
            </svg>
          </i>
        </div>
      </div>
      <div
        :class="{ 'is-show': shrinksDdpthNewShow === 'D' }"
        class="block-content a-6-bg"
      >
        <tableList
          type="asks"
          :theadList="theadList"
          :dataList="dataList.asksData"
          :maxValue="dataList.depthMaxNumber"
          :cellWidth="cellWidth"
          :lineNumber="sellLineNumber"
          :bodyHeight="sellHeight"
        />
        <div class="current-price a-21-bg">
          <div class="price-box b-1-cl">
            <span
              class="price"
              v-if="symbolsData.close.data !== '--'"
              :class="symbolsData.close.class"
            >
              {{ symbolsData.close.data }}
            </span>
            <span class="indexPrice">{{ indexPrice }} </span>
            <span class="tagPrice">/ {{ tagPrice }}</span>
          </div>
          <span class="jb">
            <i
              class="jb_item a-2-bd"
              v-for="index in 5"
              :key="index"
              :class="{ 'b-5-bg b-5-bd': liquidationRate >= index }"
            ></i>
          </span>
        </div>
        <tableList
          type="buy"
          :dataList="dataList.buyData"
          :maxValue="dataList.depthMaxNumber"
          :lineNumber="buyLineNumber"
          :cellWidth="cellWidth"
          :bodyHeight="buyHeight"
        />
      </div>
    </div>
    <!-- 实时成交 -->
    <div class="new-tradb" :class="{ 'is-show': shrinksDdpthNewShow === 'T' }">
      <new-trade />
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/modules/coTrade/depth/depth';
import 'BlockChain-ui/PC/common-mixin/modules/coTrade/depth/depth.styl';
import tableList from './tableList.vue';
// 实时成交
import newTrade from './newTrade.vue';

export default {
  mixins: [mixin],
  components: {
    tableList,
    newTrade,
  },
  mounted() {
    this.init();
  },
};
</script>
