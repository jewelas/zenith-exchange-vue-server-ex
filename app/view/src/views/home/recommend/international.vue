<template>
  <section class="inter-recommend inter-recommend-international c-4-bg c-5-bd">
    <ul class="recommend-ul clearfix"
        @mouseenter="enter"
        @mouseleave="leave"
        :style="ulStyle" :class="isScroll ? '' : 'ulCenter'">
      <li v-for="(item, index) in evenDatas" :key="index"
          class="recommend-even"
          @click="bandLink(item.symbol)">
        <div class="c-5-bg bl"></div>
        <div class="symbol">
          {{ item.symbol | getCoinShowName(symbolAll)}}
          <div class="coin-label" v-if="item.coinLabel">
            <span class="coin-text a-12-cl">{{item.coinLabel}}</span>
            <span class="coin-bg a-12-bg"></span>
          </div>
        </div>
        <div class="price b-1-cl">{{ item.price }}</div>
        <div class="volume">24H Vol {{ item.volume }}</div>
        <div class="rose" :class="item.roseCls">{{ item.roseVal }}</div>
        <div class="kline">
          <Charts :key="item.symbol + index" :dataList="klineDataList[item.symbol]"
                  :name="item.symbol + index"
                  height="32px"
                  :haveBg="false"
                  :klineColor="item.klineColor"></Charts>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import commonMixin from 'BlockChain-ui/PC/common-mixin/home/recommend/recommend';
import Charts from '../charts/china.vue';
import 'BlockChain-ui/PC/common-mixin/home/recommend/international/international.styl';


export default {
  mixins: [commonMixin],
  components: {
    Charts,
  },
  mounted() {
    this.init();
  },
};
</script>
