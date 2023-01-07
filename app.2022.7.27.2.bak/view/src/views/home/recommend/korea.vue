<template>
  <section class="inter-recommend inter-recommend-korea">
    <ul class="clearfix">
      <template  v-for="(item, index) in evenDatas" >
      <li
          v-if="index < 2"
          :key="index"
          class="recommend-even"
          @click="bandLink(item.symbol)">
        <div class="c-h">
          <div class="symbol">
            <span class="b-cion">{{setCion(item.symbol, 'q')}}</span>
            <span class="q-cion">{{setCion(item.symbol, 'b')}}</span>
            <p>市场指数</p>
          </div>
          <div class="f-right">
            <div class="price">
              {{item.price}}
            </div>
            <div class="rose" :class="item.roseCls">{{ item.roseVal }}</div>
          </div>
        </div>
        <div class="kline">
          <Charts :key="item.symbol + index"
                  :dataList="klineDataList[item.symbol]"
                  :name="item.symbol + index"
                  height="120px"
                  :haveBg="false"
                  :klineColor="item.klineColor"></Charts>
        </div>
        <p class="bz"><span :style="{'background': item.klineColor}"></span> 今天</p>
      </li>
      </template>
    </ul>
  </section>
</template>

<script>
import commonMixin from 'BlockChain-ui/PC/common-mixin/home/recommend/recommend';
import mixin from 'BlockChain-ui/PC/common-mixin/home/recommend/korea/korea';
import Charts from '../charts/china.vue';
import 'BlockChain-ui/PC/common-mixin/home/recommend/korea/korea.styl';

export default {
  mixins: [commonMixin, mixin],
  components: {
    Charts,
  },
  mounted() {
    this.init();
  },
};
</script>
