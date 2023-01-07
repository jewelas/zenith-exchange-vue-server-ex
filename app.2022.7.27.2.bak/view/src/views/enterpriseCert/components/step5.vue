<template>
  <div class="enterpriseCert-statement v5-6-cl">
    <h3 class="step-title v5-5-cl">{{$t('enterpriseCert.item5')}}</h3>
    <div class="statement">{{$t('enterpriseCert.statement')}}</div>
    <ul class="statement-list">
      <li class="statement-item">
        <span>{{$t('enterpriseCert.statement1')}}</span>
      </li>
      <li class="statement-item">
        <span>{{$t('enterpriseCert.statement2')}}</span>
      </li>
      <li class="statement-item">
        <span>{{$t('enterpriseCert.statement3')}}</span>
      </li>
      <li class="statement-item">
        <span>{{$t('enterpriseCert.statement4')}}</span>
      </li>
    </ul>
    <div class="agree-check">
      <c-checkBox :value="isAgree" @click="handleAgree"></c-checkBox>
      {{$t('enterpriseCert.agree')}}
    </div>
    <div class="enterpriseCert-footer">
      <div>
        <c-v5-button
          type="solid"
          width="150px"
          height="40px"
          paddingW="0"
          @click="submit"
        >{{$t('enterpriseCert.submit')}}</c-v5-button>
      </div>
      <span
        class="previous v5-6-cl"
        @click="previous">
        <svg class="icon icon-12" aria-hidden="true">
          <use xlink:href="#icon-v5_3"></use>
        </svg>{{$t('enterpriseCert.previous')}}
      </span>
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/enterpriseCert/step5/index';
import 'BlockChain-ui/PC/common-mixin/enterpriseCert/step5/index.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
