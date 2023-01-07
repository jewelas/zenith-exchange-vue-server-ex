<!-- 币币交易 24小时行情 -->
<template>
    <div class="newTrade-market newTrade-market-index-container" :class="marketClass">
      <div class="market-header a-21-bg a-3-bd">
        <div @click="getFocus" class="search">
          <!-- 搜索 -->
          <c-inputFind
            :promptText="$t('trade.searchSy')"
            :value="listfilterVal"
            @onchanges="inputchanges"
            @focus="isSearchFocus = true"
            @blur="isSearchFocus = false"
            name="marketSearch"
            ref="tradeFind"
            :class="'a-4-bg a-4-bd'"
            className="search-input"/>
        </div>
        <!-- <button
          @click="shrinkBlock"
          class="kg a-4-bg-h">
          <svg class="icon icon-14" aria-hidden="true">
            <use xlink:href="#icon-a_8"></use>
          </svg>
        </button> -->
        <div class="market-title-box">
          <div class="market-title-bar" ref="marketBar">
            <!-- <i
              class="slide-btn icon-left a-21-bg"
              :class="{'slide-btn-cur': parseFloat(slidePosition) < 0}"
              @click="slideMarket('left')">
                <svg class="icon icon-14 hover_hide" aria-hidden="true">
                  <use xlink:href="#icon-a_10_1"></use>
                </svg>
                <svg class="icon icon-14 hover_show" aria-hidden="true">
                  <use xlink:href="#icon-a_10"></use>
                </svg>
            </i> -->
            <ul
              class="market-title b-2-cl"
              :class="{ 'disabled': listfilterVal}"
              ref="marketUl">
              <li
                class="market-item"
                ref="tab-0"
                @mouseover="handleMouseover(0)"
                @mouseout="handleMouseout"
                :class="{'selected b-1-cl':'myMarket' === marketCurrent,
                  'b-1-cl': hoverIndex === 0}"
                @click="switchMarket('myMarket', 0)">
                {{$t('trade.marketSet')}}
              </li>
              <li
                class="market-item"
                v-for="(item, index) in showMarketList"
                :key="index"
                :ref="'tab-' + (index + 1)"
                @mouseover="handleMouseover(index + 1)"
                @mouseout="handleMouseout"
                :class="{'selected b-1-cl': marketCurrent === item,
                  'b-1-cl': hoverIndex === index + 1}"
                @click="switchMarket(item, index + 1)"
              >{{item  | getCoinShowName(coinList)}}</li>
              <li
                v-if="marketList.length > 4"
                class="market-item"
                ref="tab-4"
                @click="setTabStyle(4)"
              >
                <span v-if="listfilterVal">{{
                  (marketSelect || marketList[3]) | getCoinShowName(coinList)
                }}</span>
                <Select
                  v-else
                  :value="marketSelect || marketList[3]"
                  :options="marketOptions"
                  @onChanges="marketChange"
                />
              </li>
              <li
                v-show="!listfilterVal"
                class="underline a-12-bg"
                :style="underlineStyle"></li>
            </ul>
            <!-- <i
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
            </i> -->
          </div>
        </div>
      </div>
      <div class="market-symbol a-6-bg">
        <div class="thead b-2-cl a-3-bd">
          <span
            @click="sorteEvent('market')"
            class="td-symbol">
            <!-- 市场 -->
            {{$t('trade.market')}}
             <div
              :class="{selected: sortName === 'market'}"
              class="sorte">
              <svg
                v-if="sortName === 'market' && sortType === 'down'"
                class="icon icon-12"
                aria-hidden="true">
                <use xlink:href="#icon-v5_13"></use>
              </svg>
              <svg
                v-else-if="sortName === 'market' && sortType === 'up'"
                class="icon icon-12"
                aria-hidden="true">
                <use xlink:href="#icon-v5_12"></use>
              </svg>
              <svg
                v-else
                class="icon icon-12"
                aria-hidden="true">
                <use xlink:href="#icon-v5_11"></use>
              </svg>
            </div>
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
                class="icon icon-12"
                aria-hidden="true">
                <use xlink:href="#icon-v5_13"></use>
              </svg>
              <svg
                v-else-if="sortName === 'closes' && sortType === 'up'"
                class="icon icon-12"
                aria-hidden="true">
                <use xlink:href="#icon-v5_12"></use>
              </svg>
              <svg
                v-else
                class="icon icon-12"
                aria-hidden="true">
                <use xlink:href="#icon-v5_11"></use>
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
                class="icon icon-12"
                aria-hidden="true">
                <use xlink:href="#icon-v5_13"></use>
              </svg>
              <svg
                v-else-if="sortName === 'roses' && sortType === 'up'"
                class="icon icon-12"
                aria-hidden="true">
                <use xlink:href="#icon-v5_12"></use>
              </svg>
              <svg
                v-else
                class="icon icon-12"
                aria-hidden="true">
                <use xlink:href="#icon-v5_11"></use>
              </svg>
            </div>
          </span>
        </div>
        <div class="tbody">
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
                      <svg class="icon icon-12"
                      v-if="mySymbolList.indexOf(item.name) === -1"
                      aria-hidden="true">
                        <use xlink:href="#icon-c_11"></use>
                      </svg>
                      <svg class="icon icon-12"
                        v-else
                        aria-hidden="true">
                        <use xlink:href="#icon-c_11_1"></use>
                      </svg>
                    </i>
                    {{item.symbol.symbol | getCoinShowName(coinList)}}
                    <template>
                      <span class="f-2-cl">
                        /{{item.symbol.unit | getCoinShowName(coinList)}}
                      </span>
                    </template>
                    <span
                      class="st u-4-cl"
                      v-if="moduleType === 'ex' && item.IsST === 1 && marketCurrent !== 'myMarket'">
                      (ST)
                    </span>
                    <span class="multiple b-4-cl b-4-bd"
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
                      <svg class="icon icon-12"
                      v-if="mySymbolList.indexOf(item.name) === -1"
                      aria-hidden="true">
                        <use xlink:href="#icon-c_11"></use>
                      </svg>
                      <svg class="icon icon-12"
                        v-else
                        aria-hidden="true">
                        <use xlink:href="#icon-c_11_1"></use>
                      </svg>
                    </i>
                    {{item.symbol.symbol | getCoinShowName(coinList)}}
                    <template>
                      <span class="f-2-cl">
                        /{{item.symbol.unit | getCoinShowName(coinList)}}
                      </span>
                    </template>
                    <span
                      class="st u-4-cl"
                      v-if="moduleType === 'ex' && item.IsST === 1 && marketCurrent !== 'myMarket'">
                      (ST)
                    </span>
                    <span class="multiple b-4-cl b-4-bd"
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
                      <svg class="icon icon-12"
                      v-if="mySymbolList.indexOf(item.name) === -1"
                      aria-hidden="true">
                        <use xlink:href="#icon-c_11"></use>
                      </svg>
                      <svg class="icon icon-12"
                        v-else
                        aria-hidden="true">
                        <use xlink:href="#icon-c_11_1"></use>
                      </svg>
                    </i>
                    {{item.symbol.symbol | getCoinShowName(coinList)}}
                    <template>
                      <span class="f-2-cl">
                        /{{item.symbol.unit | getCoinShowName(coinList)}}
                      </span>
                    </template>
                    <span class="st u-4-cl"
                      v-if="moduleType === 'ex' && item.IsST === 1 && marketCurrent !== 'myMarket'">
                      (ST)
                    </span>
                    <span class="multiple b-4-cl b-4-bd"
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
                      <svg class="icon icon-12"
                      v-if="mySymbolList.indexOf(item.name) === -1"
                      aria-hidden="true">
                        <use xlink:href="#icon-c_11"></use>
                      </svg>
                      <svg class="icon icon-12"
                        v-else
                        aria-hidden="true">
                        <use xlink:href="#icon-c_11_1"></use>
                      </svg>
                    </i>
                    {{item.symbol.symbol | getCoinShowName(coinList)}}
                    <template>
                      <span class="f-2-cl">
                        /{{item.symbol.unit | getCoinShowName(coinList)}}
                      </span>
                    </template>
                    <span class="st u-4-cl"
                      v-if="moduleType === 'ex' && item.IsST === 1 && marketCurrent !== 'myMarket'">
                      (ST)
                    </span>
                    <span class="multiple b-4-cl b-4-bd"
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
                      <svg class="icon icon-12"
                      v-if="mySymbolList.indexOf(item.name) === -1"
                      aria-hidden="true">
                        <use xlink:href="#icon-c_11"></use>
                      </svg>
                      <svg class="icon icon-12"
                        v-else
                        aria-hidden="true">
                        <use xlink:href="#icon-c_11_1"></use>
                      </svg>
                    </i>
                    {{item.symbol.symbol | getCoinShowName(coinList)}}
                    <template>
                      <span class="f-2-cl">
                        /{{item.symbol.unit | getCoinShowName(coinList)}}
                      </span>
                    </template>
                    <span class="st u-4-cl"
                      v-if="moduleType === 'ex' && item.IsST === 1 && marketCurrent !== 'myMarket'">
                      (ST)
                    </span>
                    <span class="multiple b-4-cl b-4-bd"
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
            <p v-if="listfilterVal">
              <!-- 暂无数据 -->
              {{$t('trade5.noResult')}}
            </p>
            <p v-else>
              <!-- 暂无数据 -->
              {{$t('common.notData')}}
            </p>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/modules/newTrade/market/market';
import 'BlockChain-ui/PC/common-mixin/modules/newTrade/market/market.styl';
import Select from '@/components/modules/newTrade/select/index.vue';

export default {
  mixins: [mixin],
  props: {
    showGridFlag: {
      default: false,
      type: Boolean,
    },
  },
  components: {
    Select,
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
