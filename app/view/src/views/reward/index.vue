<template>
  <section class="reward-container">
    <section
      class="banner"
      :style="{
        backgroundImage: `url('http://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220725154845553.jpg')`,
        backgroundSize: 'cover'
      }"
    >
    <!-- backgroundImage: `url('http://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220711190319836.png')` -->
    <!-- <span class="banner-title">Invitation Rewards Program</span> -->
    <!-- <span class="banner-title">{{ $t("reward.index.title") }}</span> -->
    <!-- <span class="banner-text" v-if="isRole && !toSub"></span> -->
    <!-- <span class="banner-text" v-if="toSub || !isRole">{
      { $t("reward.index.additional") }}</span> -->
    </section>
    <section class="container">
      <!-- 登录 -->
      <template v-if="isLogin">
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
        <template v-else-if="toSub">
          <PlansList class="plans-list" :config.sync="config" :user="userConf" />
          <PlansInfo
            class="plans-info"
            :config="config"
            :style="{ marginBottom: config.type === 1 ? '' : '40px' }"
          />
          <StakingInfo v-if="config.type === 1" style="margin: 40px 0" :id="config.vipId" />
          <SelectTab v-if="config.type === 1" style="margin: 40px 0" :list="record" />
        </template>
      </template>
      <!-- 未登录 -->
      <template v-else>
        <PlansList class="plans-list" :config.sync="config"></PlansList>
        <PlansInfo class="plans-info" :config="config" style="margin-bottom: 50px"></PlansInfo>
        <StakingInfo v-if="config.type === 1" style="margin: 40px 0" :id="config.vipId" />
      </template>
    </section>
  </section>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/reward/index';
import 'BlockChain-ui/PC/common-mixin/reward/index.styl';

import StakingInfo from './components/stakingInfo.vue';
import PlansList from './components/plansList.vue';
import PlansInfo from './components/plansInfo.vue';
import PlansDetail from './components/plansDetail.vue';
import SelectTab from './components/selectTab.vue';

export default {
  mixins: [mixin],
  components: {
    StakingInfo,
    PlansList,
    PlansInfo,
    PlansDetail,
    SelectTab,
  },
};
</script>
