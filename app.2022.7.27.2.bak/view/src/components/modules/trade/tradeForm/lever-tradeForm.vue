<!-- 币币交易 24小时行情 -->
<template>
  <div class="trade-box lever-tradeForm b-2-cl">
    <div class="title-block a-21-bg a-3-bd title-block-op" v-if="isLogin">
      <div class="lever-assets">
        <span class="b-1-cl">
          {{$t('lever.leverAccount')}}
          ({{symbolCurrent | getCoinShowName(symbolAll)}})
          <svg class="sjicon icon icon-14" aria-hidden="true">
            <use xlink:href="#icon-a_13"></use>
          </svg>
        </span>
        <div class="assets-box a-21-bg" v-if="financeData">
          <ul>
            <li class="list">
              <p class="item">
                <!-- 可用 -->
                {{$t('lever.leverKy')}}
                <span class="b-1-cl">
                  {{financeData.baseNormalBalance}}
                  {{financeData.baseCoin | getCoinShowName(coinList)}}
                </span>
              </p>
              <p class="item">
                <!-- 可用 -->
                {{$t('lever.leverKy')}}
                <span class="b-1-cl">
                  {{financeData.quoteNormalBalance}}
                  {{financeData.quoteCoin | getCoinShowName(coinList)}}
                </span>
              </p>
            </li>
            <li class="list">
              <p class="item">
                <!-- 可借 -->
                {{$t('lever.leverKj')}}
                <span class="b-1-cl">
                  {{financeData.baseCanBorrow}}
                  {{financeData.baseCoin | getCoinShowName(coinList)}}
                </span>
              </p>
              <p class="item">
                <!-- 可借 -->
                {{$t('lever.leverKj')}}
                <span class="b-1-cl">
                  {{financeData.quoteCanBorrow}}
                  {{financeData.quoteCoin | getCoinShowName(coinList)}}
                </span>
              </p>
            </li>
            <li class="list">
              <p class="item">
                <!-- 已借 -->
                {{$t('lever.leverYj')}}
                <span class="b-1-cl">
                  {{financeData.baseBorrowBalance}}
                  {{financeData.baseCoin | getCoinShowName(coinList)}}
                </span>
              </p>
              <p class="item">
                <!-- 已借 -->
                {{$t('lever.leverYj')}}
                <span class="b-1-cl">
                  {{financeData.quoteBorrowBalance}}
                  {{financeData.quoteCoin | getCoinShowName(coinList)}}
                </span>
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div class="bc-infor"  v-if="financeData">
        <div class="lever-line">
          {{financeData.riskRate ? financeData.riskRate + '%' : '--'}}
          <div class="line"></div>
        </div>
        <div class="risk">
          <!-- 风险率 -->
          {{$t('lever.fxl')}}
          <svg class="icon icon-14" aria-hidden="true">
            <use xlink:href="#icon-a_15"></use>
          </svg>
          <div class="risk-text a-21-bg b-1-cl">
            <p>
              <!-- 总资产/借贷资产*100% -->
              {{$t('lever.leverText1')}}
            </p>
            <p>
              <!-- 当风险率≤110%时，账户将触发爆仓以归还借贷资金 -->
              {{$t('lever.leverText2')}}
            </p>
          </div>
        </div>
        <div class="bc-price">
          <!-- 爆仓价 -->
          {{$t('lever.bcj')}}
          <span class="b-1-cl">
            {{financeData.burstPrice}}
            {{financeData.quoteCoin | getCoinShowName(coinList)}}
          </span>
        </div>
      </div>
    </div>
    <div class="title-block a-21-bg a-3-bd">
      <span class="tab"
        @click="switchTradeType(1)"
        :class="{'a-12-bd b-1-cl': transactionType === 1}">
        <!-- 限价交易 -->
        {{$t('trade.limitPriceTrade')}}
      </span>
      <span class="tab"
        @click="switchTradeType(2)"
        :class="{'a-12-bd b-1-cl': transactionType === 2}">
        <!-- 市价交易 -->
        {{$t('trade.marketPriceTrade')}}
      </span>
      <div class="total-assets" v-if="isLogin">
        <c-button type="text"
                className="logBtn"
                @click="buttonsEvent('1')">
          <!-- 划转 -->
          {{$t('lever.leverHz')}}
        </c-button>
        <c-button type="text"
                className="logBtn"
                @click="buttonsEvent('2')">
          <!-- 借贷 -->
          {{$t('lever.leverJd')}}
        </c-button>
      </div>
    </div>
    <div class="trade-form clearfix">
      <div class="trade-block">
        <div class="form-block">
          <div class="top-mag">
            <span class="trade-type">
              <!-- 买入 -->
              {{$t('trade.buy')}}
              {{symbolUnit.symbol | getCoinShowName(coinList)}}
            </span>
            <span class="lov b-1-cl">
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
          <div class="percentage">
            <span
              v-for="(item, index) in perArr"
              :key="index + 'buy'"
              :class="perBuyClass(item)"
              @click="setPerNumber('buy', item)"
              class="per-item">{{item}}%</span>
          </div>
          <div class="volume-trade">
            <div v-if="transactionType === 1">
              <!-- 交易额: -->
              {{$t('trade.dealMoney')}}
              <span class="vol"
                    v-if="tradeVolumeBuy !== '--'">
                    {{tradeVolumeBuy}}
                    {{symbolUnit.units | getCoinShowName(coinList)}}
              </span>
            </div>
          </div>
          <c-button
            :defaultColorClass = 'buttosContent.buyButton.class'
            :hoverColorClass = 'buttosContent.buyButton.class'
            :activeColorClass = 'buttosContent.buyButton.class'
            @click="submit('BUY')"
            width="100%">
            {{buttosContent.buyButton.text}}
          </c-button>
        </div>
      </div>
      <div class="trade-block">
        <div class="form-block">
          <div class="top-mag">
            <span class="trade-type">
            <!-- 卖出 -->
              {{$t('trade.sell')}}
              {{symbolUnit.symbol | getCoinShowName(coinList)}}
            </span>
            <span class="lov b-1-cl">
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
          <div class="percentage">
            <span
              v-for="(item, index) in perArr"
              :key="index + 'sell'"
              @click="setPerNumber('sell', item)"
              class="per-item"
              :class="perSellClass(item)">{{item}}%</span>
          </div>
          <div class="volume-trade">
            <div v-if="transactionType === 1">
              <!-- 交易额: -->
              {{$t('trade.dealMoney')}}
              <span class="vol"
                    :class="volumeTradeClass(tradeVolumeSell, currenTaccount.symbolAccoubt)"
                    v-if="tradeVolumeSell !== '--'">
                    {{tradeVolumeSell}}
                    {{symbolUnit.units | getCoinShowName(coinList)}}
              </span>
            </div>
          </div>
          <c-button
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
    <!-- 借贷弹框 -->
    <c-dialog
      :showFlag="isShowDialog"
      paddingBottom="14px"
      :confirmDisabled = "confirmDisabled"
      :confirmLoading = "confirmLoading"
      @close="dialogClose"
      @confirm="dialogConfirm"
      :titleText="confirmFormTitle">
      <div class="form-info" v-if="financeData">
        <div class="info-item a-4-bg">
          <div class="radio">
            <span class="b-1-cl" @click="setReviseType('Base', financeData.baseCoin)">
              <c-redio :value="borrowType === 'Base'" />
              {{financeData.baseCoin | getCoinShowName(coinList)}}
            </span>
            <span class="b-1-cl" @click="setReviseType('Quote', financeData.quoteCoin)">
              <c-redio :value="borrowType === 'Quote'" />
              {{financeData.quoteCoin | getCoinShowName(coinList)}}
            </span>
          </div>
        </div>
        <div class="info-item a-4-bg">
          <p class="text1">
            <!-- 已借 -->
            {{$t('lever.leverYj')}}
          </p>
          <p class="text2 b-1-cl">
            <template v-if="borrowType === 'Base'">{{financeData.baseBorrowBalance}}</template>
            <template v-else>{{financeData.quoteBorrowBalance}}</template>
          </p>
        </div>
        <div class="info-item a-4-bg">
          <p class="text1">
            <!-- 最大额度 -->
            {{$t('lever.leverZded')}}
          </p>
          <p class="text2 b-1-cl">
            <template v-if="borrowType === 'Base'">{{financeData.baseTotalBorrow}}</template>
            <template v-else>{{financeData.quoteTotalBorrow}}</template>
          </p>
        </div>
        <div class="info-item a-4-bg">
          <p class="text1">
            <!-- 利率 -->
            {{$t('lever.leverLl')}}
            <span class="rateIcon">
              [?]
              <div class="iconMark a-21-bg b-1-cl">
                <!-- 利率是申请借贷时系统收取利息的比例，利息是按照24小时计息 -->
                {{ $t('assets.leverageToLoan.rateMark') }}
              </div>
            </span>
          </p>
          <p class="text2 b-1-cl">
            {{financeData.rate | rateFix}}
          </p>
        </div>
      </div>
      <div class="inline-input">
        <c-inputLine
          name="borrowValue"
          :value="borrowValue"
          :promptText="borrowPromptText"
          :errorHave="false"
          :errorText="borrowErrorText"
          :errorFlag="borrowErrorFlag"
          @onchanges="inputChanges">
          <!-- 获取验证码 -->
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
import mixin from 'BlockChain-ui/PC/common-mixin/modules/trade/tradeForm/lever-tradeForm/lever-tradeForm';
import 'BlockChain-ui/PC/common-mixin/modules/trade/tradeForm/lever-tradeForm/lever-tradeForm.styl';
import leverageTransfer from '@/views/assets/leverageTransfer.vue';
import tradeInput from './tradeInput.vue';

export default {
  mixins: [mixin],
  components: {
    tradeInput,
    leverageTransfer,
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
