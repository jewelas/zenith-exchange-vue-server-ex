<template>
  <div>
    <section v-if="homeEditReady">
      <section v-if="home_edit_html" v-html="home_edit_html" class="interHome-custom"></section>
      <Custom v-else/>
    </section>
    <!-- 推荐位 -->
    <Recommend v-if="headerSymbol.length" :dataList="recommendDataList"/>
    <i v-if="!baseInfo"></i>
  </div>
</template>

<script>
import commonMixin from 'BlockChain-ui/PC/common-mixin/home/home/home';
import 'BlockChain-ui/PC/common-mixin/home/home/home.styl';
import mixin from 'BlockChain-ui/PC/common-mixin/home/home/bitWind/bitWind';
import 'BlockChain-ui/PC/common-mixin/home/home/bitWind/bitWind.styl';
import Custom from '../custom/bitWind.vue';
import Recommend from '../recommend/bitwind.vue';

export default {
  mixins: [commonMixin, mixin],
  components: {
    Custom,
    Recommend,
  },
  mounted() {
    this.init();
    this.bitWindInit();
  },
};
</script>
