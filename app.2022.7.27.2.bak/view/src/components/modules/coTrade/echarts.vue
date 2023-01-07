<template>
  <div style="height: 100%">
    <div id="myEcharts" class="echart-box"></div>
    </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/modules/coTrade/echarts/echarts';
import 'BlockChain-ui/PC/common-mixin/modules/coTrade/echarts/echarts.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
