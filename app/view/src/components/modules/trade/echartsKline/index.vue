<template>
  <div style="height: 100%">
    <div class="seriesData" v-if="seriesData && seriesData.data.length">
      <p class="s-d">
        <span class="date"></span>
        <span class="item">{{$t('trade.datatext1')}}={{seriesData.data[0]}}</span>
        <span class="item">{{$t('trade.datatext2')}}={{seriesData.data[2]}}</span>
        <span class="item">{{$t('trade.datatext3')}}={{seriesData.data[3]}}</span>
        <span class="item">{{$t('trade.datatext4')}}={{seriesData.data[1]}}</span>
        <span class="item">{{$t('trade.datatext5')}}={{seriesData.vol}}</span>
        <span class="item">&nbsp;&nbsp;&nbsp;&nbsp;{{change}}</span>
      </p>
      <p class="ma-data">
        <span class="item ma5">MA5:{{seriesData.MA5}}</span>
        <span class="item ma10">MA10:{{seriesData.MA10}}</span>
        <span class="item ma30">MA30:{{seriesData.MA30}}</span>
      </p>

    </div>
    <div id="myEchartsKline" @mouseleave="KlineLeave()" class="echart-box"></div>
    </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/modules/trade/echartsKline/echartsKline';
import 'BlockChain-ui/PC/common-mixin/modules/trade/echartsKline/echartsKline.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
  computed: {
    change() {
      const a = parseFloat(this.seriesData.data[0]);
      const b = parseFloat(this.seriesData.data[1]);
      const changeA = b - a;
      // const fixChangeA = this.$store.state.baseData.market
      // .market[this.symbolName.count][this.symbolCurrent].price;
      return `${(changeA / a * 100).toFixed(2)}%`;
    },
  },
};
</script>
