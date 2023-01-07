<template>
  <section style="width: 100%">
    <section class="tab">
      <div
        v-for="(item, index) in list"
        :key="index"
        :class="{ active: active === index }"
        @click="changeTab(item.path, index)"
      >
        {{ item.name }}
      </div>
    </section>
    <StakingRecord v-if="currentTab == 'staking'" />
    <PaymentRecord v-if="currentTab == 'payment'" />
    <StakingIncome v-if="currentTab == 'income'" />
    <TransReward v-if="currentTab == 'reward'" />
    <RebateRecord v-if="currentTab == 'rebate'" />
    <MyInvitation v-if="currentTab == 'invite'" />
  </section>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/reward/tab';
import 'BlockChain-ui/PC/common-mixin/reward/tab.styl';

import StakingRecord from './record/stakingRecord.vue';
import PaymentRecord from './record/paymentRecord.vue';
import StakingIncome from './record/stakingIncome.vue';
import TransReward from './record/transReward.vue';
import RebateRecord from './record/rebateRecord.vue';
import MyInvitation from './record/myInvitation.vue';

export default {
  mixins: [mixin],
  components: {
    StakingRecord,
    PaymentRecord,
    StakingIncome,
    TransReward,
    RebateRecord,
    MyInvitation,
  },
};
</script>
