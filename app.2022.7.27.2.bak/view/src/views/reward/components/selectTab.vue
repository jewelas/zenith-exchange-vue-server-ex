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
import StakingRecord from './record/stakingRecord.vue';
import PaymentRecord from './record/paymentRecord.vue';
import StakingIncome from './record/stakingIncome.vue';
import TransReward from './record/transReward.vue';
import RebateRecord from './record/rebateRecord.vue';
import MyInvitation from './record/myInvitation.vue';

export default {
  name: 'SelectTab',
  components: {
    StakingRecord,
    PaymentRecord,
    StakingIncome,
    TransReward,
    RebateRecord,
    MyInvitation,
  },
  props: {
    list: { type: Array, default: () => [] },
  },
  data() {
    return {
      currentTab: '',
      active: 0,
      // data: [
      //   { name: 'Staking Record', path: 'staking' },
      //   { name: 'Payment Record', path: 'payment' },
      //   { name: 'Staking Income', path: 'income' },
      //   { name: 'Transaction Reward', path: 'reward' },
      //   { name: 'Rebate Record', path: 'rebate' },
      //   { name: 'My Invitation', path: 'invite' },
      // ],
    };
  },
  methods: {
    changeTab(path, index) {
      this.currentTab = path;
      this.active = index;
    },
  },
  watch: {
    list: {
      handler() {
        this.currentTab = this.list[0].path;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="stylus" scoped>
.tab {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  font-family: 'DINPro';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #888FA1;
  border-bottom: 1px solid #E8EBF3;
  margin-bottom: 32px;

  >div {
    padding: 8px 0;
    margin-right: 56px;
  }

  .active {
    color: #16181D;
    border-bottom: 2px solid #2762ff;
  }
}
</style>
