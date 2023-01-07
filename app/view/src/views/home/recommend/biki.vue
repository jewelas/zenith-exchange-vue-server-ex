<template>
  <section class="inter-recommend recommend-biki-contianer c-5-bd">
    <ul class="recommend-ul clearfix ulCenter a-2-bd">
      <template v-for="(item, index) in evenDatas">
        <li v-if="index < 4" :key="index"
          class="recommend-even" @click="bandLink(item.symbol)">
          <div class="bl a-2-bg"></div>
          <div class="symbol">{{ item.symbol | getCoinShowName(symbolAll)}}</div>
          <div class="price b-1-cl" :class="item.roseCls">
            {{ item.price }}<span>{{item.text}}</span>
          </div>
          <div class="rose" :class="item.roseCls">{{ item.roseVal }}</div>
        </li>
      </template>
    </ul>
  </section>
</template>

<script>
import commonMixin from 'BlockChain-ui/PC/common-mixin/home/recommend/recommend';
import mixin from 'BlockChain-ui/PC/common-mixin/home/recommend/biki/biki';
import 'BlockChain-ui/PC/common-mixin/home/recommend/biki/biki.styl';

export default {
  mixins: [commonMixin, mixin],
  mounted() {
    this.init();
  },
};
</script>
