<template>
  <section class="king-recommend">
    <ul class="recommend-ul clearfix" :class="isScroll ? '' : 'ulCenter'">
      <li class="recommend-item title-th">
        <div class="td-item td-item1">#</div>
        <div class="td-item td-item2">MARKET</div>
        <div class="td-item td-item3">PRICE</div>
        <div class="td-item td-item4">CHANGE</div>
        <div class="td-item td-item-kline">CHART</div>
        <div class="td-item td-item-btn">TRADE</div>
      </li>
      <template v-for="(item, index) in evenDatas">
        <li :key="index"
            v-if="index < 5"
            class="recommend-item">

          <div class="td-item td-item1">{{index + 1}}</div>
          <div class="td-item td-item2">
            <span class="symbol-icon">
              <img :src="symbolIcon(item)" alt="">
            </span>
            <span class="b-cion">{{setSymbol(item.symbol, 'q')}}</span>
            <span class="q-cion">{{setSymbol(item.symbol, 'b')}}</span>
          </div>
          <div class="td-item td-item3">{{ item.price }}</div>
          <div class="td-item td-item4" :class="item.roseCls">{{ item.roseVal }}</div>
          <div class="td-item td-item-kline">
            <Charts :key="item.symbol + index" :dataList="klineDataList[item.symbol]"
                    :name="item.symbol + index"
                    height="25px"
                    lineWidth = "1"
                    :haveBg="false"
                    klineColor="#9CA1C2"></Charts>
          </div>
          <div class="td-item td-item-btn">
            <c-button @click="bandLink(item.symbol)">BUY</c-button>
          </div>
        </li>
      </template>
      <li class="more">
        <span @click="bandLink('')" >View More Market</span>
      </li>
    </ul>
  </section>
</template>

<script>
import commonMixin from 'BlockChain-ui/PC/common-mixin/home/recommend/recommend';
import mixin from 'BlockChain-ui/PC/common-mixin/home/recommend/king/king';
import Charts from '../charts/china.vue';
import 'BlockChain-ui/PC/common-mixin/home/recommend/king/king.styl';

export default {
  components: {
    Charts,
  },
  mixins: [commonMixin, mixin],
  mounted() {
    this.init();
  },
};
</script>
