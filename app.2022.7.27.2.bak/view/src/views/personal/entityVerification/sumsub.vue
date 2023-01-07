<template>
  <div class="sumsub-wrap">
    <div class="sumsub-container" id="sumsub-websdk-container"></div>
    <c-loading size="50" v-show="showLoading"></c-loading>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/entityVerification/sumsub';
import 'BlockChain-ui/PC/common-mixin/personal/entityVerification/sumsub.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
