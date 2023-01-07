<template>
  <section class="reward">
    <section class="banner">
      <!-- <span class="banner-title">Invitation Rewards Program</span> -->
      <span class="banner-title">{{$t('reward.index.title')}}</span>
      <span class="banner-text" v-if="!isRole">{{$t('reward.index.additional')}}</span>
      <span class="banner-text" v-if="isRole"></span>
    </section>
    <section class="container">
      <template v-if="isLogin">
        <template v-if="toSub || !isRole">
          <PlansList class="plans-list" :config.sync="config" :flag="flag" :id='vipId' />
          <PlansInfo
            class="plans-info"
            :config="config"
            :style="{ marginBottom: config.type === 1 ? '' : '40px' }"
          />
          <StakingInfo v-if="config.type === 1" style="margin: 40px 0" :id="config.vipId" />
          <SelectTab
              v-if="config.type === 1"
              style="margin: 40px 0"
              :list="record"
            />
        </template>
        <template v-if="isRole && !toSub">
            <PlansDetail
              class="plans-detail"
              :user="data"
              :boxHeight.sync="detailHeight"
              :toSub="toSub"
              @change="selectPlan"
            />
            <StakingInfo
              v-if="data.type === 1"
              :style="{ marginTop: `${detailHeight - 90}px`, marginBottom: '40px' }"
              :id="data.vipId"
            />
            <SelectTab
              v-if="data.type === 1"
              :style="{
                marginTop: data.type === 2 ? `${detailHeight - 90}px` : '',
                marginBottom: '40px',
              }"
              :list="vipList"
            />
            <SelectTab
              v-if="data.type === 2"
              :style="{
                marginTop: data.type === 2 ? `${detailHeight - 90}px` : '',
                marginBottom: '40px',
              }"
              :list="affiliate"
            />
        </template>
      </template>
      <template v-else>
        <PlansList class="plans-list" :config.sync="config"></PlansList>
        <PlansInfo class="plans-info" :config="config" style="margin-bottom: 50px"></PlansInfo>
        <StakingInfo v-if="config.type === 1" style="margin: 40px 0" :id="config.vipId" />
      </template>
    </section>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import StakingInfo from './components/stakingInfo.vue';
import PlansList from './components/plansList.vue';
import PlansInfo from './components/plansInfo.vue';
import PlansDetail from './components/plansDetail.vue';
import SelectTab from './components/selectTab.vue';

export default {
  name: 'RewardPage',
  components: {
    StakingInfo,
    PlansList,
    PlansInfo,
    PlansDetail,
    SelectTab,
  },
  data() {
    return {
      config: {},
      data: {},
      toSub: false,
      detailHeight: 500,
      flag: 0,
      vipId: '',
      // vipList: [
      //   { name: this.$t('reward.recordList.staking'), path: 'staking' },
      //   { name: this.$t('reward.recordList.payment'), path: 'payment' },
      //   { name: this.$t('reward.recordList.payment'), path: 'income' },
      //   { name: this.$t('reward.recordList.reward'), path: 'reward' },
      //   { name: this.$t('reward.recordList.rebate'), path: 'rebate' },
      //   { name: this.$t('reward.recordList.invite'), path: 'invite' },
      // ],
      // affiliate: [
      //   { name: this.$t('reward.recordList.invite'), path: 'invite' },
      //   { name: this.$t('reward.recordList.rebate'), path: 'rebate' },
      //   { name: this.$t('reward.recordList.payment'), path: 'payment' },
      //   { name: this.$t('reward.recordList.staking'), path: 'staking' },
      //   { name: this.$t('reward.recordList.payment'), path: 'income' },
      // ],
      // record: [
      //   { name: this.$t('reward.recordList.staking'), path: 'staking' },
      //   { name: this.$t('reward.recordList.payment'), path: 'income' },
      // ],
    };
  },
  methods: {
    async initData() {
      try {
        const { data, code, msg } = await this.axios({
          url: 'members/userDetail',
          headers: { 'Content-Type': 'application/json' },
          hostType: 'fe-increment-api',
          method: 'post',
        });
        if (code !== 0) throw new Error(msg);
        this.data = data;
      } catch ({ message }) {
        this.$bus.$emit('tip', { text: message, type: 'error' });
      }
    },
    selectPlan(isSub, flag, id) {
      this.toSub = isSub;
      this.flag = flag;
      this.vipId = id;
    },
  },
  watch: {
    isLogin: {
      handler() {
        if (this.isLogin) this.initData();
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState({
      isLogin: state => state.baseData.isLogin,
    }),
    isRole: {
      get() {
        return this.data.type !== 0;
      },
    },
    vipList() {
      return [
        { name: this.$t('reward.recordList.staking'), path: 'staking' },
        { name: this.$t('reward.recordList.payment'), path: 'payment' },
        { name: this.$t('reward.recordList.income'), path: 'income' },
        { name: this.$t('reward.recordList.reward'), path: 'reward' },
        { name: this.$t('reward.recordList.rebate'), path: 'rebate' },
        { name: this.$t('reward.recordList.invite'), path: 'invite' },
      ];
    },
    affiliate() {
      return [
        { name: this.$t('reward.recordList.invite'), path: 'invite' },
        { name: this.$t('reward.recordList.rebate'), path: 'rebate' },
        { name: this.$t('reward.recordList.payment'), path: 'payment' },
        { name: this.$t('reward.recordList.staking'), path: 'staking' },
        { name: this.$t('reward.recordList.income'), path: 'income' },
      ];
    },
    record() {
      return [
        { name: this.$t('reward.recordList.staking'), path: 'staking' },
        { name: this.$t('reward.recordList.income'), path: 'income' },
      ];
    },
  },
};
</script>

<style lang="stylus" scoped>
*
  box-sizing: border-box;

.reward
  width: 100%;
  height: 100%;
  background-color: #FFFFFF;

.banner
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  background: url('./assets/banner.png') no-repeat scroll center top;
  color: #FFFFFF;
  background-color: #16181D;
  .banner-title
    font-size: 40px;
    line-height: 48px;
    text-transform: uppercase;
  .banner-text
    font-size: 32px;
    line-height: 40px;
    text-align: center;
    text-transform: capitalize;
    margin: 16px 0 54px


.container
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;

  .plans-list
    position :absolute;
    top:268px

  .plans-info
    padding-top: 200px;

  .plans-detail
    position :absolute;
    top:268px
</style>
