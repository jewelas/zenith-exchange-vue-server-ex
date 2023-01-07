<template>
  <section class="page-mobilityTrade mobilityTrade  a-7-bd clearfix">
    <div class="page-mobilityTrade-text">
      <span class="fontBig f-1-cl">{{ title }}</span>
      <!-- 小额快速交易，0手续费 -->
      <span class="fontSmall">{{ $t('mobilityTrade.smallAmount') }}</span>
    </div>
    <div class="page-mobilityTrade-options" v-if="flag">
      <!-- 类型 -->
      <c-select
        v-if="$t('mobilityTrade.priceBuy')"
        class="options-select"
        width="140px"
        :promptText="$t('mobilityTrade.tradeType')"
        :value="selectCode"
        :options="selectList"
        @onChanges='selectChange'/>
      <c-inputLine
        class="options-input"
        width="220px"
        :value="inputValue"
        :promptText="inputPromptText"
        @onchanges="inputChanges">
        <span class="inputCoin">
          {{inputCoin}}
        </span>
      </c-inputLine>
      <c-button
        class="options-button"
        width="110px"
        marginTop="6px"
        @click="btnClick"
        :disabled="buttonDisabled">{{ title }}</c-button>
    </div>
  </section>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/fiatdeal/mobilityTrade/mobilityTrade';
import 'BlockChain-ui/PC/common-mixin/fiatdeal/mobilityTrade/mobilityTrade.styl';

export default {
  mixins: [mixin],
};
</script>
