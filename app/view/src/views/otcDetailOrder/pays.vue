<template>
<section class="otcDetailOrder-pays  clearfix" v-if="isReady">
  <!-- 卖家支付方式 -->
  <span class="otcDetailOrder-pays-title">{{ $t('otcDetailOrder.SellersPaymentMethod') }}</span>
  <div class="otcDetailOrder-pays-body">
    <ul class="paysList" v-if="showPay">
      <li class="clearfix" v-for="(item, index) in pays" :key="index">
        <!-- 选择框 仅支付方 在未支付情况下展示 -->
        <div class="paysList-redio" v-if="commonData.side==='BUY'" @click="payClick(item)">
          <c-redio :value="payObj.payment === item.payment ? true : false"/>
        </div>
        <!-- 信息 支付宝/微信 -->
        <div class="paysList-message clearfix">
          <div class="paysList-message-type b-1-cl">{{ item.name }}</div>
          <!-- 姓名 账号 -->
          <div
            class="paysList-message-info"
            v-for="(field, ind) in item.paymentFieldList"
            :key="'field' + ind">
            <span v-if="Number(field.fieldType) !== 3" class="paysList-message-text b-2-bd">
              {{field.fieldValue}}
            </span>
            <span class="paysList-message-ewm a-2-bg" v-else-if="commonData.side==='BUY'">
              <svg class="icon icon-18" aria-hidden="true">
                <use xlink:href="#icon-b_18"></use>
              </svg>
              <div class="paysList-message-ewm-mark h-2-bg">
                <img :src="field.fieldValue"/>
              </div>
            </span>
          </div>
        </div>
      </li>
    </ul>
    <div class="text"
         :class="status === '1' && commonData.showWarnTip ? 'b-7-cl' : 'b-1-cl'"
         v-if="showText.length">{{ showText }}</div>
  </div>
</section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/otcDetailOrder/pays/pays';
import 'BlockChain-ui/PC/common-mixin/otcDetailOrder/pays/pays.styl';

export default {
  mixins: [mixin],
};
</script>
