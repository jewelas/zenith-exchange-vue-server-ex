<template>
  <div class="v5-market_recommend" v-if="recommendDataList.length > 0">
    <ul class="recommend-list">
      <li
        class="recommend-item fuz-card-plain mod-card"
        v-for="(item, index) in recommendDataList"
        :key="index">
        <div class="symbol-name">
          <span class="icon-name v5-5-cl">
            <img :src="item.icon" alt="">
            {{item.showName}}
          </span>
          <span class="change" :class="item.icreaseClass">{{item.increase}}</span>
        </div>
        <div class="symbol-price">
          <b class="coin-price v5-5-cl">{{item.latestPrice}}</b>
          <span class="fait-price v5-6-cl">{{item.latestSub}}</span>
        </div>
        <div class="symbol-vol mod-vol">
          <span class="vol-num">24H Vol  {{item.volume}}</span>
          <!-- <span class="icon-button hoverHide">
            <svg class='icon icon-16' aria-hidden='true'>
              <use xlink:href="#icon-v5_14"></use>
            </svg>
          </span>
          <span class="icon-button hoverShow">
            <svg class='icon icon-16' aria-hidden='true'>
              <use xlink:href="#icon-v5_14_h"></use>
            </svg>
          </span> -->
          <fuz-button class="mod-btn" width="80" @click="toTrade(item)">Buy</fuz-button>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/newMarket/recommend/index';
import 'BlockChain-ui/PC/common-mixin/newMarket/recommend/index.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>

<style lang="stylus" scoped>
/deep/ .fuz-button > *{
  line-height: 40px;
}
/deep/ .recommend-list{
  padding: 0
}
/deep/ .recommend-item{
  cursor: default !important;
}
.mod-btn{
  height: 40px !important;
  border-radius: 4px;
  font-size: 14px;
}
.mod-vol{
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #FFF;
}
.mod-card{
  width: 305px !important;
  height: 163px !important;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
