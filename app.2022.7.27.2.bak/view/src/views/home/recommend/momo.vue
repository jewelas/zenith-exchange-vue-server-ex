<template>
  <section class="inter-recommend momo-recommend-international">
    <ul class="recommend-ul clearfix"
        @mouseenter="enter"
        @mouseleave="leave"
        :style="ulStyle" :class="isScroll ? '' : 'ulCenter'">
        <template v-for="(item, index) in evenDatas" >
      <li   v-if="index < 4" :key="index"
          class="recommend-even"
          @click="bandLink(item.symbol)">
        <div class="bl"></div>
        <div class="symbol">{{ item.symbol | getCoinShowName(symbolAll)}}</div>
        <div class="price">{{ item.price }}</div>
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
      </template>
    </ul>
  </section>
</template>

<script>
import commonMixin from 'BlockChain-ui/PC/common-mixin/home/recommend/momo/momo';
import Charts from '../charts/china.vue';
import 'BlockChain-ui/PC/common-mixin/home/recommend/momo/momo.styl';


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
