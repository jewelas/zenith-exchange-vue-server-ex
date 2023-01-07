<template>
  <section class="lxg-recommend">
    <ul class="recommend-ul clearfix" :class="isScroll ? '' : 'ulCenter'">
      <li class="recommend-item title-th">
        <div class="td-item td-item1">#</div>
        <div class="td-item td-item2">{{$t('home.market')}}</div>
        <div class="td-item td-item3">{{$t('home.close')}}</div>
        <div class="td-item td-item4">{{$t('home.applies')}}</div>
        <div class="td-item td-item-kline">{{$t('home.Kline')}}</div>
        <div class="td-item td-item5">{{$t('home.height')}}</div>
        <div class="td-item td-item5">{{$t('home.low')}}</div>
        <div class="td-item td-item5">{{$t('home.H_volume')}}</div>
        <div class="td-item td-item5">{{$t('home.H_turnover')}}</div>
        <!-- <div class="td-item td-item-btn">TRADE</div> -->
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
          <div class="td-item td-item5">{{ item.high }}</div>
          <div class="td-item td-item6">{{ item.low }}</div>
          <div class="td-item td-item7">{{ item.vol }}</div>
          <div class="td-item td-item8">{{ item.amount }}</div>
          <!-- <div class="td-item td-item-btn">
            <c-button @click="bandLink(item.symbol)">BUY</c-button>
          </div> -->
        </li>
      </template>
      <!-- <li class="more">
        <span @click="bandLink('')" >View More Market</span>
      </li> -->
    </ul>
  </section>
</template>

<script>
import commonMixin from 'BlockChain-ui/PC/common-mixin/home/recommend/recommend';
import mixin from 'BlockChain-ui/PC/common-mixin/home/recommend/lxg/lxg';
import Charts from '../charts/china.vue';
import 'BlockChain-ui/PC/common-mixin/home/recommend/lxg/lxg.styl';

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
