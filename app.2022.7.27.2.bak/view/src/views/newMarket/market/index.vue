<template>
  <div class="v5Market-container">
    <div class="v5Market-content" >
      <h2 class="v5Market-title fuz-title" style="padding-left: 0;">
        {{$t('header.market')}}
      </h2>
      <div class="v5Market-screen" style="margin:60px 0 70px;">
        <ul class="v5Market-options" style="padding-left: 0;">
          <!-- 自选 -->
          <li
            class="option-item mod-li"
            :class="{'mod-li-active': hoverOption === 'optional' || activeOption === 'optional'}"
            @mouseenter="handleOptionEnter('optional')"
            @mouseleave="handleOptionLeave"
            @click="handleClickOption('optional')">
            <svg
              v-if="hoverOption === 'optional' || activeOption === 'optional'"
              class="icon icon-14"
              aria-hidden="true">
              <use xlink:href="#icon-v5_15_s"></use>
            </svg>
            <svg
              v-else
              class="icon icon-14"
              aria-hidden="true">
              <use xlink:href="#icon-v5_15"></use>
            </svg>
            <span>{{$t('home.marketSet')}}</span>
          </li>
          <!-- 现货 -->
          <li
            class="option-item mod-li"
            :class="{'mod-li-active': hoverOption === 'spot' || activeOption === 'spot'}"
            @mouseenter="handleOptionEnter('spot')"
            @mouseleave="handleOptionLeave"
            @click="handleClickOption('spot')">
            <span>{{$t('trade5.tradeType1')}}</span>
          </li>
        </ul>
        <!-- 搜索 -->
        <div
          class="v5Market-search"
          :class="{'v5-1-bd': isSearchFocus, 'v5-11-bd': !isSearchFocus}"
          @mouseover="isSearchFocus = true"
          @mouseout="isSearchFocus = false">
          <svg class="icon icon-14" aria-hidden="true">
            <use xlink:href="#icon-v5_16"></use>
          </svg>
          <input
            v-model="listfilter"
            @focus="isSearchFocus = true"
            @blur="isSearchFocus = false"
            class="v5-5-cl"
            type="text"
            :placeholder="$t('home.searchSy')">
        </div>
      </div>
      <div class="v5Market-tab">
        <ul class="v5Market-tabList">
          <!-- 全部 -->
          <li
            class="v5Market-tabItem mod-li"
            :class="{ 'mod-li-active': marketSelect === 'all' || marketHover === 'all'  }"
            @click="switchMarket('all')"
            @mouseenter="handleMarketTabEnter('all')"
            @mouseleave="handleMarketTabLeave"
          >
            {{$t('market.allMarket')}}
          </li>
          <!-- 币种市场 -->
          <li
            v-for="(item, index) in marketAllList"
            :key="index"
            class="v5Market-tabItem mod-li"
            :class="{ 'mod-li-active': marketSelect === item || marketHover === item  }"
            @click="switchMarket(item)"
            @mouseenter="handleMarketTabEnter(item)"
            @mouseleave="handleMarketTabLeave"
          >{{item | getCoinShowName(coinList)}}</li>
        </ul>
      </div>
      <!-- 市场数据 -->
      <div class="v5Market-table">
        <ul class="table-thead mod-bd">
          <li
            v-for="(item, index) in columns"
            :key="index"
            class="th"
            style="color:#7D7D7D;"
            @click="sort(item)">
            <span>{{item.title}}</span>
            <svg v-if="item.sortable" aria-hidden="true" class="icon icon-12">
              <use xlink :href="item.key | sortIcon(sortValue, sortSell)"></use>
            </svg>
          </li>
        </ul>
        <div class="home-loading" v-if="tableLoading">
          <div class="loading-page">
            <c-loading size="45"/>
          </div>
        </div>
        <div class="home-nodata" v-else-if="!tableData.length">
          <svg class="icon icon-50" aria-hidden="true">
            <use xlink:href="#icon-g_2"></use>
          </svg>
          <p>
            <!-- 暂无数据 -->
            {{$t('common.notData')}}
          </p>
        </div>
        <section v-else class="table-tbody v5-5-cl">
          <vue-scroll :ops="ops">
            <div
              class="tr mod-tr-h mod-bd"
              v-for="(item, index) in tableData"
              :key="index"
              @mouseenter="symbolHover = index"
              @mouseleave="symbolHover = null">
              <ul class="symbol-detail">
                <li class="td symbol" @click.stop="marketClick(item.id)">
                  <i v-html="item.iconSvg"></i>
                  <span class="symbol-name">{{item.showName}}</span>
                  <span v-if="item.coinLabel"
                    class="symbol-coinLabel v5-1-bd v5-1-cl">{{item.coinLabel}}</span>
                </li>
                <li class="td latestPrice">
                  <span :class="{
                    'u-1-cl':(item.latestPrice).replace(/,/g, '')>0,
                    'u-4-cl':(item.latestPrice).replace(/,/g, '')<0
                  }">{{item.latestPrice}}</span>
                  <span class="v5-6-cl">/{{item.latestSub}}</span>
                </li>
                <li class="td increase" :class="item.increaseClass">{{item.increase}}</li>
                <li class="td highestPrice">{{item.highestPrice}}</li>
                <li class="td lowestPrice">{{item.lowestPrice}}</li>
                <li class="td volume">{{item.volume}}</li>
                <li class="td operate">
                  <fuz-button class="mod-btn" width="80" @click="bandLink(item.id)">
                    {{$t('home.trade')}}
                  </fuz-button>
                </li>
              </ul>
              <div class="tr-bg v5-14-bg" v-show="symbolHover === index"></div>
            </div>
          </vue-scroll>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/newMarket/market/index';
import 'BlockChain-ui/PC/common-mixin/newMarket/market/index.styl';

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
.mod-tr-h{
  height:87px !important;
}
.mod-li{
  border: 1px solid #414141;
  border-radius: 4px;
  color: #7D7D7D;
  height:32px;
  line-height:32px;
  margin-right:20px
}
.mod-bd{
  border-width: 1px 0px;
  border-style: solid;
  border-color: #414141;
}
.mod-btn{
  height: 40px !important;
  border-radius: 4px;
  font-size: 14px;
}
.mod-li-active{
  background: rgba(40, 94, 246, 0.2);
  border: 1px solid #285EF6;
  color: #285EF6;
}

</style>
