<!-- 币币交易 下单 -->
<template>
  <div class="trade-box internationalTradeForm b-2-cl">
    <div class="title-block a-21-bg a-3-bd">
      <span
        class="tab"
        @click="switchTradeSellorBuy(1)"
        :class="{ 'a-12-bd b-1-cl': tradeIsSell === 1 }"
      >
        <!-- 限价交易 -->
        {{ $t("trade.buy") }}
      </span>
      <span
        class="tab"
        @click="switchTradeSellorBuy(2)"
        :class="{ 'a-12-bd b-1-cl': tradeIsSell === 2 }"
      >
        <!-- 市价交易 -->
        {{ $t("trade.sell") }}
      </span>
      <span class="tab"
        v-if="gridTradeFlag && showGridFlag"
        @click="switchGrid"
        :class="{'a-12-bd b-1-cl': tradeIsSell === 3}">
        <!-- 网格交易 -->
        {{$t('gridTrade.title')}}
      </span>
    </div>
    <div
      v-if="tradeIsSell !== 3"
      class="switch-trade-type a-21-bg a-3-bd b-1-cl"
      @mouseleave="hideSelectModal"
    >
      <div class="content">
        <span @mouseenter="handMouseenter">{{
          transactionType == 1
            ? $t("trade.limitPriceTrade")
            : $t("trade.marketPriceTrade")
        }}</span>
        <svg class="icon icon-14" aria-hidden="true">
          <use xlink:href="#icon-a_13"></use>
        </svg>
        <div class="header-sub-nav a-5-bg x-2-cl" v-show="selectModalState">
          <ul class="header-user-text">
            <li class="g-3-cl-h">
              <span
                @click="switchTradeType(1)"
                :class="langHover === 'limitPriceTrade' ? 'a-4-bg b-1-cl' : ''"
                @mouseenter="handMouseenter('limitPriceTrade')"
                @mouseout="handMouseleave('limitPriceTrade')"
              >
                <!-- 限价交易 -->
                {{ $t("trade.limitPriceTrade") }}
              </span>
            </li>
            <li class="g-3-cl-h">
              <span
                @click="switchTradeType(2)"
                :class="langHover === 'marketPriceTrade' ? 'a-4-bg b-1-cl' : ''"
                @mouseenter="handMouseenter('marketPriceTrade')"
                @mouseout="handMouseleave('marketPriceTrade')"
              >
                <!-- 市价交易 -->
                {{ $t("trade.marketPriceTrade") }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 选择ai或者自定义 -->
    <div
      v-if="tradeIsSell === 3"
      class="grid-switch switch-trade-type a-21-bg a-3-bd b-1-cl clearfix"
      @mouseleave="hideSelectModal"
      :style="gridType == 2 ? 'padding: 0 16px;' : 'padding: 0 0 0 16px;'"
    >
      <div class="content">
        <span @mouseenter="handMouseenter"><!-- 自定义策略 -->{{
          gridType == 1
            ? $t('gridTrade.type1')
            : $t('gridTrade.type2')
        }}</span>
        <svg class="icon icon-14" aria-hidden="true">
          <use xlink:href="#icon-a_13"></use>
        </svg>
        <div class="header-sub-nav a-5-bg x-2-cl" v-show="selectModalState">
          <ul class="header-user-text">
            <li class="g-3-cl-h">
              <span
                @click="() => this.gridType = 1"
                :class="langHover === 'gridSet' ? 'a-4-bg b-1-cl' : ''"
                @mouseenter="handMouseenter('gridSet')"
                @mouseout="handMouseleave('gridSet')"
              >
                <!-- 自定义策略 -->
                {{ $t('gridTrade.type1') }}
              </span>
            </li>
            <li class="g-3-cl-h">
              <span
                @click="() => this.gridType = 2"
                :class="langHover === 'gridAi' ? 'a-4-bg b-1-cl' : ''"
                @mouseenter="handMouseenter('gridAi')"
                @mouseout="handMouseleave('gridAi')"
              >
                <!-- Ai策略 -->
                {{ $t('gridTrade.type2') }}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <!-- <p class="priceUser">
        <span class="lov">
          <span class="lovText mr-text">{{$t('gridTrade.setText1')}}:
            {{currenTaccount.unitsAccoubt}}
            {{symbolUnit.units | getCoinShowName(coinList)}}
          </span>
          <span class="lovText">{{currenTaccount.symbolAccoubt}}
            {{symbolUnit.symbol | getCoinShowName(coinList)}}
          </span>
        </span>
      </p> -->
    </div>

    <div class="trade-form"  v-if="tradeIsSell !== 3">
      <div class="trade-block" v-if="tradeIsSell === 1">
        <div class="form-block">
          <div class="top-mag">
            <!-- <span class="trade-type">
              <span>{{$t('trade.balance')}}</span>
              <span class="lovText b-1-cl">{{ currenTaccount.unitsAccoubt }}
                 {{symbolUnit.units | getCoinShowName(coinList)}}
               </span>
            </span> -->
            <span class="lov b-1-cl">
              <c-button
                type="text"
                class="lovButton"
                v-if="
                  this.isLogin && currenTaccount.unitsOpen.toString() === '1'
                "
                @click="goCz(symbolUnit.units)"
                >{{ $t("manageFinances.goRecharge") }}</c-button
              >
            </span>
          </div>
          <trade-input
            v-model="formData_1.value"
            :fixValue="fixValue.priceFix"
            @onChanes="onChaneForm"
            name="formData_1"
            :datas="formData_1"
          />
          <trade-input
            v-model="formData_2.value"
            :fixValue="formData2Fix"
            @onChanes="onChaneForm"
            name="formData_2"
            :datas="formData_2"
          />
          <div class="percentage">
            <span
              v-for="(item, index) in perArr"
              :key="index + 'buy'"
              :class="perBuyClass(item)"
              @click="setPerNumber('buy', item)"
              class="per-item"
              >{{ item }}%</span
            >
          </div>
          <div class="volume-trade">
            <div v-if="transactionType === 1">
              <!-- 交易额: -->
              {{ $t("trade.dealMoney") }}
              <span class="vol" v-if="tradeVolumeBuy !== '--'"
                >{{ tradeVolumeBuy }}
                {{ symbolUnit.units | getCoinShowName(coinList)}}
                </span
              >
            </div>
          </div>
          <c-button
            :defaultColorClass="buttosContent.buyButton.class"
            :hoverColorClass="buttosContent.buyButton.class"
            :activeColorClass="buttosContent.buyButton.class"
            @click="submit('BUY')"
            width="100%"
            >{{ buttosContent.buyButton.text }}</c-button
          >
        </div>
      </div>
      <div class="trade-block" v-if="tradeIsSell === 2">
        <div class="form-block">
          <div class="top-mag">
            <!-- <span class="trade-type">
              <span>{{$t('trade.balance')}}</span>
              <span class="lovText b-1-cl">
                  {{currenTaccount.symbolAccoubt}}
                  {{symbolUnit.symbol | getCoinShowName(coinList)}}
                </span
              >
            </span> -->
            <span class="lov b-1-cl">
              <c-button
                type="text"
                class="lovButton"
                v-if="
                  this.isLogin && currenTaccount.unitsOpen.toString() === '1'
                "
                @click="goCz(symbolUnit.units)"
                >{{ $t("manageFinances.goRecharge") }}</c-button
              >
            </span>
          </div>
          <trade-input
            v-model="formData_3.value"
            @onChanes="onChaneForm"
            name="formData_3"
            :fixValue="fixValue.priceFix"
            :datas="formData_3"
          />
          <trade-input
            v-model="formData_4.value"
            @onChanes="onChaneForm"
            name="formData_4"
            :fixValue="fixValue.volumeFix"
            :datas="formData_4"
          />
          <div class="percentage">
            <span
              v-for="(item, index) in perArr"
              :key="index + 'sell'"
              @click="setPerNumber('sell', item)"
              class="per-item"
              :class="perSellClass(item)"
              >{{ item }}%</span
            >
          </div>
          <div class="volume-trade">
            <div v-if="transactionType === 1">
              <!-- 交易额: -->
              {{ $t("trade.dealMoney") }}
              <span
                class="vol"
                :class="
                  volumeTradeClass(
                    tradeVolumeSell,
                    currenTaccount.symbolAccoubt
                  )
                "
                v-if="tradeVolumeSell !== '--'">
                {{ tradeVolumeSell }}
                {{symbolUnit.units | getCoinShowName(coinList)}}
              </span>
            </div>
          </div>
          <c-button
            :defaultColorClass="buttosContent.sellButton.class"
            :hoverColorClass="buttosContent.sellButton.class"
            :activeColorClass="buttosContent.sellButton.class"
            @click="submit('SELL')"
            width="100%"
            >{{ buttosContent.sellButton.text }}</c-button
          >
        </div>
      </div>
    </div>
     <div class="trade-form trade-grid" v-else>
      <div class="trade-block trade_block_width" v-if="gridType === 1">
          <div class="form-block">
            <p style="lineHeight: 16px;">
              {{$t('gridTrade.setText2')}}:
            </p>
            <div class="input-inline-box clearfix">
              <div class="input-inline-item">
                <grid-trade-input
                  v-model="gridSetMin.value"
                  @onChanes="onChaneForm"
                  name="gridSetMin"
                  :fixValue='fixValue.priceFix'
                  :placeText="$t('gridTrade.setText3')"
                  :datas="gridSetMin"/>
              </div>
              <b class="a-3-bd"></b>
              <div class="input-inline-item">
                <grid-trade-input
                  v-model="gridSetMax.value"
                  @onChanes="onChaneForm"
                  name="gridSetMax"
                  :fixValue='fixValue.priceFix'
                  :placeText="$t('gridTrade.setText4')"
                  :datas="gridSetMax"/>
              </div>
            </div>
            <p>{{$t('gridTrade.setText5')}}: </p>
            <div class="input-inline-box clearfix">
              <div class="input-inline-item input-inline-item_width">
                <grid-trade-input
                  v-model="gridSetNum.value"
                  @onChanes="onChaneForm"
                  name="gridSetNum"
                  :fixValue='fixValue.priceFix'
                  :placeText="'2-100'"
                  :datas="gridSetNum"/>
              </div>
              <div style="width: 10px;"></div>
              <div class="input-inline-item clearfix set-type">
                <div class="set-type-btn"
                :class="setType === 1 ? 'u-8-bd u-8-cl' : 'a-3-bd'" @click="() => this.setType = 1">
                  {{$t('gridTrade.setText6')}}
                </div>
                <div class="set-type-btn"
                :class="setType === 2 ? 'u-8-bd u-8-cl' : 'a-3-bd'" @click="() => this.setType = 2">
                  {{$t('gridTrade.setText7')}}
                </div>
              </div>
            </div>
            <p>{{$t('gridTrade.setText8')}}
              {{setType === 1 ? `${gridSetMinProfits}%～${gridSetMaxProfits}`
              : gridSetMaxProfits}}%({{$t('gridTrade.setText9')}})</p>
            <div class="set-num clearfix">
              <div class="setn-num-list">
                <p>{{$t('gridTrade.setText10')}}</p>
                <grid-trade-input
                  v-model="gridSetAccount.value"
                  @onChanes="onChaneForm"
                  name="gridSetAccount"
                  :fixValue='fixValue.priceFix'
                  :datas="gridSetAccount"/>
              </div>
              <div class="setn-num-list">
                <p>{{$t('gridTrade.setText12')}}({{$t('gridTrade.optional')}})</p>
                <grid-trade-input
                  v-model="gridSetMinBalance.value"
                  @onChanes="onChaneForm"
                  name="gridSetMinBalance"
                  :fixValue='fixValue.priceFix'
                  :datas="gridSetMinBalance"/>
              </div>
              <div class="setn-num-list">
                <p>{{$t('gridTrade.setText11')}}({{$t('gridTrade.optional')}})</p>
                <grid-trade-input
                  v-model="gridSetMaxBalance.value"
                  @onChanes="onChaneForm"
                  name="gridSetMaxBalance"
                  :fixValue='fixValue.priceFix'
                  :datas="gridSetMaxBalance"/>
              </div>
            </div>
            <div class="set-btc">
                <span>
                  {{$t('gridTrade.setText13')}} {{symbolUnit.symbol | getCoinShowName(coinList)}}
                </span>
                <div class="switch-inline">
                  <c-switch :value="gridSetFormFlag"
                  @click="() => this.gridSetFormFlag = !this.gridSetFormFlag"/>
                </div>
              </div>
            <c-button
              @click="gradSub('gradTrad')"
              height="35px"
              width="100%">
              {{gridbuttosContent.gridButton.text}}
            </c-button>
          </div>
        </div>
        <div class="trade-block trade_block_width" v-if="gridType === 2">
          <div class="form-block">
            <p class="fee_love">
              <span>
                {{$t('gridTrade.setText2')}}:
              </span>
              <b></b>
              <label for="">
                <b>
                  {{$t('gridTrade.aiText1')}}
                </b>
                &nbsp;&nbsp;
                <span class="u-1-cl">
                  {{sevenDay}} %
                </span>
              </label>
            </p>
            <div class="input-inline-box clearfix">
              <div class="input-inline-item">
                <grid-trade-input
                  v-model="gridAiBlance.value"
                  @onChanes="onChaneForm"
                  name="gridAiBlance"
                  :fixValue='fixValue.priceFix'
                  :placeholder="$t('gridTrade.setText2')"
                  :datas="gridAiBlance"/>
              </div>
            </div>
            <p>{{$t('gridTrade.setText5')}}: </p>
            <div class="input-inline-box clearfix">
              <div class="input-inline-item">
                <grid-trade-input
                  v-model="gridAiNum.value"
                  @onChanes="onChaneForm"
                  name="gridAiNum"
                  :fixValue='fixValue.priceFix'
                  :placeholder="$t('gridTrade.setText5')"
                  :datas="gridAiNum"/>
              </div>
            </div>
            <p>{{$t('gridTrade.setText8')}}
              {{gridAiMin}}%～{{gridAiMax}}%({{$t('gridTrade.setText9')}})</p>
            <div class="set-num clearfix">
              <div class="setn-num-list">
                <p>{{$t('gridTrade.setText10')}}</p>
                <grid-trade-input
                  v-model="gridAiAccount.value"
                  @onChanes="onChaneForm"
                  name="gridAiAccount"
                  :fixValue='fixValue.priceFix'
                  :datas="gridAiAccount"/>
              </div>
              <div class="setn-num-list">
                <p>{{$t('gridTrade.setText12')}}({{$t('gridTrade.optional')}})</p>
                <grid-trade-input
                  v-model="gridAiMinBalance.value"
                  @onChanes="onChaneForm"
                  name="gridAiMinBalance"
                  :fixValue='fixValue.priceFix'
                  :datas="gridAiMinBalance"/>
              </div>
              <div class="setn-num-list">
                <p>{{$t('gridTrade.setText11')}}({{$t('gridTrade.optional')}})</p>
                <grid-trade-input
                  v-model="gridAiMaxBalance.value"
                  @onChanes="onChaneForm"
                  name="gridAiMaxBalance"
                  :fixValue='fixValue.priceFix'
                  :datas="gridAiMaxBalance"/>
              </div>
            </div>
            <div class="set-btc">
                <span>
                 {{$t('gridTrade.setText13')}} {{symbolUnit.symbol | getCoinShowName(coinList)}}
                </span>
                <div class="switch-inline">
                  <c-switch :value="gridAiFormFlag"
                  @click="() => this.gridAiFormFlag = !this.gridAiFormFlag"/>
                </div>
              </div>
            <c-button
              @click="gradSub('GridAi')"
              height="35px"
              width="100%">
              {{gridbuttosContent.gridAiButton.text}}
            </c-button>
          </div>
        </div>
    </div>
    <!-- 未认证 提示框 -->
    <c-alert :showFlag="notAuthShowDialog"
        :buttonText="$t('otcRelease.DeCertification')"
        :imgMap="imgMap"
        @close="dialogClose"
        @confirm="gotoAuth">
      <div class="ts-content-text">
        <span v-if="tsTexttype === 1">{{$t('personal.exccAuthForm.text18')}}</span>
        <span v-else>{{$t('personal.exccAuthForm.text19')}}</span>
      </div>
    </c-alert>
  </div>
</template>
<script>
import 'BlockChain-ui/PC/common-mixin/modules/newTrade/tradeForm/internationalTradeForm/internationalTradeForm.styl';
import mixin from 'BlockChain-ui/PC/common-mixin/modules/newTrade/tradeForm/internationalTradeForm/internationalTradeForm';
import {
  myStorage, fixD, division, cut, nul, getCoinShowName,
} from 'BlockChain-ui/utils';
import tradeInput from './tradeInput.vue';
import GridTradeInput from './GridTradeInput.vue';

export default {
  mixins: [mixin],
  components: {
    tradeInput,
    GridTradeInput,
  },
  props: {
    proTrade: {
      default: false,
      tyoe: Boolean,
    },
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      gridTabType: 0,
      gridType: 1, // 专业版选择自定义或者ai
      setType: 1, // 类型1等差2 等比
      gridSetFormFlag: false,
      gridAiFormFlag: false,
      minimumOrderQuantity: 0, // 最小下单金额
      // 七日年化收益率
      sevenDay: '--',
      gridAiMin: '--', // 最大利润率
      gridAiMax: '--', // 最小利润率
      gridAiMinPrice: '--', // Ai 最小值
      gridAiMaxPrice: '--', // Ai 最大值
      fee: null, // 手续费
      // set代表自定义
      gridSetMin: {
        units: myStorage.get('sSymbolName') ? myStorage.get('sSymbolName').split('/')[1] : 'USDT',
        errorText: '',
        isError: false,
        disabled: false,
        disabledText: '',
        errorHeight: '-30px',
        value: '',
      },
      gridSetMax: {
        units: myStorage.get('sSymbolName') ? myStorage.get('sSymbolName').split('/')[1] : 'USDT',
        errorText: '',
        isError: false,
        disabled: false,
        disabledText: '',
        errorHeight: '-30px',
        value: '',
      },
      // 数量
      gridSetNum: {
        units: '',
        errorText: '',
        isError: false,
        disabled: false,
        disabledText: '',
        errorHeight: '-30px',
        value: '',
      },
      // 资产
      gridSetAccount: {
        units: myStorage.get('sSymbolName') ? myStorage.get('sSymbolName').split('/')[1] : 'USDT',
        errorText: '',
        isError: false,
        disabled: false,
        disabledText: '',
        style: 'width: 53%',
        errorHeight: '-30px',
        value: '',
      },
      // 止盈价格
      gridSetMaxBalance: {
        units: myStorage.get('sSymbolName') ? myStorage.get('sSymbolName').split('/')[1] : 'USDT',
        errorText: '',
        isError: false,
        disabled: false,
        disabledText: '',
        style: 'width: 53%',
        errorHeight: '-30px',
        value: '',
      },
      // 止损价格
      gridSetMinBalance: {
        units: myStorage.get('sSymbolName') ? myStorage.get('sSymbolName').split('/')[1] : 'USDT',
        errorText: '',
        isError: false,
        disabled: false,
        disabledText: '',
        style: 'width: 53%',
        errorHeight: '-30px',
        value: '',
      },
      gridAiBlance: {
        units: myStorage.get('sSymbolName') ? myStorage.get('sSymbolName').split('/')[1] : 'USDT',
        errorText: '',
        isError: false,
        disabled: true,
        disabledText: '',
        errorHeight: '-30px',
        value: '',
      },
      gridAiNum: {
        units: myStorage.get('sSymbolName') ? myStorage.get('sSymbolName').split('/')[1] : 'USDT',
        errorText: '',
        isError: false,
        disabled: true,
        disabledText: '',
        errorHeight: '-30px',
        value: '',
      },
      gridAiAccount: {
        units: myStorage.get('sSymbolName') ? myStorage.get('sSymbolName').split('/')[1] : 'USDT',
        errorText: '',
        isError: false,
        disabled: false,
        disabledText: '',
        style: 'width: 53%',
        errorHeight: '-30px',
        value: '',
      },
      gridAiMaxBalance: {
        units: myStorage.get('sSymbolName') ? myStorage.get('sSymbolName').split('/')[1] : 'USDT',
        errorText: '',
        isError: false,
        disabled: false,
        disabledText: '',
        style: 'width: 53%',
        errorHeight: '-30px',
        value: '',
      },
      gridAiMinBalance: {
        units: myStorage.get('sSymbolName') ? myStorage.get('sSymbolName').split('/')[1] : 'USDT',
        errorText: '',
        isError: false,
        disabled: false,
        disabledText: '',
        style: 'width: 53%',
        errorHeight: '-30px',
        value: '',
      },
    };
  },
  computed: {
    // 按钮信息
    gridbuttosContent() {
      return {
        gridButton: {
          // 开启网格交易
          text: this.isLogin
            ? this.$t('gridTrade.btn1')
            : this.$t('trade.loginReg'), // '登录/注册',
          class: this.isLogin ? 'u-1-bg buyBtn u-16-cl' : 'u-8-bg buyBtn u-16-cl',
        },
        // 开启AI网格策略
        gridAiButton: {
          text: this.isLogin
            ? this.$t('gridTrade.btn2')
            : this.$t('trade.loginReg'), // '登录/注册',
          class: this.isLogin ? 'u-1-bg buyBtn u-16-cl' : 'u-8-bg buyBtn u-16-cl',
        },
      };
    },
    // 等差网格（动态利润）： min ~ max

    // max =（（最高价-最低价）/ （网格数量 - 1）/ 最低价）  - 买入手续费率 - 卖出手续费率

    // min =（ (最高价-最低价）/ （网格数量 - 1））/ （最高价 - （ (最高价-最低价）/ （网格数量 - 1）））  - 买入手续费率 - 卖出手续费率

    // 最低利润
    gridSetMinProfits() {
      // 1: 等差 2 等比
      let val = null;
      if (this.gridSetMax.value
        && this.gridSetMin.value
        && this.gridSetNum.value
        && this.fee) {
        if (this.setType === 1) {
          const card = division(
            cut(this.gridSetMax.value, this.gridSetMin.value),
            (this.gridSetNum.value - 1),
          );
          val = nul(cut(
            cut(
              division(
                card,
                cut(
                  this.gridSetMax.value,
                  card,
                ),
              ),
              this.fee,
            ),
            this.fee,
          ), 100);
        }
      }
      if (val === Infinity || val === -Infinity) {
        val = null;
      }
      return fixD(val, 2) || '--';
    },
    // 最高利润
    gridSetMaxProfits() {
      // 1: 等差 2 等比
      let val = null;
      if (this.gridSetMax.value
        && this.gridSetMin.value
        && this.gridSetNum.value
        && this.fee) {
        if (this.setType === 1) {
          val = nul(cut(
            cut(
              division(
                division(
                  cut(this.gridSetMax.value, this.gridSetMin.value),
                  (this.gridSetNum.value - 1),
                ), this.gridSetMin.value,
              ),
              this.fee,
            ),
            this.fee,
          ), 100);
          // 等比网格（固定利润）=（（最高价/最低价）开（网格数量-1）次方） - 手续费率*2-1
        } else if (this.setType === 2) {
          val = nul(cut(
            cut(
              division(
                this.gridSetMax.value,
                this.gridSetMin.value,
              )
                ** (1 / (this.gridSetNum.value - 1)),
              nul(this.fee, 2),
            ),
            1,
          ), 100);
        }
      }
      if (val === Infinity || val === -Infinity) {
        val = null;
      }
      return fixD(val, 2) || '--';
    },
    setNumVal() {
      return this.gridSetNum.value;
    },
    symbolsData() {
      if (this.marketData[this.symbolCurrent]) {
        return this.marketData[this.symbolCurrent];
      }
      return {
        name: '--',
        symbol: {
          symbol: '--',
          unit: '--',
        },
        close: {
          class: '',
          data: 0,
          price: '--',
        },
        amount: '--',
        rose: {
          class: '',
          data: '--',
        },
      };
    },
  },
  watch: {
    // 切换自定义和ai
    gridType() {
      this.clearGridValue();
      this.getAiData();
    },
    // 切换 限价交易 和 市价交易
    transactionType(val) {
      // 2 市价交易
      this.$bus.$emit('tradeType', false);
      if (val === 2) {
        this.formData_1.disabled = true;
        this.formData_1.disabledText = this.$t('trade.mPriceBuy'); // 以市场最优价买入
        this.formData_2.title = this.$t('trade.dealMoney'); // '交易额';
        this.formData_2.units = this.symbolUnit.units;
        this.formData_3.disabled = true;
        this.formData_3.disabledText = this.$t('trade.mPriceSell'); // 以市场最优价卖出
      } else if (val === 1) {
        this.formData_1.disabled = false;
        this.formData_1.disabledText = '';
        this.formData_2.title = this.$t('trade.number'); // '数量';
        this.formData_2.units = this.symbolUnit.symbol;
        this.formData_3.disabled = false;
        this.formData_3.disabledText = '';
      } else if (val === 4) {
        this.clearGridValue();
        this.getAiData();
        // 改变父组件样式
        this.$bus.$emit('tradeType', 'grid');
      }
    },
    setNumVal(v) {
      if (v) {
        this.$nextTick(() => {
          this.gridSetNum.value = fixD(v, 0);
        });
      }
    },
    // 各个输入框的 单位
    symbolUnit(val) {
      this.formData_1.units = val.units;
      this.formData_2.units = val.symbol;
      this.formData_3.units = val.units;
      this.formData_4.units = val.symbol;
      this.formData_5.units = val.symbol;
      this.formData_6.units = val.symbol;
      this.gridSetMin.units = val.units;
      this.gridSetMax.units = val.units;
      this.gridSetAccount.units = val.units;
      this.gridSetMaxBalance.units = val.units;
      this.gridSetMinBalance.units = val.units;
      this.gridAiAccount.units = val.units;
      this.gridAiMaxBalance.units = val.units;
      this.gridAiMinBalance.units = val.units;
    },
  },
  methods: {
    switchGrid() {
      this.clearValue();
      this.clearGridValue();
      this.getAiData();
      this.tradeIsSell = 3;
    },
    gradSub(type) {
      if (!this.isLogin) {
        this.$router.push('/login');
      } else {
        if (!this.submitGridFormKey(type)) return;
        const {
          formKey,
          lowestPrice,
          highestPrice,
          gridNumber,
          totalQuoteAmount,
          stopHighPrice,
          stopLowPrice,
          quantType,
          flag,
          useOwnBase,
          totalBaseAmount,
          gridLineType,
        } = this.submitGridFormKey(type);
        let fal = true;
        const { lan } = this.$store.state.baseData;
        let lang = lan;
        if (lan !== 'zh_CN') {
          lang = 'en_US';
        }
        if (lang === 'en_US') {
          const arrs = ['gridSetNum', 'gridAiNum', 'gridSetAccount', 'gridAiAccount'];
          arrs.forEach((item) => {
            this[item].errorHeight = '-40px';
          });
        }
        if (formKey.length) {
          formKey.forEach((item) => {
            const { value } = this[item];
            if (!value) {
              this[item].errorText = `${this.$t('trade.pleaseInput')}`;
              this[item].isError = true;
              fal = false;
            }
            if (parseFloat(value) <= 0) {
              this[item].errorText = `${this.$t('trade.inputError')}`; // 输入有误
              this[item].isError = true;
              fal = false;
            }
          });
          if (this.fal && fal && flag) {
            // 单格利润过小，请重新设置ai
            if (type !== 'gradTrad') {
              if (this.gridAiMax === '--' || this.gridAiMax <= 0 || this.gridAiMin === '--' || this.gridAiMin <= 0) {
                fal = false;
                this.$bus.$emit('tip', { text: this.$t('gridTrade.error9') });
                return;
              }
            } else if (type === 'gradTrad') { // 单格利润过小，请重新设置自定义
              if (gridLineType === 1) { // 等差
                if (this.gridSetMinProfits === '--' || this.gridSetMinProfits <= 0 || this.gridSetMaxProfits === '--' || this.gridSetMaxProfits <= 0) {
                  this.$bus.$emit('tip', { text: this.$t('gridTrade.error9') });
                  fal = false;
                  return;
                }
              } else if (gridLineType === 2) { // 等比只校验最大
                if (this.gridSetMaxProfits === '--' || this.gridSetMaxProfits <= 0) {
                  this.$bus.$emit('tip', { text: this.$t('gridTrade.error9') });
                  fal = false;
                  return;
                }
              }
            }
            if (Number(stopHighPrice) && Number(stopHighPrice) <= Number(highestPrice)) {
              // 止盈价格必须高于网格最高价
              this.$bus.$emit('tip', { text: this.$t('gridTrade.error5') });
              fal = false;
            } else if (Number(stopHighPrice)
            && Number(stopHighPrice) <= Number(this.symbolsData.close.data)) {
              this.$bus.$emit('tip', { text: this.$t('gridTrade.error7') });
              fal = false;
            } else if (Number(stopLowPrice)
            && Number(stopLowPrice) >= Number(lowestPrice)) {
              // 止损价格必须低于网格最低价
              this.$bus.$emit('tip', { text: this.$t('gridTrade.error6') });
              fal = false;
            } else if (Number(stopLowPrice)
            && Number(stopLowPrice) >= Number(this.symbolsData.close.data)) {
              this.$bus.$emit('tip', { text: this.$t('gridTrade.error8') });
              fal = false;
            }
          }
          if (this.fal && fal && flag) {
            this.fal = false;
            const submitData = {
              symbol: this.symbolCurrent,
              lowestPrice,
              highestPrice,
              gridNumber,
              totalQuoteAmount,
              stopHighPrice,
              stopLowPrice,
              quantType,
              useOwnBase,
              totalBaseAmount,
              gridLineType, // 网格类型 1:等差 2:等比
              fee: this.fee,
            };
            if (useOwnBase) {
              submitData.currentPrice = this.symbolsData.close.data;
              if (submitData.currentPrice) {
                this.gridCancelEvent(submitData);
              }
            } else {
              this.gridSubData(submitData);
            }
          }
        }
      }
    },
    submitGridFormKey(type) {
      let formKey = [];
      let lowestPrice = null;
      let highestPrice = null;
      let gridNumber = null;
      let totalQuoteAmount = null;
      let stopHighPrice = null;
      let stopLowPrice = null;
      let quantType = null;
      const flag = true;
      let gridLineType = 1;
      let useOwnBase = 0;
      if (type === 'gradTrad') {
        formKey = ['gridSetMin', 'gridSetMax', 'gridSetNum', 'gridSetAccount'];
        lowestPrice = fixD(this.gridSetMin.value, this.fixValue.priceFix);
        highestPrice = fixD(this.gridSetMax.value, this.fixValue.priceFix);
        gridNumber = fixD(this.gridSetNum.value, this.fixValue.volumeFix);
        totalQuoteAmount = fixD(this.gridSetAccount.value, this.fixValue.priceFix);
        stopHighPrice = this.gridSetMaxBalance.value
          ? fixD(this.gridSetMaxBalance.value, this.fixValue.priceFix) : 0;
        stopLowPrice = this.gridSetMinBalance.value
          ? fixD(this.gridSetMinBalance.value, this.fixValue.priceFix) : 0;
        quantType = 1; // 网格
        gridLineType = this.setType;
        useOwnBase = this.gridSetFormFlag ? 1 : 0;

        // 判断最高价不能低于最低价的1.02倍。如低于，则提示：价格区间过小，请重新设置
        if (Number(highestPrice) < nul(lowestPrice, 1.02)) {
          this.$bus.$emit('tip', { text: this.$t('gridTrade.error1') });
          return false;
        }
        if (Number(gridNumber) < 2 || Number(gridNumber) > 100) {
          // 数量区间为：2-100
          this.$bus.$emit('tip', { text: this.$t('gridTrade.error2') });
          return false;
        }

        // 判断投入资金是否有足够余额，如无，则提示：USDT余额不足
        if (Number(totalQuoteAmount) > Number(this.currenTaccount.unitsAccoubt)) {
          // USDT余额不足
          this.$bus.$emit('tip', { text: `${getCoinShowName(this.symbolUnit.units, this.coinList)} ${this.$t('gridTrade.error3')}` });
          return false;
          // 总投入资金/网格数量，不能小于当前币对的最小下单金额
        } if (
          division(Number(totalQuoteAmount), gridNumber)
         < Number(this.minimumOrderQuantity)
        ) {
          // 每格投入资金小于当前币对的最小下单金额
          this.$bus.$emit('tip', { text: this.$t('gridTrade.error4') });
          return false;
        }
      } else {
        formKey = ['gridAiAccount'];
        lowestPrice = this.gridAiMinPrice;
        highestPrice = this.gridAiMaxPrice;
        gridNumber = this.gridAiNum.value;
        totalQuoteAmount = fixD(this.gridAiAccount.value, this.fixValue.priceFix);
        stopHighPrice = this.gridAiMaxBalance.value
          ? fixD(this.gridAiMaxBalance.value, this.fixValue.priceFix) : 0;
        stopLowPrice = this.gridAiMinBalance.value
          ? fixD(this.gridAiMinBalance.value, this.fixValue.priceFix) : 0;
        quantType = 1; // 网格
        gridLineType = 1;
        useOwnBase = this.gridAiFormFlag ? 1 : 0; // 是否使用Base资产 0:不使用 1:使用
        // 单格利润过小，请重新设置
        // 判断最高价不能低于最低价的1.02倍。如低于，则提示：价格区间过小，请重新设置
        if (Number(highestPrice) < nul(lowestPrice, 1.02)) {
          this.$bus.$emit('tip', { text: this.$t('gridTrade.error1') });
          return false;
        }

        if (Number(gridNumber) < 2 || Number(gridNumber) > 100) {
          // 数量区间为：2-100
          this.$bus.$emit('tip', { text: this.$t('gridTrade.error2') });
        }

        // 判断投入资金是否有足够余额，如无，则提示：USDT余额不足
        if (Number(totalQuoteAmount) > Number(this.currenTaccount.unitsAccoubt)) {
          this.$bus.$emit('tip', { text: `${getCoinShowName(this.symbolUnit.units, this.coinList)} ${this.$t('gridTrade.error3')}` });
          return false;
          // 总投入资金/网格数量，不能小于当前币对的最小下单金额
        } if (
          division(Number(totalQuoteAmount), gridNumber) < Number(this.minimumOrderQuantity)
        ) {
          // 每格投入资金小于当前币对的最小下单金额
          this.$bus.$emit('tip', { text: this.$t('gridTrade.error4') });
          return false;
        }
      }
      return {
        formKey,
        lowestPrice,
        highestPrice,
        gridNumber,
        totalQuoteAmount,
        stopHighPrice,
        stopLowPrice,
        quantType,
        flag,
        useOwnBase,
        totalBaseAmount: useOwnBase ? this.currenTaccount.symbolAccoubt : 0,
        gridLineType,
      };
    },
    // 清空 表单数据
    clearGridValue() {
      const formKey = [
        'gridAiAccount',
        'gridAiMaxBalance',
        'gridAiMinBalance',
        'gridAiNum',
        'gridSetMin',
        'gridSetMax',
        'gridSetNum',
        'gridSetAccount',
        'gridSetMaxBalance',
        'gridSetMinBalance',
      ];
      formKey.forEach((item) => {
        this[item].value = '';
        this[item].isError = false;
        this[item].subText = null;
      });
    },
    // 请求ai数据
    getAiData() {
      this.axios({
        url: 'noToken/quant/getAIStrategyInfo',
        hostType: 'quant',
        params: {
          symbol: this.symbolCurrent,
        },
        method: 'post',
      }).then((data) => {
        if (data.code.toString() === '0') {
          if (data.data && data.data.configParamMap) {
            this.gridAiMinPrice = fixD(
              data.data.configParamMap.lowestPrice, this.fixValue.priceFix,
            );
            this.gridAiMaxPrice = fixD(
              data.data.configParamMap.highestPrice, this.fixValue.priceFix,
            );
            this.gridAiBlance.disabledText = `${this.gridAiMinPrice} ~ ${this.gridAiMaxPrice}`;
            this.gridAiNum.disabledText = fixD(data.data.configParamMap.gridNumber, 0);
            this.gridAiNum.value = fixD(data.data.configParamMap.gridNumber, 0);
            this.gridAiMin = fixD(data.data.everyProfitMin, 2);
            this.gridAiMax = fixD(data.data.everyProfitMax, 2);
            this.fee = data.data.makerFee;
            // 最小下单数量
            this.minimumOrderQuantity = data.data.minimumOrderQuantity;
            this.sevenDay = fixD(data.data.sevenAnnualizedYield, 2); // 7日年华收益
          }
        } else {
          this.$bus.$emit('tip', { text: data.msg, type: 'error' });
        }
      });
    },
    // 给服务端传参数和当前行情用于判断是否够每格消耗
    gridCancelEvent(params) {
      this.axios({
        url: 'quant/calBaseAmount',
        hostType: 'quant',
        method: 'post',
        params,
      }).then((req) => {
        if (req.code.toString() === '0' && req.data) {
          if (Number(req.data.baseAmount) > Number(this.currenTaccount.symbolAccoubt)) {
            this.$bus.$emit('tip', { text: `${this.$t('gridTrade.least')}${req.data.baseAmount} ${getCoinShowName(this.symbolUnit.symbol, this.coinList)}`, type: 'error' });
            this.fal = true;
          } else {
            const obj = { ...params, totalBaseAmount: Number(req.data.baseAmount) };
            this.gridSubData(obj);
          }
        } else {
          this.$bus.$emit('tip', { text: req.msg, type: 'error' });
          this.fal = true;
        }
      });
    },
    gridSubData(params) {
      this.axios({
        url: 'quant/saveStrategy',
        hostType: 'quant',
        params,
        method: 'post',
      }).then((data) => {
        if (data.code.toString() === '0') {
          // 清空表单
          this.clearGridValue();
          // 重新请求资产
          this.$store.dispatch('assetsExchangeData', {
            auto: false,
            coinSymbols: this.coinSymbols,
          });
          this.getAiData();
          // 发送下单成功的事件
          this.$bus.$emit('ORDER_CREATE', { type: 'success' });
          // 提示成功 下单成功
          this.$bus.$emit('tip', { text: this.$t('trade.dealCussess'), type: 'success' });
          this.fal = true;
        } else {
          this.$bus.$emit('tip', { text: data.msg, type: 'error' });
          this.fal = true;
        }
      }).catch(() => {
        this.fal = true;
      });
    },
  },
  // 组价离开前执行
  beforeDestroy() {
    clearInterval(this.assetsInter);
  },
};
</script>

<style>
.input-inline-box .input-inline-item.input-inline-item_width {
  flex: none;
  width: 80px;
}
.set-type {
  position: relative;
  top: -2px;
}
.trade-grid .trade-input.trade-input-china-container .input-item {
  padding: 0 10px;
}
.trade-grid .set-num .setn-num-list{
  padding-right: 6px;
}
.trade-grid .set-num .setn-num-list .trade-input.trade-input-china-container .input-item {
  padding: 8px 5px 0 5px;
}
  .trade-grid .input-inline-box {
    width: 100%;
  }
  .trade-box.internationalTradeForm .trade-form.trade-grid {
    padding: 12px;
  }
  .priceUser {
    display: inline;
  }
  .grid-switch {
    cursor: default;
  }
  .grid-switch .content {
    float: left;
    cursor: pointer;
  }
  .grid-switch>p {
    float: right;
  }
  .input-inline-item.set-type {
    margin-bottom: 0;
  }
  .set-type .set-type-btn {
    width: 47.5%;
  }
</style>
