<!-- 币币交易 盘口 -->
<template>
  <div class="newTrade-depth-block depath-index-container" :class="depthClass">
    <div
      class="depth"
      :class="{'gridFix': gridFix}"
      ref="depthBox">
      <div class="block-header a-4-bg b-2-cl">
        <h4 class="h4 b-1-cl">
          <!-- 盘口 -->
          {{ $t("trade.handicap") }}
        </h4>
        <div class="depth-viewSetting">
          <div class="switch-btn">
            <span
              class="dtIcon"
              @mouseenter="addActive('center')"
              @mouseleave="removeActive('center')"
              @click="switchDepthType('center')">
              <svg
                v-if="depthType === 'center' || !depthType || hoverType === 'center'"
                class="icon icon-14 hoverHide" aria-hidden="true">
                <use xlink:href="#icon-v5_21_h"></use>
              </svg>
              <svg
                v-else
                class="icon icon-14 hoverHide" aria-hidden="true">
                <use xlink:href="#icon-v5_21"></use>
              </svg>
              <c-tipPop :show="hoverType === 'center'" :text="$t('trade5.depth1')" />
            </span>
            <span
              class="dtIcon"
              @mouseenter="addActive('buy')"
              @mouseleave="removeActive('buy')"
              @click="switchDepthType('buy')">
              <svg
                v-if="depthType === 'buy' || hoverType === 'buy'"
                class="icon icon-14 hoverHide" aria-hidden="true">
                <use xlink:href="#icon-v5_22_h"></use>
              </svg>
              <svg
                v-else
                class="icon icon-14 hoverHide" aria-hidden="true">
                <use xlink:href="#icon-v5_22"></use>
              </svg>
              <c-tipPop :show="hoverType === 'buy'" :text="$t('trade5.depth2')" />
            </span>
            <span
              class="dtIcon"
              @mouseenter="addActive('sell')"
              @mouseleave="removeActive('sell')"
              @click="switchDepthType('sell')">
              <svg
                v-if="depthType === 'sell' || hoverType === 'sell'"
                class="icon icon-14 hoverHide" aria-hidden="true">
                <use xlink:href="#icon-v5_23_h"></use>
              </svg>
              <svg
                v-else
                class="icon icon-14 hoverHide" aria-hidden="true">
                <use xlink:href="#icon-v5_23"></use>
              </svg>
              <c-tipPop :show="hoverType === 'sell'" :text="$t('trade5.depth3')" />
            </span>
          </div>
          <div class="accuracy">
            <Select
              :value="deptValue"
              :width="accuracyWidth"
              :options="depthOptions"
              @onChanges="accuracyChange"
            />
          </div>
        </div>
      </div>
      <div
        :class="{ 'is-show': shrinksDdpthNewShow === 'D' }"
        class="block-content a-6-bg"
      >
        <tableList
          type="asks"
          :theadList="theadList"
          :dataList="dataList.asksData"
          :maxValue="dataList.depthMaxNumber"
          :cellWidth="cellWidth"
          :lineNumber="sellLineNumber"
          :bodyHeight="sellHeight"
        />
        <div class="current-price a-6-bg" :class="{'isBuy': depthType === 'buy'}">
          <div class="price b-1-cl" :class="getShowEtf(symbolCurrent) ? 'etfPriceClass' : ''">
            <span
              class="sy-price"
              v-if="symbolsData.close.data !== '--'"
              :class="symbolsData.close.class"
            >
              {{ symbolsData.close.data }}
            </span>
            <span
              v-if="symbolsData.close.price !== '--'"
              class="otc-price b-2-cl"
            >
              ≈ {{ symbolsData.close.price }}
            </span>
          </div>
          <div v-if="getShowEtf(symbolCurrent)"
            class="eftJz b-1-cl">
            <div
              @mouseenter="showEtfText = true"
              @mouseleave="showEtfText = false"
              class="eftJz-title">
              {{$t('etfAdd.jz')}}
              <transition name="fade">
                <div v-if="showEtfText" class="market-show a-4-bg b-1-cl">
                  <div>{{$t('etfAdd.jzText1')}}</div>
                  <div>{{$t('etfAdd.jzText2')}}</div>
                  <span
                    class="arrow a-4-bd"
                    :class="depthType === 'buy' ? 'arrow-bottom':'arrow-top'"></span>
                </div>
              </transition>
            </div>
            <div class="eftJz-value">
              {{etfPrice}}
            </div>
          </div>
          <!-- <div
            v-if="isShowJzIntroduce && getShowEtf(symbolCurrent)"
            class="eftJz-introduce a-4-bg b-1-cl"
            :style="depthType === 'sell' ? 'bottom: 40px' : 'top: 40px;'">
            <p>{{$t('etfAdd.jzIntroduce')}}</p>
            <a
              href="javascript:void;"
              class="u-8-cl"
              @click="isShowJzIntroduce = false"
            >
              {{$t('etfAdd.knowBtn')}}
            </a>
          </div> -->
          <!-- <div class="depth-type">
            <span class="num b-1-cl">{{ deptValue }}</span>
            <span class="switch-type-btn b-2-cl b-1-bd">
              <i
                :class="{ noclick: currentdepthClass <= 0 }"
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
                :class="{
                  noclick: currentdepthClass >= depthOption.length - 1
                }"
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
          </div> -->
        </div>
        <tableList
          type="buy"
          :theadList="theadList"
          :dataList="dataList.buyData"
          :maxValue="dataList.depthMaxNumber"
          :lineNumber="buyLineNumber"
          :cellWidth="cellWidth"
          :bodyHeight="buyHeight"
        />
      </div>
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/modules/newTrade/depath/index';
import 'BlockChain-ui/PC/common-mixin/modules/newTrade/depath/index/index.styl';
import { myStorage } from 'BlockChain-ui/utils';
import tableList from '@/components/modules/newTrade/tableList/index.vue';
import Select from '@/components/modules/newTrade/select/index.vue';

