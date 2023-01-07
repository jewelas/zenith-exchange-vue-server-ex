<!-- 币币交易 24小时行情 -->
<template>
  <div class="co-trade-box e-2-cl">
    <div class="title-block a-21-bg a-3-bd">
      <span class="tab"
        @click="switchTradeType(1)"
        :class="{'a-12-bd b-1-cl': transactionType === 1}">
        <!-- 限价交易 -->
        {{$t('contract.limitPriceTrade')}}
      </span>
      <span class="tab"
        @click="switchTradeType(2)"
        :class="{'a-12-bd b-1-cl': transactionType === 2}">
        <!-- 市价交易 -->
        {{$t('contract.marketPriceTrade')}}
      </span>
    </div>
    <div class="trade-form">
      <div class="form-block">
        <!-- 价格 -->
        <trade-input
          v-model="contractPrice.value"
          :fixValue = 'pricePrecision'
          @onChanes = "onChaneForm"
          name="contractPrice"
          :datas="contractPrice"/>
        <!-- 仓位数量 -->
        <trade-input
          v-model="contractNUmber.value"
          :fixValue = 'formData2Fix'
          @onChanes = "onChaneForm"
          name="contractNUmber"
          :datas="contractNUmber"/>
          <c-button
          v-if = "!isLogin"
          :defaultColorClass = 'buttosContent.buyButton.class'
          :hoverColorClass = 'buttosContent.buyButton.class'
          :activeColorClass = 'buttosContent.buyButton.class'
          @click="submitForm('BUY')"
          :disabled = '!isSubmitOk'
          paddingW= "10px"
          width="270px">
          {{buttosContent.buyButton.text}}
        </c-button>
        <template v-else>
          <c-button
            :defaultColorClass = 'buttosContent.buyButton.class'
            :hoverColorClass = 'buttosContent.buyButton.class'
            :activeColorClass = 'buttosContent.buyButton.class'
            @click="submitForm('BUY')"
            :disabled = '!isSubmitOk'
            paddingW= "10px"
            width="126px">
            {{buttosContent.buyButton.text}}
          </c-button>
          <c-button
            :defaultColorClass = 'buttosContent.sellButton.class'
            :hoverColorClass = 'buttosContent.sellButton.class'
            :activeColorClass = 'buttosContent.sellButton.class'
            @click="submitForm('SELL')"
            :disabled = '!isSubmitOk'
            paddingW= "10px"
            width="126px">
            {{buttosContent.sellButton.text}}
          </c-button>
        </template>
        <p class="prime">
          <span class="p_l">
            <!-- 成本 -->
            {{$t('contract.cost')}}
            {{buyOrderCost}} BTC
          </span>
          <span class="p_r">
            <!-- 成本 -->
            {{$t('contract.cost')}}
            {{sellOrderCost}} BTC
          </span>
        </p>

        <div class="top-mag">
          <span class="trade-type">
            <!-- 委托价值 -->
            {{$t('contract.orders')}}
          </span>
          <span class="lov b-1-cl">
            {{orderPriceValue}} BTC
          </span>
        </div>
        <div class="top-mag">
          <span class="trade-type">
            <!-- 可用余额 -->
            {{$t('contract.balance')}}
          </span>
          <span class="lov b-1-cl">
            {{canUseBalance}} BTC
          </span>
        </div>
      </div>
    </div>
    <div class="title-block a-21-bg no-border">
      <span class="b-1-cl">
        <!-- 持仓仓位 -->
        {{$t('contract.chiccw')}}
        ({{marketCurrent}})
      </span>
    </div>
    <div class="account-info">
      <div class="top-mag" v-if="is_more_position === 1">
        <!-- 仓位ID -->
        <span class="trade-type">
          <!-- 仓位ID -->
          {{$t('contract.accounttId'),}}
        </span>
        <span class="lov b-1-cl">
          <i v-if="currentOrderData">{{currentOrderData.id}}</i>
          <i v-else>--</i>
        </span>
      </div>
      <div class="top-mag">
        <span class="trade-type">
          <!-- 合约 -->
          {{$t('contract.co2')}}
        </span>
        <span class="lov b-1-cl">
          <i v-if="currentOrderData">{{currentOrderData.volume}}</i>
          <i v-else>--</i>
        </span>
      </div>
      <div class="top-mag">
        <span class="trade-type">
          <!-- 回报率 -->
          {{$t('contract.rate')}}
        </span>
        <span class="lov b-1-cl">
          <i v-if="currentOrderData">{{currentOrderData.unrealisedRateIndex}}%</i>
          <i v-else>--</i>
        </span>
      </div>
      <div class="top-mag">
        <span class="trade-type">
          <!-- 开仓价格 -->
          {{$t('contract.entryPrice')}}
        </span>
        <span class="lov b-1-cl">
          <i v-if="currentOrderData">{{currentOrderData.avgPrice}}</i>
          <i v-else>--</i>
        </span>
      </div>
      <div class="top-mag">
        <span class="trade-type">
          <!-- 强平价格 -->
          {{$t('contract.liquidationPrice')}}
        </span>
        <span class="lov b-1-cl">
          <i v-if="currentOrderData">{{currentOrderData.liquidationPrice}}</i>
          <i v-else>--</i>
        </span>
      </div>
      <div class="top-mag percentage-mag">
        <span class="trade-type">
          <!-- 杠杆倍数 -->
          {{$t('contract.multipleb')}}
        </span>
      </div>
      <!-- 杠杆 -->
      <lever-component
        :level="definiteLevel"
        :levelList = "levelList"
        :levelSwitch = "levelSwitch"
        @levelChange="onChangelevel" />
    </div>
    <c-dialog
      :showFlag="dialogFlag"
      paddingBottom="14px"
      :confirmLoading="!isSubmitOk"
      @close="dialogClose"
      @confirm="dialogConfirm"
      :titleText="confirmFormTitle">
      <div class="form-info">
        <div class="info-item a-4-bg" v-if="symbolCurrentInfo">
          <p class="price c-1-cl" :class="priceClass">
            <span v-if="transactionType === 1">{{contractPrice.value}} {{pricingUnits.pri}}</span>
            <span v-else>
              <!-- 市价 -->
              {{$t('contract.marketPrice')}}
            </span>
          </p>
          <p class="name b-1-cl">{{marketCurrent}}</p>
          <p class="text3 b-1-cl">
            {{symbolCurrentInfo.typeName}}
          </p>
        </div>
        <div class="info-item a-4-bg">
          <p class="text1">
            <!-- 可用余额 -->
            {{$t('contract.balance')}}
          </p>
          <p class="text2 b-1-cl">{{canUseBalance}}</p>
        </div>
        <div class="info-item a-4-bg">
          <p class="text1">
            <!-- 标记价格 -->
            {{$t('contract.bjPrice')}}
          </p>
          <p class="text2 b-1-cl">{{tagPrice}}</p>
        </div>
        <div class="info-item a-4-bg">
          <p class="text1">
            <!-- 预估爆仓价 -->
            {{$t('contract.liquidationPriceTwo')}}
          </p>
          <p class="text2 b-1-cl">
            <template v-if="formType === 'BUY'">
              {{liquidationBuyPrice}}
            </template>
            <template v-else>
              {{liquidationSellPrice}}
            </template>

          </p>
        </div>
        <div class="info-item a-4-bg">
          <p class="text1">
            <!-- 价值 -->
            {{$t('contract.value')}}
          </p>
          <p class="text2 b-1-cl">{{orderPriceValue}}</p>
        </div>
        <div class="info-item a-4-bg">
          <p class="text1">
            <!-- 成本 -->
            {{$t('contract.cost')}}
          </p>
          <p v-if="formType === 'BUY'" class="text2 b-1-cl">{{buyOrderCost}}</p>
          <p v-else class="text2 b-1-cl">{{sellOrderCost}}</p>
        </div>
      </div>
      <p class="chiccw">{{$t('contract.chiccw')}}</p>
      <!-- 杠杆 -->
      <lever-component
        :level="definiteLevel"
        :levelList = "levelList"
        :levelSwitch = "levelSwitch"
        @levelChange="onChangelevel" />
    </c-dialog>
    <p v-if="!coBase"></p>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/modules/coTrade/tradeForm/tradeForm';
import 'BlockChain-ui/PC/common-mixin/modules/coTrade/tradeForm/tradeForm.styl';
import tradeInput from './tradeInput.vue';
import leverComponent from './lever.vue';

export default {
  mixins: [mixin],
  components: {
    tradeInput,
    leverComponent,
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
