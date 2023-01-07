<!-- 币币交易 24小时行情 -->
<template>
    <div class="trade-market trade-market-index-container" :class="marketClass">
      <div class="market-header a-21-bg a-3-bd">
        <div class="search">
          <i class="icon-serach b-1-cl"
            @click="serachShrinkBlock">
            <svg class="icon icon-14" aria-hidden="true">
              <use xlink:href="#icon-a_12"></use>
            </svg>
          </i>
          <!-- 搜索 -->
          <c-inputFind
            :promptText="$t('trade.searchSy')"
            :value="listfilterVal"
            @onchanges="inputchanges"
            name="trade"
            ref="tradeFind"
            className="search-input"/>
        </div>
        <button
          @click="shrinkBlock"
          class="kg a-4-bg-h">
          <svg class="icon icon-14" aria-hidden="true">
            <use xlink:href="#icon-a_8"></use>
          </svg>
        </button>
        <div class="market-title-box">
          <div class="market-title-bar" ref="marketBar">
            <i
              class="slide-btn icon-left a-21-bg"
              :class="{'slide-btn-cur': parseFloat(slidePosition) < 0}"
              @click="slideMarket('left')">
                <svg class="icon icon-14 hover_hide" aria-hidden="true">
                  <use xlink:href="#icon-a_10_1"></use>
                </svg>
                <svg class="icon icon-14 hover_show" aria-hidden="true">
                  <use xlink:href="#icon-a_10"></use>
                </svg>
            </i>
            <ul class="market-title b-2-cl"
              :style="{left:slidePosition}"
              ref="marketUl">
              <li class="a-12-bd"
                  :class="{'selected b-1-cl':'myMarket' === marketCurrent}"
                  @click="switchMarket('myMarket')">
                  {{$t('trade.marketSet')}}
              </li>
              <li
                  v-for="(item, index) in marketList"
                  :key="index"
                  :class="{'selected b-1-cl': marketCurrent === item}"
                  @click="switchMarket(item)"
                  class="a-12-bd">{{item  | getCoinShowName(coinList)}}</li>
            </ul>
            <i
              class="slide-btn icon-right a-21-bg "
              :class="{'slide-btn-cur': maxPosition > 0
              && parseFloat(slidePosition) > -maxPosition}"
              @click="slideMarket('right')">
              <svg class="icon icon-14 hover_hide" aria-hidden="true">
                <use xlink:href="#icon-a_11_1"></use>
              </svg>
              <svg class="icon icon-14 hover_show" aria-hidden="true">
                <use xlink:href="#icon-a_11"></use>
              </svg>
            </i>
          </div>
        </div>
      </div>
      <div class="market-symbol a-6-bg">
        <div class="thead b-2-cl a-3-bd">
          <span class="td-symbol">
            <!-- 市场 -->
            {{$t('trade.market')}}
          </span>
          <span
            @click="sorteEvent('closes')"
            class="td-price">
            <!-- 最新价 -->
            {{$t('trade.close')}}
            <div
              :class="{selected: sortName === 'closes'}"
              class="sorte">
              <svg
                v-if="sortName === 'closes' && sortType === 'down'"
                class="icon icon-14"
                aria-hidden="true">
                <use xlink:href="#icon-a_17_1"></use>
              </svg>
              <svg
                v-else-if="sortName === 'closes' && sortType === 'up'"
                class="icon icon-14"
                aria-hidden="true">
                <use xlink:href="#icon-a_17_2"></use>
              </svg>
              <svg
                v-else
                class="icon icon-14"
                aria-hidden="true">
                <use xlink:href="#icon-a_17"></use>
              </svg>
            </div>
          </span>
          <span
            @click="sorteEvent('roses')"
            class="td-rose">
            <!-- 涨跌幅 -->
            {{$t('trade.applies')}}
            <div
              :class="{selected: sortName === 'roses'}"
              class="sorte">
              <svg
                v-if="sortName === 'roses' && sortType === 'down'"
                class="icon icon-14"
                aria-hidden="true">
                <use xlink:href="#icon-a_17_1"></use>
              </svg>
              <svg
                v-else-if="sortName === 'roses' && sortType === 'up'"
                class="icon icon-14"
                aria-hidden="true">
                <use xlink:href="#icon-a_17_2"></use>
              </svg>
              <svg
                v-else
                class="icon icon-14"
                aria-hidden="true">
                <use xlink:href="#icon-a_17"></use>
              </svg>
            </div>
          </span>
        </div>
        <div class="tbody" :class="showGridFlag ? 'grid_tbody' : ''">
          <template v-if="dataList.length">
            <vue-scroll>
              <!-- 减半区 -->
              <div
                v-if="(newcoinFlag || seecoinFlag || maincoinFlag)
                && halvecoinFlag && !listfilterVal"
                class="block-title a-3-bd b-2-cl">
                {{$t('trade.halving')}}
                <!-- 减半区 -->
              </div>
              <template v-for="(item, index) in dataList">
                <!-- <template v-if="cancelStoreSymbol.indexOf(item.name) === -1"> -->
                <div
                  class="symbol-item a-7-bg-h"
                  v-if="countSymbolItemState(item,3) && !unsealCountSymbolItemState(item)"

                  @click="switchSymbol(item.name)"
                  :key="index + 'new'"
                  :class="{'a-4-bg':item.name === symbolCurrent}">
                  <div class="bg a-4-bg"></div>
                  <span class="td-symbol b-1-cl"
                    :title="symbolTitle(item.symbol)">
                    <i
                      @click.stop="setMyMarket(item.name)"
                      class="iconMy">
                      <svg class="icon icon-16"
                      v-if="mySymbolList.indexOf(item.name) === -1"
                      aria-hidden="true">
                        <use xlink:href="#icon-c_11"></use>
                      </svg>
                      <svg class="icon icon-16"
                        v-else
                        aria-hidden="true">
                        <use xlink:href="#icon-c_11_1"></use>
                      </svg>
                    </i>
                    {{item.symbol.symbol | getCoinShowName(coinList)}}
                    <template v-if="marketCurrent === 'myMarket' || marketCurrent === 'ETF'">
                      /{{item.symbol.unit | getCoinShowName(coinList)}}
                    </template>
                    <span
                      class="st u-4-cl"
                      v-if="moduleType === 'ex' && item.IsST === 1 && marketCurrent !== 'myMarket'">
                      (ST)
                    </span>
                    <span class="multiple b-7-cl"
                      v-if="moduleType === 'lever' && marketCurrent !== 'myMarket'">
                      {{item.multiple}}x
                    </span>
                  </span>
                  <!-- 最新价 -->
                  <span class="td-price b-2-cl"
                    :class="item.close.class">
                    <b class="hover_hide" v-if="item.close.data === -999999">--</b>
                    <b class="hover_hide" v-else>{{item.close.data}}</b>
                    <b class="hover_show" v-if="item.close.price === -999999">--</b>
                    <b class="hover_show" v-else>{{item.close.price}}</b>
                  </span>
                  <!-- 涨跌幅 -->
                  <span class="td-rose b-2-cl" :class="item.rose.class">
                    <template v-if="item.rose.data === -999999">
                      --
                    </template>
                    <template v-else>
                      {{item.rose.data}}
                    </template>
                  </span>
                </div>
                <!-- </template> -->
              </template>
              <!-- 主区 -->
              <div
                v-if="(newcoinFlag || seecoinFlag || halvecoinFlag)
                && maincoinFlag && !listfilterVal"
                class="block-title a-3-bd b-2-cl">

                {{$t('trade.maincon')}}
              </div>
              <template v-for="(item, index) in dataList">
                <template v-if="cancelStoreSymbol.indexOf(item.name) === -1">
                <div
                  class="symbol-item a-7-bg-h"
                  v-if="countSymbolItemState(item,0) && !unsealCountSymbolItemState(item)"

                  @click="switchSymbol(item.name)"
                  :key="index"
                  :class="{'a-4-bg':item.name === symbolCurrent}">
                  <div class="bg a-4-bg"></div>
                  <span class="td-symbol b-1-cl"
                    :title="symbolTitle(item.symbol)">
                    <i
                      @click.stop="setMyMarket(item.name)"
                      class="iconMy">
                      <svg class="icon icon-16"
                      v-if="mySymbolList.indexOf(item.name) === -1"
                      aria-hidden="true">
                        <use xlink:href="#icon-c_11"></use>
                      </svg>
                      <svg class="icon icon-16"
                        v-else
                        aria-hidden="true">
                        <use xlink:href="#icon-c_11_1"></use>
                      </svg>
                    </i>
                    {{item.symbol.symbol | getCoinShowName(coinList)}}
                    <template v-if="marketCurrent === 'myMarket' || marketCurrent === 'ETF'">
                      /{{item.symbol.unit | getCoinShowName(coinList)}}
                    </template>
                    <span
                      class="st u-4-cl"
                      v-if="moduleType === 'ex' && item.IsST === 1 && marketCurrent !== 'myMarket'">
                      (ST)
                    </span>
                    <span class="multiple b-7-cl"
                      v-if="moduleType === 'lever' && marketCurrent !== 'myMarket'">
                      {{item.multiple}}x
                    </span>
                  </span>
                  <!-- 最新价 -->
                  <span class="td-price b-2-cl"
                    :class="item.close.class">
                    <b class="hover_hide" v-if="item.close.data === -999999">--</b>
                    <b class="hover_hide" v-else>{{item.close.data}}</b>
                    <b class="hover_show" v-if="item.close.price === -999999">--</b>
                    <b class="hover_show" v-else>{{item.close.price}}</b>
                  </span>
                  <!-- 涨跌幅 -->
                  <span class="td-rose b-2-cl" :class="item.rose.class">
                    <template v-if="item.rose.data === -999999">
                      --
                    </template>
                    <template v-else>
                      {{item.rose.data}}
                    </template>
                  </span>
                </div>
                </template>
              </template>
              <!-- 创新区 -->
              <div
                v-if="(newcoinFlag || seecoinFlag || halvecoinFlag)
                && newcoinFlag && !listfilterVal"
                class="block-title a-3-bd b-2-cl">

                {{$t('trade.newcon')}}
              </div>
              <template v-for="(item, index) in dataList">
                <div
                  class="symbol-item a-7-bg-h"
                  v-if="countSymbolItemState(item,1) && !unsealCountSymbolItemState(item)"
                  @click="switchSymbol(item.name)"
                  :key="index + 'new'"
                  :class="{'a-7-bg':item.name === symbolCurrent}">
                  <div class="bg a-4-bg"></div>
                  <span
                    :title="symbolTitle(item.symbol)"
                    class="td-symbol b-1-cl">
                    <i
                      @click.stop="setMyMarket(item.name)"
                      class="iconMy">
                      <svg class="icon icon-16"
                      v-if="mySymbolList.indexOf(item.name) === -1"
                      aria-hidden="true">
                        <use xlink:href="#icon-c_11"></use>
                      </svg>
                      <svg class="icon icon-16"
                        v-else
                        aria-hidden="true">
                        <use xlink:href="#icon-c_11_1"></use>
                      </svg>
                    </i>
                    {{item.symbol.symbol | getCoinShowName(coinList)}}
                    <template v-if="marketCurrent === 'myMarket' || marketCurrent === 'ETF'">
                      /{{item.symbol.unit | getCoinShowName(coinList)}}
                    </template>
                    <span class="st u-4-cl"
                      v-if="moduleType === 'ex' && item.IsST === 1 && marketCurrent !== 'myMarket'">
                      (ST)
                    </span>
                    <span class="multiple b-7-cl"
                      v-if="moduleType === 'lever' && marketCurrent !== 'myMarket'">
                      {{item.multiple}}x
                    </span>
                  </span>
                  <!-- 最新价 -->
                  <span class="td-price b-2-cl"
                    :class="item.close.class">
                    <b class="hover_hide" v-if="item.close.data === -999999">--</b>
                    <b class="hover_hide" v-else>{{item.close.data}}</b>
                    <b class="hover_show" v-if="item.close.price === -999999">--</b>
                    <b class="hover_show" v-else>{{item.close.price}}</b>
                  </span>
                  <!-- 涨跌幅 -->
                  <span class="td-rose b-1-cl" :class="item.rose.class">
                    <template v-if="item.rose.data === -999999">
                      --
                    </template>
                    <template v-else>
                      {{item.rose.data}}
                    </template>
                  </span>
                </div>
              </template>
              <!-- 观察区 -->
              <div
                v-if="(maincoinFlag || newcoinFlag || halvecoinFlag)
                && seecoinFlag && !listfilterVal"
                class="block-title a-3-bd b-2-cl">
                {{$t('trade.seecon')}}
              </div>
              <template v-for="(item, index) in dataList">
                <div
                  class="symbol-item a-7-bg-h"
                  v-if="countSymbolItemState(item,2) && !unsealCountSymbolItemState(item)"
                  @click="switchSymbol(item.name)"
                  :key="index + 'new'"
                  :class="{'a-7-bg':item.name === symbolCurrent}">
                  <div class="bg a-4-bg"></div>
                  <span
                    :title="symbolTitle(item.symbol)"
                    class="td-symbol b-1-cl">
                    <i
                      @click.stop="setMyMarket(item.name)"
                      class="iconMy">
                      <svg class="icon icon-16"
                      v-if="mySymbolList.indexOf(item.name) === -1"
                      aria-hidden="true">
                        <use xlink:href="#icon-c_11"></use>
                      </svg>
                      <svg class="icon icon-16"
                        v-else
                        aria-hidden="true">
                        <use xlink:href="#icon-c_11_1"></use>
                      </svg>
                    </i>
                    {{item.symbol.symbol | getCoinShowName(coinList)}}
                    <template v-if="marketCurrent === 'myMarket' || marketCurrent === 'ETF'">
                      /{{item.symbol.unit | getCoinShowName(coinList)}}
                    </template>
                    <span class="st u-4-cl"
                      v-if="moduleType === 'ex' && item.IsST === 1 && marketCurrent !== 'myMarket'">
                      (ST)
                    </span>
                    <span class="multiple b-7-cl"
                      v-if="moduleType === 'lever' && marketCurrent !== 'myMarket'">
                      {{item.multiple}}x
                    </span>
                  </span>
                  <!-- 最新价 -->
                  <span class="td-price b-2-cl"
                    :class="item.close.class">
                    <b class="hover_hide" v-if="item.close.data === -999999">--</b>
                    <b class="hover_hide" v-else>{{item.close.data}}</b>
                    <b class="hover_show" v-if="item.close.price === -999999">--</b>
                    <b class="hover_show" v-else>{{item.close.price}}</b>
                  </span>
                  <!-- 涨跌幅 -->
                  <span class="td-rose b-1-cl" :class="item.rose.class">
                    <template v-if="item.rose.data === -999999">
                      --
                    </template>
                    <template v-else>
                      {{item.rose.data}}
                    </template>
                  </span>
                </div>
              </template>
              <!-- 解封区 -->
               <div
                v-if="(maincoinFlag || seecoinFlag  || halvecoinFlag)
                && unsealcoinFlag && !listfilterVal"
                class="block-title a-3-bd b-2-cl">
                <!-- 解封区 -->
                {{$t('trade.unseal')}}
              </div>
              <template v-for="(item, index) in dataList">
                <div
                  class="symbol-item a-7-bg-h"
                  v-if="unsealCountSymbolItemState(item)"
                  @click="switchSymbol(item.name)"
                  :key="index + 'new'"
                  :class="{'a-7-bg':item.name === symbolCurrent}">
                  <div class="bg a-4-bg"></div>
                  <span
                    :title="symbolTitle(item.symbol)"
                    class="td-symbol b-1-cl">
                    <i
                      @click.stop="setMyMarket(item.name)"
                      class="iconMy">
                      <svg class="icon icon-16"
                      v-if="mySymbolList.indexOf(item.name) === -1"
                      aria-hidden="true">
                        <use xlink:href="#icon-c_11"></use>
                      </svg>
                      <svg class="icon icon-16"
                        v-else
                        aria-hidden="true">
                        <use xlink:href="#icon-c_11_1"></use>
                      </svg>
                    </i>
                    {{item.symbol.symbol | getCoinShowName(coinList)}}
                    <template v-if="marketCurrent === 'myMarket' || marketCurrent === 'ETF'">
                      /{{item.symbol.unit | getCoinShowName(coinList)}}
                    </template>
                    <span class="st u-4-cl"
                      v-if="moduleType === 'ex' && item.IsST === 1 && marketCurrent !== 'myMarket'">
                      (ST)
                    </span>
                    <span class="multiple b-7-cl"
                      v-if="moduleType === 'lever' && marketCurrent !== 'myMarket'">
                      {{item.multiple}}x
                    </span>
                  </span>
                  <!-- 最新价 -->
                  <span class="td-price b-2-cl"
                    :class="item.close.class">
                    <b class="hover_hide" v-if="item.close.data === -999999">--</b>
                    <b class="hover_hide" v-else>{{item.close.data}}</b>
                    <b class="hover_show" v-if="item.close.price === -999999">--</b>
                    <b class="hover_show" v-else>{{item.close.price}}</b>
                  </span>
                  <!-- 涨跌幅 -->
                  <span class="td-rose b-1-cl" :class="item.rose.class">
                    <template v-if="item.rose.data === -999999">
                      --
                    </template>
                    <template v-else>
                      {{item.rose.data}}
                    </template>
                  </span>
                </div>
              </template>
            </vue-scroll>
          </template>
          <!-- 暂无数据 -->
          <div v-else class="not-data">
            <svg class="icon icon-50" aria-hidden="true">
              <use xlink:href="#icon-g_2"></use>
            </svg>
            <p>
              <!-- 暂无数据 -->
              {{$t('trade.notData')}}
            </p>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/modules/trade/market/market';
import 'BlockChain-ui/PC/common-mixin/modules/trade/market/market.styl';

export default {
  mixins: [mixin],
  props: {
    showGridFlag: {
      default: false,
      type: Boolean,
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
  .trade-market-index-container.trade-market .market-symbol .grid_tbody {
    height: 723px;
  }
  .en_US .trade-market-index-container.trade-market .market-symbol .grid_tbody {
    height: 735px;
  }
</style>
