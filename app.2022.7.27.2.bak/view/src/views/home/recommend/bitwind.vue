<template>
  <section class="bitWind-recommend recommend-bitwind-contianer">
    <ul class="recommend-ul clearfix"
        @mouseenter="enter"
        @mouseleave="leave"
        :style="ulStyle" :class="isScroll ? '' : 'ulCenter'">
      <li v-for="(item, index) in evenDatas" :key="index"
          class="recommend-even"
          @click="bandLink(item.symbol)">
        <div class="symbol">{{ item.symbol | getCoinShowName(symbolAll)}}</div>
        <div class="rose" :class="item.roseCls">{{ item.price }}</div>
        <span class="rose-icon">
            <img v-if="item.roseVal.indexOf('+') > -1" src="../custom/img/0_icon_up.png" alt="">
            <img v-else src="../custom/img/0_icon_down.png" alt="">
        </span>

      </li>
    </ul>
  </section>
</template>

<script>
import commonMixin from 'BlockChain-ui/PC/common-mixin/home/recommend/recommend';
import mixin from 'BlockChain-ui/PC/common-mixin/home/recommend/bitwind/bitwind';
import 'BlockChain-ui/PC/common-mixin/home/recommend/bitwind/bitwind.styl';


export default {
  mixins: [commonMixin, mixin],
  mounted() {
    this.init();
  },
};
</script>
