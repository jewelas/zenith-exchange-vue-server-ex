<template>
  <div class="marketPage a-8-bg">

    <!-- 推荐位 -->
    <div class="recommend-infor a-6-bg" v-show="isShowRecommend">
      <vue-scroll>
        <Recommend />
      </vue-scroll>
      <div class="close-recommend a-5-bg" @click="closeRecommend">
        <svg class="icon icon-16" aria-hidden="true">
          <use xlink:href="#icon-c_7"></use>
        </svg>
      </div>
    </div>
    <!-- 24小时行情 -->
    <div class="market-block">
      <Market :dataList='marketDataList' :marketCurrent='marketCurrent'/>
    </div>
    <i v-if="!baseInfo"></i>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/market/index/index';
import 'BlockChain-ui/PC/common-mixin/market/index/index.styl';
import Market from './market/market.vue';
import Recommend from './recommend/china.vue';

export default {
  mixins: [mixin],
  components: {
    Recommend,
    Market,
  },
  mounted() {
    this.init();
  },
};
</script>
