<template>
  <section class="recommend">
    <ul class="recommend-ul">
      <template v-for="(item, index) in evenDatas">
        <li :key="index"
            v-if="index < 4"
            class="recommend-item fuz-split"
        >
          <div class="box">
            <span class="symbol-icon">
              <img :src="getIcon(item)" alt="">
            </span>
            <div class="symbol-name fuz-text">
              <span class="b-cion">{{setSymbol(item.symbol, 'q')}}</span>
              <span class="q-cion">{{setSymbol(item.symbol, 'b')}}</span>
            </div>
            <div class="recommend-price  fuz-text">{{ item.price }}</div>
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
  },
};
</script>
<style lang="stylus" scoped>
.recommend-ul {
  display:grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 25px 0;
}
.recommend-item {
  padding: 0 12px;
}
.recommend-item .box{
  display:flex;
  padding:10px;
  padding-left: 120px;
  position: relative;
  flex-direction: column;
  justify-content: center;
  height: 130px;
  transition: 0.3;
}

.symbol-icon {
  position: absolute;
  left: 25px;
  top: calc(50% - 40px);
  width: 80px;
  height: 80px;
  background: #1f1f1f;
  border-radius: 10px;
  display:flex;
  align-items:center;
  justify-content: center;
}

.symbol-icon img{
  width: 40px;
  margin:0;
}
.symbol-name {
  line-height: 1.5;
  font-size: 20px;
  color: #fff;
  margin-top: 5px;
  white-space nowrap
}
.recommend-price {
  font-size:16px;
  color:rgba(255,255,255,0.5)
}
.recommend-item .box:hover{
  background: #4056D8;
  box-shadow: 0px 10px 40px rgba(17, 23, 46, 0.25);
  border-radius: 12px;
  .symbol-icon {
    background:#1F1F1F;
  }
}
</style>
