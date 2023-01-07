<template>
  <section class="mark">
    <ul class="mark-ul clearfix" :class="isScroll ? '' : 'ulCenter'">
      <li class="market-item title-th">
        <div class="td-item td-item1 fuz-text">#</div>
        <div class="td-item td-item2 fuz-text">Name</div>
        <div class="td-item td-item3 fuz-text">Price</div>
        <div class="td-item td-item4 fuz-text">24H Change</div>
        <div class="td-item td-item-btn">Trade</div>
      </li>
      <template v-for="(item, index) in evenDatas">
        <li :key="index" class="market-item">
          <div class="td-item td-item1">{{index + 1}}</div>
          <div class="td-item td-item2">
            <span class='symbol-icon'>
              <img :src="getIcon(item)" alt=""/>
            </span>
            <span class="name fuz-text" v-html='getName(item)'></span>
          </div>
          <div class="td-item td-item3">
            <p class="price">
              <span class="fuz-text">{{item.price}}</span>
            </p>
          </div>
          <div class="td-item td-item4">
            <span class="rose-item" :class="getClass(item)">
              {{item.roseVal}}
              <img src='@/assets/fuzionx/images/icons/rise.svg' v-if='getClass(item) === "rise"'/>
              <img src='@/assets/fuzionx/images/icons/down.svg' v-if='getClass(item) === "down"'/>
            </span>
          </div>
          <div class="td-item td-item-btn">
            <c-button class='btn' @click="bandLink(item.symbol)">Trade</c-button>
          </div>
        </li>
      </template>
    </ul>
  </section>
</template>

<script>
import commonMixin from 'BlockChain-ui/PC/common-mixin/home/recommend/recommend';
import mixin from 'BlockChain-ui/PC/common-mixin/home/recommend/king/king';
import CoinMap from '@/components/fuzionx/utils';

export default {
  mixins: [commonMixin, mixin],
  mounted() {
    this.init();
  },
  methods: {
    getIcon(item) {
      const a = item.symbol.split('/')[0];
      return CoinMap[a] || this.symbolIcon(item);
    },
    getClass(item) {
      if (item.roseVal === '--') return '';
      return item.roseVal.startsWith('+') ? 'rise' : 'down';
    },
    getName(item) {
      const coinList = this.$store.state.baseData.market.coinList || {};
      const a = item.symbol.split('/')[0];
      const symbol = coinList[a];
      return symbol ? `<span>${symbol.showName}</span><span class='full'>(${symbol.longName || symbol.name})</span>` : '';
    },
  },
};
</script>
<style lang='stylus' scoped>
.td-item {
  height: 88px;
  align-items: center;
  display: flex;
}
.title-th .td-item {
  color:#7c8793;
}
.market-item {
  display:flex;
}
.td-item1 {
  width: 50px;
}
.td-item2 {
  width: 300px;
  color:#fff;
}
.td-item3 {
  flex: 1 1 auto;
  color:#fff;
}
.td-item4 {
  width: 200px;
}
.td-item-btn {
  flex: 0 0 auto;
  width: 100px;
}
.td-item-btn button{
  background: #000;
}
.td-item2 >>> .full {
  color: #ffffff80;
  margin-left: 3px;
}
.rose-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 144px;
  height: 44px;
  color: #fff;
  border-radius: 4px;
}
.rose-item img {
  margin-left: 20px;
}
.rose-item.rise {
  background: #00957b;
}
.rose-item.down {
  background: #e63946;
}
.symbol-icon {
  width: 44px;
  height: 44px;
  background: #1f1f1f;
  border-radius: 5px;
  display:flex;
  align-items:center;
  justify-content: center;
  margin-right:10px;
}
.symbol-icon img {
  width: 20px;
}
.btn {
  background: linear-gradient(138.1deg, #141414 1.63%, #111111 97.51%) !important;
}
</style>
