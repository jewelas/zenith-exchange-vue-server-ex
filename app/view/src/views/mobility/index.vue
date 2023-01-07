<template>
  <section class="page-mobility page-mobility-container ">
    <!-- 选择币种 -->
    <div class="mobility-sideNav a-3-bd a-5-bg">
      <c-navTab
        activeClassName="b-1-cl"
        activeColor="a-12-bg"
        className="b-2-cl"
        :currentTab="sideTab"
        :navTab="sideList"
        lineHeight="40"
        marginRight="64"
        @currentType="sideChange"
      />
      <div class="sideNav-warn">
        <!-- 参考单价 -->
        {{ $t('mobilityTrade.referencePrice') }}
        <span class="sideNav-page-icon">
          <svg class="icon icon-14" aria-hidden="true">
            <use xlink:href="#icon-a_15"></use>
          </svg>
          <div class="sideNav-page-market a-4-bg">
            <!-- 该价格参考市场主流交易所主流币对计算得出，非最终成交价，仅供参考 -->
            {{ $t('mobilityTrade.referenceWarn') }}
          </div>
        </span>
         ：{{ consultPrice }} {{ legal }}/{{ coin }}
      </div>
    </div>
    <div class="mobility-content a-5-bg">
      <!-- 选择币种 / 法币币种 -->
      <div class="mobility-content-condition clearfix">
        <div class="mobility-content-coin">
          <!-- 币种 -->
          <c-inputLine
            :promptText="$t('mobilityTrade.coin')"
            :value="coin"
            :disabled="true"/>
        </div>
        <div class="mobility-content-legal">
          <!-- 法币币种 -->
          <c-inputLine
            :promptText="$t('mobilityTrade.legal')"
            :value="legal"
            :disabled="true"/>
        </div>
      </div>
      <!-- 选择交易类型 / 输入内容 -->
      <div class="mobility-content-inputValue">
        <div class="mobility-tradeType">
          <span class="mobility-tradeType-even"
            :class="tradeType === '1' ? 'b-1-cl' : ''"
            @click="setTradeType('1')">{{ priceText }}</span>
          <span class="mobility-tradeType-line">|</span>
          <span class="mobility-tradeType-even"
            :class="tradeType === '2' ? 'b-1-cl' : ''"
            @click="setTradeType('2')">{{ valueText }}</span>
        </div>
        <c-inputLine
          :errorHave="true"
          :errorText="errorObj.text"
          :errorFlag="errorObj.showError"
          :value="tradeValue"
          @onchanges="inputChanges">
          <span class="inputCoin">
            {{inputCoin}}
          </span>
          <!-- 全部 -->
          <c-button
            v-if="side === 'SELL'"
            className="btnAll"
            type="text"
            marginTop="-1px"
            @click="allClick">{{ $t('mobilityTrade.all') }}</c-button>
        </c-inputLine>
      </div>
      <!-- 选择付款方式 -->
      <div class="mobility-content-pays" v-if="side === 'BUY'">
        <!-- 选择付款方式 -->
        <div class="pays-Title">{{ $t('mobilityTrade.buyPayments') }}</div>
        <ul class="buy-pays-list clearfix">
          <li class="h-3-bg x-1-cl "
            v-for="(item, index) in buyPayments"
            :class="buyPayActive === item.key ? 'a-12-bd' : 'h-3-bd'"
            :key="index"
            @click="buyPaymentsChange(item.key)">
            <svg class="icon icon-16 activeIcon"
              v-if="buyPayActive === item.key"
              aria-hidden="true">
              <use xlink:href="#icon-c_20"></use>
            </svg>
            {{ item.title }}
          </li>
        </ul>
      </div>
      <!-- 选择收款方式 -->
      <div class="mobility-content-pays" v-if="side === 'SELL'">
        <div class="pays-Title">
          <!-- 选择收款方式 -->
          {{ $t('mobilityTrade.sellPayments') }}
          <!-- 添加收款方式 -->
          <c-button type="text" className="addBtn"
           @click="add">{{ $t('mobilityTrade.addPayments') }}</c-button>
        </div>
        <ul class="sell-pays-list" v-if="sellPayments.length">
          <li v-for="(item, index) in sellPayments"
            :key="index">
            <div class="sell-pays-head">
              <c-redio :value="sellPayActive === item.payment"
                @click="sellPaymentsChange(item.payment)"/>
              <span class="f-1-cl sell-pays-title"
                @click="sellPaymentsChange(item.payment)">{{ item.title }}</span>
            </div>
            <div class="sell-pays-message">
              <span v-if="item.payment === 'otc.payment.alipay'
                || item.payment === 'otc.payment.wxpay'">
                {{item.userName}} {{item.account}}
              </span>
              <span v-else>
                {{item.userName}} {{item.account}} {{item.bankName}} {{item.bankOfDeposit}}
              </span>
            </div>
          </li>
        </ul>
        <div class="sell-pays-add" v-else>
          <!-- 没有收款方式，请前往个人中心设置 -->
          <c-button type="text"
            @click="add">{{ $t('mobilityTrade.noPayments') }}</c-button>
        </div>
      </div>
      <!-- 支付详情 -->
      <ul class="mobility-message">
        <li class="clearfix">
          <!-- 成交单价 -->
          <span class="key">{{ $t('mobilityTrade.tradePrice') }}</span>
          <span class="value f-1-cl">
            <span v-if="dealLoading"><c-loading size="14"/></span>
            <span v-else :class="dealObj.priceClass">
              {{ dealObj.price }}</span>
          </span>
        </li>
        <li class="clearfix">
          <!-- 成交数量 -->
          <span class="key">{{ $t('mobilityTrade.tradeVolume') }}</span>
          <span class="value f-1-cl">{{ dealObj.value }}</span>
        </li>
        <li class="clearfix">
          <!-- 实付金额 -->
          <span class="key">{{ $t('mobilityTrade.tradeSum') }}</span>
          <span class="value f-1-cl">{{ dealObj.sum }}</span>
        </li>
      </ul>
      <!-- 提交按钮 -->
      <c-button  marginTop="20px"
        :disabled="btnObj.disbaled"
        :loading="btnObj.disbaled ? false : btnLoading"
        :defaultColorClass="btnObj.class"
        :hoverColorClass="btnObj.class"
        :activeColorClass="btnObj.class"
        @click="btnClick">
        {{ btnObj.text }}
        {{ btnObj.showTime ?  `(${axiosTime})` : `` }}
      </c-button>
      <div class="mobility-warn">
        <svg class="icon icon-16" aria-hidden="true" style="marginRight: 10px">
          <use xlink:href="#icon-c_2"></use>
        </svg>
        <span class="text b-7-cl">
          <!-- 由于市场行情波动，为您匹配出的价格可能会发生小幅波动，请您尽快下单及时锁定价格！ -->
          {{ $t('mobilityTrade.warn') }}
        </span>
      </div>
    </div>
  </section>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/mobility/mobility';
import 'BlockChain-ui/PC/common-mixin/mobility/mobility.styl';

export default {
  mixins: [mixin],
};
</script>
