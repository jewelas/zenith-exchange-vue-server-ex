<template>
  <div>
    <div
      :id="'myEcharts' + name"
      v-bind:style="styleObject"
      class="echart-box"></div>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/home/charts/charts';
import 'BlockChain-ui/PC/common-mixin/home/charts/charts.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
