<template>
  <div class="currency-notes freestaking c-3-bg">
    <div class="flex-row">
      <div class="key f-2-cl">
        {{ $t("innov.entry") }}
      </div>
      <div class="val f-1-cl">{{ coinSymbolIntroduce.name }}</div>
    </div>
    <div class="flex-row marb15">
      <div class="key f-2-cl">
        {{ $t("trade.currencyNotesModal.Introduction") }}
      </div>
    </div>
    <div class="content">
      <vue-scroll>
        <div class="text f-1-cl" v-html="coinSymbolIntroduce.info"></div>
      </vue-scroll>
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/freeStaking/popup/popup';
import 'BlockChain-ui/PC/common-mixin/freeStaking/popup/popup.styl';

export default {
  mixins: [mixin],
};
</script>
