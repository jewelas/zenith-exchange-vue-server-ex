<template>
<div class="otcDetailOrder-header a-3-bd">
  <!-- 步骤条 -->
  <section class="otcDetailOrder-bar">
    <div class="bar-page" v-for="(item, index) in domArr" :key="index">
      <span class="bar-page-ball" :class="item.class"
            style="color: #EDF4F8 !important;">{{ index+ 1 }}</span>
      <span class="bar-page-text">{{ item.text }}</span>
      <div class="bar-line a-4-bg"></div>
    </div>
  </section>
  <!-- 描述文字 -->
  <div class="otcDetailOrder-text" v-if="isReady">
    <!-- 买 1 -->
    <div v-if="status === '1' && commonData.side === 'BUY'">
      <!-- 待付款 -->
      <span class="b-7-cl Conspicuous">{{ $t('otcDetailOrder.PendingPayment') }}</span>&nbsp;
      <!-- 付款倒计时 -->
      <span class="b-1-cl info">{{ $t('otcDetailOrder.CountdownPayments') }}：</span>
      <span class="b-7-cl Conspicuous">{{timer}}</span>
    </div>
    <!-- 卖 1 -->
    <div v-if="status === '1' && commonData.side === 'SELL'">
      <!-- 等待对方支付 倒计时 -->
      <span class="b-1-cl info">{{ $t('otcDetailOrder.WaitingCountdownPayment') }}：</span>
      <span class="b-7-cl Conspicuous">{{timer}}</span>
    </div>
    <!-- 买 2 -->
    <div v-if="status === '2' && commonData.side === 'BUY'">
      <!-- 待收币 -->
      <span class="b-7-cl Conspicuous">{{ $t('otcDetailOrder.MoneyCollected') }}</span>&nbsp;
      <!-- 待对方确认收款并放币后，您将收到对应的金额 -->
      <span class="b-1-cl info">{{ $t('otcDetailOrder.MoneyCollectedWarning') }}</span>
    </div>
    <!-- 卖 2 -->
    <div v-if="status === '2' && commonData.side === 'SELL'">
      <span class="b-1-cl info">
        <!-- 对方已支付 -->
        {{ $t('otcDetailOrder.otherPartyPaid1') }}
        <!-- 标记为 -->
        {{ $t('otcDetailOrder.otherPartyPaid2') }}
         {{payText}}
        {{ $t('otcDetailOrder.otherPartyPaid3') }}
         {{ commonData.totalPrice }} {{ commonData.paycoin }}</span>
    </div>
    <!-- 买 3 -->
    <div v-if="status === '3' && commonData.side === 'BUY'">
      <!-- 已完成 -->
      <span class="b-7-cl Conspicuous">
        {{ $t('otcDetailOrder.Completedbuy1') }}
      </span>&nbsp;&nbsp;
      <!-- 您可通过 -->
      <span class="small">
        {{ $t('otcDetailOrder.Completedbuy2') }}
      </span>
      <!-- 查看资产 -->
      <span class="active b-4-cl" @click="goAss"> {{ $t('otcDetailOrder.Completedbuy3') }} </span>
      <!-- 划转至币币账户进行交易 -->
      <span class="small">{{ $t('otcDetailOrder.Completedbuy4') }}</span>
    </div>
    <!-- 卖 3 -->
    <div v-if="status === '3' && commonData.side === 'SELL'">
      <!-- 已完成 -->
      <span class="b-7-cl Conspicuous">
        {{ $t('otcDetailOrder.Completedsell') }}
      </span>
    </div>
    <!-- 买4 / 卖4 -->
    <!-- 订单已关闭 -->
    <div v-if="status === '4' || status === '9'"><span class="b-7-cl Conspicuous">
      {{ $t('otcDetailOrder.TitleOrderClose') }}
    </span></div>
    <!-- 买5 / 卖5 -->
    <div v-if="status === '5'">
      <!-- 申诉中 -->
      <span class="b-7-cl Conspicuous">
        {{ $t('otcDetailOrder.TitleComplaint') }}
      </span>&nbsp;&nbsp;
      <!-- 我们的客服人员正在积极为您处理，请您耐心等待处理结果。 -->
      <span class="small">{{ $t('otcDetailOrder.TitleComplaintText') }}</span>
    </div>
    <!-- 买7 / 卖7 -->
    <div v-if="status === '7'"><span class="b-7-cl Conspicuous">
      {{ $t('otcDetailOrder.TitleOrderException') }}
    </span></div>
    <!-- 买 8 -->
    <div v-if="status === '8' && commonData.side === 'BUY'">
      <!-- 已完成 -->
      <span class="b-7-cl Conspicuous">
        {{ $t('otcDetailOrder.AfterAppealbuy1') }}
      </span>&nbsp;&nbsp;
      <!-- 您可通过 -->
      <span class="small">
        {{ $t('otcDetailOrder.AfterAppealbuy2') }}
      </span>
      <!-- 查看资产 -->
      <span class="active b-4-cl" @click="goAss"> {{ $t('otcDetailOrder.AfterAppealbuy3') }} </span>
      <!-- 划转至币币账户进行交易 -->
      <span class="small">{{ $t('otcDetailOrder.AfterAppealbuy4') }}</span>
    </div>
    <!-- 卖 8 -->
    <div v-if="status === '8' && commonData.side === 'SELL'">
      <!-- 已完成 -->
      <span class="b-7-cl Conspicuous">{{ $t('otcDetailOrder.AfterAppealsell') }}</span>
    </div>
  </div>
</div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/otcDetailOrder/title/title';
import 'BlockChain-ui/PC/common-mixin/otcDetailOrder/title/title.styl';

export default {
  mixins: [mixin],
};

</script>
