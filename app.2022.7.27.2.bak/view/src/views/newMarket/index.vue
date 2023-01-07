<template>
  <div class="v5-marketPage mod-market">
    <!-- 推荐位 -->
    <Recommend style="margin:67px 0 100px;"/>
    <!-- 24小时行情 -->
    <Market :dataList='marketDataList' :marketCurrent='marketCurrent'/>
    <i v-if="!baseInfo"></i>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/newMarket/index/index';
import 'BlockChain-ui/PC/common-mixin/newMarket/index/index.styl';
import Market from './market/index.vue';
import Recommend from './recommend/index.vue';

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

<style lang="stylus" scoped>
.mod-market{
  max-width: 1280px;
  margin: 0 auto;
}
</style>
