<!-- 币币交易 24小时行情 -->
<template>
  <div class="co-market-box">
    <div class="main-market-container" style="height: 72px">
      <vue-scroll>
        <div class="main-market a-6-bg" :style="marketListWidth">
          <div
            class="market-item a-8-bd"
            :class="{ 'a-21-bg': marketCurrent === item.name }"
            v-for="(item, index) in marketList"
            @click="switchMarket(item.name)"
            :key="index"
          >
            <template v-if="marketCurrent !== item.name">
              <div class="symbol-scope">
                <span class="name b-1-cl">{{ item.name }}</span>
                <span
                  v-if="item.WsData"
                  class="scope"
                  :class="item.WsData.rose.class"
                >
                  {{ item.WsData.roses }}
                </span>
              </div>
              <p v-if="item.WsData" class="price">{{ item.WsData.closes }}</p>
            </template>
            <template v-else>
              <div class="symbol-scope">
                <span class="name b-1-cl">{{ item.name }}</span>
                <span
                  v-if="currentSymbolData.WsData"
                  class="scope"
                  :class="currentSymbolData.WsData.rose.class"
                >
                  {{ currentSymbolData.WsData.roses }}
                </span>
              </div>
              <p v-if="currentSymbolData.WsData" class="price">
                {{ currentSymbolData.WsData.closes }}
              </p>
            </template>
          </div>
        </div>
      </vue-scroll>
    </div>
    <div class="sub-market a-21-bg" v-if="currentSymbolList">
      <span
        class="sub-tab"
        v-for="(item, index) in currentSymbolList"
        :key="index"
        :class="{ 'b-1-cl current': item.symbol === symbolCurrent }"
        @click="switchSymbol(item.symbol)"
      >
        {{ item.typeName }}
        {{ item.WsData.closes }}
        <b class="current-botton a-12-bg"></b>
      </span>
      <span v-if="datedifference" class="difference">
        <!-- 距离交割时间 -->
        {{ $t("contract.deliveryTime") }}
        <i class="b-1-cl">{{ datedifference }}{{ $t("contract.day") }}</i>
      </span>
    </div>
    <i v-if="!baseInfo"></i>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/modules/coTrade/market/market';
import 'BlockChain-ui/PC/common-mixin/modules/coTrade/market/market.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