export default {
  mixins: [mixin],
  components: {
    tableList,
    Select,
  },
  props: {
    showGridFlag: {
      default: false,
      type: Boolean,
    },
    proTrade: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.init();
    // this.$bus.$on('tradeType', (v) => {
    //   this.tradeType = v;
    //   this.buyHeight = 300;
    //   this.sellHeight = 300;
    //   this.sellLineNumber = 15;
    //   this.buyLineNumber = 15;
    // });
  },
  watch: {
    // showGridFlag(v) {
    //   if (v) {
    //     this.buyHeight = 359;
    //     this.sellHeight = 359;
    //     this.sellLineNumber = 24;
    //     this.buyLineNumber = 24;
    //   } else {
    //     this.buyHeight = 300;
    //     this.sellHeight = 300;
    //     this.sellLineNumber = 15;
    //     this.buyLineNumber = 15;
    //   }
    // },
  },
  methods: {
    init() {
      if (document.body.clientWidth < 961) {
        this.sellHeight = 100;
        // 买盘 高度
        this.buyHeight = 100;
        // 显示条数
        this.sellLineNumber = 5;
        this.buyLineNumber = 5;
      } else if (this.moduleType === 'lever') {
        // 卖盘 高度
        this.sellHeight = 346;
        // 买盘 高度
        this.buyHeight = 346;
        // 显示条数
        this.sellLineNumber = 21;
        this.buyLineNumber = 21;
        this.maxHeeight = 692;
        // 当前选中的货币对
        this.symbolCurrent = myStorage.get('leverSymbolName');
      }
      if (this.proTrade) {
        // 卖盘 高度
        this.sellHeight = 160;
        // 买盘 高度
        this.buyHeight = 160;
        // 显示条数
        this.sellLineNumber = 10;
        this.buyLineNumber = 10;
        this.maxHeeight = 320;
      }

      this.setBoxHeight();
      // 监听 深度数据
      this.$bus.$on('DEPTH_DATA', (data) => {
        if (data && this.symbolCurrent === data.symbol) {
          this.dataList = JSON.parse(JSON.stringify(data));
        } else {
          this.dataList = {
            asksData: [],
            buyData: [],
            depthMaxNumber: null,
          };
        }
      });
      // 监听 市场（最新价格） 数据
      this.$bus.$on('MARKET_DATA', (data) => {
        this.marketData = JSON.parse(JSON.stringify(data));
      });
      // 获取 当前选中的货币对
      this.$bus.$on('SYMBOL_CURRENT', (val) => {
        this.dataList = {
          asksData: [],
          buyData: [],
          depthMaxNumber: null,
        };
        this.symbolCurrent = val;
        this.currentdepthClass = 0;
      });
      // 监听 浏览器窗口大小改变
      this.$bus.$on('WINFOW_ON_RESIIZE', () => {
        // 设置国际版TV的高度
        if (document.body.clientWidth < 961) {
          this.sellHeight = 100;
          this.buyHeight = 100;
          this.sellLineNumber = 5;
          this.buyLineNumber = 5;
        } else if (this.moduleType === 'lever') {
          this.sellHeight = 346;
          this.buyHeight = 346;
          this.sellLineNumber = 21;
          this.buyLineNumber = 21;
        } else {
          this.buyHeight = 346;
          // if (this.showGridFlag) {
          //   this.buyHeight = 418;
          // }
          this.sellHeight = 346;
          this.sellLineNumber = 21;
          this.buyLineNumber = 21;
        }
        if (this.proTrade) {
          this.sellHeight = 160;
          this.buyHeight = 160;
          this.sellLineNumber = 10;
          this.buyLineNumber = 10;
        }
        this.setBoxHeight(false);
      });
      this.$bus.$on('trade_grid_fix', (val) => {
        this.gridFix = val;
        if (val) {
          this.maxHeeight = 780;
          this.minHeight = 390;
          this.sellLineNumber = 24;
          this.buyLineNumber = 24;
        } else {
          this.maxHeeight = 692;
          this.minHeight = 346;
          this.sellLineNumber = 21;
          this.buyLineNumber = 21;
        }
        this.switchDepthType(this.depthType, true);
      });
    },
    // 盘口 切换 全买盘 或者 全卖盘
    switchDepthType(type, change = true) {
      if (change) this.switchBlock('D');
      switch (type) {
        case 'sell':
          this.sellHeight = this.maxHeeight;
          this.sellLineNumber = 42;
          this.buyHeight = 0;
          this.buyLineNumber = 0;
          this.depthType = 'sell';
          if (this.proTrade) {
            this.sellLineNumber = 20;
          }
          if (this.gridFix) {
            this.sellLineNumber = 48;
          }
          break;
        case 'buy':
          this.buyHeight = this.maxHeeight;
          this.buyLineNumber = 42;
          this.sellHeight = 0;
          this.sellLineNumber = 0;
          this.depthType = 'buy';
          if (this.proTrade) {
            this.buyLineNumber = 20;
          }
          if (this.gridFix) {
            this.buyLineNumber = 48;
          }
          break;
        default:
          this.buyHeight = this.minHeight;
          this.sellHeight = this.minHeight;
          this.depthType = 'center';
          if (this.templateLayoutType === '2') {
            const number = Math.floor(this.minHeight / 16);
            this.sellLineNumber = number;
            this.buyLineNumber = number;
          } else {
            this.sellLineNumber = 21;
            this.buyLineNumber = 21;
          }
          if (this.proTrade) {
            this.sellHeight = 160;
            this.buyHeight = 160;
            this.sellLineNumber = 10;
            this.buyLineNumber = 10;
          }
          if (this.gridFix) {
            this.buyLineNumber = 24;
            this.sellLineNumber = 24;
          }
      }
    },
  },
  // height: 418px;
};
</script>
