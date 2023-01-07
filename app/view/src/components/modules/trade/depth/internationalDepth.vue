<!-- 币币交易 盘口 -->
<template>
  <div class="ex-depth-block ex-depth-block-container">
    <div class="scroll-cont">
      <div class="depth" ref="depthBox">
        <div class="block-header a-3-bd a-21-bg b-2-cl">
          <span class="h4 b-1-cl">
            <!-- 盘口 -->
            {{$t('trade.handicap')}}
          </span>
          <span
            class="title-tab a-12-bd"
            @click="switchBlock('D')"
            :class="{'selected b-1-cl' : shrinksDdpthNewShow === 'D'}"
          >
            <!-- 盘口 -->
            {{$t('trade.handicap')}}
          </span>
          <span
            class="title-tab title-new-tab a-12-bd"
            @click="switchBlock('T')"
            :class="{'selected b-1-cl' : shrinksDdpthNewShow === 'T'}"
          >
            <!-- 实时成交 -->
            {{$t('trade.latestDeal')}}
          </span>
          <div class="switch-btn">
            <i class="dtIcon" @click="switchDepthType('center')">
              <svg class="icon icon-14" aria-hidden="true">
                <use xlink:href="#icon-a_5"></use>
              </svg>
            </i>
            <i class="dtIcon" @click="switchDepthType('sell')">
              <svg class="icon icon-14" aria-hidden="true">
                <use xlink:href="#icon-a_7"></use>
              </svg>
            </i>
            <i class="dtIcon" @click="switchDepthType('buy')">
              <svg class="icon icon-14" aria-hidden="true">
                <use xlink:href="#icon-a_6"></use>
              </svg>
            </i>
          </div>
        </div>
        <div :class="{'is-show': shrinksDdpthNewShow === 'D'}" class="block-content a-6-bg">
          <tableList
            type="asks"
            :theadList="theadList"
            :dataList="dataList.asksData"
            :maxValue="dataList.depthMaxNumber"
            :cellWidth="cellWidth"
            :lineNumber="sellLineNumber"
            :bodyHeight="sellHeight"
          />
          <div class="current-price a-21-bg">
            <div class="price b-1-cl" :class="getShowEtf(symbolCurrent) ? 'etfPriceClass' : ''">
              <span
                class="sy-price"
                v-if="symbolsData.close.data !== '--'"
                :class="symbolsData.close.class"
              >{{symbolsData.close.data}}</span>
              <span
                v-if="symbolsData.close.price !== '--'"
                class="otc-price b-2-cl"
              >≈ {{symbolsData.close.price}}</span>
            </div>
            <div v-if="getShowEtf(symbolCurrent)"
              class="eftJz">
              <div class="eftJz-title">
                <svg class="icon icon-14 eft-box-icon" aria-hidden="true">
                  <use xlink:href="#icon-a_15"></use>
                </svg>
                {{$t('etfAdd.jz')}}
              </div>
              <div class="eftJz-value b-1-cl">
                {{etfPrice}}
              </div>
            </div>
            <div class="market-show a-4-bg b-1-cl"
              :style="depthType === 'sell' ? 'bottom: 40px' : 'top: 40px;'">
              <div>{{$t('etfAdd.jzText1')}}</div>
              <div>{{$t('etfAdd.jzText2')}}</div>
            </div>
            <div class="depth-type">
              <span class="num b-1-cl">{{deptValue}}</span>
              <span class="switch-type-btn b-2-cl b-1-bd">
                <i
                  :class="{'noclick': currentdepthClass <= 0}"
                  @click="switchDepth(-1)"
                  class="icon-switch icon-minus"
                >
                  <svg class="icon icon-14 hoverHide" aria-hidden="true">
                    <use xlink:href="#icon-a_2"></use>
                  </svg>
                  <svg class="icon icon-14 hoverShow" aria-hidden="true">
                    <use xlink:href="#icon-a_2_1"></use>
                  </svg>
                </i>
                <i
                  :class="{'noclick': currentdepthClass >= depthOption.length - 1}"
                  @click="switchDepth(1)"
                  class="icon-switch icon-add"
                >
                  <svg class="icon icon-14 hoverHide" aria-hidden="true">
                    <use xlink:href="#icon-a_3"></use>
                  </svg>
                  <svg class="icon icon-14 hoverShow" aria-hidden="true">
                    <use xlink:href="#icon-a_3_1"></use>
                  </svg>
                </i>
              </span>
            </div>
          </div>
          <tableList
            type="buy"
            :dataList="dataList.buyData"
            :maxValue="dataList.depthMaxNumber"
            :lineNumber="buyLineNumber"
            :cellWidth="cellWidth"
            :bodyHeight="buyHeight"
          />
        </div>
      </div>
      <!-- 实时成交 -->
      <div class="new-tradb" :class="{'is-show': shrinksDdpthNewShow === 'T'}">
        <new-trade/>
      </div>
    </div>
    <div class="total-assets a-21-bg" v-if="!proTrade">
      <p class="priceUser">
        <span class="lov" style="line-height: 17px">
          {{$t('gridTrade.setText1')}}:
          <span class="lovText mr-text b-1-cl" style="margin-left:5px">
            {{totalBalancesHide ? '******' : currenTaccount.unitsAccoubt}}
            {{symbolUnit.units | getCoinShowName(coinList)}}
          </span>
          <span class="lovText">
            {{totalBalancesHide ? '******' : currenTaccount.symbolAccoubt}}
            {{symbolUnit.symbol | getCoinShowName(coinList)}}
          </span>
        </span>
      </p>
      <!-- {{$t('trade.total_money')}}
      <span class="total-money b-1-cl">
        <template v-if="totalBalancesHide">******</template>
        <template v-else>{{accountBalance.totalBalance}}</template>
        {{accountBalance.totalBalanceSymbol | getCoinShowName(coinList)}}
      </span>
      <span class="math">≈</span>
      <span class="b-3-cl">
        <template v-if="totalBalancesHide">******</template>
        <template v-else>{{totalBalances.totalRater}}</template>
      </span> -->
      <span class="totalBalancesHide">
        <i class="icon" @click="handelTotal">
          <svg class="icon icon-16" aria-hidden="true" v-if="!totalBalancesHide">
            <use xlink:href="#icon-c_9"></use>
          </svg>
          <svg class="icon icon-16" v-else aria-hidden="true">
            <use xlink:href="#icon-c_10"></use>
          </svg>
        </i>
      </span>
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/modules/trade/depath/index';
import 'BlockChain-ui/PC/common-mixin/modules/trade/depath/internationalDepth/internationalDepth.styl';
import tableList from '@/components/modules/trade/tableList/index.vue';
// 实时成交
import newTrade from '@/components/modules/trade/newTrade/index.vue';

export default {
  mixins: [mixin],
  props: {
    proTrade: {
      default: false,
      type: Boolean,
    },
  },
  components: {
    tableList,
    newTrade,
  },
  mounted() {
    this.init();
  },
};
</script>
<style >
  .pro-trade .set-type {
    margin-bottom: 20px;
  }
  .total-assets .priceUser {
    display: flex;
    height: 100%;
    align-items: center;
    float: left;
  }
  .priceUser .lov {
    line-height: 17px;
    max-width: 270px;
    display: inline-block;
    word-wrap: break-word;
    word-break: normal;
    overflow: hidden;
  }
</style>
