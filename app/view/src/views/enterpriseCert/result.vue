<template>
  <div class="enterpriseCert-result v5-10-bg">
    <div class="status-icon">
      <svg class="icon icon-60" aria-hidden="true">
        <use xlink:href="#icon-v5_311"></use>
      </svg>
    </div>
    <div class="status-text v5-5-cl">{{$t('enterpriseCert.submited')}}</div>
    <div class="status-tip v5-6-cl">{{$t('enterpriseCert.checkTip')}}</div>
    <div class="status-dealTime v5-6-cl">{{$t('enterpriseCert.dealTime')}}</div>
    <div class="status-btn">
      <c-v5-button
        type="solid"
        width="150px"
        height="40px"
        paddingW="0"
        @click="confirm"
      >{{$t('enterpriseCert.ok')}}</c-v5-button>
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/enterpriseCert/result/index';
import 'BlockChain-ui/PC/common-mixin/enterpriseCert/result/index.styl';

export default {
  mixins: [mixin],
  mounted() {},
};
</script>
