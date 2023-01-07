<template>
  <div style="height: 100%">
    <div v-show="loading" class="loading">
      <c-loading size="50" />
    </div>
    <div id="myEcharts" class="echart-box"></div>
    </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/modules/trade/echarts/echarts';
import 'BlockChain-ui/PC/common-mixin/modules/trade/echarts/echarts.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
