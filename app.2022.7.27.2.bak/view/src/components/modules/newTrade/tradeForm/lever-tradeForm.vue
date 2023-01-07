<!-- 币币交易 24小时行情 -->
<template>
  <div class="trade-box lever-tradeForm b-2-cl">
    <div
      v-if="!proTrade"
      class="lever-step">
      <span class="b-1-cl">{{$t('trade5.lever.step')}}：</span>
      <span
        class="b-2-cl"
        @mouseover="leverStep = 1"
        @mouseout="leverStep = null"
        @click="buttonsEvent('1')"
        :class="{'b-4-cl': leverStep === 1}">{{$t('trade5.lever.step1')}}</span>
      <i>
        <svg class="icon icon-12" aria-hidden="true">
          <use xlink:href="#icon-a_11"></use>
        </svg>
      </i>
      <span
        class="b-2-cl"
        @mouseover="leverStep = 2"
        @mouseout="leverStep = null"
        @click="buttonsEvent('2')"
        :class="{'b-4-cl': leverStep === 2}">
        {{$t('trade5.lever.step2')}}/{{$t('home.trade')}}
      </span>
      <i>
        <svg class="icon icon-12" aria-hidden="true">
          <use xlink:href="#icon-a_11"></use>
        </svg>
      </i>
      <span
        class="b-2-cl"
        @mouseover="leverStep = 3"
        @mouseout="leverStep = null"
        @click="buttonsEvent('3')"
        :class="{'b-4-cl': leverStep === 3}">
        {{$t('trade5.lever.step3')}}/{{$t('home.trade')}}
      </span>
    </div>
    <div v-if="!proTrade" class="tradePage-info">
      <ul class="tradePage-change_bolck b-2-cl">
        <!-- <li
          class="a-4-bg"
          :class="{'b-4-cl a-14-bg': tradePage === '1', 'b-4-cl': tradePageHover === '1'}"
          @click="changeTradePage('1')"
          @mouseover="tradePageHover = '1'"
          @mouseout="tradePageHover = null">
          {{$t('trade5.tradeType1')}}
        </li> -->
        <li
          class="a-4-bg"
          :class="{'b-4-cl a-14-bg': tradePage === '2', 'b-4-cl': tradePageHover === '2'}"
          @click="changeTradePage('2')"
          @mouseover="tradePageHover = '2'"
          @mouseout="tradePageHover = null">
          {{$t('trade5.tradeType2')}}
        </li>
        <!-- <li
          v-if="gridTradeFlag && showGridFlag"
          class="a-4-bg"
          :class="{'b-4-cl a-14-bg': tradePage === '3', 'b-4-cl': tradePageHover === '3'}"
          @click="changeTradePage('3')"
          @mouseover="tradePageHover = '3'"
          @mouseout="tradePageHover = null">
          {{$t('trade5.tradeType3')}}
        </li> -->
      </ul>
      <div v-if="financeData">
        <img src="" alt="">
        <span
          class="risk"
          @mouseenter="showRiskTip = true"
          @mouseleave="showRiskTip = false"
        >
          {{$t('lever.fxl')}}
          <c-tipPop :show="showRiskTip" posX="right">
            <p>
              <!-- 总资产/借贷资产*100% -->
              {{$t('lever.leverText1')}}
            </p>
            <p>
              <!-- 当风险率≤110%时，账户将触发爆仓以归还借贷资金 -->
              {{$t('lever.leverText2')}}
            </p>
          </c-tipPop>
        </span>
        <span class="riskRate">{{financeData.riskRate ? financeData.riskRate + '%' : '--'}}</span>
      </div>
    </div>
    <div v-if="proTrade" class="order-type">
      <h6 class="b-1-cl">{{$t('trade5.order')}}</h6>
      <div class="order-transactionType">
        <c-button
          :defaultColorClass = 'transactionButtons.buyButton.defaultClass'
          :hoverColorClass = 'transactionButtons.buyButton.hoverClass'
          :activeColorClass = 'transactionButtons.buyButton.activeClass'
          width="162px"
          height="40px"
          @click="setOrderType('buy')">
          {{$t('trade.buy')}}
        </c-button>
        <c-button
          :defaultColorClass = 'transactionButtons.sellButton.defaultClass'
          :hoverColorClass = 'transactionButtons.sellButton.hoverClass'
          :activeColorClass = 'transactionButtons.sellButton.activeClass'
          width="162px"
          height="40px"
          @click="setOrderType('sell')">
          {{$t('trade.sell')}}
        </c-button>
      </div>
    </div>
    <div class="title-block a-3-bd">
      <div class="tabs">
        <span
          class="tab_line a-12-bg"
          :style="tabLineStyle"
        ></span>
        <span class="tab"
          @click="switchTradeType(1)"
          @mouseenter="tradeTypeHover = 1"
          @mouseleave="tradeTypeHover = null"
          :class="{'a-12-bd b-1-cl': transactionType === 1 || tradeTypeHover === 1}">
          <!-- 限价交易 -->
          {{$t('trade5.limitPrice')}}
        </span>
        <span class="tab"
          @click="switchTradeType(2)"
          @mouseenter="tradeTypeHover = 2"
          @mouseleave="tradeTypeHover = null"
          :class="{'a-12-bd b-1-cl': transactionType === 2 || tradeTypeHover === 2}">
          <!-- 市价交易 -->
          {{$t('trade5.marketPrice')}}
        </span>
      </div>
      <div class="total-assets" v-if="isLogin && !proTrade">
        <c-button type="text"
                className="logBtn"
                @click="buttonsEvent('1')">
          <!-- 划转 -->
          {{$t('lever.leverHz')}}
        </c-button>
        <span class="line a-3-bd"></span>
        <c-button type="text"
                className="logBtn"
                @click="buttonsEvent('2')">
          <!-- 借贷 -->
          {{$t('trade5.lever.step2')}}
        </c-button>
      </div>
    </div>
    <div class="trade-form">
      <div v-if="!proTrade || orderType === 'buy'" class="trade-block">
        <div class="form-block">
          <div class="top-mag">
            <span v-if="!proTrade" class="trade-type b-1-cl">
              <!-- 买入 -->
              {{$t('trade.buy')}}
              {{symbolUnit.symbol | getCoinShowName(coinList)}}
            </span>
            <span class="lov b-1-cl">
              <svg class="icon icon-14" aria-hidden="true">
                <use xlink:href="#icon-b_19"></use>
              </svg>
              {{currenTaccount.unitsAccoubt}}
              {{symbolUnit.units | getCoinShowName(coinList)}}
            </span>
          </div>
          <trade-input
            v-model="formData_1.value"
            :fixValue = 'fixValue.priceFix'
            @onChanes = "onChaneForm"
            name="formData_1"
            :datas="formData_1"/>
          <trade-input
            v-model="formData_2.value"
            :fixValue = 'formData2Fix'
            @onChanes = "onChaneForm"
            name="formData_2"
            :datas="formData_2"/>
          <Progress
            name="buy"
            :curPercent="perBuy"
            :disabled="!isLogin || (!formData_1.value && transactionType === 1)"
            @change="setPerNumber"
          />
          <div v-if="transactionType === 1 && isLogin" class="volume-trade b-2-cl a-4-bg">
            <span class="dealMoney">
              <!-- 交易额: -->
              {{$t('trade5.dealAmount')}}
            </span>
            <span class="vol"
                  v-if="tradeVolumeBuy !== '--'">
                  {{tradeVolumeBuy}}
            </span>
            <span class="units">
              {{symbolUnit.units | getCoinShowName(coinList)}}
            </span>
          </div>
          <div v-if="!isLogin" class="loginOrReg a-4-bg b-1-cl">
            <span class="b-4-cl" @click="toLogin('login')">{{$t('login.login')}}</span>
            {{$t('trade5.or')}}
            <span class="b-4-cl" @click="toLogin('register')">{{$t('login.goRegister')}}</span>
          </div>
          <c-button
            v-else
            :defaultColorClass = 'buttosContent.buyButton.class'
            :hoverColorClass = 'buttosContent.buyButton.class'
            :activeColorClass = 'buttosContent.buyButton.class'
            @click="submit('BUY')"
            width="100%">
            {{buttosContent.buyButton.text}}
          </c-button>
        </div>
      </div>
      <div v-if="!proTrade || orderType === 'sell'" class="trade-block">
        <div class="form-block">
          <div class="top-mag">
            <span v-if="!proTrade" class="trade-type b-1-cl">
            <!-- 卖出 -->
              {{$t('trade.sell')}}
              {{symbolUnit.symbol | getCoinShowName(coinList)}}
            </span>
            <span class="lov b-1-cl">
              <svg class="icon icon-14" aria-hidden="true">
                <use xlink:href="#icon-b_19"></use>
              </svg>
              {{currenTaccount.symbolAccoubt}}
              {{symbolUnit.symbol | getCoinShowName(coinList)}}
            </span>
          </div>
          <trade-input
            v-model="formData_3.value"
            @onChanes = "onChaneForm"
            name="formData_3"
            :fixValue = 'fixValue.priceFix'
            :datas="formData_3"/>
          <trade-input
            v-model="formData_4.value"
            @onChanes = "onChaneForm"
            name="formData_4"
            :fixValue = 'fixValue.volumeFix'
            :datas="formData_4"/>
          <Progress
            name="sell"
            :disabled="!isLogin"
            :curPercent="perSell"
            @change="setPerNumber"
            :bgClass="'a-19-bg'"
            :bdClass="'a-19-bd'" />
          <div v-if="transactionType === 1 && isLogin" class="volume-trade b-2-cl a-4-bg">
            <span class="dealMoney">
              <!-- 交易额: -->
              {{$t('trade5.dealAmount')}}
            </span>
            <span class="vol b-1-cl"
                  v-if="tradeVolumeSell !== '--'">
                  {{tradeVolumeSell}}
            </span>
            <span class="units">{{symbolUnit.units | getCoinShowName(coinList)}}</span>
          </div>
          <div v-if="!isLogin" class="loginOrReg a-4-bg b-1-cl">
            <span class="b-4-cl" @click="toLogin('login')">{{$t('login.login')}}</span>
            {{$t('trade5.or')}}
            <span class="b-4-cl" @click="toLogin('register')">{{$t('login.goRegister')}}</span>
          </div>
          <c-button
            v-else
            :defaultColorClass = 'buttosContent.sellButton.class'
            :hoverColorClass = 'buttosContent.sellButton.class'
            :activeColorClass = 'buttosContent.sellButton.class'
            @click="submit('SELL')"
            width="100%">
            {{buttosContent.sellButton.text}}
          </c-button>
        </div>
      </div>
    </div>
    <div v-if="proTrade && isLogin" class="lever-assets">
      <h6>
        <span class="b-1-cl">{{$t('header.assets')}}</span>
        <span class="coin-label a-12-cl a-12-bd">{{symbolItem.multiple}}X</span>
      </h6>
      <div class="operation">
        <c-button
          @click="buttonsEvent('1')"
          width="100px"
          height="30px"
          :defaultColorClass="'b-1-cl a-4-bg'"
          :hoverColorClass="'b-1-cl u-8-bg'"
          :activeColorClass="'b-1-cl u-8-bg'"
        >{{$t('lever.leverHz')}}</c-button>
        <c-button
          @click="buttonsEvent('2')"
          width="100px"
          height="30px"
          :defaultColorClass="'b-1-cl a-4-bg'"
          :hoverColorClass="'b-1-cl u-8-bg'"
          :activeColorClass="'b-1-cl u-8-bg'"
        >{{$t('trade5.lever.step2')}}</c-button>
        <c-button
          @click="buttonsEvent('3')"
          width="100px"
          height="30px"
          :defaultColorClass="'b-1-cl a-4-bg'"
          :hoverColorClass="'b-1-cl u-8-bg'"
          :activeColorClass="'b-1-cl u-8-bg'"
        >{{$t('trade5.lever.step3')}}</c-button>
      </div>
      <div v-if="financeData" class="risk-info">
        <img class="riskImg" :src="riskRateImg" alt="">
        <span
          class="risk"
          @mouseenter="showRiskTip = true"
          @mouseleave="showRiskTip = false"
        >
          {{$t('lever.fxl')}}
          <c-tipPop :show="showRiskTip" posX="left">
            <p>
              <!-- 总资产/借贷资产*100% -->
              {{$t('lever.leverText1')}}
            </p>
            <p>
              <!-- 当风险率≤110%时，账户将触发爆仓以归还借贷资金 -->
              {{$t('lever.leverText2')}}
            </p>
          </c-tipPop>
        </span>
        <span class="riskRate" :style="{color: riskRateColor}">
          {{financeData.riskRate ? financeData.riskRate + '%' : '--'}}
        </span>
      </div>
      <ul v-if="financeData">
        <li>
          <span class="b-2-cl">
            {{$t('contract.cw')}}[{{financeData.baseCoin | getCoinShowName(coinList)}}]
          </span>
          <span class="b-1-cl">{{baseBalance}}</span>
        </li>
        <li>
          <span class="b-2-cl">
            {{$t('contract.cw')}}[{{financeData.quoteCoin | getCoinShowName(coinList)}}]
          </span>
          <span class="b-1-cl">{{quoteBalance}}</span>
        </li>
      </ul>
    </div>
    <!-- 借贷弹框 -->
    <c-dialog
      :showFlag="isShowDialog"
      paddingBottom="14px"
      :confirmDisabled = "confirmDisabled"
      :confirmLoading = "confirmLoading"
      @close="dialogClose"
      @confirm="dialogConfirm"
      :titleText="''">
      <div class="loan-header">
        <div
          class="tab"
          :class="{'b-1-cl': loanTab === 1 || loanTabHover === 1}"
          @mouseenter="loanTabHover = 1"
          @mouseout="loanTabHover = null"
          @click="loanTabChange(1)"
        >
        <!-- 借款 -->
          {{$t('trade5.lever.step2')}}
        </div>
        <!-- 还款 -->
        <!-- <div
          class="tab"
          :class="{'b-1-cl': loanTab === 2 || loanTabHover === 2}"
          @mouseenter="loanTabHover = 2"
          @mouseout="loanTabHover = null"
          @click="loanTabChange(2)"
        >
          {{$t('trade5.lever.step3')}}
        </div> -->
        <!-- <div
          class="tab-line a-12-bg"
          :style="{left: (loanTab-1) * 82 + 35 + 'px'}"
        ></div> -->
      </div>
      <div class="form-info" v-if="financeData">
        <div class="loan-symbol">
          <div class="coin-title">{{$t('trade.transaction')}}</div>
          <c-select
            :value="loanSymbol"
            :options="loanSymbolOption"
          />
        </div>
        <div class="loan-coin">
          <div class="coin-title">{{$t('futures.transfer.coin')}}</div>
          <c-select
            :value="borrowType"
            :options="loanOptions"
            @onChanges="loanCoinChange"
          />
        </div>
        <ul class="loan-info" v-if="loanTab === 1">
          <li>
            <span>{{$t('lever.leverLl')}}:</span>
            <span class="b-1-cl">{{financeData.rate | rateFix}}</span>
          </li>
          <li>
            <span>{{$t('lever.leverYj')}}</span>
            <span class="b-1-cl">
              <template v-if="borrowType === 'Base'">{{financeData.baseBorrowBalance}}</template>
              <template v-else>{{financeData.quoteBorrowBalance}}</template>
            </span>
          </li>
          <li>
            <span>{{$t('lever.leverZded')}}</span>
            <span class="b-1-cl">
              <template v-if="borrowType === 'Base'">{{financeData.baseTotalBorrow}}</template>
              <template v-else>{{financeData.quoteTotalBorrow}}</template>
            </span>
          </li>
        </ul>
        <ul class="loan-info" v-else>
          <li>
            <span>{{$t('lever.leverLl')}}:</span>
            <span class="b-1-cl">{{financeData.rate | rateFix}}</span>
          </li>
          <li>
            <span>{{$t('lever.leverYj')}}</span>
            <span class="b-1-cl">
              <template v-if="borrowType === 'Base'">{{financeData.baseBorrowBalance}}</template>
              <template v-else>{{financeData.quoteBorrowBalance}}</template>
            </span>
          </li>
          <li>
            <span>{{$t('lever.leverZded')}}</span>
            <span class="b-1-cl">
              <template v-if="borrowType === 'Base'">{{financeData.baseTotalBorrow}}</template>
              <template v-else>{{financeData.quoteTotalBorrow}}</template>
            </span>
          </li>
          <li>
            <span>{{$t('lever.leverZded')}}</span>
            <span class="b-1-cl">
              <template v-if="borrowType === 'Base'">{{financeData.baseTotalBorrow}}</template>
              <template v-else>{{financeData.quoteTotalBorrow}}</template>
            </span>
          </li>
        </ul>
      </div>
      <div>
        <c-inputLine
          name="borrowValue"
          :value="borrowValue"
          :promptText="$t('trade.number')"
          :errorHave="false"
          :errorText="$t('trade.number')"
          :errorFlag="borrowErrorFlag"
          @onchanges="inputChanges">
          <span
            class='delete-icon'
            @click='clear'
            @mouseover="isDeleteHover = true"
            @mouseout="isDeleteHover = false"
            v-show='borrowValue'
          >
            <img
              v-show="isDeleteHover"
              src="http://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20210818105609762.png" alt="" />
            <img
              v-show="!isDeleteHover"
              src="http://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20210818105625849.png" alt="" />
          </span>
          <c-button type="text"
              className="logBtn"
              @click="buttonsEvent('All')">
            <!-- 全部 -->
            {{$t('lever.all')}}
          </c-button>
        </c-inputLine>
        <p class="borrow" v-if="financeData">
          <!-- 可借 -->
          {{$t('lever.leverKj')}}
          <template v-if="borrowType === 'Base'">{{ setFex(financeData.baseCanBorrow)}}</template>
          <template v-else>{{setFex(financeData.quoteCanBorrow)}}</template>
        </p>
      </div>
      <div class="percent-select">
        <span
          v-for="(item, index) in perArr"
          :key="'per' + index"
          class="percent-item a-2-bd b-2-cl"
          :class="{'b-4-cl b-4-bd': perSelect === item || perHover === index}"
          @mouseenter="perHover = index"
          @mouseleave="perHover = null"
          @click="selectPercent(item)"
        >
          {{item}}%
        </span>
      </div>
    </c-dialog>
    <!-- 划转 -->
    <leverageTransfer @success="transferSuccess"/>
    <!-- 温馨提示 -->
    <c-alert :showFlag="alertFlag"
      @close="alertClone"
      imageType= "1"
      :imgMap="imgMap"
      :colorMap="colorMap"
      :buttonText= "$t('lever.hzBtntext')"
      @confirm="confirmFun">
      <!-- 温馨提示 -->
      <div class="alertTitle b-1-cl">
        <!-- 温馨提示 -->
        {{$t('lever.alertTitle')}}
      </div>
      <!-- 您的BCH/USDT杠杆账户余额不足，需转入资产方可进行杠杆交易。-->
      <div class="alertText">{{$t('lever.your')}}{{symbolCurrent}}{{$t('lever.alertTet')}}</div>
    </c-alert>

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
import mixin from 'BlockChain-ui/PC/common-mixin/modules/newTrade/tradeForm/lever-tradeForm/lever-tradeForm';
import 'BlockChain-ui/PC/common-mixin/modules/newTrade/tradeForm/lever-tradeForm/lever-tradeForm.styl';
import leverageTransfer from './leverageTransfer.vue';
import tradeInput from './tradeInput.vue';
import Progress from './progress.vue';

export default {
  mixins: [mixin],
  components: {
    tradeInput,
    leverageTransfer,
    Progress,
  },
  mounted() {
    this.init();
  },
  // 组价离开前执行
  beforeDestroy() {
    clearInterval(this.assetsInter);
  },
};
</script>
