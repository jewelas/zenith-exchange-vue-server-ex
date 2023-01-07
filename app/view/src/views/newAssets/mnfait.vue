<template>
    <section class="v5-page-mnfait">
        <div class="mnfait-form v5-10-bg">
            <header class="mnfait-header v5-5-cl">
                <svg class="icon icon-20" aria-hidden="true" @click="goBack">
                <use xlink:href="#icon-v5_36"></use>
                </svg>
                <span>
                    <div  class="tab-left v5-9-bg v5-5-cl">
                        <div
                          v-if="depositOpen === 1"
                          class="tab-left-buy"
                          @click="changeType('recharge')"
                          :class="{
                          'v5-2-bg': this.nowType === 'recharge',
                          'colorWhite': this.nowType === 'recharge'
                          }">{{ $t('newOtc.text88') }}</div>
                        <div
                          v-if="withdrawOpen === 1"
                          class="tab-left-sell"
                          @click="changeType('withdraw')"
                          :class="{
                          'v5-3-bg': this.nowType === 'withdraw',
                          'colorWhite': this.nowType === 'withdraw'}">
                          {{ $t('newOtc.text89') }}</div>
                    </div>
                </span>
            </header>
        </div>
        <div class="mnfait-box">
            <mnRecharge v-if="nowType === 'recharge'" @symbolChange="symbolChange" />
            <mnWithdraw v-if="nowType === 'withdraw'" @symbolChange="symbolChange" />
        </div>
    </section>
</template>


<script>
import mixin from 'BlockChain-ui/PC/common-mixin/newAssets/mnFait/index';
import 'BlockChain-ui/PC/common-mixin/newAssets/mnFait/index.styl';
import mnRecharge from './mnRecharge.vue';
import mnWithdraw from './mnWithdraw.vue';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
  components: {
    mnRecharge,
    mnWithdraw,
  },
};
</script>
