<template>
<div class="otcDetailOrder-message otcDetailOrder-message-container a-3-bd clearfix" v-if="isReady">
  <ul class="otcDetailOrder-keys">
    <li v-if="identificationInfo.otcAuthnameOpen">{{ $t('otcDetailOrder.identification') }}</li>
    <!-- 单价 -->
    <li>{{ $t('otcDetailOrder.MessPrice') }}</li>
    <!-- 数量 -->
    <li>{{ $t('otcDetailOrder.MessVolume') }}</li>
    <!-- 总价 -->
    <li>{{ $t('otcDetailOrder.MessTotol') }}</li>
    <!-- 商家备注 -->
    <li>{{ $t('otcDetailOrder.MessMerchantRemarks') }}</li>
  </ul>
  <ul class="otcDetailOrder-values b-1-cl">
    <li v-if="identificationInfo.otcAuthnameOpen">{{identificationInfo.realName }}
      <a class="identification-icon" href="javascript:;"
         @click="identificationShow">
         <svg class="icon icon-16 identifi-icon" aria-hidden="true">
            <use xlink:href="#icon-b_29"></use>
         </svg>
        <svg class="icon icon-16 identifi-icon-hover" aria-hidden="true">
          <use xlink:href="#icon-b_29_1"></use>
        </svg>
      </a>
    </li>
    <li>{{ commonData.price }} {{ commonData.paycoin }}</li>
    <li>{{ commonData.volume }} {{ getShowCoin(commonData.coin) }}</li>
    <li class="b-7-cl">{{ commonData.totalPrice }} {{ commonData.paycoin }}</li>
    <li v-if="showDescription">{{ commonData.description }}</li>
    <li v-else>{{ $t('otcDetailOrder.none') }}</li>
  </ul>
</div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/otcDetailOrder/message/message';
import 'BlockChain-ui/PC/common-mixin/otcDetailOrder/message/message.styl';

export default {
  mixins: [mixin],
};
</script>
